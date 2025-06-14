import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { FlexColumn } from "@/components/ui/flexbox";
import { Caption } from "@/components/ui/typography";
import { type POS, definitionsArraySchema } from "@/types";

type Props = {
  definitions: string;
};

/**
 * 定義
 */
export const Definitions: React.FC<Props> = ({ definitions }) => {
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
          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs font-semibold">
            {t(definition.pos as POS)}
          </Badge>
          <Caption size={16} weight={400} color="foreground" className="pl-2">
            {definition.meaning}
          </Caption>
        </FlexColumn>
      ))}
    </FlexColumn>
  );
};
