import { AtosJSError, ErrorCodes, ErrorMessages } from '../../errors';

type TimeOptions = {
  time: number | string | { hour: number; minute: number };
  type: 1 | 2;
  repeat?: number;
  start(): void;
};

export class TimeFormat {
  private time: number;
  private repeat?: number;
  private startFn: () => void;
  private intervalId?: NodeJS.Timeout;

  constructor(options: TimeOptions) {
    const { time, type, repeat, start } = options;

    if (type !== 2 && repeat !== undefined) {
      throw new AtosJSError(
        ErrorMessages[ErrorCodes.REPEAT_NOT_ALLOWED],
        ErrorCodes.REPEAT_NOT_ALLOWED
      );
    }

    if (type === 2 && (repeat === undefined || repeat < 1)) {
      throw new AtosJSError(
        ErrorMessages[ErrorCodes.INVALID_REPEAT_VALUE],
        ErrorCodes.INVALID_REPEAT_VALUE
      );
    }

    this.time = typeof time === 'object' ? this.convertToMilliseconds(time) : Number(ms(time));
    this.repeat = repeat;
    this.startFn = start;

    switch (type) {
      case 1:
        this.startTimeout();
        break;
      case 2:
        this.startRepeat();
        break;
      default:
        throw new AtosJSError(
          ErrorMessages[ErrorCodes.INVALID_TYPE_VALUE],
          ErrorCodes.INVALID_TYPE_VALUE
        );
    }
  }

  private convertToMilliseconds(time: { hour: number; minute: number }): number {
    const now = new Date();
    const target = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      time.hour,
      time.minute,
      0
    );

    const diff = target.getTime() - now.getTime();
    return diff > 0 ? diff : diff + 24 * 60 * 60 * 1000;
  }

  private startTimeout() {
    this.intervalId = setTimeout(this.startFn, this.time);
  }

  private startRepeat() {
    let count = 0;
    if (this.repeat && this.repeat < 1) {
      throw new AtosJSError(
        ErrorMessages[ErrorCodes.INVALID_REPEAT_VALUE],
        ErrorCodes.INVALID_REPEAT_VALUE
      );
    }
    this.intervalId = setInterval(() => {
      if (this.repeat && count >= this.repeat) {
        this.stop();
        return;
      }
      this.startFn();
      count++;
    }, this.time);
  }

  public stop() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      clearInterval(this.intervalId);
    }
  }
}

// Função utilitária para converter tempo:
export function ms(input: number | string): number | string {
  if (typeof input === 'number') {
    // Converter milissegundos para a string de tempo correspondente
    if (input % (60 * 60 * 1000) === 0) return `${input / (60 * 60 * 1000)}h`;
    if (input % (60 * 1000) === 0) return `${input / (60 * 1000)}m`;
    if (input % 1000 === 0) return `${input / 1000}s`;
    return `${input}ms`; // Caso não seja divisível por milissegundos, devolve o número diretamente
  }

  const match = input.match(/^(\d+)(ms|s|m|h)$/);
  if (!match) {
    throw new AtosJSError(
      ErrorMessages[ErrorCodes.INVALID_TIME_UNIT],
      ErrorCodes.INVALID_TIME_UNIT
    );
  }

  const [, amount, unit] = match;
  const parsed = parseInt(amount, 10);

  switch (unit) {
    case 'ms':
      return parsed;
    case 's':
      return parsed * 1000;
    case 'm':
      return parsed * 60 * 1000;
    case 'h':
      return parsed * 60 * 60 * 1000;
    default:
      throw new AtosJSError(
        ErrorMessages[ErrorCodes.INVALID_TIME_UNIT],
        ErrorCodes.INVALID_TIME_UNIT
      );
  } 
}
