import { Button } from "@/components/ui/button";
import { FlexColumn } from "@/components/ui/flexbox";
import { Headline } from "@/components/ui/typography";
import type { MultipleChoiceQuestion } from "@/types";

type Props = {
  number: number;
  question: MultipleChoiceQuestion;
};

/**
 * 問題
 */
export const Question: React.FC<Props> = ({ question, number }) => {
  return (
    <FlexColumn>
      <Headline>No.{number}</Headline>
      <Headline>{question.question}</Headline>
      <FlexColumn>
        {question.choices.map((choice, index) => (
          <Button key={choice} variant="ghost">
            {index + 1}. {choice}
          </Button>
        ))}
      </FlexColumn>
    </FlexColumn>
  );
};
