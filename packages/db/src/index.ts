import "@tanstack/react-start/server-only";
import { drizzle, type AnyD1Database } from "drizzle-orm/d1";

import * as authSchema from "./schema/auth.schema";
import { relations as authRelations } from "./schema/auth.schema";
import { relations } from "./schema/relations";

export type AuthDatabase = ReturnType<typeof createAuthDb>;

export function createAuthDb(database: AnyD1Database) {
  return drizzle(database, {
    schema: authSchema,
    // authRelations uses defineRelationsPart, so it must come after the main relations.
    // https://orm.drizzle.team/docs/relations-v2#relations-parts
    relations: { ...relations, ...authRelations },
  });
}
