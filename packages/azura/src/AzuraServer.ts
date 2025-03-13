import { Middleware, Plugin, RouterHandler, ServerOptions } from "./types";
import serverConnection from "./core/server";
import { swaggerRender } from "./plugins/swagger";
import setupCors from "./plugins/cors";
import { RouterManager } from "./router/routerManager";
import { LRUCache } from "./utils/cacheManager";
import { loadConfig } from "./utils/configManager";
import { templateManager } from "./utils/templateManager";
import cluster from "cluster";
import os from "os";

class AzuraServer {
  private static instance: AzuraServer | null = null;
  public router: RouterManager;
  public options: ServerOptions;
  public middleware: Middleware[] = [];
  public plugins: Plugin[] = [];
  public cache: LRUCache<any>;
  public requestInterceptors: Middleware[] = [];
  public responseInterceptors: ((data: any) => any)[] = [];

  constructor(options?: ServerOptions) {
    this.options = { jsonParser: options?.jsonParser ?? true, ...options };
    if (!AzuraServer.instance) {
      AzuraServer.instance = this;
    }
    const cacheSize = this.options.cacheSize ?? 1000;
    const cacheTTL = this.options.cacheTTL ?? 60000;
    this.cache = new LRUCache(cacheSize, cacheTTL);
    this.router = new RouterManager();
  }

  private async loadConfig() {
    try {
      const config = await loadConfig();
      if (config) {
        this.options = { ...this.options, ...config };
        this.cache = new LRUCache(this.options.cacheSize ?? 1000, this.options.cacheTTL ?? 0);
        templateManager.setViewsPath(this.options);
      }
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  private async initializePlugins() {
    await this.loadConfig();
    await this.router.loadRoutes(this.options);
    await this.router.loadRedirectClasses(this.options);
    await this.router.loadRedirects(this.options);

    this.setupDefaultRoutes();
    if (this.options.cors) setupCors(this);
    if (this.options.swagger) swaggerRender(this.router);
  }

  private setupDefaultRoutes() {
    this.router.addRoute("GET", "/favicon.ico", (_req, res) => {
      res.status(204).end();
    });
  }

  use(middleware: Middleware) {
    if (typeof middleware !== "function") {
      throw new Error("Middleware deve ser uma função!");
    }
    this.middleware.push(middleware);
  }

  useRequestInterceptor(middleware: Middleware) {
    this.requestInterceptors.push(middleware);
  }

  useResponseInterceptor(interceptor: (data: any) => any) {
    this.responseInterceptors.push(interceptor);
  }

  register(plugin: Plugin) {
    plugin(this);
    this.plugins.push(plugin);
  }

  get(path: string, handler: RouterHandler) {
    this.router.addRoute("GET", path, handler);
  }

  post(path: string, handler: RouterHandler) {
    this.router.addRoute("POST", path, handler);
  }

  put(path: string, handler: RouterHandler) {
    this.router.addRoute("PUT", path, handler);
  }

  delete(path: string, handler: RouterHandler) {
    this.router.addRoute("DELETE", path, handler);
  }

  async start(callback?: () => void) {
    if (this.options.server?.cluster) {
      if (cluster.isPrimary) {
        const cpuCount = os.cpus().length;
        console.log(`Master ${process.pid} está rodando. Forking ${cpuCount} workers...`);
        for (let i = 0; i < cpuCount; i++) {
          cluster.fork();
        }
        cluster.on("exit", (worker, _code, _signal) => {
          console.log(`Worker ${worker.process.pid} morreu. Reiniciando...`);
          cluster.fork();
        });
        if (callback) callback();
        return;
      } else {
        process.on("uncaughtException", (err) => {
          console.error("Exceção não tratada no worker:", err);
          process.exit(1);
        });
        process.on("unhandledRejection", (reason) => {
          console.error("Rejeição não tratada no worker:", reason);
          process.exit(1);
        });

        await this.initializePlugins();
        const port = this.options.server?.port ?? 3000;
        serverConnection(this, port, callback);
      }
    } else {
      await this.initializePlugins();
      const port = this.options.server?.port ?? 3000;
      serverConnection(this, port, callback);
    }
  }
}

export { AzuraServer };
