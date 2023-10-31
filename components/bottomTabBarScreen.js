import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, BackHandler, SafeAreaView, StatusBar } from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import HomeScreen from "../screens/home/homeScreen";

import { useFocusEffect } from '@react-navigation/native';

const BottomTabBarScreen = ({ navigation, route }) => {

    const userData = route.params?.userData;
    const dailyAdvice = route.params?.dailyAdvice;
    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        currentIndex: 1,
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentIndex, backClickCount } = state;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
           
                <HomeScreen navigation={navigation} userData={userData} dailyAdvice={dailyAdvice} />
                
            
            
                            
            </View>
            {
                backClickCount == 1
                    ?
                    <Animated.View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </Animated.View>
                    :
                    null
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        backgroundColor: Colors.whiteColor,
        borderTopColor: '#EBEBEB',
        borderTopWidth: 1.0,
        elevation: 1.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default BottomTabBarScreen;
