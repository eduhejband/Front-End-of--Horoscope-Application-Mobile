import React, { useState, useRef } from "react";
import { SafeAreaView, View, StatusBar, Text, Dimensions, StyleSheet, Image, Animated } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const notificationList = [
    {
        key: '1',
        notificationImage: require('../../assets/images/notifications/notification1.png'),
        title: 'Planet Overview',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        key: '2',
        notificationImage: require('../../assets/images/notifications/notification2.png'),
        title: 'Your Daily Libra Horoscope',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        key: '3',
        notificationImage: require('../../assets/images/notifications/notification3.png'),
        title: 'Card Of the Day',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        key: '4',
        notificationImage: require('../../assets/images/notifications/notification1.png'),
        title: 'Planet Overview',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        key: '5',
        notificationImage: require('../../assets/images/notifications/notification2.png'),
        title: 'Your Daily Libra Horoscope',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
        key: '6',
        notificationImage: require('../../assets/images/notifications/notification3.png'),
        title: 'Card Of the Day',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
];

const rowTranslateAnimatedValues = {};

const NotificationScreen = ({ props }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if ((value < -Dimensions.get('window').width || value > Dimensions.get('window').width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: ['0%', '100%'],
                        outputRange: ['0%', '100%'],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.notificationShadowWrapStyle}>
                        <LinearGradient
                            colors={[Colors.primaryColor, Colors.secondaryColor]}
                            style={styles.notificationImageWrapStyle}>
                            <Image
                                source={data.item.notificationImage}
                                style={{ width: 28.0, height: 28.0, resizeMode: 'contain' }}
                            />
                        </LinearGradient>
                    </View>
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.blackColor13SemiBold }}>
                            {data.item.title}
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            {data.item.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View >
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack} />
    );

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <View style={{ backgroundColor: Colors.whiteColor, flex: 1, }}>
                    {listData.length == 0 ?
                        noNotification()
                        :
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-Dimensions.get('window').width}
                            leftOpenValue={Dimensions.get('window').width}
                            onSwipeValueChange={onSwipeValueChange}
                            useNativeDriver={false}
                            contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
                        />
                    }
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={showSnackBar}
                        onDismiss={() => setShowSnackBar(false)}
                    >
                        {snackBarMsg}
                    </Snackbar>
                </View>
            </View>
        </SafeAreaView>
    );

    function header() {
        return (
            <LinearGradient
                style={styles.headerWrapStyle}
                colors={[Colors.secondaryColor, Colors.primaryColor,]}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Notifications
                </Text>
            </LinearGradient>
        )
    }

    function noNotification() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <MaterialIcons
                    name="notifications-off"
                    size={50}
                    color={Colors.grayColor}
                />
                <Text style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding }}>
                    No new notification
                </Text>
            </View>
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
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 55.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    },
    notificationShadowWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: 57.0, height: 57.0,
        borderRadius: 28.5,
        elevation: 3.0,
        borderColor: Colors.primaryColor,
        borderWidth: 0.10,
        shadowColor: Colors.primaryColor
    },
    notificationImageWrapStyle: {
        width: 52.0,
        height: 52.0,
        borderRadius: 26.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default NotificationScreen;