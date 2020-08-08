import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    AsyncStorage.getItem("favorites").then((res) => {
      if (res !== null) {
        const favoritedTeachers = JSON.parse(res);
        setFavorites(favoritedTeachers);
      }
    });
  };

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />
      <FlatList
        style={styles.list}
        data={favorites}
        extraData={favorites}
        renderItem={({ item }) => <TeacherItem teacher={item} favorited />}
        keyExtractor={(item: Teacher) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7",
  },
  list: {
    marginTop: -40,
  },
});
