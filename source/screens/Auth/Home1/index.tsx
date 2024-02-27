import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    DrawerContentScrollView,
    DrawerItemList,
    createDrawerNavigator
} from '@react-navigation/drawer';
import { DefaultTheme, NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Image, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import CustomHeaderComponent from '../../../components/CustomHeader';
import TextComponent from '../../../components/Text';
import CancelCourierDetailsMap from '../../../courier/CancelCourierDetailsMap';
import CourierBookingScreen from '../../../courier/CourierBooking';
import CourierConfirmScreen from '../../../courier/CourierConfirm';
import CourierDetailsMap from '../../../courier/CourierDetailsMap';
import CourierDropupScreen from '../../../courier/CourierDropupScreen';
import CourierPaymentCompleteScreen from '../../../courier/CourierPaymentComplete';
import CourierPaymentSuccessfulScreen from '../../../courier/CourierPaymentSuccessful';
import CourierPickupScreen from '../../../courier/CourierPickupScreen';
import CourierPreferredDriverScreen from '../../../courier/CourierPreferredDriver';
import CourierRequestScreen from '../../../courier/CourierRequest';
import CourierRequestAcceptedScreen from '../../../courier/CourierRequestAccepted';
import CourierRequestDriverScreen from '../../../courier/CourierRequestDriver';
import CourierStatusScreen from '../../../courier/CourierStatus';
import AboutScreen from '../../../pages/AboutScreen/index';
import BiddingBookNowScreen from '../../../pages/BiddingBookNowScreen';
import BiddingCheckStatusScreen from '../../../pages/BiddingCheckStatus';
import BiddingRequestScreen from '../../../pages/BiddingRequest';
import BookingScreen from '../../../pages/Booking/index';
import BookingConfirmScreen from '../../../pages/BookingConfirm/index';
import BookingDetailsMap from '../../../pages/BookingDetailsMap';
import BookingDetailsNoFeed from '../../../pages/BookingDetailsNoFeed';
import BookingDetails from '../../../pages/BookingDetailsScreen';
import BookingRequestScreen from '../../../pages/BookingRequest/index';
import BookingRequestAcceptedScreen from '../../../pages/BookingRequestAcceptedScreen';
import BookingRequestDriverScreen from '../../../pages/BookingRequestDriverScreen';
import BookingStatusScreen from '../../../pages/BookingStatus/index';
import CancelBookingDetailsMap from '../../../pages/CancelBookingDetailsMap';
import ChangeLocationScreen from '../../../pages/ChangeLocation/index';
import ContactUsScreen from '../../../pages/ContactUsScreen/index';
import DropUpLocationScreen from '../../../pages/DropupScreen/index';
import ExploreScreen from '../../../pages/ExploreScreen/index';
import FAQScreen from '../../../pages/FAQScreen/index';
import HelpScreen from '../../../pages/HelpScreen/index';
import HomeTabScreen from '../../../pages/HomeTab/index';
import LocationScreen from '../../../pages/LocationScreen';
import NewPasswordScreen from '../../../pages/NewPassword';
import PaymentCompleteScreen from '../../../pages/PaymentCompleteScreen';
import PaymentSuccessfulScreen from '../../../pages/PaymentSuccessfulScreen';
import PaymentScreen from '../../../pages/PaymentSupportScreen/index';
import PickUpLocationScreen from '../../../pages/PickupScreen/';
import PreferredDriverScreen from '../../../pages/PreferredDriverScreen';
import PreferredScreen from '../../../pages/PreferredScreen/index';
import PrivacyScreen from '../../../pages/PrivacyScreen/index';
import ProfileUpdateScreen from '../../../pages/ProfileUpdate/index';
import RiseHelpScreen from '../../../pages/RiseScreen/index';
import SavedLocationScreen from '../../../pages/SavedLocation/index';
import SettingScreen from '../../../pages/SettingScreen/index';
import TermsAndConditionScreen from '../../../pages/TermsAndConditions/index';
import UpcomingScreen from '../../../pages/UpcomingScreen/index';
import ViewRequestDetailsScreen from '../../../pages/ViewRequestDetailsScreen';
import ViewRequestScreen from '../../../pages/ViewRequestScreen';
import BiddingRequestScreenUser from '../../../status/Bid';
import BookingRequestScreenUser from '../../../status/Booking';
import CourierRequestScreenUser from '../../../status/Courier';
import { Colors, Fonts, Images } from '../../../themes/index';
import { useTheme } from '../../../utils/ThemeContext';
import CommonStyle from '../../../utils/commonStyle';
import NetworkUtils from '../../../utils/commonfunction';
import { ScreenText } from '../../../utils/index';
import PreferredDriverDrawer from '../PreferredDriverDrawer';
import Styles from './style';


type Props = {
    navigation: any
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MyComponent = ({ navigation }) => {

    const { isDarkMode, toggleTheme } = useTheme();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const SignInWithGoogle = async () => {
        // BackHandler.exitApp();
        // navigation.navigate("LoginSignUp");
        try {
            BackHandler.exitApp();

            await AsyncStorage.clear();
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            // setUserInfo(null);
        } catch (error: any) {
            console.log("error===>", error);
        }
    };

    return (
        <View>
            <Text
                style={Styles.textLogout}
                onPress={toggleModal}>Logout</Text>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
            >
                <View style={Styles.viewModalConatiner}>
                    <View style={Styles.viewModal}>
                        <Text
                            style={Styles.textAreYouSure}>
                            Are you sure you want to{'\n'}Logout ?</Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <View style={Styles.viewModalCenterConatiner}>
                                <Text style={Styles.textCancel}
                                    onPress={() => SignInWithGoogle()}
                                // onPress={toggleTheme}
                                >Yes</Text>
                                <Text style={Styles.textOk}
                                    onPress={() => setModalVisible(false)}
                                >No</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View >
            </Modal >
        </View >
    );
}



const EditProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="BottomTabStack"
                component={BottomTabStack}
                options={{
                    animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    );
};

const EditUpcomingStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Upcoming"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UpcomingScreen" component={UpcomingScreen}
                options={{
                    animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    );
};

const EditPreferredStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Preferred"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PreferredScreen"
                component={PreferredScreen}
                options={{
                    animation: 'slide_from_right'
                }} />
            <Stack.Screen name="PreferredDriverDrawer"
                component={PreferredDriverDrawer}
                options={{
                    animation: 'slide_from_right'
                }} />
        </Stack.Navigator>
    );
};


const EditSavedStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Saved"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SavedScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={SavedLocationScreen} />
            <Stack.Screen name="LocationScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={LocationScreen} />
        </Stack.Navigator>
    );
};

const EditPrivacyStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Privacy"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PrivacyScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={PrivacyScreen} />
        </Stack.Navigator>
    );
};


const EditHelpStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Help"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HelpScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={HelpScreen} />
            <Stack.Screen name="RiseHelpScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={RiseHelpScreen} />
            <Stack.Screen name="PaymentSupportScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={PaymentScreen} />
            <Stack.Screen name="ContactUsScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={ContactUsScreen} />
        </Stack.Navigator>
    );
};

const EditLogoutStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Logout"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LogoutScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={SettingScreen} />
        </Stack.Navigator>
    );
};


const EditFAQStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="FAQ"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FAQScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={FAQScreen} />
        </Stack.Navigator>
    );
};

const EditAboutStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="About"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AboutScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={AboutScreen} />
        </Stack.Navigator>
    );
};

const EditTermsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Terms"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TermsScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={TermsAndConditionScreen} />
        </Stack.Navigator>
    );
};



const InnerHistoryStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="ExploreScreenTab"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="ExploreScreenTab"
                options={{
                    animation: 'slide_from_right'
                }}
                component={ExploreScreen}
            />

            <Stack.Screen
                name="BookingDetails"
                options={{
                    animation: 'slide_from_right'
                }}
                component={BookingDetails}
            />

            <Stack.Screen
                name="BookingDetailsNoFeed"
                options={{
                    animation: 'slide_from_right'
                }}
                component={BookingDetailsNoFeed}
            />
        </Stack.Navigator>
    )
}

const InnerHomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeTabScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="HomeTabScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={HomeTabScreen}
            />
            <Stack.Screen
                name="BookingScreen"
                options={{
                    animation: 'slide_from_right', // Corrected property name
                    // unmountOnBlur: false
                }}
                component={BookingScreen}
            />
            <Stack.Screen
                name="CourierBooking"
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierBookingScreen}
            />

            <Stack.Screen
                name="PickupScreen"  // CourierPickupScreen
                options={{
                    animation: 'slide_from_right'
                }}
                component={PickUpLocationScreen}
            />

            <Stack.Screen
                name="CourierPickupScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierPickupScreen}
            />

            <Stack.Screen
                name="ChangeLocationScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={ChangeLocationScreen}
            />

            <Stack.Screen
                name="DropupScreen" // CourierDropupScreen
                options={{
                    animation: 'slide_from_right'
                }}
                component={DropUpLocationScreen}
            />

            <Stack.Screen
                name="CourierDropupScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierDropupScreen}
            />

            <Stack.Screen
                name="BookingConfirmScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={BookingConfirmScreen}
            />

            <Stack.Screen
                name="CourierConfirmScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierConfirmScreen}
            />

            <Stack.Screen
                name="BookingStatus"
                options={{
                    animation: 'slide_from_right'
                }}
                component={BookingStatusScreen}
            />

            <Stack.Screen
                name="BiddingCheckStatus"
                options={{
                    animation: 'slide_from_right'
                }}
                component={BiddingCheckStatusScreen}
            />

            <Stack.Screen
                name="CourierStatus" // CourierStatus
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierStatusScreen}
            />

            <Stack.Screen
                name="BookingRequest"
                options={{
                    animation: 'slide_from_right'
                }}
                component={BookingRequestScreen}
            />

            {/* USER */}

            <Stack.Screen
                name="BookingRequestUser"
                options={{
                    animation: 'slide_from_right'
                }}
                component={BookingRequestScreenUser}
            />

            <Stack.Screen
                name="BookingBiddingRequestUser" // user bid
                options={{
                    animation: 'slide_from_right'
                }}
                component={BiddingRequestScreenUser}
            />

            <Stack.Screen
                name="CourierRequestUser" // CourierRequest
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierRequestScreenUser}
            />

            {/* USER */}

            <Stack.Screen
                name="BookingBiddingRequest" // BookingBiddingRequest
                options={{
                    animation: 'slide_from_right'
                }}
                component={BiddingRequestScreen}
            />

            <Stack.Screen
                name="CourierRequest" // CourierRequest
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierRequestScreen}
            />

            <Stack.Screen
                name="BookingRequestAccepted"
                options={{
                    animation: 'slide_from_right'
                }}
                component={BookingRequestAcceptedScreen}
            />

            <Stack.Screen
                name="CourierRequestAccepted" // CourierRequestAccepted
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierRequestAcceptedScreen}
            />

            <Stack.Screen
                name="BookingRequestDriver"
                options={{
                    animation: 'slide_from_right'
                }}
                component={BookingRequestDriverScreen} />

            <Stack.Screen
                name="CourierRequestDriver" // CourierRequestDriver
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierRequestDriverScreen} />

            <Stack.Screen
                name="PaymentComplete"
                options={{
                    animation: 'slide_from_right'
                }}
                component={PaymentCompleteScreen} />

            <Stack.Screen
                name="CourierPaymentComplete" // CourierPaymentComplete
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierPaymentCompleteScreen} />

            <Stack.Screen
                name="PaymentSuccessful"
                options={{
                    animation: 'slide_from_right'
                }}
                component={PaymentSuccessfulScreen} />

            <Stack.Screen
                name="CourierPaymentSuccessful" //  CourierPaymentSuccessful
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierPaymentSuccessfulScreen} />

            <Stack.Screen
                name="ViewRequest"
                options={{
                    animation: 'slide_from_right'
                }}
                component={ViewRequestScreen} />

            <Stack.Screen
                name="ViewRequestDetails"
                options={{
                    animation: 'slide_from_right'
                }}
                component={ViewRequestDetailsScreen} />

            <Stack.Screen
                name="BiddingAmountBookNow"
                options={{
                    animation: 'slide_from_right'
                }}
                component={BiddingBookNowScreen} />

            <Stack.Screen
                name="PreferredDriver"
                options={{
                    animation: 'slide_from_right'
                }}
                component={PreferredDriverScreen} />

            <Stack.Screen
                name="CourierPreferredDriver" // CourierPreferredDriver // // quickto
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierPreferredDriverScreen} />

            <Stack.Screen
                name="HelpScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={HelpScreen} />

            <Stack.Screen
                name="RiseHelpScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={RiseHelpScreen} />

            <Stack.Screen
                name="PaymentSupportScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={PaymentScreen} />

            <Stack.Screen
                name="ContactUsScreen" // BookingDetailsMap
                options={{
                    animation: 'slide_from_right'
                }}
                component={ContactUsScreen} />

            <Stack.Screen
                name="CancelBookingDetailsMap" // BookingBiddingRequest
                options={{
                    animation: 'slide_from_right'
                }}
                component={CancelBookingDetailsMap}
            />

            <Stack.Screen
                name="CancelCourierDetailsMap" // BookingBiddingRequest
                options={{
                    animation: 'slide_from_right'
                }}
                component={CancelCourierDetailsMap}
            />

            <Stack.Screen
                name="BookingDetailsMap"
                options={{
                    animation: 'slide_from_right'
                }}
                component={BookingDetailsMap}
            />

            <Stack.Screen
                name="CourierDetailsMap" // CourierDetailsMap
                options={{
                    animation: 'slide_from_right'
                }}
                component={CourierDetailsMap}
            />


        </Stack.Navigator>
    );
}

