import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import BottomTabBarScreen from './components/bottomTabBarScreen';
import zodiacHoroscopeDetailAriesScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailAriesScreen';
import zodiacHoroscopeDetailTouroScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailTouroScreen';
import zodiacHoroscopeDetailGemeosScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailGemeosScreen';
import zodiacHoroscopeDetailCancerScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailCancerScreen';
import zodiacHoroscopeDetailLeaoScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailLeaoScreen';
import zodiacHoroscopeDetailVirgemScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailVirgemScreen';
import zodiacHoroscopeDetailLibraScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailLibraScreen';
import zodiacHoroscopeDetailEscorpiaoScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailEscorpiaoScreen';
import zodiacHoroscopeDetailSagitarioScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailSagitarioScreen';
import zodiacHoroscopeDetailCapricornioScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailCapricornioScreen';
import zodiacHoroscopeDetailAquarioScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailAquarioScreen';
import zodiacHoroscopeDetailPeixesScreen from './screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailPeixesScreen';

import chineseDetailScreen from './screens/chineseSign/chineseSign';
import AstroProfile from './screens/astral_map/astral_map';
import weekAdvice from './screens/weekAdvice/weekAdvice';
import SplashScreen from './screens/splashScreen';
import OnboardingScreen from './screens/onboarding/onboardingScreen';
import SigninScreen from './screens/auth/signinScreen';
import UpdateDataScreen from './screens/auth/updateScreen';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Colors } from './constants/styles';

LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          Hahmlet_Light: require('./assets/fonts/Hahmlet-Light.ttf'),
          Hahmlet_Regular: require('./assets/fonts/Hahmlet-Regular.ttf'),
          Hahmlet_Medium: require('./assets/fonts/Hahmlet-Medium.ttf'),
          Hahmlet_SemiBold: require('./assets/fonts/Hahmlet-SemiBold.ttf'),
          Hahmlet_Bold: require('./assets/fonts/Hahmlet-Bold.ttf'),
          Hahmlet_ExtraBold: require('./assets/fonts/Hahmlet-ExtraBold.ttf'),
          Hahmlet_Black: require('./assets/fonts/Hahmlet-Black.ttf'),
        });
        setIsFontLoaded(true);
      } catch (error) {
        console.error('Erro ao carregar fontes:', error);
      }
    };

    loadFonts();
  }, []);

  if (!isFontLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Update" component={UpdateDataScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="zodiacHoroscopeDetailAriesScreen" component={zodiacHoroscopeDetailAriesScreen} />
        <Stack.Screen name="zodiacHoroscopeDetailTouroScreen" component={zodiacHoroscopeDetailTouroScreen} />
        <Stack.Screen name="zodiacHoroscopeDetailGemeosScreen" component={zodiacHoroscopeDetailGemeosScreen} />
        <Stack.Screen name="zodiacHoroscopeDetailCancerScreen" component={zodiacHoroscopeDetailCancerScreen} />
        <Stack.Screen name="zodiacHoroscopeDetailLeaoScreen" component={zodiacHoroscopeDetailLeaoScreen} />
        <Stack.Screen name="zodiacHoroscopeDetailVirgemScreen" component={zodiacHoroscopeDetailVirgemScreen} />
        <Stack.Screen name="zodiacHoroscopeDetailLibraScreen" component={zodiacHoroscopeDetailLibraScreen} />
        <Stack.Screen name="zodiacHoroscopeDetailEscorpiaoScreen" component={zodiacHoroscopeDetailEscorpiaoScreen} />
        <Stack.Screen name="zodiacHoroscopeDetailSagitarioScreen" component={zodiacHoroscopeDetailSagitarioScreen} />
        <Stack.Screen name="zodiacHoroscopeDetailCapricornioScreen" component={zodiacHoroscopeDetailCapricornioScreen} />
        <Stack.Screen name="zodiacHoroscopeDetailAquarioScreen" component={zodiacHoroscopeDetailAquarioScreen} />
        <Stack.Screen name="zodiacHoroscopeDetailPeixesScreen" component={zodiacHoroscopeDetailPeixesScreen} />

        <Stack.Screen name="AstroProfile" component={AstroProfile} />
        <Stack.Screen name="chineseDetailScreen" component={chineseDetailScreen} />
        <Stack.Screen name="weekAdvice" component={weekAdvice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
  },
});
