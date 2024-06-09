import React, { useEffect, useState } from "react";
// import data from "../data";
import CountryCard from "./CountryCard";
import CountryListShimmer from "./CountryListShimmer";

const CountriesList = ({ query }) => {
  const [data, setData] = useState([]);
  console.log("data", data);
  const url = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (!data.length) {
    return <CountryListShimmer />;
  }
  return (
    <>
      {data ? (
        <div className="countries-container">
          {data
            ?.filter(
              (country) =>
                country?.name?.official.toLowerCase().includes(query) ||
                country?.region.toLowerCase().includes(query)
            )
            .map((country) => {
              console.log("country", country);
              const { name, population, region, flags, capital } = country;

              return (
                <CountryCard
                  key={name?.common}
                  name={name?.common}
                  population={population}
                  region={region}
                  flag={flags?.svg}
                  capital={capital?.[0]}
                />
              );
            })}
        </div>
      ) : (
        "No country to show"
      )}
    </>
  );
};

export default CountriesList;
