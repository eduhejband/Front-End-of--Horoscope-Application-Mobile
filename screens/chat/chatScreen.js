import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const chatsList = [
    {
        id: '1',
        userImage: require('../../assets/images/users/user3.png'),
        userName: 'Aliza Kelly',
        lastMessage: 'Lorem Ipsum is simply dummy text',
        messageTime: '10:45 am',
        unreadMessageCount: 2,
    },
    {
        id: '2',
        userImage: require('../../assets/images/users/user1.png'),
        userName: 'K.N Rao',
        lastMessage: 'Lorem Ipsum is simply dummy text',
        messageTime: '10:40 am',
    },
    {
        id: '3',
        userImage: require('../../assets/images/users/user2.png'),
        userName: 'Robert Hand',
        lastMessage: 'Lorem Ipsum is simply dummy text',
        messageTime: '1 days ago',
    },
    {
        id: '4',
        userImage: require('../../assets/images/users/user7.png'),
        userName: 'Chandni Nicholas',
        lastMessage: 'Lorem Ipsum is simply dummy text',
        messageTime: '1 days ago',
    },
    {
        id: '5',
        userImage: require('../../assets/images/users/user8.png'),
        userName: 'Bejan Daruwala',
        lastMessage: 'Lorem Ipsum is simply dummy text',
        messageTime: '2 days ago',
        unreadMessageCount: 2,
    },
    {
        id: '6',
        userImage: require('../../assets/images/users/user9.png'),
        userName: 'Mystic Meg',
        lastMessage: 'Lorem Ipsum is simply dummy text',
        messageTime: '2 days ago',
    },
    {
        id: '7',
        userImage: require('../../assets/images/users/user10.png'),
        userName: 'Shakuntala Devi',
        lastMessage: 'Lorem Ipsum is simply dummy text',
        messageTime: '3 days ago',
    },
];

const ChatScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {peoples()}
            </View>
        </SafeAreaView>
    )

    function peoples() {

        const renderItem = ({ item }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('Message', { item: item })}
                    style={{ flexDirection: 'row', }}
                >
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.userImageShadowStyle}>
                            <Image
                                source={item.userImage}
                                style={{ width: 55.0, height: 55.0, borderRadius: 28.5, }}
                            />
                            {
                                item.unreadMessageCount
                                    ?
                                    <View style={styles.unreadMessageCountWrapStyle}>
                                        <Text style={{ lineHeight: 11.0, ...Fonts.whiteColor9Bold }}>
                                            {item.unreadMessageCount}
                                        </Text>
                                    </View>
                                    :
                                    null
                            }
                        </View>
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                            <Text style={{ textAlign: 'right', ...Fonts.grayColor12Regular }}>
                                {item.messageTime}
                            </Text>
                            <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 15.0, ...Fonts.blackColor13SemiBold }}>
                                {item.userName}
                            </Text>
                            <Text numberOfLines={1} style={{ ...Fonts.grayColor12Regular }}>
                                {item.lastMessage}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ height: 1.0, backgroundColor: Colors.grayColor, marginVertical: Sizes.fixPadding + 5.0, }} />
            </View>
        )
        return (
            <FlatList
                data={chatsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Sizes.fixPadding * 7.0,
                    paddingTop: Sizes.fixPadding * 2.0,
                }}
            />
        )
    }

    function header() {
        return (
            <LinearGradient
                style={styles.headerWrapStyle}
                colors={[Colors.secondaryColor, Colors.primaryColor,]}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Chat
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
    },
    userImageShadowStyle: {
        width: 59.0,
        height: 59.0,
        borderRadius: 30.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 0.03,
        elevation: 2.0,
        alignItems: 'center', justifyContent: 'center'
    },
    unreadMessageCountWrapStyle: {
        width: 15.0,
        height: 15.0,
        borderRadius: 7.5,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        position: 'absolute',
        bottom: 0.0, right: 0.0,
        elevation: 2.0,
    }
})

export default ChatScreen;