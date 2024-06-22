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
                'Authorization': 'Bearer VYFv1RodXIH4hMDjn8UpcWvfsEwyD7Dq6XV4wS3bNWyzU4V0ndnR7dxiBJVxTnvPLbIqyzWwlByECbeRr6nMDNpAbHyz7rAGAY1w54E09OjD0vPTDuHI2j2CHbIqaefPRfD3MyvBqQLu4F21trvA03uYgVHQJThwkl5Jc0dBCiATRrjCwQJeFUZF0KZImBdGCdhZ4bAF7J8JMSnFIpCooHKIv2VgsYptp80MJ6VPGRwdPZ7nFwt1Twzxp6znnSJi'
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
