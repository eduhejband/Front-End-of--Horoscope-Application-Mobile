import React, { useState } from "react";
import { Modal,SafeAreaView, View, Dimensions, StatusBar, FlatList, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
const { width } = Dimensions.get('window');


const HoroscopeDetailScreen = ({ navigation, route }) => {
    const { astroData } = route.params;
    const signsList = [
        {
            id: '1',
            signImage: require('../../assets/planets/sol.png'),
            signName: 'Sol:' ,
            signDetail: astroData ? astroData.Sun : 'Detalhes não disponíveis',
            signDescription: 'Representa a posição do Sol no momento do seu nascimento. É o aspecto mais conhecido da astrologia e está frequentemente associado à consciência central, ego e identidade pessoal. O signo solar é comumente o que as pessoas se referem quando falam sobre "seu signo".'
        },
        {
            id: '2',
            signImage: require('../../assets/planets/lua.png'),
            signName: 'Lua:',
            signDetail: astroData ? astroData.Moon : 'Detalhes não disponíveis',
            signDescription: ' Refere-se à posição da Lua no momento do nascimento. O signo lunar está relacionado às emoções, instintos, memória e aspectos subconscientes da personalidade. Ele é considerado importante para entender a vida emocional interna de uma pessoa.'
        },
        {
            id: '3',
            signImage: require('../../assets/planets/jupiter.png'),
            signName: 'Júpiter:',
            signDetail: astroData ? astroData.Jupiter : 'Detalhes não disponíveis',
            signDescription: 'Júpiter leva cerca de 12 anos para orbitar o Sol, passando aproximadamente um ano em cada signo do zodíaco. O signo em que Júpiter está posicionado no seu nascimento está associado a como você expressa otimismo, crescimento, expansão e moralidade.'
        },
        {
            id: '4',
            signImage: require('../../assets/planets/marte.png'),
            signName: 'Marte:',
            signDetail: astroData ? astroData.Mars : 'Detalhes não disponíveis',
            signDescription: 'Associado à comunicação, raciocínio e aprendizado.'
        },
        {
            id: '5',
            signImage: require('../../assets/planets/mercurio.png'),
            signName: 'Mercúrio:',
            signDetail: astroData ? astroData.Mercury : 'Detalhes não disponíveis',
            signDescription: 'Associado à comunicação, raciocínio e aprendizado.'
        },
        {
            id: '6',
            signImage: require('../../assets/planets/netuno.png'),
            signName: 'Netuno:',
            signDetail: astroData ? astroData.Neptune : 'Detalhes não disponíveis',
            signDescription: 'Relacionado a sonhos, intuição e espiritualidade.'
        },
        {
            id: '7',
            signImage: require('../../assets/planets/plutao.png'),
            signName: 'Plutão:',
            signDetail: astroData ? astroData.Pluto : 'Detalhes não disponíveis',
            signDescription: 'Associado a transformação, poder e regeneração.'
        },
        {
            id: '8',
            signImage: require('../../assets/planets/saturn.png'),
            signName: 'Saturno:',
            signDetail: astroData ? astroData.Saturn : 'Detalhes não disponíveis',
            signDescription: 'Ligado a estrutura, responsabilidade e maturidade.'
        },
        {
            id: '9',
            signImage: require('../../assets/planets/uranu.png'),
            signName: 'Urano:',
            signDetail: astroData ? astroData.Uranus : 'Detalhes não disponíveis',
            signDescription: 'Associado a originalidade, liberdade e mudanças repentinas.'
        },
        {
            id: '10',
            signImage: require('../../assets/planets/venus.png'),
            signName: 'Vênus:',
            signDetail: astroData ? astroData.Venus : 'Detalhes não disponíveis',
            signDescription: 'Relacionado ao amor, beleza, prazer e valores.'
        },
        
    ];
    const [state, setState] = useState({ currentSelectedSignId: signsList[3].id, })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

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
                                color="black" // Ou outra cor de sua escolha
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
    )



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
                    index === signsList.length - 1 && styles.lastItemStyle // Adiciona um estilo diferente para o último item
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
        )
    }


    function header() {
        return (
            <ImageBackground
                source={require('../../assets/images/bg1.jpg')} // Substitua pelo caminho correto da sua imagem
                style={styles.headerWrapStyle}
                resizeMode="cover" // Isso garante que a imagem cubra todo o espaço disponível
            >
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ marginLeft: Sizes.fixPadding - 5.0, }}>
                        <Text style={{ ...Fonts.whiteColor18Bold }}>
                            Mapa Astral
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido para o modal
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
        width: '80%' // Ajuste a largura conforme necessário
    },
    modalHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10 // Espaço entre o cabeçalho e o conteúdo do modal
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.secondaryColor // Cor do título
    },
    modalText: {
        fontSize: 16,
        color: 'black', // Cor do texto
        textAlign: 'center'
    },
    closeIcon: {
        // Estilos adicionais para o ícone de fechar, se necessário
    },
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
        paddingVertical: Sizes.fixPadding, // Você pode ajustar o padding conforme necessário
        paddingHorizontal: Sizes.fixPadding * 2.0, // Ajuste conforme necessário para a centralização
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        },
    selectedSignItemStyle: {
        backgroundColor: Colors.secondaryColor // Cor do background do header
    },
    selectedSignTextStyle: {
        color: Colors.whiteColor, // Texto branco para o item selecionado
    },
    signImageStyle: {
        // Estilos para a imagem, se necessário
    },
    signTextWrapStyle: {
        flex: 1,
        marginLeft: Sizes.fixPadding,
        alignItems: 'center', // Centraliza o conteúdo verticalmente
    },
    signNameTextStyle: {
        ...Fonts.blackColor14Medium,
    },
    signDetailTextStyle: {
        ...Fonts.grayColor10Regular,
    },
    signsListWrapStyle: {
     // Estilos para o envoltório da lista, se necessário
    },
    signsListContentStyle: {
        paddingBottom: Sizes.fixPadding,
    },
    signImageStyle: {
        width: 40, // tamanho reduzido
        height: 40, // tamanho reduzido
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
        borderBottomWidth: 0 // Remove a linha de demarcação
    },

});

export default HoroscopeDetailScreen;