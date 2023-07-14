import React from "react";

const FileInput = ({ image, setImage }) => {
  //Handling the file input; we chose the first file selected
  function handleChoseImg(e) {
    const file = e.target.files[0];
    setImage(file);
  }
  return (
    <div className="input-wrapper">
      <input type="file" id="file-input" onChange={handleChoseImg} />
      <label htmlFor="file-input" className="archivo">
        {image?.name ? image.name : <b>Browse image...</b>}
      </label>
    </div>
  );
};

export default FileInput;
