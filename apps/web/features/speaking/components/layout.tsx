import { ComponentProps } from "react";

export interface SpeakingLayoutProps extends ComponentProps<"div"> {}

export const SpeakingLayout = ({ children, ...props }: SpeakingLayoutProps) => {
  return (
    <div {...props} className="h-screen w-full flex justify-center items-center bg-muted">
      {children}
    </div>
  );
};
