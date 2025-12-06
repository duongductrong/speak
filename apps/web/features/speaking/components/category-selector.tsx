import { Badge, cn } from "@speak/ui";
import {
  Briefcase,
  Coffee,
  MapPin,
  MessageCircle,
  MessageSquare,
  User,
} from "lucide-react";
import { ComponentProps } from "react";
import { PhraseCategory } from "../types";

export interface CategorySelectorProps
  extends Omit<ComponentProps<"div">, "onSelect"> {
  selected?: PhraseCategory;
  onSelect: (category?: PhraseCategory) => void;
}

const CATEGORIES: Array<{
  value: PhraseCategory | undefined;
  label: string;
  icon: typeof User;
}> = [
  { value: undefined, label: "All", icon: MessageCircle },
  { value: "greetings", label: "Greetings", icon: User },
  { value: "business", label: "Business", icon: Briefcase },
  { value: "casual", label: "Casual", icon: MessageSquare },
  { value: "travel", label: "Travel", icon: MapPin },
  { value: "daily", label: "Daily", icon: Coffee },
];

export const CategorySelector = ({
  selected,
  onSelect,
  className,
  ...props
}: CategorySelectorProps) => {
  return (
    <div
      {...props}
      className={cn("flex gap-2 items-center flex-wrap", className)}
    >
      <span className="text-sm font-medium text-muted-foreground">
        Category:
      </span>
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <Badge
              key={category.label}
              variant={selected === category.value ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 flex items-center gap-1",
                selected === category.value && "shadow-md"
              )}
              onClick={() => onSelect(category.value)}
            >
              <Icon className="w-3 h-3" />
              {category.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
