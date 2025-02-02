import { checkbox } from '@inquirer/prompts';
import chalk from 'chalk';

import properties from '../templates/properties.json'

export async function classesMenu(): Promise<string[]> {
    const choices = properties.init.choices.map((choice) => ({
        name: chalk.gray(`${choice.icon} ${choice.value}`),
        value: choice.value,
        transformer: (input: string) => chalk.gray(input)
    }));

    const selectedClasses = await checkbox({
        message: chalk.hex('#6C5CE7').bold('✨ Choose the classes:'),
        choices,
    });

    return selectedClasses;
}
