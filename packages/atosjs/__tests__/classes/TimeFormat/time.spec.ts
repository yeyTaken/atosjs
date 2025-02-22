import { describe, it, expect, vi } from 'vitest';
import { TimeFormat, ms } from '../../../src/classes/TimeFormat';


describe('TimeFormat', () => {
  it('deve iniciar um timeout corretamente', () => {
    const mockFn = vi.fn();
    new TimeFormat({ time: '1s', type: 1, run: mockFn });

    expect(mockFn).not.toHaveBeenCalled();

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(mockFn).toHaveBeenCalled();
        resolve();
      }, ms('1.1s'));
    });
  });

  it('deve iniciar uma repetição corretamente', () => {
    const mockFn = vi.fn();
    const instance = new TimeFormat({ time: 500, type: 2, repeat: 3, run: mockFn });

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(3);
        instance.stop();
        resolve();
      }, ms('2s'));
    });
  });

  it('deve lançar erro ao passar repeat em type 1', () => {
    expect(() => new TimeFormat({ time: '1s', type: 1, repeat: 2, run: () => {} })).toThrow();
  });

  it('deve lançar erro ao passar repeat inválido para type 2', () => {
    expect(() => new TimeFormat({ time: '1s', type: 2, repeat: 0, run: () => {} })).toThrow();
  });

  it('deve lançar erro ao passar um tipo inválido', () => {
    expect(() => new TimeFormat({ time: '1s', type: 3 as 1 | 2, run: () => {} })).toThrow();
  });

  it('deve parar a execução corretamente', () => {
    const mockFn = vi.fn();
    const instance = new TimeFormat({ time: '500ms', type: 2, repeat: 10, run: mockFn });
    
    setTimeout(() => {
      instance.stop();
    }, ms('1s'));

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const calls = mockFn.mock.calls.length;
        setTimeout(() => {
          expect(mockFn.mock.calls.length).toBe(calls);
          resolve();
        }, ms('1s'));
      }, ms('1s'));
    });
  });
});
