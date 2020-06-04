/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import logo from '../../assets/logo-inv.svg';
import { NavbarEndLoggedIn } from './NavbarEndLoggedIn';
import { NavbarEndLoggedOut } from './NavbarEndLoggedOut';
import { selectIsLoggedIn } from '../../modules/login/selectors';

export const Navbar: React.FC = () => {
  const [burgerMenuIsOpen, setBurgerMenuIsOpen] = useState<boolean>(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main navigation"
      style={{ borderBottom: '1px solid lightgray' }}
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img src={logo} alt="flixstash logo" />
          </Link>
          <a
            role="button"
            className={cx('navbar-burger burger', {
              'is-active': burgerMenuIsOpen,
            })}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => setBurgerMenuIsOpen(!burgerMenuIsOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={cx('navbar-menu', { 'is-active': burgerMenuIsOpen })}
        >
          <div className="navbar-end">
            {isLoggedIn ? <NavbarEndLoggedIn /> : <NavbarEndLoggedOut />}
          </div>
        </div>
      </div>
    </nav>
  );
};
