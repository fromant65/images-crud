import React, { useEffect, useState } from "react";
import { storage } from "../../../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";
const DisplayImg = ({ imageName }) => {
  //We store each image in some url, so we need it to display the image
  const [imageUrl, setImageUrl] = useState("");

  //Function to get the image URL with Firebase utilities
  async function getImageURL() {
    const storageRef = ref(storage, `images/${imageName}`);
    try {
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
    }
  }

  //Getting image URL
  useEffect(() => {
    getImageURL();
  }, [imageName]);

  return <img src={imageUrl} alt={imageName} />;
};

export default DisplayImg;
