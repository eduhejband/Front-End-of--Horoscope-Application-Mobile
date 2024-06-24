import axios from 'axios';
import 'react-native-get-random-values';

export const updateAstroData = async (userData) => {
    try {
        const response = await axios.put('https://serverdados-8805a7170f22.herokuapp.com/update/update_astro_data', {
            id: userData.id,
            name: userData.name,
            data_nascimento: userData.data_nascimento,
            hora_nascimento: userData.hora_nascimento,
            cidade_nascimento: userData.cidade_nascimento,
        }, {
            headers: {
                'Authorization': 'Bearer CxBl4CswsviGSt4utFzxM0AHiQcgi4qEtTXr6V5Li3hFLOHMFrpdTsiSC5XpLMS5ODzdDBxZyjTGzZRsb5F2EFRWjVYnzu5s5LznnCpFVQ1uM9obk4jxwW0QnuwSHZ4dNT8JLIqNngegQphSppQTwKJlmT4LidnesW6dZ1fuYdXNWMgU4GidDD03T27maSH1gHKh2v3VzZH0OqOwz9fSfbyJiwgKjQeIK1O5OAhTjc7BHq0hOVGXxKio48yYeFVx'
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
