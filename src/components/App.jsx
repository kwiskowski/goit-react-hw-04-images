import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './SearchBar/SearchBar';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { imagesFetch } from './ImageFetch/ImageFetch';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [totalPics, setTotalPics] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await imagesFetch(query, page);
        setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
        setTotalPics(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    if (newQuery === query) {
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(null);
    setIsLastPage(false);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        paddingBottom: '24px',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <ToastContainer transition={Flip} />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <p>Error: {error}</p>}

      <ImageGallery images={images} onItemClick={handleImageClick} />

      {isLoading && <Loader />}

      {!isLoading && images.length > 0 && !isLastPage && (
        <Button onClick={handleLoadMore} />
      )}

      {showModal && <Modal image={selectedImage} onClose={handleModalClose} />}
    </div>
  );
};
