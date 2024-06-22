import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { SafeAreaView, View, StatusBar, Text, ImageBackground, TouchableOpacity, Dimensions, StyleSheet, FlatList, Alert, Linking, Image } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const zodiacSignsList = [
    {
        id: '1',
        zodiacSignImage: require('../../assets/images/zodiac_signs/gemini.png'),
        zodiacSignName: 'Gêmeos'
    },
    {
        id: '2',
        zodiacSignImage: require('../../assets/images/zodiac_signs/aries.png'),
        zodiacSignName: 'Áries',
    },
    {
        id: '3',
        zodiacSignImage: require('../../assets/images/zodiac_signs/taurus.png'),
        zodiacSignName: 'Touro',
    },
    {
        id: '4',
        zodiacSignImage: require('../../assets/images/zodiac_signs/pisces.png'),
        zodiacSignName: 'Peixes',
    },
    {
        id: '5',
        zodiacSignImage: require('../../assets/images/zodiac_signs/aquarius.png'),
        zodiacSignName: 'Aquário',
    },
    {
        id: '6',
        zodiacSignImage: require('../../assets/images/zodiac_signs/leo.png'),
        zodiacSignName: 'Leão',
    },
    {
        id: '7',
        zodiacSignImage: require('../../assets/images/zodiac_signs/cancer.png'),
        zodiacSignName: 'Câncer',
    },
    {
        id: '8',
        zodiacSignImage: require('../../assets/images/zodiac_signs/sagitarius.png'),
        zodiacSignName: 'Sagitário',
    },
    {
        id: '9',
        zodiacSignImage: require('../../assets/images/zodiac_signs/scorpio.png'),
        zodiacSignName: 'Escorpião',
    },
    {
        id: '10',
        zodiacSignImage: require('../../assets/images/zodiac_signs/libra.png'),
        zodiacSignName: 'Libra',
    },
    {
        id: '11',
        zodiacSignImage: require('../../assets/images/zodiac_signs/vigro.png'),
        zodiacSignName: 'Virgem',
    },
    {
        id: '12',
        zodiacSignImage: require('../../assets/images/zodiac_signs/capricorn.png'),
        zodiacSignName: 'Capricórnio',
    },
];

const zodiacScreenMapping = {
    'Gêmeos': 'zodiacHoroscopeDetailGemeosScreen',
    'Áries': 'zodiacHoroscopeDetailAriesScreen',
    'Touro': 'zodiacHoroscopeDetailTouroScreen',
    'Peixes': 'zodiacHoroscopeDetailPeixesScreen',
    'Aquário': 'zodiacHoroscopeDetailAquarioScreen',
    'Leão': 'zodiacHoroscopeDetailLeaoScreen',
    'Câncer': 'zodiacHoroscopeDetailCancerScreen',
    'Sagitário': 'zodiacHoroscopeDetailSagitarioScreen',
    'Escorpião': 'zodiacHoroscopeDetailEscorpiaoScreen',
    'Libra': 'zodiacHoroscopeDetailLibraScreen',
    'Virgem': 'zodiacHoroscopeDetailVirgemScreen',
    'Capricórnio': 'zodiacHoroscopeDetailCapricornioScreen',
};

