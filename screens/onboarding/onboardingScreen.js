import React, { useState } from "react";
import { View, BackHandler, SafeAreaView, StatusBar, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from "react-native";
import { Colors } from "../../constants/styles";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo'; // Importar NetInfo
import 'react-native-get-random-values';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    };

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [])
    );

    const handleStartPress = async () => {
        try {
            const state = await NetInfo.fetch();
            if (!state.isConnected) {
                Alert.alert('Sem Conexão', 'Por favor, verifique sua conexão com a internet e tente novamente.');
                return;
            }
    
            setIsLoading(true);
    
            const userId = await AsyncStorage.getItem('userId');
            const name = await AsyncStorage.getItem('name');
    
            if (!userId || !name) {
                navigation.navigate('Signin');
                return;
            }
    
            const response = await axios.post(
                `https://serverdados-8805a7170f22.herokuapp.com/last_login/last_astro_data/${userId}`,
                null,
                {
                    headers: {
                        'Authorization': 'Bearer sOMx3opuNm2e26BqKNNiVgsUmWISjVWkyQJGkKmGpvZNFibmoN2uxe3FCCfGSt7vbK9JFNLvm607zyjN7RHTV64Z2pK7sDgbjTegM8I10poSRpzNkApyCu0XtHIQIMrqNN8Us8c40CI3sX9Eo0RKylOV2Lt80dJckgQGec47YcIdTSivy3nU0R7KW5PbMi5OsuwEu0bZRAK818xcOepft4c4v2dIxWRNPEY7TtliPObSiVa7Zs266658b33d6568'
                    }
                }
            );
    
            // Verifica o status da resposta e a mensagem retornada
            if (response.status === 200 && response.data.message === "Ultimo acesso atualizado com sucesso") {
                navigation.navigate('BottomTabBar', { name });
            } else {
                navigation.navigate('Signin');
            }
        } catch (error) {
            console.error('Erro ao tentar fazer login: ', error);
            Alert.alert('Erro', `Erro ao tentar fazer login: ${error.message}`);
            navigation.navigate('Signin');
        } finally {
            setIsLoading(false);
        }
    };
    
    
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
                    <TouchableOpacity 
                        style={[styles.button, isLoading && { backgroundColor: '#D3D3D3' }]} 
                        onPress={handleStartPress}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#000000" />
                        ) : (
                            <Text style={styles.buttonText}>Iniciar</Text>
                        )}
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
        marginTop: 70,
    },
    logo: {
        width: 280,
        height: 180,
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
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 40,
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
