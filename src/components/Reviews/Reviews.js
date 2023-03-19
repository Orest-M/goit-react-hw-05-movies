import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'services/getMovies';

import css from './Reviews.module.css';

const Reviews = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setError(false);
    setIsloading(true);
    const abortController = new AbortController();

    const fetchMovie = async () => {
      try {
        const movieReviews = await getReviews(movieId, abortController.signal);
        setReviews(movieReviews);
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
      {reviews?.results.length === 0 ? (
        <p>We don't have any reviews for this movie</p>
      ) : (
        <ul className={css.reviews__list}>
          {reviews?.results.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
