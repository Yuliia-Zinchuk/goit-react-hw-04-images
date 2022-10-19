import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Moda.module.css';
export class Modal extends Component {
  closeByEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  closeByBackdrop = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEscape);
  }

  render() {
    const { src } = this.props;

    return (
      <div className={css.Overlay} onClick={this.closeByBackdrop}>
        <div className={css.Modal}>
          <img src={src.src} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  // src: PropTypes..isRequired,
};
