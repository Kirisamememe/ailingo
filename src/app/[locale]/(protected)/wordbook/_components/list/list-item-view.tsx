import type { ComponentPropsWithRef } from "react";
import { Fragment } from "react";
import { useTranslations } from "next-intl";
import type { DeepPartial } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FlexColumn, Flexbox } from "@/components/ui/flexbox";
import { Caption, Headline, Paragraph } from "@/components/ui/typography";
import { posSchema } from "../../_schema";
import type { WordCardListItem } from "@/types";

type Props = Omit<ComponentPropsWithRef<"button">, "id"> & {
  listItem: WordCardListItem | DeepPartial<WordCardListItem>;
  isStreaming?: boolean;
};

/**
 * ワードブックリストアイテムビュー
 */
export const ListItemView: React.FC<Props> = ({ ref, onClick, listItem, isStreaming = false }) => {
  const t = useTranslations("POS");

  const { id, language, entry, phonetics, definitions, example1, example2, example3 } = listItem;

  return (
    <button
      ref={ref}
      data-word-card-id={id}
      type="button"
      onClick={onClick}
      disabled={isStreaming}
      className={cn(
        "relative flex h-fit w-full cursor-pointer flex-col items-start gap-1 rounded-md px-4 py-3 text-left font-semibold",
        "sm:flex-row sm:justify-start sm:gap-4",
        "hover:bg-accent",
        "after:bg-accent after:absolute after:-bottom-0.25 after:h-0.25 after:content-[''] last:after:hidden",
        "after:left-0 after:w-full sm:after:left-3 sm:after:w-[calc(100%-1.5rem)]",
        "hover:after:bg-transparent",
        "focus:shadow-primary/40 focus:shadow-[inset_0_0_0_2px] focus:outline-none focus-visible:outline-none",
        "data-[selected=true]:hover:bg-primary/5 data-[selected=true]:bg-primary/5 dark:data-[selected=true]:hover:bg-primary/5 data-[selected=true]:shadow-primary data-[selected=true]:shadow-[inset_0_0_0_2px] data-[selected=true]:after:hidden",
        "focus:after:hidden focus-visible:after:hidden",
        "active:bg-transparent",
        isStreaming && "pointer-events-none animate-pulse opacity-70",
      )}
    >
      <Flexbox className="w-full shrink-0 flex-row items-center gap-2 whitespace-break-spaces sm:w-48 sm:flex-col sm:items-start sm:gap-1">
        <Headline lang={language} height={1.5} className="min-h-6">
          {entry}
        </Headline>
        <Caption lang={language} className="" height={1.5}>
          {phonetics}
        </Caption>
      </Flexbox>
      <FlexColumn gap={1}>
        <Paragraph lang={language} className="w-full pt-1 leading-none">
          {definitions?.map((definition) => (
            <Fragment key={`${id}-${definition?.meaning}`}>
              <Badge
                variant={"secondary"}
                className="bg-foreground/15 mr-1 rounded-[0.25rem] px-1 py-0.5 text-xs leading-none font-bold"
              >
                {definition?.pos &&
                  posSchema.safeParse(definition.pos).success &&
                  t(definition.pos)}
              </Badge>
              <Caption className="mr-4 h-4 text-sm" color="foreground">
                {definition?.translation ?? definition?.meaning}
              </Caption>
            </Fragment>
          ))}
        </Paragraph>
        <Paragraph
          lang={language}
          color="muted"
          className="line-clamp-3 overflow-ellipsis sm:line-clamp-1"
        >
          {example1 && (
            <Fragment key={`${id}-${example1}`}>
              <Caption
                lang={language}
                color="muted"
                className={cn(
                  "after:bg-foreground/15 relative mr-4 ml-2.5 after:absolute after:top-0.5 after:-left-2.5 after:h-2.5 after:w-1 after:rounded-xs after:content-['']",
                )}
              >
                {example1.split("\n")[0]}
              </Caption>
            </Fragment>
          )}
          {example2 && (
            <Fragment key={`${id}-${example2}`}>
              <Caption
                lang={language}
                color="muted"
                className="after:bg-foreground/15 relative mr-4 ml-2.5 after:absolute after:top-0.5 after:-left-2.5 after:h-2.5 after:w-1 after:rounded-xs after:content-['']"
              >
                {example2.split("\n")[0]}
              </Caption>
            </Fragment>
          )}
          {example3 && (
            <Fragment key={`${id}-${example3}`}>
              <Caption
                lang={language}
                color="muted"
                className="after:bg-foreground/15 relative mr-4 ml-2.5 after:absolute after:top-0.5 after:-left-2.5 after:h-2.5 after:w-1 after:rounded-xs after:content-['']"
              >
                {example3.split("\n")[0]}
              </Caption>
            </Fragment>
          )}
        </Paragraph>
      </FlexColumn>
    </button>
  );
};
