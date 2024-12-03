import axios from 'axios';
import 'react-native-get-random-values';

// Função para verificar se o ID do usuário já existe
export const checkUserIdExistence = async (userId) => {
    try {
        const response = await axios.get(`API/data/get_astro_data/${userId}`, {
            headers: {
                'Authorization': 'Bearer '
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
        const response = await axios.post('API/register/register_astro_data', {
            id: userData?.id,
            name: userData?.name,
            data_nascimento: userData?.data_nascimento,
            hora_nascimento: userData?.hora_nascimento,
            cidade_nascimento: userData?.cidade_nascimento,
        }, {
            headers: {
                'Authorization': 'Bearer '
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
