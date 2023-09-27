import axios from 'axios';

export const getAstroData = async (userData) => {
    try {
        const response = await axios.post('http://192.168.20.114:5000/mapa_astral', {
            data_nascimento: userData?.data_nascimento,
            hora_nascimento: userData?.hora_nascimento,
            cidade_nascimento: userData?.cidade_nascimento
        });

        if (response.data) {
            return response.data.daily_advice;
        }
    } catch (error) {
        console.error('Error fetching astro data:', error);
    }
    return null;
};
