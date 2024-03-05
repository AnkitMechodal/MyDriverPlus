import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button';
import HeaderComponent from '../../components/Header/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import TextInputComponent from '../../components/TextInput';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from '../../utils/commonfunction';
import { API, ConstValue, ScreenText } from '../../utils/index';
import Styles from './style';



type Props = {
    navigation: any
}

const BookingDetailsNoFeed = ({ route, navigation }) => {

    const [isModalCancel, setModalCancel] = useState(false);
    const [toggleRequestSent, setToggleRequestSent] = useState(true);
    const [toggleAccepted, setToggleAccepted] = useState(false);
    const [toggleOTP, setToggleOTP] = useState(false);


    const [defaultRating, setDefaultRating] = useState(4);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    const starImageFilled =
        Images.fillStarIcon;
    const starImageCorner =
        Images.unfillStarIcon;


    let USER_RIDEID;
    let USER_DATE_OF_RIDE;
    let USER_PAYMEMT_TYPE;
    let USER_TOTAL_AMOUNT;
    let USER_WATTING_CHARGES;
    let USER_PICK_UP_LOCATION;
    let USER_DROP_UP_LOCATION;
    let USER_VEHICAL;
    let USER_SERVICE_TYPE;
    let USER_RIDENAME;
    let USER_RIDEDURATION;
    let USER_RIDEDISTANCE;

    let USER_RIDE_CHARGE;
    let USER_CON_CHARGE;
    let USER_DISCOUNT;

    let USER_FARE_VALUE;
    let USER_TOTAL;

    let USER_CANCEL_TRIP;
    let USER_LOYAL_POINT;
    let USER_PLATFROM_CHARGE;


    const [isModalVisible, setModalVisible] = useState(true);
    const [requestSentDate, setRequestSentDate] = useState(ScreenText.Date);
    const [toggleArrived, setToggleArrived] = useState(false);

    const [togglePaymentCompleted, setTogglePaymentCompleted] = useState(false);
    const [toggleRideCompleted, setToggleRideCompleted] = useState(false);
    const [toggleFeedBack, setToggleFeedBack] = useState(false);


    // is ArrivedOTP
    const [isPICKOTP, setPICKOTP] = useState('');
    const [isDROPOTP, setDROPOTP] = useState('');

    const [isModalFeedBack, setModalFeedBack] = useState(false);


    const [isDRIVERSTATUS, setDRIVERSTATUS] = useState('Driver is On the Way');


    // isArriedOTPDate
    const [isArriedOTPDate, setIsArriedOTPDate] = useState('');
    const [isArriedTrueOTPDate, setIsArriedTrueOTPDate] = useState('');

    const [isRequestAcceptTime, setIsRequestAcceptTime] = useState('');

    const [isRequestPayAcceptTime, setIsRequestPayAcceptTime] = useState('');



    let OTPGenerated;


    // RIDEID
    const [isRIDEID, setRIDEID] = useState("");
    const [isDATE_OF_RIDE, setDATE_OF_RIDE] = useState("");
    const [isPAYMEMT_TYPE, setPAYMEMT_TYPE] = useState("");
    const [isTOTAL_AMOUNT, setTOTAL_AMOUNT] = useState("");
    const [isWATTING_CHARGES, setWATTING_CHARGES] = useState("");
    const [isPICK_UP_LOCATION, setPICK_UP_LOCATION] = useState("");
    const [isDROP_UP_LOCATION, setDROP_UP_LOCATION] = useState("");
    const [isVEHICAL, setVEHICAL] = useState("");
    const [isSERVICE_TYPE, setSERVICE_TYPE] = useState("");
    const [isFARE, setFARE] = useState("");

    const [isDUR, setDUR] = useState("");
    const [isDIS, setDIS] = useState("");


    const [isTRIP, setTRIP] = useState("");
    const [isLP, setLP] = useState("");
    const [isPC, setPC] = useState("");


    const [isDRIVERNAME, setDRIVERNAME] = useState("");

    const [isDRIVERIDECHARGE, setDRIVERRIDECHARGE] = useState("");
    const [isDRIVERCONCHARGE, setDRIVERCONCHARGE] = useState("");
    const [isDRIVERDISCOUNT, setDRIVERDISCOUNT] = useState("");

    const [isDRIVERPROFILe, setDRIVERPROFILE] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo"); // USER_RIDE_CHARGE


    // isDriverOnTheWay
    const [isDriverOnTheWay, setDriverOnTheWay] = useState(false);
    const [isAccepted, setIsAccepted] = useState(true);


    let OTPGenerateTimeArrived;
    let OTPVerifyTimeArrived;
    let PaymentStatusArrived;
    let RideStatusArrived;
    let BookingRequestTimeArrived;
    let PaymentStatusTimeArrived;



    // TODO :
    const [isFocusedFeedBack, setIsFocusedFeedBack] = useState(false);
    const refFeedBack = useRef<any>(null);
    const [isSecure, setSecure] = useState(true);
    const [feed, setFeed] = useState('')
    const [isValidFeed, setValidFeed] = useState(true);
    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));

    let averageRating;
    let avg_username;

    let statusCheack;
    let dateCheack;

    let paymentStatus;
    let rideStatus;
    let OTPVerify;

    // Driver Get Booking 
    let DriverBookingName;
    let DriverProfileImage;
    let Driver_id;


    let OTPStatus;


    useEffect(() => {
        // Update the time every second
        const intervalId = setInterval(() => {
            setCurrentTime(moment().format('HH:mm:ss'));
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log("RIDE_ID_REQUEST00===>", route.params.itemRIDEID_SENT);

                // itemRIDER_ID_SENT - route?.params?.itemRIDER_ID_SENT
                console.log("RIDER_USER_ID_REQUEST00===>", route.params.itemRIDER_ID_SENT);

                // Pay Now
                console.log("itemRIDER_DISTANCE_SENT00===>", route.params.itemRIDER_DISTANCE_SENT);
                console.log("itemRIDER_DURATUION_SENT00===>", route.params.itemRIDER_DURATUION_SENT);

                // Added MapData
                console.log("itemPICK_STATION_SENT00===>", route.params.itemRIDER_PICKSTATION);
                console.log("itemDROP_STATION_SENT00===>", route.params.itemRIDER_DROPSTATION);

                // Payment
                console.log("itemRIDER_RIDE_CHARGE_SENT00===>", route.params.itemRIDER_RIDE_CHARGE);
                console.log("itemRIDER_RIDE_FEES_CON_SENT00===>",
                    route.params.itemRIDER_RIDE_FEES_CON);
                console.log("itemRIDER_RIDE_WAITING_CHARGES_SENT00===>",
                    route.params.itemRIDER_RIDE_WAITING_CHARGES);
                console.log("itemRIDER_RIDE_DICOUNT_SENT00===>",
                    route.params.itemRIDER_RIDE_DICOUNT);
                console.log("itemRIDER_RIDE_TOTAL_AMOUNT_SENT00===>",
                    route.params.itemRIDER_RIDE_TOTALAMOUNT);


                // Get User In User Info
                await axiosGetRideStatusRequest();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Set interval to refresh every 10 seconds
        const intervalId = setInterval(fetchData, 15 * 1000); // 888

        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };

    }, [route.params.itemRIDEID_SENT,
    route.params.itemRIDER_ID_SENT,
    route.params.itemRIDER_DISTANCE_SENT,
    route.params.itemRIDER_DURATUION_SENT,
    route.params.itemRIDER_PICKSTATION,
    route.params.itemRIDER_DROPSTATION,
    route.params.itemRIDER_RIDE_CHARGE,
    route.params.itemRIDER_RIDE_FEES_CON,
    route.params.itemRIDER_RIDE_WAITING_CHARGES,
    route.params.itemRIDER_RIDE_DICOUNT,
    route.params.itemRIDER_RIDE_TOTALAMOUNT
    ]);


    const axiosGetRideStatusRequest = async () => {
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

            // const url = `https://rideshareandcourier.graphiglow.in/api/rideStatus/checkRide/${route.params.itemRIDEID_SENT}`
            const url = `${API.BASE_URL}/rideStatus/checkRide/${route.params.itemRIDEID_SENT}`;

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


                        // TODO :
                        OTPGenerateTimeArrived = response?.data?.matchingUsers?.OTPGenerateTime;

                        // TODO :
                        OTPVerifyTimeArrived = response?.data?.matchingUsers?.OTPVerifyTime;


                        // BookingRequestTime //2502
                        BookingRequestTimeArrived = response?.data?.matchingUsers?.BookingRequestTime;

                        PaymentStatusTimeArrived = response?.data?.matchingUsers?.PaymentStatusTime;


                        if (PaymentStatusTimeArrived !== null) {
                            setIsRequestPayAcceptTime(PaymentStatusTimeArrived);
                        } else {
                            setIsRequestPayAcceptTime('');
                        }

                        // TODO :
                        OTPVerify = response?.data?.matchingUsers?.ArrivedOTPStatus;
                        console.log("OTPVerify===>", OTPVerify);

                        OTPStatus = response?.data?.matchingUsers?.OTP;

                        PaymentStatusArrived = response?.data?.matchingUsers?.PaymentStatus;

                        RideStatusArrived = response?.data?.matchingUsers?.RideStatus;

                        if (BookingRequestTimeArrived !== null) {
                            setIsRequestAcceptTime(BookingRequestTimeArrived);
                        } else {
                            setIsRequestAcceptTime('');
                        }

                        if (OTPStatus == '') {
                            setPICKOTP("");
                            setToggleArrived(false);

                        } else {
                            setPICKOTP(OTPStatus);
                            setToggleArrived(true);

                            // Driver arrived your location
                            setDRIVERSTATUS("Driver Arrived Your Location");
                        }


                        // if (OTPStatus !== null) {
                        //     setPICKOTP(OTPStatus);
                        //     setToggleArrived(true);

                        //     // Driver arrived your location
                        //     setDRIVERSTATUS("Driver Arrived Your Location");
                        // } else {
                        //     setPICKOTP("");
                        //     setToggleArrived(false);
                        // }


                        if (OTPVerify === "Pending") {
                            setToggleOTP(false);


                        } else if (OTPVerify === "Verify") {
                            setToggleOTP(true);
                            setToggleAccepted(true);

                            // SET OTPGenerateTimeArrived
                            if (OTPGenerateTimeArrived !== null) {
                                setIsArriedOTPDate(OTPGenerateTimeArrived);
                            } else {
                                setIsArriedOTPDate(OTPGenerateTimeArrived);
                            }

                            if (OTPVerifyTimeArrived !== null) {
                                setIsArriedTrueOTPDate(OTPVerifyTimeArrived);
                            } else {
                                setIsArriedTrueOTPDate(OTPVerifyTimeArrived);
                            }


                        } else {
                            setToggleOTP(false);
                            setDRIVERSTATUS("Driver Started Waiting Timer");
                        }


                        if (PaymentStatusArrived === "Pending") {
                            setTogglePaymentCompleted(false);
                        } else {
                            setTogglePaymentCompleted(true);
                        }

                        if (RideStatusArrived === "Complete") {
                            setToggleRideCompleted(true);
                            setDRIVERSTATUS("Ride Complete");
                        } else {
                            setToggleRideCompleted(false);
                        }

                        // TODO :

                        console.log("paymentStatus****===>", paymentStatus);

                        // 1
                        if (statusCheack === "Accept") {
                            console.log("GetStatus===>", statusCheack);

                            setToggleAccepted(true);
                            setIsAccepted(false);


                            // Booking Request Accepted
                            setDRIVERSTATUS("Booking Request Accepted");
                            setDRIVERSTATUS("Ride Started , Enjoy your ride");
                            setDRIVERSTATUS("Driver is On the Way");


                            setDriverOnTheWay(true);


                            //  Arrived OTP  
                            // axiosGetOTPPostRequest(); - CALL 15SEC - WORKING TEST

                            // Ride Started , Enjoy your ride
                            setDRIVERSTATUS("Ride Started , Enjoy your ride");


                        } else if (statusCheack === "Arrived") {
                            setToggleAccepted(true);
                            setDRIVERSTATUS("Driver Arrived Your Location");

                        } else if (statusCheack === "RideStart") {
                            // setToggleRideCompleted(true);
                            // setDRIVERSTATUS("Ride Complete");

                            // Call Booking Complete API As Pending
                            // axiosPendingPaymentPostRequest();

                        } else {
                            setToggleAccepted(false);
                            // Toast.show('Unable to Get Ride Status!', Toast.SHORT);
                        }

                        // // 2
                        // if (paymentStatus === "Done") {
                        //     setTogglePaymentCompleted(true);
                        // } else {
                        //     setTogglePaymentCompleted(false);
                        // }

                        // 3 
                        // if (rideStatus === "Completed") {
                        //     setToggleRideCompleted(true);
                        //     setDRIVERSTATUS("Ride Complete");

                        //     // setToggleFeedBack(true);
                        // } else {
                        //     setToggleRideCompleted(false);
                        // }



                    } else {
                        setToggleAccepted(false);
                        // Toast.show('Unable to Get Ride Status!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    setToggleAccepted(false);
                    // Toast.show('Unable to Get Ride Status!', Toast.SHORT);
                });

        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    };


    // const axiosGetOTPPostRequest = async () => {
    //     try {
    //         const isConnected = await NetworkUtils.isNetworkAvailable()
    //         if (isConnected) {
    //             axiosGetOTPPostRequestSend();
    //         } else {
    //             Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
    //         }
    //     } catch (error) {
    //         Toast.show("axios error", Toast.SHORT);
    //     }
    // }

    // const axiosGetOTPPostRequestSend = async () => {
    //     try {
    //         const url = `https://rideshareandcourier.graphiglow.in/api/otpGenerate/generateOTP`;

    //         console.log("URL_RATTING==>", JSON.stringify(url, null, 2));

    //         const data = {
    //             id: route?.params?.itemRIDER_ID_SENT
    //         }

    //         await axios.post(url, data, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //             .then(response => {
    //                 if (response.status === 200
    //                     && response?.data?.message === 'OTP generated successfully, status updated to Arrived') {

    //                     // GET OTP FROM API 
    //                     OTPGenerated = response?.data?.OTP;
    //                     console.log("OTPGenerated==>", OTPGenerated);

    //                     Toast.show('Generat OTP Successfully!', Toast.SHORT);

    //                     setPICKOTP(OTPGenerated);
    //                     setToggleArrived(true);

    //                     setToggleOTP(true); // auto true

    //                     // VERIFY OTP API
    //                     // axiosGetOTPVerifyPostRequest(OTPGenerated);

    //                 } else {
    //                     Toast.show('Enabel To Generat OTP!', Toast.SHORT);
    //                 }
    //             })
    //             .catch(error => {
    //                 // Handle errors
    //                 Toast.show('Enabel To Generat OTP!', Toast.SHORT);
    //             });
    //     } catch (error) {

    //     }
    // }


    // useEffect(() => {

    //     const fetchData = async () => {
    //         try {
    //             // RIDER_MAP_ID
    //             console.log("itemRideID_UPCO===>", route.params.itemRideID_UPCO);

    //             // axios
    //             await axiosPostRideDetailsOfMap();

    //             // axios
    //             await axiosPostDriverInfoRequest();
    //             await axiosGetRideRattingRequest();



    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    //     // Set interval to refresh every 10 seconds
    //     const intervalId = setInterval(fetchData, 10 * 1000);

    //     // Clean up the interval when the component is unmounted


    //     return () => clearInterval(intervalId);
    // }, []);

    const axiosPostRideDetailsOfMap = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';

        // Prepare data in JSON format
        const data = {
            id: route.params.itemRideID_UPCO
        };

        console.log("ERROR_ERROR===>", data);

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    && response?.data?.message === 'Ride Details') {
                    // Handle API response here
                    Toast.show('Ride Details Get Successfully!', Toast.SHORT);

                    USER_RIDEID = response?.data?.matchingVehicle?.RideId;
                    USER_DATE_OF_RIDE = response?.data?.matchingVehicle?.date;
                    USER_PAYMEMT_TYPE = response?.data?.matchingVehicle?.payment_type;
                    USER_TOTAL_AMOUNT = response?.data?.matchingVehicle?.TotalAmount;
                    USER_WATTING_CHARGES = response?.data?.matchingVehicle?.Waiting_Charge;
                    USER_PICK_UP_LOCATION = response?.data?.matchingVehicle?.pickup_locations;
                    USER_DROP_UP_LOCATION = response?.data?.matchingVehicle?.drop_locations;
                    USER_VEHICAL = response?.data?.matchingVehicle?.vehical;
                    USER_SERVICE_TYPE = response?.data?.matchingVehicle?.service_stype;

                    USER_RIDEDURATION = response?.data?.matchingVehicle?.time;
                    USER_RIDEDISTANCE = response?.data?.matchingVehicle?.distance;


                    USER_CANCEL_TRIP = response?.data?.matchingVehicle?.Cancelled_Trip_Payment;
                    USER_LOYAL_POINT = response?.data?.matchingVehicle?.loyalty_points;
                    USER_PLATFROM_CHARGE = response?.data?.matchingVehicle?.Platform_charges;


                    setDIS(USER_RIDEDISTANCE);
                    setDUR(USER_RIDEDURATION);

                    setTRIP(USER_CANCEL_TRIP);
                    setLP(USER_LOYAL_POINT);
                    setPC(USER_PLATFROM_CHARGE);


                    // RideCharge
                    USER_RIDE_CHARGE = response?.data?.matchingVehicle?.RideCharge;
                    USER_CON_CHARGE = response?.data?.matchingVehicle?.BookingFeesConvenience;
                    USER_DISCOUNT = response?.data?.matchingVehicle?.Discount;

                    USER_FARE_VALUE = response?.data?.matchingVehicle?.farValues;

                    console.log("USER_VEHICAL==>", USER_VEHICAL);


                    // GET TOTAL :
                    USER_TOTAL = parseInt(USER_RIDE_CHARGE) + parseInt(USER_CON_CHARGE) +
                        parseInt(USER_WATTING_CHARGES);

                    console.log("USER_TOTAL1==>", parseInt(USER_RIDE_CHARGE));
                    console.log("USER_TOTAL2==>", parseInt(USER_CON_CHARGE));
                    console.log("USER_TOTAL3==>", parseInt(USER_WATTING_CHARGES));

                    console.log("USER_TOTAL==>", USER_TOTAL);

                    // USER_DISCOUNT - NO USE
                    setTOTAL_AMOUNT(USER_TOTAL);


                    setRIDEID(USER_RIDEID);
                    setVEHICAL(USER_VEHICAL); // ADDED
                    setSERVICE_TYPE(USER_SERVICE_TYPE);
                    setDATE_OF_RIDE(USER_DATE_OF_RIDE); // ADDED 
                    setPAYMEMT_TYPE(USER_PAYMEMT_TYPE);
                    setPICK_UP_LOCATION(USER_PICK_UP_LOCATION);
                    setDROP_UP_LOCATION(USER_DROP_UP_LOCATION);
                    setWATTING_CHARGES(USER_WATTING_CHARGES);
                    // setTOTAL_AMOUNT(USER_TOTAL_AMOUNT);
                    setFARE(USER_FARE_VALUE); // ADDED 

                    // Discount  // ADDED
                    // Ride Charge
                    // Booking Fees

                    setDRIVERRIDECHARGE(USER_RIDE_CHARGE);
                    setDRIVERCONCHARGE(USER_CON_CHARGE);
                    setDRIVERDISCOUNT(USER_DISCOUNT);

                    console.log("RideDetails101===>",
                        JSON.stringify(response?.data?.matchingVehicle?.RideId, null, 2));

                } else {
                    Toast.show('Enable To Get Ride Details!', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Enable To Get Ride Details!', Toast.SHORT);
            });
    };


    const axiosPostDriverInfoRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosUserPostDriverInfoRequest();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosUserPostDriverInfoRequest = async () => {

        const storedLinkedId = await AsyncStorage.getItem('store_ride_id');
        if (storedLinkedId !== null) {
            // const url = 'https://rideshareandcourier.graphiglow.in/api/driverInfo/driverInfo';
            const url = `${API.BASE_URL}/driverInfo/driverInfo`;

            // Prepare data in JSON format
            const data = {
                id: JSON.parse(storedLinkedId)
                // id: "659ba278e911a1c7a1f64f83"
            };

            console.log("INFO_DATA==>", JSON.stringify(data, null, 2));

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200
                        &&
                        response?.data?.message === 'User Information') {
                        // Handle API response here

                        console.log("RESPONSE_11-01==>",
                            JSON.stringify(response?.data, null, 2));

                        DriverBookingName = response?.data?.matchingUsers[0]?.username;
                        DriverProfileImage = response?.data?.matchingUsers[0]?.ProfileImage;

                        // _id99
                        Driver_id = response?.data?.matchingUsers[0]?._id;
                        // Store for star : todo
                        StoredDriverID(Driver_id);

                        console.log("Driver_id==>",
                            JSON.stringify(Driver_id, null, 2));

                        setDRIVERNAME(DriverBookingName);
                        setDRIVERPROFILE(DriverProfileImage);

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
        } else {

        }

    };

    const StoredDriverID = async (Driver_id: any) => {
        try {
            await AsyncStorage.setItem('store_star_id', JSON.stringify(Driver_id));
            console.log('store_star_id===>', JSON.parse(Driver_id));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_star_id :', error);
        }
    }

    const axiosGetRideRattingRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosCheckUserGetRideRattingRequest();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }


    const axiosCheckUserGetRideRattingRequest = async () => {
        try {
            const storedLinkedId = await AsyncStorage.getItem('store_star_id');

            if (storedLinkedId !== null) {
                const userId = JSON.parse(storedLinkedId);
                //const url = `https://rideshareandcourier.graphiglow.in/api/rattingCalculateDriver/calculateRating/${userId}`;
                const url = `${API.BASE_URL}/rattingCalculateDriver/calculateRating/${userId}`;

                console.log("URL_RATTING==>", JSON.stringify(url, null, 2));

                await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 200
                            && response?.data?.message === 'Ratings calculated successfully') {

                            averageRating = response?.data?.ratings?.averageRating;
                            avg_username = response?.data?.ratings?.username;

                            console.log("avg_username===>", avg_username);

                            setDefaultRating(averageRating);
                            // setDRIVERNAME(avg_username);
                            //  PHOTO // ADDED 

                            console.log("RESDATA===>",
                                JSON.stringify(averageRating, null, 2));
                            Toast.show('Driver Ratings Get Success!', Toast.SHORT);

                        } else {
                            Toast.show('Enabel To Get Ratings!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Handle errors
                        Toast.show('Enabel To Get Ratings!', Toast.SHORT);
                    });

            } else {

            }
        } catch (error) {

        }
    }

    const toggleModalFeedback = () => {
        setModalFeedBack(!isModalFeedBack);
    };


    const toggleModalCancel = () => {
        setModalCancel(!isModalCancel);
    };

    const onPressCancelBooking = () => {
        // Cancel Booking 
        axiosCancelBookingPostRequest();
    }

    const axiosCancelBookingPostRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosCancelBookingSurePostRequest();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosCancelBookingSurePostRequest = async () => {
        try {

            // const url = `https://rideshareandcourier.graphiglow.in/api/Cancelbooking/CancelBooking`
            const url = `${API.BASE_URL}/Cancelbooking/CancelBooking`;

            console.log("axiosCancelBookingSurePostRequest===>", url);

            // Prepare data in JSON format
            const data = {
                RideId: route?.params?.itemRIDEID_SENT
            };

            console.log("CancelBookingData==>", JSON.stringify(data, null, 2));


            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200
                        && response?.data?.message === 'Booking Successfully Cancelled') {

                        Toast.show('Your Booking has been Successfully Cancelled!', Toast.SHORT);

                        navigation.navigate("CancelBookingDetailsMapUp", {
                            itemBokingDetailsMapId: route.params.itemRIDER_ID_SENT,
                            itemBokingDetailsMapDistance: route.params.itemRIDER_DISTANCE_SENT,
                            itemBokingDetailsMapDuration: route.params.itemRIDER_DURATUION_SENT,

                            itemMapPickStation: route.params.itemRIDER_PICKSTATION,
                            itemMapDropStation: route.params.itemRIDER_DROPSTATION,

                            // itemMapKmStation: route?.params?.itemRIDER_DISTANCE_SENT,
                            // itemMapMinStation: route?.params?.itemRIDER_DURATUION_SENT,

                            itemMapRideCharge: route.params.itemRIDER_RIDE_CHARGE,
                            itemMapRideFeesCon: route.params.itemRIDER_RIDE_FEES_CON,
                            itemMapRideWattingCharges: route.params.itemRIDER_RIDE_WAITING_CHARGES,
                            itemMapRideDiscount: route.params.itemRIDER_RIDE_DICOUNT,
                            itemMapRideTotalAmount: route.params.itemRIDER_RIDE_TOTALAMOUNT,
                        })

                    } else {
                        Toast.show('Unable to Cancelled!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    Toast.show('Unable to Cancelled!', Toast.SHORT);
                });

        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    };

    const handleFocusFeed = () => {
        setIsFocusedFeedBack(true)
    }

    const handleAccountFeed = (userfeed: any) => {
        setFeed(userfeed);
        if (userfeed.length < 3) {
            setIsFocusedFeedBack(true);
            setValidFeed(false)
        } else {
            setValidFeed(true);
            setIsFocusedFeedBack(false)
        }
    }


    const onPressSendFeeback = () => {
        if (feed === '') {
            Toast.show("Send Feedback Field Is Required", Toast.SHORT);
        } else {
            // Toast.show("Done", Toast.SHORT);
            // setModalFeedBack(false);
            axiosRequestFeedbackMessage()
        }
    }

    const axiosRequestFeedbackMessage = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostFeedBackSend();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }
    const axiosPostFeedBackSend = async () => {
        // const url = 'https://rideshareandcourier.graphiglow.in/api/userFeedBack/feedback';
        const url = `${API.BASE_URL}/userFeedBack/feedback`;

        // Get Register id
        const storedLinkedId = await AsyncStorage.getItem('user_register_id');
        if (storedLinkedId !== null) {
            // Prepare data in JSON format
            const data = {
                UserID: JSON.parse(storedLinkedId),
                // DriverID: "656624091a49aabf8754033e",
                feedback: feed.toString()
            };

            console.log("FeedbackData==>", data);

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 201
                        &&
                        response?.data?.message === 'Booking Add Successfully') {
                        // Handle API response here
                        // Vehicles Are

                        console.log("FeedbackDataResponse==>",
                            JSON.stringify(response?.data?.matchingVehicles, null, 2));

                        // setVehicles(response.data.matchingVehicles);

                        Toast.show('Feedback Sent Successfully!', Toast.SHORT);
                        setToggleFeedBack(true);

                        setModalFeedBack(false);

                    } else {
                        Toast.show('Unable to Send Feedback!', Toast.SHORT);
                        //  Welcome! Signed in successfully.
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Unable to Send Feedback!', Toast.SHORT);
                });
        } else {
            Toast.show('Unable to Send Feedback!', Toast.SHORT);
        }


    };


    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <View style={Styles.container}>
                <Modal
                    isVisible={isModalVisible}
                    swipeDirection={[]} // Disables swiping
                    style={Styles.viewModalMargin}>
                    <ScrollView
                        bounces={true}
                        overScrollMode="always">
                        <View style={CommonStyle.commonFlex}>
                            <View>
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
                                    textAlignRight={"right"}
                                    colorRight={Colors.blue}
                                    fontSizeRight={wp(3.5)}
                                    marginTopRight={wp(3)}
                                    onPressRightEnd={toggleModalCancel}
                                    titleWithRightContent={"Cancel Booking?"}
                                    title={"Booking Status"}
                                    fontSize={wp(4)}
                                    onPress={() => navigation.goBack()}
                                />
                            </View>

                            <View style={{ margin: wp(5) }}>

                                <View style={{
                                    flexDirection: "row",
                                }}>

                                    <View style={{ justifyContent: 'center' }}>
                                        <CheckBox
                                            onCheckColor={'white'}
                                            onFillColor={'blue'}
                                            boxType="square"
                                            disabled={true}
                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                            value={toggleRequestSent}
                                            onValueChange={(newValue) => setToggleRequestSent(newValue)}
                                        />

                                    </View>

                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.BookingRequestSent}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='center'
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            title={requestSentDate} // title={ScreenText.Date}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    {/* <View style={{ flex: 1 }}>
                            <TextComponent
                                color={Colors.orange}
                                title={ScreenText.ViewRequest}
                                textDecorationLine={'underline'}
                                onPress={() => navigation.navigate("ViewRequest")}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                marginVertical={wp(0)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='right'
                            />
                        </View> */}

                                </View>

                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: wp(1)
                                }}>

                                    <View style={{ justifyContent: 'center' }}>
                                        <CheckBox
                                            onCheckColor={'white'}
                                            onFillColor={'blue'}
                                            boxType="square"
                                            disabled={true}
                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                            value={toggleAccepted}
                                            onValueChange={(newValue) => setToggleAccepted(newValue)}
                                        />
                                    </View>

                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.RequestAccepted}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            // title={requestSentDate}
                                            title={isRequestAcceptTime}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <TextComponent
                                            color={Colors.orange}
                                            // title={ScreenText.ViewDriver}
                                            title={isAccepted ? "" : ScreenText.ViewDriver} //99
                                            textDecorationLine={'underline'}
                                            onPress={() =>
                                                navigation.navigate('PreferredDriverUp', {
                                                    itemRider_ID_: route.params.itemRIDER_ID_SENT,
                                                })
                                            }
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='right'
                                        />
                                    </View>

                                </View>

                                <View style={{ flexDirection: "row" }}>

                                    <View style={{ justifyContent: 'center' }}>
                                        <CheckBox
                                            onCheckColor={'white'}
                                            onFillColor={'blue'}
                                            boxType="square"
                                            disabled={true}
                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                            value={toggleArrived}
                                            onValueChange={(newValue) => setToggleArrived(newValue)}
                                        />
                                    </View>

                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.DriverArrivedYourLocation}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            // title={requestSentDate}
                                            title={isArriedOTPDate}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={{ justifyContent: 'center' }}>
                                        <TextComponent
                                            color={Colors.white}
                                            title={isPICKOTP}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4.5)}
                                            marginVertical={wp(0)}
                                            marginLeft={wp(4)}
                                            fontFamily={Fonts.PoppinsRegular}
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            title={ScreenText.OTPShareWithDriver}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                </View>

                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: wp(1)
                                }}>

                                    <View style={{ justifyContent: 'center' }}>
                                        <CheckBox
                                            onCheckColor={'white'}
                                            onFillColor={'blue'}
                                            boxType="square"
                                            disabled={true}
                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                            value={toggleOTP}
                                            onValueChange={(newValue) => setToggleOTP(newValue)}
                                        />
                                    </View>

                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.OTPVerification}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            // title={requestSentDate}
                                            title={isArriedTrueOTPDate}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                </View>

                                <View style={{
                                    flexDirection: "row",
                                    marginVertical: wp(1)
                                }}>

                                    <View style={{ justifyContent: 'center' }}>
                                        <CheckBox
                                            onCheckColor={'white'}
                                            onFillColor={'blue'}
                                            boxType="square"
                                            disabled={true}
                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                            value={togglePaymentCompleted}
                                            onValueChange={(newValue) => setTogglePaymentCompleted(newValue)}
                                        />
                                    </View>

                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.PaymentCompleted}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            // title={requestSentDate}
                                            title={isRequestPayAcceptTime}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>


                                    <View style={{ flex: 1 }}>
                                        <TextComponent
                                            color={Colors.orange}
                                            title={ScreenText.PayNow}
                                            textDecorationLine={'underline'} // BookingDetailsMap
                                            onPress={() =>
                                                navigation.navigate("BookingDetailsMapUp", {
                                                    itemBokingDetailsMapId: route.params.itemRIDER_ID_SENT,
                                                    itemBokingDetailsMapDistance: route.params.itemRIDER_DISTANCE_SENT,
                                                    itemBokingDetailsMapDuration: route.params.itemRIDER_DURATUION_SENT,

                                                    itemMapPickStation: route.params.itemRIDER_PICKSTATION,
                                                    itemMapDropStation: route.params.itemRIDER_DROPSTATION,

                                                    // itemMapKmStation: route?.params?.itemRIDER_DISTANCE_SENT,
                                                    // itemMapMinStation: route?.params?.itemRIDER_DURATUION_SENT,

                                                    itemMapRideCharge: route.params.itemRIDER_RIDE_CHARGE,
                                                    itemMapRideFeesCon: route.params.itemRIDER_RIDE_FEES_CON,
                                                    itemMapRideWattingCharges: route.params.itemRIDER_RIDE_WAITING_CHARGES,
                                                    itemMapRideDiscount: route.params.itemRIDER_RIDE_DICOUNT,
                                                    itemMapRideTotalAmount: route.params.itemRIDER_RIDE_TOTALAMOUNT,
                                                })
                                            }
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='right'
                                        />
                                    </View>

                                </View>

                                <View style={{
                                    flexDirection: "row",
                                }}>

                                    <View style={{ justifyContent: 'center' }}>
                                        <CheckBox
                                            onCheckColor={'white'}
                                            onFillColor={'blue'}
                                            boxType="square"
                                            disabled={true}
                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                            value={toggleRideCompleted}
                                            onValueChange={(newValue) => setToggleRideCompleted(newValue)}
                                        />
                                    </View>

                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.RideCompleted}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            title={requestSentDate}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    {/* <View style={{ flex: 1 }}>
                            <TextComponent
                                color={Colors.orange}
                                title={ScreenText.Feedback}
                                textDecorationLine={'underline'}
                                onPress={toggleModalFeedback}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                marginVertical={wp(0)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='right'
                            />
                        </View> */}

                                </View>

                                <View style={{
                                    flexDirection: "row",
                                }}>

                                    <View style={{ justifyContent: 'center' }}>
                                        <CheckBox
                                            onCheckColor={'white'}
                                            onFillColor={'blue'}
                                            boxType="square"
                                            disabled={true}
                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                            value={toggleFeedBack}
                                            onValueChange={(newValue) => setToggleFeedBack(newValue)}
                                        />
                                    </View>

                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.Feedback}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            title={requestSentDate}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <TextComponent
                                            color={Colors.orange}
                                            title={ScreenText.Feedback}
                                            textDecorationLine={'underline'}
                                            onPress={toggleModalFeedback}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            marginVertical={wp(0)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='right'
                                        />
                                    </View>

                                </View>

                            </View>

                            <Modal isVisible={isModalCancel}
                                onBackButtonPress={() => setModalCancel(false)}
                                onBackdropPress={() => setModalCancel(false)}>
                                <View
                                    style={Styles.modalCancelConatiner}>
                                    <View>
                                        <TextComponent
                                            color={Colors.orange}
                                            title={ScreenText.AreYouSure}
                                            textDecorationLine={'none'}
                                            fontWeight="700"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='center'
                                            marginVertical={wp(5)}
                                            marginHorizontal={wp(2)}
                                        />
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.FeedbackRequest}
                                            textDecorationLine={'none'}
                                            fontWeight="500"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='center'
                                            marginHorizontal={wp(2)}
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            title={ScreenText.IfYesAnotherdriver}
                                            textDecorationLine={'none'}
                                            fontWeight="500"
                                            fontSize={wp(2.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='center'
                                            marginVertical={wp(2)}
                                            marginHorizontal={wp(2)}
                                        />
                                    </View>
                                    <View style={Styles.ButtonYesNoConatiner}>
                                        <ButtonComponent
                                            isVisibleMobile={false}
                                            isVisibleFaceBook={false}
                                            marginVertical={hp(1)}
                                            heightBtn={hp(6)}
                                            widthBtn={wp(30)}
                                            isRightArrow={false} // 99
                                            onPress={onPressCancelBooking}
                                            color={Colors.white}
                                            title={ScreenText.Yes}
                                            marginHorizontal={wp(6)}
                                            fontWeight="600"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            alignSelf='center'
                                            textAlign='center'
                                            borderRadius={wp(2)}
                                            backgroundColor={Colors.blue}
                                        />
                                        <ButtonComponent
                                            isVisibleMobile={false}
                                            isVisibleFaceBook={false}
                                            marginVertical={hp(1)}
                                            heightBtn={hp(6)}
                                            widthBtn={wp(30)}
                                            isRightArrow={false}
                                            onPress={() => setModalCancel(false)}
                                            color={Colors.black}
                                            title={ScreenText.No}
                                            marginHorizontal={wp(6)}
                                            fontWeight="600"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            alignSelf='center'
                                            textAlign='center'
                                            borderRadius={wp(2)}
                                            backgroundColor={Colors.grayDark}
                                        />
                                    </View>

                                </View>

                            </Modal>

                            <Modal isVisible={isModalFeedBack}
                                onBackButtonPress={() => setModalFeedBack(false)}
                                onBackdropPress={() => setModalFeedBack(false)}>
                                <View
                                    style={Styles.modalCancelConatiner}>

                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.Feedback}
                                            textDecorationLine={'none'}
                                            fontWeight="700"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='center'
                                            marginVertical={wp(5)}
                                            marginHorizontal={wp(2)}
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            title={ScreenText.FeedBackService}
                                            textDecorationLine={'none'}
                                            fontWeight="500"
                                            fontSize={wp(3)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='center'
                                            marginHorizontal={wp(2)}
                                        />

                                    </View>

                                    <View>
                                        <TextInputComponent
                                            selectionColor={Colors.white}
                                            isVisibleDropDown={false}
                                            marginVertical={hp(1)}
                                            width={wp(85)}
                                            borderWidth={isFocusedFeedBack ? ConstValue.value1 : ConstValue.value0}
                                            borderColor={isFocusedFeedBack ? Colors.white : Colors.blue}
                                            height={hp(20)}
                                            marginTop={hp(2)}
                                            isUserHide={false}
                                            textfontSize={ConstValue.value15}
                                            textfontFamily={Fonts.PoppinsRegular}
                                            textlineHeight={ConstValue.value0}
                                            ref={refFeedBack}
                                            placeholder={ScreenText.ShareYourFeedBack}
                                            editable={true}
                                            multiline={false}
                                            isPadding={true}
                                            keyboardType='default'
                                            textAlignVertical={"top"}
                                            textAlign='left'
                                            numberOfLines={null}
                                            color={Colors.white}
                                            backgroundColor={Colors.grayDark}
                                            borderRadius={wp(2)}
                                            onFocus={handleFocusFeed}
                                            onChangeText={handleAccountFeed}
                                            onSubmitEditing={() => {
                                            }}
                                            placeholderTextColor={Colors.gray}
                                        />
                                        {!isValidFeed ?
                                            <TextComponent
                                                textDecorationLine={'none'}
                                                color={Colors.red}
                                                title={ScreenText.ValidFeedback}
                                                fontWeight="400"
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                            />
                                            : null}
                                    </View>

                                    <View style={Styles.ButtonYesNoConatiner}>
                                        <ButtonComponent
                                            isVisibleMobile={false}
                                            isVisibleFaceBook={false}
                                            marginVertical={hp(1)}
                                            heightBtn={hp(6)}
                                            widthBtn={wp(50)}
                                            isRightArrow={false}
                                            onPress={onPressSendFeeback}
                                            color={Colors.white}
                                            title={ScreenText.SendFeedback}
                                            marginHorizontal={wp(6)}
                                            fontWeight="500"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            alignSelf='center'
                                            textAlign='center'
                                            borderRadius={wp(2)}
                                            backgroundColor={Colors.blue}
                                        />
                                    </View>

                                </View>

                            </Modal>

                            <View style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                marginTop: wp(30)
                            }}>

                                <View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("ModalHelp")}
                                        style={Styles.viewItemFour}>
                                        <Image
                                            style={Styles.imageHelpIcon}
                                            resizeMode="contain"
                                            source={Images.helpAndSupportIcon} />
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.HelpAndSupport}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                            marginHorizontal={wp(2)}
                                        />
                                        <View style={Styles.imageRightArrow}>
                                            <Image
                                                style={Styles.textTermsAndCondition}
                                                resizeMode="contain"
                                                source={Images.rightArrowIcon} />
                                        </View>
                                    </TouchableOpacity>
                                </View>


                                {isDriverOnTheWay
                                    ? <View>
                                        <View style={Styles.viewBlueBottamConatiner}>

                                            <View style={Styles.viewWhiteDot} />

                                            <View style={CommonStyle.commonFlex}>
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={isDRIVERSTATUS}
                                                    textDecorationLine={'none'}
                                                    fontWeight="400"
                                                    fontSize={wp(3.5)}
                                                    marginHorizontal={wp(2)}
                                                    fontFamily={Fonts.PoppinsSemiBold}
                                                    textAlign='left'
                                                />
                                            </View>

                                            <View style={CommonStyle.commonFlex}>
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={isDRIVERSTATUS == "Ride Complete" ? "Pay Now" : "View On Map"}
                                                    textDecorationLine={'underline'}
                                                    onPress={() =>

                                                        isDRIVERSTATUS ==

                                                            "Ride Complete"

                                                            ? navigation.navigate("BookingDetailsMapUp", {
                                                                itemBokingDetailsMapId: route.params.itemRIDER_ID_SENT,
                                                                itemBokingDetailsMapDistance: route.params.itemRIDER_DISTANCE_SENT,
                                                                itemBokingDetailsMapDuration: route.params.itemRIDER_DURATUION_SENT,

                                                                itemMapPickStation: route.params.itemRIDER_PICKSTATION,
                                                                itemMapDropStation: route.params.itemRIDER_DROPSTATION,

                                                                // itemMapKmStation: route?.params?.itemRIDER_DISTANCE_SENT,
                                                                // itemMapMinStation: route?.params?.itemRIDER_DURATUION_SENT,

                                                                itemMapRideCharge: route.params.itemRIDER_RIDE_CHARGE,
                                                                itemMapRideFeesCon: route.params.itemRIDER_RIDE_FEES_CON,
                                                                itemMapRideWattingCharges: route.params.itemRIDER_RIDE_WAITING_CHARGES,
                                                                itemMapRideDiscount: route.params.itemRIDER_RIDE_DICOUNT,
                                                                itemMapRideTotalAmount: route.params.itemRIDER_RIDE_TOTALAMOUNT,
                                                            }) :

                                                            navigation.navigate('BookingRequestAcceptedUp', {

                                                                itemBokingDetailsMapId: route.params.itemRIDER_ID_SENT,
                                                                itemBokingDetailsMapDistance: route.params.itemRIDER_DISTANCE_SENT,
                                                                itemBokingDetailsMapDuration: route.params.itemRIDER_DURATUION_SENT,

                                                                itemMapPickStation: route.params.itemRIDER_PICKSTATION,
                                                                itemMapDropStation: route.params.itemRIDER_DROPSTATION,

                                                                // itemMapKmStation: route?.params?.itemRIDER_DISTANCE_SENT,
                                                                // itemMapMinStation: route?.params?.itemRIDER_DURATUION_SENT,

                                                                itemMapRideCharge: route.params.itemRIDER_RIDE_CHARGE,
                                                                itemMapRideFeesCon: route.params.itemRIDER_RIDE_FEES_CON,
                                                                itemMapRideWattingCharges: route.params.itemRIDER_RIDE_WAITING_CHARGES,
                                                                itemMapRideDiscount: route.params.itemRIDER_RIDE_DICOUNT,
                                                                itemMapRideTotalAmount: route.params.itemRIDER_RIDE_TOTALAMOUNT,

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
                                    </View> :
                                    <></>}


                            </View>


                        </View>

                    </ScrollView>

                </Modal>
            </View>
        </SafeAreaView>
    )
}

export default BookingDetailsNoFeed;
