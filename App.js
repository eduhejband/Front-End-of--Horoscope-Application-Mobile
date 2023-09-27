import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import LoadingScreen from "./components/loadingScreen";
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import zodiacHoroscopeDetailAriesScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailAriesScreen";
import zodiacHoroscopeDetailTouroScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailTouroScreen";
import zodiacHoroscopeDetailGemeosScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailGemeosScreen";
import zodiacHoroscopeDetailCancerScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailCancerScreen";
import zodiacHoroscopeDetailLeaoScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailLeaoScreen";
import zodiacHoroscopeDetailVirgemScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailVirgemScreen";
import zodiacHoroscopeDetailLibraScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailLibraScreen";
import zodiacHoroscopeDetailEscorpiaoScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailEscorpiaoScreen";
import zodiacHoroscopeDetailSagitarioScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailSagitarioScreen";
import zodiacHoroscopeDetailCapricornioScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailCapricornioScreen";
import zodiacHoroscopeDetailAquarioScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailAquarioScreen";
import zodiacHoroscopeDetailPeixesScreen from "./screens/zodiacDailyHoroscopeDetail/zodiacHoroscopeDetailPeixesScreen";
import BirthChartCalculatorScreen from "./screens/birthChartCalculator/birthChartCalculatorScreen";
import BirthHoroscopeScreen from "./screens/birthHoroscope/birthHoroscopeScreen";
import HoroscopeDetailScreen from "./screens/horoscopeDetail/horoscopeDetailScreen";
import AstrologerDetailScreen from "./screens/astrologerDetail/astrologerDetailScreen";
import MessageScreen from "./screens/message/messageScreen";
import AstrologersScreen from "./screens/astrologers/astrologersScreen";
import CompatibilityScreen from "./screens/compatibility/compatibilityScreen";
import CompatibilityDetailScreen from "./screens/compatibilityDetail/compatibilityDetailScreen";
import NumerologyScreen from "./screens/numerology/numerologyScreen";
import NumeroloryDetailScreen from "./screens/numerologyDetail/numeroloryDetailScreen";


import SplashScreen from "./screens/splashScreen";
import OnboardingScreen from "./screens/onboarding/onboardingScreen";
import SigninScreen from "./screens/auth/signinScreen";

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
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

        <Stack.Screen name="BirthChartCalculator" component={BirthChartCalculatorScreen} />
        <Stack.Screen name="BirthHoroscope" component={BirthHoroscopeScreen} />
        <Stack.Screen name="HoroscopeDetail" component={HoroscopeDetailScreen} />
        <Stack.Screen name="AstrologerDetail" component={AstrologerDetailScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="Astrologers" component={AstrologersScreen} />
        <Stack.Screen name="Compatibility" component={CompatibilityScreen} />
        <Stack.Screen name="CompatibilityDetail" component={CompatibilityDetailScreen} />
        <Stack.Screen name="Numerology" component={NumerologyScreen} />
        <Stack.Screen name="NumerologyDetail" component={NumeroloryDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;