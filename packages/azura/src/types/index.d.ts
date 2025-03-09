import { ServerResponse } from "node:http";
import { AzuraServer } from "../AzuraServer";
import { URLSearchParams } from "node:url";

export type Plugin = (server: AzuraServer) => void;
export type RouterHandler = (
  req: Request,
  res: Response,
  query: URLSearchParams,
  swagger: (meta: RouteMeta) => void
) => void;
export type Middleware = (req: Request, res: Response, next: () => void) => void;
export type RouteMeta = {
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
};

interface ConfigParams {
  port?: number | 3001;
  ipHost?: boolean;
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

export interface Response extends ServerResponse {
  send: (data: any) => void;
}
