import React, { useState, FormEvent } from "react";

import "./styles.css";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import SearchIcon from "../../assets/images/icons/search.svg";

import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

const TeacherList = () => {
  const [subject, setSubject] = useState("");
  const [weekday, setWeekday] = useState("");
  const [time, setTime] = useState("");
  const [teachers, setTeachers] = useState([]);

  const handleSearchTeacher = async (ev: FormEvent) => {
    ev.preventDefault();
    const res = await api.get("classes", {
      params: {
        subject,
        weekday,
        time,
      },
    });

    setTeachers(res.data);
    console.log(res.data);
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes sãos os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleSearchTeacher}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(ev) => setSubject(ev.target.value)}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
              { value: "História", label: "História" },
              { value: "Geografia", label: "Geografia" },
              { value: "Física", label: "Física" },
              { value: "Química", label: "Física" },
            ]}
          />
          <Select
            name="weekday"
            label="Dia da Semana"
            value={weekday}
            onChange={(ev) => setWeekday(ev.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            value={time}
            onChange={(ev) => setTime(ev.target.value)}
            type="time"
            name="time"
            label="Hora"
          />
          <button type="submit">
            <img src={SearchIcon} alt="Procurar" />
          </button>
        </form>
      </PageHeader>
      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};

export default TeacherList;
