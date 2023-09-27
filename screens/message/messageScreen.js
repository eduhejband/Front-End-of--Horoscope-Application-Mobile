import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, SafeAreaView, StatusBar, BackHandler } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts, Colors, Sizes, } from "../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';

const messagesData = [
    {
        id: '1',
        message: 'Lorem Ipsum is eit',
        time: '1:15 pm',
        isSender: true,
    },
    {
        id: '2',
        message: `Lorem Ipsum is eit`,
        time: '1:17 pm',
        isSender: false,
    },
    {
        id: '3',
        message: `Lorem Ipsum is simply dummy\ntext of the printing and type of\nindustry`,
        time: '1:20 pm',
        isSender: true,
    },
    {
        id: '4',
        message: `Loream`,
        time: '1:25 pm',
        isSender: false,
    },
    {
        id: '5',
        message: `Lorem Ipsum is eit`,
        time: '1:25 pm',
        isSender: false,
    },
    {
        id: '6',
        message: `Lorem Ipsum is simply dummy\ntext of the printing and type of\nindustry`,
        time: '1:25 pm',
        isSender: false,
    },
]

const MessageScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const [messagesList, setMessagesList] = useState(messagesData);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <View style={{ flex: 1, }}>
                    {messages()}
                    {typeMessage()}
                </View>
            </View>
        </SafeAreaView>
    )

    function messages() {

        const renderItem = ({ item }) => {
            return (
                <View
                    style={{
                        alignItems: item.isSender == true ? 'flex-end' : 'flex-start',
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        marginVertical: Sizes.fixPadding,
                    }}>
                    <LinearGradient
                        colors={
                            item.isSender == true ?
                                [Colors.primaryColor, Colors.secondaryColor,]
                                :
                                ['#F4F5F8', '#F4F5F8']
                        }
                        style={{
                            ...styles.messageWrapStyle,
                        }}>
                        <Text style={item.isSender == true ? { ...Fonts.whiteColor12Light } : { ...Fonts.blackColor12Light }}>
                            {item.message}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'right',
                                ...item.isSender == true ? { ...Fonts.whiteColor10Light } : { ...Fonts.blackColor10Light }
                            }}
                        >
                            {item.time}
                        </Text>
                    </LinearGradient>
                </View>
            )
        }

        return (
            <FlatList
                inverted
                data={messagesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: Sizes.fixPadding * 2.0,
                    flexDirection: 'column-reverse'
                }}
            />
        )
    }

    function addMessage({ message }) {

        const oldMessages = messagesList;
        let date = Date();
        let hour = (new Date(date)).getHours();
        let minute = (new Date(date)).getMinutes();
        let AmPm = hour >= 12 ? 'pm' : 'am';
        let finalhour = hour >= 12 ? (hour - 12) : hour;

        const newMessage = {
            id: messagesList.length + 1,
            message: message,
            time: `${finalhour}:${minute} ${AmPm}`,
            isSender: true,
            isSeen: false,
        }

        oldMessages.push(newMessage);
        setMessagesList(oldMessages);
    }

    function typeMessage() {
        const [message, setMessage] = useState('');
        return (
            <View style={styles.bottomContainerStyle}>
                <LinearGradient
                    colors={[Colors.primaryColor, Colors.secondaryColor,]}
                    style={styles.textFieldWrapStyle}
                >
                    <TextInput
                        selectionColor={Colors.whiteColor}
                        value={message}
                        onChangeText={setMessage}
                        placeholder='Write your message'
                        style={{ ...Fonts.whiteColor12Medium, flex: 1, }}
                        placeholderTextColor={Colors.whiteColor}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name="attach-file"
                            color={Colors.whiteColor}
                            size={16}
                            style={{ marginRight: Sizes.fixPadding - 3.0, }}
                        />
                        <MaterialCommunityIcons
                            name="send"
                            size={16}
                            color={Colors.whiteColor}
                            onPress={() => {
                                if (message != '') {
                                    addMessage({ message: message })
                                    setMessage('');
                                }
                            }}
                        />
                    </View>
                </LinearGradient>
            </View>
        )
    }

    function header() {
        return (
            <LinearGradient
                style={styles.headerWrapStyle}
                colors={[Colors.secondaryColor, Colors.primaryColor,]}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <MaterialIcons
                        name="arrow-back-ios"
                        color={Colors.whiteColor}
                        size={22}
                        onPress={() => navigation.pop()}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, flex: 1, ...Fonts.whiteColor18Bold }}>
                        {item.astrologerName ? item.astrologerName : item.userName}
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
    },
    messageWrapStyle: {
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 6.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    bottomContainerStyle: {
        flexDirection: 'row',
        marginBottom: Sizes.fixPadding,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding,
    },
})

export default MessageScreen;