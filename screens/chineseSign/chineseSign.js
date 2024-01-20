import React, { useState } from "react";
import { ImageBackground,SafeAreaView, View, Dimensions, StatusBar, FlatList, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";

const { width } = Dimensions.get('window');

const signsList = [
    {
        id: '1',
        signImage: require('../../assets/images/horoscopes/rat.png'),
        signName: 'Rato',
        signDetail: 'Pessoas do signo de Rato são vistas como inteligentes, engenhosas e versáteis. Com uma natureza afável e uma personalidade encantadora, elas são sociais e sempre populares em grupos. São ambiciosas e boas com finanças, mas podem ser vistas como oportunistas.',
    },
    {
        id: '2',
        signImage: require('../../assets/images/horoscopes/ox.png'),
        signName: 'Boi',
        signDetail: 'Indivíduos nascidos sob este signo são fortes, confiáveis e meticulosos. Conhecidos pela sua paciência e ética de trabalho, eles são determinados e preferem uma abordagem metódica para a vida. No entanto, podem ser teimosos e resistentes a mudanças.',
    },
    {
        id: '3',
        signImage: require('../../assets/images/horoscopes/tiger.png'),
        signName: 'Tigre',
        signDetail: 'Os Tigres são corajosos, apaixonados e dispostos a lutar pelo que acreditam. Eles são líderes naturais, embora possam ser imprudentes e impulsivos. Sua natureza audaciosa e confiante os torna irresistíveis, mas também podem ser egoístas.',
    },
    {
        id: '4',
        signImage: require('../../assets/images/horoscopes/rabbit.png'),
        signName: 'Coelho',
        signDetail: 'Pessoas do Coelho são amáveis, sensíveis e compassivas. Eles valorizam a harmonia e evitam conflitos. Sua natureza reservada e diplomática os faz bons amigos e conselheiros, mas podem tender a evitar riscos e serem indecisas.',
    },
    {
        id: '5',
        signImage: require('../../assets/images/horoscopes/dragon.png'),
        signName: 'Dragão',
        signDetail: 'Pessoas do signo de Dragão são poderosas, ousadas e carismáticas. Eles são naturalmente confiantes e atraem admiradores, mas sua busca pela perfeição pode levá-los a serem exigentes e arrogantes.',
    },
    {
        id: '6',
        signImage: require('../../assets/images/horoscopes/snake.png'),
        signName: 'Serpente',
        signDetail: 'Indivíduos do signo de Serpente são inteligentes, sábios e intuitivos. Eles são pensadores profundos, frequentemente filosóficos, mas também podem ser desconfiados e secretos.',
    },
    {
        id: '7',
        signImage: require('../../assets/images/horoscopes/horse.png'),
        signName: 'Cavalo',
        signDetail: 'Os Cavalos são energéticos, independentes e aventureiros. Eles adoram a liberdade e são sociais, mas sua impaciência e desejo de independência podem levar a impulsividade.',
    },
    {
        id: '8',
        signImage: require('../../assets/images/horoscopes/sheep.png'),
        signName: 'Cabra',
        signDetail: 'Pessoas da Cabra são criativas, gentis e pacíficas. Elas têm um forte senso estético e são muito imaginativas, mas podem ser excessivamente ansiosas e preferem evitar confrontos.',
    },
    {
        id: '9',
        signImage: require('../../assets/images/horoscopes/monkey.png'),
        signName: 'Macaco',
        signDetail: 'Os Macacos são inteligentes, rápidos e extremamente curiosos. Eles são mestres em resolver problemas e têm um excelente senso de humor, mas podem ser trapaceiros e inquietos.',
    },
    {
        id: '10',
        signImage: require('../../assets/images/horoscopes/rooster.png'),
        signName: 'Galo',
        signDetail: 'Indivíduos do signo de Galo são práticos, pontuais e orgulhosos. Eles são conhecidos por sua honestidade e trabalho árduo, mas podem ser críticos e arrogantes.',
    },
    {
        id: '11',
        signImage: require('../../assets/images/horoscopes/dog.png'),
        signName: 'Cão',
        signDetail: 'Pessoas do signo de Cão são leais, honestas e justas. Eles são confiáveis e valorizam a justiça, mas podem ser teimosos e ter uma tendência para se preocupar excessivamente.',
    },
    {
        id: '12',
        signImage: require('../../assets/images/horoscopes/pig.png'),
        signName: 'Porco',
        signDetail: 'Os Porcos são generosos, amáveis e alegres. Eles adoram prazeres e são muito leais, mas podem ser ingênuos e indulgentes.',
    },
];

const chineseSign = ({ navigation, route }) => {
    const { chineseZodiac } = route.params;

    const userSign = signsList.find(sign => sign.signName === chineseZodiac);
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {signs()}
                            {aboutPersonalizedHoroscopes()}
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )

    function aboutPersonalizedHoroscopes() {
        if (!userSign) {
            return <Text>Sign detail not found</Text>;
        }
    
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, alignItems: 'center' }}>

                <Text style={{ marginTop: Sizes.fixPadding * 6.0, textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    Sobre seu signo:
                </Text>
                <Text style={{ ...Fonts.grayColor12Regular, marginTop: Sizes.fixPadding * 2.0,textAlign: 'center',fontSize:16 }}>
                    {userSign.signDetail}
                </Text>
            </View>
        )
    }
    

    function signs() {
        const userSign = signsList.find(sign => sign.signName === chineseZodiac);

        if (!userSign) {
            return <Text>Sign not found</Text>;
        }
    
        return (
            <View style={{ marginTop: Sizes.fixPadding * 4.0, alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Image
                    source={userSign.signImage}
                    style={{ width: 60.0, height: 60.0, resizeMode: 'contain' }} // Tamanho da imagem aumentado
                />
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    {userSign.signName}
                </Text>
            </View>
        );
    }
    

    function header() {
        return (
            <ImageBackground
                source={require('../../assets/images/bg1.jpg')} // Substitua pelo caminho correto da sua imagem
                style={styles.headerWrapStyle}
                resizeMode="cover" // Isso garante que a imagem cubra todo o espaço disponível
            >
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ marginLeft: Sizes.fixPadding - 5.0, }}>
                        <Text style={{ ...Fonts.whiteColor18Bold }}>
                            Signo Chinês
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.0,
        borderBottomLeftRadius: Sizes.fixPadding * 3.0,
        borderBottomRightRadius: Sizes.fixPadding * 3.0,
    },
    signImageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding * 1.5,
    },
    personalizedHoroscopeWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 1.5,
        borderRadius: Sizes.fixPadding - 5.0,
        width: width / 1.97,
        padding: Sizes.fixPadding,
        marginRight: Sizes.fixPadding * 2.0,
        borderColor: '#eeeeee',
        borderWidth: 1.0,
    },
    button: {
        backgroundColor: '#003366',
        borderRadius: 4,
        paddingVertical: 8,
        width: '100%',
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:5
      },
      buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
      }
});

export default chineseSign;