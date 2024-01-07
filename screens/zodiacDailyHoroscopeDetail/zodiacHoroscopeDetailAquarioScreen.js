import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, ScrollView, TouchableOpacity, StatusBar, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CircularProgress from 'react-native-circular-progress-indicator';
import { ImageBackground } from 'react-native';
import { Svg } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const luckyColorsList = ['white', 'yellow', 'green'];
const luckyFlowersList = ['tulip', 'moming', 'glory', 'peach blossom'];

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

const days = Array.from([...range(1, 31)]);

const ZodiacDailyHoroscopeDetailScreen = ({ navigation, route }) => {
    const item = route.params.item;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
                > 
                    {todaysLuckDetail()}
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

    function todaysLuckDetail() {
        return (
            <View style={{ marginTop:30,marginHorizontal: Sizes.fixPadding * 2.0, }}>


                {loveLuckHealthAndMoneyInfo()}
            </View >
        )
    }

    function loveLuckHealthAndMoneyInfo() {
        return (
            <View style={{}}>
                <View style={{ marginVertical: Sizes.fixPadding + 2.0, justifyContent: 'space-between', flexDirection: 'row', marginBottom:30 }}>
                {progressBarWithPercentage({ title: 'Amor', percentage: 70, startColor: '#FFAAAA', endColor: Colors.redColor })}
                {progressBarWithPercentage({ title: 'Saúde', percentage: 75, startColor: '#FFF6A6', endColor: Colors.yellowColor })}
                {progressBarWithPercentage({ title: 'Riqueza', percentage: 78, startColor: '#CCECBA', endColor: Colors.greenColor })}
                </View>
                {loveLuckHealthAndMoneyDetail({
                    title: 'Riquezas',
                    icon: require('../../assets/images/icons/money.png'),
                    iconColor: Colors.greenColor,
                    description: 'Os nativos de Aquário são conhecidos por sua natureza inovadora, mente aberta e capacidade de pensar fora da caixa. Eles são visionários e frequentemente veem oportunidades onde outros não veem. ',
                    titleStyle: { ...Fonts.greenColor14SemiBold }
                })}

                {loveLuckHealthAndMoneyDetail({
                    title: 'Amor',
                    icon: require('../../assets/images/icons/love.png'),
                    iconColor: Colors.redColor,
                    description: 'O Aquariano tem uma abordagem única para o amor, marcada por sua individualidade, independência e visão progressista.',
                    titleStyle: { ...Fonts.redColor14SemiBold }
                })}
                {loveLuckHealthAndMoneyDetail({
                    title: 'Saúde',
                    icon: require('../../assets/images/icons/health.png'),
                    iconColor: Colors.yellowColor,
                    description: 'Aquarianos precisam ter maior cuidado com doenças que dizem respeito aos tornozelos e a circulação, provocando varizes; problemas cardíacos e palpitações; hidropisia; inchaços nas pernas, cãibras e dores nas pernas.',
                    titleStyle: { ...Fonts.yellowColor14SemiBold }
                })}
               
                {loveLuckHealthAndMoneyDetail({
                    title: 'Pontos Positivos',
                    icon: require('../../assets/images/icons/positividade.png'),
                    iconColor: Colors.blueColor,
                    description: 'Visionário e inovador, Aquário é conhecido por seu espírito livre e mente aberta. Valoriza a individualidade e a liberdade.',
                    titleStyle: { ...Fonts.blueColor14SemiBold }
                })}

                {loveLuckHealthAndMoneyDetail({
                    title: 'Elemento',
                    icon: require('../../assets/images/icons/elementosIcon.png'),
                    iconColor: Colors.orangeColor,
                    description: 'Ar: Representa pensamento, comunicação e conexões. Reflete a natureza intelectual e social de Aquário.',
                    titleStyle: { ...Fonts.orangeColor14SemiBold }
                })}

                {loveLuckHealthAndMoneyDetail({
                    title: 'Planetas Regentes',
                    icon: require('../../assets/images/icons/planetIcon.png'),
                    iconColor: Colors.purpleColor,
                    description: 'Saturno traz estrutura e disciplina, enquanto Urano simboliza mudança, inovação e revolução. Juntos, refletem a natureza progressista e, ao mesmo tempo, estruturada de Aquário.',
                    titleStyle: { ...Fonts.purpleColor14SemiBold }
                })}

                {loveLuckHealthAndMoneyDetail({
                    title: 'Pedras Preciosas',
                    icon: require('../../assets/images/icons/pedraIcon.png'),
                    description: 'Ametista para intuição, Sodalita para comunicação, Quartzo Azul para calma e Lápis Lazúli para sabedoria.',
                    titleStyle: { ...Fonts.cyanColor14SemiBold }
                })}
                
            </View>
        )
    }

    function loveLuckHealthAndMoneyDetail({ title, icon, iconColor, description, titleStyle }) {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 5.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={icon}
                        style={{ width: 25.0, height: 25.0, resizeMode: 'contain' }}
                        tintColor={iconColor}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding + 2.0, ...{ ...titleStyle } }}>
                        {title}
                    </Text>
                </View>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor12Regular }}>
                    {description}
                </Text>
            </View>
        )
    }

    function progressBarWithPercentage({ title, percentage, startColor, endColor }) {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                    {title}
                </Text>
                <CircularProgress
                    value={percentage}
                    activeStrokeColor={startColor}
                    activeStrokeSecondaryColor={endColor}
                    radius={width / 10.0}
                    inActiveStrokeColor='#ECECEC'
                    showProgressValue={false}
                />
                <Text style={{ ...Fonts.blackColor14Medium, position: 'absolute', bottom: width * 0.07 }}>
                    {percentage}%
                </Text>
            </View>
        )
    }


    function header() {
        return (
            <ImageBackground
                source={require('../../assets/images/bg1.jpg')} // Substitua pelo caminho correto da sua imagem
                style={styles.headerWrapStyle}
                resizeMode="cover" // Isso garante que a imagem cubra todo o espaço disponível
            >
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{}}>
                            <Text
                                numberOfLines={1}
                                style={{ maxWidth: width - 125.0, ...Fonts.whiteColor18Bold }}
                            >
                                {item.zodiacSignName} 
                            </Text>
                            <Text style={{ ...Fonts.whiteColor12Light }}>
                            21 de Janeiro a 18 de Fevereiro
                            </Text>
                        </View>
                        <Image
                            source={item.zodiacSignImage}
                            style={styles.zodicSignImageStyle}
                        />
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
    zodicSignImageStyle: {
        width: 50.0,
        height: 50.0,
        resizeMode: 'contain',
        tintColor: Colors.secondaryColor,
        marginLeft: Sizes.fixPadding + 5.0,
    },
    daysNameWrapStyle: {
        backgroundColor: Colors.whiteColor,
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: (width * 0.08) / 2.0,
        elevation: 4.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding,
    },

    birthMonthDayAndYearWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding,
    },
    getBirthChartButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding - 5.0,
    },
    birthChartInfoWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding,
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

export default ZodiacDailyHoroscopeDetailScreen;