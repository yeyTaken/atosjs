import chalk = require("chalk");
import fs = require("fs");
import path = require("path");
import consola from "consola";

module.exports = (toolbox) => {

        const {
            template,
            parameters,
        } = toolbox;

        const { success, error } = consola;

        async function generateAtosJS(type, db) {
            if (db === 'local') {
                await generateModelDbLocal(type);
            } else if (db ==='mongo') {
                await generateModelDbMongo(type, db);
            } else {
                db = 'local';
                error('Invalid database specified. Using local by default.');
                await generateModelDbLocal(type);
            }
        }

        async function generateModelDbLocal(type) {
            if (type) {
                await template.generate({
                    template: `atos.config:default.${type}.ejs`,
                    target: `atos.config.${type}`,
                    props: {},
                });

                success(`Generated AtosJS project with ${chalk.blueBright.bold.underline(type)} configuration.`);
            } else {
                error('Invalid type specified. Use TS, JS, or MJS.');
            }

        };

        async function generateModelDbMongo(type, db) {
                if (type) {

                const envPath = path.join(process.cwd(), '.env');
                let envContent = '';

                if (fs.existsSync(envPath)) {
                    envContent = fs.readFileSync(envPath, 'utf-8');
                }

                const envLines = envContent.split('\n').filter(Boolean);
                const envMap: Record<string, string> = Object.fromEntries(
                    envLines.map(line => line.split('=') as [string, string])
                );

                envMap['MONGO_URI'] = parameters.first || 'YOU_DB_URI';

                const newEnvContent = Object.entries(envMap)
                    .map(([key, value]) => `${key}=${value}`)
                    .join('\n');

                fs.writeFileSync(envPath, newEnvContent, 'utf-8');
                success('.env file updated with MongoDB URI');

                await template.generate({
                    template: `atos.config:mongo.${type}.ejs`,
                    target: `atos.config.${type}`,
                    props: {},
                });

                success(`Generated AtosJS project with ${chalk.blueBright.bold.underline(type)} configuration.`);
            } else {
                error('Invalid type specified. Use TS, JS, or MJS.');
            }
        };

        toolbox.generateAtosJS = generateAtosJS;
}