import handler from "@tanstack/react-start/server-entry";

import { createScheduledBackup } from "#/lib/cms-export";
import { paraglideMiddleware } from "#/paraglide/server.js";

type ScheduledController = {
  cron: string;
  scheduledTime: number;
};

type WorkerExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
};

export default {
  fetch(request: Request, _env: CloudflareBindings, _ctx: WorkerExecutionContext) {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
  scheduled(
    controller: ScheduledController,
    _env: CloudflareBindings,
    ctx: WorkerExecutionContext,
  ) {
    ctx.waitUntil(createScheduledBackup({ trigger: "cron", cron: controller.cron }));
  },
};
