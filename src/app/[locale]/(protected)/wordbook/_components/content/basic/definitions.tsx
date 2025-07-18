import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { FlexColumn } from "@/components/ui/flexbox";
import { Caption } from "@/components/ui/typography";
import type { WordCardClient } from "@/types";

type Props = Pick<WordCardClient, "definitions" | "language">;

/**
 * 定義
 */
export const Definitions: React.FC<Props> = ({ definitions, language }) => {
  const t = useTranslations("POS");

  return (
    <FlexColumn gap={3}>
      {definitions.map((definition) => (
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
