import fs from 'fs';
import path from 'node:path';
import chalk from 'chalk';
import consola from 'consola';
import figlet from 'figlet';
import initialMenu from './initial';

const propertiesPath = path.join(__dirname, '../../../templates/properties.json');
const PackageJsonPath = path.join(__dirname, '../../../package.json');

const packageJSON = JSON.parse(fs.readFileSync(PackageJsonPath, 'utf-8'));
const properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));

// Banner estilizado
// console.log(
//     chalk.hex('#6C5CE7').bold(
//         figlet.textSync('AtosJS', { horizontalLayout: 'full' })
//     )
// );
// console.log(
//     chalk.blue.bold('$ AtosJS CLI 📦 ') + chalk.gray.underline(`v${packageJSON.version}`)
// );
// console.log();

if (process.argv[2] === 'init') {
    initialMenu();
} else if (
    process.argv.slice(2).includes('-h') ||
    process.argv.slice(2).includes('help') ||
    process.argv.slice(2).includes('--help')
) {
    consola.box({
        title: chalk.hex('#6C5CE7').bold('📖 AtosJS CLI Help'),
        message: chalk.gray(`
${chalk.bold('Commands:')}
  ${chalk.hex('#6C5CE7')('atos help')} ${chalk.dim('[-h|--help|help]')}
  ${chalk.hex('#6C5CE7')('atos version')} ${chalk.dim('[-v|--version|version]')}
  ${chalk.hex('#6C5CE7')('atos init')} ${chalk.dim('[-js|-ts|-es6]')}
    ${chalk.green('-js')}: Use ${chalk.yellowBright('JavaScript')} configuration
    ${chalk.green('-es6')}: Use ${chalk.yellow('JavaScript (ES6)')} configuration
    ${chalk.green('-ts')}: Use ${chalk.blue('TypeScript')} configuration

${chalk.bold('Links:')}
    ${chalk.bold('📜 Documentation:')} ${chalk.blue.underline('https://atosjs.org/docs')}
    ${chalk.bold('💬 Community:')} ${chalk.blue.underline('https://atosjs.org/discord')}

${chalk.bold('Examples:')}
  ${chalk.cyan('$ atos init')}
  ${chalk.cyan('$ atos init -js')}
  ${chalk.cyan('$ atos -h')}
  ${chalk.cyan('$ atos -v')}
`),
    });
} else if (
    process.argv.slice(2).includes('-v') ||
    process.argv.slice(2).includes('version') ||
    process.argv.slice(2).includes('--version')
) {
    console.log(`📦 v${packageJSON.version}`);
}