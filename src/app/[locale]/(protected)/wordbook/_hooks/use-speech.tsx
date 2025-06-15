"use client";

import { useState } from "react";
import { toast } from "sonner";
import { synthesizeSpeech } from "@/lib/tts";
import { useWordbook } from "./wordbook-provider";
import type { Locale } from "@/i18n";

/**
 * 音声再生用のフック
 */
export const useSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef } = useWordbook();

  const generateSpeech = async (text: string, language: Locale) => {
    const { data, error } = await synthesizeSpeech(text, language);
    if (error || !data) {
      toast.error(error);
      throw new Error(error);
    }

    return data;
  };

  const generateUrl = async (text: string, language: Locale) => {
    const base64Data = await generateSpeech(text, language);

    // base64文字列をバイナリデータに変換
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Azure Speech SDKはデフォルトでWAV形式を返す
    const blob = new Blob([bytes], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);

    return url;
  };

  const play = async (text: string, language: Locale) => {
    if (!audioRef.current) return;

    const url = await generateUrl(text, language);
    const audio = audioRef.current;
    audio.setAttribute("src", url);

    setIsPlaying(true);

    await new Promise<void>((resolve, reject) => {
      const onEnded = () => {
        setIsPlaying(false);
        resolve();
      };

      const onError = (error: unknown) => {
        setIsPlaying(false);
        toast.error("音声再生に失敗しました");
        if (error instanceof Error) {
          reject(error);
        }
        reject(new Error("音声再生に失敗しました"));
      };

      audio.addEventListener("ended", onEnded);
      audio.addEventListener("error", onError);

      audio
        .play()
        .catch(onError)
        .finally(() => {
          URL.revokeObjectURL(url);
        });
    });
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return { play, stop, isPlaying };
};
