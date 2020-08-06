import React from "react";

import PageHeader from "../../components/PageHeader";
import "./styles.css";

const TeacherForm = () => {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher este formulário de inscrição."
      />
    </div>
  );
};

export default TeacherForm;
