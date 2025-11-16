/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { Button, Card, Space, Typography, Badge, Flex } from "antd";
import {
  CheckOutlined,
  AudioOutlined,
  ReloadOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const { Text, Title } = Typography;

type Props = {};

const Page = (props: Props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    transcribing: true,
  });

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser does not support speech recognition</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "800px" }}>
        {/* Status Indicator */}
        <Flex justify="center" style={{ marginBottom: "24px" }}>
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={
              listening ? (
                <CheckOutlined style={{ fontSize: "32px" }} />
              ) : (
                <AudioOutlined style={{ fontSize: "32px" }} />
              )
            }
            onClick={() =>
              listening
                ? SpeechRecognition.stopListening()
                : SpeechRecognition.startListening({ continuous: true })
            }
            style={{
              height: "80px",
              padding: "0 48px",
              backgroundColor: listening ? "#52c41a" : "#8c8c8c",
              borderColor: listening ? "#52c41a" : "#8c8c8c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Flex>

        {/* Transcript Card */}
        <Card
          bordered={false}
          style={{
            borderRadius: "24px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {transcript ? (
              <>
                <Title
                  level={2}
                  style={{
                    color: "#52c41a",
                    margin: 0,
                    fontSize: "28px",
                    lineHeight: 1.6,
                  }}
                >
                  {transcript}
                </Title>
                <Title
                  level={3}
                  style={{
                    color: "#595959",
                    margin: 0,
                    fontWeight: 400,
                    fontSize: "22px",
                  }}
                >
                  {listening
                    ? "Keep speaking..."
                    : "Transcript captured successfully"}
                </Title>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <Text
                  style={{
                    fontSize: "24px",
                    color: "#bfbfbf",
                  }}
                >
                  {listening
                    ? "Listening... Start speaking"
                    : "Click the button above to start"}
                </Text>
              </div>
            )}

            {/* Controls */}
            <Flex
              gap="middle"
              wrap
              justify="center"
              style={{ marginTop: "16px" }}
            >
              <Button
                type="primary"
                size="large"
                icon={<PlayCircleOutlined />}
                onClick={() =>
                  SpeechRecognition.startListening({ continuous: true })
                }
                disabled={listening}
                style={{
                  backgroundColor: listening ? undefined : "#52c41a",
                  borderColor: listening ? undefined : "#52c41a",
                }}
              >
                Start Listening
              </Button>
              <Button
                type="default"
                size="large"
                icon={<PauseCircleOutlined />}
                onClick={() => SpeechRecognition.stopListening()}
                disabled={!listening}
              >
                Stop
              </Button>
              <Button
                size="large"
                icon={<ReloadOutlined />}
                onClick={resetTranscript}
              >
                Reset
        </Button>
            </Flex>

            {/* Status Footer */}
            <Flex justify="center" style={{ marginTop: "8px" }}>
              <Text type="secondary">
                Status:{" "}
                <Badge
                  status={listening ? "processing" : "default"}
                  text={listening ? "Listening" : "Idle"}
                />
              </Text>
            </Flex>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Page;
