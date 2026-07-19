import axios from 'axios';

import { API_HOST, API_PORT } from '../Config/Connector.config';
import type { ExerciseData } from '@workspace/dtotypes';

const getRouteUrl = (route: string): string => {
  return `http://${API_HOST}:${API_PORT}${route}`;
};

export const getAllExercises = async (): Promise<
  ExerciseData[] | undefined
> => {
  try {
    const response = await axios.get(getRouteUrl('/api/exercises'));
    return response.data.exercises;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request geannuleerd');
    } else {
      console.error(`Request error: ${err}`);
    }
    return undefined;
  }
};

export const getExercisesByLessonID = async (
  lessonID: number,
): Promise<ExerciseData[] | undefined> => {
  try {
    const response = await axios.post(getRouteUrl('/api/exercisebylesson'), {
      id: lessonID,
    });
    return response.data.exercises;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request geannuleerd');
    } else {
      console.error(`Request error: ${err}`);
    }
    return undefined;
  }
};