const InnerStack = ({ }) => {
    return (
        <Stack.Navigator
            initialRouteName="ProfileScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={SettingScreen} />
            <Stack.Screen name="NewPasswordScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={NewPasswordScreen} />
            <Stack.Screen name="ProfileUpdateScreen"
                options={{
                    animation: 'slide_from_right'
                }}
                component={ProfileUpdateScreen} />

            <Stack.Screen name="EditHelpStack"
                options={{
                    animation: 'slide_from_right'
                }}
                component={EditHelpStack} />
            <Stack.Screen name="EditPrivacyStack"
                options={{
                    animation: 'slide_from_right'
                }}
                component={EditPrivacyStack} />
            <Stack.Screen name="EditAboutStack"
                options={{
                    animation: 'slide_from_right'
                }}
                component={EditAboutStack} />
            <Stack.Screen name="EditTermsStack"
                options={{
                    animation: 'slide_from_right'
                }}
                component={EditTermsStack} />
        </Stack.Navigator>
    )
}

const BottomTabStack = ({ route }) => {
    const focusedRouteName = getFocusedRouteNameFromRoute(route);

    const ref = useRef<any>(null);
    const [email, setEmail] = useState('')

    const handleUserLocation = (useremail: any) => {
        setEmail(useremail);
    }

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={InnerHomeStack}
                options={({ route }) => ({
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarLabelStyle: Styles.tabBarLabelStyle,
                    tabBarActiveTintColor: Colors.blue,
                    tabBarInactiveTintColor: Colors.grayDark,
                    header: ({ navigation, route }) => (
                        <CustomHeaderComponent
                            ref={ref}
                            handleUserLocation={handleUserLocation}
                            navigation={navigation} />
                    ),
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === "BookingScreen") {
                            return {
                                display: "none", // CourierBooking
                            }
                        } else if (routeName === "CourierBooking") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "PickupScreen") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "ChangeLocationScreen") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "DropupScreen") {
                            return {
                                display: "none",
                            } // CourierDetailsMap
                        }


                        else if (routeName === "BookingRequestUser") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "BookingBiddingRequestUser") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "CourierRequestUser") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "CourierDetailsMap") {
                            return {
                                display: "none",
                            }
                        }



                        else if (routeName === "BookingConfirmScreen") {
                            return {
                                display: "none", // CourierConfirmScreen
                            }
                        } else if (routeName === "CourierConfirmScreen") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "BookingStatus") { // CourierStatus
                            return {
                                display: "none",
                            }
                        } else if (routeName === "CourierStatus") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "BookingRequest") {
                            return {
                                display: "none", // CourierRequest
                            }
                        } else if (routeName === "CourierRequest") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "HelpScreen") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "RiseHelpScreen") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "PaymentSupportScreen") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "ContactUsScreen") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "BookingRequestAccepted") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "CourierRequestAccepted") {
                            return {
                                display: "none", // CourierRequestAccepted
                            }
                        } else if (routeName === "BookingRequestDriver") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "CourierRequestDriver") {
                            return {
                                display: "none", // CourierRequestDriver
                            }
                        } else if (routeName === "PaymentComplete") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "CourierPaymentComplete") {
                            return {
                                display: "none", // CourierPaymentComplete
                            }
                        } else if (routeName === "PaymentSuccessful") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "CourierPaymentSuccessful") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "ViewRequest") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "BookingBiddingRequest") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "ViewRequestDetails") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "BiddingAmountBookNow") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "PreferredDriver") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "BookingDetails") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "CourierPreferredDriver") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "BookingDetailsMap") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "BiddingCheckStatus") {
                            return {
                                display: "none", // CourierPickupScreen // CourierDropupScreen
                            }
                        } else if (routeName === "CourierPickupScreen") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "CourierDropupScreen") {
                            return {
                                display: "none", // CancelCourierDetailsMap
                            }
                        } else if (routeName === "CancelBookingDetailsMap") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "CancelCourierDetailsMap") {
                            return {
                                display: "none",
                            }
                        } else {
                            return {
                                backgroundColor: Colors.black,
                                opacity: 1,
                                height: wp(15),
                            }
                        }
                    })(route),
                    tabBarIcon: ({ focused }) => (
                        focused ? <Image
                            source={Images.blueHomeIcon}
                            style={Styles.imageHomeIcon}
                            resizeMode="contain" /> :
                            <Image
                                source={Images.whiteHomeIcon}
                                style={Styles.imageHomeGrayIcon}
                                resizeMode="contain" />
                    ),
                })}
            />

            <Tab.Screen
                name="ExploreScreen"
                component={InnerHistoryStack}
                options={({ route }) => ({
                    headerShown: false,
                    tabBarLabel: 'History',
                    tabBarLabelStyle: Styles.tabBarLabelStyle,
                    tabBarActiveTintColor: Colors.blue,
                    tabBarInactiveTintColor: Colors.grayDark,
                    header: ({ route, navigation }) => {
                        if (focusedRouteName === 'ExploreScreen') {
                            return <Image
                                source={Images.whiteHomeIcon}
                                style={Styles.imageHomeGrayIcon}
                                resizeMode="contain" />;
                        }
                        return null; // Hide the header for other tabs
                    },
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === "BookingScreen") {
                            return {
                                display: "none",
                            }
                        } else {
                            return {
                                backgroundColor: Colors.black,
                                opacity: 1,
                                height: wp(15),
                            }
                        }
                    })(route),
                    tabBarIcon: ({ focused }) => (
                        focused ? <Image
                            source={Images.blueHistoryIcon}
                            style={Styles.imageHomeIcon}
                            resizeMode="contain" /> :
                            <Image
                                source={Images.whiteHistoryIcon}
                                style={Styles.imageHomeGrayIcon}
                                resizeMode="contain" />
                    ),
                })}
            />
            <Tab.Screen
                name="UserScreen"
                // component={SettingScreen}
                component={InnerStack}
                options={({ route }) => ({
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarLabelStyle: Styles.tabBarLabelStyle,
                    tabBarActiveTintColor: Colors.blue,
                    tabBarInactiveTintColor: Colors.grayDark,
                    header: ({ route, navigation }) => {
                        if (focusedRouteName === 'UserScreen') {
                            return <Image
                                source={Images.whiteHomeIcon}
                                style={Styles.imageHomeGrayIcon}
                                resizeMode="contain" />;
                        }
                        return null; // Hide the header for other tabs
                    },
                    tabBarStyle: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                        if (routeName === "NewPasswordScreen" || routeName === "ProfileUpdateScreen") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "EditHelpStack") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "EditHelpStack") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "EditPrivacyStack") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "EditAboutStack") {
                            return {
                                display: "none",
                            }
                        } else if (routeName === "EditTermsStack") {
                            return {
                                display: "none",
                            }
                        } else {
                            return {
                                backgroundColor: Colors.black,
                                opacity: 1,
                                height: wp(15),
                            }
                        }
                    })(route),
                    tabBarIcon: ({ focused }) => (
                        focused ? <Image
                            source={Images.blueUserIcon}
                            style={Styles.imageHomeIcon}
                            resizeMode="contain" /> :
                            <Image
                                source={Images.whiteUserIcon}
                                style={Styles.imageHomeGrayIcon}
                                resizeMode="contain" />
                    ),
                })}
            />
        </Tab.Navigator>
    );
};
// const { isDarkMode, toggleTheme } = useTheme();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.black,
        background: Colors.black,
        text: Colors.black,

        // primary: isDarkMode === 'dark' ? Colors.black : Colors.white,
        // background: isDarkMode === 'dark' ? Colors.black : Colors.white,
        // text: isDarkMode === 'dark' ? Colors.black : Colors.white,
    },
};

