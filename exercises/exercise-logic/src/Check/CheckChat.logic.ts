import type {
  ChatExercise,
  ChatExerciseFeedback,
  ChatAnswer,
  ExerciseAction,
  ExerciseScore,
  TeacherFeedback,
} from '@workspace/dtotypes';

import {
  areAllPhraseStatesCompleted,
  createProgress,
  updatePhraseStates,
} from '../Helper/UpdatePhraseStates';
import { getResponse } from '@workspace/connectors';

async function getTeacherFeedback(
  message: string,
  response: string,
): Promise<TeacherFeedback> {
  const role = 'assistant';
  const prompt = `Op de vraag "${message}" antwoordt de student "${response}".`;
  const instructions = `Als docent begeleidt je een student die **portugues europeu** wil leren. 
      Je beoordeelt **uitsluitend** het antwoord en niet de vraag. Je let op correcte spelling in portuguse europeu. 
      Geef alleen feedback op fouten. Gebruik maximaal 50 tokens voor een compleet antwoord. Vermijd overbodige correcties. 
      Geef feedback en een grade 1 tot 10 in hele cijfers.
      Antwoord in de json structuur
      {'feedback': [{ 'text': <hier staat de foute tekst: Ola>, 'correct': <hier staat de correctie>, 'error': <vermelding wat er fout is>}, ... ], {'grade': <hier staat de grade>}`;

  const resp = await getResponse(
    role,
    prompt,
    instructions,
    'resp_0bf530ddd1966954006a8dd9a328ec819482efbd40e53ad920',
  );

  if (!resp) return { remarks: [], grade: 0 };
  else {
    const data = JSON.parse(resp?.message);
    return {
      remarks: data.feedback,
      grade: data.grade,
    };
  }
}

export async function checkDialog(
  exercise: ChatExercise,
  sceneId: number,
  answer: ChatAnswer,
): Promise<ChatExerciseFeedback> {
  const getScore = (grade: number): ExerciseScore => {
    if (grade > 7.0) return 'right';
    if (grade > 5.0) return 'partial';
    return 'wrong';
  };
  // bijwerken van de status van de frasen
  const updatedStates = updatePhraseStates(
    answer.response,
    answer.phrases,
    answer.states,
  );
  const progress = { phrases: answer.phrases, states: updatedStates };

  // vraag om feedback van de docent
  const feedback = await getTeacherFeedback(answer.message, answer.response);

  // Bepaal het vervolg
  const completed = areAllPhraseStatesCompleted(updatedStates);
  let nextAction: ExerciseAction = 'continue';
  let nextProgress = progress;
  if (completed) {
    const nextSceneId = sceneId + 1;
    if (nextSceneId < exercise.scenes.length) {
      nextAction = 'next step';
      nextProgress = createProgress(exercise.scenes[nextSceneId]);
    } else {
      nextAction = 'next exercise';
    }
  }
  return {
    lessonId: exercise.lessonId,
    seqNumber: exercise.seqNumber,
    question: sceneId,
    message: answer.message,
    response: answer.response,
    feedback: feedback,
    score: getScore(feedback.grade),
    nextAction,
    progress: nextProgress,
  };
}
