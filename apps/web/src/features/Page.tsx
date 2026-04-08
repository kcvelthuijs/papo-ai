// import LessonSelect from "@/Elements/LessonSelect";
import NavigationBar from "../Elements/NavigationBar";
// import VerbLesson from "@/elements/VerbLesson";
import { SentenceClickTest } from "@workspace/ui/components/molecules/SentenceClickTest";

import { LessonSelect } from "../Elements/LessonSelect";
import { useLessonStore } from "../Stores/LessonStore";
// import { type LessonResponse } from "@workspace/webtypes/src/Types/Interfaces/Lesson";

export default function Page() {
  const { currentLessonID, lessonDetails, getLessonByID } = useLessonStore();

  return (
    <div className="flex flex-col bg-gray-200 h-screen m-0 p-0">
      <NavigationBar />
      <div className="xl:flex xl:justify-center bg-gray-300 shadow-lg">
        <div className="h-[calc(100vh-5rem)] xl:border-r xl:border-l xl:border-gray-400 bg-white  sm:w-full xl:w-300">
          {/* toon overzicht van lessen als de lessonID leeg is}*/}
          {!currentLessonID && <LessonSelect />}
          {/* lessonDetails. */}

          {/*<VerbLesson />*/}
          {/*<SentenceClickTest
        title="Maak een goede zin"
        description="Blablabla"
        sentence={["Tu", "consumas", "practicar", "desporto"]}
      />*/}
        </div>
      </div>
    </div>
  );
}
