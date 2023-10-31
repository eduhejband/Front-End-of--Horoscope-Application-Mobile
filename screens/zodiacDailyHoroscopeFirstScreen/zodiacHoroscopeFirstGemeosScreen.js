import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, View, Dimensions, ScrollView, TouchableOpacity,
    StatusBar, Image, StyleSheet, Text
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CircularProgress from 'react-native-circular-progress-indicator';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const ZodiacDailyHoroscopeDetailScreen = ({ navigation, route }) => {
    const { item, userData } = route.params;

    const [userDetails, setUserDetails] = useState(userData);
    const [astroData, setAstroData] = useState({});
    const [dailyAdvice, setDailyAdvice] = useState(null);
    const [isLoading, setIsLoading] = useState(false);   // State for loading
    const [error, setError] = useState(null);           // State for error messages

    useEffect(() => {
        if (userDetails) {
            getAstroData();
        }
    }, [userDetails]);

    const getAstroData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://192.168.20.114:5000/mapa_astral', {
                data_nascimento: userDetails?.data_nascimento,
                hora_nascimento: userDetails?.hora_nascimento,
                cidade_nascimento: userDetails?.cidade_nascimento
            });
    
    
            if (response.data && response.data.daily_advice) {
                setAstroData(response.data);
                setDailyAdvice(response.data.daily_advice);
            }
            
             else {
                if (response.data) {
                    console.error("dailyAdvice missing in the response. API Response:", response.data);
                } else {
                    console.error("Response from API is empty or not as expected.");
                }
            }
        } catch (err) {
            console.error('Error fetching astro data:', err);
            setError('Erro ao buscar dados astrológicos.');
        } finally {
            setIsLoading(false);
        }
    };


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
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding')}>
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
                {progressBarWithPercentage({ title: 'Amor', percentage: 72, startColor: '#FFAAAA', endColor: Colors.redColor })}
                {progressBarWithPercentage({ title: 'Saúde', percentage: 70, startColor: '#FFF6A6', endColor: Colors.yellowColor })}
                {progressBarWithPercentage({ title: 'Riqueza', percentage: 74, startColor: '#CCECBA', endColor: Colors.greenColor })}

                </View>

                {loveLuckHealthAndMoneyDetail({
                    title: 'Riqueza',
                    icon: require('../../assets/images/icons/money.png'),
                    iconColor: Colors.greenColor,
                    description: 'Os geminianos, com sua adaptabilidade e mente aguçada, têm uma abordagem flexível e diversificada em relação à riqueza. São curiosos e estão sempre em busca de novas oportunidades e aventuras. ',
                    titleStyle: { ...Fonts.greenColor14SemiBold }
                })}

                {loveLuckHealthAndMoneyDetail({
                    title: 'Amor',
                    icon: require('../../assets/images/icons/love.png'),
                    iconColor: Colors.redColor,
                    description: 'Os geminianos são conhecidos por sua natureza comunicativa, versátil e muitas vezes imprevisível. No amor, eles buscam estímulo mental e uma conexão que os mantenha engajados e interessados. ',
                    titleStyle: { ...Fonts.redColor14SemiBold }
                })}
                {loveLuckHealthAndMoneyDetail({
                    title: 'Saúde',
                    icon: require('../../assets/images/icons/health.png'),
                    iconColor: Colors.yellowColor,
                    description: 'Geminianos precisam ter mais cuidado com as doenças dos pulmões e dos nervos, a pneumonia, a pleurisia, as fraturas de braços, ombros e mãos. Mercúrio, regente de Gêmeos, ocasiona problemas de nevralgias, vertigens, problemas nervosos, irritação da garganta, flatulência e gazes, cólicas, irregularidade nas funções menstruais e reumatismo.',
                    titleStyle: { ...Fonts.yellowColor14SemiBold }
                })}
               
                {loveLuckHealthAndMoneyDetail({
                    title: 'Pontos Positivos',
                    icon: require('../../assets/images/icons/positividade.png'),
                    iconColor: Colors.blueColor,
                    description: 'Versátil, comunicativo e intelectual. Adora aprender e compartilhar conhecimento.',
                    titleStyle: { ...Fonts.blueColor14SemiBold }
                })}

                {loveLuckHealthAndMoneyDetail({
                    title: 'Elemento',
                    icon: require('../../assets/images/icons/elementosIcon.png'),
                    iconColor: Colors.orangeColor,
                    description: 'Ar: Representa a mente, a comunicação e a conexão. Sempre em busca de novas ideias.',
                    titleStyle: { ...Fonts.orangeColor14SemiBold }
                })}

                {loveLuckHealthAndMoneyDetail({
                    title: 'Planeta Regente',
                    icon: require('../../assets/images/icons/planetIcon.png'),
                    iconColor: Colors.purpleColor,
                    description: 'Mercúrio: Planeta da comunicação, da mente e do intelecto. Estimula a curiosidade.',
                    titleStyle: { ...Fonts.purpleColor14SemiBold }
                })}

                {loveLuckHealthAndMoneyDetail({
                    title: 'Pedras Preciosas',
                    icon: require('../../assets/images/icons/pedraIcon.png'),
                    description: 'Ágata para equilíbrio, Olho de Tigre para proteção e Hematita para foco.',
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
            <LinearGradient
                style={styles.headerWrapStyle}
                colors={[Colors.secondaryColor, Colors.primaryColor]}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', flex: 1, ...Fonts.whiteColor14SemiBold }}>
                        {dailyAdvice}
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