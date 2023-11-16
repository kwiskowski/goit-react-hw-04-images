import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import backgroundImage from '../icons/search.svg';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.query.trim()) {
      return;
    }
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className={css.button}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <span className={css.buttonLabel}>Search</span>
          </button>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
