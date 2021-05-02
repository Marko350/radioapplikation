import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RadioContext } from "../contexts/RadioContext";

import { container, containerProgram } from "./css/categori.module.css";

const Categori = (props) => {
  const history = useHistory();
  const { getProgramCategori } = useContext(RadioContext);
  const [programs, setPrograms] = useState(null);
  const { id } = props.match.params;
  console.log(id);

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
          <div key={program.id} className={containerProgram}>
            <img src={program.socialimage} alt={program.name} />
            <p
              onClick={() => handleClick(program.id)}
              style={{ cursor: "pointer" }}
            >
              {program.name}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Categori;
