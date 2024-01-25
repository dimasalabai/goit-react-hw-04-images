import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ items, showModal }) => {
  return items.map(({ webformatURL, id, tags, largeImageURL }) => {
    return (
      <li
        className={styles.imageGalleryItem}
        key={id}
        onClick={() => showModal({ largeImageURL })}
      >
        <img
          src={webformatURL}
          alt={tags}
          className={styles.imageGalleryItemImage}
        />
      </li>
    );
  });
};

export default ImageGalleryItem;
