import { ComponentProps } from "react";

export interface SpeakingLayoutProps extends ComponentProps<"div"> {}

export const SpeakingLayout = ({ children, ...props }: SpeakingLayoutProps) => {
  return (
    <div {...props} className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Clean subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};
