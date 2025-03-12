import { readdirSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { RouteMeta, RouterHandler, ServerOptions } from "../types";
import chalk from "chalk";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class RouterManager {
  private routes: Map<string, Map<string, { handler: RouterHandler; meta?: RouteMeta }>> =
    new Map();

  constructor() {}

  addRoute(method: string, path: string, handler: RouterHandler, meta?: RouteMeta) {
    method = method.toUpperCase();
    path = path.startsWith("/") ? path : `/${path}`;
    if (!this.routes.has(method)) {
      this.routes.set(method, new Map());
    }

    this.routes.get(method)?.set(path, { handler, meta });
  }

  async loadRedirectClasses(config: ServerOptions) {
    const redirectsPath = config.redirectsPath || join(process.cwd(), "src/redirects");
    if (!existsSync(redirectsPath)) {
      console.warn(
        chalk.yellow(`⚠️ Nenhuma pasta de redirecionamentos encontrada em "${redirectsPath}".`)
      );
      return;
    }
    console.log(chalk.cyan.bold(`📂 Carregando redirecionamentos de: ${redirectsPath}`));
    const files = readdirSync(redirectsPath).filter(
      (file) => file.endsWith(".ts") || file.endsWith(".js")
    );
    for (const file of files) {
      const filePath = join(redirectsPath, file);
      const fileUrl = `file://${resolve(filePath).replace(/\\/g, "/")}`;
      try {
        const routeModule = await import(fileUrl);
        const RedirectClass = routeModule.default || routeModule;
        if (typeof RedirectClass === "function" && RedirectClass.from && RedirectClass.to) {
          this.addRoute("GET", RedirectClass.from, (_req, res) => {
            res.writeHead(301, { Location: RedirectClass.to });
            res.end();
          });
        }
      } catch (error) {
        console.error(`❌ Erro ao carregar redirecionamento ${file}:`, error);
      }
    }
  }

  async loadRedirects(_config: ServerOptions) {
    const configPath = join(process.cwd(), "azura.config.json");
    if (!existsSync(configPath)) {
      console.warn(
        chalk.yellow(`⚠️ Nenhum arquivo de configuração encontrado em "${configPath}".`)
      );
      return;
    }
    const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    const redirects = configData.redirects || [];
    for (const redirect of redirects) {
      this.addRoute("GET", redirect.from, (_req, res) => {
        res.writeHead(301, { Location: redirect.to });
        res.end();
      });
    }
  }

  async loadRoutes(config: ServerOptions) {
    let routesDir = config.routesPath || join(__dirname, "../routes");
    if (!existsSync(routesDir)) {
      routesDir = join(process.cwd(), "src/routes");
    }
    if (!existsSync(routesDir)) {
      console.warn(chalk.yellow(`⚠️ Nenhuma pasta de rotas encontrada em "${routesDir}".`));
      return;
    }

    if (config.logging && !config.server?.node?.includes("production"))
      console.log(chalk.cyan.bold(`📂 Carregando rotas de: ${routesDir}`));
    const files = readdirSync(routesDir).filter(
      (file) => file.endsWith(".ts") || file.endsWith(".js")
    );
    for (const file of files) {
      const filePath = join(routesDir, file);
      const fileUrl = `file://${resolve(filePath).replace(/\\/g, "/")}`;
      try {
        const routeModule = await import(fileUrl);
        const RouteClass = routeModule.default || routeModule;
        if (typeof RouteClass === "function") {
          const instance = new RouteClass();
          if (instance.method && typeof instance.handle === "function") {
            const routePath = instance.path;
            let routeMeta: RouteMeta | undefined;
            if (instance.swagger) {
              routeMeta = instance.swagger();
            }

            const boundHandler = instance.handle.bind(instance);
            this.addRoute(instance.method, routePath, boundHandler, routeMeta);
          }
        }
      } catch (error) {
        console.error(`❌ Erro ao carregar rota ${file}:`, error);
      }
    }
  }

  getRoutes() {
    return this.routes;
  }
}
