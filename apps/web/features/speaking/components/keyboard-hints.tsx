import { Badge, Card, CardContent, cn } from "@speak/ui";
import { ChevronLeft, ChevronRight, Eye, RefreshCw, Shuffle, Space } from "lucide-react";
import { ComponentProps } from "react";

export interface KeyboardHintsProps extends ComponentProps<"div"> {
  compact?: boolean;
}

export const KeyboardHints = ({ compact = false, className, ...props }: KeyboardHintsProps) => {
  const shortcuts = [
    { key: "Space", icon: Space, label: "Start/Stop", color: "text-blue-600 dark:text-blue-400" },
    { key: "R", icon: RefreshCw, label: "Retry", color: "text-green-600 dark:text-green-400" },
    { key: "N / →", icon: ChevronRight, label: "Next", color: "text-purple-600 dark:text-purple-400" },
    { key: "P / ←", icon: ChevronLeft, label: "Previous", color: "text-orange-600 dark:text-orange-400" },
    { key: "S", icon: Shuffle, label: "Random", color: "text-pink-600 dark:text-pink-400" },
    { key: "H", icon: Eye, label: "Phonetics", color: "text-indigo-600 dark:text-indigo-400" },
  ];

  if (compact) {
    return (
      <div {...props} className={cn("flex items-center gap-2 flex-wrap text-xs text-muted-foreground", className)}>
        <span className="font-medium">Shortcuts:</span>
        {shortcuts.map((shortcut) => (
          <kbd
            key={shortcut.key}
            className="px-2 py-1 bg-muted rounded border border-border font-mono text-xs"
          >
            {shortcut.key}
          </kbd>
        ))}
      </div>
    );
  }

  return (
    <Card {...props} className={cn("backdrop-blur-sm bg-card/80 border-none shadow-md", className)}>
      <CardContent className="p-3">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="text-xs font-medium text-muted-foreground">Keyboard Shortcuts:</span>
          {shortcuts.map((shortcut) => {
            const Icon = shortcut.icon;
            return (
              <div key={shortcut.key} className="flex items-center gap-1.5">
                <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">
                  {shortcut.key}
                </Badge>
                <Icon className={cn("w-3 h-3", shortcut.color)} />
                <span className="text-xs text-muted-foreground">{shortcut.label}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

