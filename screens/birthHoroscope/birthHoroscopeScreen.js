import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const userAstologicalBirthDataList = [
    {
        id: '1',
        planet: 'Sun',
        positionDegrees: 15,
        sign: 'Aquarius',
        positionMinutes: 45,
    },
    {
        id: '2',
        planet: 'Moon',
        positionDegrees: 7,
        sign: 'Libra',
        positionMinutes: 25,
    },
    {
        id: '3',
        planet: 'Mercury',
        positionDegrees: 15,
        sign: 'Aquarius',
        positionMinutes: 20,
    },
    {
        id: '4',
        planet: 'Venus',
        positionDegrees: 7,
        sign: 'Pieces',
        positionMinutes: 38,
    },
    {
        id: '5',
        planet: 'Mars',
        positionDegrees: 15,
        sign: 'Scorpio',
        positionMinutes: '08',
    },
    {
        id: '6',
        planet: 'Jupiter',
        positionDegrees: 7,
        sign: 'Pieces',
        positionMinutes: 20,
    },
    {
        id: '7',
        planet: 'Saturn',
        positionDegrees: 15,
        sign: 'Aries',
        positionMinutes: 49,
    },
    {
        id: '8',
        planet: 'Uranus',
        positionDegrees: 7,
        sign: 'Aquarius',
        positionMinutes: 51,
    },
    {
        id: '9',
        planet: 'Naptune',
        positionDegrees: 7,
        sign: 'Aquarius',
        positionMinutes: 20,
    },
    {
        id: '10',
        planet: 'Pluto',
        positionDegrees: 15,
        sign: 'Sagittarius',
        positionMinutes: 26,
    },
    {
        id: '11',
        planet: 'North Node',
        positionDegrees: 7,
        sign: 'Leo',
        positionMinutes: 32,
    },
];

const aboutUserHoroscopes = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
];

const BirthHoroscopeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {aboutUserHoroscope()}
                            {userAstrologicalBirthData()}
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )

    function userAstrologicalBirthData() {

        const renderItem = ({ item, index }) => (
            <View style={{ padding: Sizes.fixPadding, backgroundColor: index % 2 == 0 ? Colors.whiteColor : '#F4F5F8', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ flex: 1, ...Fonts.blackColor13Medium }}>
                    {item.planet}
                </Text>
                <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor13Medium }}>
                    {item.positionDegrees}
                </Text>
                <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor13Medium }}>
                    {item.sign}
                </Text>
                <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor13Medium }}>
                    {item.positionMinutes}
                </Text>
            </View>
        )

        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    Your astrological birth data
                </Text>
                <View style={{ padding: Sizes.fixPadding, backgroundColor: '#F4F5F8', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 1, ...Fonts.blackColor13SemiBold }}>
                        Planet
                    </Text>
                    <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor13SemiBold }}>
                        Pisition Degrees
                    </Text>
                    <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor13SemiBold }}>
                        Sign
                    </Text>
                    <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor13SemiBold }}>
                        Position Minutes
                    </Text>
                </View>
                <FlatList
                    data={userAstologicalBirthDataList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function aboutUserHoroscope() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding, marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    About your birth horoscope
                </Text>
                <View>
                    {aboutUserHoroscopes.map((item, index) =>
                        <Text
                            key={`${index}`}
                            style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor12Regular }}
                        >
                            {item}
                        </Text>
                    )}
                </View>
            </View>
        )
    }

    function header() {
        return (
            <LinearGradient
                style={styles.headerWrapStyle}
                colors={[Colors.secondaryColor, Colors.primaryColor,]}
            >
                <View style={{ paddingVertical: Sizes.fixPadding * 4.0, flex: 1 }}>
                    <MaterialIcons
                        name="arrow-back-ios"
                        color={Colors.whiteColor}
                        size={22}
                        onPress={() => navigation.pop()}
                    />
                    <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
                        <Text style={{ ...Fonts.whiteColor18Bold }}>
                            Birth Horoscope
                        </Text>
                        <Text style={{ ...Fonts.whiteColor12Light }}>
                            With Natal Chart
                        </Text>
                    </View>
                </View>
                <Image
                    source={require('../../assets/images/bg3.png')}
                    style={{
                        height: '100%',
                        flex: 1,
                        resizeMode: 'contain',
                    }}
                />
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderBottomLeftRadius: Sizes.fixPadding * 3.0,
        borderBottomRightRadius: Sizes.fixPadding * 3.0,
    },
});

export default BirthHoroscopeScreen;