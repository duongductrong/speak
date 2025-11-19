import { LoadingOutlined } from "@ant-design/icons";
import { Badge, cn, Progress, Spin, Text } from "@speak/ui";
import { ComponentProps } from "react";

export interface RecorderActionsProps extends ComponentProps<"div"> {
  listening?: boolean;
  onStartListening?: () => void;
  matchPercentage?: number;
}

const RecorderActions = ({
  className,
  matchPercentage = 0,
  listening,
  onStartListening,
  ...props
}: RecorderActionsProps) => {
  return (
    <div
      {...props}
      className={cn("w-full flex justify-between items-center px-6", className)}
    >
      <div className="flex gap-2 items-center justify-center">
        <Progress type="circle" percent={matchPercentage} size={20} />
        <Text type="secondary">Your result</Text>
      </div>

      <div className="flex items-center gap-2">
        <Badge
          status={listening ? "processing" : "default"}
          text={listening ? "Listening" : "Click to speak"}
          onClick={onStartListening}
          className="cursor-pointer"
        />

        {listening ? (
          <Spin
            spinning={listening}
            indicator={<LoadingOutlined spin />}
            size="small"
          />
        ) : null}
      </div>
    </div>
  );
};

export default RecorderActions;
