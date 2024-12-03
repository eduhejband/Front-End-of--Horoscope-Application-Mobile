import axios from 'axios';
import 'react-native-get-random-values';

export const updateAstroData = async (userData) => {
    try {
        const response = await axios.put('API/update/update_astro_data', {
            id: userData.id,
            name: userData.name,
            data_nascimento: userData.data_nascimento,
            hora_nascimento: userData.hora_nascimento,
            cidade_nascimento: userData.cidade_nascimento,
        }, {
            headers: {
                'Authorization': 'Bearer '
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Erro na atualização:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Erro na requisição:', error.request);
        } else {
            console.error('Erro na configuração:', error.message);
        }
        throw error;
    }
};
