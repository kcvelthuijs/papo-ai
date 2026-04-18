import { useLessonStore } from '@workspace/controllers/src/Stores/LessonStore';
import { VerbClickLearn } from '@workspace/ui/components/Exercises/VerbClickLearn';
import { VerbTypeTest } from '@workspace/ui/components/Exercises/VerbTypeTest';
import { SentenceTypeTest } from '@workspace/ui/components/Exercises/SentenceTypeTest';
import { type VerbLearnExercise } from '@workspace/webtypes/src/Types/Interfaces/Exercise';

export function ExerciseRenderer() {
  const { currentExercise, submitAnswer, nextExercise } = useLessonStore();

  if (!currentExercise) return null;

  switch (currentExercise.type) {
    case 'verb-click-learn':
      return (
        <VerbClickLearn
          verb={(currentExercise as VerbLearnExercise).verb}
          description={currentExercise.description}
          enabled={true}
          onComplete={() => nextExercise()}
        />
      );

    case 'verb-type-test':
      return (
        <VerbTypeTest
          verb={(currentExercise as VerbLearnExercise).verb}
          onRight={(data) => submitAnswer(data)}
          onWrong={(data) => submitAnswer(data)}
          onComplete={() => nextExercise()}
        />
      );

    case 'sentence-type-test':
      return (
        <SentenceTypeTest
          exercise={currentExercise}
          onRight={(data) => submitAnswer(data)}
          onWrong={(data) => submitAnswer(data)}
          onComplete={() => nextExercise()}
        />
      );

    default:
      return <div>Unknown exercise type</div>;
  }
}
