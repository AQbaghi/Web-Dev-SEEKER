import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

//third party
// import { faHome } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = ({ signup, login, logout }) => {
  const navButtonHandler = () => {
    let navButton = document.querySelector('.navbar .navbar-button i');
    let nav = document.querySelector('.navbar');
    navButton.classList.toggle('closed-button');
    nav.classList.toggle('closed');
  };

  //lougout link
  const logoutLink = () => {
    return (
      <li>
        <Link className="nav-link" to="/logout">
          LogOut
        </Link>
      </li>
    );
  };
  //signup link
  const signupLink = () => {
    return (
      <li>
        <Link className="nav-link" to="/Signup">
          Sign up
        </Link>
      </li>
    );
  };
  //signin link
  const loginLink = () => {
    return (
      <li>
        <Link className="nav-link" to="/login">
          Sign in
        </Link>
      </li>
    );
  };

  return (
    <nav className="navbar closed">
      <div className="navbar-button" onClick={navButtonHandler}>
        <i className="fa fa-bars closed-button" aria-hidden="true"></i>
      </div>
      <ul>
        {signup ? null : signupLink()}
        {login ? null : loginLink()}
        <li>
          <Link className="nav-link" to="/">
            Jobs
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/">
            Profile
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/">
            Company
          </Link>
        </li>
        {logout ? logoutLink() : null}
      </ul>
    </nav>
  );
};

export default NavBar;
