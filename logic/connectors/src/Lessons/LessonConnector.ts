import axios from "axios";

import { API_HOST, API_PORT } from "../Connector.config";
import type { LessonSummary } from "@workspace/dtotypes/src/Interfaces/lesson";

const getRouteUrl = (route: string): string => {
  return `http://${API_HOST}:${API_PORT}${route}`;
};

export const getAllLessons = async (): Promise<LessonSummary[] | undefined> => {
  try {
    const response = await axios.get(getRouteUrl("/api/lessons"));
    const lessons: LessonSummary[] = response.data.lessons;
    return lessons;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Request geannuleerd");
    } else {
      console.error(`Request error: ${err}`);
    }
    return undefined;
  }
};

export const getLessonByID = async (
  lessonID: string
): Promise<LessonSummary | undefined> => {
  try {
    const response = await axios.post(getRouteUrl("/api/lessons"), {
      id: lessonID
    });
    const lesson: LessonSummary = response.data;
    return lesson;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Request geannuleerd");
    } else {
      console.error(`Request error: ${err}`);
    }
    return undefined;
  }
};

export default getAllLessons;
