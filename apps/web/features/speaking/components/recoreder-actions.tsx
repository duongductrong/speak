import { Badge, Button, cn } from "@speak/ui";
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
      className={cn("flex items-center justify-center gap-4", className)}
    >
      <Badge
        variant={listening ? "default" : "outline"}
        className={cn(
          "transition-all text-xs px-3 py-1.5",
          listening && "animate-pulse"
        )}
      >
        {listening ? "Listening..." : "Ready to speak"}
      </Badge>

      <Button
        variant={listening ? "destructive" : "default"}
        size="lg"
        onClick={onStartListening}
        className="transition-all gap-2 rounded-full h-16 w-16"
        aria-label={listening ? "Stop listening" : "Start listening"}
      >
        {listening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </Button>

      {matchPercentage > 0 && (
        <div className="text-sm text-muted-foreground">
          <span className="font-mono font-[600]">{Math.round(matchPercentage)}%</span> match
        </div>
      )}
    </div>
  );
};

export default RecorderActions;
