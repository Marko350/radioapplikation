import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RadioContext } from "../contexts/RadioContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { container, containerProgram, desc } from "./css/categori.module.css";

const Categori = (props) => {
  const history = useHistory();
  const { getProgramCategori } = useContext(RadioContext);
  const [programs, setPrograms] = useState(null);
  const { id } = props.match.params;

  useEffect(() => {
    const data = async () => {
      let result = await getProgramCategori(id);
      setPrograms(result);
    };
    data();
  }, []);

  const handleClick = (id) => {
    history.push(`/program/${id}`);
  };

  return (
    <div className={container}>
      {programs &&
        programs.map((program) => (
          <div
            key={program.id}
            className={containerProgram}
            onClick={() => handleClick(program.id)}
          >
            <img src={program.socialimage} alt={program.name} />
            <p>{program.name}</p>
            <div>
              <p className={desc}>{program.description}</p>
              <span>
                Läs mer{" "}
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  style={{ paddingLeft: "2px" }}
                />
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Categori;
