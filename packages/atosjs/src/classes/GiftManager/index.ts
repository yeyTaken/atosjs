import { QuickDBHandler } from '../../database/quickdb';
import { MongooseHandler } from '../../database/mongoose';
import { GenerateOptions, GiftManagerOptions } from './@types/gifts';
import { generateGift, redeemGift, viewGift } from './@types/api';
import { AtosJSError, ErrorCodes, ErrorMessages } from '../../errors';

export class GiftManager {
  private db: QuickDBHandler | MongooseHandler;

  constructor(options?: GiftManagerOptions) {
    if (options?.dbLocal && options?.mongodb) {
      throw new AtosJSError(ErrorMessages[ErrorCodes.INVALID_DB_SELECTION], ErrorCodes.INVALID_DB_SELECTION);
    }

    if (options?.dbLocal) {
      this.db = new QuickDBHandler(options.dbLocal.filePath || 'gifts.json');
    } else if (options?.mongodb) {
      this.db = new MongooseHandler(options.mongodb.connect, options.mongodb.dbName);
    } else {
      this.db = new QuickDBHandler('gifts.json');
    }
  }

  public async generate(options?: GenerateOptions): Promise<string> {
    return generateGift(this.db, options);
  }

  public async redeem(giftId: string): Promise<{ success: boolean }> {
    return redeemGift(this.db, giftId);
  }
  
  public async view(giftId: string): Promise<{ valid: boolean; type?: string; value?: unknown }> {
    return viewGift(this.db, giftId);
  }
}
