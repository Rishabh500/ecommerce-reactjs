import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom"

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.style.scss';

const Navigation = () => {
    return (
      <Fragment>
        <div className="navigation-container">
          

          <Link to="/" className="logo-container">
              <CrwnLogo className="logo"/>
           </Link>

          <div className="nav-links-container">
              <Link to="/shop" className="nav-link">Shop</Link>
              <Link to="/auth" className="nav-link">Sign In</Link>

          </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;
  