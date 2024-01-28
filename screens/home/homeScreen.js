import React, { useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView, View, StatusBar, Text, ImageBackground, TouchableOpacity, Dimensions, StyleSheet, Image, FlatList } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking, Alert } from 'react-native';


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
    'Escorpião': 'zodiacHoroscopeDetailEscorpiaoScreen', // Nota: O nome do signo está em minúsculas e em português
    'Libra': 'zodiacHoroscopeDetailLibraScreen',
    'Virgem': 'zodiacHoroscopeDetailVirgemScreen', // Nota: Parece haver um erro de digitação. Deveria ser "Virgo"?
    'Capricórnio': 'zodiacHoroscopeDetailCapricornioScreen',
};


const bannersList = [
    {
        id: '1',
        title: 'Lide com seu stress',
        description: 'Consulte nossos especialistas afim de poder ver as melhores formas de curar o que te estressa',
    },
    {
        id: '2',
        title: 'Relacionamentos',
        description: 'Descubra quem será o amor da sua vida, e descubra como evitar relacionamentos tóxicos.',
    },
];

const topAstrologerList = [
    {
        id: '1',
        astrologerImage: require('../../assets/images/users/user1.png'),
        astrologerName: 'Roberto Garcia',
        astrologerSpeciality: 'Amor e Dinheiro',
        astrologerPromotion:'50% de desconto',
        astrologerScreen: 'AstrologerDetail1'
    },
    {
        id: '2',
        astrologerImage: require('../../assets/images/users/user2.png'),
        astrologerName: 'Ricardo Silva',
        astrologerSpeciality: 'Paz e Segurança',
        astrologerPromotion:'Primeira consulta grátis',
        astrologerScreen: 'AstrologerDetail2'
    },
    {
        id: '3',
        astrologerImage: require('../../assets/images/users/user3.png'),
        astrologerName: 'Alice Miranda',
        astrologerSpeciality: 'Amor e Saúde',
        astrologerPromotion:'Pague 2 e receba 3 consultas',
        astrologerScreen: 'AstrologerDetail3'
    },
];

