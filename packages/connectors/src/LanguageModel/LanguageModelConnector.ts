import { LLM_HOST, LLM_PORT } from "../Connector.config";

export const getRouteUrl = (route: string): string => {
  return `http://${LLM_HOST}:${LLM_PORT}${route}`;
};

