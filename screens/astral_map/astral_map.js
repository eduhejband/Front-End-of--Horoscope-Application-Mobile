import React, { useState } from "react";
import { Modal, SafeAreaView, View, Dimensions, StatusBar, FlatList, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
const { width } = Dimensions.get('window');

const AstralMap = ({ navigation, route }) => {
    const { astroData } = route.params;

    const capitalizeSign = (sign) => {
        const signs = {
            aries: "Áries",
            touro: "Touro",
            gemeos: "Gêmeos",
            cancer: "Câncer",
            leao: "Leão",
            virgem: "Virgem",
            libra: "Libra",
            escorpiao: "Escorpião",
            sagitario: "Sagitário",
            capricornio: "Capricórnio",
            aquario: "Aquário",
            peixes: "Peixes"
        };
        return signs[sign.toLowerCase()] || sign;
    };

    const signsList = [
        {
            id: '1',
            signImage: require('../../assets/planets/sol.png'),
            signName: 'Sol:',
            signDetail: astroData ? capitalizeSign(astroData.Sun) : 'Detalhes não disponíveis',
            signDescription: 'Representa a posição do Sol no momento do seu nascimento. É o aspecto mais conhecido da astrologia e está frequentemente associado à consciência central, ego e identidade pessoal. O signo solar é comumente o que as pessoas se referem quando falam sobre "seu signo".'
        },
        {
            id: '2',
            signImage: require('../../assets/planets/lua.png'),
            signName: 'Lua:',
            signDetail: astroData ? capitalizeSign(astroData.Moon) : 'Detalhes não disponíveis',
            signDescription: 'Refere-se à posição da Lua no momento do nascimento. O signo lunar está relacionado às emoções, instintos, memória e aspectos subconscientes da personalidade. Ele é considerado importante para entender a vida emocional interna de uma pessoa.'
        },
        {
            id: '3',
            signImage: require('../../assets/planets/ascendente.png'),
            signName: 'Ascendente:',
            signDetail: astroData ? capitalizeSign(astroData.Ascendant) : 'Detalhes não disponíveis',
            signDescription: 'O Ascendente, ou signo ascendente, representa a maneira como você se apresenta ao mundo exterior e como os outros te veem. É a "máscara" que você usa e influencia sua aparência e comportamento exterior.'
        },
        {
            id: '4',
            signImage: require('../../assets/planets/descendente.png'),
            signName: 'Descendente:',
            signDetail: astroData ? capitalizeSign(astroData.Descendant) : 'Detalhes não disponíveis',
            signDescription: 'O Descendente é o signo oposto ao Ascendente e representa os tipos de relacionamentos e parcerias que você atrai. Ele indica o que você busca nos outros e os desafios que enfrenta em relacionamentos íntimos.'
        },
        {
            id: '5',
            signImage: require('../../assets/planets/ic.png'),
            signName: 'Fundo do Céu (IC):',
            signDetail: astroData ? capitalizeSign(astroData.IC) : 'Detalhes não disponíveis',
            signDescription: 'O Fundo do Céu (IC) representa suas raízes, sua família e seu lar. Ele está associado às influências da infância e ao ambiente doméstico, revelando suas fundações emocionais e herança familiar.'
        },
        {
            id: '6',
            signImage: require('../../assets/planets/mc.png'),
            signName: 'Meio do Céu (MC):',
            signDetail: astroData ? capitalizeSign(astroData.MC) : 'Detalhes não disponíveis',
            signDescription: 'O Meio do Céu (MC) representa sua carreira, reputação e aspirações públicas. Está ligado à sua posição social e ao caminho que você segue para alcançar suas ambições e ser reconhecido na sociedade.'
        },
        {
            id: '7',
            signImage: require('../../assets/planets/jupiter.png'),
            signName: 'Júpiter:',
            signDetail: astroData ? capitalizeSign(astroData.Jupiter) : 'Detalhes não disponíveis',
            signDescription: 'Júpiter leva cerca de 12 anos para orbitar o Sol, passando aproximadamente um ano em cada signo do zodíaco. O signo em que Júpiter está posicionado no seu nascimento está associado a como você expressa otimismo, crescimento, expansão e moralidade.'
        },
        {
            id: '8',
            signImage: require('../../assets/planets/marte.png'),
            signName: 'Marte:',
            signDetail: astroData ? capitalizeSign(astroData.Mars) : 'Detalhes não disponíveis',
            signDescription: 'Marte é o planeta da ação, energia e desejo. Representa a maneira como você aborda desafios e busca seus objetivos. Está relacionado à assertividade, competitividade e paixão.'
        },
        {
            id: '9',
            signImage: require('../../assets/planets/mercurio.png'),
            signName: 'Mercúrio:',
            signDetail: astroData ? capitalizeSign(astroData.Mercury) : 'Detalhes não disponíveis',
            signDescription: 'Mercúrio rege a comunicação, o pensamento lógico e a inteligência. O signo em que Mercúrio está posicionado revela como você processa informações, se comunica e aprende.'
        },
        {
            id: '10',
            signImage: require('../../assets/planets/netuno.png'),
            signName: 'Netuno:',
            signDetail: astroData ? capitalizeSign(astroData.Neptune) : 'Detalhes não disponíveis',
            signDescription: 'Netuno está associado à intuição, sonhos e espiritualidade. Representa a sensibilidade, a imaginação e a capacidade de transcender a realidade cotidiana para explorar o mundo espiritual e artístico.'
        },
        {
            id: '11',
            signImage: require('../../assets/planets/plutao.png'),
            signName: 'Plutão:',
            signDetail: astroData ? capitalizeSign(astroData.Pluto) : 'Detalhes não disponíveis',
            signDescription: 'Plutão simboliza transformação, poder e regeneração. Ele representa os processos de morte e renascimento, mudanças profundas e o desejo de controlar e influenciar o ambiente ao redor.'
        },
        {
            id: '12',
            signImage: require('../../assets/planets/saturn.png'),
            signName: 'Saturno:',
            signDetail: astroData ? capitalizeSign(astroData.Saturn) : 'Detalhes não disponíveis',
            signDescription: 'Saturno está ligado à disciplina, responsabilidade e estrutura. Ele desafia você a crescer, enfrentar seus medos e construir uma base sólida para o futuro. Está associado à maturidade e ao cumprimento de deveres.'
        },
        {
            id: '13',
            signImage: require('../../assets/planets/uranu.png'),
            signName: 'Urano:',
            signDetail: astroData ? capitalizeSign(astroData.Uranus) : 'Detalhes não disponíveis',
            signDescription: 'Urano é o planeta da inovação, originalidade e mudança repentina. Ele governa a individualidade, a liberdade pessoal e a capacidade de romper com as tradições para explorar novas possibilidades.'
        },
        {
            id: '14',
            signImage: require('../../assets/planets/venus.png'),
            signName: 'Vênus:',
            signDetail: astroData ? capitalizeSign(astroData.Venus) : 'Detalhes não disponíveis',
            signDescription: 'Vênus está relacionada ao amor, beleza e prazer. Ela governa a maneira como você expressa afeto, busca relacionamentos harmoniosos e aprecia as coisas belas e agradáveis da vida.'
        },
    ];

    const [state, setState] = useState({ currentSelectedSignId: signsList[3].id });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentSelectedSignId } = state;

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedSign, setSelectedSign] = useState(null);

    const openModal = (sign) => {
        setSelectedSign(sign);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.secondaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {signs()}
                        </>
                    }
                    contentContainerStyle={{ 
                        paddingBottom: Sizes.fixPadding, 
                        marginTop: 20, 
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{selectedSign?.signName}</Text>
                            <MaterialIcons
                                name="close"
                                size={24}
                                color="black"
                                onPress={closeModal}
                                style={styles.closeIcon}
                            />
                        </View>
                        <Text style={styles.modalText}>{selectedSign?.signDescription}</Text>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

    function signs() {
        const handlePress = (item) => {
            updateState({ currentSelectedSignId: item.id });
            openModal(item);
        };
    
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handlePress(item)}
                style={[
                    styles.signItemStyle,
                    currentSelectedSignId === item.id && isModalVisible && styles.selectedSignItemStyle,
                    index === signsList.length - 1 && styles.lastItemStyle
                ]}
            >
                <Image
                    source={item.signImage}
                    style={styles.signImageStyle}
                />
                <View style={styles.signTextWrapStyle}>
                    <Text style={[
                        styles.signNameTextStyle,
                        currentSelectedSignId === item.id && isModalVisible && styles.selectedSignTextStyle
                    ]}>
                        {item.signName}
                    </Text>
                    <Text style={[
                        styles.signDetailTextStyle,
                        currentSelectedSignId === item.id && isModalVisible && styles.selectedSignTextStyle
                    ]}>
                        {item.signDetail}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    
        return (
            <View style={styles.signsListWrapStyle}>
                <FlatList
                    data={signsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.signsListContentStyle}
                />
            </View>
        );
    }

    function header() {
        return (
            <ImageBackground
                source={require('../../assets/images/bg1.jpg')}
                style={styles.headerWrapStyle}
                resizeMode="cover"
            >
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ marginLeft: Sizes.fixPadding - 5.0, }}>
                        <Text style={{ ...Fonts.whiteColor18Bold }}>
                            Mapa Astral
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%'
    },
    modalHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondaryColor
    },
    modalText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center'
    },
    closeIcon: {},
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.0,
        borderBottomLeftRadius: Sizes.fixPadding * 3.0,
        borderBottomRightRadius: Sizes.fixPadding * 3.0,
    },
    signImageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding * 1.5,
    },
    signItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    selectedSignItemStyle: {
        backgroundColor: Colors.secondaryColor
    },
    selectedSignTextStyle: {
        color: Colors.whiteColor,
    },
    signImageStyle: {},
    signTextWrapStyle: {
        flex: 1,
        marginLeft: Sizes.fixPadding,
        alignItems: 'center',
    },
    signNameTextStyle: {
        ...Fonts.blackColor14Medium,
    },
    signDetailTextStyle: {
        ...Fonts.grayColor10Regular,
    },
    signsListWrapStyle: {},
    signsListContentStyle: {
        paddingBottom: Sizes.fixPadding,
    },
    signImageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#003366',
        borderRadius: 4,
        paddingVertical: 8,
        width: '100%',
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    lastItemStyle: {
        borderBottomWidth: 0
    },
});

export default AstralMap;
