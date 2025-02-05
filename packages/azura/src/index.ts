import { Middleware, Plugin, RouteMeta, RouterHandler, ServerOptions } from "./@types";
import { RouterManager } from "./router/routerManager";
import { LRUCache } from "./utils/cacheManager";
import serverConnection from "./core/server";
import setupCors from "./plugins/cors";
import { swaggerRender } from "./plugins/swagger";

export class AzuraServer {
  public router: RouterManager;
  public options: ServerOptions;
  public middleware: Middleware[] = [];
  public plugins: Plugin[] = [];
  public cache: LRUCache;

  constructor(options: ServerOptions = {}) {
    this.router = new RouterManager();
    this.options = { jsonParser: options.jsonParser ?? true, ...options };
    this.cache = new LRUCache(options.cacheSize ?? 1000);

    if (this.options.cors) {
      this.use(setupCors(this)!);
    }

    if (this.options.swagger) {
      swaggerRender(this.router);
    }

    this.router.addRoute("get", "/favicon.ico", (req, res) => {
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

  start(port?: number | 3000, callback?: () => void) {
    serverConnection(this, port ?? 3000, callback);
  }
}
