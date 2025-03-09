import { BaseError } from "../baseError";

export class missingInstanceError extends BaseError {
  constructor() {
    super("Missing instance of AzuraServer", 500);
  }
}
