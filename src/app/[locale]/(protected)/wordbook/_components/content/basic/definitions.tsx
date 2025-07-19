import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { FlexColumn } from "@/components/ui/flexbox";
import { Caption } from "@/components/ui/typography";
import { definitionsArraySchema } from "../../../_schema";
import { splitDefinitions } from "../../../_utils";
import type { WordCard } from "@/types";

type Props = Pick<WordCard, "definitions" | "language">;

/**
 * 定義
 */
export const Definitions: React.FC<Props> = ({ definitions, language }) => {
  const t = useTranslations("POS");
  const definitionsArray = splitDefinitions(definitions);

  const parsedDefinitionsArray = definitionsArraySchema.safeParse({
    definitions: definitionsArray,
  });

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
            {t(definition.pos)}
          </Badge>
          <Caption
            lang={language}
            weight={400}
            color="foreground"
            className="text-sm sm:pl-1 sm:text-base"
          >
            {definition.meaning}
          </Caption>
          {definition.translation && (
            <Caption
              lang={language}
              weight={400}
              color="muted"
              className="text-[0.625rem] leading-[1.8] sm:pl-1 sm:text-xs"
            >
              {definition.translation}
            </Caption>
          )}
        </FlexColumn>
      ))}
    </FlexColumn>
  );
};
