/// <reference types="vite/client" />//
import axios from "axios";

import type { LessonSummary } from "@workspace/dtotypes/src/Interfaces/lesson";

export const getAllLessons = async (): Promise<LessonSummary[] | undefined> => {
  let cancelToken = axios.CancelToken.source();
  const apiHost = import.meta.env.VITE_APIHOST;
  const apiPort = import.meta.env.VITE_APIPORT;

  console.log("Host", apiHost);
  console.log("Port", apiPort);

  try {
    const response = await axios.get("http://localhost:3000/api/lessons");
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
    const response = await axios.post("http://localhost:3000/api/lessons", {
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
