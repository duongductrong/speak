/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { Button } from "@speak/ui/components/button";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type Props = {};

const Page = (props: Props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser does not support speech recognition</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Status Indicator */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() =>
              listening
                ? SpeechRecognition.stopListening()
                : SpeechRecognition.startListening()
            }
            className={`px-12 py-4 rounded-full text-white font-medium shadow-lg transition-all duration-300 ${
              listening
                ? "bg-emerald-400 hover:bg-emerald-500"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            {listening ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Transcript Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="space-y-6">
            {transcript ? (
              <>
                <div className="text-2xl md:text-3xl font-medium text-emerald-400 leading-relaxed">
                  {transcript}
                </div>
                <div className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  {listening
                    ? "Keep speaking..."
                    : "Transcript captured successfully"}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-2xl text-gray-400 mb-4">
                  {listening
                    ? "Listening... Start speaking"
                    : "Click the button above to start"}
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => SpeechRecognition.startListening()}
              disabled={listening}
              className="bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-gray-300"
            >
              Start Listening
            </Button>
            <Button
              onClick={() => SpeechRecognition.stopListening()}
              disabled={!listening}
              className="bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-300"
            >
              Stop
            </Button>
            <Button
              onClick={resetTranscript}
              variant="outline"
              className="border-gray-300"
            >
              Reset
            </Button>
          </div>

          {/* Status Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Status:{" "}
            <span
              className={listening ? "text-emerald-500" : "text-gray-400"}
            >
              {listening ? "● Listening" : "○ Idle"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
