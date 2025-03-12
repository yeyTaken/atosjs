import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { MissingConfigError } from "../errors/messages/missingConfig.error";
import { ServerOptions } from "../types";

const jsonConfigPath = path.resolve(process.cwd(), "azura.config.json");
const tsConfigPath = path.resolve(process.cwd(), "azura.config.ts");

export async function loadConfig(): Promise<ServerOptions> {
  if (fs.existsSync(tsConfigPath)) {
    try {
      const configModule = await import(pathToFileURL(tsConfigPath).toString());
      const config = configModule.default || configModule;
      return config as ServerOptions;
    } catch (error) {
      throw new Error(`Erro ao carregar o arquivo de configuração TypeScript: ${error}`);
    }
  }

  if (fs.existsSync(jsonConfigPath)) {
    try {
      const fileContent = await fs.promises.readFile(jsonConfigPath, "utf-8");
      return JSON.parse(fileContent) as ServerOptions;
    } catch (error) {
      throw new Error(`Erro ao carregar o arquivo de configuração JSON: ${error}`);
    }
  }

  throw new MissingConfigError();
}
