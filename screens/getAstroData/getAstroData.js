import axios from 'axios';

export const getAstroData = async (userData) => {

    try {
        // Chamada para a API de mapa astral
        const astroResponse = await axios.post('https://serverteste-43462c33197a.herokuapp.com/mapa_astral', {
            data_nascimento: userData?.data_nascimento,
            hora_nascimento: userData?.hora_nascimento,
            cidade_nascimento: userData?.cidade_nascimento
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

                return {
                    astroData: astroResponse.data,
                    dailyAdvice: dailyAdvice,
                    conselhosData: conselhosData
                };
            }
        }
    } catch (error) {
        console.error('Error in getAstroData:', error);
        throw error;
    }

    return null; // Retorna null se não houver dados ou em caso de erro
};
