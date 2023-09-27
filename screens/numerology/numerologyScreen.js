import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Menu, MenuItem } from 'react-native-material-menu';

const { height } = Dimensions.get('window');

const months = Array.from([...range(1, 12)]);

const years = Array.from([...range(1922, 2022)]);

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

const days = Array.from([...range(1, 31)]);

const aboutNumerologies = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit'
];

const NumerologyScreen = ({ navigation }) => {

    const [state, setState] = useState({
        showMoths: false,
        selectedBirthMonth: null,
        showDays: false,
        selectedBirthDay: null,
        showYears: false,
        selectedBirthYear: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showMoths,
        selectedBirthMonth,
        showDays,
        selectedBirthDay,
        showYears,
        selectedBirthYear,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {birthDateInfo()}
                    {aboutNumerologyInfo()}
                    {getNumerologyButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function getNumerologyButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('NumerologyDetail', {
                    birthDate: `${selectedBirthMonth ? selectedBirthMonth : 11}-${selectedBirthDay ? selectedBirthDay : 17}-${selectedBirthYear ? selectedBirthYear : 1999}`
                })}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 7.0, marginBottom: Sizes.fixPadding * 2.0, }}
            >
                <LinearGradient
                    colors={[Colors.primaryColor, Colors.secondaryColor]}
                    style={styles.getNumerologyButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor15Bold }}>
                        Get Your Numerology
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    function aboutNumerologyInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    About Numerology
                </Text>
                {aboutNumerologies.map((item, index) => (
                    <Text key={`${index}`} style={{ marginBottom: Sizes.fixPadding, ...Fonts.grayColor12Regular }}>
                        {item}
                    </Text>
                ))}
            </View>
        )
    }

    function birthDateInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    Select Birthdate/Ocassion date
                </Text>
                <View style={styles.birthMonthDayAndYearWrapStyle}>
                    <Menu
                        visible={showMoths}
                        style={{
                            backgroundColor: Colors.secondaryColor,
                            maxHeight: height - 150,
                        }}
                        anchor={
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ showMoths: true })}
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                            >
                                <Text style={{ ...Fonts.grayColor12SemiBold }}>
                                    {selectedBirthMonth ? `${selectedBirthMonth.toString().length == 1 ? `0${selectedBirthMonth}` : selectedBirthMonth}` : 'Month'}
                                </Text>
                                <MaterialIcons
                                    name="arrow-drop-down"
                                    color={Colors.grayColor}
                                    size={22}
                                />
                            </TouchableOpacity>
                        }
                        onRequestClose={() => updateState({ showMoths: false })}
                    >
                        <ScrollView>
                            {months.map((item, index) =>
                                <MenuItem
                                    key={`${index}`}
                                    textStyle={{ textAlign: 'center', ...Fonts.whiteColor12Bold }}
                                    onPress={() => updateState({ selectedBirthMonth: item, showMoths: false })}
                                >
                                    {item.toString().length == 1 ? `0${item}` : item}
                                </MenuItem>
                            )}
                        </ScrollView>
                    </Menu>
                    <Menu
                        visible={showDays}
                        style={{
                            backgroundColor: Colors.secondaryColor,
                            maxHeight: height - 150,
                        }}
                        anchor={
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ showDays: true })}
                                style={{ marginHorizontal: Sizes.fixPadding - 6.0, flexDirection: 'row', alignItems: 'center' }}
                            >
                                <Text style={{ ...Fonts.grayColor12SemiBold }}>
                                    {selectedBirthDay ? `${selectedBirthDay.toString().length == 1 ? `0${selectedBirthDay}` : selectedBirthDay}` : 'Day'}
                                </Text>
                                <MaterialIcons
                                    name="arrow-drop-down"
                                    color={Colors.grayColor}
                                    size={22}
                                />
                            </TouchableOpacity>
                        }
                        onRequestClose={() => updateState({ showDays: false })}
                    >
                        <ScrollView>
                            {days.map((item, index) =>
                                <MenuItem
                                    key={`${index}`}
                                    textStyle={{ textAlign: 'center', ...Fonts.whiteColor12Bold }}
                                    onPress={() => updateState({ selectedBirthDay: item, showDays: false })}
                                >
                                    {item.toString().length == 1 ? `0${item}` : item}
                                </MenuItem>
                            )}
                        </ScrollView>
                    </Menu>
                    <Menu
                        visible={showYears}
                        style={{
                            backgroundColor: Colors.secondaryColor,
                            maxHeight: height - 150,
                        }}
                        anchor={
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ showYears: true })}
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                            >
                                <Text style={{ ...Fonts.grayColor12SemiBold }}>
                                    {selectedBirthYear ? selectedBirthYear : 'Year'}
                                </Text>
                                <MaterialIcons
                                    name="arrow-drop-down"
                                    color={Colors.grayColor}
                                    size={22}
                                />
                            </TouchableOpacity>
                        }
                        onRequestClose={() => updateState({ showYears: false })}
                    >
                        <ScrollView>
                            {years.map((item, index) =>
                                <MenuItem
                                    key={`${index}`}
                                    textStyle={{ textAlign: 'center', ...Fonts.whiteColor12Bold }}
                                    onPress={() => updateState({ selectedBirthYear: item, showYears: false })}
                                >
                                    {item}
                                </MenuItem>
                            )}
                        </ScrollView>
                    </Menu>
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
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.whiteColor18Bold }}>
                    Numerology
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
    birthMonthDayAndYearWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        borderRadius: Sizes.fixPadding - 7.0,
        marginTop: Sizes.fixPadding + 5.0,
        justifyContent: 'center',
    },
    getNumerologyButtonStyle: {
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
    }
});

export default NumerologyScreen;