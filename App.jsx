import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/Home/WelcomeScreen.jsx';
import LoginScreen from './src/screens/auth/LoginScreen.jsx';
import SignupScreen from './src/screens/auth/SignupScreen.jsx';
import SplashScreen from './src/screens/Startup/SplashScreen.jsx';
import StartupScreen from './src/screens/Startup/StartupScreen.jsx';
import OtpVerification from './src/screens/auth/OtpVerification.jsx';
import SendEmailScreen from './src/screens/auth/SendEmailScreen.jsx';
import Profile from './src/screens/profile/Profile.jsx';
import SuccessScreen from './src/screens/profile/ProfileComplete.jsx';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash-Screen"
      // screenOptions={{
      //   headerStyle: { backgroundColor: '#4F46E5' },
      //   headerTintColor: '#fff',
      //   headerTitleStyle: { fontWeight: 'bold' },
      // }}
      >
        <Stack.Screen
          name="Splash-Screen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Startup-Screen"
          component={StartupScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />

        <Stack.Screen
          name="Signup"
          options={{ headerShown: false }}
          component={SignupScreen} />

        <Stack.Screen
          name="Otp-Verification"
          options={{ headerShown: false }}
          component={OtpVerification} />

        <Stack.Screen
          name="email-Verification"
          options={{ headerShown: false }}
          component={SendEmailScreen} />

        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Profile} />

        <Stack.Screen
          name="Profile-Completed"
          options={{ headerShown: false }}
          component={SuccessScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App
