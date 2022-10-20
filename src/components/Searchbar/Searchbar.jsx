import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

// export class SearchBar extends Component {
//   state = {
//     imageQuery: '',
//   };
export const SearchBar = ({ onSubmit }) => {
  const [imageQuery, setImageQuery] = useState('');

  // handleImageChange = event => {
  //   this.setState({ imageQuery: event.currentTarget.value.toLowerCase() });
  // };

  const handleImageChange = event => {
    setImageQuery(event.currentTarget.value.toLowerCase());
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.imageQuery.trim() === '') {
  //     return toast.warning('Please, enter your request!');
  //   }
  //   this.props.onSubmit(this.state.imageQuery);

  //   this.setState({ imageQuery: '' });
  // };

  const handleSubmit = event => {
    event.preventDefault();
    if (imageQuery.trim() === '') {
      return toast.warning('Please, enter your request!');
    }
    onSubmit(imageQuery);

    setImageQuery('');
  };

  // const {
  //   state: { imageQuery },
  //   handleImageChange,
  // } = this;
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          name="imageQuery"
          value={imageQuery}
          onChange={handleImageChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  imageQuery: PropTypes.string,
};
