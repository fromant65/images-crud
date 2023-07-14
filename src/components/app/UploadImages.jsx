import React, { useContext, useState } from "react";
import { db, auth, storage } from "../../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import "../../css/app/upload-images.css";
import { ImagesContext } from "./Gallery";
import { UserContext } from "../../App";
import ImageName from "./uploadImagesComponents/ImageName";
import FileInput from "./uploadImagesComponents/FileInput";

const UploadImages = () => {
  const [imgName, setImgName] = useState("");
  const [image, setImage] = useState(null);
  const { setImages } = useContext(ImagesContext);
  const { currentUser } = useContext(UserContext);
  const imagesRef = collection(db, "images");

  //We generate a unique name based on the name of the file, the username and the current date
  function generateFileName(name) {
    const date = new Date().toISOString();
    return `${name}|${auth.currentUser.email}|${date}`;
  }

  //Submiting a reference for the image to the database
  async function submitImageToDB(newFileName) {
    const nameParts = newFileName.split("|");
    try {
      await addDoc(imagesRef, {
        name: nameParts[0],
        user: nameParts[1],
        date: nameParts[2],
      });
      setImgName("");
      setImage(null);
    } catch (err) {
      console.error(err);
    }
  }

  // We generate a file name, open the folder on firebase storage and submit it:
  // First, we submit it to the DB and then to the storage
  async function handleUploadImage() {
    if (!image || !imgName) return;
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

  //After uploading an image, we update the images state and show it with the rest
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
      <ImageName imgName={imgName} setImgName={setImgName} />
      <FileInput image={image} setImage={setImage} />
      <button
        type="submit"
        onClick={handleUploadImage}
        className="submit-image"
      >
        Upload image
      </button>
    </div>
  );
};

export default UploadImages;
