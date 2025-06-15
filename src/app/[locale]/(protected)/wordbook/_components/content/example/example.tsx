import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FlexColumn } from "@/components/ui/flexbox";
import { Caption, Paragraph } from "@/components/ui/typography";
import { useSpeech } from "../../../_hooks/use-speech";
import type { Locale } from "@/i18n";

type Props = {
  example: string;
  language: Locale;
};

/**
 * 例文
 */
export const Example: React.FC<Props> = ({ example, language }) => {
  const [sentence, translation] = example.split("\n");
  const { play, stop, isPlaying } = useSpeech();

  const handlePlay = async (sentence: string) => {
    if (isPlaying) {
      stop();
    } else {
      await play(sentence, language);
    }
  };

  return (
    <FlexColumn className="relative pl-3">
      <Paragraph
        lang={language}
        size={18}
        weight={500}
        className={cn(
          "align-baseline",
          "before:bg-primary before:absolute before:top-3 before:left-0 before:size-1 before:rounded-full before:content-['']",
        )}
      >
        {sentence}
        <Button
          variant={isPlaying ? "coloredOutline" : "outline"}
          size="icon"
          className={cn("mb-0.5 ml-2 size-7 rounded-sm align-middle")}
          onClick={() => handlePlay(sentence)}
        >
          <Volume2 className="size-4" />
        </Button>
      </Paragraph>
      {translation && <Caption size={12}>{translation}</Caption>}
    </FlexColumn>
  );
};
