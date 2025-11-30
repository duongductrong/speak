import { useCallback, useState } from "react";
import { getFilteredPhrases } from "../data/phrases";
import { DifficultyLevel, PhraseCategory, SpeakingPhrase } from "../types";

export interface UsePhraseSelector {
  currentPhrase: SpeakingPhrase | null;
  nextPhrase: () => void;
  previousPhrase: () => void;
  selectRandomPhrase: () => void;
  setDifficulty: (difficulty?: DifficultyLevel) => void;
  setCategory: (category?: PhraseCategory) => void;
  difficulty?: DifficultyLevel;
  category?: PhraseCategory;
  availablePhrases: SpeakingPhrase[];
  currentIndex: number;
}

export const usePhraseSelector = (): UsePhraseSelector => {
  const [difficulty, setDifficultyState] = useState<DifficultyLevel | undefined>(undefined);
  const [category, setCategoryState] = useState<PhraseCategory | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availablePhrases, setAvailablePhrases] = useState<SpeakingPhrase[]>(() => 
    getFilteredPhrases()
  );

  const updatePhrases = useCallback((newDifficulty?: DifficultyLevel, newCategory?: PhraseCategory) => {
    const filtered = getFilteredPhrases(newDifficulty, newCategory);
    setAvailablePhrases(filtered);
    setCurrentIndex(0);
  }, []);

  const setDifficulty = useCallback((newDifficulty?: DifficultyLevel) => {
    setDifficultyState(newDifficulty);
    updatePhrases(newDifficulty, category);
  }, [category, updatePhrases]);

  const setCategory = useCallback((newCategory?: PhraseCategory) => {
    setCategoryState(newCategory);
    updatePhrases(difficulty, newCategory);
  }, [difficulty, updatePhrases]);

  const nextPhrase = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % availablePhrases.length);
  }, [availablePhrases.length]);

  const previousPhrase = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + availablePhrases.length) % availablePhrases.length);
  }, [availablePhrases.length]);

  const selectRandomPhrase = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * availablePhrases.length);
    setCurrentIndex(randomIndex);
  }, [availablePhrases.length]);

  const currentPhrase = availablePhrases[currentIndex] || null;

  return {
    currentPhrase,
    nextPhrase,
    previousPhrase,
    selectRandomPhrase,
    setDifficulty,
    setCategory,
    difficulty,
    category,
    availablePhrases,
    currentIndex,
  };
};

