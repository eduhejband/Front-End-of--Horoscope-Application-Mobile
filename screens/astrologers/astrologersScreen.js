import React from "react";
import { SafeAreaView, View, StatusBar, FlatList, TouchableOpacity, Dimensions, StyleSheet, Image, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const astrologersList = [
    {
        id: '1',
        astrogerImage: require('../../assets/images/users/user1.png'),
        astrologerName: 'K.N Rao',
        astrologerSpeciality: 'Magic ball reader',
    },
    {
        id: '2',
        astrogerImage: require('../../assets/images/users/user3.png'),
        astrologerName: 'Aliza Kelly',
        astrologerSpeciality: 'Magic ball reader',
    },
    {
        id: '3',
        astrogerImage: require('../../assets/images/users/user7.png'),
        astrologerName: 'Chandni Nicholas',
        astrologerSpeciality: 'Tarot card reader',
    },
    {
        id: '4',
        astrogerImage: require('../../assets/images/users/user8.png'),
        astrologerName: 'Bejan Daruwala',
        astrologerSpeciality: 'Tarot card reader',
    },
    {
        id: '5',
        astrogerImage: require('../../assets/images/users/user9.png'),
        astrologerName: 'Mystic Meg',
        astrologerSpeciality: 'Crystal ball reader',
    },
    {
        id: '6',
        astrogerImage: require('../../assets/images/users/user2.png'),
        astrologerName: 'Robert Hand',
        astrologerSpeciality: 'Magic ball reader',
    },
    {
        id: '7',
        astrogerImage: require('../../assets/images/users/user10.png'),
        astrologerName: 'Shankuntala Devi',
        astrologerSpeciality: 'Magic ball reader',
    },
    {
        id: '8',
        astrogerImage: require('../../assets/images/users/user12.png'),
        astrologerName: 'Liz Greene',
        astrologerSpeciality: 'Magic ball reader',
    },
    {
        id: '9',
        astrogerImage: require('../../assets/images/users/user13.png'),
        astrologerName: 'John Quigley',
        astrologerSpeciality: 'Magic ball reader',
    }
];

const AstrologersScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {astrologers()}
            </View>
        </SafeAreaView>
    )

    function astrologers() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('AstrologerDetail', { item: item })}
                style={styles.astrologerWrapStyle}
            >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={item.astrogerImage}
                        style={{
                            width: width * 0.144,
                            height: height * 0.070,
                            borderRadius: Sizes.fixPadding - 5.0
                        }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            {item.astrologerName}
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            {item.astrologerSpeciality}
                        </Text>
                    </View>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    color={Colors.blackColor}
                    size={16}
                />
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={astrologersList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
            />
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
                    Astrologers
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
    astrologerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 10.0,
    }
});

export default AstrologersScreen;