const HomeScreen = ({ navigation, userData, name, phone, astroData, chineseZodiac,conselhoProfissional, conselhoSaude, conselhoAfetivo}) => {

    // Definir userData em um estado local
    const [userDetails, setUserDetails] = useState(userData);
    
    const [state, setState] = useState({ currentSelectedZodiacSign: zodiacSignsList[9].zodiacSignName, })
    const updateState = (data) => setState((state) => ({ ...state, ...data }))
    

    useEffect(() => {
        if (userDetails) {
            getAstroData();
        }
    }, [userDetails]);

    const callWhatsApp = (phone) => {
        let url = `whatsapp://send?phone=${phone}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    console.log('WhatsApp não está instalado neste dispositivo.');
                    Alert.alert('Erro', 'WhatsApp não está instalado neste dispositivo.');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => {
                console.error('Um erro ocorreu', err);
                Alert.alert('Erro', 'Ocorreu um erro ao tentar abrir o WhatsApp.');
            });
    };
    
    

    const {
        currentSelectedZodiacSign,
    } = state;

    const renderButtons = () => {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.buttonMarginTop]} 
                    onPress={handleEditInformation} 
                >
                    <Text style={styles.buttonText}>Retornar</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
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
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
            
                <FlatList
                    ListHeaderComponent={
                        <>
                            {header()}
                            {banners()}
                            {horoscopesInfo()}
                            {zodiacSigns()}
                            {topAstrologers()}
                            {renderButtons()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                />
            </View>
        </SafeAreaView>
    )
    
    
    function topAstrologers() {

        const renderItem = ({ item }) => (
            <View style={styles.topAstrologerWrapStyle}>
                <Image
                    source={item.astrologerImage}
                    style={styles.astrologerImageStyle}
                />
                <View style={{
                    width: width / 2.8,
                    paddingTop: Sizes.fixPadding - 5.0,
                    paddingBottom: Sizes.fixPadding,
                }}>
                    <View style={{ paddingHorizontal: Sizes.fixPadding - 5.0, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {item.astrologerName}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor11Regular }}>
                            {item.astrologerSpeciality}
                        </Text>
                        <Text>
                            <Text style={{ ...Fonts.grayColor11Regular }}>
                                Promoção: { }
                            </Text>
                            <Text style={{ ...Fonts.blackColor11SemiBold }}>
                                {item.astrologerPromotion}
                            </Text>
                        </Text>
                    </View>
                    <View style={{ height: 2.0, backgroundColor: '#EEEEEE', marginVertical: Sizes.fixPadding - 5.0, }} />
                    <View style={{ ...styles.viewProfileAndMessageTextWrapStyle, alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            onPress={() => navigation.push(item.astrologerScreen, { item: item })}
                            style={{ ...Fonts.primaryColor10Bold }}
                        >
                            Ver Perfil
                        </Text>
                    </View>
                    </View>

            </View>
        )
        return (
            <View>
                <Text style={{ marginTop:20,marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Bold }}>
                    Nossos Astrólogos
                </Text>
                <FlatList
                    data={topAstrologerList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingVertical: Sizes.fixPadding * 2.0
                    }}
                />
            </View>
        )
    }

    function horoscopesInfo() {
        // Considerando Sizes.fixPadding para o espaçamento_x
        const space_x = Sizes.fixPadding;
    
        return (
            <View style={{ marginHorizontal: space_x }}>
                <Text style={{marginTop:5,marginHorizontal: Sizes.fixPadding * 1.0, marginBottom: space_x, ...Fonts.blackColor16Bold }}>
                    Horóscopos
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('AstroProfile', { astroData: astroData })}
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
                        onPress={() => navigation.push('chineseDetailScreen', { chineseZodiac: chineseZodiac })}
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
                        onPress={() => navigation.push('weekAdvice', { conselhoAfetivo: conselhoAfetivo,conselhoProfissional: conselhoProfissional, conselhoSaude: conselhoSaude })}
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
        )
    }
    

    function banners() {
        
        const renderItem = ({ item }) => (
            <View style={{marginTop:30, marginRight: Sizes.fixPadding * 2.0, }}>
                <ImageBackground
                    source={require('../../assets/images/container_bg.png')}
                    style={styles.bannerImageStyle}
                    borderRadius={Sizes.fixPadding - 5.0}
                    resizeMode="stretch"
                >
                    <View style={{ flex: 0.7, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.whiteColor14ExtraBold }}>
                            {item.title}
                        </Text>
                        <Text numberOfLines={3} style={{ marginTop: Sizes.fixPadding - 5.0, marginBottom: Sizes.fixPadding + 10.0, ...Fonts.whiteColor10Light }}>
                            {item.description}
                        </Text>
                        <View style={styles.bannerCallInfoWrapStyle}>
                            <View style={styles.phoneIconWrapStyle}>
                                <MaterialIcons
                                    name="phone"
                                    color={Colors.whiteColor}
                                    size={12}
                                />
                            </View>
                            <TouchableOpacity onPress={() => callWhatsApp('+5511942605714')}>
                                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor10Black }}>
                                    Ligar para o astrólogo
                                </Text>
                             </TouchableOpacity>
                        </View>
                    </View>
                    <MaterialCommunityIcons
                        name="lock"
                        color={Colors.whiteColor}
                        size={13}
                        style={{ position: 'absolute', right: 10.0, top: 5.0, }}
                    />
                </ImageBackground>
            </View>
        )
        return (
            <View>
                <FlatList
                    data={bannersList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingBottom: Sizes.fixPadding * 2.0,
                    }}
                />
            </View>
        )
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
                    currentSelectedZodiacSign != item.zodiacSignName
                        ?
                        < View style={styles.zodiacSignImageWrapStyle}>
                            <Image
                                source={item.zodiacSignImage}
                                style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                            />
                        </View>
                        :
                        <LinearGradient
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
        )
        return (
            
            <View style={{
                paddingHorizontal: Sizes.fixPadding + 6.5,
                paddingVertical: Sizes.fixPadding * 2.0,
            }}>

                <Text style={{marginTop: 5, marginHorizontal: Sizes.fixPadding * 0.5, marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
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
        )
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
        const greeting = getGreeting(); // Obter a saudação apropriada baseada na hora atual
    
        return (
            <LinearGradient
                style={styles.headerWrapStyle}
                colors={[Colors.secondaryColor, Colors.primaryColor]}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', flex: 1, ...Fonts.whiteColor14SemiBold }}>
                        {`${greeting} ${name}, fique á vontade para se conhecer`} 
                    </Text>
                </View>
            </LinearGradient>
        );
    }

}

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
        elevation: 3.0,
        paddingVertical: Sizes.fixPadding - 2.0,
    },
    phoneIconWrapStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerCallInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        alignSelf: 'flex-start',
        padding: Sizes.fixPadding - 7.0,
        borderRadius: Sizes.fixPadding - 7.0,
    },
    bannerImageStyle: {
        width: width - 70.0,
        height: 160.0,
        flexDirection: 'row',
        paddingTop: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
    },
    horoscopesWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    othersFeaturesInfoWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        marginRight: Sizes.fixPadding * 2.0,
    },
    otherFeaturesImageStyle: {
        height: height / 8.5,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0,
        width: width / 3.0,
    },
    otherFeaturesDetailWrapStyle: {
        width: width / 3.0,
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding - 5.0,
    },
    astrologerImageStyle: {
        height: height / 8.5,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0,
        width: width / 2.8,
    },
    viewProfileAndMessageTextWrapStyle: {
        paddingHorizontal: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    topAstrologerWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        marginRight: Sizes.fixPadding * 2.0,
    },

    buttonContainer: {
        marginTop:30,
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
})

export default HomeScreen;