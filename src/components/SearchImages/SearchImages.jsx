import { useEffect, useState } from 'react';

import styles from './search-images.module.css';

import { getSearchPhotos } from 'api/photos';

import { Loader } from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem/ImageGalleryItem';

const SearchImages = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [fullImage, setFullImage] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const {
          data: { hits },
        } = await getSearchPhotos(search, page);

        setImages(prevImages =>
          hits?.length ? [...prevImages, ...hits] : prevImages
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchImages();
    }
  }, [search, page]);

  // якщо пустий масив, то це аналогічно, що запустити componentDidMount()

  const handleSearch = ({ search }) => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => setPage(prevPage => prevPage + 1);

  const showModal = ({ largeImageURL }) => {
    setModalOpen(true);
    setFullImage({
      largeImageURL,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setFullImage({});
  };

  const isImages = Boolean(images.length);
  return (
    <>
      <div className={styles.wrapper}>
        <SearchBar onSubmit={handleSearch} />

        {error && <p className={styles.error}>{error}</p>}

        {isImages && (
          <ImageGallery>
            <ImageGalleryItem showModal={showModal} items={images} />
          </ImageGallery>
        )}
        {loading && <Loader />}
        {isImages && (
          <div className={styles.blockWrapper}>
            <Button type="button" onClick={loadMore}>
              Load more
            </Button>
          </div>
        )}
      </div>
      {modalOpen && (
        <Modal close={closeModal}>
          <img src={fullImage.largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
};

/*
class SearchImages extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    fullImage: {},
  };

  // async componentDidMount() {
  //   this.setState({
  //     loading: true,
  //   });

  //   try {
  //     const {
  //       data: { hits },
  //     } = await getAllPhotos();

  //     this.setState({
  //       images: hits?.length ? hits : [],
  //     });
  //   } catch (error) {
  //     this.setState({
  //       error: error.message,
  //     });
  //   } finally {
  //     this.setState({
  //       loading: false,
  //     });
  //   }
  // }

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { search, page } = this.state;

    this.setState({
      loading: true,
    });

    try {
      const {
        data: { hits },
      } = await getSearchPhotos(search, page);

      this.setState(({ images }) => {
        return {
          images: hits?.length ? [...images, ...hits] : images,
        };
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleSearch = ({ search }) => {
    this.setState({
      search,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showModal = ({ largeImageURL }) => {
    this.setState({
      modalOpen: true,
      fullImage: {
        largeImageURL,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      fullImage: {},
    });
  };
  render() {
    const { images, loading, error, modalOpen, fullImage } = this.state;
    const { handleSearch, loadMore, showModal, closeModal } = this;

    const isImages = Boolean(images.length);
    return (
      <>
        <div className={styles.wrapper}>
          <SearchBar onSubmit={handleSearch} />

          {error && <p className={styles.error}>{error}</p>}

          {isImages && (
            <ImageGallery>
              <ImageGalleryItem showModal={showModal} items={images} />
            </ImageGallery>
          )}
          {loading && <Loader />}
          {isImages && (
            <div className={styles.blockWrapper}>
              <Button type="button" onClick={loadMore}>
                Load more
              </Button>
            </div>
          )}
        </div>
        {modalOpen && (
          <Modal close={closeModal}>
            <img src={fullImage.largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}*/

export default SearchImages;
