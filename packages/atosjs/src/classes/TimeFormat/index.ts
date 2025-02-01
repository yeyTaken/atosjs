import { AtosJSError, ErrorCodes, ErrorMessages } from '../../errors';
import formatData from './format.json';

type TimeFormatOptions = {
  format?: {
    short?: boolean;
    locale?: keyof typeof formatData; // Restrict locale to keys of formatData
  };
};

export class TimeFormat {
  private format: { short: boolean; locale: keyof typeof formatData };

  constructor(options: TimeFormatOptions = {}) {
    this.format = {
      short: options.format?.short ?? true, // Default: short format
      locale: options.format?.locale ?? 'en-US', // Default: en-US
    };

    if (!formatData[this.format.locale]) {
      throw new AtosJSError(
        ErrorMessages[ErrorCodes.INVALID_FORMAT_DATA],
        ErrorCodes.INVALID_FORMAT_DATA
      );
    }
  }

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
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      default:
        throw new AtosJSError(
          ErrorMessages[ErrorCodes.INVALID_TIME_UNIT],
          ErrorCodes.INVALID_TIME_UNIT
        );
    }
  }

  convertFromMilliseconds(ms: number): string {
    // Verifica se o valor de milissegundos é menor que 1000 (1 segundo)
    if (ms < 1000) {
      throw new AtosJSError(
        ErrorMessages[ErrorCodes.INVALID_MS_VALUE],
        ErrorCodes.INVALID_MS_VALUE
      );
    }
  
    const { short, locale } = this.format;
    const timeUnits = formatData[locale]; // Agora inferido de forma segura
  
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  
    if (short) {
      // Formato curto: '1h 20m 30s'
      return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m ` : ''}${seconds > 0 ? `${seconds}s ` : ''}`.trim();
    }
  
    // Formato longo: e.g., '1 hour 20 minutes 30 seconds' (en-US) ou '1 hora 20 minutos 30 segundos' (pt-BR)
    const hourStr = hours > 0 ? `${hours} ${hours > 1 ? timeUnits.h[1] : timeUnits.h[0]}` : '';
    const minuteStr = minutes > 0 ? `${minutes} ${minutes > 1 ? timeUnits.m[1] : timeUnits.m[0]}` : '';
    const secondStr = seconds > 0 ? `${seconds} ${seconds > 1 ? timeUnits.s[1] : timeUnits.s[0]}` : '';
  
    return [hourStr, minuteStr, secondStr].filter(Boolean).join(' ');
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
}
