import { Badge, cn } from "@speak/ui";
import { ComponentProps } from "react";
import { DifficultyLevel } from "../types";

export interface DifficultySelectorProps extends ComponentProps<"div"> {
  selected?: DifficultyLevel;
  onSelect: (difficulty?: DifficultyLevel) => void;
}

const DIFFICULTIES: Array<{ value: DifficultyLevel | undefined; label: string; color: string }> = [
  { value: undefined, label: "All", color: "bg-muted text-muted-foreground" },
  { value: "beginner", label: "Beginner", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
  { value: "intermediate", label: "Intermediate", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" },
  { value: "advanced", label: "Advanced", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" },
];

export const DifficultySelector = ({
  selected,
  onSelect,
  className,
  ...props
}: DifficultySelectorProps) => {
  return (
    <div {...props} className={cn("flex gap-2 items-center", className)}>
      <span className="text-sm font-medium text-muted-foreground">Level:</span>
      <div className="flex gap-2">
        {DIFFICULTIES.map((difficulty) => (
          <Badge
            key={difficulty.label}
            className={cn(
              "cursor-pointer transition-all hover:scale-105",
              selected === difficulty.value
                ? difficulty.color
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
            onClick={() => onSelect(difficulty.value)}
          >
            {difficulty.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

