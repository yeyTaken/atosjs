import { URLSearchParams } from "node:url";
import { AzuraServer } from "../AzuraServer";
import uWS from "uWebSockets.js";

export type Plugin = (server: AzuraServer) => void;

export type RouterHandler = (
  req: Request,
  res: Response,
  query: URLSearchParams,
  swagger: (meta: RouteMeta) => void
) => void;

export type Middleware = (req: Request, res: Response, next: () => void) => void;

export interface RouteMeta {
  summary?: string;
  description?: string;
  tags?: string[];
  responses?: Record<number, { description: string; content?: Record<string, any> }>;
  parameters?: Array<{
    name: string;
    in: "query" | "header" | "path" | "cookie";
    required?: boolean;
    schema?: { type: string; format?: string };
  }>;
  requestBody?: {
    required?: boolean;
    content: Record<string, { schema: { type: string; properties: any } }>;
  };
  deprecated?: boolean;
  security?: Array<Record<string, any>>;
  externalDocs?: {
    description: string;
    url: string;
  };
  operationId?: string;
}

interface ConfigParams {
  port?: number;
  ipHost?: boolean;
  cluster?: boolean;
  node?: "production" | "development";
  callback?: () => void;
}

interface Redirect {
  from: string;
  to: string;
  blank?: boolean;
}

export interface ServerOptions {
  server?: ConfigParams;
  logging?: boolean;
  jsonParser?: boolean;
  cacheSize?: number;
  cacheTTL?: number;
  cors?: boolean;
  swagger?: boolean;
  database?: {
    uri: string;
    name?: string;
  };
  routesPath?: string;
  redirectsPath?: string;
  redirects?: Redirect[];
  ejsEngine?: {
    viewsPath: string;
  };
}

export interface Request {
  method: string;
  url: string;
  path: string;
  params: { [key: string]: string };
  query: URLSearchParams;
  body: any;
  routeMeta?: RouteMeta;
}

export interface Response extends uWS.HttpResponse {
  send: (data: any) => void;
}
