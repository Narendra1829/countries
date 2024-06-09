import React from "react";
import { Link } from "react-router-dom";

const CountryCard = (props) => {
  const { capital, flag, name, population, region } = props;
  return (
    <Link className="country-card" to={`/${name}`}>
      <img src={flag} alt="Barbados flag" />
      <div className="card-text">
        <h3 className="card-title"> {name}</h3>
        <p>
          <b> Population :</b> {population.toLocaleString("en-In")}
        </p>
        <p>
          <b> Region :</b> {region}
        </p>
        <p>
          <b> Capital :</b> {capital}
        </p>
      </div>
    </Link>
  );
};

export default CountryCard;
