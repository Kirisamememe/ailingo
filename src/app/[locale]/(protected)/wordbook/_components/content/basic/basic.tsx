import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Caption, Headline } from "@/components/ui/typography";
import { Definitions } from "./definitions";
import { SpeechBtn } from "@/app/[locale]/(protected)/_components/speech-btn";
import type { LanguageCode } from "@/types";

type Props = {
  word: string;
  phonetics: string;
  definitions: string;
  language: LanguageCode;
};

/**
 * 基本情報
 */
export const BasicInfo: React.FC<Props> = ({ word, phonetics, definitions, language }) => {
  return (
    <FlexColumn gap={5}>
      <FlexColumn gap={1}>
        <Headline lang={language} className="text-2xl @[36rem]:text-3xl">
          {word}
        </Headline>
        <FlexRow centerY>
          <Caption size={14} lang={language}>
            {phonetics}
          </Caption>
          <SpeechBtn text={word} language={language} className="ml-1" variant="ghost" />
        </FlexRow>
      </FlexColumn>
      <Definitions language={language} definitions={definitions} />
    </FlexColumn>
  );
};
