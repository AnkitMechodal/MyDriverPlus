import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import TextInputComponent from '../../components/TextInput/index';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from '../../utils/commonfunction';
import { ConstValue, ScreenText } from '../../utils/index';
import ConfirmCourierListComponent from '../ConfirmCourierListComponent';
import Styles from './style';

type Props = {
    navigation: any
}

const CourierConfirmScreen = ({ route, navigation }) => {

    const [markerCoordinates, setMarkerCoordinates] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });

    const mapViewRef = useRef<any>(null);


    const dummyData = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
        'Item 8',
        'Item 9',
        'Item 10',
        'Item 11',
        'Item 12',
        'Item 13',
        'Item 14',
        'Item 15',
        'Item 16',
        'Item 17',
        'Item 18',
        'Item 19',
        'Item 20',
        // Add more items as needed
    ];

    const [radius, setRadius] = useState(1200); // Define the radius in meters

    const [isPickVisible, setPickVisible] = useState(false);

    const refPickUp = useRef<any>(null);

    const [isBorder, setIsBorder] = useState(false);

    const [isBorder1, setIsBorder1] = useState(false);
    const [isBorder2, setIsBorder2] = useState(false);

    const [isBordeWidth, setIsBorderWidth] = useState(false);

    const [isBordeWidth1, setIsBorderWidth1] = useState(false);
    const [isBordeWidth2, setIsBorderWidth2] = useState(false);

    const [isCar, setIsCar] = useState(false);
    const [isAuto, setIsAuto] = useState(false);
    const [isBike, setIsBike] = useState(false);


    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const renderItem = ({ item }) => {
        return (
            <View style={{ padding: 10 }}>
                <Text style={{ color: 'white', fontSize: 30 }}>{item}</Text>
            </View>
        );
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const closeModal1 = () => {
        setModalVisible1(false);
    };

    const closeModal2 = () => {
        setModalVisible2(false);
    };


    const [markerCoordinates1, setMarkerCoordinates1] = useState<any>({
        latitude: 37.78825,
        longitude: -122.4324,
    });

    const [markerCoordinates2, setMarkerCoordinates2] = useState<any>({
        latitude: 37.80825, // Increased latitude for more distance
        longitude: -122.4524, // Increased longitude for more distance
    });


    const [passDrop, setPassDrop] = useState('');

    const refDropUp = useRef<any>(null);
    const [pass, setPass] = useState('');


    const [vehicles, setVehicles] = useState<any>([]);
    const [isClickItems, setClickItems] = useState(false);


    const handleAccountPasswordDrop = (userpass_: any) => {
        setPassDrop(userpass_);
    }



    const handleAccountPassword = (userpass: any) => {
        setPass(userpass);
    }

    const handleMapPress = (event) => {
        // Update the marker's coordinates when the map is pressed
        setMarkerCoordinates(event.nativeEvent.coordinate);
    };

    const handleMarkerDrag = (event) => {
        // Handle marker drag event, e.g., update coordinates
        setMarkerCoordinates(event.nativeEvent.coordinate);
    };

    const handleMarkerDragEnd = (event) => {
        // Handle marker drag end event, e.g., save new coordinates to state or server
        setMarkerCoordinates(event.nativeEvent.coordinate);
    };

    const handleMarkerPress = () => {
        setPickVisible(true)
    };

    const handleItemClick1 = () => {
        setIsBorder1(false)
        setIsBorderWidth1(false)

        setIsBorder2(false)
        setIsBorderWidth2(false)

        setIsBorder(true)
        setIsBorderWidth(true)
    }

    const handleItemClick2 = () => {

        setIsBorder(false)
        setIsBorderWidth(false)

        setIsBorder2(false)
        setIsBorderWidth2(false)

        setIsBorder1(true)
        setIsBorderWidth1(true)

    }

    const handleItemClick3 = () => {
        setIsBorder(false)
        setIsBorderWidth(false)

        setIsBorder1(false)
        setIsBorderWidth1(false)

        setIsBorder2(true)
        setIsBorderWidth2(true)

    }

    let UserSelctedVehicalName;
    var UserSelctedVehicalPrice;
    var beforeHyphenValue;


    // Working !

    // useEffect(() => {
    //     // This function will run when the component mounts
    //     requestRideNowData();
    //     axiosPostSetVehicalDataBooking();
    // }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (mapViewRef.current) {
                const coordinates = [markerCoordinates1, markerCoordinates2];

                mapViewRef.current?.fitToCoordinates(coordinates, {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    animated: true,
                });
            }

            // Get Lat & Long :
            //2 :
            const user_drop_lat = await AsyncStorage.getItem('user_drop_lat');
            const user_drop_long = await AsyncStorage.getItem('user_drop_long');

            //1:
            const user_pick_lat = await AsyncStorage.getItem('user_pick_lat');
            const user_pick_long = await AsyncStorage.getItem('user_pick_long');

            console.log("DROP----->drop", user_drop_lat);
            console.log("DROP----->drop", user_drop_long);

            console.log("PICK----->pick", user_pick_lat);
            console.log("PICK----->pick", user_pick_long);

            // Check for null or undefined values
            if (user_pick_lat !== null && user_pick_long !== null) {
                // Set Lat Long As Marker
                setMarkerCoordinates1({ latitude: parseFloat(user_pick_lat), longitude: parseFloat(user_pick_long) });
            }

            if (user_drop_lat !== null && user_drop_long !== null) {
                // Set Lat Long As Marker
                setMarkerCoordinates2({ latitude: parseFloat(user_drop_lat), longitude: parseFloat(user_drop_long) });
            }

            // This function will run every 5 seconds
            requestRideNowData();
            axiosPostSetVehicalDataBooking();

        }, 5000); // 5000 milliseconds = 5 seconds

        // Clear the interval on component unmount to prevent memory leaks
        return () => clearInterval(interval);
    }, [markerCoordinates1, markerCoordinates2]);



    let RideIdGet;
    let distanceGet;
    let timeGet;

    let type;

    let _idRider;
    let RidePickStation;
    let RideDropStation;

    let ConfirmRideCharge;
    let ConfirmBookingFeesConvenience;
    let ConfirmWaiting_Charge;
    let ConfirmDiscount;
    let ConfirmTotalAmount;


    const handlePress = ({ item }) => {

        // quick
        setClickItems(true);
        // quick

        console.log("OnPressItems==>", JSON.stringify(item, null, 2));

        UserSelctedVehicalName = item?.vehicle_name;
        // UserSelctedVehicalPrice = item?.charge;

        UserSelctedVehicalPrice = item?.charge.trim();
        beforeHyphenValue = Number(UserSelctedVehicalPrice.match(/^\d+/));
        console.log("User Selected Vehicle Price:", beforeHyphenValue);
        // Store As Local Price
        storedSelectedPrice(beforeHyphenValue);
        // parseFloat(UserSelctedVehicalPrice.trim())

    }

    const storedSelectedPrice = async (storelastprice: any) => {
        try {
            await AsyncStorage.setItem('store_last_price', JSON.stringify(storelastprice));
            console.log('store_last_price===>', JSON.parse(storelastprice));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_last_price :', error);
        }
    }

    const axiosPostSetVehicalDataBooking = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostSetDataBooking();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostSetDataBooking = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/fetchVehical/Vehical';

        // Prepare data in JSON format
        const data = {
            type: "Courier"
        };

        console.log("BookingData==>", data);

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    &&
                    response?.data?.message === 'Vehicles Are') {
                    // Handle API response here
                    // Vehicles Are

                    console.log("BookingDataResponse==>",
                        JSON.stringify(response?.data?.matchingVehicles, null, 2));

                    setVehicles(response.data.matchingVehicles);

                    // Toast.show('Successfully Retrieved The Vehicles Booking List!', Toast.SHORT);

                } else {
                    Toast.show('Enabel To Request Booking List!', Toast.SHORT);
                    //  Welcome! Signed in successfully.
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Enabel To Request Booking List!', Toast.SHORT);
            });
    };

    const requestRideNowData = () => {
        console.log("itemTypeConfrim_CO", route?.params?.itemTypeConfrim);
        console.log("itemServiceConfrim_CO", route?.params?.itemServiceConfrim);
        console.log("itemPickLocationConfrim_Co", route?.params?.itemPickLocationConfrim);
        console.log("itemDropLocationConfrim_CO", route?.params?.itemDropLocationConfrim);
        console.log("itemPaymentTypeConfrim_CO", route?.params?.itemPaymentTypeConfrim);
        console.log("itemLocationDistanceConfrim_CO", route?.params?.itemLocationDistanceConfrim);
        console.log("itemLocationDurationConfrim_CO", route?.params?.itemLocationDurationConfrim);
        console.log("itemLoyalPointsConfrim_CO", route?.params?.itemLoyalPointsConfrim);
        console.log("itemLocationPinCodeConfrim_CO", route?.params?.itemLocationPinCodeConfrim);
        console.log("itemLocationCurrentDateConfrim_CO", route?.params?.itemLocationCurrentDateConfrim);
        console.log("itemGetCurrentLatitudeConfrim_CO", route?.params?.itemGetCurrentLatitudeConfrim);
        console.log("itemGetCurrentLongitudeConfrim_CO", route?.params?.itemGetCurrentLongitudeConfrim);

        // Added
        console.log("itemSelectNoOfSeatsConfrim_CO", route?.params?.itemSelectNoOfSeatsConfrim);

        //Added 
        console.log("itemEnterNoOfHourConfrim_CO", route?.params?.itemEnterNoOfHourConfrim);
        console.log("itemEnterDistanceConfrim_CO", route?.params?.itemEnterDistanceConfrim);

        //Added 
        console.log("itemScheduleDateConfrim_CO==>", route?.params?.itemScheduleDateConfrim);
        console.log("itemScheduleTimeConfrim_CO==>", route?.params?.itemScheduleTimeConfrim);

    }


    const onPressCourierRequestConfirm = () => {

        // Check Service Type & Request Sent!
        if (route?.params?.itemServiceConfrim === "Book Now") {
            console.log("a===>", "Book Now");
            if (isClickItems === true &&
                route?.params?.itemPickLocationConfrim !== "Select Pickup Location"
                && route?.params?.itemPickLocationConfrim !== "Select Drop off Location"
            ) {
                console.log("true===>", "Book Now");
                axiosUserBookNowConfirmRequest(); //01
            } else {
                console.log("false===>", "Book Now");
                Toast.show("Oops! There Was An Error Submitting Your Booking!", Toast.SHORT);
            }
        } else if (route?.params?.itemServiceConfrim === "Schedule Booking") {
            console.log("b===>", "Schedule Booking");
            if (isClickItems === true &&
                route?.params?.itemPickLocationConfrim !== "Select Pickup Location"
                && route?.params?.itemPickLocationConfrim !== "Select Drop off Location"
            ) {
                console.log("true===>", "Schedule Booking");
                axiosUserScheduleBookingConfirmRequest();//02
            } else {
                console.log("false===>", "Schedule Booking");
                Toast.show("Oops! There Was An Error Submitting Your Booking!", Toast.SHORT);
            }

        } else {
            console.log("error===>", "no");
        }
    }


    const axiosUserScheduleBookingConfirmRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosScheduleBookingConfirmRequestToStatus();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }


    const StoreRIDEID = async (RideIdGet: any) => {
        try {
            await AsyncStorage.setItem('store_get_id', JSON.stringify(RideIdGet));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_id:', error);
        }
    }

    const StoreRIDETYPE = async (type: any) => {
        try {
            await AsyncStorage.setItem('store_get_type', JSON.stringify(type));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_type:', error);
        }
    }

    const axiosScheduleBookingConfirmRequestToStatus = async () => {
        try {
            const get_last_price = await AsyncStorage.getItem('store_last_price');

            const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            if (storedLinkedId !== null && get_last_price !== null) {

                console.log("get_last_pricerrrrrrrr===>", JSON.parse(get_last_price));

                const url = 'https://rideshareandcourier.graphiglow.in/api/booking/booking';

                // Prepare data in JSON format
                const data = {
                    UserID: JSON.parse(storedLinkedId),   // User ID TO Whice user Book Services
                    type: route?.params?.itemTypeConfrim,      // Courier Delivery And Taxi Booking
                    service_stype: route?.params?.itemServiceConfrim,   // Schedule booking And Book Now ,   Ride Now , Pool Ride , Hourly Ride , Bidding Ride
                    pickup_locations: route?.params?.itemPickLocationConfrim,
                    drop_locations: route?.params?.itemDropLocationConfrim,
                    vehical: UserSelctedVehicalName,
                    Price: JSON.parse(get_last_price), // UserSelctedVehicalPrice // ERROR " " //  "$" + price
                    // No_of_Seats: route?.params?.itemSelectNoOfSeatsConfrim,               // When Pool Ride used
                    //Price: "$".concat(JSON.parse(get_last_price)), // UserSelctedVehicalPrice // ERROR " " //  "$" + price
                    payment_type: route?.params?.itemPaymentTypeConfrim,
                    Waiting_Charge: 0,
                    Cancelled_Trip_Payment: 25,
                    Platform_charges: 10,
                    // distance: route?.params?.itemLocationDistanceConfrim + "",      // When Hourly Ride Functions used
                    // time: route?.params?.itemLocationDurationConfrim,      // When Hourly Ride Functions used   

                    schedule_date: route?.params?.itemScheduleDateConfrim,      // When schedule Functions used
                    schedule_time: route?.params?.itemScheduleTimeConfrim,      // When schedule Functions used

                    loyalty_points: route?.params?.itemLoyalPointsConfrim,            // When loyalty Point used
                    pin_code: route?.params?.itemLocationPinCodeConfrim,
                    date: route?.params?.itemLocationCurrentDateConfrim,                // User Current Date
                    current_latitude: route?.params?.itemGetCurrentLatitudeConfrim,     // User Current Locations
                    current_longitude: route?.params?.itemGetCurrentLongitudeConfrim,    // User Current Locations
                    DriverID: "65b265d1e96ba17261218f34",           // When Any Doctor Accept Booking   // How to Get
                    status: "Accept"
                };

                console.log("All_CONFIRM_SCHEDULE==>", JSON.stringify(data, null, 2));

                await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 201
                            && response?.data?.message === 'Booking Added Successfully') {

                            // TODO :
                            RideIdGet = response?.data?.data?.RideId;
                            console.log("RideIdGet===>", RideIdGet);

                            type = response?.data?.data?.type;
                            console.log("RideType===>", RideIdGet);

                            StoreRIDEID(RideIdGet);
                            StoreRIDETYPE(type);
                            // TODO :

                            distanceGet = route?.params?.itemLocationDistanceConfrim;
                            console.log("DIStanceGet===>", distanceGet);

                            timeGet = route?.params?.itemLocationDurationConfrim;
                            console.log("TIMeGet===>", timeGet);

                            // _id - Rider Get
                            _idRider = response?.data?.data?._id;
                            console.log("_idRider====>", _idRider);

                            // Added 
                            RidePickStation = route?.params?.itemPickLocationConfrim;
                            console.log("PickStation====>", RidePickStation);

                            RideDropStation = route?.params?.itemDropLocationConfrim;
                            console.log("DropStation====>", RideDropStation);

                            ConfirmRideCharge = response?.data?.data?.RideCharge;
                            ConfirmBookingFeesConvenience = response?.data?.data?.BookingFeesConvenience;
                            ConfirmWaiting_Charge = response?.data?.data?.Waiting_Charge;
                            ConfirmDiscount = response?.data?.data?.Discount;
                            ConfirmTotalAmount = response?.data?.data?.TotalAmount;

                            console.log("PAY1====>", ConfirmRideCharge);
                            console.log("PAY2====>", ConfirmBookingFeesConvenience);
                            console.log("PAY3====>", ConfirmWaiting_Charge);
                            console.log("PAY4====>", ConfirmDiscount);
                            console.log("PAY5====>", ConfirmTotalAmount);


                            // TODO : REAMING STORE AS LOCAL
                            StoreRIDE_ID(_idRider);

                            StoreRIDEDISTANCE(distanceGet);
                            StoreRIDEDURATION(timeGet);

                            StoreRIDEPICK(RidePickStation);
                            StoreRIDEDROP(RideDropStation);

                            StoreRIDECHARGE(ConfirmRideCharge);
                            StoreRIDECON(ConfirmBookingFeesConvenience);

                            StoreRIDEWAITCHARGE(ConfirmWaiting_Charge);

                            StoreRIDEDICOUNT(ConfirmDiscount);
                            StoreRIDETOTALAMOUNT(ConfirmTotalAmount);
                            // TODO : REAMING STORE AS LOCAL


                            navigation.navigate('CourierStatus', {
                                itemRIDEID: RideIdGet,
                                itemRider_ID: _idRider,
                                itemRiderDuration: distanceGet,
                                itemRiderDistance: timeGet,

                                itemRidePickStation: RidePickStation,
                                itemRideDropStation: RideDropStation,

                                itemPaymentRideCharge: ConfirmRideCharge,
                                itemPaymentFeesConvenience: ConfirmBookingFeesConvenience,
                                itemPaymentWaitingCharge: ConfirmWaiting_Charge,
                                itemPaymentDiscount: ConfirmDiscount,
                                itemPaymentTotalAmount: ConfirmTotalAmount,

                                // TODO :
                                itemDateBooking: route?.params?.itemLocationCurrentDateConfrim

                            });

                            // Handle API response here
                            Toast.show('Booking Confirm Successfully!', Toast.SHORT);


                        } else {
                            Toast.show('Booking Credentials Invalid!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Handle errors
                        Toast.show('Booking Credentials Invalid!', Toast.SHORT);
                    });
            } else {
                Toast.show('Booking Credentials Invalid!', Toast.SHORT);
            }
        } catch (error) {

        }

    }


    const axiosUserBookNowConfirmRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosBookNowConfirmRequestToStatus();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const StoreRIDE_ID = async (_idRider: any) => {
        try {
            await AsyncStorage.setItem('store_get_id_', JSON.stringify(_idRider));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_id_:', error);
        }
    }


    const StoreRIDEDISTANCE = async (distanceGet: any) => {
        try {
            await AsyncStorage.setItem('store_get_distance', JSON.stringify(distanceGet));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_distance:', error);
        }
    }

    const StoreRIDEDURATION = async (timeGet: any) => {
        try {
            await AsyncStorage.setItem('store_get_time', JSON.stringify(timeGet));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_time:', error);
        }
    }

    const StoreRIDEPICK = async (RidePickStation: any) => {
        try {
            await AsyncStorage.setItem('store_get_pickstation', JSON.stringify(RidePickStation));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_pickstation:', error);
        }
    }

    const StoreRIDEDROP = async (RideDropStation: any) => {
        try {
            await AsyncStorage.setItem('store_get_dropstation', JSON.stringify(RideDropStation));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_dropstation:', error);
        }
    }

    const StoreRIDECHARGE = async (ConfirmRideCharge: any) => {
        try {
            await AsyncStorage.setItem('store_get_ridecharge', JSON.stringify(ConfirmRideCharge));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_ridecharge:', error);
        }
    }

    const StoreRIDECON = async (ConfirmBookingFeesConvenience: any) => {
        try {
            await AsyncStorage.setItem('store_get_feescon', JSON.stringify(ConfirmBookingFeesConvenience));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_feescon:', error);
        }
    }

    const StoreRIDEWAITCHARGE = async (ConfirmWaiting_Charge: any) => {
        try {
            await AsyncStorage.setItem('store_get_waittingcharge',
                JSON.stringify(ConfirmWaiting_Charge));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_waittingcharge:', error);
        }
    }

    const StoreRIDEDICOUNT = async (ConfirmDiscount: any) => {
        try {
            await AsyncStorage.setItem('store_get_dicount',
                JSON.stringify(ConfirmDiscount));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_dicount:', error);
        }
    }


    const StoreRIDETOTALAMOUNT = async (ConfirmTotalAmount: any) => {
        try {
            await AsyncStorage.setItem('store_get_totalamount',
                JSON.stringify(ConfirmTotalAmount));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error store_get_totalamount:', error);
        }
    }


    const axiosBookNowConfirmRequestToStatus = async () => {
        try {
            const get_last_price = await AsyncStorage.getItem('store_last_price');

            const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            if (storedLinkedId !== null && get_last_price !== null) {

                console.log("get_last_pricerrrrrrrr===>", JSON.parse(get_last_price));

                const url = 'https://rideshareandcourier.graphiglow.in/api/booking/booking';

                // Prepare data in JSON format
                const data = {
                    UserID: JSON.parse(storedLinkedId),   // User ID TO Whice user Book Services
                    type: route?.params?.itemTypeConfrim,      // Courier Delivery And Taxi Booking
                    service_stype: route?.params?.itemServiceConfrim,   // Schedule booking And Book Now ,   Ride Now , Pool Ride , Hourly Ride , Bidding Ride
                    pickup_locations: route?.params?.itemPickLocationConfrim,
                    drop_locations: route?.params?.itemDropLocationConfrim,
                    vehical: UserSelctedVehicalName,
                    Price: JSON.parse(get_last_price), // UserSelctedVehicalPrice // ERROR " " //  "$" + price
                    // No_of_Seats: route?.params?.itemSelectNoOfSeatsConfrim,               // When Pool Ride used
                    //Price: "$".concat(JSON.parse(get_last_price)), // UserSelctedVehicalPrice // ERROR " " //  "$" + price
                    payment_type: route?.params?.itemPaymentTypeConfrim,
                    Waiting_Charge: 0,
                    Cancelled_Trip_Payment: 25,
                    Platform_charges: 10,
                    // distance: route?.params?.itemLocationDistanceConfrim + "",      // When Hourly Ride Functions used
                    // time: route?.params?.itemLocationDurationConfrim,      // When Hourly Ride Functions used   
                    //schedule_date: "04-10-2023",      // When schedule Functions used
                    //schedule_time: "30 Minutes",      // When schedule Functions used
                    loyalty_points: route?.params?.itemLoyalPointsConfrim,            // When loyalty Point used
                    pin_code: route?.params?.itemLocationPinCodeConfrim,
                    date: route?.params?.itemLocationCurrentDateConfrim,                // User Current Date
                    current_latitude: route?.params?.itemGetCurrentLatitudeConfrim,     // User Current Locations
                    current_longitude: route?.params?.itemGetCurrentLongitudeConfrim,    // User Current Locations
                    DriverID: "65b265d1e96ba17261218f34",           // When Any Doctor Accept Booking   // How to Get
                    status: "Accept"
                };

                console.log("All_CONFIRM_BOOK_NOW==>", JSON.stringify(data, null, 2));

                await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 201
                            && response?.data?.message === 'Booking Added Successfully') {

                            // TODO :
                            RideIdGet = response?.data?.data?.RideId;
                            console.log("RideIdGet===>", RideIdGet);

                            type = response?.data?.data?.type;
                            console.log("RideType===>", RideIdGet);

                            StoreRIDEID(RideIdGet);
                            StoreRIDETYPE(type);
                            // TODO :


                            distanceGet = route?.params?.itemLocationDistanceConfrim;
                            console.log("DIStanceGet===>", distanceGet);

                            timeGet = route?.params?.itemLocationDurationConfrim;
                            console.log("TIMeGet===>", timeGet);

                            // _id - Rider Get
                            _idRider = response?.data?.data?._id;
                            console.log("_idRider====>", _idRider);

                            // Added 
                            RidePickStation = route?.params?.itemPickLocationConfrim;
                            console.log("PickStation====>", RidePickStation);

                            RideDropStation = route?.params?.itemDropLocationConfrim;
                            console.log("DropStation====>", RideDropStation);

                            ConfirmRideCharge = response?.data?.data?.RideCharge;
                            ConfirmBookingFeesConvenience = response?.data?.data?.BookingFeesConvenience;
                            ConfirmWaiting_Charge = response?.data?.data?.Waiting_Charge;
                            ConfirmDiscount = response?.data?.data?.Discount;
                            ConfirmTotalAmount = response?.data?.data?.TotalAmount;

                            console.log("PAY1====>", ConfirmRideCharge);
                            console.log("PAY2====>", ConfirmBookingFeesConvenience);
                            console.log("PAY3====>", ConfirmWaiting_Charge);
                            console.log("PAY4====>", ConfirmDiscount);
                            console.log("PAY5====>", ConfirmTotalAmount);


                            // TODO : REAMING STORE AS LOCAL
                            StoreRIDE_ID(_idRider);

                            StoreRIDEDISTANCE(distanceGet);
                            StoreRIDEDURATION(timeGet);

                            StoreRIDEPICK(RidePickStation);
                            StoreRIDEDROP(RideDropStation);

                            StoreRIDECHARGE(ConfirmRideCharge);
                            StoreRIDECON(ConfirmBookingFeesConvenience);

                            StoreRIDEWAITCHARGE(ConfirmWaiting_Charge);

                            StoreRIDEDICOUNT(ConfirmDiscount);
                            StoreRIDETOTALAMOUNT(ConfirmTotalAmount);
                            // TODO : REAMING STORE AS LOCAL


                            navigation.navigate('CourierStatus', {
                                itemRIDEID: RideIdGet,
                                itemRider_ID: _idRider,
                                itemRiderDuration: distanceGet,
                                itemRiderDistance: timeGet,

                                itemRidePickStation: RidePickStation,
                                itemRideDropStation: RideDropStation,

                                itemPaymentRideCharge: ConfirmRideCharge,
                                itemPaymentFeesConvenience: ConfirmBookingFeesConvenience,
                                itemPaymentWaitingCharge: ConfirmWaiting_Charge,
                                itemPaymentDiscount: ConfirmDiscount,
                                itemPaymentTotalAmount: ConfirmTotalAmount,

                                // TODO :
                                itemDateBooking: route?.params?.itemLocationCurrentDateConfrim

                            });

                            // Handle API response here
                            Toast.show('Booking Confirm Successfully!', Toast.SHORT);

                        } else {
                            Toast.show('Booking Credentials Invalid!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Handle errors
                        Toast.show('Booking Credentials Invalid!', Toast.SHORT);
                    });
            } else {
                Toast.show('Booking Credentials Invalid!', Toast.SHORT);
            }
        } catch (error) {

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
                    onPress={handleMapPress}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Circle
                        center={markerCoordinates1}
                        radius={radius}
                        fillColor="rgba(0, 0, 255, 0.2)" // Transparent blue fill color
                        strokeWidth={0} // No border
                    />

                    <Marker
                        coordinate={markerCoordinates1}
                        title="Draggable Marker"
                        description="Drag me!"
                        // draggable
                        // onDrag={handleMarkerDrag}
                        // onDragEnd={handleMarkerDragEnd}
                        // onPress={handleMarkerPress}
                        icon={Images.mapOrangeIcon}
                    />
                    <Marker
                        coordinate={markerCoordinates2}
                        title="Second Marker"
                        description="Another location"
                        icon={Images.mapBlueIcon}
                    />

                    <Circle
                        center={markerCoordinates2}
                        radius={radius}
                        fillColor="rgba(255, 165, 0, 0.2)"
                        strokeWidth={0} // No border
                    />



                    <Polyline
                        coordinates={[markerCoordinates1, markerCoordinates2]}
                        strokeColor="#0040FF" // Line color
                        strokeWidth={2} // Line width
                    />


                </MapView>



                <TouchableOpacity
                    style={Styles.viewPick_}
                    onPress={() => navigation.goBack()}>
                    <View style={Styles.overlay}>
                        <Image
                            style={Styles.imageOpenIcon}
                            resizeMode="contain"
                            source={Images.arrowLeft} />
                    </View>
                </TouchableOpacity>



                <View style={{
                    backgroundColor: Colors.blue,
                    height: wp(23),
                    width: wp(95),
                    borderBottomLeftRadius: wp(5),
                    borderBottomRightRadius: wp(5),
                    marginHorizontal: wp(3),
                    marginBottom: wp(95), // 120
                }}>


                    <View
                        style={Styles.viewPick2}>

                        <View>
                            <View style={{
                                backgroundColor: Colors.grayDrawerBg,
                                height: "auto",
                                width: "100%",
                                padding: wp(3),
                                borderBottomLeftRadius: wp(5),
                                borderBottomRightRadius: wp(5),
                                borderRadius: wp(3),
                            }}>

                                <View style={CommonStyle.commonRow}>

                                    <View style={CommonStyle.commonContent}>

                                        <View style={CommonStyle.commonRow}>

                                            <>
                                                <View>
                                                    <Image
                                                        style={Styles.blueDot}
                                                        resizeMode="contain"
                                                        source={Images.blueDot} />
                                                    <View style={Styles.lineVerticalLine1} />

                                                </View>

                                            </>

                                            <>
                                                <View style={Styles.lineVerticalLine2} />

                                                <TouchableOpacity
                                                    activeOpacity={0.2}
                                                    onPress={() => navigation.navigate("PickupScreen")}
                                                >
                                                    <TextInputComponent
                                                        selectionColor={Colors.white}
                                                        isVisibleDropDown={false}
                                                        isVisibleLock={false}
                                                        isVisibleMail={false}
                                                        isVisibleCloseIcon={true} // As Text Available To Show !
                                                        isVisibleLockWhite={false}
                                                        marginVertical={hp(1)}
                                                        marginHorizontal={wp(2)}
                                                        width={wp(90)}
                                                        height={hp(7)}
                                                        // marginTop={hp(2)}
                                                        isUserHide={false}
                                                        textfontSize={ConstValue.value15}
                                                        textfontFamily={Fonts.PoppinsRegular}
                                                        textlineHeight={ConstValue.value0}
                                                        ref={refPickUp}
                                                        placeholder={ScreenText.SelectPickuplocation}
                                                        editable={false}
                                                        multiline={false}
                                                        secureTextEntry={false}
                                                        isPadding={true}
                                                        value={route?.params?.itemPickLocationConfrim}
                                                        keyboardType='default'
                                                        textAlign='left'
                                                        numberOfLines={null}
                                                        color={Colors.white}
                                                        borderRadius={wp(2)}
                                                        onChangeText={handleAccountPassword}
                                                        onSubmitEditing={() => {
                                                        }}
                                                        placeholderTextColor={Colors.white}
                                                    />

                                                </TouchableOpacity>
                                            </>

                                        </View>


                                        <View style={Styles.lineHorizontalLine3} />


                                        <View style={CommonStyle.commonRow}>

                                            <>
                                                <View style={Styles.lineVerticalLine4} />
                                            </>

                                            <>
                                                <View style={CommonStyle.commonRow}>

                                                    <Image
                                                        style={Styles.viewOrangeDot}
                                                        resizeMode="contain"
                                                        source={Images.orangeDot} />
                                                    <TouchableOpacity
                                                        activeOpacity={0.2}
                                                        onPress={() => navigation.navigate("DropupScreen")}
                                                    >
                                                        <TextInputComponent
                                                            isVisibleDropDown={false}
                                                            isVisibleLock={false}
                                                            isVisibleMail={false}
                                                            isVisibleCloseIcon={true} // As Text Available To Show !
                                                            isVisibleLockWhite={false}
                                                            // marginHorizontal={wp(10)}
                                                            width={wp(90)}
                                                            // marginTop={wp(2)}
                                                            selectionColor={Colors.white}
                                                            height={hp(7)}
                                                            isUserHide={false}
                                                            textfontSize={ConstValue.value15}
                                                            textfontFamily={Fonts.PoppinsRegular}
                                                            textlineHeight={ConstValue.value0}
                                                            ref={refDropUp}
                                                            placeholder={ScreenText.SelectDropofflocation}
                                                            editable={false}
                                                            multiline={false}
                                                            secureTextEntry={false}
                                                            isPadding={true}
                                                            keyboardType='default'
                                                            textAlign='left'
                                                            numberOfLines={null}
                                                            value={route?.params?.itemDropLocationConfrim}
                                                            color={Colors.white}
                                                            borderRadius={wp(2)}
                                                            onChangeText={handleAccountPasswordDrop}
                                                            onSubmitEditing={() => {
                                                            }}
                                                            placeholderTextColor={Colors.white}
                                                        />


                                                    </TouchableOpacity>


                                                </View>
                                            </>

                                        </View>



                                    </View>

                                </View>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: wp(2)
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                }}>
                                    <Image
                                        style={Styles.whiteDot}
                                        resizeMode="contain"
                                        source={Images.mapInIcon} />

                                    <TextComponent
                                        color={Colors.white}
                                        title={route?.params?.itemLocationDistanceConfrim !== undefined && route?.params?.itemLocationDistanceConfrim !== '' ? route.params.itemLocationDistanceConfrim : '20 KM'}
                                        textDecorationLine={'none'}
                                        fontWeight="500"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(8)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='center'
                                    />

                                </View>


                                <View style={{
                                    flexDirection: "row",
                                }}>

                                    <Image
                                        style={Styles.whiteDot}
                                        resizeMode="contain"
                                        source={Images.clockIcon} />

                                    <TextComponent
                                        color={Colors.white}
                                        title={route?.params?.itemLocationDurationConfrim !== undefined && route?.params?.itemLocationDurationConfrim !== '' ? route.params.itemLocationDurationConfrim : '30 Mins'}
                                        textDecorationLine={'none'}
                                        fontWeight="500"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(8)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='center'
                                    />

                                </View>
                            </View>




                        </View>


                    </View>

                    <View>

                        <View style={Styles.viewPickConatiner}>

                            <View style={{
                                justifyContent: 'center',
                            }}>

                                <TextComponent
                                    color={Colors.white}
                                    title={ScreenText.SelectVehicle} // As HTML Contain
                                    textDecorationLine={'none'}
                                    fontWeight="600"
                                    fontSize={wp(4)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign="left"
                                    marginHorizontal={wp(5)}
                                    marginVertical={hp(2)}
                                />

                            </View>


                            <View style={{
                                justifyContent: 'center',
                                // flex: 1
                            }}>
                                <ScrollView>
                                    {/* <FlatList
                                        bounces={true}
                                        data={dummyData}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={renderItem} // Custom renderItem function
                                    /> */}


                                    <ConfirmCourierListComponent
                                        handleGetItemDetails={(item) => handlePress({ item })}
                                        data={vehicles}

                                    // data={BookingVehicleList}
                                    />

                                    {/* <ConfirmBookingListComponent
                                        data={CourierVehicleData} /> */}


                                </ScrollView>

                                <View>
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(1)}
                                        heightBtn={hp(7)}
                                        widthBtn={wp(80)}
                                        isRightArrow={false}
                                        // onPress={() => navigation.navigate("CourierStatus")}
                                        color={Colors.white}
                                        title={ScreenText.ConfirmBooking}
                                        onPress={onPressCourierRequestConfirm}
                                        marginHorizontal={wp(6)}
                                        fontWeight="600"
                                        fontSize={wp(4)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={Colors.blue}
                                    />
                                </View>

                            </View>



                        </View>

                    </View>

                </View>

            </View>

        </SafeAreaView >
    )
}

export default CourierConfirmScreen;