"use client";

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@speak/ui";
import { AlertCircle, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export const BrowserCompatibilityCheck = ({ children }: { children: React.ReactNode }) => {
  const [isCompatible, setIsCompatible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [missingFeatures, setMissingFeatures] = useState<string[]>([]);

  useEffect(() => {
    const checkCompatibility = () => {
      const missing: string[] = [];

      // Check for Speech Recognition
      if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        missing.push("Speech Recognition");
      }

      // Check for Speech Synthesis
      if (!("speechSynthesis" in window)) {
        missing.push("Speech Synthesis");
      }

      // Check for MediaDevices (microphone access)
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        missing.push("Microphone Access");
      }

      setMissingFeatures(missing);
      setIsCompatible(missing.length === 0);
      setIsLoading(false);
    };

    // Small delay to ensure window is fully loaded
    setTimeout(checkCompatibility, 100);
  }, []);

  if (isLoading) {
    return (
      <Card className="max-w-2xl w-full backdrop-blur-sm bg-card/95 shadow-2xl animate-pulse">
        <CardContent className="flex items-center justify-center min-h-[300px]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Checking browser compatibility...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isCompatible) {
    return (
      <Card className="max-w-2xl w-full backdrop-blur-sm bg-card/95 shadow-2xl border-yellow-500/50">
        <CardHeader>
          <CardTitle className="text-2xl font-heading flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
            <AlertCircle className="w-6 h-6" />
            Browser Not Supported
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your browser doesn't support the following features required for speaking practice:
          </p>
          <div className="flex gap-2 flex-wrap">
            {missingFeatures.map((feature) => (
              <Badge key={feature} variant="destructive">
                {feature}
              </Badge>
            ))}
          </div>
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium">Recommended browsers:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Google Chrome (version 25+)</li>
              <li>Microsoft Edge (version 79+)</li>
              <li>Opera (version 27+)</li>
            </ul>
          </div>
          <p className="text-xs text-muted-foreground">
            Note: Safari has limited support for Web Speech API. For the best experience, please use Chrome or Edge.
          </p>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => window.open("https://caniuse.com/speech-recognition", "_blank")}
          >
            <ExternalLink className="w-4 h-4" />
            Learn more about browser support
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

