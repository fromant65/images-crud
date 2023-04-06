import React, { useContext, useEffect, useState } from "react";
import { db, storage } from "../../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import { UserContext } from "../../App";
import DisplayImg from "./DisplayImg";
import "../../css/app/images.css";

const Images = () => {
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
    const images = () => getImages();
    return images;
  }, []);

  return (
    <div className="gallery-container">
      {images.map((image) => {
        const name = image.name;
        const user = image.user;
        const date = image.date;
        const imageName = `${name}|${user}|${date}`;
        return (
          <div key={imageName} className="gallery-item-container">
            <div className="image-container">
              <DisplayImg imageName={imageName} />
            </div>
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Images;
