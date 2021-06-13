import { container } from "./css/favourites.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const FavouriteChannels = ({ channelId }) => {
  const [showButton, setShowButton] = useState(true);
  const {
    user,
    addFavouriteChannel,
    removeFavouriteChannel,
    favouriteChannels,
  } = useContext(UserContext);

  const favouriteCheck = () => {
    if (favouriteChannels) {
      if (
        favouriteChannels.find((favourite) => favourite.channelId == channelId)
      ) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    }
  };

  useEffect(() => {
    favouriteCheck();
  }, [favouriteChannels]);

  const addFavourite = () => {
    let favourite = {
      channelId: Number(channelId),
      userId: user.id,
    };
    setShowButton(false);
    addFavouriteChannel(favourite);
  };

  const removeFavourite = () => {
    let favourite = {
      channelId: Number(channelId),
      userId: user.id,
    };
    setShowButton(true);
    removeFavouriteChannel(favourite);
  };

  return (
    <div className={container}>
      {user ? (
        <div>
          {showButton ? (
            <button onClick={addFavourite}>Lägg kanalen som favorit</button>
          ) : (
            <button onClick={removeFavourite}>Ta bort favorit</button>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FavouriteChannels;
