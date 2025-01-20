export class AtosJSError extends Error {
  public code: string;

  constructor(message: string, code: string) {
     super(message);
     this.name = 'AtosJSError';
     this.code = code;
     Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidFileType extends AtosJSError {
  constructor() {
    super('Invalid fileType. Use 1 for JSON or 2 for YAML.', 'INVALID_FILE_TYPE');
  }
}

export class InvalidTimeUnit extends AtosJSError {
  constructor() {
    super('Invalid time unit. Use 60s, 7d, 10m and 1y.', 'INVALID_TIME_UNIT');
  }
}