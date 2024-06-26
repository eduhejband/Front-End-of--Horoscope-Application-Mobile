import React, { useCallback } from "react";
import { SafeAreaView, StatusBar, Image, ImageBackground, BackHandler } from "react-native";
import { Colors, } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    setTimeout(() => {
        navigation.navigate('Onboarding')
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, }}>
            {/* Alterações no StatusBar */}
            <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
            <ImageBackground
                source={require('../assets/images/bg1.jpg')}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
                <Image
                    source={require('../assets/images/bg3.png')}
                    style={{ width: '100%', resizeMode: 'contain', height: 260 }}
                />
            </ImageBackground>
        </SafeAreaView>
    )
}

export default SplashScreen;
