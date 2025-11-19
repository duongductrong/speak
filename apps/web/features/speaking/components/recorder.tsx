"use client";

import { cleanWord } from "@/app/utils/word";
import { SoundFilled, SoundOutlined } from "@ant-design/icons";
import { Button, Card, cn, colors } from "@speak/ui";
import Image from "next/image";
import { ComponentProps, useMemo, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeak } from "react-text-to-speech";
import { useDebounce } from "react-use";
import { SPEAKING_STATUS } from "../constant";
import RecorderActions from "./recoreder-actions";

export interface SpeakingRecorderProps extends ComponentProps<"div"> {
  words: string[];
}

export const SpeakingRecorder = ({
  words = [],
  ...props
}: SpeakingRecorderProps) => {
  const [transcript, setTranscript] = useState<string>("");

  const { listening, resetTranscript, finalTranscript } = useSpeechRecognition({
    clearTranscriptOnListen: true,
  });

  const { speak, stop, speechStatus } = useSpeak();

  useDebounce(
    () => {
      if (!finalTranscript.trim()) return;

      SpeechRecognition.stopListening();
      setTranscript(finalTranscript);
    },
    1000,
    [finalTranscript]
  );

  const handleStartListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      return;
    }

    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const handleStartSpeech = () => {
    stop();
    speak(words.join(" "), {
      rate: 1,
      lang: "en-US",
      pitch: 1,
      volume: 1,
      voiceURI: "Google US English",
    });
  };

  const wordStatuses = useMemo(() => {
    const spokenWords = transcript.toLowerCase().split(/\s+/).filter(Boolean);

    return words.map((word, index) => {
      const normalizedWord = cleanWord(word);
      const spokenWord = spokenWords[index];

      if (!spokenWord) {
        return { word, status: SPEAKING_STATUS.PENDING };
      }

      const cleanedSpokenWord = cleanWord(spokenWord);
      const isMatch = cleanedSpokenWord === normalizedWord;
      const status = isMatch
        ? SPEAKING_STATUS.CORRECT
        : SPEAKING_STATUS.INCORRECT;
      return {
        word,
        status,
        spokenWord,
      };
    });
  }, [words, transcript]);

  const getTagColor = (
    status: (typeof SPEAKING_STATUS)[keyof typeof SPEAKING_STATUS]
  ) => {
    switch (status) {
      case SPEAKING_STATUS.CORRECT:
        return colors.green[5];
      case SPEAKING_STATUS.INCORRECT:
        return colors.red[5];
      default:
        return colors.gray[5];
    }
  };

  const matchPercentage = useMemo(() => {
    const correctWords = wordStatuses.filter(
      (item) => item.status === SPEAKING_STATUS.CORRECT
    );
    const totalWords = wordStatuses.length;

    return (correctWords.length / totalWords) * 100;
  }, [wordStatuses]);

  return (
    <Card
      {...props}
      title="Speaking 2"
      className="max-w-2xl w-full"
      variant="outlined"
      actions={[
        <RecorderActions
          onStartListening={handleStartListening}
          listening={listening}
          matchPercentage={matchPercentage}
          key="recorder-actions"
        />,
      ]}
    >
      <div className="w-full justify-center flex">
        <Image src="/character.png" alt="speaking" width={100} height={100} />
      </div>

      <div className="w-full flex items-center justify-center text-center flex-wrap gap-2 min-h-32">
        <Button type="text" size="small" onClick={handleStartSpeech}>
          {speechStatus === "started" ? (
            <SoundFilled style={{ fontSize: 24 }} />
          ) : (
            <SoundOutlined style={{ fontSize: 24 }} />
          )}
        </Button>

        {wordStatuses.map((item, index) => (
          <p
            key={`${item.word}-${index}`}
            style={{ color: getTagColor(item.status) }}
            className={cn("text-3xl font-medium")}
          >
            {item.word}
          </p>
        ))}
      </div>
    </Card>
  );
};
