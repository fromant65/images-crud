import React, { useContext, useEffect, useState } from "react";
import UploadImages from "./UploadImages";
import Images from "./Images";
import "../../css/app/gallery.css";
import { db } from "../../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserContext } from "../../App";
export const ImagesContext = React.createContext();

const Gallery = () => {
  const [images, setImages] = useState([]);
  const { currentUser } = useContext(UserContext);
  async function getImages() {
    const imgCollectionRef = collection(db, "images");
    const newQuery = query(imgCollectionRef, where("user", "==", currentUser));
    try {
      const docs = await getDocs(newQuery);
      const data = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setImages(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <ImagesContext.Provider value={{ images, setImages }}>
      <div className="app-container">
        <UploadImages />
        <Images />
      </div>
    </ImagesContext.Provider>
  );
};

export default Gallery;
