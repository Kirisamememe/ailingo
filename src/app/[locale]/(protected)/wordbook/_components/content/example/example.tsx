import { cn } from "@/lib/utils";
import { FlexColumn } from "@/components/ui/flexbox";
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
    <FlexColumn className="relative @[36rem]:pl-3">
      <Paragraph
        lang={language}
        weight={500}
        className={cn(
          "align-baseline text-sm @[36rem]:text-lg",
          "@[36rem]:before:bg-primary @[36rem]:before:absolute @[36rem]:before:top-3 @[36rem]:before:left-0 @[36rem]:before:size-1 @[36rem]:before:rounded-full @[36rem]:before:content-['']",
        )}
      >
        {sentence}
        <SpeechBtn variant="outline" text={sentence} language={language} className="mb-0.5 ml-2" />
      </Paragraph>
      {translation && <Caption className="text-[0.625rem] @[36rem]:text-xs">{translation}</Caption>}
    </FlexColumn>
  );
};
