import React, { useContext, useEffect, useState } from "react";
import DisplayImg from "./DisplayImg";
import DeleteImg from "./DeleteImg";
import "../../css/app/images.css";
import { ImagesContext } from "./Gallery";

const Images = () => {
  const { images, setImages } = useContext(ImagesContext);

  return (
    <div className="gallery-container">
      {images.map((image) => {
        const name = image.name;
        const user = image.user;
        const date = image.date;
        const id = image.id;
        const imageName = `${name}|${user}|${date}`;
        return (
          <div key={id} className="gallery-item-container">
            <div className="image-container">
              <DisplayImg imageName={imageName} />
              <DeleteImg
                imageName={imageName}
                setImages={setImages}
                images={images}
                imgId={id}
              />
            </div>
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Images;
