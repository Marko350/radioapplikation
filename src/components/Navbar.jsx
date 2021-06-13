import { NavLink } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import {
  container,
  links,
  register,
  mobile,
  navbar,
  login,
  users,
} from "./css/navbar.module.css";

import Popup from "./Popup";

const Navbar = () => {
  const { user, loginCheck } = useContext(UserContext);
  const [popup, setPopup] = useState(false);

  const handleClick = () => {
    setPopup(!popup);
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <nav className={navbar}>
      <div className={container}>
        <div className={links}>
          <NavLink to="/">RadioTower</NavLink>
        </div>
        <div>
          {!user && (
            <FontAwesomeIcon
              icon={faUser}
              className={mobile}
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            />
          )}
          {popup && Popup ? <Popup close={handleClick} /> : <></>}
        </div>
        {user ? (
          <NavLink to="/user" className={users}>
            Hi, {user.userName}
          </NavLink>
        ) : (
          <div className={register}>
            <p
              onClick={handleClick}
              className={login}
              style={{ cursor: "pointer" }}
            >
              Login
            </p>
            {popup && Popup ? <Popup close={handleClick} /> : <></>}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
