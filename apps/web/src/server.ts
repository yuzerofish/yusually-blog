import handler from "@tanstack/react-start/server-entry";

import { createScheduledBackup } from "#/lib/cms-export";

type ScheduledController = {
  cron: string;
  scheduledTime: number;
};

type WorkerExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
};

export default {
  fetch: handler.fetch,
  scheduled(
    controller: ScheduledController,
    _env: CloudflareBindings,
    ctx: WorkerExecutionContext,
  ) {
    ctx.waitUntil(createScheduledBackup({ trigger: "cron", cron: controller.cron }));
  },
};
