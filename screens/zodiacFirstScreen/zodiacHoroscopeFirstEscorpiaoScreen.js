import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, StatusBar, FlatList, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking, Alert } from 'react-native';

const { width } = Dimensions.get('window');



const personalizedHoroscopesList = [
    {
        id: '1',
        horoscope: 'Consulta sobre saúde',
        start: '07:00',
        end: '21:00'
    },
    {
        id: '2',
        horoscope: 'Consulta sobre Relacionamentos',
        start: '09:00',
        end: '22:00'
    },
];


const ZodiacFirstHoroscopeDetailScreen = ({ navigation, route }) => {

    const { dailyAdvice, conselhoProfissional, conselhoSaude, conselhoAfetivo, name, astroData, chineseZodiac } = route.params;
   
    const aboutPersonalizedHoroscopesList = [dailyAdvice];
    const phone = ['9999999999'];
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
    
    
   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {aboutPersonalizedHoroscopes()}
                            {personalizedHoroscopes()}
                            {whatIsHoroscope()}
                            
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding')}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BottomTabBar', {name:name, astroData: astroData, chineseZodiac: chineseZodiac,conselhoProfissional: conselhoProfissional, phone:phone, conselhoSaude: conselhoSaude,conselhoAfetivo: conselhoAfetivo,})}>
                        <Text style={styles.buttonText}>Outras Informações</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )

    function aboutPersonalizedHoroscopes() {
        return (
            <View style={{ marginTop:50,marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    Conselho diário
                </Text>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor12Regular }}>
                    {aboutPersonalizedHoroscopesList[0]}
                </Text>
            </View>
        )
    }
    
    function personalizedHoroscopes() {

        const renderItem = ({ item }) => (
            <View style={styles.personalizedHoroscopeWrapStyle}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...Fonts.blackColor13Medium }}>
                        {item.horoscope}
                    </Text>
                    <Text style={{ ...Fonts.blackColor12Regular }}>
                        {item.start} - {item.end}
                    </Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                    <Image
                        source={require('../../assets/images/horoscopes/weekly_horoscope.png')}
                        style={{ resizeMode: 'contain', height: 60, width: 60, }}
                    />
                </View>
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
        )
        return (
            <View>
                <Text style={{ marginTop:30,marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Bold }}>
                    Está com algum problema? Ligue para nós, primeira consulta gratuíta
                </Text>
                <FlatList
                    data={personalizedHoroscopesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingTop: Sizes.fixPadding + 5.0,
                        paddingBottom: Sizes.fixPadding * 2.0,
                    }}
                />
            </View>
        )
    }
    

    function whatIsHoroscope() {
        return (
            <View style={{ marginTop:30, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    Afinal, o que é Astrologia?
                </Text>
                <View>
                    <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor12Regular }}>
                    Doutrina, estudo, arte ou prática, cujo objetivo é decifrar a influência dos astros no curso dos acontecimentos terrestres e na vida das pessoas, em suas características psicológicas e em seu destino, explicar o mundo e predizer o futuro de povos ou indivíduos; uranoscopia.
                    </Text>            
                </View>
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
                    {'Seu signo é, ' + astroData.Sun}
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