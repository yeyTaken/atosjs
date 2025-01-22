import { consola } from 'consola';

import { addPackage } from '../commands/add';
import { removePackage } from '../commands/remove';
import { showHelp } from '../commands/help';
import { updatePackages } from '../commands/update';
import { initProject } from '../commands/init';

export const runCommand = async (command: string, params: string[]) => {
  switch (command) {
    case 'add':
      await addPackage(params);
      break;
    case 'remove':
      await removePackage(params);
      break;
    case 'help':
      showHelp();
      break;
    case 'update':
      await updatePackages(params);
      break;
    case 'init':
      await initProject(params);
      break;
    default:
      consola.error(`Comando desconhecido: ${command}`);
      break;
  }
};
