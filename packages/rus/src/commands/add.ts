import { consola } from 'consola';

export const addPackage = async (params: string[]) => {
    if (params.length === 0) {
      consola.error('Você precisa fornecer o nome do pacote a ser adicionado.');
      return;
    }
    consola.success(`Adicionando pacote(s): ${params.join(', ')}`);
  };
  