import { container } from "./css/favourites.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const FavouritePrograms = ({ programId }) => {
  const [showButton, setShowButton] = useState(true);
  const {
    user,
    addFavouriteProgram,
    removeFavouriteProgram,
    favouritePrograms,
  } = useContext(UserContext);

  useEffect(() => {
    favouriteCheck();
  }, [favouritePrograms]);

  const favouriteCheck = async () => {
    if (favouritePrograms) {
      if (
        favouritePrograms.find((favourite) => favourite.programId == programId)
      ) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    }
  };

  const addFavourite = () => {
    let favourite = {
      programId: Number(programId),
      userId: user.id,
    };

    setShowButton(false);
    addFavouriteProgram(favourite);
  };

  const removeFavourite = () => {
    let favourite = {
      programId: Number(programId),
      userId: user.id,
    };
    setShowButton(true);
    removeFavouriteProgram(favourite);
  };

  return (
    <div className={container}>
      {user ? (
        <div>
          {showButton ? (
            <button onClick={addFavourite}>Lägg programen som favorit</button>
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

export default FavouritePrograms;