function CustomDrawerContent(props) {


    const [isProfileName, setProfileName] = useState(ScreenText.GuyHawkins);
    const [isProfileEmail, setProfileEmail] = useState(ScreenText.emailDummy);
    const [isProfileImage, setProfileImage] = useState("https://fastly.picsum.photos/id/26/536/354.jpg?hmac=mH-83ynI3fGS9Ok782H46YSrWd9SV8D5v-77RfTdI0I");

    let user_email;
    let user_name;
    let user_img;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get Profile Data
                await axiosPostProfilDataGetInfo();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Set interval to refresh every 10 seconds
        const intervalId = setInterval(fetchData, 10 * 1000);

        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, []);

    const axiosPostProfilDataGetInfo = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostSetProfileData();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostSetProfileData = async () => {

        const storedLinkedId = await AsyncStorage.getItem('user_register_id');
        if (storedLinkedId !== null) {
            const url = 'https://rideshareandcourier.graphiglow.in/api/userInfo/userInfo';

            // Prepare data in JSON format
            const data = {
                id: JSON.parse(storedLinkedId),
            };

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200 &&
                        response?.data?.message === 'User Information') {

                        user_email = response?.data?.matchingUsers[0]?.email;
                        user_name = response?.data?.matchingUsers[0]?.username;
                        user_img = response?.data?.matchingUsers[0]?.profile_image;


                        setProfileName(user_name);
                        setProfileEmail(user_email);
                        setProfileImage(user_img);


                        // Handle API response here
                        // Toast.show("User Information Get Successfully!", Toast.SHORT);
                    } else {
                        // Toast.show('User Information Credentials Invalid', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Handle errors
                    // Toast.show('User Information Credentials Invalid!', Toast.SHORT);
                });
        } else {

        }
    }

    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <DrawerContentScrollView {...props}>
            <View style={Styles.viewDrawerScrollView}>
                <View style={CommonStyle.commonRow}>
                    <View style={Styles.viewStoke}>
                        <Image
                            style={Styles.imageStrokeIcon}
                            resizeMode="contain"
                            source={Images.strokeIcon} />
                    </View>

                    <View>
                        <TextComponent
                            color={isDarkMode === 'dark' ? Colors.white : Colors.white}
                            title={ScreenText.MyDriverPlus}
                            textDecorationLine={'none'}
                            fontWeight="600"
                            fontSize={wp(3.5)}
                            fontFamily={Fonts.PoppinsRegular}
                            alignSelf='center'
                            textAlign='center'
                            marginVertical={hp(3)}
                        />
                    </View>
                </View>

                <View style={Styles.viewProfile}>
                    <View>
                        <Image
                            style={Styles.imageProfieIcon}
                            resizeMode="contain"
                            source={{ uri: isProfileImage }} />
                    </View>
                    <View>
                        <TextComponent
                            color={Colors.white}
                            title={isProfileName}
                            textDecorationLine={'none'}
                            fontWeight="700"
                            fontSize={wp(3)}
                            fontFamily={Fonts.PoppinsBlack}
                            alignSelf='left'
                            textAlign='left'
                            marginHorizontal={wp(4)}
                            marginTop={wp(2)}
                        />
                        <TextComponent
                            color={Colors.white}
                            title={isProfileEmail}
                            textDecorationLine={'none'}
                            fontWeight="600"
                            fontSize={wp(3)}
                            fontFamily={Fonts.PoppinsRegular}
                            alignSelf='center'
                            textAlign='center'
                            marginHorizontal={wp(4)}
                        />
                    </View>

                </View>


            </View>
            <DrawerItemList {...props} />

        </DrawerContentScrollView>
    );
}

