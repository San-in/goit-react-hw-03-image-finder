import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchedItem: '',
  };

  onInput = ({ target: { value } }) => {
    this.setState({ searchedItem: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchedItem.trim());
    e.target.reset();
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormBtn type="submit">
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInput}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
