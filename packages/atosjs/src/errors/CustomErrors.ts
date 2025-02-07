export class AtosJSError extends Error {
  public code: string;

  constructor(message: string, code: string) {
     super(message);
     this.name = 'AtosJSError';
     this.code = code;
     Error.captureStackTrace(this, this.constructor);
  }
};

export class InvalidTimeUnit extends AtosJSError {
  constructor() {
    super('Invalid time unit. Use 60s, 7d, 10m and 1y.', 'INVALID_TIME_UNIT');
  }
}

export class InvalidFormatData extends AtosJSError {
  constructor() {
    super('Invalid formatData provided.', 'INVALID_FORMAT_DATA');
  }
};

export class InvalidMsValue extends AtosJSError {
  constructor() {
    super('The value must be greater than or equal to 1000 milliseconds (1s).', 'INVALID_MS_VALUE');
  }
};

export class InvalidDbSelection extends AtosJSError {
  constructor() {
    super('Invalid database selection provided.', 'INVALID_DB_SELECTION');
  }
};

export class InvalidRepeatValue extends AtosJSError {
  constructor() {
    super('Invalid repeat value provided.', 'INVALID_REPEAT_VALUE');
  }
};

export class InvalidTypeValue extends AtosJSError {
  constructor() {
    super('Invalid type value provided.', 'INVALID_TYPE_VALUE');
  }
};

export class RepeatNotAllowed extends AtosJSError {
  constructor() {
    super('Repeat does not work if type is different from 2.', 'REPEAT_NOT_ALLOWED');
  }
}