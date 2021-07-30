import React from "react";
import styles from "./Modal.module.css";

class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", this.onEsc);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEsc);
  }

  onEsc = (e) => {
    if (e.code === "Escape") {
      e.preventDefault();
      this.props.closeModal();
    }
  };

  render() {
    const { imageUrl, closeModal } = this.props;

    return (
      <div className={styles.Overlay} onClick={closeModal}>
        <div className={styles.Modal}>
          <img className={styles.ModalImage} src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
