import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const loginCheck = async () => {
    let user = await fetch("/api/v1/user/whoami");
    user = await user.json();
    if (user) {
      console.log("Someone is logged in", user);
      setUser({
        userName: user.userName,
        email: user.email,
        id: user.userId,
      });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loginCheck();
  }, []);

  const login = async (userInput) => {
    let user = await fetch("/api/v1/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    user = await user.json();
    console.log("this is login user:", user);
    if (user.error) {
      return { error: "Bad credentials" };
    } else if (user.success) {
      loginCheck();
      return {};
    }
  };

  const logout = async () => {
    let user = await fetch("/api/v1/user/logout");
    user = await user.json();
    if (user.success) {
      setUser(null);
      history.push("/");
    }
  };

  const registerUser = async (newUser) => {
    let user = await fetch("/api/v1/user/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    user = await user.json();
    if (user.success) {
      loginCheck();
      history.push("/");
    }
  };

  const values = { user, login, logout, registerUser, loginCheck };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
