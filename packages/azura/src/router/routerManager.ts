import { RouterHandler, RouteMeta } from "../@types";

export class RouterManager {
  private routes: Record<string, Record<string, { handler: RouterHandler; meta?: RouteMeta }>> = {};

  addRoute(method: string, path: string, handler: RouterHandler) {
    const normalizedMethod = method.toUpperCase();
    if (!this.routes[normalizedMethod]) {
      this.routes[normalizedMethod] = {};
    }
    this.routes[normalizedMethod][path] = { handler };
  }

  handleRequest(method: string, path: string, req: any, res: any) {
    const normalizedMethod = method.toUpperCase();
    const route = this.routes[normalizedMethod]?.[path];
    if (route) {
      const swagger = (meta: RouteMeta) => {
        req.routeMeta = meta;
      };
      route.handler(req, res, swagger);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  }

  getRoutes() {
    return this.routes;
  }
}
