import fs from 'fs';
import path from 'node:path';
import { select, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import consola from 'consola';

const propertiesPath = path.join(__dirname, '../../../src/cli/templates/properties.json');

interface Properties {
    lang: Array<{
        name: string;
        icon: string;
        extensions: string[];
    }>;
}

const properties: Properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));

async function chooseExtension(): Promise<string> {
    const useMJS = await confirm({
        message: chalk.hex('#6C5CE7').bold('💡 Deseja usar a extensão .mjs?'),
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
        message: chalk.hex('#6C5CE7').bold('💻 Escolha a linguagem:'),
        choices,
    });

    const languageDetails = properties.lang.find(lang => lang.name === selectedLanguage);

    if (!languageDetails) {
        throw new Error('Linguagem selecionada não encontrada.');
    }

    let selectedExtension: string | undefined;

    if (selectedLanguage === 'JavaScript (ES6)') {
        selectedExtension = await chooseExtension();
        consola.success(
            chalk.green.bold('Extensão selecionada: ') +
            chalk.gray(selectedExtension)
        );
    }

    return {
        name: selectedLanguage,
        extensions: languageDetails.extensions,
        selectedExtension,
    };
}