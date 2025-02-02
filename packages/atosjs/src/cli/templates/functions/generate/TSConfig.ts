import { Database } from '../../../menu/initial';

export function generateTSConfig(
    selectedClasses: string[],
    selectedDatabase: Database | null
): string {
    let configContent = '';

    if (selectedClasses.length > 0) {
        configContent += `import { ${selectedClasses.join(', ')} } from 'atosjs';\n\n`;
    }

    const isMongoDBWithGiftManager = selectedClasses.includes('GiftManager') && selectedDatabase?.name === 'MongoDB';

    if (isMongoDBWithGiftManager) {
        configContent += 'import \'dotenv/config\';\n\n';
    }

    if (selectedClasses.includes('TimeFormat')) {
        configContent += 'export const time = new TimeFormat();\n\n';
    }

    if (selectedClasses.includes('GiftManager') && selectedDatabase) {
        if (selectedDatabase.name === 'MongoDB') {
            configContent += 'export const gift = new GiftManager({\n';
            configContent += '  mongodb: {\n';
            configContent += '    connect: process.env.MONGO_URI!,\n';
            configContent += `    dbName: '${selectedDatabase.databaseName}',\n`;
            configContent += '  },\n';
            configContent += '});\n\n';
        } else if (selectedDatabase.name === 'QuickDB') {
            configContent += 'export const gift = new GiftManager({\n';
            configContent += '  dbLocal: {\n';
            configContent += `    filePath: '${selectedDatabase.filePath}',\n`;
            configContent += '  },\n';
            configContent += '});\n\n';
        }
    }

    return configContent;
}
