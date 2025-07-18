import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Caption, Headline } from "@/components/ui/typography";
import { Definitions } from "./definitions";
import { SpeechBtn } from "@/app/[locale]/(protected)/_components/speech-btn";
import type { WordCardClient } from "@/types";

type Props = Pick<WordCardClient, "entry" | "phonetics" | "definitions" | "language">;

/**
 * 基本情報
 */
export const BasicInfo: React.FC<Props> = ({ entry, phonetics, definitions, language }) => {
  return (
    <FlexColumn gap={5}>
      <FlexColumn gap={1}>
        <Headline lang={language} className="text-2xl @[36rem]:text-3xl">
          {entry}
        </Headline>
        <FlexRow centerY>
          <Caption size={14} lang={language}>
            {phonetics}
          </Caption>
          <SpeechBtn text={entry} language={language} className="ml-1" variant="ghost" />
        </FlexRow>
      </FlexColumn>
      <Definitions language={language} definitions={definitions} />
    </FlexColumn>
  );
};
