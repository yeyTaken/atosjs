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

export class InvalidFormatData extends AtosJSError {
  constructor() {
    super('Invalid formatData provided.', 'INVALID_FORMAT_DATA');
  }
}

export class InvalidMsValue extends AtosJSError {
  constructor() {
    super('The value must be greater than or equal to 1000 milliseconds (1s).', 'INVALID_MS_VALUE');
  }
}