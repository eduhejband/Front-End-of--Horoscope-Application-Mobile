import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerAstroData } from '../getAstroData/getAstroData';
import NetInfo from '@react-native-community/netinfo';
import 'react-native-get-random-values';

export default function SigninScreen({ navigation }) {
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

  const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
  };

  const isFutureDate = (date) => {
    const today = new Date();
    return date > today;
  };

  const isValidDayForMonth = (day, month, year) => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? day <= 29 : day <= 28;
    }
    return day <= daysInMonth[month - 1];
  };

  const validateBirthDate = (date) => {
    const birthDateParts = date.split('/');
    if (birthDateParts.length === 3 &&
        birthDateParts[0].length === 2 && 
        birthDateParts[1].length === 2 && 
        birthDateParts[2].length === 4) {

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
      if (data && data.length > 0) {
        setBirthplaceValidation(true);
      } else {
        setBirthplaceValidation(false);
      }
    } catch (error) {
      setBirthplaceValidation(false);
    }
    setIsCheckingBirthplace(false);
  };

  useEffect(() => {
    if (birthplace) {
      setIsCheckingBirthplace(true);
      setBirthplaceValidation(null);

      const timerId = setTimeout(() => {
        checkBirthplaceValidity(birthplace);
      }, 5000);

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

        if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
          setBirthTimeValidation(true);
        } else {
          setBirthTimeValidation(false);
        }
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

  async function handleRegister() {
    setIsLoading(true);

    // Verificar conexão com a internet
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Alert.alert('Sem Conexão', 'Por favor, verifique sua conexão com a internet e tente novamente.');
      setIsLoading(false);
      return;
    }

    if (!name || birthplaceValidation === false || !birthplace || !birthDate || birthDateValidation === false) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha os campos corretamente.');
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

    // Gerar um ID numérico
    const userId = Math.floor(Math.random() * 1000000);

    const userData = {
      id: userId,
      name: name,
      data_nascimento: formattedBirthDate,
      hora_nascimento: formattedBirthTime,
      cidade_nascimento: formattedBirthplace
    };

    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.setItem('userId', userId.toString());

      const registerResponse = await Promise.race([
        registerAstroData(userData),
        timeout(30000)
      ]);

      console.log("Resposta da API de registro:", registerResponse);

      if (registerResponse) {
        console.log("Navegando para BottomTabBar.");
        navigation.navigate('BottomTabBar', { name });
      } else {
        console.log("Erro: Falha no registro.");
        Alert.alert('Erro', 'Não foi possível completar o registro. Por favor, tente novamente.');
        setIsLoading(false);
        return;
      }
    } catch (error) {
      setIsLoading(false);
      if (error.message === "Tempo limite excedido") {
        Alert.alert('Erro', 'Ocorreu algum erro de conexão.');
      } else {
        console.error("Erro ao registrar dados:", error);
        Alert.alert('Erro', 'Ocorreu um erro ao registrar os dados. Por favor, tente novamente.');
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
          <Text style={styles.message}>Bem Vindo(a)</Text>
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

          <TouchableOpacity
            style={[styles.button, (isLoading || isCheckingBirthplace || isCheckingBirthDate || isCheckingBirthTime || birthplaceValidation === false || birthDateValidation === false || birthTimeValidation === false) ? styles.buttonLoading : {}]}
            onPress={handleRegister}
            disabled={isLoading || isCheckingBirthplace || isCheckingBirthDate || isCheckingBirthTime || birthplaceValidation === false || birthDateValidation === false || birthTimeValidation === false}
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
  }
});
