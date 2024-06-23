import axios from 'axios';
import 'react-native-get-random-values';

export const updateAstroData = async (userData) => {
    try {
        // Chamada para a API de atualização
        const response = await axios.put(`https://serverdados-8805a7170f22.herokuapp.com/update/update_astro_data/${userData.id}`, {
            name: userData.name,
            data_nascimento: userData.data_nascimento,
            hora_nascimento: userData.hora_nascimento,
            cidade_nascimento: userData.cidade_nascimento,
        }, {
            headers: {
                'Authorization': 'Bearer OBviLmYRN4RboSLNyTqXulmrl22WxINY0PGKond7UpGVGVfuYWWkwWM7OtqusbA8NoV9eM4YIeyH8iF7DDfwwyAqx2zavMrhdBZD8xw6o7xRRMeh3wuwoOk4tgTfL5zZMsHgX7ZWFGnRqPxC9VzDSfK4xKj8qqbX4tOAZOq7nSzVLPMe5WeFd2pIIUqIglTp9xwz0qlVeXwTfWcOUADqajO8vHfJGcikPsA3RWb8EjocvPKHVCA1yDvCt27yjDPb'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error in updateAstroData:', error);
        throw error;
    }
};
