import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="#">
        Web-Dev SEEKER
      </a>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <form className="form-inline my-2 my-lg-0">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashbaurd
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Jobs">
                Find A Job!
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/User">
                Profile
              </Link>
            </li>
          </ul>

          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-primary my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
