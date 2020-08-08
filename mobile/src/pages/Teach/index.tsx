import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import TeachBgImg from "../../assets/images/give-classes-background.png";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Teach = () => {
  const { goBack } = useNavigation();

  const handleNavigateBack = () => {
    goBack();
  };

  const [selected, setSelected] = useState("JavaScript");

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        style={styles.backgroundImg}
        source={TeachBgImg}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web.
        </Text>
      </ImageBackground>
      <RectButton style={styles.okButton} onPress={handleNavigateBack}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
};

export default Teach;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8257E5",
    justifyContent: "center",
    padding: 40,
  },

  backgroundImg: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontFamily: "Archivo_700Bold",
    color: "#FFF",
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180,
  },

  description: {
    marginTop: 24,
    color: "#d4c2ff",
    fontSize: 16,
    lineHeight: 26,
    fontFamily: "Poppins_400Regular",
    maxWidth: 240,
  },
  okButton: {
    marginVertical: 40,
    backgroundColor: "#04d361",
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  okButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Archivo_700Bold",
  },
});
