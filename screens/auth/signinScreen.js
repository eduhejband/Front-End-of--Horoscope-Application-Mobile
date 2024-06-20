import React, { useState,useEffect  } from 'react';
import {ImageBackground,View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAstroData } from '../getAstroData/getAstroData';

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
  const isValidDate = (d) => {
    if (Object.prototype.toString.call(d) === "[object Date]") {
      if (isNaN(d.getTime())) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
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
    if (birthDateParts.length !== 3 || birthDateParts[1] > 12 || !isValidDayForMonth(birthDateParts[0], birthDateParts[1], birthDateParts[2])) {
      setBirthDateError(true);
    } else {
      const birthDateObject = new Date(parseInt(birthDateParts[2]), parseInt(birthDateParts[1]) - 1, parseInt(birthDateParts[0]));

      if (!isValidDate(birthDateObject) || isFutureDate(birthDateObject)) {
        setBirthDateError(true);
      } else {
        setBirthDateError(false);
      }
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
      setIsCheckingBirthplace(true);  // Define "Aguarde" assim que o usuário começa a digitar
      setBirthplaceValidation(null);  // Limpa as mensagens de validação assim que o usuário começa a digitar
  
      const timerId = setTimeout(() => {
        checkBirthplaceValidity(birthplace);
      }, 5000);
  
      return () => {
        clearTimeout(timerId);  // Limpa o timer se o usuário alterar o valor no campo
        setIsCheckingBirthplace(false); // Esconde "Aguarde" quando o usuário altera o valor no campo
      };
    } else {
      setBirthplaceValidation(null);
      setIsCheckingBirthplace(false);
    }
  }, [birthplace]);

  const checkBirthDateValidity = () => {
    setIsCheckingBirthDate(true);
  
    // birthDate está no formato DD/MM/YYYY
    const birthDateParts = birthDate.split('/');
    if (birthDateParts.length === 3) {
      const day = parseInt(birthDateParts[0], 10);
      const month = parseInt(birthDateParts[1], 10) - 1; // Mês em JavaScript é 0-indexado
      const year = parseInt(birthDateParts[2], 10);
  
      const birthDateObject = new Date(year, month, day);
      const currentDate = new Date();
  
      // Verifica se a data de nascimento é válida e não é uma data futura
      if (!isNaN(birthDateObject.getTime()) && birthDateObject < currentDate) {
        setBirthDateValidation(true);
      } else {
        setBirthDateValidation(false);
      }
    } else {
      setBirthDateValidation(false);
    }
  
    setIsCheckingBirthDate(false);
  };
  
  useEffect(() => {
    if (birthDate) {
      setIsCheckingBirthDate(true);
      setBirthDateValidation(null); // Limpa o estado de validação ao começar a edição
  
      const timerId = setTimeout(() => {
        checkBirthDateValidity();
      }, 5000); // Delay de 5 segundos para a validação
  
      return () => {
        clearTimeout(timerId);
        setIsCheckingBirthDate(false); // Esconde "Aguarde" quando o usuário altera o valor no campo
      };
    } else {
      setBirthDateValidation(null);
      setIsCheckingBirthDate(false);
    }
  }, [birthDate]);
  

  
