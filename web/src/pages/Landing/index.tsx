import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import logo from "../../assets/images/logo.svg";
import landing from "../../assets/images/landing.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import teachIcon from "../../assets/images/icons/teach.svg";

import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

const Landing = () => {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>
        <img src={landing} alt="Plataforma de estudos" className="hero-image" />
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/teach" className="teach">
            <img src={teachIcon} alt="Ensinar" />
            Ensinar
          </Link>
        </div>

        <span className="total-connections">
          Total de 200 conexões já realizadas
          <img src={purpleHeartIcon} alt="Coração Roxo" />
        </span>
      </div>
    </div>
  );
};

export default Landing;
