import React, { useState } from "react";
import { db, auth, storage } from "../../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, doc } from "firebase/firestore";
import "../../css/app/upload-images.css";
const UploadImages = () => {
  const [imgName, setImgName] = useState("");
  const [image, setImage] = useState(null);

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
      console.log("image uploaded");
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