const HomeOneScreen = (props: Props) => {

    const { isDarkMode, toggleTheme } = useTheme();

    // Check User Theme & Store In Local Storage
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Your refresh logic here
            console.log("toggleTheme==>" + isDarkMode);
            storeToggleTheme(isDarkMode);
        }, 5000);

        // Clear the interval when the component is unmounted or when isDarkMode changes
        return () => clearInterval(intervalId);

        // Add isDarkMode to the dependency array if you want the effect to re-run when it changes
    }, [isDarkMode]);


    const storeToggleTheme = async (isDarkMode: any) => {
        try {
            await AsyncStorage.setItem('user_theme', JSON.stringify(isDarkMode));
            console.log('user_theme===>', JSON.stringify(isDarkMode));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_theme :', error);
        }
    }

    // Auto Check Permission
    useEffect(() => {
        // Zoom to the marker using animateToRegion when markerCoordinate changes
        console.log("backAction==>" + "backAction");
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const permissions = await GetAllPermissions();
        console.log('Permissions:', permissions);
    };

    const GetAllPermissions = async () => {
        try {
            if (Platform.OS === "android") {
                const permissionsToRequest = [
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.SEND_SMS,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                ];

                const grantedPermissions = await PermissionsAndroid.requestMultiple(permissionsToRequest);

                // Check if the permissions were already granted before requesting
                if (
                    grantedPermissions[PermissionsAndroid.PERMISSIONS.CAMERA] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grantedPermissions[PermissionsAndroid.PERMISSIONS.CALL_PHONE] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grantedPermissions[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grantedPermissions[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grantedPermissions[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grantedPermissions[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grantedPermissions[PermissionsAndroid.PERMISSIONS.SEND_SMS] ===
                    PermissionsAndroid.RESULTS.GRANTED

                ) {
                    console.log('Both permissions are already granted.');
                } else {
                    console.log('Requested permissions:', grantedPermissions);
                }

                return grantedPermissions;
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const ref = useRef<any>(null);
    const handleUserLocation = (useremail: any) => {
        setEmail(useremail);
    }


    const [email, setEmail] = useState('')

    const [isEnabled, setIsEnabled] = useState(false);

    const onValueChange = () => {
        toggleTheme
        console.log("onValueChange===>", isDarkMode)
        // setIsEnabled((previousState) => !previousState);
    };

    return (
        <NavigationContainer
            independent={true}
            theme={MyTheme}
        >
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerStyle: Styles.headerStyle,
                    drawerStyle: Styles.drawerStyle,
                    headerTintColor: Colors.black,
                    header: ({ navigation, route }) => (
                        <CustomHeaderComponent
                            ref={ref}
                            handleUserLocation={handleUserLocation}
                            navigation={navigation} />
                    ),
                }}>
                <Drawer.Screen
                    name="Home"
                    options={({ route }) => ({
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewEditProfile}>
                                <Text style={{
                                    color: isDarkMode === 'dark' ? 'white' : 'white', // textEditProfile
                                    fontSize: wp(3.5),
                                    fontFamily: Fonts.PoppinsRegular
                                }}> Home</Text>
                                <Image
                                    style={Styles.imageRightArrowProfileIcon1}
                                    resizeMode="contain"
                                    source={Images.rightArrowIcon} />
                            </View>
                        ),
                        header: () => null,
                        title: 'Home',
                        headerTitleStyle: Styles.headerTitleStyle,
                        drawerLabelStyle: Styles.drawerLabelStyle,
                        drawerActiveBackgroundColor: Colors.grayDrawerBg,
                        drawerIcon: ({ focused, size }) => (
                            <Image
                                style={Styles.imageUserEditIconDeafult}
                                resizeMode="contain"
                                source={Images.whiteHomeIcon} />
                        ),
                    })}
                    component={EditProfileStack}
                />
                <Drawer.Screen
                    name="Edit Profile"
                    options={({ route }) => ({
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewEditProfile}>
                                <Text style={Styles.textEditProfile}> Edit Profile</Text>
                                <Image
                                    style={Styles.imageRightArrowProfileIcon}
                                    resizeMode="contain"
                                    source={Images.rightArrowIcon} />
                            </View>
                        ),
                        header: () => null,
                        title: 'Edit Profile',
                        headerTitleStyle: Styles.headerTitleStyle,
                        drawerLabelStyle: Styles.drawerLabelStyle,
                        drawerActiveBackgroundColor: Colors.grayDrawerBg,
                        drawerIcon: ({ focused, size }) => (
                            <Image
                                style={Styles.imageUserEditIcon}
                                resizeMode="contain"
                                source={Images.userEditIcon} />
                        ),
                    })}
                    component={ProfileUpdateScreen}
                />
                <Drawer.Screen
                    name="Upcoming & Past Booking"
                    options={({ route }) => ({
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewUpcoming}>
                                <Text style={Styles.textUpcoming}>
                                    {`Upcoming & Past\nBooking`}
                                </Text>
                                <Image
                                    style={Styles.imageRightArrowUpcoming}
                                    resizeMode="contain"
                                    source={Images.rightArrowIcon} />
                            </View>
                        ),
                        header: () => null,
                        title: "Upcoming & Past Booking",
                        drawerLabelStyle: Styles.drawerLabelUpcomingStyle,
                        drawerIcon: ({ focused, size }) => (
                            <Image
                                style={Styles.imageUpcomingIcon}
                                resizeMode="contain"
                                source={Images.upcomingIcon} />
                        ),
                    })}
                    component={EditUpcomingStack}
                />
                <Drawer.Screen
                    name="PreferredScreenStack"
                    options={{
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewPreferredDriver}>
                                <Text style={Styles.textPreferedDriver}>Preferred Driver</Text>
                                <Image
                                    style={Styles.imageRightArrowDriver}
                                    resizeMode="contain"
                                    source={Images.rightArrowIcon} />
                            </View>
                        ),
                        header: () => null,
                        title: 'Preferred Driver', // PreferredDriver
                        drawerLabelStyle: Styles.drawerLabelUpcomingStyle,
                        drawerIcon: ({ focused, size }) => (
                            <Image
                                style={Styles.imageDriver}
                                resizeMode="contain"
                                source={Images.driverIcon} />
                        ),
                    }}
                    component={EditPreferredStack}
                />
                <Drawer.Screen
                    name="SavedScreenStack"
                    options={{
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewPreferredDriver}>
                                <Text style={Styles.textSavedLocation}>Saved Location</Text>
                                <Image
                                    style={Styles.imageRightArrowDriver}
                                    resizeMode="contain"
                                    source={Images.rightArrowIcon} />
                            </View>
                        ),
                        header: () => null,
                        title: 'Saved Location',
                        drawerLabelStyle: Styles.drawerLabelUpcomingStyle,
                        drawerIcon: ({ focused, size }) => (
                            <Image
                                style={Styles.imageLove}
                                resizeMode="contain"
                                source={Images.loveIcon} />
                        ),
                    }}
                    component={EditSavedStack}
                />
                <Drawer.Screen
                    name="PrivacyScreenStack"
                    options={{
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewPreferredDriver}>
                                <Text style={Styles.textUpcoming}>Privacy Policy</Text>
                                <Image
                                    style={Styles.imageRightArrowPrivacyIcon}
                                    resizeMode="contain"
                                    source={Images.rightArrowIcon} />
                            </View>
                        ),
                        header: () => null,
                        title: 'Privacy Policy',
                        drawerLabelStyle: Styles.textUpcoming,
                        drawerIcon: ({ focused, size }) => (
                            <Image
                                style={Styles.imagePrivacy}
                                resizeMode="contain"
                                source={Images.privacyIcon} />
                        ),
                    }}
                    component={EditPrivacyStack}
                />
                <Drawer.Screen
                    name="TermsScreenStack"
                    options={{
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewPreferredDriver}>
                                <Text style={Styles.textPreferedDriver}>
                                    {`Terms &\nConditions`}</Text>
                                <Image
                                    style={Styles.textTermsAndCondition}
                                    resizeMode="contain"
                                    source={Images.rightArrowIcon} />
                            </View>
                        ),
                        header: () => null,
                        title: 'Terms & Conditions',
                        drawerLabelStyle: Styles.textEditProfile,
                        drawerIcon: ({ focused, size }) => (
                            <Image
                                style={Styles.imageTerms}
                                resizeMode="contain"
                                source={Images.rightIcon} />
                        ),
                    }}
                    component={EditTermsStack}
                />
                <Drawer.Screen
                    name="AboutScreenStack"
                    options={{
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewPreferredDriver}>
                                <Text style={Styles.textUpcoming}>About Us</Text>
                                <Image
                                    style={Styles.imageRightArrowAbout}
                                    resizeMode="contain"
                                    source={Images.rightArrowIcon} />
                            </View>
                        ),
                        header: () => null,
                        title: 'About Us',
                        drawerLabelStyle: Styles.textSavedLocation,
                        drawerIcon: ({ focused, size }) => (
                            <Image
                                style={Styles.imageAboutIcon}
                                resizeMode="contain"
                                source={Images.aboutIcon} />
                        ),
                    }}
                    component={EditAboutStack}
                />
                <Drawer.Screen
                    name="FAQScreenStack"
                    options={{
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewPreferredDriver}>
                                <Text style={Styles.textSavedLocation}>FAQ</Text>
                                <Image
                                    style={Styles.imageArrowRightFaq}
                                    resizeMode="contain"
                                    source={Images.rightArrowIcon} />
                            </View>
                        ),
                        header: () => null,
                        title: 'FAQ',
                        drawerLabelStyle: Styles.textPreferedDriver,
                        drawerIcon: ({ focused, size }) => (
                            <Image
                                style={Styles.imageFqaIcon}
                                resizeMode="contain"
                                source={Images.faqIcon} />
                        ),
                    }}
                    component={EditFAQStack}
                />


                <Drawer.Screen
                    name="LogoutScreenStack"
                    options={{
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewPreferredDriver}>
                                {/* <Text
                                    style={Styles.textLogout}
                                    onPress={toggleModal}
                                >Logout</Text> */}
                                <MyComponent />
                            </View>
                        ),
                        header: () => null,
                        title: 'Logout',
                        drawerLabelStyle: Styles.drawerLabelLogout,
                        drawerIcon: ({ focused, size }) => (
                            <Image
                                style={Styles.imageExitIcon}
                                resizeMode="contain"
                                source={Images.exitIcon} />
                        ),
                    }}
                    component={EditProfileStack}
                />


                <Drawer.Screen
                    name="Help & Support"
                    options={{
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewPreferredDriver}>
                                <Text style={Styles.textHelp}>Help & Support</Text>
                            </View>
                        ),
                        header: () => null,
                        title: 'Help & Support',
                        drawerLabelStyle: Styles.helpLabel,
                        drawerIcon: ({ focused, size }) => (
                            <Image
                                style={Styles.imageHelpIcon}
                                resizeMode="contain"
                                source={Images.helpIcon} />
                        ),
                    }}
                    component={EditHelpStack}
                />
                {/* <Drawer.Screen
                    name="Theme"
                    options={{
                        drawerLabel: ({ color }) => (
                            <View style={Styles.viewPreferredDriver}>
                                <Text style={Styles.textSavedLocationMode}>Dark Mode</Text>
                                <View style={Styles.imageArrowRightMode}>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#f4f3f4' }}
                                        thumbColor={isDarkMode ? '#008000' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleTheme}
                                        value={isDarkMode === 'dark'}
                                    />
                                </View>

                            </View>
                        ),
                        header: () => null,
                        title: 'Theme',
                        drawerLabelStyle: Styles.drawerLabelLogout,
                        drawerIcon: ({ focused, size }) => (
                            isDarkMode === 'dark' ?
                                <Image
                                    style={Styles.imageExitIcon}
                                    resizeMode="contain"
                                    source={Images.accountEmailWhite_} />
                                : <Image
                                    style={Styles.imageExitIcon}
                                    resizeMode="contain"
                                    source={Images.accountEmailBlack_} />
                        ),
                    }}
                    component={EditProfileStack}
                /> */}
            </Drawer.Navigator>
        </NavigationContainer>


    )
}



export default HomeOneScreen;