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
      const [posString, meaning] = definition.split("|");
      const pos = posString.replace(/^\[|\]$/g, "");

      return {
        pos,
        meaning,
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
          <Caption lang={language} size={16} weight={400} color="foreground" className="pl-2">
            {definition.meaning}
          </Caption>
        </FlexColumn>
      ))}
    </FlexColumn>
  );
};