const HomeScreen = ({ navigation, name }) => {
    const [userData, setUserData] = useState(null);
    const [state, setState] = useState({
        currentSelectedZodiacSign: zodiacSignsList[0].zodiacSignName,
    });

    const fetchUserData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                const response = await axios.get(`https://serverdados-8805a7170f22.herokuapp.com/data/get_astro_data/${userId}`, {
                    headers: {
                        'Authorization': 'Bearer RVj46uupo0TEO5QvWkfXYdfnpOs98xYfo8dbSwAdLKZSfb1A3b4S0OqSzUlQeQ5X4yBZbOGaSJzIilF2QkPs8ACqAQLJwHvxn1kvYwYcg0zlyCEByGXBbbeJ41uC2kCCEsSfmh4kYnG81F7VMGuBxpVmCS8uPA4njUSA4XC7ufIBRoZF7Ncf4raPc5H1qXgBFpOtxWJQkp9jnNENeUP86VLTIQuRckKP69bbyPrxFU2APzZDClPPEXWJcvjhJcqG'
                    }
                });
                if (response.data) {
                    setUserData(response.data);
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados do usuário.');
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [])
    );

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const handleEditInformation = () => {
        Alert.alert(
            "Retornar",
            "Você realmente deseja retornar para o início?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: async () => {
                        try {
                            navigation.navigate('Onboarding'); // Retorna para a tela anterior
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const handleUpdateInformation = () => {
        Alert.alert(
            "Atualizar Dados",
            "Deseja atualizar seus dados?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: () => {
                        console.log("Dados atualizados");
                        Alert.alert('Sucesso', 'Seus dados foram atualizados com sucesso.');
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const handleDeleteInformation = () => {
        Alert.alert(
            "Apagar Registro",
            "Tem certeza de que deseja apagar seu registro?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Confirmar",
                    onPress: () => {
                        console.log("Registro apagado");
                        Alert.alert('Sucesso', 'Seu registro foi apagado com sucesso.');
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const renderButtons = () => (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonMarginTop]} onPress={handleEditInformation}>
                <Text style={styles.buttonText}>Retornar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonMarginTop]} onPress={handleUpdateInformation}>
                <Text style={styles.buttonText}>Atualizar Dados</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonMarginTop]} onPress={handleDeleteInformation}>
                <Text style={styles.buttonText}>Apagar Registro</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            {header()}
                            {aboutPersonalizedHoroscopes()}
                            {horoscopesInfo()}
                            {zodiacSigns()}
                            {renderButtons()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
                />
            </View>
        </SafeAreaView>
    );

    function horoscopesInfo() {
        const space_x = Sizes.fixPadding;

        return (
            <View style={{ marginHorizontal: space_x }}>
                <Text style={{ marginTop: 5, marginHorizontal: Sizes.fixPadding * 1.0, marginBottom: space_x, ...Fonts.blackColor16Bold }}>
                    Horóscopos
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('AstroProfile', { astroData: userData?.astro_data })}
                        style={{ flex: 1, marginHorizontal: space_x / 2 }}
                    >
                        <ImageBackground
                            source={require('../../assets/images/horoscopes/month_horoscope.png')}
                            style={{
                                height: height / 4.7,
                                padding: space_x,
                                justifyContent: 'flex-end',
                            }}
                            borderRadius={space_x - 5.0}
                        >
                            <Text style={{ ...Fonts.whiteColor12Bold }}>
                                Mapa Astral
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('chineseDetailScreen', { chineseZodiac: userData?.chinese_zodiac })}
                        style={{ flex: 1, marginHorizontal: space_x / 2 }}
                    >
                        <ImageBackground
                            source={require('../../assets/images/horoscopes/chinese_zodiac_horoscope.png')}
                            style={{
                                height: height / 4.7,
                                padding: space_x,
                                justifyContent: 'flex-end',
                            }}
                            borderRadius={space_x - 5.0}
                        >
                            <Text style={{ ...Fonts.whiteColor12Bold }}>
                                Signo Chinês
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('weekAdvice', { conselhoAfetivo: userData?.advice_love, conselhoProfissional: userData?.advice_professional, conselhoSaude: userData?.advice_health })}
                        style={{ flex: 1, marginHorizontal: space_x / 2 }}
                    >
                        <ImageBackground
                            source={require('../../assets/conselho.png')}
                            style={{
                                height: height / 4.7,
                                padding: space_x,
                                justifyContent: 'flex-end',
                            }}
                            borderRadius={space_x - 5.0}
                        >
                            <Text style={{ ...Fonts.whiteColor12Bold }}>
                                Conselhos semanais
                            </Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function aboutPersonalizedHoroscopes() {
        const dailyAdvice = userData?.daily_advice || 'Nenhum conselho disponível.';
        return (
            <View style={{ marginTop: 50, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    Conselho diário
                </Text>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor12Regular }}>
                    {dailyAdvice}
                </Text>
            </View>
        );
    }

    function zodiacSigns() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({ currentSelectedZodiacSign: item.zodiacSignName });
                    const screenName = zodiacScreenMapping[item.zodiacSignName];
                    if (screenName) {
                        navigation.push(screenName, { item: item });
                    } else {
                        console.warn(`No screen found for zodiac sign: ${item.zodiacSignName}`);
                    }
                }}
                style={styles.zodiacSignsWrapStyle}
            >
                {
                    state.currentSelectedZodiacSign !== item.zodiacSignName
                        ? <View style={styles.zodiacSignImageWrapStyle}>
                            <Image
                                source={item.zodiacSignImage}
                                style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                            />
                        </View>
                        : <LinearGradient
                            colors={[
                                Colors.primaryColor,
                                Colors.secondaryColor,
                            ]}
                            style={styles.zodiacSignImageWrapStyle}
                        >
                            <Image
                                source={item.zodiacSignImage}
                                style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                            />
                        </LinearGradient>
                }
                <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.blackColor10Regular }}>
                    {item.zodiacSignName}
                </Text>
            </TouchableOpacity>
        );
        return (
            <View style={{
                paddingHorizontal: Sizes.fixPadding + 6.5,
                paddingVertical: Sizes.fixPadding * 2.0,
            }}>
                <Text style={{ marginTop: 5, marginHorizontal: Sizes.fixPadding * 0.5, marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    Signos do zodíaco
                </Text>
                <FlatList
                    data={zodiacSignsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={6}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>
        );
    }

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) {
            return 'Bom dia';
        } else if (hour < 18) {
            return 'Boa tarde';
        } else {
            return 'Boa noite';
        }
    }

    function header() {
        const greeting = getGreeting();
        return (
            <LinearGradient
                style={styles.headerWrapStyle}
                colors={[Colors.secondaryColor, Colors.primaryColor]}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', flex: 1, ...Fonts.whiteColor14SemiBold }}>
                        {`${greeting} ${name}, fique à vontade para se conhecer`}
                    </Text>
                </View>
            </LinearGradient>
        );
    }
};

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.0,
        borderBottomLeftRadius: Sizes.fixPadding * 2.0,
        borderBottomRightRadius: Sizes.fixPadding * 2.0,
    },
    zodiacSignsWrapStyle: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding - 6.5,
        marginBottom: Sizes.fixPadding + 2.0,
    },
    zodiacSignImageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: '#EBEBEB',
        borderWidth: 1.0,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: Sizes.fixPadding - 2.0,
    },
    buttonContainer: {
        marginTop: 30,
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#003366',
        borderRadius: 4,
        paddingVertical: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonMarginTop: {
        marginTop: 15,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
