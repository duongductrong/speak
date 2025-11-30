"use client";

import { Badge, Button, Card, CardContent, CardHeader, CardTitle, cn } from "@speak/ui";
import { Check, Mic, Pause, Play, RotateCcw } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Page = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    transcribing: true,
  });

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen gradient-mesh flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Not Supported</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your browser does not support speech recognition. Please try using Chrome or Edge.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full animate-scale-in backdrop-blur-sm bg-card/95">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Speech Recognition</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="flex justify-center">
            <Button
              size="icon"
              variant={listening ? "default" : "outline"}
              onClick={handleToggleListening}
              className={cn(
                "w-20 h-20 rounded-full transition-all shadow-lg",
                listening && "bg-green-600 hover:bg-green-700 animate-pulse"
              )}
            >
              {listening ? (
                <Check className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </Button>
          </div>

          <div className="space-y-4 min-h-32">
            {transcript ? (
              <div className="space-y-3 animate-fade-in">
                <p className="text-3xl font-medium leading-relaxed text-green-600 dark:text-green-400">
                  {transcript}
                </p>
                <p className="text-lg text-muted-foreground font-light">
                  {listening
                    ? "Keep speaking..."
                    : "Transcript captured successfully"}
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-2xl text-muted-foreground/60">
                  {listening
                    ? "Listening... Start speaking"
                    : "Click the button above to start"}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center pt-4 border-t">
            <Button
              size="lg"
              onClick={() =>
                SpeechRecognition.startListening({ continuous: true })
              }
              disabled={listening}
            >
              <Play className="w-4 h-4" />
              Start Listening
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => SpeechRecognition.stopListening()}
              disabled={!listening}
            >
              <Pause className="w-4 h-4" />
              Stop
            </Button>
            <Button size="lg" variant="outline" onClick={resetTranscript}>
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Status:</span>
              <Badge variant={listening ? "default" : "outline"}>
                {listening ? "Listening" : "Idle"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
