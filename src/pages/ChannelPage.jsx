import { useContext, useEffect, useState } from "react";
import { RadioContext } from "../contexts/RadioContext";
import ProgramList from "../components/ProgramList";
import FavouriteChannels from "../components/FavouriteChannels";
import {
  container,
  channelContainer,
  containerList,
} from "./css/channel.module.css";

const ChannelPage = (props) => {
  const { channelId } = props.match.params;
  const { getOneChannel } = useContext(RadioContext);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    getData(channelId, getOneChannel);
  }, []);

  const getData = async (id, method) => {
    let channel = await method(id);

    setChannel(channel);
  };

  return (
    <div>
      <div className={container}>
        {channel && channel ? (
          <div>
            <div className={channelContainer}>
              <img src={channel.image} alt={channel.name} />
              <span>{channel.tagline}</span>
            </div>
            <FavouriteChannels channelId={channelId} />
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className={containerList}>
        <ProgramList id={channelId} />
      </div>
    </div>
  );
};

export default ChannelPage;
