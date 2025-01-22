#!/usr/bin/env node

import consola from 'consola';
import { runCommand } from './utils/commandHandler';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

if (args.length === 0) {
  if (fs.existsSync(path.join(process.cwd(), 'package-lock.json'))) {
    consola.warn('recomendo que desinstale o package-lock.json.')
  }

    consola.info('Instalando depedencias de package.json.');


  process.exit(1);
}

const [command, ...params] = args;

runCommand(command, params).catch((error) => {
  consola.error(`Erro ao executar o comando "${command}":`, error.message);
  process.exit(1);
});
