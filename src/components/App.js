import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getMovieList } from 'services/getMovies';

import Header from './Header/Header';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import MovieDetails from './MovieDetails/MovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

export const App = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const abortController = new AbortController();
    const response = await getMovieList(abortController.signal);

    setMovies(response.results);
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home movies={movies} />} />
      </Routes>
    </div>
  );
};
