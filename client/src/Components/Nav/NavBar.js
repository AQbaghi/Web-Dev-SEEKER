import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

//third party
// import { faHome } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = ({ signup, login, logout, companyAuthenticated }) => {
  const navButtonHandler = () => {
    let navButton = document.querySelector('.navbar .navbar-button i');
    let nav = document.querySelector('.navbar');
    navButton.classList.toggle('closed-button');
    nav.classList.toggle('closed');
  };

  //lougout link
  const LogoutLink = () => {
    return (
      <li>
        <Link className="nav-link" to="/logout">
          LogOut
        </Link>
      </li>
    );
  };
  //signup link
  const SignupLink = () => {
    return (
      <li>
        <Link className="nav-link" to="/Signup">
          Sign up
        </Link>
      </li>
    );
  };
  //signin link
  const LoginLink = () => {
    return (
      <li>
        <Link className="nav-link" to="/login">
          Log in
        </Link>
      </li>
    );
  };
  //start company link
  const StartCompanyLink = () => {
    return (
      <li>
        <Link className="nav-link" to="/startCompany">
          Start a Company
        </Link>
      </li>
    );
  };
  //Create Job Post Link
  const CreateJobPostLink = () => {
    return (
      <li>
        <Link className="nav-link" to="/createjobpost">
          Create a Job Post
        </Link>
      </li>
    );
  };

  const myProfile = () => {
    return (
      <li>
        <Link className="nav-link" to="/profile">
          Profile
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
        {signup ? null : SignupLink()}
        {login ? null : LoginLink()}
        <li>
          <Link className="nav-link" to="/">
            Jobs
          </Link>
        </li>
        {login && !companyAuthenticated ? StartCompanyLink() : null}
        {companyAuthenticated ? CreateJobPostLink() : null}
        {login ? myProfile() : null}
        <li>
          <Link className="nav-link" to="/">
            About
          </Link>
        </li>

        {logout ? LogoutLink() : null}
      </ul>
    </nav>
  );
};

export default NavBar;
