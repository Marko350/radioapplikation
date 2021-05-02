import { createContext, useEffect, useState } from "react";

export const RadioContext = createContext();

const RadioContextProvider = (props) => {
  const [allChannels, setAllChannels] = useState(null);
  const [fewChannels, setFewChannels] = useState(null);
  const [categories, setCategories] = useState(null);

  const getFewChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    setFewChannels(channels);
  };

  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels/allchannels");
    channels = await channels.json();
    setAllChannels(channels);
  };

  const getOneChannel = async (id) => {
    let channel = await fetch(`/api/v1/channels/${id}`);
    channel = await channel.json();
    console.log(channel);
    return channel;
  };

  const getProgramsChannel = async (id) => {
    let programs = await fetch(`/api/v1/programs/channel/${id}`);
    programs = await programs.json();
    console.log(programs);
    return programs;
  };

  const getProgramInfo = async (id) => {
    let info = await fetch(`/api/v1/programs/${id}`);
    info = await info.json();
    return info;
  };

  const getProgramSchedule = async (id) => {
    let schedule = await fetch(`/api/v1/programs/schedule/${id}`);
    schedule = await schedule.json();
    return schedule;
  };

  const getCategories = async () => {
    let categori = await fetch("/api/v1/categories/");
    categori = await categori.json();
    setCategories(categori);
  };

  const getProgramCategori = async (id) => {
    let program = await fetch(`/api/v1/categories/${id}`);
    program = await program.json();
    return program;
  };

  useEffect(() => {
    getFewChannels();
    getAllChannels();
    getCategories();
  }, []);

  const values = {
    allChannels,
    fewChannels,
    categories,
    getFewChannels,
    getProgramCategori,
    getCategories,
    getAllChannels,
    getOneChannel,
    getProgramsChannel,
    getProgramSchedule,
    getProgramInfo,
  };

  return (
    <RadioContext.Provider value={values}>
      {props.children}
    </RadioContext.Provider>
  );
};

export default RadioContextProvider;
