import { useCallback, useEffect, useState } from "react";
import { ISessionStats } from "../types";

const SESSION_STORAGE_KEY = "speaking-session-stats";

export interface UseSpeakingSession {
  stats: ISessionStats;
  recordAttempt: (
    phraseId: string,
    correctWords: number,
    totalWords: number,
    timeSpent: number
  ) => void;
  resetSession: () => void;
  accuracy: number;
  totalWords: number;
  averageTimePerPhrase: number;
  phrasesCompleted: number;
}

const createInitialStats = (): ISessionStats => ({
  totalAttempts: 0,
  correctWords: 0,
  incorrectWords: 0,
  startTime: Date.now(),
  phrases: [],
});

export const useSpeakingSession = (): UseSpeakingSession => {
  const [stats, setStats] = useState<ISessionStats>(() => {
    if (typeof window === "undefined") return createInitialStats();

    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return createInitialStats();
      }
    }
    return createInitialStats();
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(stats));
    }
  }, [stats]);

  const recordAttempt = useCallback(
    (
      phraseId: string,
      correctWords: number,
      totalWords: number,
      timeSpent: number
    ) => {
      setStats((prev) => {
        const incorrectWords = totalWords - correctWords;
        const existingPhraseIndex = prev.phrases.findIndex(
          (p) => p.phraseId === phraseId
        );

        const updatedPhrases = [...prev.phrases];

        if (existingPhraseIndex >= 0) {
          const existingPhrase = updatedPhrases[existingPhraseIndex];
          updatedPhrases[existingPhraseIndex] = {
            ...existingPhrase,
            phraseId: existingPhrase!.phraseId,
            attempts: existingPhrase!.attempts + 1,
            accuracy:
              (existingPhrase!.accuracy * existingPhrase!.attempts +
                (correctWords / totalWords) * 100) /
              (existingPhrase!.attempts + 1),
            timeSpent: existingPhrase!.timeSpent + timeSpent,
          };
        } else {
          updatedPhrases.push({
            phraseId,
            attempts: 1,
            accuracy: (correctWords / totalWords) * 100,
            timeSpent,
          });
        }

        return {
          ...prev,
          totalAttempts: prev.totalAttempts + 1,
          correctWords: prev.correctWords + correctWords,
          incorrectWords: prev.incorrectWords + incorrectWords,
          phrases: updatedPhrases,
        };
      });
    },
    []
  );

  const resetSession = useCallback(() => {
    const newStats = createInitialStats();
    setStats(newStats);
    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newStats));
    }
  }, []);

  const accuracy =
    stats.totalAttempts > 0
      ? (stats.correctWords / (stats.correctWords + stats.incorrectWords)) * 100
      : 0;

  const totalWords = stats.correctWords + stats.incorrectWords;

  const averageTimePerPhrase =
    stats.phrases.length > 0
      ? stats.phrases.reduce((sum, p) => sum + p.timeSpent, 0) /
        stats.phrases.length
      : 0;

  const phrasesCompleted = stats.phrases.length;

  return {
    stats,
    recordAttempt,
    resetSession,
    accuracy,
    totalWords,
    averageTimePerPhrase,
    phrasesCompleted,
  };
};
