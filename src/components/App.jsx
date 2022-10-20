import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mapper } from 'utils/mapper';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImagesWithQuery } from '../services/api';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(12);

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);
    fetchImagesWithQuery(query, page)
      .then(imagesData => {
        setImages(prevImages => [
          ...prevImages,
          ...mapper(imagesData.data.hits),
        ]);
        setTotal(imagesData.data.total);
      })
      .catch(error => {
        toast.error(`${error}`);
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setPerPage(12);
  };

  const openModal = data => {
    setCurrentImage(data);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      {loading && <Loader />}
      {query && <ImageGallery openModal={openModal} images={images} />}
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
};
