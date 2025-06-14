import { FlexColumn } from "@/components/ui/flexbox";
import { ListItem } from "./list-item";
import { WordbookListStreaming } from "./list-streaming";
import type { WordListItem } from "@/types";

type Props = {
  wordList: WordListItem[];
};

/**
 * ワードブックリスト
 */
export const WordbookList: React.FC<Props> = ({ wordList }) => {
  return (
    <FlexColumn className="w-64 shrink-0">
      <WordbookListStreaming />
      {wordList.map((word) => (
        <ListItem key={word.id} listItem={word} />
      ))}
    </FlexColumn>
  );
};
