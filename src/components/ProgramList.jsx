import { useContext, useState, useEffect } from "react";
import { RadioContext } from "../contexts/RadioContext";
import { useHistory } from "react-router-dom";
import { container, programContainer } from "./css/programList.module.css";

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

  console.log(programs);
  return (
    <div>
      {programs && programs.length > 0 ? (
        <h1>Programmer i {programs[0].channel.name}:</h1>
      ) : null}
      <div className={programContainer}>
        {programs &&
          programs.map((program) => (
            <div key={program.id} className={container}>
              <img src={program.socialimage} alt={program.name} />
              <p
                style={{ cursor: "pointer" }}
                onClick={() => history.push(`/program/${program.id}`)}
              >
                {program.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProgramList;
