import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import css from './Moda.module.css';

export const Modal = ({ src, closeModal }) => {
  const [loaded, setLoaded] = useState(false);
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
  const loadHandler = () => {
    setLoaded(true);
  };
  return (
    <div className={css.Overlay} onClick={closeByBackdrop}>
      <div className={css.Modal}>
        {loaded ? (
          <img
            src={src.src}
            onLoad={loadHandler}
            alt=""
            // style={{ display: loaded ? 'block' : 'none' }}
            className={css.loadedBloc}
          />
        ) : (
          <img
            src={src.src}
            onLoad={loadHandler}
            alt=""
            className={css.loadedBloc}
          />
        )}
        {!loaded && <Loader />}
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  src: PropTypes.object.isRequired,
};
