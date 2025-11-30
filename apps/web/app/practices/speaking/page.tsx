"use client";

import {
  BrowserCompatibilityCheck,
  SpeakingErrorBoundary,
  SpeakingHeader,
  SpeakingLayout,
  SpeakingRecorder,
  usePhraseSelector,
  useSpeakingSession,
} from "@/features/speaking";
import { useCallback } from "react";

export interface PageProps {}

const Page = (props: PageProps) => {
  const {
    currentPhrase,
    nextPhrase,
    previousPhrase,
    selectRandomPhrase,
    setDifficulty,
    setCategory,
    difficulty,
    category,
  } = usePhraseSelector();

  const { recordAttempt, accuracy, totalWords, phrasesCompleted, averageTimePerPhrase } =
    useSpeakingSession();

  const handleAttemptComplete = useCallback(
    (correctWords: number, totalWords: number, timeSpent: number) => {
      if (currentPhrase) {
        recordAttempt(currentPhrase.id, correctWords, totalWords, timeSpent);
      }
    },
    [currentPhrase, recordAttempt]
  );

  return (
    <SpeakingErrorBoundary>
      <SpeakingLayout>
        <BrowserCompatibilityCheck>
          <div className="w-full min-h-screen flex flex-col">
            <SpeakingHeader
              difficulty={difficulty}
              category={category}
              onDifficultyChange={setDifficulty}
              onCategoryChange={setCategory}
            />

            <main className="flex-1 container mx-auto px-4 py-8">
              <div className="max-w-5xl mx-auto space-y-6">
                <SpeakingRecorder
                  phrase={currentPhrase}
                  onNext={nextPhrase}
                  onPrevious={previousPhrase}
                  onRandom={selectRandomPhrase}
                  onAttemptComplete={handleAttemptComplete}
                  sessionStats={{
                    accuracy,
                    totalWords,
                    phrasesCompleted,
                    averageTimePerPhrase,
                  }}
                />
              </div>
            </main>
          </div>
        </BrowserCompatibilityCheck>
      </SpeakingLayout>
    </SpeakingErrorBoundary>
  );
};

export default Page;
