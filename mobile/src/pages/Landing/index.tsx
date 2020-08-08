import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import api from "../../services/api";
import landingImg from "../../assets/images/landing.png";
import studyImg from "../../assets/images/icons/study.png";
import teachImg from "../../assets/images/icons/give-classes.png";
import heartImg from "../../assets/images/icons/heart.png";

const Landing = () => {
  const navigation = useNavigation();
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    api.get("connections").then((res) => {
      setConnections(res.data.total);
    });
  }, []);

  const handleNavigateToTeachPage = () => {
    navigation.navigate("Teach");
  };

  const handleNavigateToStudyPage = () => {
    navigation.navigate("Study");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={landingImg} />
      <Text style={styles.title}>
        Seja bem-vindo, {"\n"}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudyPage}
        >
          <Image source={studyImg}></Image>
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToTeachPage}
        >
          <Image source={teachImg}></Image>
          <Text style={styles.buttonText}>Ensinar</Text>
        </RectButton>
      </View>
      <Text style={styles.totalConnections}>
        Total de {connections} conexãos já realizadas {` `}
        <Image source={heartImg} />
      </Text>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8257E5",
    justifyContent: "center",
    padding: 40,
  },

  banner: {
    width: "100%",
    resizeMode: "contain",
    marginBottom: 80,
  },

  title: {
    fontFamily: "Poppins_400Regular",
    color: "#FFF",
    fontSize: 20,
  },
  titleBold: {
    fontFamily: "Poppins_600SemiBold",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
  },
  button: {
    height: 150,
    width: "48%",
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 24,
    justifyContent: "space-between",
  },
  buttonPrimary: {
    backgroundColor: "#9871F5",
  },
  buttonSecondary: {
    backgroundColor: "#04D361",
  },
  buttonText: {
    fontFamily: "Archivo_700Bold",
    color: "#FFF",
    fontSize: 20,
  },
  totalConnections: {
    fontFamily: "Poppins_400Regular",
    color: "#d4c2ff",
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40,
  },
});
