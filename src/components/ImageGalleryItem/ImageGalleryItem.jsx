import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({
  id,
  largeImageURL,
  webformatURL,
  openModal,
}) => {
  return (
    <>
      <li
        className={css.ImageGalleryItem}
        key={id}
        onClick={() => {
          openModal({ src: largeImageURL });
        }}
      >
        <img className={css.ImageGalleryItem_image} src={webformatURL} alt="" />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
