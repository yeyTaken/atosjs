import * as path from "path";
import * as fs from "fs";
import * as ejs from "ejs";
import chalk from "chalk";

export class TemplateManager {
  private viewsPath: string;

  constructor(viewsPath?: string) {
    this.viewsPath = viewsPath ?? path.join(process.cwd(), "src/views");
  }

  setViewsPath(viewsPath: string) {
    this.viewsPath = viewsPath;
    console.log(chalk.cyan.bold(`📂 Diretório de views carregado: ${this.viewsPath}`));
  }

  async render(view: string, data: Record<string, any> = {}): Promise<string> {
    const filePath = path.join(this.viewsPath, `${view}.ejs`);

    console.log(`🔍 Tentando renderizar: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ View '${view}.ejs' não encontrada em '${this.viewsPath}'`);
      throw new Error(`View '${view}.ejs' not found in '${this.viewsPath}'`);
    }

    return new Promise((resolve, reject) => {
      ejs.renderFile(filePath, data, {}, (err, str) => {
        if (err) {
          console.error(`❌ Erro ao renderizar '${view}.ejs':`, err);
          return reject(err);
        }
        console.log(`✅ View '${view}.ejs' renderizada com sucesso.`);
        resolve(str);
      });
    });
  }
}
