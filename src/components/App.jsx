import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './SearchBar/SearchBar';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  // state = {
  //   images: [],
  //   isLoading: false,
  //   error: null,
  //   query: '',
  //   page: 1,
  //   showModal: false,
  //   selectedImage: null,
  //   isLastPage: false,
  // };

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  // componentDidUpdate(_prevProps, prevState) {
  //   if (prevState.query !== this.state.query) {
  //     this.setState({ images: [], page: 1, isLastPage: false }, () => {
  //       this.fetchImages();
  //     });
  //   }
  // }

  const fetchImages = () => {
    // const { query, page } = this.state;
    const API_KEY = '39429562-362aa611c83bf0adbf53209b3';

    setIsLoading(true);

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        const { hits, totalHits } = response.data;

        if (hits.length === 0) {
          return toast('Sorry, there are no images matching your request...', {
            position: toast.POSITION.TOP_CENTER,
            icon: '🤔',
          });
        }

        const modifiedHits = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...modifiedHits],
          page: prevState.page + 1,
          isLastPage:
            prevState.images.length + modifiedHits.length >= totalHits,
        }));
      })

      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  const handleSearchSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({
      query: query,
      page: 1,
      images: [],
      error: null,
      isLastPage: false,
    });
  };

  const handleImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    this.setState({ selectedImage: null, showModal: false });
    document.body.style.overflow = 'auto';
  };

  // render() {
  //   const { images, isLoading, error, showModal, selectedImage, isLastPage } =
  //     this.state;

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
        <Button onClick={fetchImages} />
      )}

      {showModal && <Modal image={selectedImage} onClose={handleModalClose} />}
    </div>
  );
};
