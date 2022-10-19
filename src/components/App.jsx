import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mapper } from 'utils/mapper';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImagesWithQuery } from '../services/api';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    images: [],
    currentImage: null,
    page: 1,
    loading: false,
    total: 0,
    perPage: 12,
  };

  componentDidUpdate(_, prevState) {
    const {
      state: { query, page },
      fetchImages,
    } = this;
    if (prevState.query !== query || prevState.page !== page) {
      fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
    });
  };

  updateCurrentImage = data => {
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ loading: true });

    fetchImagesWithQuery(query, page)
      .then(response =>
        this.setState(prevState => ({
          images: [...prevState.images, ...mapper(response.data.hits)],
          total: response.data.total,
        }))
      )
      .catch(error => {
        toast.error(`${error}`);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const {
      state: { loading, query, images, currentImage, total, page, perPage },
      handleFormSubmit,
      updateCurrentImage,
      closeModal,
      loadMore,
    } = this;
    return (
      <>
        <SearchBar onSubmit={handleFormSubmit} />
        {loading && <Loader />}
        {query && (
          <ImageGallery openModal={updateCurrentImage} images={images} />
        )}
        {currentImage && <Modal src={currentImage} closeModal={closeModal} />}

        {Math.ceil(total / page) > perPage && (
          <Button handlerLoadMore={loadMore} />
        )}
        <ToastContainer
          autoClose={3000}
          position="top-center"
          hideProgressBar={false}
        />
      </>
    );
  }
}
