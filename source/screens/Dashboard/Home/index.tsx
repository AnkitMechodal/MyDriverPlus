import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import { Images } from '../../../themes/index';
import AccountTab from '../AccountTab';
import HomeTab from '../HomeTab';
import SaveTab from '../SaveTab';
import Styles from './style';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator backBehavior="order">
            <Tab.Screen
                name="Home"
                component={HomeTab}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        navigation.navigate('Home')
                    },
                })}
                options={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarLabel: "Home",
                    tabBarLabelStyle: Styles.tabBarLabelStyle,
                    tabBarStyle: Styles.tabBarStyle,
                    tabBarIcon: ({ focused }) => (
                        focused ? <Image
                            source={Images.homeTabGreen}
                            resizeMode="contain"
                            style={Styles.tabBarIcon}
                        /> : <Image
                            source={Images.homeTabGray}
                            resizeMode="contain"
                            style={Styles.tabBarIcon}
                        />
                    ),
                }} />
            <Tab.Screen name="Save"
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        navigation.navigate('Save')
                    },
                })}
                component={SaveTab}
                options={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarLabelStyle: Styles.tabBarLabelStyle,
                    tabBarLabel: "Save",
                    tabBarStyle: Styles.tabBarStyle,
                    tabBarIcon: ({ focused }) => (
                        focused ? <Image
                            source={Images.saveTabGreen}
                            resizeMode="contain"
                            style={Styles.tabBarIcon}
                        /> : <Image
                            source={Images.saveTabGray}
                            resizeMode="contain"
                            style={Styles.tabBarIcon}
                        />
                    ),
                }} />
            <Tab.Screen name="Account"
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        navigation.navigate('Account')
                    },
                })}
                component={AccountTab}
                options={{
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarLabel: "Account",
                    tabBarLabelStyle: Styles.tabBarLabelStyle,
                    tabBarStyle: Styles.tabBarStyle,
                    tabBarIcon: ({ focused }) => (
                        focused ? <Image
                            source={Images.userTabGreen}
                            resizeMode="contain"
                            style={Styles.tabBarIcon}
                        /> : <Image
                            source={Images.userTabGray}
                            resizeMode="contain"
                            style={Styles.tabBarIcon}
                        />
                    ),
                }} />
        </Tab.Navigator>
    );

}

export default HomeScreen;