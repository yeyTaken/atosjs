import { GiftManager, TimeFormat } from 'atosjs';

// Criando e exportando as instâncias diretamente
export const time: TimeFormat = new TimeFormat();

export const gift: GiftManager = new GiftManager({
    fileName: 'atos.gifts', // nome do arquivo de arquivo
    fileType: 1 // 1 é JSON, 2 é YAML.
});