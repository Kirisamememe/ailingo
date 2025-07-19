import { useTranslations } from "next-intl";
import { FlexColumn } from "@/components/ui/flexbox";
import { Separator } from "@/components/ui/separator";
import { Headline, Paragraph } from "@/components/ui/typography";

type Props = {
  collocations: string;
  derivatives: string;
  synonyms: string;
  antonyms: string;
};

/**
 * 追加情報
 */
export const Extra: React.FC<Props> = ({ collocations, derivatives, synonyms, antonyms }) => {
  const t = useTranslations("wordbook.extra");

  if (!collocations && !derivatives && !synonyms && !antonyms) return null;
  const beforeClassName =
    "before:bg-muted-foreground before:absolute before:top-1 sm:before:top-1.5 before:left-0 before:h-2 before:w-0.75 before:content-[''] text-xs sm:text-sm";

  return (
    <>
      <Separator />
      <FlexColumn gap={5}>
        {collocations && (
          <FlexColumn gap={1} className="relative pl-3">
            <Headline color="muted" className={beforeClassName}>
              {t("collocations")}
            </Headline>
            <Paragraph className="text-sm break-all sm:text-base">{collocations}</Paragraph>
          </FlexColumn>
        )}
        {derivatives && (
          <FlexColumn gap={1} className="relative pl-3">
            <Headline color="muted" className={beforeClassName}>
              {t("derivatives")}
            </Headline>
            <Paragraph className="text-sm break-all sm:text-base">{derivatives}</Paragraph>
          </FlexColumn>
        )}
        {synonyms && (
          <FlexColumn gap={1} className="relative pl-3">
            <Headline color="muted" className={beforeClassName}>
              {t("synonyms")}
            </Headline>
            <Paragraph className="text-sm break-all sm:text-base">{synonyms}</Paragraph>
          </FlexColumn>
        )}
        {antonyms && (
          <FlexColumn gap={1} className="relative pl-3">
            <Headline color="muted" className={beforeClassName}>
              {t("antonyms")}
            </Headline>
            <Paragraph className="text-sm break-all sm:text-base">{antonyms}</Paragraph>
          </FlexColumn>
        )}
      </FlexColumn>
    </>
  );
};
