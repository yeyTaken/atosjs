import * as path from "path";
import * as fs from "fs";
import * as ejs from "ejs";
import { ServerOptions } from "@/types";

class TemplateManager {
  private viewsPath: string = "";

  setViewsPath(config: ServerOptions) {
    this.viewsPath = config.ejsEngine?.viewsPath || path.join(process.cwd(), "src/views");
    console.log(`📂 Diretório de views configurado: ${this.viewsPath}`);
  }

  async render(view: string, data: Record<string, any> = {}): Promise<string> {
    if (!this.viewsPath) {
      throw new Error("O diretório de views não foi definido! Verifique sua configuração.");
    }

    const filePath = path.join(this.viewsPath, `${view}.ejs`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`View '${view}.ejs' não encontrada em '${this.viewsPath}'`);
    }

    return new Promise((resolve, reject) => {
      ejs.renderFile(filePath, data, {}, (err, str) => {
        if (err) return reject(err);
        resolve(str);
      });
    });
  }
}

export const templateManager = new TemplateManager();
