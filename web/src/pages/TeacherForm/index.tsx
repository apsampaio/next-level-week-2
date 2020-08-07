import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Textarea from "../../components/Textarea";
import "./styles.css";

import warningIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";

const TeacherForm = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItem, setScheduleItem] = useState([
    { weekday: 0, from: "", to: "" },
  ]);

  const addNewScheduleItem = () => {
    setScheduleItem([...scheduleItem, { weekday: 0, from: "", to: "" }]);
  };

  const handleCreateClass = (ev: FormEvent) => {
    ev.preventDefault();

    api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItem,
      })
      .then(() => {
        alert("Cadastro feito com sucesso!");
        history.push("/");
      })
      .catch((err) => {
        alert("Erro no cadastro!");
      });
  };

  const setScheduleItemValue = (
    position: number,
    field: string,
    value: string
  ) => {
    const newSchedule = scheduleItem.map((item, index) => {
      if (index === position) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setScheduleItem(newSchedule);
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher este formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(ev) => setAvatar(ev.target.value)}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(ev) => setWhatsapp(ev.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(ev) => setBio(ev.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
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
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(ev) => setCost(ev.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItem.map((item, index) => {
              return (
                <div key={item.weekday} className="schedule-item">
                  <Select
                    name="weekday"
                    label="Dia da Semana"
                    value={item.weekday}
                    onChange={(e) =>
                      setScheduleItemValue(index, "weekday", e.target.value)
                    }
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
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                    name="from"
                    label="Das"
                    type="time"
                    value={item.from}
                  />
                  <Input
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                    name="to"
                    label="Até"
                    type="time"
                    value={item.to}
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante: <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
