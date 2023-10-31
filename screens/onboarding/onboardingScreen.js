import React, { useEffect } from "react";
import { View, BackHandler, SafeAreaView, StatusBar, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { Colors } from "../../constants/styles";
import { useFocusEffect } from '@react-navigation/native';



const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <ImageBackground
                source={require('../../assets/bgl1.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/logol1.png')} style={styles.logo} />
                </View>
                
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Atlas Astral</Text>
                    <Text style={styles.subTitleText}>Basta alguns clicks para ver a janela de seu futuro</Text>
                </View>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signin')}>
                        <Text style={styles.buttonText}>Iniciar</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
    },
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 70, // Ajuste de espaçamento do topo
    },
    logo: {
        
        width: 280,
        height: 80,
    },
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 60,
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    subTitleText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontStyle: 'italic',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        marginTop:20,
        marginLeft:20,
        marginRight:20,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 40, // Ajuste de espaçamento da parte inferior
    },
    button: {
        width: width - 60,
        height: 45,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
  
    },
    buttonText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default OnboardingScreen;