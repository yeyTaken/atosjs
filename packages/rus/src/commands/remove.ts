import { consola } from 'consola';

export const removePackage = async (params: string[]) => {
    if (params.length === 0) {
      consola.error('Você precisa fornecer o nome do pacote a ser removido.');
      return;
    }
    consola.success(`Removendo pacote(s): ${params.join(', ')}`);
  };
  