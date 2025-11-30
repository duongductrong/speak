import { Badge, cn, Progress } from "@speak/ui";
import { Activity, Award, Clock, Target, Zap } from "lucide-react";
import { ComponentProps } from "react";
import { TypingStats } from "../hooks/use-typing-stats";

export interface WritingStatsProps extends ComponentProps<"div"> {
  stats: TypingStats;
}

const WritingStats = ({ stats, className, ...props }: WritingStatsProps) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      {...props}
      className={cn("w-full flex flex-col gap-6", className)}
    >
      {/* Primary Stats - WPM and Accuracy */}
      <div className="flex items-center justify-between gap-4">
        {/* WPM Circular Progress */}
        <div className="flex gap-3 items-center">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-muted"
                strokeWidth="2.5"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-primary transition-all duration-300"
                strokeWidth="2.5"
                strokeDasharray={`${Math.min(stats.wpm / 2, 100)} 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-mono font-[700]">
                {stats.wpm}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                WPM
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-[600]">Speed</span>
            </div>
            <Progress 
              value={Math.min(stats.wpm / 2, 100)} 
              className="w-24 h-1.5"
            />
          </div>
        </div>

        {/* Accuracy Circular Progress */}
        <div className="flex gap-3 items-center">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-muted"
                strokeWidth="2.5"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className={cn(
                  "transition-all duration-300",
                  stats.accuracy >= 90 ? "stroke-green-500" : 
                  stats.accuracy >= 70 ? "stroke-amber-500" : 
                  "stroke-red-500"
                )}
                strokeWidth="2.5"
                strokeDasharray={`${stats.accuracy} 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-mono font-[700]">
                {stats.accuracy}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                ACC
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-green-500" />
              <span className="text-sm font-[600]">Accuracy</span>
            </div>
            <Progress 
              value={stats.accuracy} 
              className="w-24 h-1.5"
            />
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t">
        {/* Time */}
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-[500]">Time</span>
          </div>
          <span className="text-xl font-mono font-[700]">
            {formatTime(stats.timeElapsed)}
          </span>
        </div>

        {/* Streak */}
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground font-[500]">Streak</span>
          </div>
          <span className="text-xl font-mono font-[700] text-amber-600 dark:text-amber-400">
            {stats.streak}
          </span>
        </div>

        {/* Characters */}
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-[500]">Chars</span>
          </div>
          <span className="text-xl font-mono font-[700]">
            {stats.totalChars}
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex justify-center">
        <Badge 
          variant={stats.accuracy >= 90 ? "default" : "outline"}
          className="font-mono text-xs"
        >
          {stats.accuracy >= 95 ? "🔥 Perfect!" : 
           stats.accuracy >= 90 ? "✨ Excellent" : 
           stats.accuracy >= 70 ? "👍 Good" : 
           "💪 Keep Going"}
        </Badge>
      </div>
    </div>
  );
};

export default WritingStats;

