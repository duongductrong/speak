import { useEffect } from "react";

export interface KeyboardShortcuts {
  onSpace?: () => void;
  onRetry?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onRandom?: () => void;
  onShowPhonetics?: () => void;
}

export const useKeyboardShortcuts = ({
  onSpace,
  onRetry,
  onNext,
  onPrevious,
  onRandom,
  onShowPhonetics,
}: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case " ":
          event.preventDefault();
          onSpace?.();
          break;
        case "r":
          event.preventDefault();
          onRetry?.();
          break;
        case "n":
        case "arrowright":
          event.preventDefault();
          onNext?.();
          break;
        case "p":
        case "arrowleft":
          event.preventDefault();
          onPrevious?.();
          break;
        case "s":
          event.preventDefault();
          onRandom?.();
          break;
        case "h":
          event.preventDefault();
          onShowPhonetics?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSpace, onRetry, onNext, onPrevious, onRandom, onShowPhonetics]);
};

