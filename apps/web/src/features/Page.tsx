import NavigationBar from "../elements/NavigationBar";
// import VerbLesson from "@/elements/VerbLesson";
import { SentenceClickTest } from "@workspace/ui/components/molecules/SentenceClickTest";

// import { LessonSelect } from "../elements/LessonSelect";
// import { useLessonStore } from "../Stores/LessonStore";
// import { type LessonResponse } from "@workspace/webtypes/src/Types/Interfaces/Lesson";

export default function Page() {
  // const { currentLessonID, lessonDetails, getLessonByID } = useLessonStore();

  return (
    <div className="flex flex-col bg-gray-200 h-screen m-0 p-0">
      <NavigationBar />
      {/* toon overzicht van lessen als de lessonID leeg is}*/}
      {/*{!currentLessonID && <LessonSelect />}
      {/* lessonDetails. */}

      {/*<VerbLesson />*/}
      <SentenceClickTest
        title="Maak een goede zin"
        description="Blablabla"
        sentence={["Tu", "consumas", "practicar", "desporto"]}
      />
    </div>
  );
}
