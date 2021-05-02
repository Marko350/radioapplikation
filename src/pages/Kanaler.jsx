import { useContext } from "react";
import { RadioContext } from "../contexts/RadioContext";
import { useHistory } from "react-router-dom";

import { channelContainer, container } from "../pages/css/home.module.css";

const Kannaler = () => {
  const { allChannels } = useContext(RadioContext);
  const history = useHistory();

  return (
    <div className={container}>
      {allChannels &&
        allChannels.map((channel) => (
          <div
            style={{ cursor: "pointer" }}
            className={channelContainer}
            key={channel.name}
            onClick={() => history.push(`/channel/${channel.id}`)}
          >
            <img src={channel.image} alt="Radio Logo" />
            <h1>{channel.name}</h1>
            <h3>{channel.channeltype}</h3>
          </div>
        ))}
    </div>
  );
};

export default Kannaler;