async function handleRegister() {
  setIsLoading(true);

  if (!name || birthplaceValidation === false || !birthplace || !birthDate) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha os campos corretamente.');
      setIsLoading(false);
      return;
  }

  if (isCheckingBirthplace) {
      Alert.alert('Aguarde', 'Por favor, aguarde a verificação do local de nascimento.');
      setIsLoading(false);
      return;
  }

  if (birthplaceValidation === false) {
      Alert.alert('Por favor, digite um local de nascimento válido');
      setIsLoading(false);
      return;
  }

  const birthDateParts = birthDate.split('/');
  if (birthDateParts.length !== 3 || birthDateParts[1] > 12 || !isValidDayForMonth(birthDateParts[0], birthDateParts[1], birthDateParts[2])) {
      Alert.alert('Erro', 'Por favor, insira uma data válida no formato DD/MM/AAAA.');
      setIsLoading(false);
      return;
  }

  const birthDateObject = new Date(parseInt(birthDateParts[2]), parseInt(birthDateParts[1]) - 1, parseInt(birthDateParts[0]));

  if (!isValidDate(birthDateObject)) {
      Alert.alert('Erro', 'Por favor, insira uma data válida.');
      setIsLoading(false);
      return;
  }

  if (isFutureDate(birthDateObject)) {
      Alert.alert('Erro', 'A data de nascimento não pode ser no futuro.');
      setIsLoading(false);
      return;
  }

  const formattedBirthDate = `${birthDateParts[0]}.${birthDateParts[1]}.${birthDateParts[2]}`;
  const formattedBirthplace = birthplace.split(',').map(item => item.trim()).join('.');

  const userData = {
      name: name,
      data_nascimento: formattedBirthDate,
      hora_nascimento: "12:00",
      cidade_nascimento: formattedBirthplace
  };

  try {
    const astroData = await Promise.race([
        getAstroData(userData),
        timeout(30000)  // 30 segundos
    ]);

    console.log("Dados recebidos da API getAstroData:", astroData.chineseZodiac);

    // Verifique se os dados obtidos são válidos e completos
    if (astroData && astroData.astroData && astroData.dailyAdvice && astroData.conselhosData && astroData.chineseZodiac) {
      console.log("Navegando para zodiacHoroscopeFirstEscorpiaoScreen com dados carregados.\n\n\n");
      navigation.navigate('zodiacHoroscopeFirstEscorpiaoScreen', { 
          astroData: astroData.astroData,
          dailyAdvice: astroData.dailyAdvice,
          conselhoProfissional: astroData.conselhosData.profissional,
          conselhoSaude: astroData.conselhosData.saude,
          conselhoAfetivo: astroData.conselhosData.afetivo,
          userData: userData,
          name: name,
          chineseZodiac: astroData.chineseZodiac  
      });
      
    } else {
        console.log("Erro: Dados astrológicos incompletos ou inválidos.");
        Alert.alert('Erro', 'Não foi possível obter os dados astrológicos completos. Por favor, tente novamente.');
        setIsLoading(false);
        return;
    }
  } catch (error) {
      setIsLoading(false);
      if (error.message === "Tempo limite excedido") {
          Alert.alert('Erro', 'Ocorreu algum erro de conexão.');
      } else {
          console.error("Erro ao buscar dados astrológicos:", error);
          Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados. Por favor, tente novamente.');
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
          {birthplaceValidation === false && <Text style={styles.messageInvalid}>Local inválido.</Text>}

          <Text style={styles.title}>Data de Nascimento</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            value={birthDate}
            onChangeText={text => {
              setBirthDate(text);
              validateBirthDate(text);
            }}
            style={styles.input}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
          />
          {isCheckingBirthDate && <Text style={styles.messageChecking}>Aguarde...</Text>}
          {birthDateValidation === true && <Text style={styles.messageValid}>Data válida.</Text>}
          {birthDateValidation === false && <Text style={styles.messageInvalid}>Por favor, insira uma data válida.</Text>}
          <TouchableOpacity 
              style={[styles.button, (isLoading || isCheckingBirthplace || isCheckingBirthDate || birthplaceValidation === false || birthDateValidation === false) ? styles.buttonLoading : {}]} 
              onPress={handleRegister} 
              disabled={isLoading || isCheckingBirthplace || isCheckingBirthDate || birthplaceValidation === false || birthDateValidation === false}
            >
              <Text style={styles.buttonText}>
                  {isLoading || isCheckingBirthplace || isCheckingBirthDate ? 'Aguarde...' : 'Prosseguir'}
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
    fontSize: 14,  // ou outro tamanho de fonte que preferir
    marginBottom: 5,  // ou outra margem que preferir
  },
  button: {
    backgroundColor: '#003366',
    borderRadius: 4,
    paddingVertical: 8,
    width: '100%',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:5
  },
  buttonLoading: {
    backgroundColor: '#aaa', // ou qualquer outra cor para indicar que o botão está desativado
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