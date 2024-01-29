import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text';
import TextInputComponent from '../../components/TextInput';
import { Colors, Fonts, Images } from '../../themes';
import { ConstValue, ScreenText } from '../../utils';
import { useTheme } from '../../utils/ThemeContext';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from '../../utils/commonfunction';
import Styles from './style';


type Props = {
    navigation: any
}

const HomeTabScreen = ({ route, navigation }) => {

    const [isModalVisible, setModalVisible] = useState(true);


    const [isRideStatus, setRideStatus] = useState(false);


    const [isDRIVERSTATUS, setDRIVERSTATUS] = useState("Booking Request Sent");


    const [markerCoordinate, setMarkerCoordinate] =
        useState({ latitude: 37.78825, longitude: -122.4324 });

    const [radius, setRadius] = useState(800); // Define the radius in meters


    const [email, setEmail] = useState('');


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const ref = useRef<any>(null); // Ref for the TextInput
    const handleUserLocation = (useremail: any) => {
        setEmail(useremail);
    }

    const images = [
        Images.sliderIcon,
        Images.sliderIcon,
        Images.sliderIcon,
        Images.sliderIcon,
        // Add more image URLs as needed
    ];

    let user_latitude;
    let user_longitude;

    let statusCheack;
    let dateCheack;

    let paymentStatus;
    let rideStatus;

    let OTPStatus;
    let OTPStatusVerfiy;

    const mapViewRef = useRef<any>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get Profile RideId From UserInfo

                await axiosPostBookingStatus();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        // Set interval to refresh every 1 seconds
        const intervalId = setInterval(fetchData, 5 * 1000);

        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, []);


    useEffect(() => {
        const backAction = async () => {
            // Handle the back button press
            // Return true to prevent default behavior (e.g., closing the app)
            // Return false to allow default behavior
            // You can add your custom logic here
            // For example, navigate to a different screen or show an alert
            console.log('Back button pressed!');

            // // Add your custom logic for clearing AsyncStorage data
            // try {
            //     await AsyncStorage.clear();
            //     console.log('AsyncStorage data cleared!');
            // } catch (error) {
            //     console.error('Error clearing AsyncStorage data:', error);
            // }


            BackHandler.exitApp();

            return true; // Prevent default behavior
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); // Remove the event listener on component unmount

    }, []);

    // Auto Zoom Added
    useEffect(() => {
        // Zoom to the marker using animateToRegion when markerCoordinate changes
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion({
                latitude: markerCoordinate.latitude,
                longitude: markerCoordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000); // Adjust duration as needed
        }
    }, [markerCoordinate]);


    useEffect(() => {

        const fetchData = () => {
            // Get Current Lat And Long
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;

                    user_latitude = position.coords.latitude;
                    user_longitude = position.coords.longitude;

                    console.log("User-fetchData1==>", user_latitude);
                    console.log("User-fetchData2==>", user_longitude);

                    let newCoordinate = { latitude: user_latitude, longitude: user_longitude };
                    setMarkerCoordinate(newCoordinate);

                },
                error => {
                    console.log(`Error getting location: ${error.message}`);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }

        fetchData();

        // Set interval to refresh every 10 seconds
        const intervalId = setInterval(fetchData, 10 * 1000);
        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, []);

    const { isDarkMode, toggleTheme } = useTheme();


    const axiosPostBookingStatus = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosCheckGetRideStatusRequest();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }


    const axiosCheckGetRideStatusRequest = async () => {
        try {
            let storedRideId = await AsyncStorage.getItem('store_get_id');
            let storedRideType = await AsyncStorage.getItem('store_get_type');

            console.log("storedRideId===>", storedRideId);
            console.log("storedRideType===>", storedRideType);

            if (storedRideId !== null) {

                const url = `https://rideshareandcourier.graphiglow.in/api/rideStatus/checkRide/${JSON.parse(storedRideId)}`;

                console.log("axiosCheckGetRideStatusRequest===>", url);

                await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 200
                            && response?.data?.message === 'Ride Status Derived Successful') {
                            // Toast.show('Ride Status Get Successfully!', Toast.SHORT);

                            statusCheack = response?.data?.matchingUsers?.Status;
                            dateCheack = response?.data?.matchingUsers?.date;

                            paymentStatus = response?.data?.matchingUsers?.PaymentStatus;
                            rideStatus = response?.data?.matchingUsers?.RideStatus;

                            OTPStatus = response?.data?.matchingUsers?.OTP;
                            OTPStatusVerfiy = response?.data?.matchingUsers?.OTPStatus;

                            console.log("OTPStatus===>", OTPStatus);
                            console.log("OTPStatusVerfiy===>", OTPStatusVerfiy);


                            console.log("Status", paymentStatus);

                            // 1
                            if (statusCheack === "Accept") {

                                if (storedRideType === "Taxi Booking") {
                                    console.log("GetStatus===>", statusCheack);

                                    setRideStatus(true);
                                    setDRIVERSTATUS("Booking Request Accepted");
                                } else {
                                    console.log("GetStatus===>", statusCheack);

                                    setRideStatus(true);
                                    setDRIVERSTATUS("Courier Request Accepted");
                                }

                            } else {
                                // Toast.show('Unable to Get Ride Status!', Toast.SHORT);
                            }


                            // OTP 
                            if (OTPStatus !== null) {
                                setDRIVERSTATUS("Enjoy your ride , Ride Started");
                            } else {
                                setDRIVERSTATUS("Enjoy your ride , Ride Started");
                            }

                            // OTPStatusVerfiy 
                            if (OTPStatusVerfiy === "Verify") {
                                setDRIVERSTATUS("Driver arrived your location");
                            } else {
                                setDRIVERSTATUS("Driver Started Waiting Timer");
                            }

                            // 2
                            if (paymentStatus === "Done") {
                                // null
                            } else {
                                // null
                            }

                            // 3
                            if (rideStatus === "Completed") {
                                setDRIVERSTATUS("Ride Complete");
                                // setRideStatus(false) //2901
                            } else {
                            }


                        } else {
                            // Toast.show('Unable to Get Ride Status!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Toast.show('Unable to Get Ride Status!', Toast.SHORT);
                    });
            } else {

            }



        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    };


    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <View style={Styles.container}>
                <MapView
                    ref={mapViewRef}
                    style={Styles.viewMapview}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Circle
                        center={markerCoordinate}
                        radius={radius}
                        fillColor="rgba(0, 0, 255, 0.2)" // Transparent blue fill color
                        strokeWidth={0} // No border
                    />
                    <Marker
                        coordinate={markerCoordinate}
                        title="Your Current Location"
                        description="You are here"
                    />
                </MapView>

                <View style={{
                    position: 'absolute',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: wp(2),
                    backgroundColor: isDarkMode === 'dark' ? "rgba(0, 0, 0, 0.6)" : "#FFFFFF", //QUICK
                    height: wp(14),
                    padding: wp(2),
                    marginTop: wp(10),
                    alignSelf: 'center',
                }}>
                    <TouchableOpacity onPress={
                        () => navigation.toggleDrawer()}
                        style={Styles.viewBlackBackground}>

                        {isDarkMode === 'dark' ?
                            <Image
                                style={Styles.imageOpenIcon}
                                resizeMode="contain"
                                source={Images.openIcon} /> :
                            <Image
                                style={Styles.imageOpenIcon}
                                resizeMode="contain"
                                source={Images.openIconWhite} />}

                    </TouchableOpacity>

                    <TextInputComponent
                        selectionColor={Colors.white}
                        isVisibleDropDown={false}
                        marginVertical={hp(1)}
                        width={wp(50)}
                        height={hp(7)}
                        marginTop={hp(2)}
                        isUserHide={false}
                        textfontSize={ConstValue.value15}
                        textfontFamily={Fonts.PoppinsRegular}
                        textlineHeight={ConstValue.value0}
                        ref={ref}
                        placeholder={"Your Current Location"}
                        editable={true}
                        multiline={false}
                        secureTextEntry={false}
                        isPadding={true}
                        keyboardType='default'
                        textAlign='left'
                        numberOfLines={null}
                        maxLength={null}
                        color={Colors.white}
                        backgroundColor={'transparent'}
                        borderRadius={wp(2)}
                        onChangeText={handleUserLocation}
                        placeholderTextColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                    />

                    <View style={Styles.viewMargin}>
                        <ButtonComponent
                            isVisibleMobile={false}
                            isVisibleFaceBook={false}
                            heightBtn={hp(5)}
                            widthBtn={wp(25)}
                            isRightArrow={false}
                            color={Colors.white}
                            title={ScreenText.BookNow}
                            fontWeight="600"
                            fontSize={wp(3)}
                            onPress={() =>
                                navigation.navigate('BookingScreen', {
                                    itemType: 'Select Service'
                                })
                            }
                            // onPress={() => props.navigation.navigate("BookingScreen")}
                            fontFamily={Fonts.PoppinsRegular}
                            alignSelf='center'
                            textAlign='center'
                            borderRadius={wp(2)}
                            backgroundColor={Colors.blue}
                        />
                    </View>
                </View>


                <View style={{
                    position: "absolute",
                    alignItems: 'center',
                    borderTopLeftRadius: wp(8),
                    borderTopRightRadius: wp(8),
                    backgroundColor: isRideStatus && isDRIVERSTATUS ===
                        "Driver Started Waiting Timer" ? Colors.orange :
                        (isRideStatus ? Colors.header : Colors.transparent),
                    height: '100%', //  height: "auto",
                    // padding: wp(2),
                    alignSelf: 'center',
                    marginVertical: wp(83),
                    width: '100%',
                }}>

                    {isRideStatus ?
                        <View style={Styles.viewBookingStatus}>

                            <View style={Styles.viewWhiteDot} />

                            <View style={{
                                flex: 1,
                                justifyContent: 'center'
                            }}>
                                <TextComponent
                                    color={Colors.white}
                                    title={isDRIVERSTATUS}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    numberOfLines={2}
                                    marginHorizontal={wp(2)}
                                    fontFamily={Fonts.PoppinsSemiBold}
                                    textAlign='left'
                                />
                            </View>

                            <View style={CommonStyle.commonFlex}>
                                <TextComponent
                                    color={Colors.white}
                                    title={isDRIVERSTATUS == "Ride Complete" ? "View Booking" : "View Booking"}
                                    textDecorationLine={'underline'} //USER
                                    onPress={() =>
                                        navigation.navigate('BookingRequest', {
                                            itemRIDEID_SENT: route?.params?.itemRIDEID,
                                            itemRIDER_ID_SENT: route?.params?.itemRider_ID,
                                            itemRIDER_DISTANCE_SENT: route?.params?.itemRiderDistance,
                                            itemRIDER_DURATUION_SENT: route?.params?.itemRiderDuration,
                                            itemRIDER_PICKSTATION: route?.params?.itemRidePickStation,
                                            itemRIDER_DROPSTATION: route?.params?.itemRideDropStation,
                                            itemRIDER_RIDE_CHARGE: route?.params?.itemPaymentRideCharge,
                                            itemRIDER_RIDE_FEES_CON: route?.params?.itemPaymentFeesConvenience,
                                            itemRIDER_RIDE_WAITING_CHARGES: route?.params?.itemPaymentWaitingCharge,
                                            itemRIDER_RIDE_DICOUNT: route?.params?.itemPaymentDiscount,
                                            itemRIDER_RIDE_TOTALAMOUNT: route?.params?.itemPaymentTotalAmount,
                                        })
                                    }
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    marginHorizontal={wp(2)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='right'
                                />
                            </View>

                        </View>
                        :
                        <></>
                    }


                    <View style={Styles.overlayFixedView_Bottam}>

                        <View style={Styles.modalConainer}>

                            <View style={Styles.viewModalFixed}>
                                <View>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('BookingScreen', {
                                                itemType: 'Taxi Booking'
                                            })
                                        }
                                    >
                                        <View style={Styles.viewItem1}>
                                            <Image
                                                source={Images.whiteCardIcon}
                                                resizeMode="contain"
                                                style={Styles.viewItemImage1}
                                            />
                                        </View>
                                        <Text style={Styles.textTexiBooking}>Taxi Booking</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('CourierBooking', {
                                            itemType: 'Courier Delivery'
                                        })
                                    }>

                                    <View>
                                        <View style={Styles.viewItem1}>
                                            <Image
                                                source={Images.whiteCourierIcon}
                                                resizeMode="contain"
                                                style={Styles.imageCouierIcon}
                                            />
                                        </View>
                                        <Text style={Styles.textTexiBooking}>Courier Delivery</Text>
                                    </View>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    activeOpacity={0.2}
                                    onPress={() => navigation.navigate("HelpScreen")}>
                                    <View>
                                        <View style={Styles.viewItem1}>
                                            <Image
                                                source={Images.whiteSupportIcon}
                                                resizeMode="contain"
                                                style={Styles.imageCouierIcon}
                                            />
                                        </View>
                                        <Text style={Styles.textTexiBooking}>Support</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={Styles.sliderBox}>
                                <SliderBox
                                    images={images}
                                    sliderBoxHeight={wp(50)}
                                    parentWidth={wp(90)}
                                    autoPlay={true}
                                    dotColor={Colors.blue}
                                    inactiveDotColor={Colors.white}
                                    dotStyle={Styles.dotStyle}
                                    resizeMethod={'resize'}
                                    resizeMode={'contain'}
                                    autoplayInterval={1000}
                                />
                            </View>
                        </View>

                    </View>

                </View>


            </View >
        </SafeAreaView >
    )

}

export default HomeTabScreen;