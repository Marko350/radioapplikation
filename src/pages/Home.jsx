import { useContext } from "react";
import { RadioContext } from "../contexts/RadioContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import {
  container,
  channelContainer,
  categoriContainer,
  programCategories,
} from "./css/home.module.css";

const Home = () => {
  const { fewChannels, categories } = useContext(RadioContext);
  const history = useHistory();
  const handleClick = (category, id) => {
    history.push({
      pathname: `/categories/${id}`,
      state: { name: `${category}` },
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Kanaler:</h1>
      <div className={container}>
        {fewChannels &&
          fewChannels.map((channel) => (
            <div
              style={{ cursor: "pointer" }}
              className={channelContainer}
              key={channel.name}
              onClick={() => history.push(`/channel/${channel.id}`)}
            >
              <img src={channel.image} alt="Radio Logo" />
              <h1>{channel.name}</h1>
              <h2>{channel.channeltype}</h2>
            </div>
          ))}
        <h3
          onClick={() => history.push("/kanaler")}
          style={{ cursor: "pointer" }}
        >
          Alla kanaler
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            style={{ paddingLeft: "10px" }}
          />
        </h3>
      </div>
      <div className={programCategories}>
        <h1>Pogramkategorier:</h1>
        <div className={categoriContainer}>
          {categories &&
            categories.map((categori) => (
              <div key={categori.id}>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClick(categori.name, categori.id)}
                >
                  {categori.name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
