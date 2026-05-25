export type ContentStatus = "draft" | "published" | "scheduled" | "archived" | "deleted";

export type SupportedLocale = "en" | "zh";

export type LocalizedString = Partial<Record<SupportedLocale, string>>;

export type LocalizedFields<TField extends string> = Partial<Record<TField, LocalizedString>>;

export type ContentSource =
  | "editor"
  | "markdown_upload"
  | "html_upload"
  | "api"
  | "cli"
  | "ai"
  | "import";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  contentMarkdown: string;
  contentHtml: string;
  contentText: string;
  status: ContentStatus;
  source: ContentSource;
  featured: boolean;
  pinned: boolean;
  commentsEnabled: boolean;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  tags: Tag[];
  seoTitle: string;
  seoDescription: string;
  i18n?: LocalizedFields<
    | "title"
    | "excerpt"
    | "contentMarkdown"
    | "contentHtml"
    | "contentText"
    | "seoTitle"
    | "seoDescription"
  >;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  description: string;
  i18n?: LocalizedFields<"name" | "description">;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  projectUrl: string;
  githubUrl: string;
  tags: Tag[];
  publishedAt: string;
  i18n?: LocalizedFields<"title" | "excerpt">;
};

export type CommentStatus = "pending" | "approved" | "spam" | "deleted";

export type Comment = {
  id: string;
  postId: string;
  parentId: string | null;
  authorName: string;
  authorEmailHash: string;
  authorWebsite: string | null;
  body: string;
  status: CommentStatus;
  createdAt: string;
  i18n?: LocalizedFields<"body">;
};

export type Asset = {
  id: string;
  key: string;
  url: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  createdAt: string;
  attachedPostId: string | null;
};

export type SiteSettings = {
  name: string;
  description: string;
  url: string;
  authorName: string;
  authorBio: string;
  avatarUrl: string;
  defaultOgImage: string;
  socialLinks: Array<{
    label: string;
    href: string;
  }>;
  navigation: Array<{
    label: string;
    href: string;
  }>;
  rssEnabled: boolean;
  commentsEnabled: boolean;
  indexingEnabled: boolean;
  locales: SupportedLocale[];
  primaryLanguage: SupportedLocale;
  i18n?: LocalizedFields<"name" | "description" | "authorBio">;
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
  i18n?: LocalizedFields<"label" | "detail">;
};

export type ApiTokenScope =
  | "posts:read"
  | "posts:write"
  | "posts:publish"
  | "assets:write"
  | "comments:moderate"
  | "site:read"
  | "site:write"
  | "export:read";

export type ApiToken = {
  id: string;
  name: string;
  tokenPrefix: string;
  scopes: ApiTokenScope[];
  expiresAt: string | null;
  lastUsedAt: string | null;
  revokedAt: string | null;
  createdAt: string;
};
