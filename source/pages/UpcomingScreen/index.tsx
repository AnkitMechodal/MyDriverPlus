import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import Tab2Screen from '../CourierBooking/index';
import Tab1Screen from '../RideBooking/index';
import Styles from './style';

type Props = {
    navigation: any

}

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const Tab1ScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Tab1Screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Tab1Screen"
                component={Tab1Screen}
            />
        </Stack.Navigator>
    )
}

const Tab2ScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Tab2Screen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Tab2Screen"
                component={Tab2Screen}
            />
        </Stack.Navigator>
    )
}

const Upcoming3Screen = (props: Props) => {
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
                        title={"Upcoming & Past Booking"}
                        fontSize={wp(4)}
                        onPress={() => props.navigation.goBack()}
                    />
                </View>
                <View style={{ flex: 1, backgroundColor: "black" }}>

                    <NavigationContainer independent={true}>
                        <Tab.Navigator
                            screenOptions={{
                                tabBarLabelStyle: Styles.tabBarLabelStyle,
                                tabBarItemStyle: Styles.tabBarItemStyle,
                                tabBarStyle: Styles.tabBarStyle,
                                tabBarIndicatorStyle: Styles.tabBarIndicatorStyle,
                            }}
                        >
                            <Tab.Screen name="Ride booking" component={Tab1ScreenStack} />
                            <Tab.Screen name="Courier booking" component={Tab2ScreenStack} />
                        </Tab.Navigator>
                    </NavigationContainer>

                </View>

            </View>
        </SafeAreaView >
    )
}

export default Upcoming3Screen;
