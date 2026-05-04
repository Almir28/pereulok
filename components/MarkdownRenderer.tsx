import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

type MarkdownRendererProps = {
  content: string;
  className?: string;
  variant?: "light" | "dark";
};

const lightClasses =
  "prose prose-neutral max-w-none prose-headings:text-ink prose-h2:mt-14 prose-h2:text-4xl prose-h2:font-semibold prose-h3:mt-10 prose-h3:text-2xl prose-p:text-[19px] prose-p:leading-9 prose-p:text-neutral-700 prose-a:font-medium prose-a:text-ink prose-a:decoration-black/20 prose-a:underline-offset-4 prose-blockquote:border-ink prose-blockquote:text-2xl prose-blockquote:font-medium prose-blockquote:not-italic prose-li:text-[19px] prose-li:leading-8";

const darkClasses =
  "prose prose-invert max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-mist prose-h2:mt-16 prose-h2:text-4xl prose-h3:mt-10 prose-h3:text-2xl prose-p:text-[18px] prose-p:leading-9 prose-p:text-mist-soft prose-strong:text-mist prose-a:font-medium prose-a:text-cobalt-soft prose-a:decoration-cobalt/30 prose-a:underline-offset-4 prose-blockquote:border-cobalt prose-blockquote:bg-cobalt/10 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:text-[1.55rem] prose-blockquote:font-normal prose-blockquote:not-italic prose-code:text-cobalt-soft prose-li:text-[18px] prose-li:leading-8 prose-li:text-mist-soft prose-hr:border-white/10";

export function MarkdownRenderer({
  content,
  className,
  variant = "light"
}: MarkdownRendererProps) {
  return (
    <div className={cn(variant === "dark" ? darkClasses : lightClasses, className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
