import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ images, imgId, onClick }) => {
  const imageId = images.find((image) => {
    return +image.id === +imgId;
  });
  return (
    <div className={styles.Overlay} onClick={onClick}>
      <div className={styles.Modal}>
        <img src={imageId.largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
