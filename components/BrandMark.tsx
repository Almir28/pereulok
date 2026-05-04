import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  href?: string;
  className?: string;
};

export function BrandMark({ href = "/", className }: BrandMarkProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-0.5 text-mist", className)}>
      <span className="font-brand text-[1.05rem] font-extrabold uppercase tracking-[-0.04em]">
        Pereul
      </span>
      <span className="mt-0.5 size-1.5 rounded-full bg-cobalt" aria-hidden="true" />
      <span className="font-brand text-[1.05rem] font-bold uppercase tracking-[-0.04em] text-cobalt-soft">
        oq
      </span>
    </span>
  );

  return href ? (
    <Link href={href} aria-label="Pereuloq home">
      {content}
    </Link>
  ) : (
    content
  );
}
