import React, { useContext, useState } from "react";
import { db, auth, storage } from "../../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import "../../css/app/upload-images.css";
import { ImagesContext } from "./Gallery";
import { UserContext } from "../../App";

const UploadImages = () => {
  const [imgName, setImgName] = useState("");
  const [image, setImage] = useState(null);
  const { setImages } = useContext(ImagesContext);
  const { currentUser } = useContext(UserContext);
  const moviesCollectionRef = collection(db, "images");

  function handleChoseImg(e) {
    const file = e.target.files[0];
    setImage(file);
  }

  function generateFileName(name) {
    const date = new Date().toISOString();
    return `${name}|${auth.currentUser.email}|${date}`;
  }

  async function submitImageToDB(newFileName) {
    const nameParts = newFileName.split("|");
    try {
      await addDoc(moviesCollectionRef, {
        name: nameParts[0],
        user: nameParts[1],
        date: nameParts[2],
      });
      setImgName("");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUploadImage() {
    if (!image) return;
    const newFileName = generateFileName(imgName);
    const filesFolderRef = ref(storage, `images/${newFileName}`);
    try {
      await submitImageToDB(newFileName);
      await uploadBytes(filesFolderRef, image);
      getImages();
    } catch (err) {
      console.error(err);
    }
  }

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

  return (
    <div className="upload-img-form">
      <input
        className="input"
        type="text"
        value={imgName}
        onChange={(e) => setImgName(e.target.value)}
        placeholder="Image name"
      />
      <div className="input-wrapper">
        <input type="file" id="file-input" onChange={handleChoseImg} />
        <label htmlFor="file-input" className="archivo">
          <b>Browsed image:</b> {image && image.name}
        </label>
      </div>
      <button type="submit" onClick={handleUploadImage}>
        Upload image
      </button>
    </div>
  );
};

export default UploadImages;
