import { Component } from 'react';
import { getPicturesByQuery } from 'helpers/getPicturesByQuery';
import { Dna } from 'react-loader-spinner';
import * as Scroll from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StyledApp } from 'components/App/App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    searchedWord: '',
    galleryItems: [],
    page: 1,
    perPage: 12,
    totalHits: 0,
    isLoading: false,
  };

  onSubmitForm = searchedWord => {
    if (!searchedWord.trim()) {
      return toast.warn('Строка пуста, введіть щось');
    }
    this.setState({ searchedWord, page: 1 });
  };
  onLoadMore = async () => {
    await this.setState(prevState => {
      return { page: prevState.page + 1, isLoading: true };
    });

    const { searchedWord, page } = this.state;
    await getPicturesByQuery(searchedWord, page)
      .then(({ galleryItems }) =>
        this.setState(prevState => {
          return {
            galleryItems: [...prevState.galleryItems, ...galleryItems],
          };
        })
      )
      .catch(({ message }) => toast.error(message))
      .finally(() => {
        Scroll.animateScroll.scrollMore(620);
        this.setState({ isLoading: false });
      });
  };
  componentDidUpdate(prevProps, prevState) {
    const { searchedWord, page } = this.state;

    if (prevState.searchedWord !== searchedWord) {
      this.setState({ isLoading: true, totalHits: 0, galleryItems: [] });
      try {
        getPicturesByQuery(searchedWord, page)
          .then(({ totalHits, galleryItems }) =>
            this.setState({ totalHits, galleryItems })
          )
          .catch(({ message }) => toast.error(message))
          .finally(() => this.setState({ isLoading: false }));
      } catch {
        toast.warn('Щось з сервером, спробуйте ще');
      }
    }
  }
  isLoadMoreOpen = () => {
    const { totalHits, page, perPage } = this.state;
    return totalHits - page * perPage > 0;
  };

  render() {
    return (
      <StyledApp>
        <Searchbar onSubmit={this.onSubmitForm} />
        {this.state.isLoading && (
          <Dna
            height="280"
            width="280"
            wrapperStyle={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {this.state.galleryItems && (
          <ImageGallery galleryItems={this.state.galleryItems} />
        )}
        {this.isLoadMoreOpen() && <Button onLoadMore={this.onLoadMore} />}
      </StyledApp>
    );
  }
}
