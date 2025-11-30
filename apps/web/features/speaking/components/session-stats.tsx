import { Badge, Card, CardContent } from "@speak/ui";
import { Award, BarChart3, Clock, Target } from "lucide-react";
import { ComponentProps } from "react";

export interface SessionStatsProps extends ComponentProps<"div"> {
  accuracy: number;
  totalWords: number;
  phrasesCompleted: number;
  averageTimePerPhrase: number;
}

export const SessionStats = ({
  accuracy,
  totalWords,
  phrasesCompleted,
  averageTimePerPhrase,
  ...props
}: SessionStatsProps) => {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  const stats = [
    {
      icon: Target,
      label: "Accuracy",
      value: `${Math.round(accuracy)}%`,
      color: accuracy >= 80 ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400",
    },
    {
      icon: BarChart3,
      label: "Words",
      value: totalWords.toString(),
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Award,
      label: "Phrases",
      value: phrasesCompleted.toString(),
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Clock,
      label: "Avg Time",
      value: formatTime(averageTimePerPhrase),
      color: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <Card {...props} className="backdrop-blur-sm bg-card/95 border-none shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-mono">
              Session Stats
            </Badge>
          </div>
          <div className="flex gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                    <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

