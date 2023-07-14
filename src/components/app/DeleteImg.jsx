import React, { useContext } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db, storage } from "../../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { ImagesContext } from "./Gallery";

const DeleteImg = ({ imageName, imgId }) => {
  //When we delete a image, we need to update the state on react so it's no longer mapped
  const { images, setImages } = useContext(ImagesContext);

  //We handle the image deletion with Firebase utilities and filter it from the images state
  async function handleDeleteImage() {
    const imageRef = ref(storage, `images/${imageName}`);
    const imageDoc = doc(db, "images", imgId);
    const confirmation = confirm(
      "Do you really want to delete this image? This cannot be undone."
    );
    if (!confirmation) return;
    try {
      await deleteObject(imageRef);
      await deleteDoc(imageDoc);
      const newImages = images.filter((image) => {
        return image.id != imgId;
      });
      setImages(newImages);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="delete-img" onClick={handleDeleteImage}>
      <div className="trash.icon">
        <FontAwesomeIcon icon={faTrash} className="trash-icon" />
      </div>
    </div>
  );
};

export default DeleteImg;
