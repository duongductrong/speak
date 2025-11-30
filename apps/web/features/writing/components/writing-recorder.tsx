"use client";

import { Badge, Button, cn, Progress } from "@speak/ui";
import { ArrowLeft, ChevronDown, Keyboard, RotateCcw, Shuffle } from "lucide-react";
import Link from "next/link";
import { ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ROUTES } from "@/constants/routes";
import { DIFFICULTY_LEVELS, DifficultyLevel, PRACTICE_TEXTS, TYPING_STATUS, TypingStatus } from "../constants";
import { useTypingStats } from "../hooks/use-typing-stats";

export interface WritingRecorderProps extends ComponentProps<"div"> {
  initialDifficulty?: DifficultyLevel;
}

interface CharStatus {
  char: string;
  status: TypingStatus;
  index: number;
}

const WritingRecorder = ({ 
  initialDifficulty = DIFFICULTY_LEVELS.BEGINNER,
  className,
  ...props 
}: WritingRecorderProps) => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialDifficulty);
  const [targetText, setTargetText] = useState<string>("");
  const [typedText, setTypedText] = useState<string>("");
  const [isStarted, setIsStarted] = useState(false);
  const [charStatuses, setCharStatuses] = useState<CharStatus[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const selectRandomText = useCallback((level: DifficultyLevel) => {
    const texts = PRACTICE_TEXTS[level];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setTargetText(randomText);
  }, []);

  useEffect(() => {
    selectRandomText(difficulty);
  }, [difficulty, selectRandomText]);

  useEffect(() => {
    if (targetText) {
      setCharStatuses(
        targetText.split("").map((char, index) => ({
          char,
          status: TYPING_STATUS.PENDING,
          index,
        }))
      );
    }
  }, [targetText]);

  const { correctChars, incorrectChars } = useMemo(() => {
    const correct = charStatuses.filter(
      (item) => item.status === TYPING_STATUS.CORRECT
    ).length;
    const incorrect = charStatuses.filter(
      (item) => item.status === TYPING_STATUS.INCORRECT
    ).length;
    return { correctChars: correct, incorrectChars: incorrect };
  }, [charStatuses]);

  const stats = useTypingStats({
    correctChars,
    incorrectChars,
    totalChars: typedText.length,
    isTyping: isStarted && typedText.length < targetText.length,
    currentStreak,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    
    if (newText.length > targetText.length) {
      return;
    }

    if (!isStarted && newText.length > 0) {
      setIsStarted(true);
    }

    setTypedText(newText);

    const newCharStatuses = targetText.split("").map((char, index) => {
      if (index >= newText.length) {
        return {
          char,
          status: TYPING_STATUS.PENDING,
          index,
        };
      }

      const isCorrect = newText[index] === char;
      
      if (isCorrect) {
        if (index === newText.length - 1) {
          setCurrentStreak((prev) => {
            const newStreak = prev + 1;
            setMaxStreak((max) => Math.max(max, newStreak));
            return newStreak;
          });
        }
      } else if (index === newText.length - 1) {
        setCurrentStreak(0);
      }

      return {
        char,
        status: isCorrect ? TYPING_STATUS.CORRECT : TYPING_STATUS.INCORRECT,
        index,
      };
    });

    setCharStatuses(newCharStatuses);
  };

  const handleReset = () => {
    setTypedText("");
    setIsStarted(false);
    setCurrentStreak(0);
    setMaxStreak(0);
    setCharStatuses(
      targetText.split("").map((char, index) => ({
        char,
        status: TYPING_STATUS.PENDING,
        index,
      }))
    );
    inputRef.current?.focus();
  };

  const handleNewText = () => {
    selectRandomText(difficulty);
    handleReset();
  };

  const handleDifficultyChange = (newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    handleReset();
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const getCharColorClass = (status: TypingStatus): string => {
    switch (status) {
      case TYPING_STATUS.CORRECT:
        return "text-green-600 dark:text-green-400";
      case TYPING_STATUS.INCORRECT:
        return "text-red-600 dark:text-red-400 animate-shake";
      default:
        return "text-muted-foreground/40";
    }
  };

  const isCompleted = typedText.length === targetText.length && targetText.length > 0;
  const progressPercentage = targetText.length > 0 ? (typedText.length / targetText.length) * 100 : 0;
  const [showDifficultyMenu, setShowDifficultyMenu] = useState(false);

  const getDifficultyLabel = (level: DifficultyLevel): string => {
    switch (level) {
      case DIFFICULTY_LEVELS.BEGINNER:
        return "Beginner";
      case DIFFICULTY_LEVELS.INTERMEDIATE:
        return "Intermediate";
      case DIFFICULTY_LEVELS.ADVANCED:
        return "Advanced";
      default:
        return "Beginner";
    }
  };

  return (
    <div {...props} className={cn("w-full min-h-screen flex flex-col", className)}>
      {/* Header */}
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={ROUTES.HOME}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-muted-foreground" />
              <h1 className="text-lg font-[600]">Writing Practice</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDifficultyMenu(!showDifficultyMenu)}
                className="gap-2 min-w-32"
              >
                {getDifficultyLabel(difficulty)}
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              {showDifficultyMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowDifficultyMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-40 bg-background border rounded-lg shadow-lg z-50 py-1">
                    <button
                      onClick={() => {
                        handleDifficultyChange(DIFFICULTY_LEVELS.BEGINNER);
                        setShowDifficultyMenu(false);
                      }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors",
                        difficulty === DIFFICULTY_LEVELS.BEGINNER && "bg-muted font-[600]"
                      )}
                    >
                      Beginner
                    </button>
                    <button
                      onClick={() => {
                        handleDifficultyChange(DIFFICULTY_LEVELS.INTERMEDIATE);
                        setShowDifficultyMenu(false);
                      }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors",
                        difficulty === DIFFICULTY_LEVELS.INTERMEDIATE && "bg-muted font-[600]"
                      )}
                    >
                      Intermediate
                    </button>
                    <button
                      onClick={() => {
                        handleDifficultyChange(DIFFICULTY_LEVELS.ADVANCED);
                        setShowDifficultyMenu(false);
                      }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors",
                        difficulty === DIFFICULTY_LEVELS.ADVANCED && "bg-muted font-[600]"
                      )}
                    >
                      Advanced
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Progress Bar */}
          {isStarted && (
            <div className="space-y-2 animate-fade-in">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-[500]">Progress</span>
                <span className="font-mono font-[600]">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}

          {/* Start State */}
          {!isStarted && typedText.length === 0 && (
            <div className="text-center space-y-6 py-12 animate-fade-in">
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
                  <Keyboard className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-[700]">Ready to Practice?</h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Click on the text area below and start typing to begin your practice session.
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="font-mono">
                  {getDifficultyLabel(difficulty)} Level
                </Badge>
                <span>•</span>
                <span>{targetText.length} characters</span>
              </div>
            </div>
          )}

          {/* Typing Area */}
          <div 
            className={cn(
              "relative rounded-xl border-2 transition-all duration-200 bg-background",
              isStarted ? "border-primary/50 shadow-lg shadow-primary/5" : "border-muted hover:border-muted-foreground/30 cursor-text"
            )}
            onClick={handleFocus}
          >
            <div className="p-8 min-h-64">
              {/* Hidden input */}
              <textarea
                ref={inputRef}
                value={typedText}
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />

              {/* Display text with character-by-character feedback */}
              <div className="font-mono text-3xl leading-relaxed select-none pointer-events-none">
                {charStatuses.map((item, index) => (
                  <span
                    key={`${item.char}-${index}`}
                    className={cn(
                      "transition-all duration-100 relative",
                      getCharColorClass(item.status),
                      index === typedText.length && "animate-cursor-blink"
                    )}
                  >
                    {item.char}
                    {index === typedText.length && (
                      <span className="absolute -right-0.5 top-0 bottom-0 w-0.5 bg-foreground animate-cursor-pulse" />
                    )}
                  </span>
                ))}
              </div>

              {/* Completion overlay */}
              {isCompleted && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center rounded-xl animate-fade-in">
                  <div className="text-center space-y-6 p-8">
                    <div className="text-7xl animate-bounce-in">🎉</div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-[800]">Exercise Complete!</h3>
                      <p className="text-lg text-muted-foreground">
                        {stats.accuracy >= 95 ? "Perfect accuracy! Outstanding work!" : 
                         stats.accuracy >= 85 ? "Excellent typing! Keep it up!" :
                         stats.accuracy >= 70 ? "Good job! Practice makes perfect!" :
                         "Nice effort! Try again to improve your accuracy."}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 pt-4">
                      <Button onClick={handleNewText} size="lg" className="gap-2">
                        <Shuffle className="w-4 h-4" />
                        Next Challenge
                      </Button>
                      <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats - Only show when typing has started */}
          {isStarted && !isCompleted && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
              <div className="p-4 rounded-lg bg-muted/50 border">
                <div className="text-xs text-muted-foreground font-[500] mb-1">Speed</div>
                <div className="text-2xl font-mono font-[700]">{stats.wpm} <span className="text-sm text-muted-foreground">WPM</span></div>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50 border">
                <div className="text-xs text-muted-foreground font-[500] mb-1">Accuracy</div>
                <div className={cn(
                  "text-2xl font-mono font-[700]",
                  stats.accuracy >= 90 ? "text-green-600 dark:text-green-400" : 
                  stats.accuracy >= 70 ? "text-amber-600 dark:text-amber-400" : 
                  "text-red-600 dark:text-red-400"
                )}>
                  {stats.accuracy}<span className="text-sm">%</span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50 border">
                <div className="text-xs text-muted-foreground font-[500] mb-1">Time</div>
                <div className="text-2xl font-mono font-[700]">
                  {Math.floor(stats.timeElapsed / 60)}:{(stats.timeElapsed % 60).toString().padStart(2, "0")}
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50 border">
                <div className="text-xs text-muted-foreground font-[500] mb-1">Streak</div>
                <div className="text-2xl font-mono font-[700] text-amber-600 dark:text-amber-400">
                  {stats.streak}
                </div>
              </div>
            </div>
          )}

          {/* Completed Stats - Full detailed view */}
          {isCompleted && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-fade-in">
              <div className="p-4 rounded-lg bg-muted/50 border text-center">
                <div className="text-xs text-muted-foreground font-[500] mb-2">Speed</div>
                <div className="text-3xl font-mono font-[700]">{stats.wpm}</div>
                <div className="text-xs text-muted-foreground mt-1">WPM</div>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50 border text-center">
                <div className="text-xs text-muted-foreground font-[500] mb-2">Accuracy</div>
                <div className={cn(
                  "text-3xl font-mono font-[700]",
                  stats.accuracy >= 90 ? "text-green-600 dark:text-green-400" : 
                  stats.accuracy >= 70 ? "text-amber-600 dark:text-amber-400" : 
                  "text-red-600 dark:text-red-400"
                )}>
                  {stats.accuracy}%
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50 border text-center">
                <div className="text-xs text-muted-foreground font-[500] mb-2">Time</div>
                <div className="text-3xl font-mono font-[700]">
                  {Math.floor(stats.timeElapsed / 60)}:{(stats.timeElapsed % 60).toString().padStart(2, "0")}
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50 border text-center">
                <div className="text-xs text-muted-foreground font-[500] mb-2">Max Streak</div>
                <div className="text-3xl font-mono font-[700] text-amber-600 dark:text-amber-400">
                  {maxStreak}
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50 border text-center">
                <div className="text-xs text-muted-foreground font-[500] mb-2">Characters</div>
                <div className="text-3xl font-mono font-[700]">
                  {stats.totalChars}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons - Only show during active typing */}
          {isStarted && !isCompleted && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <Button onClick={handleNewText} variant="outline" size="sm" className="gap-2">
                <Shuffle className="w-4 h-4" />
                New Text
              </Button>
              <Button onClick={handleReset} variant="outline" size="sm" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WritingRecorder;

