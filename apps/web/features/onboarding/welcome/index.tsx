"use client";

import { ROUTES } from "@/constants/routes";
import { Button, cn } from "@speak/ui";
import { Keyboard, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

export type WelcomeProps = ComponentProps<"div">;

const Welcome = ({ className, ...props }: WelcomeProps) => {
  const router = useRouter();

  const handleStartSpeaking = () => {
    router.push(ROUTES.SPEAKING);
  };

  const handleStartWriting = () => {
    router.push(ROUTES.WRITING);
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center min-h-screen overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Clean subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      <div className="relative z-10 text-center max-w-3xl px-6 space-y-12 animate-fade-in">
        {/* Hero icons */}
        <div className="flex items-center justify-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Mic className="w-10 h-10 text-primary" strokeWidth={2} />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Keyboard className="w-10 h-10 text-primary" strokeWidth={2} />
          </div>
        </div>

        {/* Hero text */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-[700] tracking-tight leading-tight text-balance">
            Master Your Communication Skills
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto font-[400]">
            Practice speaking and writing with real-time feedback.
            Build confidence through deliberate practice.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={handleStartSpeaking}
              className="text-base h-14 px-8 w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Mic className="w-5 h-5" strokeWidth={2} />
              Speaking Practice
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleStartWriting}
              className="text-base h-14 px-8 w-full sm:w-auto gap-2 border-2"
            >
              <Keyboard className="w-5 h-5" strokeWidth={2} />
              Writing Practice
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground font-[400]">
            No signup required • Start practicing immediately
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
          <div className="space-y-2">
            <div className="text-3xl font-[700] text-primary">Real-time</div>
            <p className="text-sm text-muted-foreground">
              Instant feedback as you practice
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-[700] text-primary">Adaptive</div>
            <p className="text-sm text-muted-foreground">
              Multiple difficulty levels
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-[700] text-primary">Progress</div>
            <p className="text-sm text-muted-foreground">
              Track your improvement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
