import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {images.map(({ id, largeImageURL, webformatURL }) => (
          <ImageGalleryItem
            key={id}
            largeImageURL={largeImageURL}
            webformatURL={webformatURL}
            openModal={openModal}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
