import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Caption, Headline } from "@/components/ui/typography";
import { Definitions } from "./definitions";
import { useSpeech } from "../../../_hooks/use-speech";
import type { Locale } from "@/i18n";

type Props = {
  word: string;
  phonetics: string;
  definitions: string;
  language: Locale;
};

/**
 * 基本情報
 */
export const BasicInfo: React.FC<Props> = ({ word, phonetics, definitions, language }) => {
  const { play, stop, isPlaying } = useSpeech();

  const handlePlay = async () => {
    await play(word, language);
  };

  return (
    <FlexColumn gap={5}>
      <FlexColumn gap={1}>
        <Headline size={30} lang={language}>
          {word}
        </Headline>
        <FlexRow centerY>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "-ml-1.5 size-8",
              isPlaying &&
                "text-primary hover:text-primary dark:hover:bg-primary/10 hover:bg-primary/10",
            )}
            type="button"
            onClick={!isPlaying ? handlePlay : stop}
          >
            <Volume2 size={20} />
          </Button>
          <Caption size={14} lang={language}>
            {phonetics}
          </Caption>
        </FlexRow>
      </FlexColumn>
      <Definitions language={language} definitions={definitions} />
    </FlexColumn>
  );
};
