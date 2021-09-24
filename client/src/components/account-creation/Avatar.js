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
      multiple={false}
      value={images}
      onChange={onChange}
      dataURLKey="data_url"
      maxFileSize={5000000}
      acceptType={["jpg", "jpeg", "gif", "png"]}
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
            <br />
            Click or Drop to Upload
          </button>
          &nbsp;
          <div className="upload__image-wrapper">
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
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
  }

  .image-upload {
    height: 15vh;
    min-width: 98%;
    background: #f1efe9;
    border-radius: 10px;
    border: 2px dashed #000000;
  }

  .image-upload:hover {
    background: #fef3db;
    cursor: pointer;
  }
`;

export default Avatar;
