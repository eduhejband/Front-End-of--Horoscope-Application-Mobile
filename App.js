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
import AstrologerDetailScreen1 from "./screens/astrologerDetail/astrologerDetailScreen1";
import AstrologerDetailScreen2 from "./screens/astrologerDetail/astrologerDetailScreen2";
import AstrologerDetailScreen3 from "./screens/astrologerDetail/astrologerDetailScreen3";

import zodiacHoroscopeFirstAriesScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstAriesScreen.js";
import zodiacHoroscopeFirstAquarioScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstAquarioScreen.js";
import zodiacHoroscopeFirstCancerScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstCancerScreen.js";
import zodiacHoroscopeFirstCapricornioScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstCapricornioScreen.js";
import zodiacHoroscopeFirstEscorpiaoScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstEscorpiaoScreen.js";
import zodiacHoroscopeFirstGemeosScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstGemeosScreen.js";
import zodiacHoroscopeFirstLeaoScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstLeaoScreen.js";
import zodiacHoroscopeFirstLibraScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstLibraScreen.js";
import zodiacHoroscopeFirstPeixesScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstPeixesScreen.js";
import zodiacHoroscopeFirstSagitarioScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstSagitarioScreen.js";
import zodiacHoroscopeFirstTouroScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstTouroScreen.js";
import zodiacHoroscopeFirstVirgemScreen from "./screens/zodiacDailyHoroscopeFirstScreen/zodiacHoroscopeFirstVirgemScreen.js";



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

        <Stack.Screen name="zodiacHoroscopeFirstAriesScreen" component={zodiacHoroscopeFirstAriesScreen} />
        <Stack.Screen name="zodiacHoroscopeFirstAquarioScreen" component={zodiacHoroscopeFirstAquarioScreen} />
        <Stack.Screen name="zodiacHoroscopeFirstCancerScreen" component={zodiacHoroscopeFirstCancerScreen} />
        <Stack.Screen name="zodiacHoroscopeFirstCapricornioScreen" component={zodiacHoroscopeFirstCapricornioScreen} />
        <Stack.Screen name="zodiacHoroscopeFirstEscorpiaoScreen" component={zodiacHoroscopeFirstEscorpiaoScreen} />
        <Stack.Screen name="zodiacHoroscopeFirstGemeosScreen" component={zodiacHoroscopeFirstGemeosScreen} />
        <Stack.Screen name="zodiacHoroscopeFirstLeaoScreen" component={zodiacHoroscopeFirstLeaoScreen} />
        <Stack.Screen name="zodiacHoroscopeFirstLibraScreen" component={zodiacHoroscopeFirstLibraScreen} />
        <Stack.Screen name="zodiacHoroscopeFirstPeixesScreen" component={zodiacHoroscopeFirstPeixesScreen} />
        <Stack.Screen name="zodiacHoroscopeFirstSagitarioScreen" component={zodiacHoroscopeFirstSagitarioScreen} />
        <Stack.Screen name="zodiacHoroscopeFirstTouroScreen" component={zodiacHoroscopeFirstTouroScreen} />
        <Stack.Screen name="zodiacHoroscopeFirstVirgemScreen" component={zodiacHoroscopeFirstVirgemScreen} />
        
        <Stack.Screen name="AstrologerDetail1" component={AstrologerDetailScreen1} />
        <Stack.Screen name="AstrologerDetail2" component={AstrologerDetailScreen2} />
        <Stack.Screen name="AstrologerDetail3" component={AstrologerDetailScreen3} />
       
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;