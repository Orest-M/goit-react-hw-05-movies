import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from 'services/getMovies';

import css from './Movies.module.css';

const Movies = () => {
  const [input, setInput] = useState('');
  const [movies, setMovies] = useState(null);

  const changeInput = e => {
    setInput(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    const abortController = new AbortController();
    const response = await getMovies(
      input.toLowerCase(),
      abortController.signal
    );

    setMovies(response.results);
  };

  return (
    <div className={css.movies}>
      <form action="" onSubmit={onSubmit}>
        <input
          className={css.movies__input}
          type="text"
          value={input}
          onChange={changeInput}
        />
        <button className={css.movies__submit} type="submit">
          Search
        </button>
      </form>

      <ul className={css.movie__list}>
        {movies &&
          movies.map(({ title, name, id }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title ?? name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Movies;
