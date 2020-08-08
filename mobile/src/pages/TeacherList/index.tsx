import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, TextInput } from "react-native";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import AsyncStorage from "@react-native-community/async-storage";

const TeacherList = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const loadFavorites = async () => {
    AsyncStorage.getItem("favorites").then((res) => {
      if (res !== null) {
        const favoritedTeachers = JSON.parse(res);
        const favoritedTeachersId = favoritedTeachers.map(
          (teacher: Teacher) => teacher.id
        );
        setFavorites(favoritedTeachersId);
      }
    });
  };

  const [subject, setSubject] = useState("");
  const [weekday, setWeekday] = useState("");
  const [time, setTime] = useState("");
  const [teachers, setTeachers] = useState([]);

  const handleToggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const handleFiltersSubmit = async () => {
    loadFavorites();

    const res = await api.get("classes", {
      params: {
        subject,
        weekday,
        time,
      },
    });

    setTeachers(res.data);
    setIsFiltersVisible(false);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFilters}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria?"
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                  value={weekday}
                  onChangeText={(text) => setWeekday(text)}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o dia?"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual o horário?"
                />
              </View>
            </View>
            <RectButton
              style={styles.submitFilter}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitFilterText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <FlatList
        style={styles.list}
        data={teachers}
        renderItem={({ item }) => (
          <TeacherItem teacher={item} favorited={favorites.includes(item.id)} />
        )}
        keyExtractor={(teacher: Teacher) => String(teacher.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />
    </View>
  );
};

export default TeacherList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7",
  },
  list: {
    marginTop: -40,
  },
  searchForm: {
    marginBottom: 24,
  },
  label: {
    color: "#d4c2ff",
    fontFamily: "Poppins_400Regular",
  },
  input: {
    height: 54,
    backgroundColor: "#FFF",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBlock: {
    width: "48%",
  },
  submitFilter: {
    backgroundColor: "#04d361",
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitFilterText: {
    color: "#fff",
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
    marginLeft: 16,
  },
});
