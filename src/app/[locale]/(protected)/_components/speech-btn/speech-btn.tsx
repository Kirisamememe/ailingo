import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSpeech } from "../../wordbook/_hooks/use-speech";
import type { LanguageCode } from "@/types";

type ButtonProps = React.ComponentProps<typeof Button>;

type Props = {
  text: string;
  language: LanguageCode;
  variant: "ghost" | "outline";
} & Omit<ButtonProps, "variant">;

/**
 * 音声再生ボタン
 */
export const SpeechBtn: React.FC<Props> = ({ text, language, variant, className, ...props }) => {
  const { play, stop, isPlaying } = useSpeech();

  const handlePlay = async (text: string) => {
    if (isPlaying) {
      stop();
    } else {
      await play(text, language);
    }
  };

  const playingVariant = variant === "ghost" ? "coloredGhost" : "coloredOutline";
  const normalVariant = variant === "ghost" ? "ghost" : "outline";

  return (
    <Button
      variant={isPlaying ? playingVariant : normalVariant}
      onClick={() => handlePlay(text)}
      size="icon"
      className={cn(className, "size-7 rounded-sm align-middle")}
      {...props}
    >
      <Volume2 className="size-4" />
    </Button>
  );
};
