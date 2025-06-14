"use server";

import "server-only";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { getSession } from "./auth";

type Result = {
  data?: string;
  error?: string;
};

/**
 * 音声合成
 * @param text テキスト
 * @returns 音声合成結果
 */
export async function synthesizeSpeech(text: string) {
  await getSession();

  if (!process.env.SPEECH_KEY || !process.env.SPEECH_REGION) {
    throw new Error("環境変数が設定されていません");
  }

  const speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env.SPEECH_KEY,
    process.env.SPEECH_REGION,
  );

  // The language of the voice that speaks.
  speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

  // Create the speech synthesizer.
  const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig);

  return new Promise<Result>((resolve) => {
    speechSynthesizer.speakTextAsync(
      text,
      (result) => {
        const { audioData } = result;

        speechSynthesizer.close();
        const base64Audio = Buffer.from(audioData).toString("base64");

        resolve({
          data: base64Audio,
        });
      },
      (errorMsg) => {
        speechSynthesizer.close();

        resolve({
          error: errorMsg,
        });
      },
    );
  });
}
