// import { AtosJSError, ErrorCodes, ErrorMessages } from '../../errors';
import ms from "ms";

/**
 * Pauses execution for a specified amount of time.
 * 
 * @param time - The wait time in milliseconds.
 * @returns A Promise that resolves after the specified time.
 * 
 * @example
 * await sleep(1000); // Waits for 1 second
 */
export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

/**
 * Executes a function repeatedly at defined intervals.
 * 
 * @param interval - The time interval between executions, in milliseconds.
 * @param repetitions - The number of repetitions. If omitted, it runs once.
 * @param callback - The function to execute. Receives the current iteration count as a parameter.
 * 
 * @example
 * // Runs 3 times, every 1 second
 * time(1000, 3, (count) => {
 *   console.log(`Execution ${count}`);
 * });
 * 
 * @example
 * // Runs once after 2 seconds
 * time(2000, (count) => {
 *   console.log(`Execution ${count}`);
 * });
 */
export function time(interval: number, callback: (count: number) => void): void;
export function time(interval: number, repetitions: number, callback: (count: number) => void): void;
export function time(
  interval: number,
  repetitionsOrCallback: number | ((count: number) => void),
  callbackArg?: (count: number) => void
): void {
  let repetitions: number;
  let callback: (count: number) => void;

  if (typeof repetitionsOrCallback === 'function') {
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

type Task = () => Promise<any>;

interface QueueOptions {
  concurrency?: number; // Controls the maximum number of tasks running simultaneously.
  stopOnError?: boolean; // Whether to stop execution on error.
}

/**
 * Executes a queue of asynchronous tasks sequentially or with controlled concurrency.
 * 
 * @param tasks - An array of asynchronous functions (tasks) to execute.
 * @param options - Configuration options:
 *   - `concurrency`: Maximum number of tasks running simultaneously (default: 1).
 *   - `stopOnError`: If true, stops execution on error (default: true).
 * @returns A Promise that resolves when all tasks are completed.
 * 
 * @example
 * const task1 = async () => {
 *   console.log("Task 1 started");
 *   await sleep(5000);
 *   console.log("Task 1 finished");
 * };
 * 
 * const task2 = async () => {
 *   console.log("Task 2 started");
 *   await sleep(1000);
 *   console.log("Task 2 finished");
 * };
 * 
 * queue([task1, task2])
 *   .then(() => console.log("All tasks completed."))
 *   .catch((error) => console.error("Error in tasks:", error));
 */
export function queue(tasks: Task[], options: QueueOptions = {}): Promise<void> {
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
 * Converts a time string (e.g., "1s", "2m", "3h") to milliseconds, or milliseconds to a human-readable string.
 * 
 * @param value - The time string (e.g., "1s") or number of milliseconds (e.g., 1000).
 * @returns The time in milliseconds (if input is a string) or a human-readable string (if input is a number).
 * 
 * @example
 * const delay = ms("2s"); // 2000
 * await sleep(delay); // Waits for 2 seconds
 * 
 * @example
 * const readable = ms(1000); // "1s"
 * console.log(readable); // Outputs "1s"
 */
export { ms };