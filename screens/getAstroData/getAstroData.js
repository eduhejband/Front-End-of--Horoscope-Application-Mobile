import axios from 'axios';
import 'react-native-get-random-values';

// Função para calcular o signo chinês com base no ano de nascimento
const getChineseZodiac = (year) => {
    const animals = ['Rato', 'Boi', 'Tigre', 'Coelho', 'Dragão', 'Serpente', 'Cavalo', 'Cabra', 'Macaco', 'Galo', 'Cão', 'Porco'];
    const startYear = 1900; // Ano de referência

    if (year >= startYear && year <= 2040) {
        return animals[(year - startYear) % 12];
    } else {
        return null; // Retorne null se o ano estiver fora do intervalo 1900-2040
    }
};

export const getAstroData = async (userData) => {
    try {
        // Chamada para a API de mapa astral
        const astroResponse = await axios.post('https://serverteste-43462c33197a.herokuapp.com/mapa_astral', {
            user_id: userData?.userId, // Enviar o userId
            data_nascimento: userData?.data_nascimento,
            hora_nascimento: userData?.hora_nascimento,
            cidade_nascimento: userData?.cidade_nascimento,
            
        }, {
            headers: {
                'Authorization': 'YXqGNQOaNQdNkrsIP8M6C02Nb6P2l4MlwvU1rCENxtbnVAKvVQkoOD04pJ4YAda8k0QVsLZBkTpY0F5zKLx6xRc5HWjF3d7ULrHYD7q8Djhol9Fp9Mrxxzrp0VFjxUcs1dCjKIuQyX8BcLl6yMXlaIrJKpS6NOxRCqd2F7655bd13e2bc9e'
            }
        });

        if (astroResponse.data) {
            // Processamento da resposta da API de mapa astral
            const sunSign = astroResponse.data.Sun; // Presumindo que Sun seja retornado aqui

            // Isolar daily_advice se presente
            let dailyAdvice;
            if (astroResponse.data.daily_advice) {
                dailyAdvice = astroResponse.data.daily_advice;
                delete astroResponse.data.daily_advice; // Remover daily_advice do objeto principal
            }

            // Chamada para a API de conselhos
            const conselhoResponse = await axios.get(`https://serverteste-43462c33197a.herokuapp.com/conselho/${sunSign}`, {
                headers: {
                    'Authorization': 'YXqGNQOaNQdNkrsIP8M6C02Nb6P2l4MlwvU1rCENxtbnVAKvVQkoOD04pJ4YAda8k0QVsLZBkTpY0F5zKLx6xRc5HWjF3d7ULrHYD7q8Djhol9Fp9Mrxxzrp0VFjxUcs1dCjKIuQyX8BcLl6yMXlaIrJKpS6NOxRCqd2F7655bd13e2bc9e'
                }
            });

            if (conselhoResponse.data) {
                // Dividindo os conselhos em três categorias
                const conselhosData = {
                    afetivo: conselhoResponse.data.afetivo || '',
                    profissional: conselhoResponse.data.profissional || '',
                    saude: conselhoResponse.data.saude || ''
                };

                // Extração do ano de nascimento do usuário a partir da data_nascimento
                const birthYear = userData?.data_nascimento.split('.')[2]; // Supondo que a data está no formato DD.MM.AAAA

                // Calcula o signo chinês com base no ano extraído
                const chineseZodiac = getChineseZodiac(parseInt(birthYear));

                return {
                    astroData: astroResponse.data,
                    dailyAdvice: dailyAdvice,
                    conselhosData: conselhosData,
                    chineseZodiac: chineseZodiac // Adicionando o signo chinês
                };
            }
        }
    } catch (error) {
        console.error('Error in getAstroData:', error);
        throw error;
    }

    return null; // Retorna null se não houver dados ou em caso de erro
};
