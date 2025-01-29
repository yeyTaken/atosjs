import fs from 'fs';
import path from 'node:path';
import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import consola from 'consola';

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
function copyConfigFile(language: Language, extension: string) {
    consola.start(`Copying configuration file for ${language.name}...`);

    // Build the source file path
    const sourcePath = path.join(__dirname, `../../templates/config/${language.path}/atos.config.${extension}`);
    
    // Build the destination file path
    const destPath = path.join(process.cwd(), `atos.config.${extension}`);

    // Check if the source file exists
    if (!fs.existsSync(sourcePath)) {
        consola.error(`Configuration file not found for ${language.name}.`);
        consola.error(`Expected path: ${sourcePath}`);
        process.exit(1);
    }

    // Copy the configuration file
    fs.copyFileSync(sourcePath, destPath);
    consola.success(`Configuration file copied to: ${chalk.bold(destPath)}`);
}

// Main function
async function main(autoSelectLanguage?: string) {
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
            chosenLanguage = selectedLanguage; // Now we know selectedLanguage is not undefined
        } else {
            // Create the selection menu with @inquirer/prompts
            chosenLanguage = await select({
                message: chalk.hex('#6C5CE7').bold('🚀 Choose a language:'),
                choices: languages.map((lang) => ({
                    name: `${lang.icon} ${chalk.bold(lang.name)}`,
                    value: lang,
                    description: `${chalk.dim(`Extensions: ${lang.extensions.join(', ')}`)}`,
                })),
                theme: {
                    prefix: chalk.hex('#6C5CE7').bold('❯'),
                    style: {
                        message: chalk.hex('#6C5CE7').bold,
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
                message: chalk.hex('#6C5CE7').bold('📄 Choose an extension:'),
                choices: [
                    { name: chalk.bold('.mjs'), value: 'mjs' },
                    { name: chalk.bold('.js'), value: 'js' },
                ],
                theme: {
                    prefix: chalk.hex('#6C5CE7').bold('❯'),
                    style: {
                        message: chalk.hex('#6C5CE7').bold,
                    },
                },
            });
        } else {
            chosenExtension = chosenLanguage.extensions[0]; // Use the default extension
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
    // Check for language flags
    const languageFlags = ['-js', '-ts', '-es6'];
    const selectedFlag = process.argv.find((arg) => languageFlags.includes(arg));

    if (selectedFlag) {
        // Map flags to language names
        const flagToLanguage: { [key: string]: string } = {
            '-js': 'JavaScript',
            '-ts': 'TypeScript',
            '-es6': 'JavaScript (ES6)',
        };
        const autoSelectLanguage = flagToLanguage[selectedFlag];
        main(autoSelectLanguage);
    } else {
        // No flag provided, show the selection menu
        consola.info('No language flag provided. Starting interactive mode...');
        main();
    }
} else if (process.argv[2] === 'help') {
    consola.box({
        title: chalk.hex('#6C5CE7').bold('AtosJS CLI Help'),
        message: `
Usage:
  atos init ${chalk.dim('[-js|-ts|-es6]')}
    ${chalk.bold('-js')}: Use JavaScript configuration
    ${chalk.bold('-ts')}: Use TypeScript configuration
    ${chalk.bold('-es6')}: Use JavaScript (ES6) configuration

  atos help
    ${chalk.bold('docs')}: ${chalk.underline('https://atosjs.org/docs')}
    ${chalk.bold('discord')}: ${chalk.underline('https://atosjs.org/discord')}
`,
    });
}