import fs from 'fs';
import path from 'node:path';
import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import consola from 'consola';
import figlet from 'figlet';
import { Spinner } from 'cli-spinner'; // Substituímos ora por cli-spinner

// Path to the properties file
const propertiesPath = path.join(__dirname, '../../templates/config/properties.json');

// Read the properties file
const properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));

// Interface for the language object
interface Language {
    name: string;
    icon: string;
    path: string;
    extensions: string[];
}

// Function to copy the configuration file
async function copyConfigFile(language: Language, extension: string) {
    const spinner = new Spinner(`Copying configuration file for ${chalk.cyan(language.name)}...`);
    spinner.setSpinnerString(18)
    spinner.start();

    // Simulate the 3-second delay for the animation to be visible
    setTimeout(() => {
        // Build the source file path
        const sourcePath = path.join(__dirname, `../../templates/config/${language.path}/atos.config.${extension}`);
        
        // Build the destination file path
        const destPath = path.join(process.cwd(), `atos.config.${extension}`);

        // Check if the source file exists
        if (!fs.existsSync(sourcePath)) {
            spinner.stop(true);
            consola.error(`Configuration file not found for ${language.name}.`);
            consola.error(`Expected path: ${sourcePath}`);
            process.exit(1);
        }

        // Copy the configuration file
        fs.copyFileSync(sourcePath, destPath);
        spinner.stop(true);
        consola.success(`Configuration file copied to: ${chalk.green(destPath)}`);
    }, 3000); // 3-second delay
}

// Main function
async function main(autoSelectLanguage?: string) {
    console.log(chalk.hex('#6C5CE7')(figlet.textSync('AtosJS CLI', { horizontalLayout: 'full' })));

    try {
        const languages: Language[] = properties.languages;

        let chosenLanguage: Language;

        if (autoSelectLanguage) {
            // Automatically select the language based on the flag
            const selectedLanguage = languages.find((lang) => lang.name.toLowerCase() === autoSelectLanguage.toLowerCase());
            if (!selectedLanguage) {
                consola.error(`Language "${autoSelectLanguage}" not found.`);
                process.exit(1);
            }
            chosenLanguage = selectedLanguage;
        } else {
            // Create the selection menu
            chosenLanguage = await select({
                message: chalk.hex('#6C5CE7')('🚀 Choose a language:'),
                choices: languages.map((lang) => ({
                    name: `${lang.icon} ${chalk.bold(lang.name)}`,
                    value: lang,
                    description: chalk.dim(`Extensions: atos.config.${lang.extensions.join(', atos.config.')}`),
                })),
                theme: {
                    prefix: chalk.hex('#6C5CE7')('$'),
                    style: {
                        message: chalk.hex('#6C5CE7'),
                        description: chalk.dim,
                    },
                },
            });
        }

        if (!chosenLanguage) {
            consola.error('Invalid choice.');
            process.exit(1);
        }

        // If the chosen language is JavaScript (ES6), ask for the extension
        let chosenExtension: string;
        if (chosenLanguage.name === 'JavaScript (ES6)') {
            chosenExtension = await select({
                message: chalk.hex('#6C5CE7')('📄 Choose an extension:'),
                choices: [
                    { name: chalk('🔹 atos.config.js'), value: 'js' },
                    { name: chalk('🔸 atos.config.mjs'), value: 'mjs' },
                ],
                theme: {
                    prefix: chalk.hex('#6C5CE7')('$'),
                    style: {
                        message: chalk.hex('#6C5CE7'),
                    },
                },
            });
        } else {
            chosenExtension = chosenLanguage.extensions[0];
        }

        // Copy the configuration file for the chosen language and extension
        copyConfigFile(chosenLanguage, chosenExtension);
    } catch (error) {
        consola.error('Error:', error);
        process.exit(1);
    }
}

// Check command-line arguments
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
} else if (process.argv[2] === 'help') {
    consola.box({
        title: chalk.hex('#6C5CE7')('📖 AtosJS CLI Help'),
        message: `
${chalk.bold('Usage:')}
  ${chalk.hex('#6C5CE7')('atos init')} ${chalk.dim('[-js|-ts|-es6]')}
    ${chalk.green('-js')}: Use JavaScript configuration
    ${chalk.green('-ts')}: Use TypeScript configuration
    ${chalk.green('-es6')}: Use JavaScript (ES6) configuration

  ${chalk.hex('#6C5CE7')('atos help')}
    ${chalk.bold('📜 Documentation:')} ${chalk.underline('https://atosjs.org/docs')}
    ${chalk.bold('💬 Community:')} ${chalk.underline('https://atosjs.org/discord')}

${chalk.bold('Examples:')}
  ${chalk.cyan('$ atos init')}
  ${chalk.cyan('$ atos init -js')}
  ${chalk.cyan('$ atos help')}
`,
    });
}
