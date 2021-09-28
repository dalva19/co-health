import { useState } from "react";
import ImageUploading from "react-images-uploading";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const Avatar = ({ setAvatar }) => {
  const [images, setImages] = useState([]);
  const onChange = (imageList) => {
    setImages(imageList);
    setAvatar(imageList);
  };

  return (
    <ImageUploading
      value={images}
      onChange={onChange}
      dataURLKey="data_url"
      maxFileSize={5000000}
      acceptType={["jpg", "jpeg", "gif", "png", "svg"]}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
        errors,
      }) => (
        <StyledAvatarUpload className="upload__image-wrapper">
          <button
            className="image-upload"
            type="button"
            style={isDragging ? { color: "red" } : null}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop to Upload
          </button>
          &nbsp;
          <div className="upload__image-wrapper">
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <Button
                    className="button"
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </Button>

                  <Button
                    className="button"
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            {errors && (
              <div>
                {errors.maxFileSize && <span>Max image file size is 5mb.</span>}
                {errors.acceptType && (
                  <span>Only jpg, jpeg, gif, and png are allowed.</span>
                )}
              </div>
            )}
          </div>
        </StyledAvatarUpload>
      )}
    </ImageUploading>
  );
};

const StyledAvatarUpload = styled.div`
  .image-item {
    display: flex;
    margin: 10px 0;
  }
  .image-item__btn-wrapper {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .button {
      margin-top: 1rem;
      background-color: #ab417f;
      border: none;
    }
  }

  .image-upload {
    height: 15vh;
    width: 50vh;
    font-family: "Inter", sans-serif;
    background: #f1efe9;
    border-radius: 8px;
    border: 1px #000000;
  }

  .image-upload:hover {
    color: green;
    cursor: pointer;
  }
`;

export default Avatar;
