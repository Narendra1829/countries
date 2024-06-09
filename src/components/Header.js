import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Header = ({ theme }) => {
  const [isDarkMode, setIsDarkMode] = useContext(ThemeContext);

  if (isDarkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return (
    <header class={`header-container ${isDarkMode ? "dark" : ""}`}>
      <div class="header-content">
        <h2 class="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p
          className="theme-changer"
          onClick={() => {
            setIsDarkMode(!isDarkMode);
            localStorage.setItem("isDarkMode", isDarkMode);
          }}>
          <i class={`fa-regular fa-${isDarkMode ? "sun" : "moon"}`}></i>
          &nbsp;&nbsp; {isDarkMode ? "Light Mode" : "Dark Mode"}
        </p>
      </div>
    </header>
  );
};

export default Header;
