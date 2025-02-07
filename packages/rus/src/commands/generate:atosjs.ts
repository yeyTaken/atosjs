module.exports = {
    name: 'generate:atosjs',
    description: 'Generates a new AtosJS project',
    run: async toolbox => {
        const  {
            parameters,
            template,
            filesystem,
            print: { success, error },
        } = toolbox;

        const type = parameters.options.type || 'default';

        const packages = await filesystem.read('package.json', 'json');
        const haveAtosJS = !!packages.dependencies['atosjs'];

        if (haveAtosJS) {
            error('AtosJS is not installed. Please install.');
            return;
        }
        
        success('Generating AtosJS project...');
        await generateProject(type);

        async function generateProject(type) {
            if (type === 'default' || !type) {
                await template.generate({
                    template: 'atos.config:default.ts.ejs',
                    target: 'atos.config.ts',
                    props: {},
                });

                success('Generated AtosJS project with default (TS) configuration.');
            }

            await template.generate({
                template: 'atos.config:default.ts.ejs',
                target: 'atos.config.ts',
                props: {},

            });
        }
    }
}