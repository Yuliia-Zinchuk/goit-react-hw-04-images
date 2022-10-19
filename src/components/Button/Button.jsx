import PropTypes from 'prop-types';
import css from './Button.module.css';
export const Button = ({ handlerLoadMore }) => {
  return (
    <>
      <button type="Button" className={css.Button} onClick={handlerLoadMore}>
        Load More
      </button>
    </>
  );
};

Button.propTypes = {
  handlerLoadMore: PropTypes.func.isRequired,
};
