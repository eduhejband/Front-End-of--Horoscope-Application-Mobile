import React from "react";
import { 
    SafeAreaView, View, StatusBar, TouchableOpacity, Dimensions, 
    FlatList, Image, ImageBackground, StyleSheet, Text 
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';

const { width, height } = Dimensions.get('window');

const AstrologerDetailScreen = ({ navigation, route }) => {
    const item = route.params.item;

    const aboutAstologersList = [
        `Olá! Meu nome é ${item.astrologerName}, e sou um astrólogo com mais de 25 anos de experiência em astrologia natal, sinastria e trânsitos. Ao longo dos anos, tive o privilégio de guiar inúmeras almas através dos mistérios do cosmos, ajudando-as a descobrir seus potenciais ocultos, superar desafios e abraçar seu destino cósmico.`,
        "Acredito firmemente que os astros têm histórias a contar sobre cada um de nós, histórias que podem revelar nossos pontos fortes, desafios e as oportunidades que a vida nos reserva. Seja você um cético buscando entender o que a astrologia realmente oferece ou alguém que já sentiu a profunda conexão com o universo, estou aqui para guiá-lo.",
        "Ofereço consultas personalizadas que se adequam às suas necessidades, seja uma análise completa do seu mapa natal, insights sobre relacionamentos através da sinastria ou orientações sobre o que esperar nos próximos meses com base em trânsitos planetários.",
        "Então, se você está buscando clareza, orientação ou simplesmente um novo olhar sobre sua vida através das lentes da astrologia, adoraria ser seu guia. Vamos embarcar nesta jornada cósmica juntos e desvendar o que os astros têm reservado para você!"
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {aboutAstrologers()}
                            {socialMediaProfileinfo()}
                        </>
                    }
                    contentContainerStyle={{ alignItems: 'center' }}
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.pop()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    function socialMediaProfileinfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Bold }}>
                    Redes Sociais
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center' }}>
                    {instagramOption()}
                    {optionsShort({ 
                        bgColor: '#2BA5DA', 
                        optionImage: require('../../assets/images/icons/twitter.png'),
                        link: "https://twitter.com/NASA"
                    })}
                    {optionsShort({ 
                        bgColor: Colors.blackColor, 
                        optionImage: require('../../assets/images/icons/tiktok.png'),
                        link: "https://www.tiktok.com/@washingtonpost"
                    })}
                </View>
            </View>
        );
    }
    
    function optionsShort({ bgColor, optionImage, link }) {
        const handlePressLink = () => {
            Linking.canOpenURL(link)
                .then((supported) => {
                    if (!supported) {
                        console.log("Não é possível abrir a URL:", link);
                    } else {
                        return Linking.openURL(link);
                    }
                })
                .catch((err) => console.error("Ocorreu um erro:", err));
        };
    
        return (
            <TouchableOpacity onPress={handlePressLink}>
                <View style={{ ...styles.socialMediaOptionsWrapStyle, backgroundColor: bgColor, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={optionImage}
                        style={{ width: 25.0, height: 25.0, tintColor: Colors.whiteColor }}
                        resizeMode="contain"
                    />
                </View>
            </TouchableOpacity>
        );
    }
    function instagramOption() {
        const handlePressInstagram = () => {
            const instagramURL = "https://www.instagram.com/natgeo/";
            Linking.canOpenURL(instagramURL)
                .then((supported) => {
                    if (!supported) {
                        console.log("Não é possível abrir a URL:", instagramURL);
                    } else {
                        return Linking.openURL(instagramURL);
                    }
                })
                .catch((err) => console.error("Ocorreu um erro:", err));
        };
    
        return (
            <TouchableOpacity onPress={handlePressInstagram}>
                <LinearGradient
                    colors={[
                        'rgba(81, 91, 212, 1)',
                        'rgba(221, 42, 123, 1)',
                        'rgba(230, 104, 60, 1)',
                        'rgba(240, 148, 51, 1)',
                    ]}
                    style={styles.socialMediaOptionsWrapStyle}
                >
                    <Image
                        source={require('../../assets/images/icons/insta.png')}
                        style={{ width: 15.0, height: 15.0, tintColor: Colors.whiteColor }}
                        resizeMode="contain"
                    />
                </LinearGradient>
            </TouchableOpacity>
        );
    }
    

    function aboutAstrologers() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    Sobre {item.astrologerName}
                </Text>
                <View>
                    {aboutAstologersList.map((aboutText, index) =>
                        <Text
                            key={`${index}`}
                            style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor12Regular }}
                        >
                            {aboutText}
                        </Text>
                    )}
                </View>
            </View>
        );
    }

    function header() {
        return (
            <ImageBackground
                source={require('../../assets/images/container_bg.png')}
                style={{ height: 120.0, width: '100%', justifyContent: 'center' }}
                borderBottomLeftRadius={Sizes.fixPadding * 3.0}
                borderBottomRightRadius={Sizes.fixPadding * 3.0}
            >
                <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <View style={{ marginLeft: Sizes.fixPadding - 5.0, }}>
                        <Text style={{ ...Fonts.whiteColor18Bold }}>
                            {item.astrologerName}
                        </Text>
                        <Text style={{ ...Fonts.whiteColor12Light }}>
                            {item.astrologerSpeciality}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.0,
        borderBottomLeftRadius: Sizes.fixPadding * 3.0,
        borderBottomRightRadius: Sizes.fixPadding * 3.0,
    },
    socialMediaOptionsWrapStyle: {
        width: 35.0,
        height: 35.0,
        borderRadius: 17.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    videoDisplayImageStyle: {
        width: width * 0.144,
        height: height * 0.078,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginRight: Sizes.fixPadding,
    },
    callButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.3,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderColor: '#EEEEEE',
        borderTopWidth: 1.0,
        marginLeft: Sizes.fixPadding,
    },
    chatAndCallImageStyle: {
        width: 17.0,
        height: 17.0,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#003366',
        borderRadius: 4,
        paddingVertical: 8,
        width: '100%',
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});


export default AstrologerDetailScreen;