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
    const crossOriginWrite = rejectCrossOriginWrite(request);

    if (crossOriginWrite) {
      return crossOriginWrite;
    }

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

function rejectCrossOriginWrite(request: Request) {
  if (request.method === "GET" || request.method === "HEAD" || request.method === "OPTIONS") {
    return null;
  }

  const origin = request.headers.get("origin");

  if (!origin) {
    return null;
  }

  try {
    if (new URL(origin).origin === new URL(request.url).origin) {
      return null;
    }
  } catch {
    // Invalid Origin headers are rejected below.
  }

  return Response.json({ error: "Cross-origin write requests are not allowed" }, { status: 403 });
}
