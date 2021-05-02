import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { container } from "./css/user.module.css";

const User = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <div className={container}>
      {user ? (
        <div>
          <h1>Här du kan logga ut!</h1>
          <button onClick={() => logout()}>Logga ut</button>
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
