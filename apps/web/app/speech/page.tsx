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
    <div>
      <p>Browser supports speech recognition</p>
      <p className="text-green-600">Transcript: {transcript}</p>
      <p className="text-red-600">Listening: {listening ? "Yes" : "No"}</p>
      <Button onClick={resetTranscript}>Reset</Button>
      <Button onClick={() => SpeechRecognition.startListening()}>Start</Button>
      <Button onClick={() => SpeechRecognition.stopListening()}>Stop</Button>
    </div>
  );
};

export default Page;
