import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNewPasswordScreen from '../screens/Auth/CreateNewPassword/index';
import EmailVerficationScreen from '../screens/Auth/EmailVerfication/index';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import GoogleSignUpScreen from '../screens/Auth/GoogleSignUpScreen';
import Home1Screen from '../screens/Auth/Home1';
import LogInScreen from '../screens/Auth/LogIn';
import LoginSignUpScreen from '../screens/Auth/LoginSignUp';
import LoginWithMailScreen from '../screens/Auth/LoginWithMail';
import LoginWithMobileScreen from '../screens/Auth/LoginWithMobile';
import MobileVerficationScreen from '../screens/Auth/MobileVerfication';
import OTPFromEmailScreen from '../screens/Auth/OTPFromEmail';
import SignUpScreen from '../screens/Auth/SignUp/index';
import VerifiedScreen from '../screens/Auth/Verified';
import VerifyYourScreen from '../screens/Auth/VerifyYourAccount';
import VerifyYourScreenMail from '../screens/Auth/VerifyYourScreenMail';
import VerifyYourScreenMobile from '../screens/Auth/VerifyYourScreenMobile';

const Stack = createNativeStackNavigator();

const Routes = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LogInScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="LoginSignUp"
          component={LoginSignUpScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="LoginWithMobile"
          component={LoginWithMobileScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
            // unmountOnBlur: true,
          }}
        />
        <Stack.Screen
          name="LoginWithMail"
          component={LoginWithMailScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="OTPFromEmail"
          component={OTPFromEmailScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="CreateNewPassword"
          component={CreateNewPasswordScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="GoogleSignUp"
          component={GoogleSignUpScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="VerifyYourAccount"
          component={VerifyYourScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="VerifyYourAccountMail" // Mail
          component={VerifyYourScreenMail}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="VerifyYourAccountMobile" // Mobile
          component={VerifyYourScreenMobile}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="MobileVerfication"
          component={MobileVerficationScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="EmailVerfication"
          component={EmailVerficationScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="VerifiedScreen"
          component={VerifiedScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name="Home1"
          component={Home1Screen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;

