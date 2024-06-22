import axios from 'axios';
import 'react-native-get-random-values';

export const registerAstroData = async (userData) => {
    try {
        // Chamada para a API de cadastro
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
        console.error('Error in registerAstroData:', error);
        throw error;
    }

    return null; // Retorna null se não houver dados ou em caso de erro
};
