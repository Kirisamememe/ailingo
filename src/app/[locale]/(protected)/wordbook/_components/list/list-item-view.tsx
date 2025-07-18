import type { ComponentPropsWithRef } from "react";
import { type ComponentProps, Fragment } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FlexColumn, Flexbox } from "@/components/ui/flexbox";
import { Caption, Headline, Paragraph } from "@/components/ui/typography";
import type { ListItem } from "./list-item";

type Props = {
  onClick: () => void;
} & Pick<ComponentProps<typeof ListItem>, "listItem"> &
  ComponentPropsWithRef<"button">;

/**
 * ワードブックリストアイテムビュー
 */
export const ListItemView: React.FC<Props> = ({ ref, listItem, onClick }) => {
  const t = useTranslations("POS");

  const { entry, language, phonetics, definitions, examples } = listItem;

  return (
    <button
      ref={ref}
      type="button"
      lang={language}
      onClick={onClick}
      className={cn(
        "relative flex h-fit w-full cursor-pointer flex-col items-start gap-4 rounded-sm px-4 py-3 text-left font-semibold sm:flex-row sm:justify-start",
        "dark:hover:bg-accent",
        "after:bg-accent after:absolute after:-bottom-0.25 after:h-0.25 after:content-[''] last:after:hidden",
        "after:left-0 after:w-full sm:after:left-3 sm:after:w-[calc(100%-1.5rem)]",
        "hover:after:bg-transparent",
        "data-[selected=true]:focus:outline-none",
        "data-[selected=true]:focus-visible:outline-none",
        "data-[selected=true]:hover:bg-primary/5 data-[selected=true]:bg-primary/5 dark:data-[selected=true]:hover:bg-primary/5 data-[selected=true]:shadow-[inset_0_0_0_2px_var(--primary)] data-[selected=true]:after:hidden",
        "focus:after:hidden focus-visible:after:hidden",
      )}
    >
      <Flexbox className="shr ink-0 w-full flex-row items-center gap-2 whitespace-break-spaces sm:w-40 sm:flex-col sm:items-start sm:gap-0">
        <Headline lang={language} height={1.5} className="h-6">
          {entry}
        </Headline>
        <Caption lang={language} className="" height={1.5}>
          {phonetics}
        </Caption>
      </Flexbox>
      <FlexColumn className="">
        <Paragraph lang={language} clamp={1} className="pt-1 leading-none">
          {definitions.map((definition) => (
            <Fragment key={`${listItem.id}-${definition.meaning}`}>
              <Badge
                variant={"secondary"}
                className="bg-foreground/15 mr-1 rounded-[0.25rem] px-1 py-0.5 text-xs leading-none font-bold"
              >
                {t(definition.pos)}
              </Badge>
              <Caption className="mr-4 text-sm" color="foreground">
                {definition.translation ?? definition.meaning}
              </Caption>
            </Fragment>
          ))}
        </Paragraph>
        <Paragraph lang={language} color="muted" clamp={1}>
          {examples.map((example) => (
            <Fragment key={`${listItem.id}-${example.sentence}`}>
              <Caption
                lang={language}
                color="muted"
                className={cn(
                  "after:bg-foreground/15 relative mr-4 ml-2.5 after:absolute after:top-1/2 after:-left-2.5 after:h-2.5 after:w-1 after:-translate-y-1/2 after:rounded-xs after:content-['']",
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
