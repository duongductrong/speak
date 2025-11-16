import { SpeakingLayout, SpeakingRecorder } from "@/features/speaking";

export interface PageProps {}

const Page = (props: PageProps) => {
  return (
    <SpeakingLayout>
      <SpeakingRecorder
        words={[
          "I'm",
          "sorry,",
          "I",
          "thought",
          "you",
          "said",
          "this",
          "Thursday.",
        ]}
      />
    </SpeakingLayout>
  );
};

export default Page;
