import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./countryDetail.css";
import { ThemeContext } from "../contexts/ThemeContext";

const CountryDetails = () => {
  const params = useParams();
  const countryName = params.country;
  const navigate = useNavigate();
  const [isDarkMode] = useContext(ThemeContext);
  const [countryData, setCountryData] = useState([]);
  const [notFoundData, setNotFoundData] = useState(false);

  useEffect(() => {
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(url)
      .then((response) => response.json())
      .then(([data]) => {
        setCountryData({
          name: data.name.common,
          nativeName: Object.values(data.name.nativeName)[0].common,
          population: data.population.toLocaleString("en-In"),
          region: data.region,
          subRegion: data?.subregion,
          capital: data?.capital,
          topLevelDomain: data?.tld[0],
          flag: data?.flags.svg,
          currency: Object.values(data.currencies || {})
            .map((currency) => currency.name)
            .join(","),
          language: Object.values(data?.languages || {}).join(","),
          borders: [],
        });
        const borders = data.borders || [];
        Promise.all(
          borders?.map((border) => {
            return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((response) => response.json())
              .then(([borderCountry]) => borderCountry.name.common);
          })
        ).then((borders) =>
          setCountryData((prevState) => ({
            ...prevState,
            borders,
          }))
        );
      })
      .catch((error) => {
        console.log("Error fetching country", error);
        setNotFoundData(true);
      });
  }, [countryName]);

  const goback = () => {
    navigate(-1);
  };

  if (notFoundData) {
    return <h1 className="text-center"> Country not found !</h1>;
  }
  return (
    <div>
      {countryData.length !== 0 ? (
        <main className={`${isDarkMode ? "dark" : ""}`}>
          <div className="country-details-container">
            <span className="back-button" onClick={goback}>
              <i className="fa-solid fa-arrow-left" />
              &nbsp; Back
            </span>
            <div className="country-details">
              <img src={countryData.flag} alt={countryData.name} />
              <div className="details-text-container">
                <h1>{countryData.name}</h1>
                <div className="details-text">
                  <p>
                    <b>Native Name: {countryData.nativeName}</b>
                    <span className="native-name"></span>
                  </p>
                  <p>
                    <b>Population: {countryData.population}</b>
                    <span className="population"></span>
                  </p>
                  <p>
                    <b>Region: {countryData.region}</b>
                    <span className="region"></span>
                  </p>
                  <p>
                    <b>Sub Region: {countryData.subRegion} </b>
                    <span className="sub-region"></span>
                  </p>
                  <p>
                    <b>Capital: {countryData.capital} </b>
                    <span className="capital"></span>
                  </p>
                  <p>
                    <b>Top Level Domain: {countryData.topLevelDomain} </b>
                    <span className="top-level-domain"></span>
                  </p>
                  <p>
                    <b>Currencies: {countryData.currency} </b>
                    <span className="currencies"></span>
                  </p>
                  <p>
                    <b>Languages: {countryData.language} </b>
                    <span className="languages"></span>
                  </p>
                </div>
                {countryData.borders.length !== 0 ? (
                  <p className="border-countries">
                    <b>Border Countries: </b>&nbsp;
                    {countryData.borders?.map((border) => {
                      return (
                        <Link key={border} to={`/${border}`}>
                          {border}
                        </Link>
                      );
                    })}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <h1 className="text-center">Loading...</h1>
      )}
    </div>
  );
};

export default CountryDetails;
