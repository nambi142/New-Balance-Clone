import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Flag from "react-world-flags";
import { useStore } from "../Contaxt/Store";
import i18next from "i18next";
import "../Css/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const {
    langOpen,
    setLangOpen,
    helpOpen,
    setHelpOpen,
    currentLang,
    langTimeout,
    helpTimeout,
    languages,
    messages,
    slideIndex,
    setSlideIndex,
    handleMouseEnter,
    handleMouseLeave,
    scrolled,
  } = useStore();

  return (
    <header>
      <nav className={"navbar-1"}>
        {/* Location */}
        <div className="location">
          <Flag code="IND" style={{ width: 32, height: 20, marginRight: 8 }} />
          <span>IND</span>
          <span className="pipe-divider">|</span>
          <Link to={"/FindStore"} className="location-find">
            <span>
              <FaLocationDot />
            </span>
            <span>Select a store</span>
          </Link>
        </div>

        {/* Promo Text */}
        <div className={`promo-text-wrapper ${scrolled ? "hidden" : ""}`}> 
          <div className="slide-wrapper">
            <div
              className="slider-track"
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
              {messages.map((msg, i) => (
                <p className="slide-text" key={i}>
                  {msg}
                </p>
              ))}
            </div>
          </div>
          <div className="dots">
            {messages.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === slideIndex ? "active" : ""}`}
                onClick={() => setSlideIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="right-side">
          {/* Language Selector */}
          <div
            className="language-selector"
            onMouseEnter={() => handleMouseEnter(setLangOpen, langTimeout)}
            onMouseLeave={() => handleMouseLeave(setLangOpen, langTimeout)}
          >
            <div className="selector-label">
              <span>
                {languages.find((lang) => lang.code === currentLang)?.label ||
                  "English"}
              </span>
              <span className="arrow">{langOpen ? "˄" : "˅"}</span>
            </div>
            {langOpen && (
              <ul className="language-dropdown dropdown">
                {languages
                  .filter((lang) => lang.code !== currentLang)
                  .map((lang) => (
                    <li
                      key={lang.code}
                      className="language-option"
                      onClick={() => {
                        i18next.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                    >
                      {lang.label}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <span className="pipe-divider">|</span>
          {/* Help Dropdown */}
          <div
            className="help-selector"
            onMouseEnter={() => handleMouseEnter(setHelpOpen, helpTimeout)}
            onMouseLeave={() => handleMouseLeave(setHelpOpen, helpTimeout)}
          >
            <div className="selector-label">
              <span>Help</span>
              <span className="arrow">{helpOpen ? "˄" : "˅"}</span>
            </div>

            {helpOpen && (
              <ul className="dropdown">
                <li className="help-option">
                  <Link
                    to="/FAQ"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    FAQ
                  </Link>
                </li>
                <li className="help-option">
                  <Link
                    to="/Contactus"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Help Options
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
