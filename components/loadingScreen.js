import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const loadFont = async () => {
      try {
        await Font.loadAsync({
          Hahmlet_Light: require("../assets/fonts/Hahmlet-Light.ttf"),
          Hahmlet_Regular: require("../assets/fonts/Hahmlet-Regular.ttf"),
          Hahmlet_Medium: require("../assets/fonts/Hahmlet-Medium.ttf"),
          Hahmlet_SemiBold: require("../assets/fonts/Hahmlet-SemiBold.ttf"),
          Hahmlet_Bold: require("../assets/fonts/Hahmlet-Bold.ttf"),
          Hahmlet_ExtraBold: require("../assets/fonts/Hahmlet-ExtraBold.ttf"),
          Hahmlet_Black: require("../assets/fonts/Hahmlet-Black.ttf"),
        });
        navigation.navigate('Splash');
      } catch (error) {
        console.error('Erro ao carregar fontes:', error);
      }
    };

    loadFont();
  }, [navigation]); // Adicione navigation como dependência

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
  );
};

export default LoadingScreen;
