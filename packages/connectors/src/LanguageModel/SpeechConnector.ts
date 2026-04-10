import axios from "axios";

import { LLM_HOST, LLM_PORT } from "../Connector.config";
import { type SpeechOptions } from "@workspace/webtypes/src/Types/Interfaces/Speech";
import { type AudioTask } from "@workspace/webtypes/src/Types/Interfaces/Audio";

const getRouteUrl = (route: string): string => {
  return `http://${LLM_HOST}:${LLM_PORT}${route}`;
};

export const getSpeechAudio = async (
  text: string,
  options?: SpeechOptions
): Promise<any> => {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const voice = (options?.voice ?? "coral").toLocaleLowerCase();
  const instructions =
    options?.instructions ?? "Speak in a friendly, calm teachin tone.";
  const speed = options?.speed ?? 1.0;

  const response = await axios.post(
    getRouteUrl("/llm/tts"),
    {
      text,
      voice,
      instructions,
      speed
    },
    {
      responseType: "blob"
    }
  );
  const blob = response.data as Blob;

  const task: AudioTask = {
    id: crypto.randomUUID(),
    text: trimmed,
    blob,
    voice
  };

  return task;
};
