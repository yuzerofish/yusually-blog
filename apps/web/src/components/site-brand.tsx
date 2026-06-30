import { cn } from "@repo/ui/lib/utils";

export const siteBrandLinkClassName = "inline-flex min-w-0 shrink items-center";

const siteLogoSrc = "/yusually-logo-orbit.png";

export function SiteBrandText({
  className,
  name,
}: {
  readonly className?: string;
  readonly name: string;
}) {
  return (
    <span className={cn("inline-flex max-w-full min-w-0 items-center", className)}>
      <span className="inline-flex h-8 max-w-[9rem] shrink items-center rounded-md bg-[#0e0f0e] px-2 ring-1 ring-[#e77735]/25 sm:h-9 sm:max-w-[10.5rem]">
        <img
          src={siteLogoSrc}
          alt=""
          aria-hidden="true"
          width={550}
          height={120}
          className="h-5 w-auto max-w-full object-contain sm:h-6"
          decoding="async"
        />
      </span>
      <span className="sr-only">{name}</span>
    </span>
  );
}
