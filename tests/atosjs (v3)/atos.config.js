import { GiftManager, TimeFormat } from '../../packages/atosjs/lib/index.js';

// TimeFormat
export const time = new TimeFormat();

// GiftManager
export const gift = new GiftManager({
    fileName: 'atos.gifts', // archive file name
    fileType: 1 // 1 is JSON, 2 is YAML.
});