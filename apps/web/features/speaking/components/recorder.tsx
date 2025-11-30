"use client";

import { cleanWord } from "@/app/utils/word";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, cn } from "@speak/ui";
import { Volume2, VolumeX } from "lucide-react";
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

  const getWordColorClass = (
    status: (typeof SPEAKING_STATUS)[keyof typeof SPEAKING_STATUS]
  ): string => {
    switch (status) {
      case SPEAKING_STATUS.CORRECT:
        return "text-green-600 dark:text-green-400";
      case SPEAKING_STATUS.INCORRECT:
        return "text-red-600 dark:text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  const matchPercentage = useMemo(() => {
    const correctWords = wordStatuses.filter(
      (item) => item.status === SPEAKING_STATUS.CORRECT
    );
    const totalWords = wordStatuses.length;

    return (correctWords.length / totalWords) * 100;
  }, [wordStatuses]);

  const isSpeaking = speechStatus === "started";

  return (
    <Card {...props} className="max-w-2xl w-full backdrop-blur-sm bg-card/95 animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl">Speaking Practice</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="w-full justify-center flex">
          <div className="relative">
            <Image
              src="/character.png"
              alt="speaking"
              width={100}
              height={100}
              className="animate-fade-in"
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-center text-center flex-wrap gap-3 min-h-32 p-4 rounded-lg bg-muted/50">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleStartSpeech}
            className={cn(
              "transition-colors",
              isSpeaking && "text-primary animate-pulse"
            )}
            aria-label={isSpeaking ? "Stop speaking" : "Start speaking"}
          >
            {isSpeaking ? (
              <Volume2 className="w-6 h-6" />
            ) : (
              <VolumeX className="w-6 h-6" />
            )}
          </Button>

          {wordStatuses.map((item, index) => (
            <span
              key={`${item.word}-${index}`}
              className={cn(
                "text-3xl font-medium transition-all duration-300",
                getWordColorClass(item.status),
                item.status === SPEAKING_STATUS.CORRECT && "scale-105"
              )}
            >
              {item.word}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t">
        <RecorderActions
          onStartListening={handleStartListening}
          listening={listening}
          matchPercentage={matchPercentage}
        />
      </CardFooter>
    </Card>
  );
};
