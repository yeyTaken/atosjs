import { AtosJSError, ErrorCodes, ErrorMessages } from '../../errors';

export class TimeFormat {
  convertToMilliseconds(time: string): number {
    const regex = /(\d+)([smh])/;
    const match = regex.exec(time);
    if (!match) {
      throw new AtosJSError(
        ErrorMessages[ErrorCodes.INVALID_TIME_UNIT],
        ErrorCodes.INVALID_TIME_UNIT
    );
  }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's': return value * 1000;
      case 'm': return value * 60 * 1000;
      case 'h': return value * 60 * 60 * 1000;
    default: throw new AtosJSError(
      ErrorMessages[ErrorCodes.INVALID_TIME_UNIT],
      ErrorCodes.INVALID_TIME_UNIT
    );
    }
  }

  every(interval: string, callback: () => void): NodeJS.Timeout {
    const ms = this.convertToMilliseconds(interval);
    return setInterval(callback, ms);
  }
  
  repeatInfinite(interval: string, callback: () => void): NodeJS.Timeout {
    const ms = this.convertToMilliseconds(interval);
    return setInterval(callback, ms);
  }  

  after(delay: string, callback: () => void): void {
    const ms = this.convertToMilliseconds(delay);
    setTimeout(callback, ms);
  }

  elapsedSince(timestamp: number): number {
    return Date.now() - timestamp;
  }

  dailyAt(hour: number, minute: number, callback: () => void): void {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);

    const delay = next.getTime() - now.getTime();
    setTimeout(() => {
      callback();
      this.every('24h', callback);
    }, delay);
  }

  repeat(count: number, interval: string, callback: () => void): void {
    const ms = this.convertToMilliseconds(interval);
    let executed = 0;
    const id = setInterval(() => {
      if (executed >= count) {
        clearInterval(id);
        return;
      }
      executed++;
      callback();
    }, ms);
  }

  countdown(duration: string, onComplete: () => void): void {
    const ms = this.convertToMilliseconds(duration);
    setTimeout(onComplete, ms);
  }

  convertFromMilliseconds(ms: number): string {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
