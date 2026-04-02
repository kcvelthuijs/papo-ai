import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { type ImageComponentProps } from "@workspace/webtypes/src/Types/Interfaces/Images";

function ImageComponent({ name, tree, size }: ImageComponentProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    const fetchImage = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3026/api/images",
          { name, tree, size },
          {
            responseType: "blob", // belangrijk!
            cancelToken: cancelToken.token,
          },
        );

        // Blob omzetten naar een URL die <img> kan gebruiken
        const url = URL.createObjectURL(response.data);
        setImgSrc(url);
        console.log("url", url);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request geannuleerd");
        } else {
          console.error(err);
        }
      }
    };
    fetchImage();

    // Cleanup: URL vrijgeven en request annuleren bij unmount
    return () => {
      cancelToken.cancel();
      if (imgSrc) URL.revokeObjectURL(imgSrc);
    };
  }, [name, tree.join("/"), size]);

  return (
    <div>
      {imgSrc ? <img src={imgSrc || ""} alt={name} /> : <p>Loading image...</p>}
    </div>
  );
}

export default ImageComponent;
