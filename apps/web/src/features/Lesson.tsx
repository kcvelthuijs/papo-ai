import { useEffect, useState } from "react";
import axios from "axios";

import ImageComponent from "@/Components/ImageComponent";
import { type LessonResponse } from "@workspace/webtypes/src/Types/Interfaces/Lesson";

type LessonProps = {
  id: string;
};

const Lesson = ({ id }: LessonProps) => {
  const [lesson, setLesson] = useState<LessonResponse | undefined>(undefined);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data } = await axios.post("/api/lesson", { id: id });
        setLesson(data);
      } catch (err) {
        console.error("Error fetching lesson:", err);
      }
    };
    fetchLesson();
  }, []);

  return (
    <div className="mx-3">
      <p>Lesson ID: {id}</p>
      <ImageComponent
        name={lesson?.image ?? ""}
        tree={["lessons", "title"]}
        size="full"
        className="flex flex-col w-full"
      />
      <p className="text-2xl py-3 font-bold underline">{lesson?.title}</p>
      <p className="text-lg">{lesson?.description}</p>
    </div>
  );
};

export default Lesson;
