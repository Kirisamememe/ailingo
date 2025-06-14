import { FlexColumn } from "@/components/ui/flexbox";
import { Caption, Paragraph } from "@/components/ui/typography";

type Props = {
  example: string;
};

/**
 * 例文
 */
export const Example: React.FC<Props> = ({ example }) => {
  const [sentence, translation] = example.split("\n");

  return (
    <FlexColumn gap={1} className="relative pl-3">
      <Paragraph
        size={16}
        weight={500}
        className="before:bg-primary before:absolute before:top-3 before:left-0 before:size-1 before:rounded-full before:content-['']"
      >
        {sentence}
      </Paragraph>
      {translation && <Caption size={12}>{translation}</Caption>}
    </FlexColumn>
  );
};
