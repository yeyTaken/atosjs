import * as path from "path";
import * as fs from "fs";
import * as ejs from "ejs";
import { ServerOptions } from "@/types";
import chalk from "chalk";

class TemplateManager {
  private viewsPath: string = "";
  private templateCache: Map<string, string> = new Map();

  setViewsPath(config: ServerOptions) {
    this.viewsPath = config.ejsEngine?.viewsPath || path.join(process.cwd(), "src/views");
    if (config.logging && !config.server?.node?.includes("production"))
      console.log(chalk.cyan.bold(`📂 Diretório de views configurado: ${this.viewsPath}`));
  }

  async render(view: string, data: Record<string, any> = {}): Promise<string> {
    if (!this.viewsPath) {
      throw new Error("O diretório de views não foi definido! Verifique sua configuração.");
    }

    const filePath = path.join(this.viewsPath, `${view}.ejs`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`View '${view}.ejs' não encontrada em '${this.viewsPath}'`);
    }

    if (this.templateCache.has(filePath)) {
      const compiledTemplate = this.templateCache.get(filePath)!;
      return ejs.render(compiledTemplate, data);
    }

    return new Promise((resolve, reject) => {
      ejs.renderFile(filePath, data, {}, (err, str) => {
        if (err) return reject(err);
        this.templateCache.set(filePath, str);
        resolve(str);
      });
    });
  }
}

export const templateManager = new TemplateManager();
