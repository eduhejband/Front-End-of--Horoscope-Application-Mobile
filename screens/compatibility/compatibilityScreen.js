import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Menu, MenuItem } from 'react-native-material-menu';
import { Colors, Fonts, Sizes } from "../../constants/styles";

const compatibilityOptions = [
    {
        id: '1',
        compatibilityOption: 'Work',
        compatibilityIcon: require('../../assets/images/icons/work.png')
    },
    {
        id: '2',
        compatibilityOption: 'Love',
        compatibilityIcon: require('../../assets/images/icons/love.png')
    },
    {
        id: '3',
        compatibilityOption: 'Chinese',
        compatibilityIcon: require('../../assets/images/icons/chinese_compatibility.png')
    },
];

const signsList = ['Gemini', 'Aries', 'Taurus', 'Pisces', 'Aquarius', 'Leo', 'Cancer', 'Sagittarius', 'Scorpio', 'Libra', 'Vigro', 'Capricorn'];

const CampatibilityScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedCompatibilityOption: compatibilityOptions[0].compatibilityOption,
        firstMathSign: 'Libra',
        secondMatchSign: 'Gemini',
        showFirstMathSigns: false,
        showSecondMatchSigns: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedCompatibilityOption,
        firstMathSign,
        secondMatchSign,
        showFirstMathSigns,
        showSecondMatchSigns
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {compatibilityInfo()}
                            {compabilitysOption()}
                            {compabilityDetail()}
                            {chooseTwoSignInfo()}
                            {getCompatibilityButton()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )

    function getCompatibilityButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('CompatibilityDetail', {
                    item: {
                        selectedCompatibilityOption: selectedCompatibilityOption,
                        firstMathSign: firstMathSign,
                        secondMatchSign: secondMatchSign,
                    }
                })}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding * 3.0, }}
            >
                <LinearGradient
                    colors={[Colors.primaryColor, Colors.secondaryColor]}
                    style={styles.getCompatibilityButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor15Bold }}>
                        Get Your Compatibility
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    function chooseTwoSignInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor12SemiBold }}>
                    CHOOSE TWO SIGN TO CREATE YOUR MATCH
                </Text>
                <View style={{ marginTop: Sizes.fixPadding * 3.5, flexDirection: 'row', }}>
                    <View style={{ flex: 1, }}>
                        <View style={styles.signInfoWrapStyle}>
                            <Text style={{ ...Fonts.cyanColor12SemiBold }}>
                                {firstMathSign}
                            </Text>
                            <Text style={{ ...Fonts.cyanColor12SemiBold, marginTop: Sizes.fixPadding - 5.0, }}>
                                Sep 22 - Oct 23
                            </Text>
                            <Image
                                source={require('../../assets/images/icons/libra.png')}
                                style={styles.signRepresentsImageStyle}
                            />
                        </View>
                        <Menu
                            visible={showFirstMathSigns}
                            style={{ backgroundColor: Colors.whiteColor, }}
                            anchor={
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => updateState({ showFirstMathSigns: true })}
                                    style={styles.signSelectionWrapStyle}
                                >
                                    <Text style={{ flex: 1, ...Fonts.blackColor12Medium }}>
                                        {firstMathSign}
                                    </Text>
                                    <MaterialIcons
                                        name="arrow-drop-down"
                                        color={Colors.blackColor}
                                        size={22}
                                    />
                                </TouchableOpacity>
                            }
                            onRequestClose={() => updateState({ showFirstMathSigns: false })}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {signsList.map((item, index) =>
                                    <MenuItem
                                        key={`${index}`}
                                        textStyle={{ textAlign: 'center', ...Fonts.blackColor12Medium }}
                                        onPress={() => updateState({ firstMathSign: item, showFirstMathSigns: false })}
                                    >
                                        {item}
                                    </MenuItem>
                                )}
                            </ScrollView>
                        </Menu>

                    </View>
                    <View style={{ flex: 0.4, paddingTop: Sizes.fixPadding * 2.5, alignItems: 'center', }}>
                        <MaterialIcons
                            name="add"
                            color={Colors.grayColor}
                            size={30}
                        />

                    </View>
                    <View style={{ flex: 1, }}>
                        <View style={styles.signInfoWrapStyle}>
                            <Text style={{ ...Fonts.pinkColor12SemiBold }}>
                                {secondMatchSign}
                            </Text>
                            <Text style={{ ...Fonts.pinkColor12SemiBold, marginTop: Sizes.fixPadding - 5.0, }}>
                                May 20 - June 21
                            </Text>
                            <Image
                                source={require('../../assets/images/icons/gemini.png')}
                                style={styles.signRepresentsImageStyle}
                            />
                        </View>
                        <Menu
                            visible={showSecondMatchSigns}
                            style={{ backgroundColor: Colors.whiteColor, }}
                            anchor={
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => updateState({ showSecondMatchSigns: true })}
                                    style={styles.signSelectionWrapStyle}
                                >
                                    <Text style={{ flex: 1, ...Fonts.blackColor12Medium }}>
                                        {secondMatchSign}
                                    </Text>
                                    <MaterialIcons
                                        name="arrow-drop-down"
                                        color={Colors.blackColor}
                                        size={22}
                                    />
                                </TouchableOpacity>
                            }
                            onRequestClose={() => updateState({ showSecondMatchSigns: false })}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {signsList.map((item, index) =>
                                    <MenuItem
                                        key={`${index}`}
                                        textStyle={{ textAlign: 'center', ...Fonts.blackColor12Medium }}
                                        onPress={() => updateState({ secondMatchSign: item, showSecondMatchSigns: false })}
                                    >
                                        {item}
                                    </MenuItem>
                                )}
                            </ScrollView>
                        </Menu>

                    </View>
                </View>
            </View>
        )
    }

    function compabilityDetail() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    {selectedCompatibilityOption} Compatibility
                </Text>
                <Text style={{ ...Fonts.grayColor12Regular, marginTop: Sizes.fixPadding, }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </Text>
            </View>
        )
    }

    function compabilitysOption() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedCompatibilityOption: item.compatibilityOption })}
                style={{ flex: 1, }}
            >
                <LinearGradient
                    colors={
                        selectedCompatibilityOption == item.compatibilityOption
                            ?
                            [Colors.primaryColor, Colors.secondaryColor]
                            :
                            [Colors.whiteColor, Colors.whiteColor]
                    }
                    style={styles.compatibilityOptionWrapStyle}
                >
                    <Text style={{ textAlign: 'center', ...selectedCompatibilityOption == item.compatibilityOption ? { ...Fonts.whiteColor12SemiBold } : { ...Fonts.grayColor12SemiBold } }}>
                        {`${item.compatibilityOption}\nCompatibility`}
                    </Text>
                    <Image
                        source={item.compatibilityIcon}
                        style={{
                            width: 30.0, height: 30.0, resizeMode: 'contain',
                            tintColor: selectedCompatibilityOption == item.compatibilityOption ? Colors.whiteColor : Colors.grayColor,
                            marginTop: Sizes.fixPadding,
                        }}
                    />
                </LinearGradient>
            </TouchableOpacity>

        )
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <FlatList
                    data={compatibilityOptions}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={3}
                />
            </View>
        )
    }

    function compatibilityInfo() {
        return (
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, ...Fonts.grayColor12Regular }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </Text>
        )
    }

    function header() {
        return (
            <LinearGradient
                style={styles.headerWrapStyle}
                colors={[Colors.secondaryColor, Colors.primaryColor,]}
            >
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.whiteColor18Bold }}>
                    Compatibility
                </Text>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    compatibilityOptionWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        flex: 1,
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    signInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        paddingTop: Sizes.fixPadding * 3.0,
        paddingBottom: Sizes.fixPadding,
    },
    signSelectionWrapStyle: {
        marginTop: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ECECEC',
        paddingLeft: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 7.0,
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    signRepresentsImageStyle: {
        width: 40.0,
        height: 40.0,
        resizeMode: 'contain',
        position: 'absolute',
        top: -20.0,
    },
    getCompatibilityButtonStyle: {
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
    }
});

export default CampatibilityScreen;