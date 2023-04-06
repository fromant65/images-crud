import React, { useContext } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db, storage } from "../../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject, getDownloadURL } from "firebase/storage";
import { ImagesContext } from "./Gallery";

const DeleteImg = ({ imageName, imgId }) => {
  const { images, setImages } = useContext(ImagesContext);
  async function handleDeleteImage() {
    const imageRef = ref(storage, `images/${imageName}`);
    const imageDoc = doc(db, "images", imgId);
    try {
      await deleteObject(imageRef);
      await deleteDoc(imageDoc);
      const newImages = images.filter((image) => {
        console.log(image.id, imgId, image.id === imgId);
        return image.id != imgId;
      });
      console.log(newImages);
      setImages(newImages);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="delete-img" onClick={handleDeleteImage}>
      <div className="trash.icon">
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
};

export default DeleteImg;
