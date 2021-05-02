import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

// import Login from "./Login";
// import Register from "./Register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import {
  popupBox,
  box,
  loginBtn,
  closeBtn,
  formuler,
  policy,
  change,
  header,
} from "./css/popup.module.css";

const Popup = (props) => {
  const { login, registerUser } = useContext(UserContext);
  const [displayLogin, setDisplayLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFail, setLoginFail] = useState(false);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const user = await login({
      email,
      password,
    });
    if (user.error) {
      setLoginFail(true);
    } else {
      props.close();
    }
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      userName,
      email,
      password,
    };
    registerUser(newUser);
    props.close();
  };

  function toggleRegister() {
    if (displayLogin) {
      setDisplayLogin(false);
    } else {
      setDisplayLogin(true);
    }
  }

  return (
    <div>
      {displayLogin ? (
        <div className={popupBox}>
          <div className={box}>
            <div className={header}>
              <h3>Välkommen till RadioTower!</h3>
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faTimesCircle}
                onClick={props.close}
              />
            </div>
            <p>Logga in på ditt RadioTower konto.</p>
            <form className={formuler} onSubmit={(e) => loginSubmit(e)}>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Lösenord"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={loginBtn} style={{ cursor: "pointer" }}>
                Logga in
              </button>
            </form>
            <div className={change}>
              <p>Inte registrerad RadioTower användare ännu?</p>
              <p>
                <strong onClick={toggleRegister} style={{ cursor: "pointer" }}>
                  Registrera dig här
                </strong>
              </p>
            </div>
            <div className={policy}>
              <p>
                Vi har uppdaterat våra <strong>Användarvillkor</strong> och{" "}
                <strong>Privat policy</strong>. Genom att fortsätta att använda
                RadioTower godkänner du våra uppdaterade villkor.
              </p>
            </div>
            <button
              className={closeBtn}
              onClick={props.close}
              style={{ cursor: "pointer" }}
            >
              Stäng
            </button>
            {loginFail && <h1>Log in Faild! Bad credentials!</h1>}
          </div>
        </div>
      ) : (
        <div className={popupBox}>
          <div className={box}>
            <div className={header}>
              <h3>Välkommen till RadioTower!</h3>
              <FontAwesomeIcon
                icon={faTimesCircle}
                onClick={props.close}
                style={{ cursor: "pointer" }}
              />
            </div>
            <form className={formuler} onSubmit={registerSubmit}>
              <input
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Användarnamn:"
                required
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Lösenord"
                required
              />
              <button className={loginBtn} style={{ cursor: "pointer" }}>
                Registrera
              </button>
            </form>
            <div>
              <div className={change}>
                <p>Redan en användare?</p>
                <p>
                  <strong
                    onClick={toggleRegister}
                    className={change}
                    style={{ cursor: "pointer" }}
                  >
                    Loggga in
                  </strong>
                </p>
              </div>
            </div>
            <div className={policy}>
              <p>
                Vi har uppdaterat våra <strong>Användarvillkor</strong> och{" "}
                <strong>Privat policy</strong>. Genom att fortsätta att använda
                RadioTower godkänner du våra uppdaterade villkor.
              </p>
            </div>
            <button
              className={closeBtn}
              onClick={props.close}
              style={{ cursor: "pointer" }}
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
