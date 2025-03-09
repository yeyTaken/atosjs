import ms from "ms";

export class TimeFormat {
  /**
   * Pauses execution for a specified time.
   *
   * @param time - Time in milliseconds.
   * @returns A Promise that resolves after the specified time.
   *
   * @example
   * await t.sleep(1000); // Waits for 1 second
   */
  public sleep(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
   * Executes a function repeatedly at a set interval.
   *
   * @param interval - Time interval between executions, in milliseconds.
   * @param callback - Function to be executed, receiving the current count as a parameter.
   *
   * @example
   * // Executes once after 2 seconds
   * t.time(2000, (count) => {
   *   console.log(`Execution ${count}`);
   * });
   */
  public time(interval: number, callback: (count: number) => void): void;

  /**
   * Executes a function repeatedly at a set interval, a specific number of times.
   *
   * @param interval - Time interval between executions, in milliseconds.
   * @param repetitions - Number of times to execute.
   * @param callback - Function to be executed, receiving the current count as a parameter.
   *
   * @example
   * // Executes 3 times, every 1 second
   * t.time(1000, 3, (count) => {
   *   console.log(`Execution ${count}`);
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
   * Runs a queue of asynchronous tasks sequentially or with concurrency control.
   *
   * @param tasks - An array of asynchronous functions (tasks) to be executed.
   * @param options - Configuration options:
   *   - `concurrency`: Maximum number of tasks running simultaneously (default: 1).
   *   - `stopOnError`: If true, stops execution on error (default: true).
   * @returns A Promise that resolves when all tasks are completed.
   *
   * @example
   * const task1 = async () => {
   *   console.log("Task 1 started");
   *   await t.sleep(5000);
   *   console.log("Task 1 finished");
   * };
   * 
   * const task2 = async () => {
   *   console.log("Task 2 started");
   *   await t.sleep(1000);
   *   console.log("Task 2 finished");
   * };
   * 
   * t.queue([task1, task2])
   *   .then(() => console.log("All tasks completed."))
   *   .catch((error) => console.error("Error in a task:", error));
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
   * Converts a time value: if it's a string, returns the number of milliseconds;
   * if it's a number, returns a readable string.
   *
   * @param value - Time string (e.g., "1s", "2m", "3h") or milliseconds.
   * @returns The converted value.
   *
   * @example
   * const delay = t.ms("2s"); // 2000
   * const readable = t.ms(1000); // "1s"
   */
  public ms(value: any) {
    return ms(value);
  }
}
