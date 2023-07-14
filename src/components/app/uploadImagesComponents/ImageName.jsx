import React from "react";

const ImageName = ({ imgName, setImgName }) => {
  return (
    <input
      className="input"
      type="text"
      value={imgName}
      onChange={(e) => setImgName(e.target.value)}
      placeholder="Image name"
    />
  );
};

export default ImageName;
