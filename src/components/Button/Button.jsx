import { LoadMoreBtn } from 'components/Button/Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <LoadMoreBtn type="button" onClick={onLoadMore}>
      Load more...
    </LoadMoreBtn>
  );
};
