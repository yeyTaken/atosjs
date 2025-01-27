import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorMessages } from '../../src/errors';
import { TimeFormat } from '../../src';

describe('TimeFormat', () => {
  let timeFormat: TimeFormat;

  beforeEach(() => {
    timeFormat = new TimeFormat();
  });

  describe('convertToMilliseconds', () => {
    it('deve converter segundos para milissegundos', () => {
      expect(timeFormat.convertToMilliseconds('10s')).toBe(10000);
    });

    it('deve converter minutos para milissegundos', () => {
      expect(timeFormat.convertToMilliseconds('5m')).toBe(300000);
    });

    it('deve converter horas para milissegundos', () => {
      expect(timeFormat.convertToMilliseconds('2h')).toBe(7200000);
    });

    it('deve lançar erro para formato inválido', () => {
      expect(() => timeFormat.convertToMilliseconds('10x')).toThrowError(ErrorMessages.INVALID_TIME_UNIT);
    });

    it('deve lançar erro para unidade inválida', () => {
      expect(() => timeFormat.convertToMilliseconds('10z')).toThrowError(ErrorMessages.INVALID_TIME_UNIT);
    });
  });

  describe('every', () => {
    it('deve chamar a função em intervalos corretos', async () => {
      const callback = vi.fn();
      const interval = '1s';
      timeFormat.every(interval, callback);
  
      // Espera o intervalo passar e verifica se a função foi chamada
      await new Promise(resolve => setTimeout(resolve, 1000)); // Espera por 1 segundo
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('repeatInfinite', () => {
    it('deve chamar a função infinitamente', () => {
      const callback = vi.fn();
      const interval = '1s';
      timeFormat.repeatInfinite(interval, callback);

      // Verifica se a função foi chamada infinitamente após 1 segundo
      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(2); // Pelo menos 2 vezes após 2 segundos
      }, 2000);
    });
  });

  describe('after', () => {
    it('deve chamar a função após o delay', () => {
      const callback = vi.fn();
      timeFormat.after('1s', callback);

      // Verifica se a função é chamada após o delay
      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(1);
      }, 1000);
    });
  });

  describe('elapsedSince', () => {
    it('deve calcular o tempo decorrido desde o timestamp', () => {
      const timestamp = Date.now();
      setTimeout(() => {
        const elapsed = timeFormat.elapsedSince(timestamp);
        expect(elapsed).toBeGreaterThan(0);
      }, 1000);
    });
  });

  describe('dailyAt', () => {
    it('deve chamar a função no horário programado', () => {
      const callback = vi.fn();
      const hour = 23;
      const minute = 59;
      timeFormat.dailyAt(hour, minute, callback);

      // Verifica se a função é chamada no horário correto
      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(1);
      }, 1000 * 60); // Verifica se a função foi chamada após 1 minuto
    });
  });

  describe('repeat', () => {
    it('deve chamar a função o número correto de vezes', () => {
      const callback = vi.fn();
      const interval = '1s';
      const count = 3;
      timeFormat.repeat(count, interval, callback);

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(count);
      }, 3000); // Aguarda 3 segundos para garantir a execução
    });

    it('deve parar após atingir o número de repetições', () => {
      const callback = vi.fn();
      const interval = '1s';
      const count = 2;
      timeFormat.repeat(count, interval, callback);

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(count);
      }, 2500); // Verifica se a função parou após 2 repetições
    });
  });

  describe('countdown', () => {
    it('deve chamar a função após o countdown', () => {
      const callback = vi.fn();
      const duration = '2s';
      timeFormat.countdown(duration, callback);

      setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(1);
      }, 2000);
    });
  });

  describe('convertFromMilliseconds', () => {
    it('deve converter milissegundos para formato de tempo', () => {
      const ms = 3605000;
      expect(timeFormat.convertFromMilliseconds(ms)).toBe('1h 5s');
    });

    it('deve converter milissegundos para formato de tempo sem horas', () => {
      const ms = 500000;
      expect(timeFormat.convertFromMilliseconds(ms)).toBe('8m 20s');
    });

    it('deve converter milissegundos para formato de tempo sem minutos', () => {
      const ms = 5000;
      expect(timeFormat.convertFromMilliseconds(ms)).toBe('5s');
    });
  });
});
