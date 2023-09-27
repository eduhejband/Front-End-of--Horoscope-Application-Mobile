import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, StatusBar, FlatList, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const signsList = [
    {
        id: '1',
        signImage: require('../../assets/images/horoscopes/rat.png'),
        signName: 'Rat',
        signDetail: '1960,1972,1984,1996,2008,2020',
    },
    {
        id: '2',
        signImage: require('../../assets/images/horoscopes/ox.png'),
        signName: 'Ox',
        signDetail: '1961,1972,1984,1996,2008,2020',
    },
    {
        id: '3',
        signImage: require('../../assets/images/horoscopes/tiger.png'),
        signName: 'Tiger',
        signDetail: '1961,1972,1984,1996,2008,2020',
    },
    {
        id: '4',
        signImage: require('../../assets/images/horoscopes/rabbit.png'),
        signName: 'Rabbit',
        signDetail: '1961,1972,1984,1996,2008,2020',
    },
    {
        id: '5',
        signImage: require('../../assets/images/horoscopes/dragon.png'),
        signName: 'Dragon',
        signDetail: '1961,1972,1984,1996,2008,2020',
    },
    {
        id: '6',
        signImage: require('../../assets/images/horoscopes/snake.png'),
        signName: 'Snake',
        signDetail: '1961,1972,1984,1996,2008,2020',
    },
    {
        id: '7',
        signImage: require('../../assets/images/horoscopes/horse.png'),
        signName: 'Horse',
        signDetail: '1961,1972,1984,1996,2008,2020',
    },
    {
        id: '8',
        signImage: require('../../assets/images/horoscopes/sheep.png'),
        signName: 'Sheep',
        signDetail: '1961,1972,1984,1996,2008,2020',
    },
    {
        id: '9',
        signImage: require('../../assets/images/horoscopes/monkey.png'),
        signName: 'Monkey',
        signDetail: '1961,1972,1984,1996,2008,2020',
    },
    {
        id: '10',
        signImage: require('../../assets/images/horoscopes/rooster.png'),
        signName: 'Rooster',
        signDetail: '1961,1972,1984,1996,2008,2020',
    },
    {
        id: '11',
        signImage: require('../../assets/images/horoscopes/dog.png'),
        signName: 'Dog',
        signDetail: '1961,1972,1984,1996,2008,2020',
    },
    {
        id: '12',
        signImage: require('../../assets/images/horoscopes/pig.png'),
        signName: 'Pig',
        signDetail: '1961,1972,1984,1996,2008,2020',
    },
];

const personalizedHoroscopesList = [
    {
        id: '1',
        horoscope: 'Weekly Chinese Horoscope',
        start: 'Aug15',
        end: 'Aug21'
    },
    {
        id: '2',
        horoscope: 'Monthly Chinese Horoscope',
        start: 'Aug15',
        end: 'Aug21'
    },
];

const aboutPersonalizedHoroscopesList = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
];

const HoroscopeDetailScreen = ({ navigation }) => {

    const [state, setState] = useState({ currentSelectedSignId: signsList[3].id, })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { currentSelectedSignId } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {signs()}
                            {personalizedHoroscopes()}
                            {aboutPersonalizedHoroscopes()}
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )

    function aboutPersonalizedHoroscopes() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    About personalized horoscopes
                </Text>
                <View>
                    {aboutPersonalizedHoroscopesList.map((item, index) => (
                        <Text key={`${index}`} style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor12Regular }}>
                            {item}
                        </Text>
                    ))}
                </View>
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
            </View>
        )
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Bold }}>
                    More personalized horoscopes
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

    function signs() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ currentSelectedSignId: item.id })}
                style={{ flex: 1, marginBottom: Sizes.fixPadding + 5.0 }}
            >
                <LinearGradient
                    colors={currentSelectedSignId == item.id ?
                        [Colors.primaryColor, Colors.secondaryColor,]
                        :
                        [Colors.whiteColor, Colors.whiteColor]
                    }
                    style={styles.signImageWrapStyle}
                >
                    <Image
                        source={item.signImage}
                        style={{ width: 30.0, height: 30.0, resizeMode: 'contain' }}
                    />
                </LinearGradient>
                <Text style={{ marginTop: Sizes.fixPadding - 6.0, textAlign: 'center', ...Fonts.blackColor10Regular }}>
                    {item.signName}
                </Text>
                <Text style={{ flex: 1, marginHorizontal: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.grayColor8Regular }}>
                    {item.signDetail}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <FlatList
                    data={signsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={4}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding - 9.0, }}
                />
            </View>
        )
    }

    function header() {
        return (
            <LinearGradient
                style={styles.headerWrapStyle}
                colors={[Colors.secondaryColor, Colors.primaryColor,]}
            >
                <View style={{ flexDirection: 'row', }}>
                    <MaterialIcons
                        name="arrow-back-ios"
                        color={Colors.whiteColor}
                        size={22}
                        onPress={() => navigation.pop()}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding - 5.0, }}>
                        <Text style={{ ...Fonts.whiteColor18Bold }}>
                            Daily Chinese Horoscopes
                        </Text>
                        <Text style={{ ...Fonts.whiteColor12Light }}>
                            Choose your sign
                        </Text>
                    </View>
                </View>
            </LinearGradient>
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
    }
});

export default HoroscopeDetailScreen;