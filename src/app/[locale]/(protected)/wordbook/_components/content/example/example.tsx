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
        <Button
          variant={isPlaying ? "coloredOutline" : "outline"}
          size="icon"
          className={cn("mb-0.5 ml-2 size-7 rounded-sm align-middle")}
          onClick={() => handlePlay(sentence)}
        >
          <Volume2 className="size-4" />
        </Button>
      </Paragraph>
      {translation && <Caption className="text-[0.625rem] @[36rem]:text-xs">{translation}</Caption>}
    </FlexColumn>
  );
};
