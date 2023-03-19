import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useParams } from 'react-router-dom';
import { getMovie } from 'services/getMovies';

import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [currMovie, setCurrMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const { movieId } = useParams();

  const backLinkHref = useLocation().state?.from ?? '/';

  useEffect(() => {
    setError(false);
    setIsloading(true);
    const abortController = new AbortController();

    const fetchMovie = async () => {
      try {
        const movieItem = await getMovie(movieId, abortController.signal);
        setCurrMovie(movieItem);
      } catch {
        setError(true);
      } finally {
        setIsloading(false);
      }
    };

    fetchMovie();
    return () => {
      abortController.abort();
    };
  }, [movieId]);

  if (!currMovie) {
    return (
      <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '40px' }}>
        Loading...
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className={css.info}>
      <Link to={backLinkHref}>
        <button className={css.info__btn}>Go back</button>
      </Link>

      <div className={css['main-info']}>
        <img
          src={
            currMovie.poster_path
              ? `https://image.tmdb.org/t/p/w500${currMovie.poster_path}`
              : 'https://d3aa3603f5de3f81cb9fdaa5c591a84d5723e3cb.hosting4cdn.com/wp-content/uploads/2020/11/404-poster-not-found-CG17701-1.png'
          }
          alt="poster"
          className={css['main-info__img']}
        />
        <div>
          <h2>{currMovie.title ?? currMovie.name}</h2>
          <p>User Score: {currMovie.vote_average}</p>
          <h3>Overview</h3>
          <p>{currMovie.overview}</p>
          <h3>Genres</h3>
          <p>{currMovie.genres.map(item => item.name).join(', ')}</p>
        </div>
      </div>

      <div className={css['additional-info']}>
        <p>Additional information</p>
        <Link to={'cast'} state={{ id: movieId }}>
          Cast
        </Link>
        <Link to={'reviews'}>Reviews</Link>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetails;
