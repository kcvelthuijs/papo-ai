import axios, { type CancelToken } from "axios";

import type { ImageProps } from "@workspace/dtotypes/src/Interfaces/image";
import { CDN_HOST, CDN_PORT } from "../Connector.config";

const getRouteUrl = (route: string): string => {
  return `http://${CDN_HOST}:${CDN_PORT}${route}`;
};

export const getImage = async (
  { name, tree, size }: ImageProps,
  cancelToken?: CancelToken
) => {
  try {
    const response = await axios.post(
      getRouteUrl("/api/images"),
      { name, tree, size },
      {
        responseType: "blob",
        cancelToken: cancelToken
      }
    );
    return URL.createObjectURL(response.data);
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Request geannuleerd");
    } else {
      console.error(`Request error: ${err}`);
    }
    return null;
  }
};

export default getImage;
