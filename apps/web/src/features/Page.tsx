import NavigationBar from "@/Elements/NavigationBar";
import { LessonSelect } from "../Elements/LessonSelect";
import { useLessonStore } from "@/Stores/LessonStore";
import { useState } from "react";
import { type LessonResponse } from "@workspace/webtypes/src/Types/Interfaces/Lesson";

export default function Page() {
  const { currentLessonID, lessonDetails, getLessonByID } = useLessonStore();

  return (
    <div className="flex flex-col bg-gray-200 h-screen m-0 p-0">
      <NavigationBar />
      {/* toon overzicht van lessen als de lessonID leeg is}*/}
      {!currentLessonID && <LessonSelect />}

      {/* lessonDetails. */}
    </div>
  );
}
