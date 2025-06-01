import { FlexColumn } from "@/components/ui/flexbox";
import { ListItem } from "./list-item";
import type { WordListItem } from "@/types";

type Props = {
  wordList: WordListItem[];
};

/**
 * ワードブックリスト
 */
export const WordbookList: React.FC<Props> = ({ wordList }) => {
  return (
    <FlexColumn>
      {wordList.map((word) => (
        <ListItem key={word.id} listItem={word} />
      ))}
    </FlexColumn>
  );
};
