export { templateManager } from "./utils/templateManager";

export { renderView } from "./functions/renderView";
export { AzuraServer } from "./AzuraServer";

export { RedirectExtensions } from "./core/extensions/redirect";
export { GetExtensions } from "./core/extensions/get";
export { PostExtensions } from "./core/extensions/post";
export { PutExtensions } from "./core/extensions/put";
export { DeleteExtensions } from "./core/extensions/delete";

export type { ServerOptions, Request, Response, RouteMeta } from "./types";
export type { URLSearchParams } from "node:url";