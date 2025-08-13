import { Badge } from "@/components/ui/badge";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Caption, Headline } from "@/components/ui/typography";
import type { DailyLearningNewEntry } from "@/types/db/daily";

type Props = {
  newEntries: DailyLearningNewEntry[];
};

/**
 * 今日の学習単語
 */
export const DailyWords: React.FC<Props> = ({ newEntries }) => {
  return (
    <FlexColumn>
      <Headline>今日の学習単語</Headline>
      <FlexColumn>
        {newEntries.map((entry) => (
          <FlexRow key={entry.id} gap={3}>
            <Badge>{entry.id}</Badge>
            <Caption key={entry.id}>{entry.entry}</Caption>
          </FlexRow>
        ))}
      </FlexColumn>
    </FlexColumn>
  );
};
