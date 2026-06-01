UPDATE "user"
SET
  "email_preference" = 'biweekly_digest',
  "email_preference_updated_at" = coalesce("email_preference_updated_at", datetime('now'))
WHERE "email_preference" = 'instant_posts';
