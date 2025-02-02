import { select, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import consola from 'consola';

import properties from '../templates/properties.json'

async function chooseExtension(): Promise<string> {
    const useMJS = await confirm({
        message: chalk.hex('#6C5CE7').bold('💡 Would you like to use the .mjs extension?'),
        default: false,
    });

    return useMJS ? '.mjs' : '.js';
}

export async function languageMenu(): Promise<{ name: string; extensions: string[]; selectedExtension?: string }> {
    const choices = properties.lang.map((lang) => ({
        name: chalk.gray(`${lang.icon} ${lang.name}`),
        value: lang.name,
        transformer: (input: string) => chalk.gray(input)
    }));

    const selectedLanguage = await select({
        message: chalk.hex('#6C5CE7').bold('💻 Choose the language:'),
        choices,
    });

    const languageDetails = properties.lang.find(lang => lang.name === selectedLanguage);

    if (!languageDetails) {
        throw new Error('Selected language not found.');
    }

    let selectedExtension: string | undefined;

    if (selectedLanguage === 'JavaScript (ES6)') {
        selectedExtension = await chooseExtension();
        consola.success(
            chalk.green.bold('Selected extension: ') +
            chalk.gray(selectedExtension)
        );
    }

    return {
        name: selectedLanguage,
        extensions: languageDetails.extensions,
        selectedExtension,
    };
}
