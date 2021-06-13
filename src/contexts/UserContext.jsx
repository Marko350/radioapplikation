import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [favouritePrograms, setFavouritePrograms] = useState([]);
  const [favouriteChannels, setFavouriteChannels] = useState([]);
  const history = useHistory();

  useEffect(() => {
    loginCheck();
  }, []);

  const loginCheck = async () => {
    let user = await fetch("/api/v1/user/whoami");
    user = await user.json();
    if (user) {
      setUser({
        userName: user.userName,
        email: user.email,
        id: user.userId,
      });
      getFavouriteChannels({ userId: user.userId });
      getFavouritePrograms({ userId: user.userId });
    } else {
      setUser(null);
    }
  };

  const login = async (userInput) => {
    let user = await fetch("/api/v1/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    user = await user.json();

    if (user.error) {
      return { error: "Bad credentials" };
    } else if (user.success) {
      getFavouriteChannels({ userId: user.id });
      getFavouritePrograms({ userId: user.id });
      loginCheck();
      return {};
    }
  };

  const logout = async () => {
    let user = await fetch("/api/v1/user/logout");
    user = await user.json();
    if (user.success) {
      loginCheck();
      console.log(user);
      setFavouritePrograms([]);
      setFavouriteChannels([]);
      // setUser(null);
      history.push("/");
      console.log(user);
      console.log(favouritePrograms);
      console.log(favouriteChannels);
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
      login(newUser);
      loginCheck();
      history.push("/");
    }
  };

  const addFavouriteProgram = async (favourite) => {
    let program = await fetch("/api/v1/favourites/newFavProgram", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(favourite),
    });
    console.log(program);
    program = await program.json();
    console.log(program);

    if (program.success) {
      setFavouritePrograms(program.favourites);
      console.log(program);
    }
  };

  const addFavouriteChannel = async (favourite) => {
    let channel = await fetch("/api/v1/favourites/newFavChannel", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(favourite),
    });
    channel = await channel.json();

    if (channel.success) {
      setFavouriteChannels(channel.favourite);
    }
  };

  const removeFavouriteProgram = async (favourite) => {
    let program = await fetch("/api/v1/favourites/delete-fav-program", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(favourite),
    });

    program = await program.json();

    if (program.success) {
      setFavouritePrograms(program.favourites);
    }
  };

  const removeFavouriteChannel = async (favourite) => {
    let channel = await fetch("/api/v1/favourites/delete-fav-channel", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(favourite),
    });

    channel = await channel.json();
    if (channel.success) {
      setFavouriteChannels(channel.favourites);
    }
  };

  const getFavouriteChannels = async (id) => {
    let channels = await fetch("/api/v1/favourites/channels", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(id),
    });

    channels = await channels.json();
    if (channels.success) {
      setFavouriteChannels(channels.favourites);
    }
  };

  const getFavouritePrograms = async (id) => {
    let programs = await fetch("/api/v1/favourites/programs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(id),
    });

    programs = await programs.json();
    if (programs.success) {
      setFavouritePrograms(programs.favourites);
    }
  };

  const values = {
    user,
    login,
    logout,
    registerUser,
    loginCheck,
    favouritePrograms,
    favouriteChannels,
    getFavouritePrograms,
    getFavouriteChannels,
    removeFavouriteChannel,
    removeFavouriteProgram,
    addFavouriteChannel,
    addFavouriteProgram,
  };
  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
