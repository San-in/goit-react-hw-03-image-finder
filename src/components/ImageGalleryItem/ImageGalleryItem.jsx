import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import {
  GalleryItem,
  GalleryImg,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { webformatURL, largeImageURL, tags } = this.props.item;

    return (
      <>
        <GalleryItem onClick={this.openModal}>
          <GalleryImg src={webformatURL} alt={tags} loading="lazy" />
        </GalleryItem>
        {this.state.isModalOpen && (
          <Modal link={largeImageURL} alt={tags} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
