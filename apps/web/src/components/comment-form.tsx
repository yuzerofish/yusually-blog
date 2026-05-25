import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { useState, type ComponentProps } from "react";

import { m } from "#/paraglide/messages.js";

type CommentFormProps = {
  readonly postSlug: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";
type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;
const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export function CommentForm({ postSlug }: CommentFormProps) {
  const [state, setState] = useState<SubmitState>("idle");

  const handleSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();
    if (state === "submitting") return;

    setState("submitting");
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        postSlug,
        authorName: formData.get("authorName"),
        authorEmail: formData.get("authorEmail"),
        authorWebsite: formData.get("authorWebsite"),
        body: formData.get("body"),
        honeypot: formData.get("company"),
        turnstileToken: formData.get("cf-turnstile-response"),
      }),
    });

    setState(response.ok ? "success" : "error");
    if (response.ok) {
      event.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="comment-author-name">{m.comment_name()}</Label>
          <Input id="comment-author-name" name="authorName" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="comment-author-email">{m.comment_email()}</Label>
          <Input id="comment-author-email" name="authorEmail" type="email" required />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="comment-author-website">{m.comment_website()}</Label>
        <Input id="comment-author-website" name="authorWebsite" type="url" />
      </div>
      <div className="hidden">
        <Label htmlFor="comment-company">{m.comment_company()}</Label>
        <Input id="comment-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="comment-body">{m.comment_body()}</Label>
        <textarea
          id="comment-body"
          name="body"
          required
          minLength={2}
          maxLength={4000}
          className="min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>
      {turnstileSiteKey ? (
        <div>
          <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="auto" />
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? m.comment_submitting() : m.submit_comment()}
        </Button>
        {state === "success" ? (
          <p className="text-sm text-[#1f6f5b] dark:text-[#75c5ad]">{m.comment_success()}</p>
        ) : null}
        {state === "error" ? <p className="text-sm text-destructive">{m.comment_error()}</p> : null}
      </div>
    </form>
  );
}
