# Acceptance

## Template Site

- `blog-starter.01mvp.com` loads the public blog.
- Admin sign-in is available.
- Admin can create, edit, and publish posts.
- Markdown renders on the public post page.
- R2-backed image upload works.
- Comments submit into `pending`.
- Admin can approve comments.
- Approved comments render publicly.
- `/rss.xml`, `/sitemap.xml`, and `/robots.txt` respond.
- English and Chinese UI copy render through Paraglide.js.
- The home/about product introduction includes English and Chinese copy.
- Published posts, tags, comments, projects, and admin metrics switch between English and Chinese content.
- Email Sending disabled state still supports login, publishing, comments, and moderation.

## Skill Demo Site

- `blog-demo.01mvp.com` loads.
- Site name, author, description, theme, and comments preference come from Skill input.
- Primary language comes from Skill input and is either `en` or `zh`.
- English and Chinese remain enabled on the generated site.
- The Skill log records automated steps and user authorization steps.
- The generated site can publish a post, upload an image, submit a comment, approve a comment, and expose RSS/sitemap/OG metadata.
