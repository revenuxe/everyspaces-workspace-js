import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { type PortableTextBlock, sanityImageUrl } from "@/lib/sanity";

function renderText(children: ReactNode[]) {
  return children.length ? children : null;
}

export function PortableTextRenderer({
  value,
  className,
}: {
  value: PortableTextBlock[];
  className?: string;
}) {
  const renderedBlocks: ReactNode[] = [];
  let currentListType: "bullet" | "number" | null = null;
  let currentListItems: ReactNode[] = [];

  const flushList = () => {
    if (!currentListType || !currentListItems.length) {
      currentListType = null;
      currentListItems = [];
      return;
    }

    renderedBlocks.push(
      currentListType === "number" ? (
        <ol key={`list-${renderedBlocks.length}`} className="ml-6 list-decimal space-y-3 text-base leading-8 text-muted-foreground">
          {currentListItems}
        </ol>
      ) : (
        <ul key={`list-${renderedBlocks.length}`} className="ml-6 list-disc space-y-3 text-base leading-8 text-muted-foreground">
          {currentListItems}
        </ul>
      ),
    );

    currentListType = null;
    currentListItems = [];
  };

  value.forEach((block, index) => {
    if (block.listItem) {
      const content = <li key={block._key || `li-${index}`}>{renderSpanChildren(block)}</li>;

      if (currentListType && currentListType !== block.listItem) {
        flushList();
      }

      currentListType = block.listItem;
      currentListItems.push(content);
      return;
    }

    flushList();

    if (block._type === "image") {
      const imageUrl = sanityImageUrl(
        { asset: block.asset, alt: block.alt, caption: block.caption },
        { width: 1400, auto: "format", fit: "max" },
      );

      if (!imageUrl) {
        return;
      }

      renderedBlocks.push(
        <figure key={block._key || `image-${index}`} className="overflow-hidden rounded-[2rem] border border-border bg-card">
          <img src={imageUrl} alt={block.alt || ""} className="h-auto w-full object-cover" />
          {block.caption ? <figcaption className="px-5 py-4 text-sm leading-6 text-muted-foreground">{block.caption}</figcaption> : null}
        </figure>,
      );
      return;
    }

    if (block._type === "code") {
      renderedBlocks.push(
        <pre key={block._key || `code-${index}`} className="overflow-x-auto rounded-[1.5rem] bg-primary px-5 py-4 text-sm leading-7 text-primary-foreground">
          <code>{block.code}</code>
        </pre>,
      );
      return;
    }

    const children = renderSpanChildren(block);
    const key = block._key || `block-${index}`;

    switch (block.style) {
      case "h1":
        renderedBlocks.push(<h1 key={key} className="text-4xl font-serif leading-tight text-foreground sm:text-5xl">{children}</h1>);
        break;
      case "h2":
        renderedBlocks.push(<h2 key={key} className="text-3xl font-serif leading-tight text-foreground sm:text-4xl">{children}</h2>);
        break;
      case "h3":
        renderedBlocks.push(<h3 key={key} className="text-2xl font-serif leading-tight text-foreground sm:text-3xl">{children}</h3>);
        break;
      case "h4":
        renderedBlocks.push(<h4 key={key} className="text-xl font-serif leading-tight text-foreground">{children}</h4>);
        break;
      case "blockquote":
        renderedBlocks.push(
          <blockquote key={key} className="rounded-[1.75rem] border-l-4 border-accent bg-secondary/40 px-6 py-5 text-lg italic leading-8 text-foreground">
            {children}
          </blockquote>,
        );
        break;
      default:
        renderedBlocks.push(
          <p key={key} className="text-base leading-8 text-muted-foreground sm:text-lg">
            {children}
          </p>,
        );
    }
  });

  flushList();

  return <div className={cn("space-y-6", className)}>{renderedBlocks}</div>;
}

function renderSpanChildren(block: PortableTextBlock) {
  const markDefs = new Map((block.markDefs || []).map((mark) => [mark._key, mark]));

  return renderText(
    (block.children || []).map((child, index) => {
      let node: ReactNode = child.text;

      (child.marks || []).forEach((mark) => {
        const definition = markDefs.get(mark);

        if (mark === "strong") {
          node = <strong key={`${child._key || index}-${mark}`}>{node}</strong>;
          return;
        }

        if (mark === "em") {
          node = <em key={`${child._key || index}-${mark}`}>{node}</em>;
          return;
        }

        if (mark === "code") {
          node = <code key={`${child._key || index}-${mark}`} className="rounded bg-secondary/70 px-1.5 py-0.5 text-[0.95em] text-foreground">{node}</code>;
          return;
        }

        if (definition?._type === "link" && definition.href) {
          const isExternal = definition.href.startsWith("http");
          node = (
            <a
              key={`${child._key || index}-${mark}`}
              href={definition.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="font-semibold text-foreground underline decoration-accent underline-offset-4 transition-colors hover:text-accent"
            >
              {node}
            </a>
          );
        }
      });

      return <Fragment key={child._key || `span-${index}`}>{node}</Fragment>;
    }),
  );
}
