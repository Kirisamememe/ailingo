import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { FlexColumn } from "@/components/ui/flexbox";
import { Caption } from "@/components/ui/typography";
import { definitionsArraySchema } from "../../../_schema";
import type { Locale } from "@/i18n";
import type { POS } from "@/types";

type Props = {
  definitions: string;
  language: Locale;
};

/**
 * 定義
 */
export const Definitions: React.FC<Props> = ({ definitions, language }) => {
  const t = useTranslations("POS");

  const definitionsArray = definitions
    .split("\n")
    .filter((definition) => !!definition)
    .map((definition) => {
      const parts = definition.split("|");
      const [posString, meaning, translation = ""] = parts;
      const pos = posString.replace(/^\[|\]$/g, "");

      return {
        pos,
        meaning,
        translation,
      };
    });

  const parsedDefinitionsArray = definitionsArraySchema.safeParse(definitionsArray);

  if (!parsedDefinitionsArray.success) {
    return <Caption>{definitions}</Caption>;
  }

  return (
    <FlexColumn gap={3}>
      {definitionsArray.map((definition) => (
        <FlexColumn gap={1} key={definition.meaning}>
          <Badge
            lang={language}
            variant="secondary"
            className="bg-primary/10 text-primary text-xs font-semibold"
          >
            {t(definition.pos as POS)}
          </Badge>
          <Caption
            lang={language}
            weight={400}
            color="foreground"
            className="text-sm @[36rem]:pl-1 @[36rem]:text-base"
          >
            {definition.meaning}
          </Caption>
          {definition.translation && (
            <Caption
              lang={language}
              weight={400}
              color="muted"
              className="text-[0.625rem] @[36rem]:pl-1 @[36rem]:text-xs"
            >
              {definition.translation}
            </Caption>
          )}
        </FlexColumn>
      ))}
    </FlexColumn>
  );
};
