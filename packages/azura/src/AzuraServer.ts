import { Middleware, Plugin, RouterHandler, ServerOptions } from "./types";
import serverConnection from "./core/server";
import { swaggerRender } from "./plugins/swagger";
import setupCors from "./plugins/cors";
import { RouterManager } from "./router/routerManager";
import { LRUCache } from "./utils/cacheManager";
import { loadConfig } from "./utils/configManager";
import { missingInstanceError } from "./errors/messages/missingInstance.error";
import { TemplateManager } from "./utils/templateManager";

class AzuraServer {
  private static instance: AzuraServer | null = null;
  public template!: TemplateManager;
  public router!: RouterManager;
  public options: ServerOptions;
  public middleware: Middleware[] = [];
  public plugins: Plugin[] = [];
  public cache: LRUCache<any>;

  constructor(options?: ServerOptions) {
    this.options = { jsonParser: options?.jsonParser ?? true, ...options };

    if (!AzuraServer.instance) {
      AzuraServer.instance = this;
    }

    const cacheSize = this.options.cacheSize ?? 1000;
    const cacheTTL = this.options.cacheTTL ?? 0;

    this.cache = new LRUCache(cacheSize, cacheTTL);
    this.router = new RouterManager();
    this.template = new TemplateManager(this.options.ejsEngine?.viewsPath);
  }

  private async loadConfig() {
    try {
      const config = await loadConfig();
      if (config) {
        this.options = { ...this.options, ...config };

        this.cache = new LRUCache(this.options.cacheSize ?? 1000, this.options.cacheTTL ?? 0);
        this.template.setViewsPath(this.options.ejsEngine?.viewsPath ?? "src/views");
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

    if (this.options.cors) this.use(setupCors(this)!);
    if (this.options.swagger) swaggerRender(this.router);
  }

  private setupDefaultRoutes() {
    this.router.addRoute("GET", "/favicon.ico", (_req, res) => {
      res.writeHead(204);
      res.end();
    });
  }

  use(middleware: Middleware) {
    this.middleware.push(middleware);
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

  setViewsPath(path: string) {
    this.template.setViewsPath(path);
  }

  async render(view: string, data: Record<string, any> = {}) {
    return this.template.render(view, data);
  }

  async start(callback?: () => void) {
    const instance = AzuraServer.instance;

    if (!instance) {
      throw new missingInstanceError();
    }

    await instance.initializePlugins();

    const port = instance.options.server?.port ?? 3000;
    serverConnection(instance, port, callback);
  }
}

export { AzuraServer };
