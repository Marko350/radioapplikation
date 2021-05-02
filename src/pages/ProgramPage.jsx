import { useContext, useEffect, useState } from "react";
import { RadioContext } from "../contexts/RadioContext";
import {
  container,
  infoContainer,
  imageContainer,
  programContainer,
} from "./css/program.module.css";

const ProgramPage = (props) => {
  const { programId } = props.match.params;
  const { getProgramInfo, getProgramSchedule } = useContext(RadioContext);
  const [info, setInfo] = useState(null);
  const [schedule, setSchedule] = useState(null);

  const getInfoData = async () => {
    let data = await getProgramInfo(programId);
    setInfo(data);
  };

  const getScheduleData = async () => {
    let data = await getProgramSchedule(programId);
    setSchedule(data);
  };

  useEffect(() => {
    getInfoData();
    getScheduleData();
  }, []);

  return (
    <div className={programContainer}>
      {info && (
        <div className={container}>
          <div className={imageContainer}>
            <img src={info.programimage} alt={info.name} />
          </div>
          <div className={infoContainer}>
            <h1>{info.name}</h1>
            <p>Kanal: {info.channel.name}</p>
            <p>{info.description}</p>
            <p>Sänds: {info.broadcastinfo}</p>
            <p>Mejla programmet på: {info.email}</p>
            <p>Ansvarig utgivare: {info.responsibleeditor}</p>
          </div>
        </div>
      )}
      {schedule &&
        schedule.broadcasts.map((episode) => (
          <div key={episode.id}>
            <p>{episode.broadcastdateutc}</p>
            <p>{episode.description}</p>
          </div>
        ))}
    </div>
  );
};

export default ProgramPage;
