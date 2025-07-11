import { Badge } from "@/components/ui/badge";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Caption, Headline, Paragraph } from "@/components/ui/typography";

type Props = {
  newWords?: string;
};

/**
 * 今日の学習単語
 */
export const DailyWords: React.FC<Props> = ({ newWords }) => {
  const newWordsArray = newWords?.split(",").map((wordString) => {
    const [id, word] = wordString.split("|");
    return { id, word };
  });
  if (!newWordsArray) {
    return <Paragraph>{newWords}</Paragraph>;
  }

  return (
    <FlexColumn>
      <Headline>今日の学習単語</Headline>
      <FlexColumn>
        {newWordsArray.map((word) => (
          <FlexRow key={word.id} gap={3}>
            <Badge>{word.id}</Badge>
            <Caption key={word.id}>{word.word}</Caption>
          </FlexRow>
        ))}
      </FlexColumn>
    </FlexColumn>
  );
};
