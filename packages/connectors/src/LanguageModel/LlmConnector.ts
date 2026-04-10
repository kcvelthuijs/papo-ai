import axios from "axios";

import { LLM_HOST, LLM_PORT } from "../Connector.config";

const getRouteUrl = (route: string): string => {
  return `http://${LLM_HOST}:${LLM_PORT}${route}`;
};

