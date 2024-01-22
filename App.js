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
import chineseDetailScreen from "./screens/chineseSign/chineseSign.js"
import zodiacHoroscopeFirstEscorpiaoScreen from "./screens/zodiacFirstScreen/zodiacHoroscopeFirstEscorpiaoScreen.js";

import AstroProfile from "./screens/astral_map/astral_map.js"
import weekAdvice from "./screens/weekAdvice/weekAdvice.js"
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


        <Stack.Screen name="zodiacHoroscopeFirstEscorpiaoScreen" component={zodiacHoroscopeFirstEscorpiaoScreen} />
      
        <Stack.Screen name="AstrologerDetail1" component={AstrologerDetailScreen1} />
        <Stack.Screen name="AstrologerDetail2" component={AstrologerDetailScreen2} />
        <Stack.Screen name="AstrologerDetail3" component={AstrologerDetailScreen3} />
        <Stack.Screen name="AstroProfile" component={AstroProfile} />
        <Stack.Screen name="chineseDetailScreen" component={chineseDetailScreen} />
        <Stack.Screen name="weekAdvice" component={weekAdvice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
