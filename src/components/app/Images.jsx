import React, { useContext } from "react";
import DisplayImg from "./DisplayImg";
import DeleteImg from "./DeleteImg";
import "../../css/app/images.css";
import { ImagesContext } from "./Gallery";

const Images = () => {
  //Getting images context
  const { images, setImages } = useContext(ImagesContext);

  //We map the images, display them and add a delete button for each one
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
            <p className="image-name">{name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Images;
