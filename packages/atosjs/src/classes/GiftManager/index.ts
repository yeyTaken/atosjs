import { QuickDBHandler } from "../../database/quickdb";
import { MongooseHandler } from "../../database/mongoose";
import { GenerateOptions, GiftManagerOptions } from "./types/gifts";
import { generateGift, redeemGift, viewGift } from "./types/api";
import { AtosJSError, ErrorCodes, ErrorMessages } from "../../errors";

/**
 * GiftManager class for managing gift codes.
 * 
 * @param options - Optional configuration for the gift manager:
 *   - `quickdb`: An object containing a `filePath` property to specify the local JSON file path (default: "json.sqlite").
 *   - `mongodb`: An object containing a `connect` property to specify the MongoDB connection string and an optional `dbName` property to specify the database name (default: "gifts").
 *   - `logging`: If true, logs will be shown on the console (default: true).
 * @returns A new GiftManager instance.
 * 
 * @example
 * // Example using local JSON file
 * const gift = new GiftManager({
 *   quickdb: {
 *     filePath: "quickdb.json" // .db, .yaml, etc...
 *   }
 * });
 * 
 * @example
 * // Example using MongoDB
 * const gift = new GiftManager({
 *   mongodb: {
 *     connect: "mongodb://localhost:27017",
 *     dbName: "gifts" // optional parameter to specify the database name
 *   }
 * });
 */
export class GiftManager {
  private db: QuickDBHandler | MongooseHandler;

  constructor(options?: GiftManagerOptions) {
    if (options?.quickdb && options?.mongodb) {
      throw new AtosJSError(
        ErrorMessages[ErrorCodes.INVALID_DB_SELECTION],
        ErrorCodes.INVALID_DB_SELECTION
      );
    }

    const logging = options?.logging ?? true;

    if (options?.quickdb) {
      this.db = new QuickDBHandler(options.quickdb.filePath || "json.sqlite", logging);
    } else if (options?.mongodb) {
      this.db = new MongooseHandler(
        options.mongodb.connect,
        options.mongodb.dbName,
        logging
      );
    } else {
      this.db = new QuickDBHandler("json.sqlite", logging);
    }
  }

  /**
   * Generates a new gift code with optional configuration.
   *
   * @param options - Optional configuration for the gift:
   *   - `type`: The type of the gift (e.g., "discount", "voucher").
   *   - `value`: The value of the gift (e.g., a discount amount or voucher code).
   *   - `expiration`: The expiration time as a string (e.g., "1d" for 1 day, "2h" for 2 hours).
   *   - `maxRedeem`: The maximum number of times the gift can be redeemed (default: 1).
   *   - `edit`: An object containing a `code` property to edit an existing gift instead of creating a new one.
   * @returns A Promise resolving to the generated or edited gift code.
   *
   * @example
   * // Generate a new gift
   * const code = await generate({
   *   type: 'discount',
   *   value: '10%',
   *   expiration: '7d', // Expires in 7 days
   *   maxRedeem: 5, // Can be redeemed up to 5 times
   * });
   * console.log(`Generated gift code: ${code}`);
   *
   * @example
   * // Edit an existing gift
   * const code = await generate({
   *   edit: { code: 'existing-code' },
   *   type: 'voucher',
   *   value: 'FREE_SHIPPING',
   *   expiration: '1h', // Expires in 1 hour
   * });
   * console.log(`Edited gift code: ${code}`);
   */
  public async generate(options?: GenerateOptions): Promise<string> {
    return generateGift(this.db, options);
  }

  /**
   * Redeems a gift by its ID. Validates the gift and updates its redemption status.
   *
   * @param giftId - The ID of the gift to redeem.
   * @returns A Promise resolving to an object containing:
   *   - `success`: Whether the redemption was successful.
   *
   * @example
   * const result = await redeem('gift-123');
   * if (result.success) {
   *   console.log('Gift redeemed successfully!');
   * } else {
   *   console.log('Gift is invalid, expired, or already fully redeemed.');
   * }
   */
  public async redeem(giftId: string): Promise<{ success: boolean }> {
    return redeemGift(this.db, giftId);
  }

  /**
   * Retrieves and validates a gift by its ID.
   *
   * @param giftId - The ID of the gift to view.
   * @returns A Promise resolving to an object containing:
   *   - `valid`: Whether the gift is valid (not expired or fully redeemed).
   *   - `type`: The type of the gift (if valid).
   *   - `value`: The value of the gift (if valid).
   *
   * @example
   * const result = await view('gift-123');
   * if (result.valid) {
   *   console.log(`Gift type: ${result.type}, value: ${result.value}`);
   * } else {
   *   console.log('Gift is invalid or expired.');
   * }
   */
  public async view(
    giftId: string
  ): Promise<{ valid: boolean; type?: string; value?: unknown }> {
    return viewGift(this.db, giftId);
  }
}
