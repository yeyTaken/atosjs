import consola from 'consola';
import fs from 'fs';
import path from 'path';

export function generateDotenvFile(
    selectedClasses: string[],
    selectedDatabase: any
): void {
    if (selectedDatabase?.name === 'MongoDB') {
        const envPath = path.join(process.cwd(), '.env');
        let envContent = '';

        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf-8');
        };

        const envLines = envContent.split('\n').filter(Boolean);
        const envMap: Record<string, string> = Object.fromEntries(
            envLines.map(line => line.split('=') as [string, string])
        );

        envMap["MONGO_URI"] = selectedDatabase.MongoUri;

        const newEnvContent = Object.entries(envMap)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

        fs.writeFileSync(envPath, newEnvContent, 'utf-8');
        consola.success('.env file updated with MongoDB URI');
    }
}