export { templateManager } from "./utils/templateManager";

export { renderView } from "./functions/renderView";
export { AzuraServer } from "./AzuraServer";
export { data } from "./dataRequest";

export { Redirect } from "./core/extensions/redirect";
export { Get } from "./core/extensions/get";
export { Post } from "./core/extensions/post";
export { Put } from "./core/extensions/put";
export { Delete } from "./core/extensions/delete";

export type { ServerOptions, Request, Response, RouteMeta } from "./types";
export type { URLSearchParams } from "node:url";