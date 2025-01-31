import fs from 'fs';
import path from 'node:path';
import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import consola from 'consola';
import figlet from 'figlet';
import { Spinner } from 'cli-spinner';

const propertiesPath = path.join(__dirname, '../../templates/config/properties.json');
const PackageJsonPath = path.join(__dirname, '../../package.json');

const packageJSON = JSON.parse(fs.readFileSync(PackageJsonPath, 'utf-8'));
const properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));

interface Language {
    name: string;
    icon: string;
    path: string;
    extensions: string[];
}

async function copyConfigFile(language: Language, extension: string) {
    console.log();
    const spinner = new Spinner(`Copying configuration file for ${chalk.cyan(language.name)}...`);
    spinner.setSpinnerString(18);
    spinner.start();

    setTimeout(() => {
        const sourcePath = path.join(__dirname, `../../templates/config/${language.path}/atos.config.${extension}`);
        const destPath = path.join(process.cwd(), `atos.config.${extension}`);

        if (!fs.existsSync(sourcePath)) {
            spinner.stop(true);
            consola.error(`Configuration file not found for ${language.name}.`);
            consola.error(`Expected path: ${sourcePath}`);
            process.exit(1);
        }

        fs.copyFileSync(sourcePath, destPath);
        spinner.stop(true);
        consola.success(`Configuration file copied to: ${chalk.green(destPath)}`);
    }, 3000);
}

async function main(autoSelectLanguage?: string) {
    console.log(chalk.hex('#6C5CE7')(figlet.textSync('AtosJS', { horizontalLayout: 'full' })));
    console.log(chalk.blue('$ AtosJS CLI 📦 ') + chalk.gray.underline(packageJSON.version));
    console.log();

    try {
        const languages: Language[] = properties.languages;
        let chosenLanguage: Language;

        if (autoSelectLanguage) {
            const selectedLanguage = languages.find((lang) => lang.name.toLowerCase() === autoSelectLanguage.toLowerCase());
            if (!selectedLanguage) {
                consola.error(`Language "${autoSelectLanguage}" not found.`);
                process.exit(1);
            }
            chosenLanguage = selectedLanguage;
        } else {
            chosenLanguage = await select({
                message: chalk.hex('#6C5CE7')('🚀 Choose a language:'),
                choices: languages.map((lang) => ({
                    name: `${lang.icon} ${chalk.bold(lang.name)}`,
                    value: lang,
                    description: chalk.gray(`Extensions: atos.config.${lang.extensions.join(', atos.config.')}`),
                })),
            });
        }

        if (!chosenLanguage) {
            consola.error('Invalid choice.');
            process.exit(1);
        }

        let chosenExtension: string;
        if (chosenLanguage.name === 'JavaScript (ES6)') {
            const useMjs = await select({
                message: chalk.hex('#6C5CE7')('📄 Choose the file extension:'),
                choices: [
                    { name: 'Configurable', value: 'js', description: chalk.gray('Extension: atos.config.js') },
                    { name: 'Automatic', value: 'mjs', description: chalk.gray('Extension: atos.config.mjs') },
                ],
                pageSize: 2,
            });
            chosenExtension = useMjs;
        } else {
            chosenExtension = chosenLanguage.extensions[0];
        }
        

        copyConfigFile(chosenLanguage, chosenExtension);
    } catch (error) {
        consola.error('Error:', error);
        process.exit(1);
    }
}

if (process.argv[2] === 'init') {
    const languageFlags = ['-js', '-ts', '-es6'];
    const selectedFlag = process.argv.find((arg) => languageFlags.includes(arg));

    if (selectedFlag) {
        const flagToLanguage: { [key: string]: string } = {
            '-js': 'JavaScript',
            '-ts': 'TypeScript',
            '-es6': 'JavaScript (ES6)',
        };
        const autoSelectLanguage = flagToLanguage[selectedFlag];
        main(autoSelectLanguage);
    } else {
        main();
    }
} else if (
  process.argv.slice(2).includes('-h') ||
  process.argv.slice(2).includes('help') ||
  process.argv.slice(2).includes('--help')
) {
    consola.box({
        title: chalk.hex('#6C5CE7')('📖 AtosJS CLI Help'),
        message: `
${chalk.bold('Commands:')}
  ${chalk.hex('#6C5CE7')('atos help')} ${chalk.dim('[-h|--help|help]')}
  ${chalk.hex('#6C5CE7')('atos version')} ${chalk.dim('[-v|--version|version]')}
  ${chalk.hex('#6C5CE7')('atos init')} ${chalk.dim('[-js|-ts|-es6]')}
    ${chalk.green('-js')}: Use ${chalk.yellowBright('JavaScript')} configuration
    ${chalk.green('-es6')}: Use ${chalk.yellow('JavaScript (ES6)')} configuration
    ${chalk.green('-ts')}: Use ${chalk.blue('TypeScript')} configuration

${chalk.bold('Links:')}
    ${chalk.bold('📜 Documentation:')} ${chalk.blue.underline('https://atosjs.org/docs')}
    ${chalk.bold('💬 Community:')} ${chalk.blue.underline('https://atosjs.org/discord')}

${chalk.bold('Examples:')}
  ${chalk.cyan('$ atos init')}
  ${chalk.cyan('$ atos init -js')}
  ${chalk.cyan('$ atos -h')}
  ${chalk.cyan('$ atos -v')}
`,
    });
} else if (
    process.argv.slice(2).includes('-v') ||
    process.argv.slice(2).includes('version') ||
    process.argv.slice(2).includes('--version')
) { console.log(`📦 v${packageJSON.version}`) }
