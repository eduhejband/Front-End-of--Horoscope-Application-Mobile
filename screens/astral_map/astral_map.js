import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const AstroProfile = ({ route }) => {
  const { userData } = route.params; // Assumindo que userData é passado como parâmetro
  const [astroData, setAstroData] = useState(null);

  useEffect(() => {
    const getAstroData = async () => {
      try {
        const response = await axios.post('https://serverteste-43462c33197a.herokuapp.com/mapa_astral', {
          data_nascimento: userData?.data_nascimento,
          hora_nascimento: userData?.hora_nascimento,
          cidade_nascimento: userData?.cidade_nascimento
        }, {
          headers: {
            'Authorization': 'Bearer YOUR_TOKEN' // Substitua YOUR_TOKEN pelo seu token real
          }
        });

        if (response.data) {
          setAstroData(response.data);
        }
      } catch (error) {
        console.error('Error fetching astro data:', error);
      }
    };

    getAstroData();
  }, []);

  if (!astroData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        {/*<Image source={require('path_to_your_default_avatar_image')} style={styles.avatar} />*/}
        <Text style={styles.name}>{userData?.nome || 'Edu'}</Text>
      </View>

      <View style={styles.astroDetails}>
        <View style={styles.astroItem}>
          {/*<Image source={require('path_to_your_zodiac_icon')} style={styles.icon} />*/}
          <Text style={styles.text}>{astroData.signo}</Text>
        </View>
        {/* Repita para cada item do perfil astrológico */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#blue', // Substitua pela cor desejada
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  astroDetails: {
    // Estilos para a seção de detalhes astrológicos
  },
  astroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
  // Adicione mais estilos conforme necessário
});

export default AstroProfile;
