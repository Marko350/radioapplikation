import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { container, out, wellcome } from "./css/user.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import Favourites from "../components/Favourites";

const User = () => {
  const { user, logout } = useContext(UserContext);
  const [displayFavourites, setDisplayFavourites] = useState(false);

  return (
    <div className={container}>
      {user ? (
        <div>
          <div>
            <div>
              <h1 className={wellcome}>Väkommen {user.userName}</h1>
            </div>
            <div>
              <h2
                style={{ cursor: "pointer" }}
                onClick={() => setDisplayFavourites(!displayFavourites)}
              >
                Mina favoriter
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  style={{ paddingLeft: "10px" }}
                />
              </h2>
            </div>
            {displayFavourites && <Favourites />}
          </div>
          <div className={out}>
            <button onClick={() => logout()}>Logga ut</button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Du måste logga in!</h1>
        </div>
      )}
    </div>
  );
};

export default User;
