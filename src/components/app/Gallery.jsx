import React from "react";
import UploadImages from "./UploadImages";
import Images from "./Images";
import "../../css/app/gallery.css";
const Gallery = () => {
  return (
    <div className="app-container">
      <UploadImages />
      <Images />
    </div>
  );
};

export default Gallery;
