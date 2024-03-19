import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CourierUpDetails from '../../courier/CourierUpDetails';
import ModalContactUsScreen from '../../modal/ModalContactUsScreen';
import ModalHelpScreen from '../../modal/ModalHelpScreen';
import ModalPaymentScreen from '../../modal/ModalPaymentScreen';
import ModalRiseHelpScreen from '../../modal/ModalRiseHelpScreen';
import { Colors, Fonts } from '../../themes';
import BookingBidDetailsNoFeed from '../BookingBidDetailsNoFeed';
import BookingDetailsMapPayNow from '../BookingDetailsMapPayNow';
import BookingDetailsMapUp from '../BookingDetailsMapUp';
import BookingDetailsNoFeed from '../BookingDetailsNoFeed';
import BookingRequestAcceptedUp from '../BookingRequestAcceptedUp';
import CancelBookingDetailsMapTab1 from '../CancelBookingDetailsMapTab1';
import CancelBookingDetailsMapUp from '../CancelBookingDetailsMapUp';
import CancelStatusDetailsMap from '../CancelStatusDetailsMap';
import Tab4Screen from '../Past/index';
import PaymentCompleteScreen from '../PaymentCompleteScreen';
import PaymentCompleteUp from '../PaymentCompleteUp';
import PaymentSuccessfulScreen from '../PaymentSuccessfulScreen';
import PaymentSuccessfulUp from '../PaymentSuccessfulUp';
import PreferredDriverUp from '../PreferredDriverUp';
import Tab3Screen from '../Upcoming/index';
import Styles from './style';


const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

// Custom TabBar component  
const MyTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={Styles.viewMyTabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <Text
                        key={route.key}
                        onPress={onPress}
                        style={{
                            color: isFocused ? Colors.black : Colors.white,
                            backgroundColor: isFocused ? Colors.white : Colors.grayDrawerBg,
                            padding: wp(1),
                            borderRadius: wp(3),
                            textAlign: 'center',
                            width: wp(48),
                            fontFamily: Fonts.PoppinsRegular,
                            fontWeight: "600",
                            fontSize: wp(4),
                            height: "auto"
                        }}
                    >
                        {label}
                    </Text>
                );
            })}
        </View>
    );
}



const Tab3ScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Tab3Screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Tab3Screen"
                component={Tab3Screen}
            />

            <Stack.Screen
                name="BookingDetailsNoFeed"
                component={BookingDetailsNoFeed}//todo...1 - BookingDetailsNoFeed
            />

            <Stack.Screen
                name="BookingBidDetailsNoFeed"
                component={BookingBidDetailsNoFeed}//todo...1 - BookingBidDetailsNoFeed
            />

            {/* // other */}
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

            {/* // other */}

            <Stack.Screen
                name="PreferredDriverUp" //up
                component={PreferredDriverUp} />

            <Stack.Screen
                name="BookingDetailsMapUp" //up
                component={BookingDetailsMapUp}
            />

            <Stack.Screen
                name="CancelBookingDetailsMapUp" // BookingBiddingRequest  //up
                component={CancelBookingDetailsMapUp}
            />

            <Stack.Screen
                name="BookingRequestAcceptedUp" //up
                component={BookingRequestAcceptedUp}
            />

            <Stack.Screen
                name="PaymentCompleteUp"
                component={PaymentCompleteUp} />


            <Stack.Screen
                name="PaymentSuccessfulUp"
                component={PaymentSuccessfulUp} />


        </Stack.Navigator>
    )
}


const Tab4ScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Tab4Screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Tab4Screen"
                component={Tab4Screen}
            />

            <Stack.Screen
                name="CourierDetails"
                component={CourierUpDetails}
            />

            <Stack.Screen
                name="BookingDetailsMapPayNow"
                component={BookingDetailsMapPayNow} //todooo
            />

            {/* // other */}
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

            {/* // other */}


            <Stack.Screen
                name="PaymentComplete"
                component={PaymentCompleteScreen}
            />

            <Stack.Screen
                name="PaymentSuccessful"
                component={PaymentSuccessfulScreen} />

            <Stack.Screen
                name="CancelBookingDetailsMapTab1" // CancelBookingDetailsMapTab1
                component={CancelBookingDetailsMapTab1}
            />

            <Stack.Screen
                name="CancelStatusDetailsMap"
                component={CancelStatusDetailsMap}
            />

        </Stack.Navigator>
    )
}

const Tab1Screen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <NavigationContainer independent={true}
            >
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: Styles.tabBarLabelStyle,
                        tabBarItemStyle: Styles.tabBarItemStyle,
                        tabBarStyle: Styles.tabBarStyle,
                        tabBarIndicatorStyle: Styles.tabBarIndicatorStyle,
                    }}
                    tabBar={(props) => <MyTabBar {...props} />}>
                    <Tab.Screen name="Upcoming" component={Tab3ScreenStack} />
                    <Tab.Screen name="Past" component={Tab4ScreenStack} />
                </Tab.Navigator>
            </NavigationContainer >
        </View>

    )
}

export default Tab1Screen;
