export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type PhraseCategory = "greetings" | "business" | "casual" | "travel" | "daily" | "questions";

export interface PhoneticHint {
  word: string;
  phonetic: string;
  tip?: string;
}

export interface SpeakingPhrase {
  id: string;
  text: string;
  words: string[];
  difficulty: DifficultyLevel;
  category: PhraseCategory;
  phoneticHints?: PhoneticHint[];
  translation?: string;
}

export interface ISessionStats {
  totalAttempts: number;
  correctWords: number;
  incorrectWords: number;
  startTime: number;
  endTime?: number;
  phrases: Array<{
    phraseId: string;
    attempts: number;
    accuracy: number;
    timeSpent: number;
  }>;
}

