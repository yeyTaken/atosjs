import { consola } from 'consola';

export const updatePackages = async (params: string[]) => {
    if (params.length === 0) {
      consola.error('Você precisa fornecer o nome do pacote a ser atualizado.');
      return;
    }
    consola.success(`Atualizando pacote(s): ${params.join(', ')}`);
  };
  