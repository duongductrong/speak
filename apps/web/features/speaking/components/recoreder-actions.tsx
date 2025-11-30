import { Badge, Button, cn, Progress } from "@speak/ui";
import { Mic, MicOff } from "lucide-react";
import { ComponentProps } from "react";

export interface RecorderActionsProps extends ComponentProps<"div"> {
  listening?: boolean;
  onStartListening?: () => void;
  matchPercentage?: number;
}

const RecorderActions = ({
  className,
  matchPercentage = 0,
  listening,
  onStartListening,
  ...props
}: RecorderActionsProps) => {
  return (
    <div
      {...props}
      className={cn("w-full flex justify-between items-center gap-4", className)}
    >
      <div className="flex gap-3 items-center">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-muted"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-primary transition-all duration-300"
              strokeWidth="3"
              strokeDasharray={`${matchPercentage} 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-mono font-semibold">
              {Math.round(matchPercentage)}%
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Your Result</span>
          <Progress value={matchPercentage} className="w-24 h-1.5" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge
          variant={listening ? "default" : "outline"}
          className={cn(
            "transition-all text-xs px-3 py-1.5",
            listening && "animate-pulse"
          )}
        >
          {listening ? "Listening..." : "Ready"}
        </Badge>

        <Button
          variant={listening ? "destructive" : "default"}
          size="icon"
          onClick={onStartListening}
          className="transition-all"
          aria-label={listening ? "Stop listening" : "Start listening"}
        >
          {listening ? (
            <MicOff className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default RecorderActions;
