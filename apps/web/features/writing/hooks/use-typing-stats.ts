import { useEffect, useState } from "react";

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number;
  streak: number;
}

interface UseTypingStatsProps {
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  isTyping: boolean;
  currentStreak: number;
}

export const useTypingStats = ({
  correctChars,
  incorrectChars,
  totalChars,
  isTyping,
  currentStreak,
}: UseTypingStatsProps): TypingStats => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!isTyping) {
      return;
    }

    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTyping]);

  const calculateWPM = (): number => {
    if (timeElapsed === 0) return 0;
    const minutes = timeElapsed / 60;
    const words = correctChars / 5;
    return Math.round(words / minutes);
  };

  const calculateAccuracy = (): number => {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
  };

  return {
    wpm: calculateWPM(),
    accuracy: calculateAccuracy(),
    correctChars,
    incorrectChars,
    totalChars,
    timeElapsed,
    streak: currentStreak,
  };
};

export const resetTypingStats = (
  setTimeElapsed: (value: number) => void
): void => {
  setTimeElapsed(0);
};

