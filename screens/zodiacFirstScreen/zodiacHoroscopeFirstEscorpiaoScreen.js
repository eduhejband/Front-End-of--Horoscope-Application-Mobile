import React from 'react';
import {
    SafeAreaView, View, Dimensions, ScrollView, TouchableOpacity,
    StatusBar, Image, StyleSheet, Text
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import CircularProgress from 'react-native-circular-progress-indicator';

const { width } = Dimensions.get('window');

const ZodiacFirstHoroscopeDetailScreen = ({ navigation, route }) => {
    const { dailyAdvice, conselhoProfissional, conselhoSaude, conselhoAfetivo, name, astroData, chineseZodiac } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header(dailyAdvice)}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
                >
                    {todaysLuckDetail()}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding')}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BottomTabBar', {name:name, astroData: astroData, chineseZodiac: chineseZodiac})}>
                        <Text style={styles.buttonText}>Outras Informações</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
            <View>
                {loveLuckHealthAndMoneyDetail({
                    title: 'Riqueza',
                    icon: require('../../assets/images/icons/money.png'),
                    iconColor: Colors.greenColor,
                    description: conselhoProfissional,
                    titleStyle: { ...Fonts.greenColor14SemiBold }
                })}
                {loveLuckHealthAndMoneyDetail({
                    title: 'Amor',
                    icon: require('../../assets/images/icons/love.png'),
                    iconColor: Colors.redColor,
                    description: conselhoAfetivo,
                    titleStyle: { ...Fonts.redColor14SemiBold }
                })}
                {loveLuckHealthAndMoneyDetail({
                    title: 'Saúde',
                    icon: require('../../assets/images/icons/health.png'),
                    iconColor: Colors.yellowColor,
                    description: conselhoSaude,
                    titleStyle: { ...Fonts.yellowColor14SemiBold }
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

    function header(dailyAdvice) {
        return (
            <LinearGradient
                style={styles.headerWrapStyle}
                colors={[Colors.secondaryColor, Colors.primaryColor]}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', flex: 1, ...Fonts.whiteColor14SemiBold }}>
                        {dailyAdvice ? dailyAdvice : 'Carregando conselho...'}
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#003366',
        borderRadius: 4,
        paddingVertical: 8,
        width: '48%', // Distribui os botões em 48% da largura da tela
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
});

export default ZodiacFirstHoroscopeDetailScreen;