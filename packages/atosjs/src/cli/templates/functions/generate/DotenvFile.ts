import consola from 'consola';
import fs from 'fs';
import path from 'path';

import { Database } from '../../../menu/initial';

export function generateDotenvFile(
    selectedClasses: string[],
    selectedDatabase: Database | null  // Tipando como Database ou null
): void {
    if (selectedDatabase?.name === 'MongoDB') {
        const envPath = path.join(process.cwd(), '.env');
        let envContent = '';

        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf-8');
        }

        const envLines = envContent.split('\n').filter(Boolean);
        const envMap: Record<string, string> = Object.fromEntries(
            envLines.map(line => line.split('=') as [string, string])
        );

        envMap['MONGO_URI'] = selectedDatabase.MongoUri || '';  // Garantir que MongoUri não seja undefined

        const newEnvContent = Object.entries(envMap)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');

        fs.writeFileSync(envPath, newEnvContent, 'utf-8');
        consola.success('.env file updated with MongoDB URI');
    }
}
