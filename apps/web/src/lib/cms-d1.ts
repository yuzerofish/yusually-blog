import "@tanstack/react-start/server-only";

// Re-export all types from shared module
export type {
  PostInput,
  PageInput,
  CommentInput,
  ListPostsOptions,
  AssetInput,
  SiteSettingsInput,
  D1Result,
} from "./cms-d1-shared";

// Re-export posts
export {
  listD1Posts,
  getD1PostBySlug,
  getD1PostByIdOrSlug,
  createD1Post,
  updateD1Post,
  deleteD1Post,
} from "./cms-d1-posts";

// Re-export pages
export {
  listD1Pages,
  getD1PageBySlug,
  getD1PageByIdOrSlug,
  createD1Page,
  updateD1Page,
  deleteD1Page,
} from "./cms-d1-pages";

// Re-export comments
export {
  createD1Comment,
  listD1ApprovedComments,
  moderateD1Comment,
  listD1Comments,
} from "./cms-d1-comments";

// Re-export tags
export { listD1Tags, upsertD1Tag, replaceD1PostTags } from "./cms-d1-tags";

// Re-export assets, API tokens, settings, and export
export {
  getD1SiteSettings,
  updateD1SiteSettings,
  listD1Assets,
  getD1AssetById,
  createD1Asset,
  deleteD1Asset,
  createD1ApiToken,
  listD1ApiTokens,
  revokeD1ApiToken,
  verifyD1ApiToken,
  buildD1SiteExport,
} from "./cms-d1-assets";
