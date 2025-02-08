module.exports = {
    name: 'generate:atosjs',
    description: 'Generates a new AtosJS project',
    run: async toolbox => {
        const {
            parameters,
            template,
            filesystem,
            print: { success, error },
            system
        } = toolbox;

        const type = parameters.options.use || 'js';

        const packages = await filesystem.read('package.json', 'json');
        const haveAtosJS = !!packages.dependencies['atosjs'];

        if (!haveAtosJS) {
            error('AtosJS is not installed. Installing now...');
            
            const getPackageManager = () => {
                if (filesystem.exists('yarn.lock')) {
                    return 'yarn';
                }
                if (filesystem.exists('pnpm-lock.yaml')) {
                    return 'pnpm';
                }
                if (filesystem.exists('bun.lockb')) {
                    return 'bun';
                }
                return 'npm'; // Default é npm
            };

            const packageManager = getPackageManager();
            let installCommand = '';

            switch (packageManager) {
                case 'yarn':
                    installCommand = 'yarn add atosjs@latest';
                    break;
                case 'pnpm':
                    installCommand = 'pnpm add atosjs@latest';
                    break;
                case 'bun':
                    installCommand = 'bun add atosjs@latest';
                    break;
                default:
                    installCommand = 'npm install atosjs@latest';
                    break;
            }

            await system.spawn(installCommand, { stdio: 'inherit' });

            await generateProject(type);
            return;
        }

        success('Generating AtosJS project...');
        await generateProject(type);

        async function generateProject(type) {
            // Se o tipo for JS, gera atos.config.js
            if (type === 'js') {
                await template.generate({
                    template: 'atos.config:default.js.ejs',
                    target: 'atos.config.js',
                    props: {},
                });

                success('Generated AtosJS project with JS configuration.');
            }
            // Se o tipo for TS, gera atos.config.ts
            else if (type === 'ts') {
                await template.generate({
                    template: 'atos.config:default.ts.ejs',
                    target: 'atos.config.ts',
                    props: {},
                });

                success('Generated AtosJS project with TS configuration.');
            }
            // Se o tipo for MJS, gera atos.config.mjs
            else if (type === 'mjs') {
                await template.generate({
                    template: 'atos.config:default.ts.ejs', // Use o template TS para MJS.
                    target: 'atos.config.mjs',
                    props: {},
                });

                success('Generated AtosJS project with MJS configuration.');
            } else {
                error('Invalid type specified. Use TS, JS, or MJS.');
            }
        }
    }
}
