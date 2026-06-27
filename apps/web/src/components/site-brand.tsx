import { cn } from "@repo/ui/lib/utils";

export const siteBrandLinkClassName = "inline-flex min-w-0 shrink items-center";

const siteLogoSrc = "/yusually-logo-v2.png";

export function SiteBrandText({
  className,
  name,
}: {
  readonly className?: string;
  readonly name: string;
}) {
  return (
    <span className={cn("inline-flex max-w-full min-w-0 items-center gap-2", className)}>
      <img
        src={siteLogoSrc}
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        className="size-9 shrink-0 rounded-full bg-background object-cover"
        decoding="async"
      />
      <span className="block min-w-0 truncate text-base leading-none font-black tracking-tight">
        {name}
      </span>
    </span>
  );
}
