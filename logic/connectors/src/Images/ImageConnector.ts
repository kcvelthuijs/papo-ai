import axios, { type CancelToken } from 'axios';

import type { ImageProps } from '@workspace/dtotypes';

import { CDN_HOST, CDN_PORT } from '../Config/Connector.config';

const getRouteUrl = (route: string): string => {
  return `http://${CDN_HOST}:${CDN_PORT}${route}`;
};

export const fetchImageBlob = async (
  props: ImageProps,
): Promise<Blob | null> => {
  try {
    const response = await axios.post(getRouteUrl('/api/images'), props, {
      responseType: 'blob',
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getImage = async (
  { name, tree, size }: ImageProps,
  cancelToken?: CancelToken,
) => {
  try {
    const response = await axios.post(
      getRouteUrl('/api/images'),
      { name, tree, size },
      {
        responseType: 'blob',
        cancelToken: cancelToken,
      },
    );
    return URL.createObjectURL(response.data);
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request geannuleerd');
    } else {
      console.error(`Request error: ${err}`);
    }
    return null;
  }
};

export default getImage;
