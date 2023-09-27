import React from "react";
import { SafeAreaView, View, Dimensions, StatusBar, ScrollView, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CircularProgress from 'react-native-circular-progress-indicator';

const { width } = Dimensions.get('window');

const overallCompabilities = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
];

const CampatibilityDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {compatibilityDetail()}
                    {overallCompabilityInfo()}
                    {tryAnotherMatchButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function tryAnotherMatchButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0 }}
            >
                <LinearGradient
                    colors={[Colors.primaryColor, Colors.secondaryColor]}
                    style={styles.tryAnotherMatchButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor15Bold }}>
                        Try Another Match
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    function overallCompabilityInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Bold }}>
                    Overall Compatibility
                </Text>
                {
                    overallCompabilities.map((item, index) => (
                        <Text key={`${index}`} style={{ ...Fonts.grayColor12Regular, marginBottom: Sizes.fixPadding, }}>
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function compatibilityDetail() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </Text>
                <View style={{ marginBottom: Sizes.fixPadding + 5.0, marginTop: Sizes.fixPadding * 3.5, flexDirection: 'row', }}>
                    <View style={{ flex: 1, }}>
                        <View style={styles.signInfoWrapStyle}>
                            <Text style={{ ...Fonts.cyanColor12SemiBold }}>
                                {item.firstMathSign}
                            </Text>
                            <Text style={{ ...Fonts.cyanColor12SemiBold, marginTop: Sizes.fixPadding - 5.0, }}>
                                Sep 22 - Oct 23
                            </Text>
                            <Image
                                source={require('../../assets/images/icons/libra.png')}
                                style={styles.signRepresentsImageStyle}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 0.5, paddingTop: Sizes.fixPadding, alignItems: 'center', }}>
                        <CircularProgress
                            value={50}
                            activeStrokeColor={Colors.pinkColor}
                            activeStrokeSecondaryColor={Colors.cyanColor}
                            radius={width / 16.5}
                            inActiveStrokeColor='#ECECEC'
                            showProgressValue={false}
                        />
                        <Text style={{
                            ...Fonts.blackColor12Bold,
                            marginTop: Sizes.fixPadding - 5.0,
                            textAlign: 'center',
                        }}>
                            50%
                        </Text>
                    </View>

                    <View style={{ flex: 1, }}>
                        <View style={styles.signInfoWrapStyle}>
                            <Text style={{ ...Fonts.pinkColor12SemiBold }}>
                                {item.secondMatchSign}
                            </Text>
                            <Text style={{ ...Fonts.pinkColor12SemiBold, marginTop: Sizes.fixPadding - 5.0, }}>
                                May 20 - June 21
                            </Text>
                            <Image
                                source={require('../../assets/images/icons/gemini.png')}
                                style={styles.signRepresentsImageStyle}
                            />
                        </View>
                    </View>
                </View>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor12Regular }}>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </Text>
            </View >
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
                <View style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, flexDirection: 'row', }}>
                    <Text style={{ ...Fonts.whiteColor18Bold }}>
                        {item.selectedCompatibilityOption} Compatibility
                    </Text>
                    <Text style={{ flex: 1, marginTop: Sizes.fixPadding - 7.0, marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor12Light }}>
                        ({item.firstMathSign} - {item.secondMatchSign})
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
    signInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        paddingTop: Sizes.fixPadding * 3.0,
        paddingBottom: Sizes.fixPadding,
    },
    tryAnotherMatchButtonStyle: {
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
    }
});

export default CampatibilityDetailScreen;