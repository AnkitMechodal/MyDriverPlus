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
import { API, ConstValue, ScreenText } from '../../utils';
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

    // const [images, setImages] = useState([
    //     "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fHww",
    //     "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fHww",
    //     "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fHww",
    // ]);


    const [images, setImages] = useState(

        [
            // Images.sliderIcon,
            // Images.sliderIcon,
            // Images.sliderIcon,
        ]
    );

    let SliderImage;



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


    // USER
    let secondPartOfAddress;
    let remainingAddress;
    let postalCode;

    //Status
    //RideStatus
    //LastRideId

    let StatusUser;
    let RideStatusUser;
    let LastRideIdIUser;
    let RideObjectIDUser;
    let RidetypeUser;
    let service_stypeUser;

    // let USER_DATE;

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

    let USER_DATE;


    const mapViewRef = useRef<any>(null);

    // CurrentAdd

    const [CurrentAdd, setCurrentAdd] = useState("");

    // useEffect(() => {
    //     // Perform some action when the component mounts

    //     axiosBannerPostRequest();

    // }, []);

    useEffect(() => {
        // Perform some action when the component mounts
        axiosBannerPostRequest();

        // Set an interval to execute axiosBannerPostRequest every 5 seconds
        const intervalId = setInterval(axiosBannerPostRequest, 5000);

        // Clean up function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


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
        // Set interval to refresh every 5 seconds
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

                    console.log("User-fetchData1---==>", user_latitude);
                    console.log("User-fetchData2---==>", user_longitude);

                    console.log("User-fetchData1---==>", user_latitude);
                    console.log("User-fetchData2---==>", user_longitude);

                    let newCoordinate = { latitude: user_latitude, longitude: user_longitude };
                    setMarkerCoordinate(newCoordinate);

                    // GET ADDRESS API Call
                    getCurrentLocationAddress(user_latitude, user_longitude);

                },
                error => {
                    console.log(`Error getting location: ${error.message}`);
                    console.log(`Error getting location: ${error.message}`);
                    console.log(`Error getting location: ${error.message}`);

                },
                { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
            );
        }

        fetchData();

        // // Set interval to refresh every 10 seconds
        // const intervalId = setInterval(fetchData, 5 * 1000);
        // // Cleanup function
        // return () => {
        //     // Clear the interval when the component unmounts
        //     clearInterval(intervalId);
        // };
    }, []);

    const { isDarkMode, toggleTheme } = useTheme();


    const getCurrentLocationAddress = async (user_latitude, user_longitude) => {

        console.log("HOME1----==>", user_latitude);
        console.log("HOME2----==>", user_longitude);

        try {

            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + user_latitude + ',' + user_longitude + '&key=' + 'AIzaSyDMZwBszNuk7X4MTvW4K3D8_zyBqAy0slE')
                .then((response) => response.json())
                .then((responseJson) => {

                    // TODO :
                    // GET ADDRESS IN 3 PART
                    const result = responseJson.results[0];
                    const formattedAddress = result.formatted_address;

                    secondPartOfAddress = formattedAddress.split(',')[1];
                    remainingAddress = formattedAddress.split(',').slice(1).join(',').trim();
                    postalCode = result.address_components.find(component =>
                        component.types.includes('postal_code')
                    );

                    console.log('GET ADDRESS 1-HOME', remainingAddress);
                    console.log('GET ADDRESS 2-HOME', secondPartOfAddress);
                    console.log('GET ADDRESS 3-HOME', postalCode.long_name);

                    // SET 2ND ADDRESS TO INPUT

                    if (remainingAddress !== null) {
                        setCurrentAdd(remainingAddress);
                    } else {
                        setCurrentAdd("Fecth Your Current Location");
                    }

                    // DATA INSERT INTO UPDATE API 
                    axiosUpdateLocationRequest(user_latitude, user_longitude, remainingAddress);

                })

        } catch (error) {
            console.error('Error in getCurrentLocationAddress:', error);
            throw error;
        }
    };

    // Loader

    const RoundedImage = ({ source, style }) => {
        return (
            <Image
                source={source}
                // style={[style, { borderRadius: 7 }]} // Adjust the borderRadius as needed
                style={[style]} // Adjust the borderRadius as needed
                defaultSource={Images.sliderIcon}
            />
        );
    };

    const axiosUpdateLocationRequest = async (user_latitude, user_longitude, remainingAddress) => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosUpdateLocationRequestGet(user_latitude, user_longitude, remainingAddress);
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosUpdateLocationRequestGet = async (user_latitude, user_longitude, remainingAddress) => {
        try {
            const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            if (storedLinkedId !== null) {
                const userId = JSON.parse(storedLinkedId);
                //const url = `https://rideshareandcourier.graphiglow.in/api/UserlocationsUpdate/updatelocations/${userId}`;
                const url = `${API.BASE_URL}/UserlocationsUpdate/updatelocations/${userId}`;

                console.log("current_latitude", user_latitude);
                console.log("current_longitude", user_longitude);
                console.log("addresh", remainingAddress);

                await axios.get(url, {

                    params: {
                        current_latitude: user_latitude,
                        current_longitude: user_longitude,
                        addresh: remainingAddress
                    },

                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 200
                            && response?.data?.message === 'Locations updated successfully') {

                            // Toast.show('Locations Inserted!', Toast.SHORT);

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

    const axiosBannerPostRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosBannerPostRequestList();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }

    }

    const axiosBannerPostRequestList = async () => {
        try {
            // const url = 'https://rideshareandcourier.graphiglow.in/api/banner/banner';
            const url = `${API.BASE_URL}/banner/banner`;

            const response = await axios.post(url, null, {
            });

            if (response.status === 200 && response?.data?.message === "Banner successfully") {
                setImages(response.data.data.map(item => item.image));

            } else {
                setImages(images); // Assuming you want to clear images in case of other responses
            }
        } catch (error) {
            setImages(images); // Assuming you want to clear images in case of errors
        }
    }


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
                //const url = `https://rideshareandcourier.graphiglow.in/api/HomeScreenStatus/checkRide/${userId}`;
                const url = `${API.BASE_URL}/HomeScreenStatus/checkRide/${userId}`;

                console.log("urlurlurlurl-1", url);
                console.log("urlurlurlurl-2", url);
                console.log("urlurlurlurl-3", url);
                console.log("urlurlurlurl-4", url);
                console.log("urlurlurlurl-5", url);

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

                            console.log("LastRideIdIUser===>", RideObjectIDUser);
                            console.log("LastRideIdIUser===>", RideObjectIDUser);
                            console.log("LastRideIdIUser===>", RideObjectIDUser);
                            console.log("LastRideIdIUser===>", RideObjectIDUser);

                            console.log("RideObjectIDUser===>", RidetypeUser);
                            console.log("RidetypeUser===>", RideObjectIDUser);

                            // Store -> RideObjectIDUser
                            StoreLastRideIdUser(LastRideIdIUser);
                            StoreRideObjectIDUser(RideObjectIDUser);

                            //   if (StatusUser == "Arrived") {

                            if (StatusUser == "Accept") {
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

    const StoreLastRideIdUser = async (LastRideIdIUser: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_id_user', JSON.stringify(LastRideIdIUser));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_id_user:', error);
        }
    }

    const StoreRideObjectIDUser = async (RideObjectIDUser: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_id_object', JSON.stringify(RideObjectIDUser));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_id_object:', error);
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


    const clearSpecificData = async () => {
        try {
            // Clearing specific data with the key 'parsedData'
            await AsyncStorage.removeItem('mark1_pick');
            await AsyncStorage.removeItem('mark2_drop');
            await AsyncStorage.removeItem('mark3_pick');
            await AsyncStorage.removeItem('mark4_drop');
            console.log('Specific data cleared successfully.');
        } catch (error) {
            console.error('Error clearing specific data:', error);
        }
    }

    const axiosPostNavigationStatusRequest = async (RideObjectIDUser: any) => {

        // const storedLinkedId = await AsyncStorage.getItem('store_ride_id');
        // if (storedLinkedId !== null) {

        // const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';
        const url = `${API.BASE_URL}/rideDetail/rideDetail`;

        // Prepare data in JSON format
        const data = {
            id: RideObjectIDUser
            // id: "65b9da9ffb803f0c5d9d4470" // test!
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

                    console.log("USER_RIDEID", USER_RIDEID);
                    console.log("USER_RIDEID", USER_RIDEID);

                    USER_RIDEDURATION = response?.data?.matchingVehicle?.time;
                    USER_RIDEDISTANCE = response?.data?.matchingVehicle?.distance;

                    USER_PICK_UP_LOCATION = response?.data?.matchingVehicle?.pickup_locations;
                    USER_DROP_UP_LOCATION = response?.data?.matchingVehicle?.drop_locations;
                    USER_RIDE_CHARGE = response?.data?.matchingVehicle?.RideCharge;
                    USER_CON_FEES = response?.data?.matchingVehicle?.BookingFeesConvenience;
                    USER_WATTING_CHARGES = response?.data?.matchingVehicle?.Waiting_Charge;
                    USER_DISCOUNT = response?.data?.matchingVehicle?.Discount;
                    USER_TOTAL_AMOUNT = response?.data?.matchingVehicle?.TotalAmount;

                    USER_DATE = response?.data?.matchingVehicle?.date;

                    console.log("USER_DATE", USER_DATE);
                    console.log("USER_DATE", USER_DATE);
                    console.log("USER_DATE", USER_DATE);
                    console.log("USER_DATE", USER_DATE);

                    // date

                    // USER_PICK_UP_LOCATION
                    StoreRidePickUp(USER_PICK_UP_LOCATION);
                    StoreRideDropUp(USER_DROP_UP_LOCATION);
                    StoreRideCharge(USER_RIDE_CHARGE);
                    StoreRideFees(USER_CON_FEES);
                    StoreRideWCharge(USER_WATTING_CHARGES);
                    StoreRideDiscount(USER_DISCOUNT);
                    StoreRideTotalAmount(USER_TOTAL_AMOUNT);

                    StoreRideDuration(USER_RIDEDURATION);
                    StoreRideDistnace(USER_RIDEDISTANCE);
                    StoreRideUserDate(USER_DATE);


                    // Toast.show('Driver Details Retrieved Successfully!', Toast.SHORT);

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

    const StoreRidePickUp = async (USER_PICK_UP_LOCATION: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_id_pick', JSON.stringify(USER_PICK_UP_LOCATION));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_id_pick:', error);
        }
    }

    const StoreRideDropUp = async (USER_DROP_UP_LOCATION: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_id_drop', JSON.stringify(USER_DROP_UP_LOCATION));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_id_drop:', error);
        }
    }

    const StoreRideCharge = async (USER_RIDE_CHARGE: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_id_charge', JSON.stringify(USER_RIDE_CHARGE));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_id_charge:', error);
        }
    }

    const StoreRideFees = async (USER_CON_FEES: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_id_fees', JSON.stringify(USER_CON_FEES));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_id_fees:', error);
        }
    }

    const StoreRideWCharge = async (USER_WATTING_CHARGES: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_id_wcharge', JSON.stringify(USER_WATTING_CHARGES));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_id_wcharge:', error);
        }
    }

    const StoreRideDiscount = async (USER_DISCOUNT: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_id_dicount', JSON.stringify(USER_DISCOUNT));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_id_dicount:', error);
        }
    }

    const StoreRideTotalAmount = async (USER_TOTAL_AMOUNT: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_id_total_amount', JSON.stringify(USER_TOTAL_AMOUNT));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_id_total_amount:', error);
        }
    }

    const StoreRideDuration = async (USER_RIDEDURATION: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_id_duration', JSON.stringify(USER_RIDEDURATION));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_id_total_amount:', error);
        }
    }

    const StoreRideDistnace = async (USER_RIDEDISTANCE: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_id_distance', JSON.stringify(USER_RIDEDISTANCE));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_id_distance:', error);
        }
    }

    const StoreRideUserDate = async (USER_DATEA: any) => {
        try {
            await AsyncStorage.setItem('store_get_last_date', JSON.stringify(USER_DATEA));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_last_date:', error);
        }
    }


    const onPressViewBookingLast = async () => {

        if (RidetypeUser = "Taxi Booking") {
            if (service_stypeUser = "Bidding Ride") {


                let LastRideIdIUser_ = await AsyncStorage.getItem('store_get_last_id_user');

                let RideObjectIDUser_ = await AsyncStorage.getItem('store_get_last_id_object');
                let USER_PICK_UP_LOCATION_ = await AsyncStorage.getItem('store_get_last_id_pick');
                let USER_DROP_UP_LOCATION_ = await AsyncStorage.getItem('store_get_last_id_drop');
                let USER_RIDE_CHARGE_ = await AsyncStorage.getItem('store_get_last_id_charge');
                let USER_CON_FEES_ = await AsyncStorage.getItem('store_get_last_id_fees');
                let USER_WATTING_CHARGES_ = await AsyncStorage.getItem('store_get_last_id_wcharge');
                let USER_DISCOUNT_ = await AsyncStorage.getItem('store_get_last_id_dicount');
                let USER_TOTAL_AMOUNT_ = await AsyncStorage.getItem('store_get_last_id_total_amount');

                let USER_DISTANCE_ = await AsyncStorage.getItem('store_get_last_id_distance');
                let USER_DURATION_ = await AsyncStorage.getItem('store_get_last_id_duration');

                let USER_DATE_ = await AsyncStorage.getItem('store_get_last_date');

                console.log(`
                    Last Ride ID: ${LastRideIdIUser_}
                    Ride Object ID: ${RideObjectIDUser_}
                    Pick-Up Location: ${USER_PICK_UP_LOCATION_}
                    Drop-Up Location: ${USER_DROP_UP_LOCATION_}
                    Ride Charge: ${USER_RIDE_CHARGE_}
                    Convenience Fees: ${USER_CON_FEES_}
                    Waiting Charges: ${USER_WATTING_CHARGES_}
                    Discount: ${USER_DISCOUNT_}
                    USER_DISTANCE_: ${USER_DISTANCE_}
                    USER_DURATION_: ${USER_DURATION_}
                    USER_DATE_: ${USER_DATE_}
                `);


                console.log("1", "Taxi Booking")
                console.log("3", "Bidding Ride")
                console.log("1", "Taxi Booking")
                console.log("3", "Bidding Ride")

                if (
                    LastRideIdIUser_ != null && LastRideIdIUser_ !== '' &&
                    RideObjectIDUser_ != null && RideObjectIDUser_ !== '' &&
                    USER_PICK_UP_LOCATION_ != null && USER_PICK_UP_LOCATION_ !== '' &&
                    USER_DROP_UP_LOCATION_ != null && USER_DROP_UP_LOCATION_ !== '' &&
                    USER_RIDE_CHARGE_ != null && USER_RIDE_CHARGE_ !== '' &&
                    USER_CON_FEES_ != null && USER_CON_FEES_ !== '' &&
                    USER_WATTING_CHARGES_ != null && USER_WATTING_CHARGES_ !== '' &&
                    USER_DISCOUNT_ != null && USER_DISCOUNT_ !== '' &&
                    USER_TOTAL_AMOUNT_ != null && USER_TOTAL_AMOUNT_ !== '' &&
                    USER_DISTANCE_ != null && USER_DISTANCE_ !== '' &&
                    USER_DURATION_ != null && USER_DURATION_ !== '' &&
                    USER_DATE_ != null && USER_DATE_ !== ''
                ) {


                    console.log("TRUE", "TRUE");
                    console.log("TRUE", "TRUE");
                    console.log("TRUE", "TRUE");


                    navigation.navigate('BookingBiddingRequestUser', {
                        itemRIDEID_SENT: LastRideIdIUser_,
                        itemRIDER_ID_SENT: RideObjectIDUser,
                        itemRIDER_DISTANCE_SENT: USER_DISTANCE_, //
                        itemRIDER_DURATUION_SENT: USER_DURATION_, //
                        itemRIDER_PICKSTATION: USER_PICK_UP_LOCATION_,
                        itemRIDER_DROPSTATION: USER_DROP_UP_LOCATION_,
                        itemRIDER_RIDE_CHARGE: USER_RIDE_CHARGE_,
                        itemRIDER_RIDE_FEES_CON: USER_CON_FEES_,
                        itemRIDER_RIDE_WAITING_CHARGES: USER_WATTING_CHARGES_,
                        itemRIDER_RIDE_DICOUNT: USER_DISCOUNT_,
                        itemRIDER_RIDE_TOTALAMOUNT: USER_TOTAL_AMOUNT_,
                        itemRIDER_RIDE_DATE: USER_DATE_
                    })

                } else {
                    console.log("ERROR", "ERROR");
                    console.log("ERROR", "ERROR");
                    console.log("ERROR", "ERROR");
                }


            } else {
                console.log("1", "Taxi Booking")
                console.log("1", "Taxi Booking")

                let LastRideIdIUser_ = await AsyncStorage.getItem('store_get_last_id_user');

                let RideObjectIDUser_ = await AsyncStorage.getItem('store_get_last_id_object');
                let USER_PICK_UP_LOCATION_ = await AsyncStorage.getItem('store_get_last_id_pick');
                let USER_DROP_UP_LOCATION_ = await AsyncStorage.getItem('store_get_last_id_drop');
                let USER_RIDE_CHARGE_ = await AsyncStorage.getItem('store_get_last_id_charge');
                let USER_CON_FEES_ = await AsyncStorage.getItem('store_get_last_id_fees');
                let USER_WATTING_CHARGES_ = await AsyncStorage.getItem('store_get_last_id_wcharge');
                let USER_DISCOUNT_ = await AsyncStorage.getItem('store_get_last_id_dicount');
                let USER_TOTAL_AMOUNT_ = await AsyncStorage.getItem('store_get_last_id_total_amount');

                let USER_DISTANCE_ = await AsyncStorage.getItem('store_get_last_id_distance');
                let USER_DURATION_ = await AsyncStorage.getItem('store_get_last_id_duration');


                if (
                    LastRideIdIUser_ != null && LastRideIdIUser_ !== '' &&
                    RideObjectIDUser_ != null && RideObjectIDUser_ !== '' &&
                    USER_PICK_UP_LOCATION_ != null && USER_PICK_UP_LOCATION_ !== '' &&
                    USER_DROP_UP_LOCATION_ != null && USER_DROP_UP_LOCATION_ !== '' &&
                    USER_RIDE_CHARGE_ != null && USER_RIDE_CHARGE_ !== '' &&
                    USER_CON_FEES_ != null && USER_CON_FEES_ !== '' &&
                    USER_WATTING_CHARGES_ != null && USER_WATTING_CHARGES_ !== '' &&
                    USER_DISCOUNT_ != null && USER_DISCOUNT_ !== '' &&
                    USER_TOTAL_AMOUNT_ != null && USER_TOTAL_AMOUNT_ !== '' &&
                    USER_DISTANCE_ != null && USER_DISTANCE_ !== '' &&
                    USER_DURATION_ != null && USER_DURATION_ !== ''
                ) {
                    navigation.navigate('BookingRequestUser', {
                        itemRIDEID_SENT: LastRideIdIUser_,
                        itemRIDER_ID_SENT: RideObjectIDUser,
                        itemRIDER_DISTANCE_SENT: USER_DISTANCE_, //
                        itemRIDER_DURATUION_SENT: USER_DURATION_, //
                        itemRIDER_PICKSTATION: USER_PICK_UP_LOCATION_,
                        itemRIDER_DROPSTATION: USER_DROP_UP_LOCATION_,
                        itemRIDER_RIDE_CHARGE: USER_RIDE_CHARGE_,
                        itemRIDER_RIDE_FEES_CON: USER_CON_FEES_,
                        itemRIDER_RIDE_WAITING_CHARGES: USER_WATTING_CHARGES_,
                        itemRIDER_RIDE_DICOUNT: USER_DISCOUNT_,
                        itemRIDER_RIDE_TOTALAMOUNT: USER_TOTAL_AMOUNT_,
                    })

                } else {
                    console.log("ERROR", "ERROR");
                    console.log("ERROR", "ERROR");
                    console.log("ERROR", "ERROR");
                }

            }
        } else if (RidetypeUser = "Courier Delivery") {
            console.log("2", "Courier Delivery");
            console.log("2", "Courier Delivery");

            let LastRideIdIUser_ = await AsyncStorage.getItem('store_get_last_id_user');

            let RideObjectIDUser_ = await AsyncStorage.getItem('store_get_last_id_object');
            let USER_PICK_UP_LOCATION_ = await AsyncStorage.getItem('store_get_last_id_pick');
            let USER_DROP_UP_LOCATION_ = await AsyncStorage.getItem('store_get_last_id_drop');
            let USER_RIDE_CHARGE_ = await AsyncStorage.getItem('store_get_last_id_charge');
            let USER_CON_FEES_ = await AsyncStorage.getItem('store_get_last_id_fees');
            let USER_WATTING_CHARGES_ = await AsyncStorage.getItem('store_get_last_id_wcharge');
            let USER_DISCOUNT_ = await AsyncStorage.getItem('store_get_last_id_dicount');
            let USER_TOTAL_AMOUNT_ = await AsyncStorage.getItem('store_get_last_id_total_amount');

            let USER_DISTANCE_ = await AsyncStorage.getItem('store_get_last_id_distance');
            let USER_DURATION_ = await AsyncStorage.getItem('store_get_last_id_duration');


            if (
                LastRideIdIUser_ != null && LastRideIdIUser_ !== '' &&
                RideObjectIDUser_ != null && RideObjectIDUser_ !== '' &&
                USER_PICK_UP_LOCATION_ != null && USER_PICK_UP_LOCATION_ !== '' &&
                USER_DROP_UP_LOCATION_ != null && USER_DROP_UP_LOCATION_ !== '' &&
                USER_RIDE_CHARGE_ != null && USER_RIDE_CHARGE_ !== '' &&
                USER_CON_FEES_ != null && USER_CON_FEES_ !== '' &&
                USER_WATTING_CHARGES_ != null && USER_WATTING_CHARGES_ !== '' &&
                USER_DISCOUNT_ != null && USER_DISCOUNT_ !== '' &&
                USER_TOTAL_AMOUNT_ != null && USER_TOTAL_AMOUNT_ !== '' &&
                USER_DISTANCE_ != null && USER_DISTANCE_ !== '' &&
                USER_DURATION_ != null && USER_DURATION_ !== ''
            ) {
                navigation.navigate('CourierRequestUser', {
                    itemRIDEID_SENT: LastRideIdIUser_,
                    itemRIDER_ID_SENT: RideObjectIDUser,
                    itemRIDER_DISTANCE_SENT: USER_DISTANCE_, //
                    itemRIDER_DURATUION_SENT: USER_DURATION_, //
                    itemRIDER_PICKSTATION: USER_PICK_UP_LOCATION_,
                    itemRIDER_DROPSTATION: USER_DROP_UP_LOCATION_,
                    itemRIDER_RIDE_CHARGE: USER_RIDE_CHARGE_,
                    itemRIDER_RIDE_FEES_CON: USER_CON_FEES_,
                    itemRIDER_RIDE_WAITING_CHARGES: USER_WATTING_CHARGES_,
                    itemRIDER_RIDE_DICOUNT: USER_DISCOUNT_,
                    itemRIDER_RIDE_TOTALAMOUNT: USER_TOTAL_AMOUNT_,
                })
            } else {
                console.log("ERROR", "ERROR");
                console.log("ERROR", "ERROR");
                console.log("ERROR", "ERROR");
            }

        } else {
            console.log("0", "ERROR");
            console.log("0", "ERROR");
        }
    }


    const onPressGetCurrentLocation = () => {
        // Get Current Lat And Long
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;

                user_latitude = position.coords.latitude;
                user_longitude = position.coords.longitude;

                console.log("User-fetchData1---==>", user_latitude);
                console.log("User-fetchData2---==>", user_longitude);

                console.log("User-fetchData1---==>", user_latitude);
                console.log("User-fetchData2---==>", user_longitude);

                let newCoordinate = { latitude: user_latitude, longitude: user_longitude };
                setMarkerCoordinate(newCoordinate);

                // GET ADDRESS API Call
                getCurrentLocationAddress(user_latitude, user_longitude);

            },
            error => {
                console.log(`Error getting location: ${error.message}`);
                console.log(`Error getting location: ${error.message}`);
                console.log(`Error getting location: ${error.message}`);

            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
        );
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

                    <TouchableOpacity onPress={onPressGetCurrentLocation}>

                        <TextInputComponent
                            selectionColor={Colors.white}
                            isVisibleDropDown={false}
                            marginVertical={hp(1)}
                            width={wp(50)}
                            height={hp(7)}
                            marginTop={hp(2)}
                            isUserHide={false}
                            textfontSize={ConstValue.value12}
                            textfontFamily={Fonts.PoppinsRegular}
                            textlineHeight={ConstValue.value0}
                            ref={ref}
                            placeholder={"Fetch Your Current Location"}
                            editable={false}
                            multiline={false}
                            secureTextEntry={false}
                            isPadding={true}
                            keyboardType='default'
                            textAlign='left'
                            value={CurrentAdd}
                            numberOfLines={1}
                            maxLength={28}
                            color={Colors.white}
                            backgroundColor={'transparent'}
                            borderRadius={wp(2)}
                            onChangeText={handleUserLocation}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                        />

                    </TouchableOpacity>



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
                                    onPress={() =>
                                        onPressViewBookingLast()
                                    }
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
                                        onPress={() => {
                                            navigation.navigate('BookingScreen', {
                                                itemType: 'Taxi Booking'
                                            });
                                            clearSpecificData();
                                        }}>

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

                                    onPress={() => {
                                        navigation.navigate('CourierBooking', {
                                            itemType: 'Courier Delivery'
                                        });
                                        clearSpecificData();
                                    }}>

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
                                    sliderBoxHeight={wp(35)}
                                    parentWidth={wp(90)}
                                    radius={wp(2)}
                                    autoPlay={true}
                                    dotColor={Colors.blue}
                                    inactiveDotColor={Colors.white}
                                    dotStyle={Styles.dotStyle}
                                    resizeMethod={'resize'}
                                    resizeMode={'cover'}
                                    autoplayInterval={1000}
                                    paginationBoxStyle={{ bottom: -30, borderRadius: 7 }}
                                // ImageComponent={RoundedImage} // For Loader
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