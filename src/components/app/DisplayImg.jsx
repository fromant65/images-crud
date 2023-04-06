import React, { useEffect, useState } from "react";
import { storage } from "../../../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";
const DisplayImg = ({ imageName }) => {
  const [imageUrl, setImageUrl] = useState("");

  async function getImageURL() {
    const storageRef = ref(storage, `images/${imageName}`);
    try {
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const imageUrl = () => getImageURL();
    return imageUrl;
  }, [imageName]);

  return <img src={imageUrl} alt={imageName} />;
};

export default DisplayImg;
