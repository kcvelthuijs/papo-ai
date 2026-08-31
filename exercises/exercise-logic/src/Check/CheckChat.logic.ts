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
  const role = 'user';
  const prompt = `Vraag: "${message}" Antwoord: "${response}".`;
  const instructions = `Als docent beoordeel je een student die **portugues europeu** wil leren. Je beoordeelt **uitsluitend** zijn antwoord en niet de vraag. 
    Negeer namen van personen en plaatsen. Als een woord mogelijk een persoonsnaam of plaatsnaam is, behandel het altijd als correct. Probeer een naam nooit te corrigeren of te beoordelen.
    Je let alleen op correcte spelling. Je vermeldt **alleen** woorden die fouten bevatten. Je geeft feedback en een grade 1 tot 10 in hele cijfers.
    Je antwoordt in een json structuur met als template: 
    {'feedback': [{ 'woord': <de fout>, correct: <hier staat de correctie>, 'error': <omschrijving van de fout>}, ... ], {'grade': <hier staat de grade> }
    Bij een grade van 10 is de uitvoer **altijd** { 'feedback':[], 'grade':10 }.`;

  const resp = await getResponse(role, prompt, instructions);

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
