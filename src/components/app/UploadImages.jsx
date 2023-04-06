import React, { useState } from "react";
import "../../css/app/upload-images.css";

const UploadImages = () => {
  const [imgName, setImgName] = useState("");
  const [image, setImage] = useState(null);

  function handleChoseImg(e) {
    const file = e.target.files[0];
    setImage(file);
  }

  function handleUploadImage() {
    //Funcion para subir la imagen a Firebase
    console.log(imgName);
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
