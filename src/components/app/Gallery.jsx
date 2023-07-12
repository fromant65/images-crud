import React, { useContext, useEffect, useState } from "react";
import UploadImages from "./UploadImages";
import Images from "./Images";
import "../../css/app/gallery.css";
import { db } from "../../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserContext } from "../../App";

//Creating a context to pass the images to different components
export const ImagesContext = React.createContext();

const Gallery = () => {
  //State for the images stored in the gallery. Before retrieving them, it's empty
  const [images, setImages] = useState([]);
  const { currentUser } = useContext(UserContext);

  //Getting images from storage with firebase utilities for a specific user
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

  //We get the images when rendering the page
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
