"use client";

import { ROUTES } from "@/constants/routes";
import { Badge, Button, cn } from "@speak/ui";
import { ArrowLeft, ChevronDown, Mic2 } from "lucide-react";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { DifficultyLevel, PhraseCategory } from "../types";

export interface SpeakingHeaderProps extends ComponentProps<"header"> {
  difficulty?: DifficultyLevel;
  category?: PhraseCategory;
  onDifficultyChange?: (difficulty?: DifficultyLevel) => void;
  onCategoryChange?: (category?: PhraseCategory) => void;
}

const DIFFICULTIES: Array<{ value: DifficultyLevel | undefined; label: string }> = [
  { value: undefined, label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const CATEGORIES: Array<{ value: PhraseCategory | undefined; label: string }> = [
  { value: undefined, label: "All Categories" },
  { value: "greetings", label: "Greetings" },
  { value: "business", label: "Business" },
  { value: "casual", label: "Casual" },
  { value: "travel", label: "Travel" },
  { value: "daily", label: "Daily" },
  { value: "questions", label: "Questions" },
];

export const SpeakingHeader = ({
  difficulty,
  category,
  onDifficultyChange,
  onCategoryChange,
  className,
  ...props
}: SpeakingHeaderProps) => {
  const [showDifficultyMenu, setShowDifficultyMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const getDifficultyLabel = (level?: DifficultyLevel): string => {
    return DIFFICULTIES.find(d => d.value === level)?.label || "All Levels";
  };

  const getCategoryLabel = (cat?: PhraseCategory): string => {
    return CATEGORIES.find(c => c.value === cat)?.label || "All Categories";
  };

  return (
    <header 
      {...props} 
      className={cn(
        "w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
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
            <Mic2 className="w-5 h-5 text-muted-foreground" />
            <h1 className="text-lg font-[600]">Speaking Practice</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Category Selector */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className="gap-2 min-w-36 hidden sm:flex"
            >
              {getCategoryLabel(category)}
              <ChevronDown className="w-4 h-4" />
            </Button>
            
            {showCategoryMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowCategoryMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-background border rounded-lg shadow-lg z-50 py-1 max-h-64 overflow-y-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => {
                        onCategoryChange?.(cat.value);
                        setShowCategoryMenu(false);
                      }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors",
                        category === cat.value && "bg-muted font-[600]"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Difficulty Selector */}
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
                  {DIFFICULTIES.map((diff) => (
                    <button
                      key={diff.label}
                      onClick={() => {
                        onDifficultyChange?.(diff.value);
                        setShowDifficultyMenu(false);
                      }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors",
                        difficulty === diff.value && "bg-muted font-[600]"
                      )}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

