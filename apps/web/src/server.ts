import handler from "@tanstack/react-start/server-entry";

import {
  sendDueBiweeklyDigest,
  sendDueScheduledPostNotifications,
} from "#/lib/email-notifications";
import { paraglideMiddleware } from "#/paraglide/server.js";

type WorkerExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
};

type ScheduledEvent = {
  cron: string;
  scheduledTime: number;
};

export default {
  fetch(request: Request, _env: CloudflareBindings, _ctx: WorkerExecutionContext) {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
  scheduled(_event: ScheduledEvent, _env: CloudflareBindings, ctx: WorkerExecutionContext) {
    ctx.waitUntil(
      Promise.all([sendDueScheduledPostNotifications(), sendDueBiweeklyDigest()]).then(
        () => undefined,
      ),
    );
  },
};
