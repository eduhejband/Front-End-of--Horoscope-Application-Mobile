import React, { useCallback, useState, useEffect } from "react";
import { View, Text, BackHandler, SafeAreaView, StatusBar, Animated, StyleSheet, Alert } from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import HomeScreen from "../screens/home/homeScreen";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BottomTabBarScreen = ({ navigation, route }) => {
    const [name, setName] = useState(route.params?.name || ''); // Inicialmente tenta obter o nome dos parâmetros

    useEffect(() => {
        const fetchName = async () => {
            if (!name) {
                try {
                    const storedName = await AsyncStorage.getItem('name');
                    if (storedName) {
                        setName(storedName);
                    }
                } catch (error) {
                    console.error('Erro ao recuperar o nome do AsyncStorage:', error);
                    Alert.alert('Erro', 'Não foi possível recuperar o nome do usuário.');
                }
            }
        };
        fetchName();
    }, [name]);

    const backAction = () => {
        backClickCount === 1 ? BackHandler.exitApp() : _spring();
        return true;
    };

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 });
        }, 1000);
    }

    const [state, setState] = useState({
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { backClickCount } = state;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <HomeScreen navigation={navigation} name={name} />
            </View>
            {
                backClickCount === 1
                    ?
                    <Animated.View style={styles.animatedView}>
                        <Text style={Fonts.whiteColor12Medium}>
                            Pressione voltar novamente para sair
                        </Text>
                    </Animated.View>
                    :
                    null
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
