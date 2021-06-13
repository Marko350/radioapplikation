import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { RadioContext } from "../contexts/RadioContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import {
  container,
  favouritesContainer,
  favourites,
} from "./css/favourites.module.css";

const Favourites = () => {
  const { allChannels, allPrograms } = useContext(RadioContext);
  const { favouritePrograms, favouriteChannels } = useContext(UserContext);
  const [displayChannels, setDisplayChannels] = useState(false);
  const [displayPrograms, setDisplayPrograms] = useState(false);
  const [programsToDisplay, setProgramsToDisplay] = useState(null);
  const [channelsToDisplay, setChannelsToDisplay] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getPrograms();
    getChannels();
  }, [favouritePrograms, favouriteChannels]);

  const getPrograms = () => {
    let programs = [];

    if (favouritePrograms && allPrograms) {
      favouritePrograms.map((favourite) => {
        let id = favourite.programId;
        let ok = allPrograms.filter((program) => program.id == id);

        let programObject = ok[0];
        programs.push(programObject);
        return ok;
      });
    }
    setProgramsToDisplay(programs);
  };

  const getChannels = () => {
    let channels = [];

    if (favouriteChannels && allChannels) {
      favouriteChannels.map((favourite) => {
        let id = favourite.channelId;
        let ok = allChannels.filter((channel) => channel.id == id);

        let programObject = ok[0];
        channels.push(programObject);
        return ok;
      });
    }
    setChannelsToDisplay(channels);
  };

  return (
    <div className={favouritesContainer}>
      <div className={favourites}>
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => setDisplayChannels(!displayChannels)}
        >
          Dina favorita Kanaler
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            style={{ paddingLeft: "10px" }}
          />
        </h1>
        {displayChannels && (
          <div>
            <h2>Här är dina favorita kanaler</h2>
            {/* {channelsToDisplay.length === 0 && (
              <h3>Du har inga favoriter ännu</h3>
            )} */}
            {channelsToDisplay &&
              channelsToDisplay.map((channel, i) => (
                <div className={container} key={i}>
                  <img
                    src={channel.image}
                    alt={channel.name}
                    onClick={() => history.push(`/channel/${channel.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
      <div className={favourites}>
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => setDisplayPrograms(!displayPrograms)}
        >
          Dina favorita Programer
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            style={{ paddingLeft: "10px" }}
          />
        </h1>
        {displayPrograms && (
          <div>
            <h2>Här är dina favorita programmer</h2>
            {/* {programsToDisplay.length === 0 && (
              <h3>Du har inga favoriter ännu</h3>
            )} */}
            {programsToDisplay &&
              programsToDisplay.map((program, i) => (
                <div className={container} key={i}>
                  <img
                    src={program.programimage}
                    alt={program.name}
                    onClick={() => history.push(`/program/${program.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                  <p>{program.name}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
