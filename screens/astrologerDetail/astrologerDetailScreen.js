import React from "react";
import { SafeAreaView, View, StatusBar, TouchableOpacity, Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const aboutAstologersList = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
];

const videosList = [
    {
        id: '1',
        displayImage: require('../../assets/images/users/user3.png'),
        title: 'Weekly Horoscope With Aliza Kelly',
        description: 'January 6 - January 12 | Comopolitan',
    },
    {
        id: '2',
        displayImage: require('../../assets/images/users/user5.png'),
        title: 'Drew\'s News: October Astrology Report',
        description: 'The Drew Barrymore Show',
    },
    {
        id: '3',
        displayImage: require('../../assets/images/users/user6.png'),
        title: 'Solar Eclipse and Dawn Of The Age Of Aquarius',
        description: 'The Drew Barrymore Show',
    }
];

const AstrologerDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {aboutAstrologers()}
                            {socialMediaProfileinfo()}
                            {videosInfo()}
                            {chatAndCallButton()}
                        </>
                    }
                />
            </View>
        </SafeAreaView>
    )

    function chatAndCallButton() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('Message', { item: item })}
                >
                    <LinearGradient
                        colors={[Colors.primaryColor, Colors.secondaryColor,]}
                        style={styles.chatButtonStyle}>
                        <Image
                            source={require('../../assets/images/icons/chat.png')}
                            style={{ ...styles.chatAndCallImageStyle, tintColor: Colors.whiteColor }}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.whiteColor15Bold }}>
                            Chat
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.callButtonStyle}>
                    <MaterialIcons
                        name="call"
                        color={Colors.primaryColor}
                        size={20}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor15Bold }}>
                        Call
                    </Text>
                </View>
            </View>
        )
    }

    function videosInfo() {
        const renderItem = ({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding + 5.0, }}>
                <ImageBackground
                    source={item.displayImage}
                    style={styles.videoDisplayImageStyle}
                    borderRadius={Sizes.fixPadding - 5.0}
                >
                    <MaterialIcons
                        name="play-circle-fill"
                        color={Colors.whiteColor}
                        size={15}
                    />
                </ImageBackground>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                        {item.title}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor12Regular }}>
                        {item.description}
                    </Text>
                </View>
            </View>
        )
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Bold }}>
                    Videos
                </Text>
                <FlatList
                    data={videosList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function socialMediaProfileinfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Bold }}>
                    Social Media Profile
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center' }}>
                    {instagramOption()}
                    {optionsShort({ bgColor: '#2BA5DA', optionImage: require('../../assets/images/icons/twitter.png') })}
                    {optionsShort({ bgColor: Colors.blackColor, optionImage: require('../../assets/images/icons/tiktok.png') })}
                </View>
            </View>
        )
    }

    function optionsShort({ bgColor, optionImage }) {
        return (
            <View style={{ ...styles.socialMediaOptionsWrapStyle, backgroundColor: bgColor }}>
                <Image
                    source={optionImage}
                    style={{ width: 15.0, height: 15.0, tintColor: Colors.whiteColor }}
                    resizeMode="contain"
                />
            </View>
        )
    }

    function instagramOption() {
        return (
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
        )
    }

    function aboutAstrologers() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    About {item.astrologerName}
                </Text>
                <View>
                    {aboutAstologersList.map((item, index) =>
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
            <ImageBackground
                source={require('../../assets/images/users/user4.png')}
                style={{ height: 120.0, width: '100%', justifyContent: 'center' }}
                borderBottomLeftRadius={Sizes.fixPadding * 3.0}
                borderBottomRightRadius={Sizes.fixPadding * 3.0}
            >
                <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <MaterialIcons
                        name="arrow-back-ios"
                        color={Colors.whiteColor}
                        size={22}
                        onPress={() => navigation.pop()}
                    />
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
    }
});


export default AstrologerDetailScreen;