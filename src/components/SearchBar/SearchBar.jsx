import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import backgroundImage from '../icons/search.svg';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={css.searchBar}>
      <form className={css.form} onSubmit={handleSubmit}>
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
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
