import axios from 'axios';
import type {
  ImageProps,
  ImageSize,
} from '@workspace/dtotypes/src/Interfaces/images';

export const getImage = async ({ name, tree, size }: ImageProps) => {
  let cancelToken = axios.CancelToken.source();
  try {
    const response = await axios.post(
      'http://localhost:3026/api/images',
      { name, tree, size },
      {
        responseType: 'blob',
        cancelToken: cancelToken.token,
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
