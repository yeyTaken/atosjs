import { BaseError } from "../baseError";

export class MissingConfigError extends BaseError {
  constructor() {
    super("Missing config file in project root", 500);
  }
}
