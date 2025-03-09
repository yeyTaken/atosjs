import ms from "ms";

export class TimeFormat {
  /**
   * Pausa a execução por um determinado tempo.
   *
   * @param time - Tempo em milissegundos.
   * @returns Uma Promise que é resolvida após o tempo especificado.
   *
   * @example
   * await t.sleep(1000); // Aguarda 1 segundo
   */
  public sleep(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
   * Executa uma função repetidamente em intervalos definidos.
   *
   * @param interval - Intervalo de tempo entre as execuções, em milissegundos.
   * @param callback - Função a ser executada, que recebe o contador atual como parâmetro.
   *
   * @example
   * // Executa uma vez após 2 segundos
   * t.time(2000, (count) => {
   *   console.log(`Execução ${count}`);
   * });
   */
  public time(interval: number, callback: (count: number) => void): void;
  
  /**
   * Executa uma função repetidamente em intervalos definidos, um número específico de vezes.
   *
   * @param interval - Intervalo de tempo entre as execuções, em milissegundos.
   * @param repetitions - Número de repetições.
   * @param callback - Função a ser executada, que recebe o contador atual como parâmetro.
   *
   * @example
   * // Executa 3 vezes, a cada 1 segundo
   * t.time(1000, 3, (count) => {
   *   console.log(`Execução ${count}`);
   * });
   */
  public time(interval: number, repetitions: number, callback: (count: number) => void): void;
  
  public time(
    interval: number,
    repetitionsOrCallback: number | ((count: number) => void),
    callbackArg?: (count: number) => void
  ): void {
    let repetitions: number;
    let callback: (count: number) => void;
  
    if (typeof repetitionsOrCallback === "function") {
      repetitions = 1;
      callback = repetitionsOrCallback;
    } else {
      repetitions = repetitionsOrCallback;
      callback = callbackArg!;
    }
  
    let count = 0;
  
    const execute = () => {
      callback(count + 1);
      count++;
      if (count < repetitions) {
        setTimeout(execute, interval);
      }
    };
  
    setTimeout(execute, interval);
  }

  /**
   * Executa uma fila de tarefas assíncronas de forma sequencial ou com controle de concorrência.
   *
   * @param tasks - Um array de funções assíncronas (tarefas) a serem executadas.
   * @param options - Opções de configuração:
   *   - `concurrency`: Número máximo de tarefas executando simultaneamente (padrão: 1).
   *   - `stopOnError`: Se true, para a execução em caso de erro (padrão: true).
   * @returns Uma Promise que é resolvida quando todas as tarefas são concluídas.
   *
   * @example
   * const task1 = async () => {
   *   console.log("Task 1 iniciada");
   *   await t.sleep(5000);
   *   console.log("Task 1 finalizada");
   * };
   * 
   * const task2 = async () => {
   *   console.log("Task 2 iniciada");
   *   await t.sleep(1000);
   *   console.log("Task 2 finalizada");
   * };
   * 
   * t.queue([task1, task2])
   *   .then(() => console.log("Todas as tarefas concluídas."))
   *   .catch((error) => console.error("Erro em alguma tarefa:", error));
   */
  public queue(
    tasks: Array<() => Promise<any>>,
    options: { concurrency?: number; stopOnError?: boolean } = {}
  ): Promise<void> {
    const { concurrency = 1, stopOnError = true } = options;
    let pending = 0;
    let currentIndex = 0;
    let hasError = false;
  
    return new Promise((resolve, reject) => {
      const runNext = () => {
        if (hasError && stopOnError) return reject();
        if (currentIndex === tasks.length && pending === 0) return resolve();
  
        while (pending < concurrency && currentIndex < tasks.length && !hasError) {
          const task = tasks[currentIndex];
          currentIndex++;
          pending++;
  
          task()
            .catch((error) => {
              hasError = true;
              reject(error);
            })
            .finally(() => {
              pending--;
              runNext();
            });
        }
      };
  
      runNext();
    });
  }

  /**
   * Converte um valor de tempo: se for uma string, retorna o número de milissegundos;
   * se for um número, retorna uma string legível.
   *
   * @param value - String de tempo (ex: "1s", "2m", "3h") ou número de milissegundos.
   * @returns O valor convertido.
   *
   * @example
   * const delay = t.ms("2s"); // 2000
   * const readable = t.ms(1000); // "1s"
   */
  public ms(value: any) {
    return ms(value);
  }
}