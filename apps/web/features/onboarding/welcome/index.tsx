"use client";

import { ROUTES } from "@/constants/routes";
import { ArrowRightOutlined, SoundOutlined } from "@ant-design/icons";
import { Button, cn, Space, Typography } from "@speak/ui";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

const { Title, Paragraph } = Typography;

export type WelcomeProps = ComponentProps<"div">;

const Welcome = ({ className, ...props }: WelcomeProps) => {
  const router = useRouter();

  const handleStartPractice = () => {
    router.push(ROUTES.SPEAKING);
  };

  return (
    <div
      className={cn("flex items-center justify-center min-h-screen", className)}
      {...props}
    >
      <div className="text-center max-w-xl px-6">
        <Space direction="vertical" size="middle" className="w-full">
          {/* Icon */}
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <SoundOutlined className="text-3xl text-primary" />
            </div>
          </div>

          {/* Welcome Title */}
          <Title level={1}>
            Welcome to Speak
          </Title>

          {/* Description */}
          <Paragraph>
            Practice your speaking skills with real-time speech recognition.
            Start your journey to fluent speaking today!
          </Paragraph>

          {/* Action Button */}
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            onClick={handleStartPractice}
          >
            Start Practice
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Welcome;
