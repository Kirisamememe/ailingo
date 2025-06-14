import { FlexColumn } from "@/components/ui/flexbox";
import { Caption, Headline } from "@/components/ui/typography";

type Props = {
  derivatives: string;
  synonyms: string;
  antonyms: string;
};

/**
 * 追加情報
 */
export const Extra: React.FC<Props> = ({ derivatives, synonyms, antonyms }) => {
  if (!derivatives && !synonyms && !antonyms) return null;
  const beforeClassName =
    "before:bg-muted-foreground before:absolute before:top-1.5 before:left-0 before:h-2 before:w-0.75 before:content-['']";

  return (
    <FlexColumn gap={5}>
      {derivatives && (
        <FlexColumn gap={1} className="relative pl-3">
          <Headline size={14} color="muted" className={beforeClassName}>
            Derivatives
          </Headline>
          <Caption size={16} color="foreground">
            {derivatives}
          </Caption>
        </FlexColumn>
      )}
      {synonyms && (
        <FlexColumn gap={1} className="relative pl-3">
          <Headline size={14} color="muted" className={beforeClassName}>
            Synonyms
          </Headline>
          <Caption size={16} color="foreground">
            {synonyms}
          </Caption>
        </FlexColumn>
      )}
      {antonyms && (
        <FlexColumn gap={1} className="relative pl-3">
          <Headline size={14} color="muted" className={beforeClassName}>
            Antonyms
          </Headline>
          <Caption size={16} color="foreground">
            {antonyms}
          </Caption>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};
