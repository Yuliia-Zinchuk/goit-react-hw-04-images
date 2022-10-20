import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Moda.module.css';
export const Modal = ({ src, closeModal }) => {
  useEffect(() => {
    const closeByEscape = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEscape);

    return () => {
      window.removeEventListener('keydown', closeByEscape);
    };
  }, [closeModal]);

  const closeByBackdrop = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={closeByBackdrop}>
      <div className={css.Modal}>
        <img src={src.src} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  src: PropTypes.object.isRequired,
};
