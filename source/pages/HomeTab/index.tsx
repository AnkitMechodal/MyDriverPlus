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


    // 
    let storedRideID;
    let storedRideID_;
    let storedRideDISTANCE_;
    let storedRideTIME_;
    let storedRidePICK_;
    let storedRideDROP_;
    let storedRideCHARGE_;
    let storedRideFEESCON_;
    let storedRideWATTINGCHARGE_;
    let storedRideGETDISCOUNT_;
    let storedRideGETOTALAMOUNT_;

    let storedRideIDValue;
    let storedRideID_Value;
    let storedRideDISTANCE_Value;
    let storedRideTIME_Value;
    let storedRidePICK_Value;
    let storedRideDROP_Value;
    let storedRideCHARGE_Value;
    let storedRideFEESCON_Value;
    let storedRideWATTINGCHARGE_Value;
    let storedRideGETDISCOUNT_Value;
    let storedRideGETOTALAMOUNT_Value;

    let storedRideType;
    let storedBidType;

    //Status
    //RideStatus
    //LastRideId

    let StatusUser;
    let RideStatusUser;
    let LastRideIdIUser;
    let RideObjectIDUser;
    let RidetypeUser;
    let service_stypeUser;


    // Driver Status :
    let USER_RIDEID;
    let USER_RIDEDURATION;
    let USER_RIDEDISTANCE;
    let USER_PICK_UP_LOCATION;
    let USER_DROP_UP_LOCATION;
    let USER_RIDE_CHARGE;
    let USER_CON_FEES;
    let USER_WATTING_CHARGES;
    let USER_DISCOUNT;
    let USER_TOTAL_AMOUNT;


    const mapViewRef = useRef<any>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get Profile RideId From UserInfo

                // TODO :
                await axiosPostLastRideStatus();

                // await axiosPostBookingStatus();

                // // Check Status Local Data Fetch 
                // storedRideID = await AsyncStorage.getItem('store_get_id');
                // storedRideID_ = await AsyncStorage.getItem('store_get_id_');
                // storedRideDISTANCE_ = await AsyncStorage.getItem('store_get_distance');
                // storedRideTIME_ = await AsyncStorage.getItem('store_get_time');
                // storedRidePICK_ = await AsyncStorage.getItem('store_get_pickstation');
                // storedRideDROP_ = await AsyncStorage.getItem('store_get_dropstation');
                // storedRideCHARGE_ = await AsyncStorage.getItem('store_get_ridecharge');
                // storedRideFEESCON_ = await AsyncStorage.getItem('store_get_feescon');
                // storedRideWATTINGCHARGE_ = await AsyncStorage.getItem('store_get_waittingcharge');
                // storedRideGETDISCOUNT_ = await AsyncStorage.getItem('store_get_dicount');
                // storedRideGETOTALAMOUNT_ = await AsyncStorage.getItem('store_get_totalamount');

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        // Set interval to refresh every 1 seconds
        const intervalId = setInterval(fetchData, 1 * 1000);

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


    // GetRideStatusCheck
    const axiosPostLastRideStatus = async () => {

        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostLastRideStatusRequest();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }


    const axiosPostLastRideStatusRequest = async () => {
        try {
            const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            if (storedLinkedId !== null) {
                const userId = JSON.parse(storedLinkedId);
                const url = `https://rideshareandcourier.graphiglow.in/api/HomeScreenStatus/checkRide/${userId}`;

                console.log("urlurlurlurl", url);

                //  const url = `https://rideshareandcourier.graphiglow.in/api/HomeScreenStatus/checkRide/65b1df2e398f6beb9542e992`;

                console.log("HomeScreenStatus==>", JSON.stringify(url, null, 2));

                await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 200
                            && response?.data?.message === 'Ride Status Derived Successfully') {

                            // Status
                            // RideStatus
                            // LastRideId
                            // RideObjectID
                            // Ridetype

                            StatusUser = response?.data?.matchingUsers?.Status
                            RideStatusUser = response?.data?.matchingUsers?.RideStatus
                            LastRideIdIUser = response?.data?.matchingUsers?.LastRideId

                            RideObjectIDUser = response?.data?.matchingUsers?.RideObjectID
                            RidetypeUser = response?.data?.matchingUsers?.Ridetype

                            service_stypeUser = response?.data?.matchingUsers?.service_stype

                            console.log("RideObjectIDUser===>", RidetypeUser);
                            console.log("RidetypeUser===>", RideObjectIDUser);


                            if (StatusUser == "Arrived") {
                                setRideStatus(true);
                                setDRIVERSTATUS(RideStatusUser);
                                console.log("YES");

                                // TODO :
                                axiosPostNavigationStatus(RideObjectIDUser);

                            } else {
                                console.log("NO");
                                setDRIVERSTATUS("Booking Request Sent");
                            }

                            // Toast.show('Ride Status Get Success!', Toast.SHORT);

                        } else {
                            // Toast.show('Enabel To Get Ratings!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Handle errors
                        // Toast.show('Enabel To Get Ratings!', Toast.SHORT);
                    });

            } else {

            }
        } catch (error) {

        }
    }


    const axiosPostNavigationStatus = async (RideObjectIDUser) => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostNavigationStatusRequest(RideObjectIDUser);
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }


    const axiosPostNavigationStatusRequest = async (RideObjectIDUser: any) => {

        // const storedLinkedId = await AsyncStorage.getItem('store_ride_id');
        // if (storedLinkedId !== null) {

        const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';

        // Prepare data in JSON format
        const data = {
            id: RideObjectIDUser
        };

        console.log("RIDE_OBJECT==>", JSON.stringify(data, null, 2));

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    &&
                    response?.data?.message === 'Ride Details') {

                    console.log("axiosPostNavigationStatusRequest===>"
                        , JSON.stringify(response?.data?.matchingVehicle, null, 2));

                    // Handle API response here
                    USER_RIDEID = response?.data?.matchingVehicle?.RideId;
                    USER_RIDEDURATION = response?.data?.matchingVehicle?.time;
                    USER_RIDEDISTANCE = response?.data?.matchingVehicle?.distance;
                    USER_PICK_UP_LOCATION = response?.data?.matchingVehicle?.pickup_locations;
                    USER_DROP_UP_LOCATION = response?.data?.matchingVehicle?.drop_locations;
                    USER_RIDE_CHARGE = response?.data?.matchingVehicle?.RideCharge;
                    USER_CON_FEES = response?.data?.matchingVehicle?.BookingFeesConvenience;
                    USER_WATTING_CHARGES = response?.data?.matchingVehicle?.Waiting_Charge;
                    USER_DISCOUNT = response?.data?.matchingVehicle?.Discount;
                    USER_TOTAL_AMOUNT = response?.data?.matchingVehicle?.TotalAmount;

                    Toast.show('Driver Details Retrieved Successfully!', Toast.SHORT);

                } else {
                    // Toast.show('Enabel To Retrieved Details!', Toast.SHORT);
                    //  Welcome! Signed in successfully.
                }
            })
            .catch(error => {
                // Handle errors
                // Toast.show('Enabel To Retrieved Details!', Toast.SHORT);
            });

        // } else {

        // }

    };



    // const onPressViewBooking = async () => {
    //     try {
    //         // Check Status Local Data Fetch 
    //         if (storedRideID !== null) {
    //             storedRideID = await AsyncStorage.getItem('store_get_id');
    //             storedRideIDValue = JSON.parse(storedRideID);
    //         }

    //         if (storedRideID_ !== null) {
    //             storedRideID_ = await AsyncStorage.getItem('store_get_id_');
    //             storedRideID_Value = JSON.parse(storedRideID_);
    //         }

    //         if (storedRideDISTANCE_ !== null) {
    //             storedRideDISTANCE_ = await AsyncStorage.getItem('store_get_distance');
    //             storedRideDISTANCE_Value = JSON.parse(storedRideDISTANCE_);
    //         }

    //         if (storedRideTIME_ !== null) {
    //             storedRideTIME_ = await AsyncStorage.getItem('store_get_time');
    //             storedRideTIME_Value = JSON.parse(storedRideTIME_);
    //         }

    //         if (storedRidePICK_ !== null) {
    //             storedRidePICK_ = await AsyncStorage.getItem('store_get_pickstation');
    //             storedRidePICK_Value = JSON.parse(storedRidePICK_);
    //         }

    //         if (storedRideDROP_ !== null) {
    //             storedRideDROP_ = await AsyncStorage.getItem('store_get_dropstation');
    //             storedRideDROP_Value = JSON.parse(storedRideDROP_);
    //         }

    //         if (storedRideCHARGE_ !== null) {
    //             storedRideCHARGE_ = await AsyncStorage.getItem('store_get_ridecharge');
    //             storedRideCHARGE_Value = JSON.parse(storedRideCHARGE_);
    //         }

    //         if (storedRideFEESCON_ !== null) {
    //             storedRideFEESCON_ = await AsyncStorage.getItem('store_get_feescon');
    //             storedRideFEESCON_Value = JSON.parse(storedRideFEESCON_);
    //         }

    //         if (storedRideWATTINGCHARGE_ !== null) {
    //             storedRideWATTINGCHARGE_ = await AsyncStorage.getItem('store_get_waittingcharge');
    //             storedRideWATTINGCHARGE_Value = JSON.parse(storedRideWATTINGCHARGE_);
    //         }

    //         if (storedRideGETDISCOUNT_ !== null) {
    //             storedRideGETDISCOUNT_ = await AsyncStorage.getItem('store_get_dicount');
    //             storedRideGETDISCOUNT_Value = JSON.parse(storedRideGETDISCOUNT_);
    //         }

    //         if (storedRideGETOTALAMOUNT_ !== null) {
    //             storedRideGETOTALAMOUNT_ = await AsyncStorage.getItem('store_get_totalamount');
    //             storedRideGETOTALAMOUNT_Value = JSON.parse(storedRideGETOTALAMOUNT_);
    //         }

    //         if (storedRideType !== null) {
    //             storedRideType = await AsyncStorage.getItem('store_get_type');
    //         }

    //         if (storedBidType !== null) {
    //             storedBidType = await AsyncStorage.getItem('store_get_bid_type');
    //         }
    //         //  Bidding Ride
    //         // storedRideType === "Taxi Booking"
    //         if (storedRideType === "Taxi Booking") {
    //             navigation.navigate('BookingRequest', {
    //                 itemRIDEID_SENT: storedRideIDValue,
    //                 itemRIDER_ID_SENT: storedRideID_Value,
    //                 itemRIDER_DISTANCE_SENT: storedRideDISTANCE_Value,
    //                 itemRIDER_DURATUION_SENT: storedRideTIME_Value,
    //                 itemRIDER_PICKSTATION: storedRidePICK_Value,
    //                 itemRIDER_DROPSTATION: storedRideDROP_Value,
    //                 itemRIDER_RIDE_CHARGE: storedRideCHARGE_Value,
    //                 itemRIDER_RIDE_FEES_CON: storedRideFEESCON_Value,
    //                 itemRIDER_RIDE_WAITING_CHARGES: storedRideWATTINGCHARGE_Value,
    //                 itemRIDER_RIDE_DICOUNT: storedRideGETDISCOUNT_Value,
    //                 itemRIDER_RIDE_TOTALAMOUNT: storedRideGETOTALAMOUNT_Value,
    //             })

    //         } else if (storedBidType == "Bidding Ride") {
    //             navigation.navigate('BookingBiddingRequest', {
    //                 itemRIDEID_SENT: storedRideIDValue,
    //                 itemRIDER_ID_SENT: storedRideID_Value,
    //                 itemRIDER_DISTANCE_SENT: storedRideDISTANCE_Value,
    //                 itemRIDER_DURATUION_SENT: storedRideTIME_Value,
    //                 itemRIDER_PICKSTATION: storedRidePICK_Value,
    //                 itemRIDER_DROPSTATION: storedRideDROP_Value,
    //                 itemRIDER_RIDE_CHARGE: storedRideCHARGE_Value,
    //                 itemRIDER_RIDE_FEES_CON: storedRideFEESCON_Value,
    //                 itemRIDER_RIDE_WAITING_CHARGES: storedRideWATTINGCHARGE_Value,
    //                 itemRIDER_RIDE_DICOUNT: storedRideGETDISCOUNT_Value,
    //                 itemRIDER_RIDE_TOTALAMOUNT: storedRideGETOTALAMOUNT_Value,
    //             })
    //         } else {

    //             if (storedBidType == "Bidding Ride") {
    //                 navigation.navigate('BookingBiddingRequest', {
    //                     itemRIDEID_SENT: storedRideIDValue,
    //                     itemRIDER_ID_SENT: storedRideID_Value,
    //                     itemRIDER_DISTANCE_SENT: storedRideDISTANCE_Value,
    //                     itemRIDER_DURATUION_SENT: storedRideTIME_Value,
    //                     itemRIDER_PICKSTATION: storedRidePICK_Value,
    //                     itemRIDER_DROPSTATION: storedRideDROP_Value,
    //                     itemRIDER_RIDE_CHARGE: storedRideCHARGE_Value,
    //                     itemRIDER_RIDE_FEES_CON: storedRideFEESCON_Value,
    //                     itemRIDER_RIDE_WAITING_CHARGES: storedRideWATTINGCHARGE_Value,
    //                     itemRIDER_RIDE_DICOUNT: storedRideGETDISCOUNT_Value,
    //                     itemRIDER_RIDE_TOTALAMOUNT: storedRideGETOTALAMOUNT_Value,
    //                 })
    //             } else {
    //                 navigation.navigate('CourierRequest', {
    //                     itemRIDEID_SENT: storedRideIDValue,
    //                     itemRIDER_ID_SENT: storedRideID_Value,
    //                     itemRIDER_DISTANCE_SENT: storedRideDISTANCE_Value,
    //                     itemRIDER_DURATUION_SENT: storedRideTIME_Value,
    //                     itemRIDER_PICKSTATION: storedRidePICK_Value,
    //                     itemRIDER_DROPSTATION: storedRideDROP_Value,
    //                     itemRIDER_RIDE_CHARGE: storedRideCHARGE_Value,
    //                     itemRIDER_RIDE_FEES_CON: storedRideFEESCON_Value,
    //                     itemRIDER_RIDE_WAITING_CHARGES: storedRideWATTINGCHARGE_Value,
    //                     itemRIDER_RIDE_DICOUNT: storedRideGETDISCOUNT_Value,
    //                     itemRIDER_RIDE_TOTALAMOUNT: storedRideGETOTALAMOUNT_Value,
    //                 })
    //             }


    //         }

    //     } catch (error) {

    //     }

    // }

    const onPressViewBookingLast = () => {
        if (RidetypeUser = "Taxi Booking") {
            if (service_stypeUser = "Bidding Ride") {
                console.log("itemRIDEID_SENT---------->", LastRideIdIUser)
                console.log("itemRIDEID_SENT---------->", LastRideIdIUser)
                console.log("itemRIDEID_SENT---------->", LastRideIdIUser)

                console.log("1", "Taxi Booking")
                console.log("3", "Bidding Ride")
                console.log("1", "Taxi Booking")
                console.log("3", "Bidding Ride")
                // navigation.navigate('BookingBiddingRequest', {
                //     itemRIDEID_SENT: LastRideIdIUser,
                //     itemRIDER_ID_SENT: RideObjectIDUser,
                //     itemRIDER_DISTANCE_SENT: storedRideDISTANCE_Value,
                //     itemRIDER_DURATUION_SENT: storedRideTIME_Value,
                //     itemRIDER_PICKSTATION: storedRidePICK_Value,
                //     itemRIDER_DROPSTATION: storedRideDROP_Value,
                //     itemRIDER_RIDE_CHARGE: storedRideCHARGE_Value,
                //     itemRIDER_RIDE_FEES_CON: storedRideFEESCON_Value,
                //     itemRIDER_RIDE_WAITING_CHARGES: storedRideWATTINGCHARGE_Value,
                //     itemRIDER_RIDE_DICOUNT: storedRideGETDISCOUNT_Value,
                //     itemRIDER_RIDE_TOTALAMOUNT: storedRideGETOTALAMOUNT_Value,
                // })

            } else {
                console.log("1", "Taxi Booking")
                console.log("1", "Taxi Booking")
                // navigation.navigate('BookingRequest', {
                //     itemRIDEID_SENT: storedRideIDValue,
                //     itemRIDER_ID_SENT: storedRideID_Value,
                //     itemRIDER_DISTANCE_SENT: storedRideDISTANCE_Value,
                //     itemRIDER_DURATUION_SENT: storedRideTIME_Value,
                //     itemRIDER_PICKSTATION: storedRidePICK_Value,
                //     itemRIDER_DROPSTATION: storedRideDROP_Value,
                //     itemRIDER_RIDE_CHARGE: storedRideCHARGE_Value,
                //     itemRIDER_RIDE_FEES_CON: storedRideFEESCON_Value,
                //     itemRIDER_RIDE_WAITING_CHARGES: storedRideWATTINGCHARGE_Value,
                //     itemRIDER_RIDE_DICOUNT: storedRideGETDISCOUNT_Value,
                //     itemRIDER_RIDE_TOTALAMOUNT: storedRideGETOTALAMOUNT_Value,
                // })
            }
        } else if (RidetypeUser = "Courier Delivery") {
            console.log("2", "Courier Delivery")
            console.log("2", "Courier Delivery")
            // navigation.navigate('CourierRequest', {
            //     itemRIDEID_SENT: storedRideIDValue,
            //     itemRIDER_ID_SENT: storedRideID_Value,
            //     itemRIDER_DISTANCE_SENT: storedRideDISTANCE_Value,
            //     itemRIDER_DURATUION_SENT: storedRideTIME_Value,
            //     itemRIDER_PICKSTATION: storedRidePICK_Value,
            //     itemRIDER_DROPSTATION: storedRideDROP_Value,
            //     itemRIDER_RIDE_CHARGE: storedRideCHARGE_Value,
            //     itemRIDER_RIDE_FEES_CON: storedRideFEESCON_Value,
            //     itemRIDER_RIDE_WAITING_CHARGES: storedRideWATTINGCHARGE_Value,
            //     itemRIDER_RIDE_DICOUNT: storedRideGETDISCOUNT_Value,
            //     itemRIDER_RIDE_TOTALAMOUNT: storedRideGETOTALAMOUNT_Value,
            // })
        } else {
            console.log("0", "ERROR");
            console.log("0", "ERROR");
        }
    }

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
                                    // onPress={onPressViewBooking}
                                    onPress={() => onPressViewBookingLast()}
                                    // onPress={() => Alert.alert("Booking Status")}
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