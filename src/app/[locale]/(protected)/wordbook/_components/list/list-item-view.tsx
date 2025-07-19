import type { ComponentPropsWithRef } from "react";
import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FlexColumn, Flexbox } from "@/components/ui/flexbox";
import { Caption, Headline, Paragraph } from "@/components/ui/typography";
import type { ListItem } from "./list-item";
import { useWordbookStore } from "../../_hooks/store-provider";

type Props = {
  onClick: () => void;
} & ComponentPropsWithRef<"button"> &
  Pick<ComponentPropsWithRef<typeof ListItem>, "index">;

/**
 * ワードブックリストアイテムビュー
 */
export const ListItemView: React.FC<Props> = ({ ref, index, onClick }) => {
  const t = useTranslations("POS");

  const wordCards = useWordbookStore((state) => state.wordCards);
  const selectedWordCard = wordCards[index];

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex h-fit w-full cursor-pointer flex-col items-start gap-1 rounded-sm px-4 py-3 text-left font-semibold",
        "sm:flex-row sm:justify-start sm:gap-4",
        "hover:bg-accent",
        "after:bg-accent after:absolute after:-bottom-0.25 after:h-0.25 after:content-[''] last:after:hidden",
        "after:left-0 after:w-full sm:after:left-3 sm:after:w-[calc(100%-1.5rem)]",
        "hover:after:bg-transparent",
        "focus:shadow-primary/40 focus:shadow-[inset_0_0_0_2px] focus:outline-none focus-visible:outline-none",
        "data-[selected=true]:hover:bg-primary/5 data-[selected=true]:bg-primary/5 dark:data-[selected=true]:hover:bg-primary/5 data-[selected=true]:shadow-primary data-[selected=true]:shadow-[inset_0_0_0_2px] data-[selected=true]:after:hidden",
        "focus:after:hidden focus-visible:after:hidden",
        "active:bg-primary/3",
      )}
    >
      <Flexbox className="w-full shrink-0 flex-row items-center gap-2 whitespace-break-spaces sm:w-48 sm:flex-col sm:items-start sm:gap-1">
        <Headline lang={selectedWordCard.language} height={1.5} className="min-h-6">
          {selectedWordCard.entry}
        </Headline>
        <Caption lang={selectedWordCard.language} className="" height={1.5}>
          {selectedWordCard.phonetics}
        </Caption>
      </Flexbox>
      <FlexColumn gap={1}>
        <Paragraph
          lang={selectedWordCard.language}
          clamp={1}
          className="pt-1 align-baseline leading-none"
        >
          {selectedWordCard.definitions.map((definition) => (
            <Fragment key={`${selectedWordCard.id}-${definition.meaning}`}>
              <Badge
                variant={"secondary"}
                className="bg-foreground/15 mr-1 rounded-[0.25rem] px-1 py-0.5 text-xs leading-none font-bold"
              >
                {t(definition.pos)}
              </Badge>
              <Caption size={14} className="mr-4" color="foreground">
                {definition.translation ?? definition.meaning}
              </Caption>
            </Fragment>
          ))}
        </Paragraph>
        <Paragraph
          lang={selectedWordCard.language}
          color="muted"
          className="line-clamp-3 overflow-ellipsis sm:line-clamp-1"
        >
          {selectedWordCard.examples.map((example) => (
            <Fragment key={`${selectedWordCard.id}-${example.sentence}`}>
              <Caption
                lang={selectedWordCard.language}
                color="muted"
                className={cn(
                  "after:bg-foreground/15 relative mr-4 ml-2.5 after:absolute after:top-0.5 after:-left-2.5 after:h-2.5 after:w-1 after:rounded-xs after:content-['']",
                )}
              >
                {example.sentence}
              </Caption>
            </Fragment>
          ))}
        </Paragraph>
      </FlexColumn>
    </button>
  );
};
