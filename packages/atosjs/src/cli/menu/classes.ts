import fs from 'fs';
import path from 'node:path';
import { checkbox } from '@inquirer/prompts';
import chalk from 'chalk';

const propertiesPath = path.join(__dirname, '../../../templates/properties.json');

interface Properties {
    init: {
        name: string;
        choices: Array<{
            value: string;
            icon: string;
        }>;
    };
}

const properties: Properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));

export async function classesMenu(): Promise<string[]> {
    const choices = properties.init.choices.map((choice) => ({
        name: chalk.gray(`${choice.icon} ${choice.value}`),
        value: choice.value,
        transformer: (input: string) => chalk.gray(input)
    }));

    const selectedClasses = await checkbox({
        message: chalk.hex('#6C5CE7').bold('✨ Escolha as classes:'),
        choices,
        
    });

    return selectedClasses;
};