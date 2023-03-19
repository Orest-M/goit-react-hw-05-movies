import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

import css from './Header.module.css';

const Header = () => {
  const [active, setActive] = useState(
    useLocation().pathname.includes('movies') ? 'movies' : 'home'
  );

  return (
    <header className={css.header}>
      <nav className={css['header__nav']}>
        <NavLink
          className={
            active === 'home'
              ? css['header__nav-item'] + ' ' + css.active
              : css['header__nav-item']
          }
          to="/"
          onClick={() => setActive('home')}
        >
          Home
        </NavLink>
        <NavLink
          className={
            active === 'movies'
              ? css['header__nav-item'] + ' ' + css.active
              : css['header__nav-item']
          }
          to="/movies"
          onClick={() => setActive('movies')}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
