import axios from 'axios';
import 'react-native-get-random-values';

// Função para verificar se o ID do usuário já existe
export const checkUserIdExistence = async (userId) => {
    try {
        const response = await axios.get(`https://serverdados-8805a7170f22.herokuapp.com/data/get_astro_data/${userId}`, {
            headers: {
                'Authorization': 'Bearer RVj46uupo0TEO5QvWkfXYdfnpOs98xYfo8dbSwAdLKZSfb1A3b4S0OqSzUlQeQ5X4yBZbOGaSJzIilF2QkPs8ACqAQLJwHvxn1kvYwYcg0zlyCEByGXBbbeJ41uC2kCCEsSfmh4kYnG81F7VMGuBxpVmCS8uPA4njUSA4XC7ufIBRoZF7Ncf4raPc5H1qXgBFpOtxWJQkp9jnNENeUP86VLTIQuRckKP69bbyPrxFU2APzZDClPPEXWJcvjhJcqG'
            }
        });

        // Verifica se o status é 200 (OK)
        return response.status === 200;
    } catch (error) {
        return false; // Em caso de erro, assume que o ID não existe
    }
};

// Função para registrar os dados do usuário
export const registerAstroData = async (userData) => {
    try {
        const response = await axios.post('https://serverdados-8805a7170f22.herokuapp.com/register/register_astro_data', {
            id: userData?.id,
            name: userData?.name,
            data_nascimento: userData?.data_nascimento,
            hora_nascimento: userData?.hora_nascimento,
            cidade_nascimento: userData?.cidade_nascimento,
        }, {
            headers: {
                'Authorization': 'Bearer OBviLmYRN4RboSLNyTqXulmrl22WxINY0PGKond7UpGVGVfuYWWkwWM7OtqusbA8NoV9eM4YIeyH8iF7DDfwwyAqx2zavMrhdBZD8xw6o7xRRMeh3wuwoOk4tgTfL5zZMsHgX7ZWFGnRqPxC9VzDSfK4xKj8qqbX4tOAZOq7nSzVLPMe5WeFd2pIIUqIglTp9xwz0qlVeXwTfWcOUADqajO8vHfJGcikPsA3RWb8EjocvPKHVCA1yDvCt27yjDPb'
            }
        });

        if (response.data) {
            // Retorna os dados da resposta se necessário
            return response.data;
        }
    } catch (error) {
        console.error('Erro no registerAstroData:', error);
        throw error; // Propaga o erro para ser tratado externamente se necessário
    }

    return null; // Retorna null se não houver dados ou em caso de erro
};
