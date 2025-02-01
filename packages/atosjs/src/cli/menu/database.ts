import fs from 'fs';
import path from 'node:path';
import { select, input } from '@inquirer/prompts';
import chalk from 'chalk';
import consola from 'consola';

const propertiesPath = path.join(__dirname, '../../../templates/properties.json');

interface Properties {
    database: {
        name: string;
        choices: Array<{
            value: string;
            path: string;
            icon: string;
        }>;
    };
    MongoDB: {
        questions: Array<{
            name: string;
            message: string;
            default: string;
        }>;
    };
    QuickDB: {
        questions: Array<{
            name: string;
            message: string;
            default: string;
        }>;
    };
}

const properties: Properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));

export async function databaseMenu(): Promise<{
    name: string;
    MongoUri?: string;
    databaseName?: string;
    filePath?: string;
}> {
    const choices = properties.database.choices.map((choice) => ({
        name: chalk.gray(`${choice.icon} ${choice.value}`),
        value: choice.value,
    }));

    const selectedDatabase = await select({
        message: chalk.hex('#6C5CE7').bold('📦 Escolha o banco de dados:'),
        choices,
    });

    let db = { name: selectedDatabase } as {
        name: string;
        MongoUri?: string;
        databaseName?: string;
        filePath?: string;
    };

    if (selectedDatabase === 'MongoDB') {
        db.databaseName = await input({
            message: chalk.blue(properties.MongoDB.questions[0].message),
            default: properties.MongoDB.questions[0].default,
            transformer: (input: string) => chalk.gray(input)

        });

        db.MongoUri = await input({
            message: chalk.blue(properties.MongoDB.questions[1].message),
            default: properties.MongoDB.questions[1].default,
            transformer: (input: string) => chalk.gray(input)

        });

        consola.success(chalk.green.bold('Configurações do 🍃 MongoDB:'));
        consola.info(chalk.blue(`${chalk.bold('Database name:')} ${chalk.gray(db.databaseName)}`));
        consola.info(chalk.blue(`${chalk.bold('Connect:')} ${chalk.gray(db.MongoUri)}`));
    } else if (selectedDatabase === 'QuickDB') {
        db.filePath = await input({
            message: chalk.blue(properties.QuickDB.questions[0].message),
            default: properties.QuickDB.questions[0].default,
            transformer: (input: string) => chalk.gray(input)

        });

        consola.success(chalk.green.bold('Configurações do 📦 QuickDB:'));
        consola.info(chalk.blue(`${chalk.bold('Caminho do arquivo:')} ${chalk.gray(db.filePath)}`));
    }

    return db;
}
