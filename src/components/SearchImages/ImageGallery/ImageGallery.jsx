import styles from './image-gallery.module.css';

const ImageGallery = ({ children }) => {
  return (
    <>
      <ul className={styles.imageGallery}>{children}</ul>
    </>
  );
};

export default ImageGallery;
