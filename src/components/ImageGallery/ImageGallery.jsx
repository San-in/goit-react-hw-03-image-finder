import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledGallery } from 'components/ImageGallery/ImageGallery.styled';

export const ImageGallery = ({ galleryItems }) => {
  return (
    <StyledGallery>
      {galleryItems.map(item => {
        return <ImageGalleryItem item={item} key={item.id} />;
      })}
    </StyledGallery>
  );
};
