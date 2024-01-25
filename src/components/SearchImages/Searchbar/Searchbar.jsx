import { Component } from 'react';

import styles from './searchbar.module.css';
class SearchBar extends Component {
  state = {
    search: '',
    top: '1',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state }); // викликається handleSearch
    this.setState({
      search: '',
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;
    return (
      <header className={styles.searchbar}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <button type="submit" className={styles.formButton}>
            <span className={styles.formButtonLabel}>Search</span>
          </button>

          <input
            value={search}
            name="search"
            onChange={handleChange}
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
