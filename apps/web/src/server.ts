import handler from "@tanstack/react-start/server-entry";

import { paraglideMiddleware } from "#/paraglide/server.js";

type WorkerExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
};

export default {
  fetch(request: Request, _env: CloudflareBindings, _ctx: WorkerExecutionContext) {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
