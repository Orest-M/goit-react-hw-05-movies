import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActors } from 'services/getMovies';

import css from './Cast.module.css';

const Cast = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [actors, setActors] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setError(false);
    setIsloading(true);
    const abortController = new AbortController();

    const fetchMovie = async () => {
      try {
        const movieActors = await getActors(movieId, abortController.signal);
        setActors(movieActors);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <ul className={css.cast__list}>
        {actors?.cast.map(actor => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : 'https://d3aa3603f5de3f81cb9fdaa5c591a84d5723e3cb.hosting4cdn.com/wp-content/uploads/2020/11/404-poster-not-found-CG17701-1.png'
              }
              alt="actor"
              className={css.cast__img}
            />
            <p>{actor.name}</p>
            <p>Caracter: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
