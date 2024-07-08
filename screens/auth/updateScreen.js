import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import 'react-native-get-random-values';
import { CheckBox } from 'react-native-elements';
import { updateAstroData } from '../getAstroData/getUpdate'; // Importar função de atualização

export default function UpdateDataScreen({ navigation }) {
    const [name, setName] = useState('');
    const [birthplace, setBirthplace] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthDateError, setBirthDateError] = useState(false);
    const [birthplaceValidation, setBirthplaceValidation] = useState(null);
    const [isCheckingBirthDate, setIsCheckingBirthDate] = useState(false);
    const [birthDateValidation, setBirthDateValidation] = useState(null);
    const [isCheckingBirthplace, setIsCheckingBirthplace] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [birthTime, setBirthTime] = useState('');
    const [birthTimeValidation, setBirthTimeValidation] = useState(null);
    const [isCheckingBirthTime, setIsCheckingBirthTime] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const isValidDate = (d) => d instanceof Date && !isNaN(d);
    const isFutureDate = (date) => date > new Date();
    const isValidDayForMonth = (day, month, year) => {
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month === 2) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? day <= 29 : day <= 28;
        }
        return day <= daysInMonth[month - 1];
    };

    const validateBirthDate = (date) => {
        const birthDateParts = date.split('/');
        if (birthDateParts.length === 3 && birthDateParts[0].length === 2 && birthDateParts[1].length === 2 && birthDateParts[2].length === 4) {
            const day = parseInt(birthDateParts[0], 10);
            const month = parseInt(birthDateParts[1], 10);
            const year = parseInt(birthDateParts[2], 10);
            if (month > 12 || !isValidDayForMonth(day, month, year)) {
                setBirthDateError(true);
                setBirthDateValidation(false);
                return;
            }
            const birthDateObject = new Date(year, month - 1, day);
            if (!isValidDate(birthDateObject) || isFutureDate(birthDateObject)) {
                setBirthDateError(true);
                setBirthDateValidation(false);
            } else {
                setBirthDateError(false);
                setBirthDateValidation(true);
            }
        } else {
            setBirthDateError(true);
            setBirthDateValidation(false);
        }
    };

    const checkBirthplaceValidity = async (place) => {
        setIsCheckingBirthplace(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${place}&format=json`);
            const data = await response.json();
            setBirthplaceValidation(data && data.length > 0);
        } catch (error) {
            setBirthplaceValidation(false);
        }
        setIsCheckingBirthplace(false);
    };

    useEffect(() => {
        if (birthplace) {
            setIsCheckingBirthplace(true);
            setBirthplaceValidation(null);
            const timerId = setTimeout(() => checkBirthplaceValidity(birthplace), 5000);
            return () => {
                clearTimeout(timerId);
                setIsCheckingBirthplace(false);
            };
        } else {
            setBirthplaceValidation(null);
            setIsCheckingBirthplace(false);
        }
    }, [birthplace]);

    useEffect(() => {
        if (birthDate) {
            setIsCheckingBirthDate(true);
            setBirthDateValidation(null);
            const timerId = setTimeout(() => {
                validateBirthDate(birthDate);
                setIsCheckingBirthDate(false);
            }, 1000);
            return () => {
                clearTimeout(timerId);
                setIsCheckingBirthDate(false);
            };
        } else {
            setBirthDateValidation(null);
            setIsCheckingBirthDate(false);
        }
    }, [birthDate]);

    const checkBirthTimeValidity = () => {
        setIsCheckingBirthTime(true);
        if (birthTime) {
            const birthTimeParts = birthTime.split(':');
            if (birthTimeParts.length === 2) {
                const hours = parseInt(birthTimeParts[0], 10);
                const minutes = parseInt(birthTimeParts[1], 10);
                setBirthTimeValidation(hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60);
            } else {
                setBirthTimeValidation(false);
            }
        } else {
            setBirthTimeValidation(null);
        }
        setIsCheckingBirthTime(false);
    };

    useEffect(() => {
        if (birthTime) {
            setIsCheckingBirthTime(true);
            setBirthTimeValidation(null);
            const timerId = setTimeout(() => {
                checkBirthTimeValidity();
                setIsCheckingBirthTime(false);
            }, 1000);
            return () => {
                clearTimeout(timerId);
                setIsCheckingBirthTime(false);
            };
        } else {
            setBirthTimeValidation(null);
            setIsCheckingBirthTime(false);
        }
    }, [birthTime]);

    async function handleUpdate() {
        setIsLoading(true);
    
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
            Alert.alert('Sem Conexão', 'Por favor, verifique sua conexão com a internet e tente novamente.');
            setIsLoading(false);
            return;
        }
    
        if (!name || birthplaceValidation === false || !birthplace || !birthDate || birthDateValidation === false || !isTermsAccepted) {
            Alert.alert('Campos obrigatórios', 'Por favor, preencha os campos corretamente e aceite os termos.');
            setIsLoading(false);
            return;
        }
    
        if (isCheckingBirthplace || isCheckingBirthDate || isCheckingBirthTime) {
            Alert.alert('Aguarde', 'Por favor, aguarde as verificações.');
            setIsLoading(false);
            return;
        }
    
        if (birthplaceValidation === false) {
            Alert.alert('Erro', 'Por favor, digite um local de nascimento válido.');
            setIsLoading(false);
            return;
        }
    
        if (birthTimeValidation === false) {
            Alert.alert('Erro', 'Por favor, insira um horário válido ou deixe o campo vazio.');
            setIsLoading(false);
            return;
        }
    
        const birthDateParts = birthDate.split('/');
        const formattedBirthDate = `${birthDateParts[0]}.${birthDateParts[1]}.${birthDateParts[2]}`;
        const formattedBirthplace = birthplace.split(',').map(item => item.trim()).join('.');
        const formattedBirthTime = birthTime || '12:00';
    
        const userId = await AsyncStorage.getItem('userId'); // Obter userId do AsyncStorage
    
        const userData = {
            id: userId,
            name: name,
            data_nascimento: formattedBirthDate,
            hora_nascimento: formattedBirthTime,
            cidade_nascimento: formattedBirthplace
        };
    
        try {
            const updateResponse = await Promise.race([
                updateAstroData(userData),
                timeout(30000)
            ]);
    
            if (updateResponse) {
                await AsyncStorage.setItem('name', name); // Salvar o nome atualizado no AsyncStorage
                Alert.alert('Sucesso', 'Seus dados foram atualizados com sucesso.');
                navigation.navigate('BottomTabBar', { name: name });
            } else {
                Alert.alert('Erro', 'Não foi possível completar a atualização. Por favor, tente novamente.');
                setIsLoading(false);
                return;
            }
        } catch (error) {
            setIsLoading(false);
            if (error.message === "Tempo limite excedido") {
                Alert.alert('Erro', 'Ocorreu algum erro de conexão.');
            } else {
                console.error("Erro ao atualizar dados:", error);
                Alert.alert('Erro', 'Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.');
            }
        } finally {
            setIsLoading(false);
        }
    }
    

    function timeout(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Tempo limite excedido"));
            }, ms);
        });
    }

    return (
        <ImageBackground source={require('../../assets/images/bg1.jpg')} style={styles.container}>
            <KeyboardAwareScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <Animatable.View delay={500} animation={'fadeInLeft'} style={styles.containerHeader}>
                    <Text style={styles.message}>Atualizar Dados</Text>
                </Animatable.View>

                <Animatable.View animation={'fadeInUp'} style={styles.containerForm}>
                    <Text style={styles.title}>Nome</Text>
                    <TextInput placeholder='Digite seu nome' style={styles.input} value={name} onChangeText={setName} />
                    <Text style={styles.title}>Local de Nascimento</Text>
                    <TextInput
                        placeholder='ex: São Paulo, SP, Brasil'
                        style={styles.input}
                        onChangeText={setBirthplace}
                        value={birthplace}
                    />
                    {isCheckingBirthplace && <Text style={styles.messageChecking}>Aguarde...</Text>}
                    {birthplaceValidation === true && <Text style={styles.messageValid}>Local válido.</Text>}
                    {birthplaceValidation === false && <Text style={styles.messageInvalid}>Local inválido ou sem conexão com a internet.</Text>}

                    <Text style={styles.title}>Data de Nascimento</Text>
                    <TextInputMask
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={birthDate}
                        onChangeText={text => setBirthDate(text)}
                        style={styles.input}
                        placeholder="DD/MM/AAAA"
                        keyboardType="numeric"
                    />
                    {isCheckingBirthDate && <Text style={styles.messageChecking}>Aguarde...</Text>}
                    {birthDateValidation === true && <Text style={styles.messageValid}>Data válida.</Text>}
                    {birthDateValidation === false && <Text style={styles.messageInvalid}>Por favor, insira uma data válida.</Text>}

                    <Text style={styles.title}>Horário de Nascimento (opcional)</Text>
                    <TextInputMask
                        type={'datetime'}
                        options={{
                            format: 'HH:mm'
                        }}
                        value={birthTime}
                        onChangeText={setBirthTime}
                        style={styles.input}
                        placeholder="HH:MM"
                        keyboardType="numeric"
                    />
                    {isCheckingBirthTime && <Text style={styles.messageChecking}>Aguarde...</Text>}
                    {birthTimeValidation === true && <Text style={styles.messageValid}>Horário válido.</Text>}
                    {birthTimeValidation === false && <Text style={styles.messageInvalid}>Por favor, insira um horário válido ou deixe em branco.</Text>}

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            checked={isTermsAccepted}
                            onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                            containerStyle={styles.checkbox}
                            checkedColor="#003366"
                        />
                        <Text style={styles.label}>
                            Eu li e aceito os{' '}
                            <Text style={styles.link} onPress={() => Linking.openURL('https://online.fliphtml5.com/jqaqj/zxlt/')}>
                                Termos de Uso
                            </Text>{' '}
                            e a{' '}
                            <Text style={styles.link} onPress={() => Linking.openURL('https://online.fliphtml5.com/jqaqj/tzfo/#p=1')}>
                                Política de Privacidade
                            </Text>
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, (isLoading || isCheckingBirthplace || isCheckingBirthDate || isCheckingBirthTime || birthplaceValidation === false || birthDateValidation === false || birthTimeValidation === false || !isTermsAccepted) ? styles.buttonLoading : {}]}
                        onPress={handleUpdate}
                        disabled={isLoading || isCheckingBirthplace || isCheckingBirthDate || isCheckingBirthTime || birthplaceValidation === false || birthDateValidation === false || birthTimeValidation === false || !isTermsAccepted}
                    >
                        <Text style={styles.buttonText}>
                            {isLoading || isCheckingBirthplace || isCheckingBirthDate || isCheckingBirthTime ? 'Aguarde...' : 'Prosseguir'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.goBack()}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </KeyboardAwareScrollView >
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },

    containerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        paddingTop: '5%',
    },

    scrollContainer: {
        flex: 1
    },

    scrollContentContainer: {
        flexGrow: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 28,
    },
    item: {
        padding: 10,
        height: 'auto',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    optionalText: {
        color: 'gray',
        fontSize: 14,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#003366',
        borderRadius: 4,
        paddingVertical: 8,
        width: '100%',
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    buttonLoading: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    messageChecking: {
        color: 'blue',
        fontSize: 12
    },
    messageValid: {
        color: 'green',
        fontSize: 12
    },
    messageInvalid: {
        color: 'red',
        fontSize: 12
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginVertical: 15,
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 10,
        padding: 0,
    },
    label: {
        flex: 1,
        fontSize: 14,
    },
    link: {
        color: '#003366',
        textDecorationLine: 'underline',
    }
});