import React from "react";
import { SafeAreaView, Dimensions, View, StatusBar, ScrollView, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import CircularProgress from 'react-native-circular-progress-indicator';

const { width } = Dimensions.get('window');

const NumerologyDetailScreen = ({ navigation, route }) => {

    const birthDate = route.params.birthDate;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {luckyNumberInfo()}
                    {categoryWiseInfo()}
                    {aboutCharacter()}
                    {aboutBehaviour()}
                    {aboutCareer()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function aboutCareer() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    About Career
                </Text>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </Text>
            </View>
        )
    }

    function aboutBehaviour() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    About Behaviour
                </Text>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </Text>
            </View>
        )
    }

    function aboutCharacter() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    About Character
                </Text>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </Text>
            </View>
        )
    }

    function categoryWiseInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ marginBottom: Sizes.fixPadding * 2.0, justifyContent: 'space-between', flexDirection: 'row', }}>
                    {progressBarWithPercentage({ title: 'Funny', percentage: 60, startColor: '#A4DAE0', middleColor: '#37BECE', })}
                    {progressBarWithPercentage({ title: 'Responsible', percentage: 25, startColor: '#D3BAD8', middleColor: '#CEAED3', })}
                    {progressBarWithPercentage({ title: 'Honest', percentage: 80, startColor: '#DBA1BA', middleColor: '#C33372', })}
                </View>
                <View style={{ marginVertical: Sizes.fixPadding + 2.0, justifyContent: 'space-between', flexDirection: 'row', }}>
                    {progressBarWithPercentage({ title: 'Obedient', percentage: 75, startColor: '#E0B1A4', middleColor: '#CE5937', })}
                    {progressBarWithPercentage({ title: 'Hard working', percentage: 90, startColor: '#95C1BD', middleColor: '#138077', })}
                    {progressBarWithPercentage({ title: 'Smart', percentage: 50, startColor: '#ABB1CB', middleColor: '#49599A', })}
                </View>
            </View>
        )
    }

    function progressBarWithPercentage({ title, percentage, startColor, middleColor }) {
        return (
            <View style={{ alignItems: 'center' }}>
                <CircularProgress
                    value={percentage}
                    activeStrokeColor={startColor}
                    activeStrokeSecondaryColor={middleColor}
                    radius={width / 8.5}
                    inActiveStrokeColor='#ECECEC'
                    showProgressValue={false}
                />
                <Text style={{
                    position: 'absolute',
                    ...Fonts.blackColor14Bold,
                    bottom: width * 0.16
                }}>
                    {percentage}%
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                    {title}
                </Text>
            </View>
        )
    }

    function luckyNumberInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
                <View style={styles.luckyNumberWrapStyle}>
                    <MaskedView
                        style={{ marginTop: Sizes.fixPadding - 27.0, height: 50.0, }}
                        maskElement={
                            <Text style={{ fontSize: 44, fontFamily: 'Hahmlet_Black', }}>
                                3
                            </Text>
                        }
                    >
                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            colors={[
                                Colors.primaryColor,
                                Colors.secondaryColor,
                            ]}
                            style={{ flex: 1 }}
                        >
                            <Text style={{ fontSize: 44, fontFamily: 'Hahmlet_Black', color: "transparent" }}>
                                3
                            </Text>
                        </LinearGradient>
                    </MaskedView>
                </View>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor13Bold }}>
                    Lucky number
                </Text>
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
                <View style={{ marginLeft: Sizes.fixPadding - 5.0, flexDirection: 'row', }}>
                    <Text style={{ ...Fonts.whiteColor18Bold }}>
                        Numerology
                    </Text>
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding - 8.0, ...Fonts.whiteColor12Light }}>
                        {birthDate}
                    </Text>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    luckyNumberWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Sizes.fixPadding * 4.0,
        alignSelf: 'center',
    }
});

export default NumerologyDetailScreen;