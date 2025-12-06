/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cleanWord } from "@/app/utils/word";
import {
  Badge,
  Button,
  cn
} from "@speak/ui";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  RefreshCw,
  Shuffle,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeak } from "react-text-to-speech";
import { useDebounce } from "react-use";
import { SPEAKING_STATUS } from "../constant";
import { useKeyboardShortcuts } from "../hooks/use-keyboard-shortcuts";
import { SpeakingPhrase } from "../types";
import RecorderActions from "./recoreder-actions";

export interface SpeakingRecorderProps extends ComponentProps<"div"> {
  phrase: SpeakingPhrase | null;
  onNext?: () => void;
  onPrevious?: () => void;
  onRandom?: () => void;
  onAttemptComplete?: (
    correctWords: number,
    totalWords: number,
    timeSpent: number
  ) => void;
  sessionStats?: {
    accuracy: number;
    totalWords: number;
    phrasesCompleted: number;
    averageTimePerPhrase: number;
  };
}

export const SpeakingRecorder = ({
  phrase,
  onNext,
  onPrevious,
  onRandom,
  onAttemptComplete,
  sessionStats,
  className,
  ...props
}: SpeakingRecorderProps) => {
  const [transcript, setTranscript] = useState<string>("");
  const [showPhonetics, setShowPhonetics] = useState(false);
  const [attemptStartTime, setAttemptStartTime] = useState<number | null>(null);

  const { listening, resetTranscript, finalTranscript } = useSpeechRecognition({
    clearTranscriptOnListen: true,
  });

  const { speak, stop, speechStatus } = useSpeak();

  const words = phrase?.words || [];

  useDebounce(
    () => {
      if (!finalTranscript.trim()) return;

      SpeechRecognition.stopListening();
      setTranscript(finalTranscript);

      if (attemptStartTime && phrase) {
        const timeSpent = Date.now() - attemptStartTime;
        const correctWords = wordStatuses.filter(
          (item) => item.status === SPEAKING_STATUS.CORRECT
        ).length;
        onAttemptComplete?.(correctWords, words.length, timeSpent);
      }
    },
    1000,
    [finalTranscript]
  );

  const handleStartListening = useCallback(() => {
    if (listening) {
      SpeechRecognition.stopListening();
      return;
    }

    setAttemptStartTime(Date.now());
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
    });
  }, [listening, resetTranscript]);

  const handleRetry = useCallback(() => {
    setTranscript("");
    setAttemptStartTime(null);
    resetTranscript();
  }, [resetTranscript]);

  const handleStartSpeech = useCallback(() => {
    if (!phrase) return;

    stop();
    speak(phrase.text, {
      rate: 0.9,
      lang: "en-US",
      pitch: 1,
      volume: 1,
    });
  }, [phrase, speak, stop]);

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

    return totalWords > 0 ? (correctWords.length / totalWords) * 100 : 0;
  }, [wordStatuses]);

  const isSpeaking = speechStatus === "started";

  const getPhoneticForWord = (word: string) => {
    if (!phrase?.phoneticHints) return null;
    const cleanedWord = cleanWord(word);
    return phrase.phoneticHints.find(
      (hint) => cleanWord(hint.word) === cleanedWord
    );
  };

  const difficultyColors = {
    beginner:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    intermediate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  useEffect(() => {
    handleRetry();
  }, [phrase?.id, handleRetry]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSpace: handleStartListening,
    onRetry: handleRetry,
    onNext: onNext,
    onPrevious: onPrevious,
    onRandom: onRandom,
    onShowPhonetics: () => setShowPhonetics((prev) => !prev),
  });

  if (!phrase) {
    return (
      <div {...props} className={cn("w-full", className)}>
        <div className="text-center space-y-6 py-20 animate-fade-in">
          <div className="text-6xl">🎤</div>
          <div className="space-y-2">
            <h2 className="text-2xl font-[700]">No phrases available</h2>
            <p className="text-muted-foreground">
              Please select a different category or difficulty level from the
              header.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const hasStarted = transcript.length > 0;
  const isComplete = matchPercentage === 100 && transcript;

  return (
    <div {...props} className={cn("w-full space-y-6", className)}>
      {/* Session Stats - Show when started */}
      {hasStarted && sessionStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
          <div className="p-4 rounded-lg bg-muted/50 border">
            <div className="text-xs text-muted-foreground font-[500] mb-1">
              Accuracy
            </div>
            <div
              className={cn(
                "text-2xl font-mono font-[700]",
                sessionStats.accuracy >= 80
                  ? "text-green-600 dark:text-green-400"
                  : sessionStats.accuracy >= 60
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-red-600 dark:text-red-400"
              )}
            >
              {Math.round(sessionStats.accuracy)}
              <span className="text-sm">%</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border">
            <div className="text-xs text-muted-foreground font-[500] mb-1">
              Words
            </div>
            <div className="text-2xl font-mono font-[700]">
              {sessionStats.totalWords}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border">
            <div className="text-xs text-muted-foreground font-[500] mb-1">
              Phrases
            </div>
            <div className="text-2xl font-mono font-[700]">
              {sessionStats.phrasesCompleted}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border">
            <div className="text-xs text-muted-foreground font-[500] mb-1">
              Avg Time
            </div>
            <div className="text-2xl font-mono font-[700]">
              {Math.floor(sessionStats.averageTimePerPhrase / 1000)}s
            </div>
          </div>
        </div>
      )}

      {/* Start State */}
      {!hasStarted && (
        <div className="text-center space-y-6 py-12 animate-fade-in">
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
              <Volume2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-[700]">Ready to Practice?</h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Click the microphone button below to start practicing your
              pronunciation.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Badge
              className={cn("capitalize", difficultyColors[phrase.difficulty])}
            >
              {phrase.difficulty}
            </Badge>
            <span>•</span>
            <Badge variant="outline" className="capitalize">
              {phrase.category}
            </Badge>
            <span>•</span>
            <span>{words.length} words</span>
          </div>
        </div>
      )}

      {/* Main Practice Area */}
      <div
        className={cn(
          "relative rounded-xl border-2 transition-all duration-200 bg-background",
          hasStarted
            ? "border-primary/50 shadow-lg shadow-primary/5"
            : "border-muted hover:border-muted-foreground/30"
        )}
      >
        <div className="p-8 min-h-64">
          {/* Character and words display */}
          <div className="space-y-6">
            <div className="w-full justify-center flex">
              <div className="relative">
                <Image
                  src="/character.png"
                  alt="speaking"
                  width={80}
                  height={80}
                  className={cn(
                    "transition-all duration-300",
                    listening && "scale-110"
                  )}
                />
              </div>
            </div>

            <div className="flex items-center justify-center text-center flex-wrap gap-3 min-h-20">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleStartSpeech}
                className={cn(
                  "transition-all hover:scale-110",
                  isSpeaking && "text-primary animate-pulse"
                )}
                aria-label={isSpeaking ? "Stop speaking" : "Start speaking"}
              >
                {isSpeaking ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </Button>

              {wordStatuses.map((item, index) => {
                const phoneticHint = getPhoneticForWord(item.word);
                return (
                  <div key={`${item.word}-${index}`} className="relative group">
                    <span
                      className={cn(
                        "text-3xl font-mono font-[600] transition-all duration-200 cursor-default",
                        getWordColorClass(item.status),
                        item.status === SPEAKING_STATUS.CORRECT && "scale-105",
                        item.status === SPEAKING_STATUS.INCORRECT &&
                          "animate-shake"
                      )}
                    >
                      {item.word}
                    </span>
                    {showPhonetics && phoneticHint && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                        <span className="text-xs font-mono text-muted-foreground bg-background/95 px-2 py-1 rounded border shadow-sm">
                          {phoneticHint.phonetic}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Completion overlay */}
          {isComplete && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center rounded-xl animate-fade-in">
              <div className="text-center space-y-6 p-8">
                <div className="text-7xl animate-bounce-in">🎉</div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-[800]">Perfect!</h3>
                  <p className="text-lg text-muted-foreground">
                    Excellent pronunciation! Ready for the next one?
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-4">
                  <Button onClick={onNext} size="lg" className="gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Next Phrase
                  </Button>
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress indicator */}
        {hasStarted && !isComplete && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-[500]">Match</span>
              <span className="font-mono font-[600]">
                {Math.round(matchPercentage)}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${matchPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {hasStarted && !isComplete && (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPhonetics(!showPhonetics)}
            className="gap-2"
          >
            {showPhonetics ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            Phonetics
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRandom}
            className="gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Random
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Microphone control */}
      <div className="flex items-center justify-center">
        <RecorderActions
          onStartListening={handleStartListening}
          listening={listening}
          matchPercentage={matchPercentage}
        />
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p className="font-[500]">Keyboard Shortcuts</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span>
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">
              Space
            </kbd>{" "}
            Record
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">
              R
            </kbd>{" "}
            Retry
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">
              N / →
            </kbd>{" "}
            Next
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">
              H
            </kbd>{" "}
            Phonetics
          </span>
        </div>
      </div>
    </div>
  );
};
