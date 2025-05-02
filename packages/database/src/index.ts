import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

/**
 * Class to manage an SQLite database using better-sqlite3.
 */
class AtosDB {
  private db: Database.Database;

  /**
   * Initializes the connection with the SQLite database.
   * Creates the `data` table if it doesn't exist.
   *
   * @param options.filePath - Path to the SQLite file.
   * @param options.verbose - If true, logs SQL queries to the console.
   * @throws Error if `filePath` is not a valid string.
   */
  constructor({
    filePath = "json.sqlite",
    verbose = false,
  }: { filePath?: string; verbose?: boolean } = {}) {
    if (typeof filePath !== "string" || !filePath.trim()) {
      throw new Error("filePath must be a non-empty string");
    }

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.db = new Database(filePath, { verbose: verbose ? console.log : undefined });

    this.db.prepare(
      "CREATE TABLE IF NOT EXISTS data (key TEXT PRIMARY KEY, value TEXT)"
    ).run();
  }

  private _validateKey(key: string): void {
    if (typeof key !== "string" || !key.trim()) {
      throw new Error("Key must be a non-empty string");
    }
  }

  private _safeStringify(value: any): string {
    try {
      return JSON.stringify(value);
    } catch {
      throw new Error("Value could not be serialized to JSON");
    }
  }

  private _safeParse(text: string): any {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  async set(key: string, value: any): Promise<void> {
    this._validateKey(key);
    const serialized = this._safeStringify(value);
    this.db.prepare(
      "INSERT INTO data (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
    ).run(key, serialized);
  }

  async get(key: string): Promise<any | null> {
    this._validateKey(key);
    const row = this.db.prepare("SELECT value FROM data WHERE key = ?").get(key) as { value: string } | undefined;
    return row ? this._safeParse(row.value) : null;
  }

  async has(key: string): Promise<boolean> {
    this._validateKey(key);
    const row = this.db.prepare("SELECT 1 FROM data WHERE key = ?").get(key);
    return !!row;
  }

  async delete(key: string): Promise<void> {
    this._validateKey(key);
    this.db.prepare("DELETE FROM data WHERE key = ?").run(key);
  }

  async deleteAll(): Promise<void> {
    this.db.prepare("DELETE FROM data").run();
  }

  async push(key: string, value: any): Promise<void> {
    this._validateKey(key);
    let current = await this.get(key);
    if (Array.isArray(current)) {
      current.push(value);
    } else if (current === null) {
      current = [value];
    } else {
      current = [current, value];
    }
    await this.set(key, current);
  }

  /**
   * Method to add a value to the existing one.
   * @param key The key in the database.
   * @param value The value to be added.
   * @returns The updated value.
   */
  async add(key: string, value: number): Promise<number> {
    return this.addSubtract(key, value);
  }

  /**
   * Method to subtract a value from the existing one.
   * @param key The key in the database.
   * @param value The value to be subtracted.
   * @returns The updated value.
   */
  async sub(key: string, value: number): Promise<number> {
    return this.addSubtract(key, value, true);
  }

  /**
   * Generic method to add or subtract values.
   * @param key The key in the database.
   * @param value The value to be added or subtracted.
   * @param isSubtract Indicates whether it is a subtraction.
   * @returns The updated value.
   */
  private async addSubtract(key: string, value: number, isSubtract: boolean = false): Promise<number> {
    this._validateKey(key);

    if (typeof value !== "number") {
      throw new Error("Value must be a number");
    }

    let current = await this.get(key);

    if (current === null) {
      current = 0;
    } else if (typeof current !== "number") {
      throw new Error("Stored value is not a number");
    }

    const newValue = isSubtract ? current - value : current + value;
    await this.set(key, newValue);

    return newValue;
  }

  async close(): Promise<void> {
    this.db.close();
  }
}

export { AtosDB };
