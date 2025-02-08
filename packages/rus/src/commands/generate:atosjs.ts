import consola from 'consola';

module.exports = {
    name: 'generate:atosjs',
    description: 'Generates a new AtosJS project',
    run: async toolbox => {
        const {
            generateAtosJS,
            parameters,
            filesystem,
            system
        } = toolbox;

        const { warn, info } = consola;
        
        const type = parameters.options.use || 'js';
        let db = parameters.options.db || 'local';

        const packages = await filesystem.read('package.json', 'json');
        const haveAtosJS = !!packages.dependencies['atosjs'];

        if (!haveAtosJS) {
            warn('AtosJS is not installed. Installing now...');
            
            const getPackageManager = () => {
                if (filesystem.exists('yarn.lock')) {
                    return 'yarn';
                }
                if (filesystem.exists('pnpm-lock.yaml')) {
                    return 'pnpm';
                }
                if (filesystem.exists('bun.lockb')) {
                    return 'bun';
                }
                return 'npm'; // Default é npm
            };

            const packageManager = getPackageManager();
            let installCommand = '';

            switch (packageManager) {
                case 'yarn':
                    installCommand = 'yarn add atosjs@latest';
                    break;
                case 'pnpm':
                    installCommand = 'pnpm add atosjs@latest';
                    break;
                case 'bun':
                    installCommand = 'bun add atosjs@latest';
                    break;
                default:
                    installCommand = 'npm install atosjs@latest';
                    break;
            }

            await system.spawn(installCommand, { stdio: 'inherit' });
            await generateAtosJS(type, db);
            return;
        }

        info('Generating AtosJS project...');
        await generateAtosJS(type, db);
    }
}