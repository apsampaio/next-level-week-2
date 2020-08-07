import React from "react";

import "./styles.css";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemsProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemsProps> = ({ teacher }) => {
  const handleSaveConnection = () => {
    api.post("connections", {
      user_id: teacher.id,
    });
  };

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="profile" />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>
      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost},00</strong>
        </p>
        <a
          target="_blank"
          onClick={handleSaveConnection}
          href={`https://wa.me/<número>${teacher.whatsapp}`}
        >
          Entrar em contato
          <img src={whatsappIcon} alt="Whatsapp" />
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
