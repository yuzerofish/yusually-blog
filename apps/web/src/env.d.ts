/// <reference types="vite/client" />

type D1Database = unknown;
type R2Bucket = unknown;
type KVNamespace = unknown;

type CloudflareBindings = {
  CMS_DB: D1Database;
  CMS_ASSETS: R2Bucket;
  CMS_BACKUPS: R2Bucket;
  CMS_CACHE: KVNamespace;
  CMS_PUBLIC_SITE_URL: string;
  CMS_EMAIL_SENDING_ENABLED: string;
};
