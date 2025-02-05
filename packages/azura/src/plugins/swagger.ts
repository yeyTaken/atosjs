import { RouterManager } from "../router/routerManager";

export function swaggerDocs(routerManager: RouterManager) {
  const routesData = routerManager.getRoutes();

  return {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
    },
    paths: Object.keys(routesData).reduce((acc, method) => {
      Object.keys(routesData[method]).forEach((path) => {
        const route = routesData[method][path];

        acc[path] = acc[path] || {};
        acc[path][method.toLowerCase()] = {
          summary: route.meta?.summary || "",
          description: route.meta?.description || "",
          tags: route.meta?.tags || [],
          parameters: Object.keys(route.meta?.parameters || {}).map((key) => ({
            name: key,
            in: "path",
            schema: { type: "string" },
          })),
          responses: route.meta?.responses || {},
        };
      });
      return acc;
    }, {} as Record<string, any>),
  };
}

export function swaggerRender(router: RouterManager) {
  router.addRoute("get", "/swagger.json", (req: any, res: any) => {
    res.send(swaggerDocs(router));
  });

  router.addRoute("get", "/docs", (req: any, res: any) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>API Docs</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css" />
              </head>
              <body>
                <div id="swagger-ui"></div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.min.js"></script>
                <script>
                  window.onload = function() {
                    SwaggerUIBundle({
                      url: "/swagger.json",
                      dom_id: "#swagger-ui"
                    });
                  };
                </script>
              </body>
              </html>
            `);
  });
}
