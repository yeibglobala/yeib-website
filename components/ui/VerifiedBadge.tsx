import * as React from "react";
import { cn } from "@/lib/utils";

export interface VerifiedBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  source: string;
}

export function VerifiedBadge({ source, className, ...props }: VerifiedBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-evergreen)] font-general-sans",
        className
      )}
      {...props}
    >
      <span className="mr-1.5 h-2 w-2 rounded-full bg-[var(--color-mint-leaf)]" aria-hidden="true" />
      Verified &middot; {source}
    </span>
  );
}
