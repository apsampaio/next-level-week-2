import React from "react";

import "./styles.css";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars0.githubusercontent.com/u/51516616?s=460&u=9dceff67107fcc14afd0339af87e1fadeac4dfea&v=4"
          alt="profile"
        />
        <div>
          <strong>André Sampaio</strong>
          <span>Matemática</span>
        </div>
      </header>
      <p>Ensinando a matemática básica para o básico.</p>
      <footer>
        <p>
          Preço/hora
          <strong>R$ 100,00</strong>
        </p>
        <button type="button">
          Entrar em contato
          <img src={whatsappIcon} alt="Whatsapp" />
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
