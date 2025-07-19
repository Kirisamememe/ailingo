import { cn } from "@/lib/utils";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Caption, Paragraph } from "@/components/ui/typography";
import { SpeechBtn } from "@/app/[locale]/(protected)/_components/speech-btn";
import type { LanguageCode } from "@/types";

type Props = {
  example: string;
  language: LanguageCode;
};

/**
 * 例文
 */
export const Example: React.FC<Props> = ({ example, language }) => {
  const [sentence, translation] = example.split("\n");

  return (
    <FlexRow className="gap-2 px-1">
      <FlexColumn className="relative mr-auto gap-1 pt-0.5">
        <Paragraph
          lang={language}
          weight={500}
          className={cn("align-baseline text-sm sm:text-base")}
        >
          {sentence}
        </Paragraph>
        {translation && (
          <Caption className="text-[0.625rem] sm:text-xs sm:leading-loose">{translation}</Caption>
        )}
      </FlexColumn>
      <SpeechBtn variant="outline" text={sentence} language={language} />
    </FlexRow>
  );
};
