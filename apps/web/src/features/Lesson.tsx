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
        console.log("Lesson data:", data);
      } catch (err) {
        console.error("Error fetching lesson:", err);
      }
    };
    fetchLesson();
  }, []);

  return (
    <div>
      <p>Lesson ID: {id}</p>
      <p> Lesson Title: {lesson?.title}</p>
      <ImageComponent
        name={lesson?.image ?? ""}
        tree={["lessons", "title"]}
        size="full"
        className="w-400"
      />
    </div>
  );
};

export default Lesson;
