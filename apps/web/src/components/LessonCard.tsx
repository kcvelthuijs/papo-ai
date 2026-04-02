import { Badge } from "@workspace/ui/components/shadcn/badge";
import { Button } from "@workspace/ui/components/shadcn/button";
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/shadcn/card";
import { Skeleton } from "@workspace/ui/components/shadcn/skeleton";

import { type LessonCardProps } from "@workspace/webtypes/src/Types/Props/LessonCardProps";
import ImageComponent from "./ImageComponent";

const classesByType: { [type: string]: string } = {
  diálogo: "bg-blue-600 border-blue-900 text-white font-semibold",
  notícias: "bg-red-700 border-red-900 text-white font-semibold",
  previsão: "bg-red-700 border-red-900 text-white font-semibold",
};

export const LessonCardSkeleton = () => {
  return (
    <Card className="relative overflow-hidden mx-auto w-full max-w-sm pt-0 pb-3 bg-gray-100 border-gray-300">
      <Skeleton className="w-95 h-53 animate-pulse bg-gray-200 " />
      <CardHeader className="px-2 m-0">
        <CardAction>
          <Skeleton className="w-16 h-9 animate-pulse bg-gray-200 [animation-delay:0.2s]" />
        </CardAction>
        <CardTitle className="text-lg pt-1">
          <Skeleton className="w-70 h-8 animate-pulse bg-gray-200 [animation-delay:0.4s]" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export const LessonCard = ({ lesson, onSelectLesson }: LessonCardProps) => {
  return (
    <Card
      id={lesson.id}
      className="relative overflow-hidden mx-auto w-full max-w-sm pt-0 pb-3 bg-gray-100 border-gray-500"
    >
      {lesson.type && (
        <Badge
          variant="destructive"
          className={`z-30 absolute flex self-end m-2 py-1 px-2 border ${classesByType[lesson.type] || "bg-gray-300 border-gray-500"}`}
        >
          {lesson.type}
        </Badge>
      )}

      <ImageComponent
        name={lesson.image}
        tree={["lessons", "title"]}
        size="full"
      />

      <CardHeader className="px-2 m-0">
        <CardAction>
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={(e: any) => {
              e.stopPropagation();
              onSelectLesson(lesson.id);
            }}
          >
            Start
          </Button>
        </CardAction>
        <CardTitle className="text-lg pt-1">{lesson.title}</CardTitle>
      </CardHeader>
    </Card>
  );
};
