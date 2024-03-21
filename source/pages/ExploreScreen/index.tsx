
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import TabBook1UpScreen from '../../components/TabBook1UpScreen/index';
import TabBook2UpScreen from '../../components/TabBook2PastScreen';
import CourierUpDetails from '../../courier/CourierUpDetails';
import ModalContactUsScreen from '../../modal/ModalContactUsScreen';
import ModalHelpScreen from '../../modal/ModalHelpScreen';
import ModalPaymentScreen from '../../modal/ModalPaymentScreen';
import ModalRiseHelpScreen from '../../modal/ModalRiseHelpScreen';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import BookingUpDetails from '../BookingUpcomingDetails/index';
import Styles from './style';

type Props = {
  navigation: any
}

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TabBook1UpStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="TabBook1UpScreen"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TabBook1UpScreen"
        component={TabBook1UpScreen}
      />

      <Stack.Screen
        name="BookingDetailsDrawerUpcoming"
        component={BookingUpDetails}
      />

      <Stack.Screen
        name="ModalHelp"
        component={ModalHelpScreen} />

      <Stack.Screen
        name="ModalRise"
        component={ModalRiseHelpScreen} />

      <Stack.Screen
        name="ModalPaymentSupport"
        component={ModalPaymentScreen} />

      <Stack.Screen
        name="ModalContactUs"
        component={ModalContactUsScreen} />

    </Stack.Navigator>
  )
}

const TabBook2UpStack = () => {
  return (

    <Stack.Navigator
      initialRouteName="TabBook2UpScreen"
      screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="TabBook2UpScreen"
        component={TabBook2UpScreen}
      />
      <Stack.Screen
        name="CourierDetailsDrawerUpcoming"
        component={CourierUpDetails}
      />

      <Stack.Screen
        name="ModalHelp"
        component={ModalHelpScreen} />

      <Stack.Screen
        name="ModalRise"
        component={ModalRiseHelpScreen} />

      <Stack.Screen
        name="ModalPaymentSupport"
        component={ModalPaymentScreen} />

      <Stack.Screen
        name="ModalContactUs"
        component={ModalContactUsScreen} />


    </Stack.Navigator>
  )
}

const ExploreScreen = (props: Props) => {

  return (
    <SafeAreaView style={CommonStyle.commonFlex}>
      <StatusBarComponent
        backgroundColor={Colors.black} />
      <View style={Styles.container}>

        <View style={Styles.viewHeader}>
          <HeaderComponent
            margin={wp(3)}
            backgroundColorOpacity={Colors.circleGray}
            borderRadiusOpacity={wp(10)}
            transform={[{ rotate: '180deg' }]}
            paddingOpacity={wp(2)}
            textAlign={"left"}
            source={Images.arrowRight}
            marginTop={wp(2)}
            width={wp(7)}
            marginHorizontal={wp(5)}
            height={wp(7)}
            color={Colors.white}
            fontFamily={Fonts.InterSemiBold}
            fontWeight="500"
            title={"My Booking"}
            fontSize={wp(4)}
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <View style={{ flex: 1 }}>

          <NavigationContainer independent={true}>
            <Tab.Navigator
              screenOptions={{
                tabBarLabelStyle: Styles.tabBarLabelStyle,
                tabBarItemStyle: Styles.tabBarItemStyle,
                tabBarStyle: Styles.tabBarStyle,
                tabBarIndicatorStyle: Styles.tabBarIndicatorStyle,
              }} // TabBook2UpScreen
            >
              <Tab.Screen name="Ride booking" component={TabBook1UpStack} />
              <Tab.Screen name="Courier booking" component={TabBook2UpStack} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>

      </View>

    </SafeAreaView>
  );
};

export default ExploreScreen;