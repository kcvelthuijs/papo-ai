import { useLessonStore } from '@workspace/controllers';
import type {
  ExerciseExitReason
} from '@workspace/dtotypes';

import { ChatExerciseRenderer } from '../Exercises/CheckChatExercise/Renderer/ChatExerciseRenderer';

import { CheckVerbRenderer } from '../Exercises/CheckVerbExercise/Renderer/CheckVerbRenderer';
import { CheckClozeRenderer } from '../Exercises/CheckClozeExercise/Renderers/CheckClozeRenderer';
import { CheckCardRenderer } from '../Exercises/CheckCardExercise/Renderers/CheckCardRenderer';
import type { SpeechOptions } from '@workspace/dtotypes';
import { LessonResults } from '../Components/Dialogs/LessonResults';

// import { PhraseBuildRenderer } from './renderers/PhraseBuildRenderer';
// import { OpenExerciseRenderer } from './renderers/OpenExerciseRenderer';

type Props = {
  exercise: any;
};

export function ExerciseRenderer({ exercise }: Props) {
  const submitAnswer = useLessonStore((s) => s.submitAnswer);
  const handleSubmit = async (answer: any): Promise<any> => {
    return await submitAnswer(answer);
  };

  const completeExercise = useLessonStore((s) => s.completeExercise);
  const handleComplete = async (reason: ExerciseExitReason): Promise<void> => {
    await completeExercise(reason);
  };

  const submitAudio = useLessonStore((s) => s.submitAudio);
  const handleAudio = async (
    text: string,
    options?: SpeechOptions,
    callback?: () => void
  ): Promise<void> => {
    await submitAudio(text, options, callback);
  };
  const isComplete = useLessonStore((state) => state.isComplete);

  if (isComplete) {
    return <LessonResults />;
  } else {
    switch (exercise.type) {
      // -------------------------
      // VERB
      // -------------------------
      case 'verb-click-learn':
      case 'verb-click-test':
      case 'verb-type-test':
        return (
          <CheckVerbRenderer
            exercise={exercise}
            onSubmit={handleSubmit}
            onComplete={handleComplete}
            handleAudio={handleAudio}
          />
        );

      // -------------------------
      // CLOZE
      // -------------------------
      case 'cloze-click-test':
      case 'cloze-type-test':
        return (
          <CheckClozeRenderer
            exercise={exercise}
            onSubmit={handleSubmit}
            onComplete={handleComplete}
            handleAudio={handleAudio}
          />
        );

      // -------------------------
      // Cards
      // -------------------------
      case 'card-type-test':
      case 'card-click-learn':
        return (
          <CheckCardRenderer
            exercise={exercise}
            onSubmit={handleSubmit}
            onComplete={handleComplete}
            handleAudio={handleAudio}
          />
        );

      /*
      // -------------------------
      // BUILD
      // -------------------------
      case 'Phrase-build-test':
        return (
          <PhraseBuildRenderer exercise={exercise} onSubmit={handleSubmit} />
        );
      */

      // -------------------------
      // OPEN (LLM)
      // -------------------------
      case 'open-dialog':
        return (
          <ChatExerciseRenderer
            exercise={exercise}
            onSubmit={handleSubmit}
            onComplete={handleComplete}
            handleAudio={handleAudio}
          />
        );

      default:
        return <div>Unknown exercise type</div>;
    }
  }
}
