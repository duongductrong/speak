/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

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
      <p>Transcript: {transcript}</p>
      <p>Listening: {listening ? "Yes" : "No"}</p>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={() => SpeechRecognition.startListening()}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
    </div>
  );
};

export default Page;
