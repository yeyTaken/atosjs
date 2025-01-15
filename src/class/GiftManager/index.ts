import { QuickDB } from 'quick.db';
import { GenerateOptions, GiftManagerOptions, GiftValue } from './@types/gifts';
import { generateGift, redeemGift, viewGift } from './@types/api';
import { AtosJSError, ErrorCodes, ErrorMessages } from './errors';

export class GiftManager {
    private db!: QuickDB;

    constructor(options?: GiftManagerOptions) {
        const fileName = options?.fileName || 'gifts';
        const fileType = options?.fileType || 1;

        if (fileType === 1) {
            this.db = new QuickDB({ filePath: `${fileName}.json` });
        } else if (fileType === 2) {
            this.db = new QuickDB({ filePath: `${fileName}.yaml` });
        } else {
            throw new AtosJSError(
                ErrorMessages[ErrorCodes.INVALID_FILE_TYPE],
                ErrorCodes.INVALID_FILE_TYPE
            );
        }
    }

    public async generate(options?: GenerateOptions): Promise<string> {
        return generateGift(this.db, options);
    }

    public async redeem(giftId: string): Promise<{ success: boolean }> {
        return redeemGift(this.db, giftId);
    }

    public async view(giftId: string): Promise<{ valid: boolean; type?: string; value?: GiftValue }> {
        return viewGift(this.db, giftId);
    }
}
