import { useContext, useState, useEffect } from "react";
import { RadioContext } from "../contexts/RadioContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import {
  container,
  programContainer,
  desc,
} from "./css/programList.module.css";

const ProgramList = (props) => {
  const { getProgramsChannel } = useContext(RadioContext);
  const [programs, setPrograms] = useState(null);
  const history = useHistory();

  const getData = async (id) => {
    let programs = await getProgramsChannel(id);
    setPrograms(programs);
  };

  useEffect(() => {
    getData(props.id);
  }, []);

  return (
    <div>
      {programs && programs.length > 0 ? (
        <h1>Programmer i {programs[0].channel.name}:</h1>
      ) : null}
      <div className={programContainer}>
        {programs &&
          programs.map((program) => (
            <div
              key={program.id}
              className={container}
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/program/${program.id}`)}
            >
              <img src={program.socialimage} alt={program.name} />
              <h1>{program.name}</h1>
              <div className={desc}>
                <p>{program.description}</p>
                <span onClick={() => history.push(`/program/${program.id}`)}>
                  Läs mer
                  <FontAwesomeIcon
                    icon={faAngleDoubleRight}
                    style={{ paddingLeft: "10px" }}
                  />
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProgramList;
