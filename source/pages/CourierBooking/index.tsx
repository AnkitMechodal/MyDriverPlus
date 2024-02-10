import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CancelCourierDetailsMapCPast from '../../courier/CancelCourierDetailsMapCPast';
import CancelCourierDetailsMapPast from '../../courier/CancelCourierDetailsMapPast';
import CourierPaymentCompletePast from '../../courier/CourierPaymentCompletePast';
import CourierPreferredDriverPast from '../../courier/CourierPreferredDriverPast';
import CourierRequestAcceptedPast from '../../courier/CourierRequestAcceptedPast';
import CourierRequestDriverCPast from '../../courier/CourierRequestDriverCPast';
import CourierRequestDriverPast from '../../courier/CourierRequestDriverPast';
import CourierRequestPast from '../../courier/CourierRequestPast';
import CourierUpDetails from '../../courier/CourierUpDetails';
import ModalContactUsScreen from '../../modal/ModalContactUsScreen';
import ModalHelpScreen from '../../modal/ModalHelpScreen';
import ModalPaymentScreen from '../../modal/ModalPaymentScreen';
import ModalRiseHelpScreen from '../../modal/ModalRiseHelpScreen';
import { Colors, Fonts } from '../../themes';
import BookingDetailsMapPayNow from '../BookingDetailsMapPayNow';
import BookingDetailsMapUp from '../BookingDetailsMapUp';
import BookingRequestAcceptedUp from '../BookingRequestAcceptedUp';
import CancelBookingDetailsMapUp from '../CancelBookingDetailsMapUp';
import CancelStatusDetailsMap from '../CancelStatusDetailsMap';
import Tab3CourierScreen from '../CourierPast';
import Tab4CourierScreen from '../CourierUpcoming/index';
import PaymentCompleteScreen from '../PaymentCompleteScreen';
import PaymentCompleteUp from '../PaymentCompleteUp';
import PaymentSuccessfulScreen from '../PaymentSuccessfulScreen';
import PaymentSuccessfulUp from '../PaymentSuccessfulUp';
import PreferredDriverUp from '../PreferredDriverUp';
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


const Tab00ScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Tab33Screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Tab33Screen"
                component={Tab3CourierScreen} //past to all
            />

            <Stack.Screen
                name="CourierRequestPast"
                component={CourierRequestPast}
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
                name="CourierPreferredDriverPast" // CourierPreferredDriverPast // // quickto
                component={CourierPreferredDriverPast} />


            <Stack.Screen
                name="CourierRequestAcceptedPast" // CourierRequestAcceptedPast
                component={CourierRequestAcceptedPast}
            />

            <Stack.Screen
                name="CourierPaymentCompletePast" // CourierPaymentCompletePast
                component={CourierPaymentCompletePast} />


            <Stack.Screen
                name="CourierRequestDriverPast" // CourierRequestDriverPast**
                component={CourierRequestDriverPast} />


            <Stack.Screen
                name="CancelCourierDetailsMapPast" // CancelCourierDetailsMapPast
                component={CancelCourierDetailsMapPast} // tab2-1
            />

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

            {/* no use */}

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


const Tab01ScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Tab44Screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Tab44Screen"
                component={Tab4CourierScreen}
            />

            <Stack.Screen
                name="CourierDetails"
                component={CourierUpDetails}
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
                name="CourierRequestDriverCPast" // CourierRequestDriverPast**---
                component={CourierRequestDriverCPast} />


            <Stack.Screen
                name="BookingDetailsMapPayNow" // BookingDetailsMapPayNowPast
                component={BookingDetailsMapPayNow}
            />

            <Stack.Screen
                name="PaymentComplete"
                component={PaymentCompleteScreen}
            />

            <Stack.Screen
                name="PaymentSuccessful"
                component={PaymentSuccessfulScreen} />

            {/* <Stack.Screen
                name="CancelBookingDetailsMap"
                component={CancelBookingDetailsMap}
            /> */}


            <Stack.Screen
                name="CancelCourierDetailsMapCPast" // CancelCourierDetailsMapCPast
                component={CancelCourierDetailsMapCPast}
            />

            <Stack.Screen
                name="CancelStatusDetailsMap"
                component={CancelStatusDetailsMap}
            />

        </Stack.Navigator>
    )
}

const Tab2Screen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <NavigationContainer independent={true}>
                <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
                    <Tab.Screen name="Upcoming" component={Tab00ScreenStack} />
                    <Tab.Screen name="Past" component={Tab01ScreenStack} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>

    )
}

export default Tab2Screen;
