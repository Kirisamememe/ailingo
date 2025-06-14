import { formatDistanceToNow } from "date-fns";
import { Volume2 } from "lucide-react";
import { useLocale } from "next-intl";
import { cn, getLocaleForFns } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Caption, Headline } from "@/components/ui/typography";
import { Definitions } from "./definitions";
import { useSpeech } from "../../../_hooks/use-speech";
import type { Locale } from "@/i18n";

type Props = {
  createdAt: Date;
  word: string;
  phonetics: string;
  definitions: string;
  language: Locale;
};

/**
 * 基本情報
 */
export const BasicInfo: React.FC<Props> = ({
  createdAt,
  word,
  phonetics,
  definitions,
  language,
}) => {
  const locale = useLocale();
  const { play, stop, isPlaying } = useSpeech();

  const handlePlay = async () => {
    await play(word, language);
  };

  return (
    <FlexColumn gap={5}>
      <Caption>
        {formatDistanceToNow(createdAt, {
          addSuffix: true,
          locale: getLocaleForFns(locale),
        })}
      </Caption>
      <FlexColumn gap={1}>
        <Headline size={30}>{word}</Headline>
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
          <Caption size={14}>{phonetics}</Caption>
        </FlexRow>
      </FlexColumn>
      <Definitions definitions={definitions} />
    </FlexColumn>
  );
};
