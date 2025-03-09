import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

/**
 * Classe para gerenciar um banco de dados SQLite usando better-sqlite3.
 */
class AtosDB {
  private db: Database.Database;

  /**
   * Inicializa a conexão com o banco de dados SQLite.
   * Cria a tabela `data` se não existir.
   *
   * @param options.filePath - Caminho do arquivo SQLite.
   * @param options.verbose - Se verdadeiro, loga as consultas SQL no console.
   * @throws Error se `filePath` não for uma string válida.
   */
  constructor({
    filePath = "json.sqlite",
    verbose = false,
  }: { filePath?: string; verbose?: boolean } = {}) {
    if (typeof filePath !== "string" || !filePath.trim()) {
      throw new Error("O filePath deve ser uma string não vazia");
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
      throw new Error("A chave deve ser uma string não vazia");
    }
  }

  private _safeStringify(value: any): string {
    try {
      return JSON.stringify(value);
    } catch {
      throw new Error("O valor não pôde ser convertido para JSON");
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

  async close(): Promise<void> {
    this.db.close();
  }
}

export { AtosDB };
