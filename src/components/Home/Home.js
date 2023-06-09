import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './Home.module.css';

const Home = ({ movies }) => {
  return (
    <div className={css.home}>
      <h2 className={css.home__title}>Trending today</h2>

      <ul className={css.home__list}>
        {movies?.map(({ title, name, id }) => (
          <li key={id}>
            <Link to={`/movies/${id}`}>{title ?? name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Home.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

export default Home;
