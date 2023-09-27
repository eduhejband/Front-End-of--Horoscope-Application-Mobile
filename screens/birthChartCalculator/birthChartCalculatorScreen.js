import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, TextInput, TouchableOpacity, ScrollView, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Menu, MenuItem } from 'react-native-material-menu';
import DateTimePicker from '@react-native-community/datetimepicker';

const gendersList = ['Female', 'Male', 'Other'];

const BirthChartCalculatorScreen = ({ navigation }) => {

    const dateObj = new Date();
    const defaultBirthDate = '17/11/1999';
    const defaultBirthTime = '7:15 AM';

    const [state, setState] = useState({
        name: null,
        email: null,
        showTimer: false,
        showCalender: false,
        birthTime: null,
        birthLocation: null,
        birthDate: null,
        showGenders: false,
        selectedGender: 'Female',
        agreeWithServicesAndPolicy: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
        showTimer,
        showCalender,
        birthTime,
        birthLocation,
        birthDate,
        showGenders,
        selectedGender,
        agreeWithServicesAndPolicy,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
                >
                    {birthChartDescription()}
                    {birthChartInfo()}
                </ScrollView>
                {calender()}
                {timer()}
            </View>
        </SafeAreaView>
    )

    function birthChartInfo() {
        return (
            <View style={styles.birthChartInfoWrapStyle}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    Free Birth/Natal Chart Report
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 8.0, textAlign: 'center', ...Fonts.grayColor12Regular }}>
                    Your birth chart holds the key to your unique life path and personality
                </Text>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor13SemiBold }}>
                    Enter your Information
                </Text>
                {nameInfo()}
                {emailInfo()}
                {genderAndTimeOfBirthInfo()}
                {dateOfBirthAndLocationInfo()}
                {agreeWithServicesAndPrivacyInfo()}
                {getBirthChartButton()}
            </View>
        )
    }

    function getBirthChartButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BirthHoroscope')}
                style={{ marginVertical: Sizes.fixPadding * 2.0, }}
            >
                <LinearGradient
                    style={styles.getBirthChartButtonStyle}
                    colors={[Colors.primaryColor, Colors.secondaryColor,]}
                >
                    <Text style={{ ...Fonts.whiteColor15Bold }}>
                        Get Your Free Birth Chart
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    function agreeWithServicesAndPrivacyInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ agreeWithServicesAndPolicy: !agreeWithServicesAndPolicy })}
                    style={{
                        ...styles.checkBoxStyle,
                        borderColor: agreeWithServicesAndPolicy ? Colors.primaryColor : Colors.grayColor,
                        backgroundColor: agreeWithServicesAndPolicy ? Colors.primaryColor : Colors.whiteColor,
                    }}>
                    {
                        agreeWithServicesAndPolicy
                            ?
                            <FontAwesome5
                                name="check"
                                color={Colors.whiteColor}
                                size={12}
                            />
                            :
                            null
                    }
                </TouchableOpacity>
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor10SemiBold }}>
                    By accepting your agree to our { }
                    <Text style={{ ...Fonts.primaryColor10Black }}>
                        Terms of Service
                    </Text>
                    { } and { }
                    <Text style={{ ...Fonts.primaryColor10Black }}>
                        Privacy Policy.
                    </Text>
                </Text>
            </View>
        )
    }

    function timer() {
        const onChange = (event, selectedDate) => {
            updateState({
                birthTime: `${((selectedDate.getHours() + 11) % 12 + 1)}:${selectedDate.getMinutes()} ${selectedDate.getHours() >= 12 ? "PM" : "AM"}`,
                showTimer: false
            })
        };

        return (
            showTimer && <DateTimePicker
                mode="time"
                value={new Date(Date.now())}
                onChange={onChange}
            />
        )
    }

    function calender() {
        const onChange = (event, selectedDate) => {
            updateState({
                birthDate: `${selectedDate.getUTCDate()}/${selectedDate.getUTCMonth() + 1}/${selectedDate.getUTCFullYear()}`,
                showCalender: false
            })
        };
        return (
            showCalender && <DateTimePicker
                value={new Date()}
                mode={'date'}
                onChange={onChange}
                maximumDate={new Date()}
            />
        )
    }

    function dateOfBirthAndLocationInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ marginRight: Sizes.fixPadding, flex: 1 }}>
                    <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                        Date of Birth
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { updateState({ showCalender: true }) }}
                        style={styles.genderBirthOfDateAndTimeWrapStyle}
                    >
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor12Medium }}>
                            {birthDate ? birthDate : defaultBirthDate}
                        </Text>
                        <MaterialIcons name="calendar-today" size={15} color={Colors.blackColor} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: Sizes.fixPadding, flex: 1 }}>
                    <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                        Birth Location
                    </Text>
                    <TextInput
                        selectionColor={Colors.secondaryColor}
                        value={birthLocation}
                        onChangeText={(text) => updateState({ birthLocation: text })}
                        placeholder="Enter location"
                        style={styles.textFieldStyle}
                        placeholderTextColor={Colors.grayColor}
                    />
                </View>
            </View>
        )
    }

    function genderAndTimeOfBirthInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ marginRight: Sizes.fixPadding, flex: 1 }}>
                    <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                        Gender
                    </Text>
                    <Menu
                        visible={showGenders}
                        style={{ backgroundColor: Colors.whiteColor, }}
                        anchor={
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ showGenders: true })}
                                style={styles.genderBirthOfDateAndTimeWrapStyle}
                            >
                                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor12Medium }}>
                                    {selectedGender}
                                </Text>
                                <MaterialIcons name="arrow-drop-down" size={20} color={Colors.blackColor} />
                            </TouchableOpacity>
                        }
                        onRequestClose={() => updateState({ showGenders: false })}
                    >
                        <ScrollView>
                            {gendersList.map((item, index) =>
                                <MenuItem
                                    key={`${index}`}
                                    textStyle={{ textAlign: 'center', ...Fonts.blackColor12Medium }}
                                    onPress={() => updateState({ selectedGender: item, showGenders: false })}
                                >
                                    {item}
                                </MenuItem>
                            )}
                        </ScrollView>
                    </Menu>
                </View>
                <View style={{ marginLeft: Sizes.fixPadding, flex: 1 }}>
                    <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                        Time of Birth
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { updateState({ showTimer: true }) }}
                        style={styles.genderBirthOfDateAndTimeWrapStyle}
                    >
                        <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor12Medium }}>
                            {birthTime ? birthTime : defaultBirthTime}
                        </Text>
                        <MaterialIcons name="access-time" size={15} color={Colors.blackColor} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                    Email
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(text) => updateState({ email: text })}
                    placeholder="Email your address"
                    placeholderTextColor={Colors.grayColor}
                    cursorColor={Colors.secondaryColor}
                    style={styles.textFieldStyle}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function nameInfo() {
        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                    Name
                </Text>
                <TextInput
                    value={name}
                    onChangeText={(text) => updateState({ name: text })}
                    placeholder="Enter your name"
                    placeholderTextColor={Colors.grayColor}
                    cursorColor={Colors.secondaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function birthChartDescription() {
        return (
            <Text style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.grayColor12Regular }}>
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
                    Birth Chart Calculator
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
    textFieldStyle: {
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor12Medium,
        height: 40.0,
    },
    genderBirthOfDateAndTimeWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        height: 40.0,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    checkBoxStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: Sizes.fixPadding - 8.0,
        borderWidth: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    getBirthChartButtonStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    birthChartInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
    }
});

export default BirthChartCalculatorScreen;