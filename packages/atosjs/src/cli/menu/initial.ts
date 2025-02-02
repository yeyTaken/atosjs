import fs from 'fs';
import path from 'node:path';
import chalk from 'chalk';
import consola from 'consola';

import { classesMenu } from './classes';
import { databaseMenu } from './database';
import { languageMenu } from './language';

import { generateConfigFile, generateDotenvFile } from '../templates/functions';

// Tipos para os dados que podem ser retornados
export interface Database {
    name: string;
    MongoUri?: string;
    databaseName?: string;
    filePath?: string;
}

export interface Language {
    name: string;
    selectedExtension?: string;
    extensions: string[];
}

const PackageJsonPath = path.join(__dirname, '../../../package.json');
const packageJSON = JSON.parse(fs.readFileSync(PackageJsonPath, 'utf-8'));

export default async function initialMenu() {
    consola.box({
        title: chalk.hex('#6C5CE7').bold('🚀 AtosJS CLI'),
        message: chalk.gray(
            'Welcome to AtosJS CLI! Choose the classes you want to use.'
        ),
    });

    console.log(
        chalk.blue.bold('$ AtosJS CLI 📦 ') +
        chalk.gray.underline(`v${packageJSON.version}`)
    );
    console.log();

    // Get the selected classes
    const selectedClasses: string[] = await classesMenu();  // Tipagem explícita para o retorno

    // Check if the GiftManager class was selected
    const hasGiftManager = selectedClasses.includes('GiftManager');

    // If the GiftManager class was selected, show the database menu
    let selectedDatabase: Database | null = null;
    if (hasGiftManager) {
        selectedDatabase = await databaseMenu();  // Tipagem para o retorno de databaseMenu
    }

    // Get the selected language
    const selectedLanguage: Language = await languageMenu();  // Tipagem explícita para o retorno

    // Generate the config file
    await generateConfigFile(selectedClasses, selectedDatabase, selectedLanguage);
    await generateDotenvFile(selectedClasses, selectedDatabase);

    // Display the results (Descomentado para depuração)
    // console.log({
    //     selectedClasses,
    //     selectedDatabase,
    //     selectedLanguage,
    // });

}
