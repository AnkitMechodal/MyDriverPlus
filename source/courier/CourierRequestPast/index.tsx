import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import axios from "axios";
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Linking, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import WebView from 'react-native-webview';
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

const CourierRequestPast = ({ route, navigation }) => {

    const [toggleRequestSent, setToggleRequestSent] = useState(true);
    const [toggleAccepted, setToggleAccepted] = useState(false);
    const [toggleArrived, setToggleArrived] = useState(false);

    const [isModalVisibleREQ] = useState(true);
    // const [isInnerModalVisible, setInnerModalVisible] = useState(false);

    const [toggleONE, setToggleONE] = useState(false);

    // 
    const [isFocusedApplyNow, setIsFocusedApplyNow] = useState(false);
    const [isFocusedRedeem, setIsFocusedRedeem] = useState(false);

    const [isValidRedeem, setValidRedeem] = useState(true);


    const [isModalPAY1, setModalPAY1] = useState(false);


    const refRedeem = useRef<any>(null);


    const [defaultRatingSubmit, setDefaultRatingsubmit] = useState(0);


    const starImageFilled1 =
        Images.fillstarIcon; // fillStarIcon
    const starImageCorner1 =
        Images.unfillstarIcon;


    const [isApplyNowBtn, setisApplyNowBtn] = useState(true);
    const [isApplyNowText, setisApplyNowText] = useState(false);


    // PAY COMPLETE
    const refApplyNow = useRef<any>(null);
    const [isApplyEdit, setApplyEdit] = useState(true);
    const [isApplyRedeem, setApplyRedeem] = useState(true);

    const [isRedeemBtn, setisRedeemBtn] = useState(true);
    const [isRedeemText, setisRedeemText] = useState(false);



    const [couponcode, setCouponcode] = useState('');
    const [redeem, setCouponRedeem] = useState<any>('');


    const [isValidCode, setValidCode] = useState(true);


    // TODO : MODAL UI
    let apiUrlPAY;

    const [isModalCANCELPAYSTRIPE, setModalCANCELPAYSTRIPE] = useState(false);
    const [isURLPAY, setISURLPAY] = useState<any>("https://rideshareandcourier.graphiglow.in/app/StripeWeb.php?userId=65b9e2f0eb9e0db05a70bb0b&amount=105");


    // STRIPE :
    const [isSTRIPEModal, setSTRIPEModal] = useState(false);
    const [isModalDriver, setModalDriver] = useState(false); // false
    const [isModalPAYCOMPLETE, setModalPAYCOMPLETE] = useState(false);


    const [maxRatingSubmit, setMaxRatingsubmit] = useState([1, 2, 3, 4, 5]);


    const [isModalCOUIERCANCEL, setModalCOUIERCANCEL] = useState(false);

    // PAY COMPLETE
    const [isLoyalPoints, setLoyalPoints] = useState<any>('');

    let user_point;


    const [isModalPAYFUL, setModalPAYFUL] = useState(false);

    let USER_PAY_STATUS;
    let USER_PAY_CARD;



    const [isModalDRIVER, setModalDRIVER] = useState(false);
    const [isURL1, setURL1] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL2, setURL2] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL3, setURL3] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL4, setURL4] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");


    const [isURL5, setURL5] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");

    const [isDriverName, setDriverName] = useState(ScreenText.UserName);
    const [isDriverPlateNumber, setDriverPlateNumber] = useState("GJ 06 MA 2500");
    const [isDriverPlateName, setDriverPlateName] = useState("Crash Test Dummy");
    const [isDriverVehicleType, setDriverVehicleType] = useState("Car");
    const [isDriverVehicleColor, setDriverVehicleColor] = useState("yellow");
    const [isSeats, setSeats] = useState("0");

    let averageRating;
    let numberOfRatings;
    let no_rate;

    const [isDriverVIN, setDriverVIN] = useState("583245");
    const [isDriverVehicleDesc, setDriverVehicleDesc] = useState(ScreenText.Loreum);



    const [isRated, setRated] = useState("0");

    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [defaultRating, setDefaultRating] = useState(0);

    const starImageFilled =
        Images.fillStarIcon;
    const starImageCorner =
        Images.unfillStarIcon;


    // TODO :
    let USER_DRIVEID;

    let USER_RIDE_CHARGE;
    let USER_CON_CHARGE;
    let USER_DISCOUNT;
    let USER_FARE_VALUE;
    let USER_TOTAL;

    let USER_RIDE_ID_;



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
    let _DISCOUNT;



    let USER_BOOKINGSTATUS;
    let USER_CANCELLATION;   // cancellation 

    let PER;
    let CAN;

    const [isGETPERCENTAGE, setGETPERCENTAGE] = useState("0");
    const [isCHARGE, setCHARGE] = useState("20");
    const [isTOTAL_AMOUNT, setTOTAL_AMOUNT] = useState("");

    const [isAmount, setIsAmount] = useState<any>("");

    const [isApplyNowBG, setApplyNowBG] = useState(true);
    const [isRedeemBG, setRedeemBG] = useState(true);

    //
    let CouponDiscount;
    let GetAsDiscount;
    let GetNewAmoount;
    //


    const [isRIDEID, setRIDEID] = useState("");
    const [isDATE_OF_RIDE, setDATE_OF_RIDE] = useState("");
    const [isPAYMEMT_TYPE, setPAYMEMT_TYPE] = useState("");
    const [isWATTING_CHARGES, setWATTING_CHARGES] = useState("");
    const [isPICK_UP_LOCATION, setPICK_UP_LOCATION] = useState("");
    const [isDROP_UP_LOCATION, setDROP_UP_LOCATION] = useState("");
    const [isVEHICAL, setVEHICAL] = useState("");
    const [isSERVICE_TYPE, setSERVICE_TYPE] = useState("");
    const [isFARE, setFARE] = useState("");


    const [isLoyalPointsDefault, setLoyalPointsDeafult] = useState<any>('');


    const [Default, setDefault] = useState("");



    const [isDRIVERNAME, setDRIVERNAME] = useState("");

    const [isDRIVERIDECHARGE, setDRIVERRIDECHARGE] = useState("");
    const [isDRIVERCONCHARGE, setDRIVERCONCHARGE] = useState("");
    const [isDRIVERDISCOUNT, setDRIVERDISCOUNT] = useState("");

    // TODO :


    let DriverBookingName;

    let DriverBookingImage1;
    let DriverBookingImage2;
    let DriverBookingImage3;
    let DriverBookingImage4;

    let DriverVehicleNumber;
    let DriverVehicleType;
    let DriverVehicleName;

    let DriverVehicleDecription;
    let DriverVehiclePhone;
    let DriverProfileImage;


    let DriverUserVIN;
    let DriverVehicleColor;
    let DriverNumberOfSeat;

    let Driver_id;


    const [isDURATION, setDURATION] = useState("");
    const [isDISTANCE, setDISTANCE] = useState("");

    // TODO : MODAL UI


    // Drop
    const [toggleArrivedDrop, setToggleArrivedDrop] = useState(false);
    const [toggleOTP, setToggleOTP] = useState(false);

    const [togglePaymentCompleted, setTogglePaymentCompleted] = useState(false);
    const [toggleRideCompleted, setToggleRideCompleted] = useState(false);
    const [toggleFeedBack, setToggleFeedBack] = useState(false);


    // Courier Delivered
    const [toggleDelivered, setToggleDelivered] = useState(false);


    // TODO : Modal 
    const [isModalFeedBack, setModalFeedBack] = useState(false);
    const [isModalCancel, setModalCancel] = useState(false);

    const [requestSentDate, setRequestSentDate] = useState(ScreenText.Date);
    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));
    const [isDriverOnTheWay, setDriverOnTheWay] = useState(false);


    // TODO :
    const [isFocusedFeedBack, setIsFocusedFeedBack] = useState(false);
    const refFeedBack = useRef<any>(null);
    const [isSecure, setSecure] = useState(true);
    const [feed, setFeed] = useState('')
    const [isValidFeed, setValidFeed] = useState(true);


    // is ArrivedOTP
    const [isPICKOTP, setPICKOTP] = useState('');
    const [isDROPOTP, setDROPOTP] = useState('');

    const [isDRIVERSTATUS, setDRIVERSTATUS] = useState('Courier Boy is On the Way');


    const [isRequestPayAcceptTime, setIsRequestPayAcceptTime] = useState('');


    const [isAccepted, setIsAccepted] = useState(true);
    const [isRequestAcceptTime, setIsRequestAcceptTime] = useState('');


    // DROP 
    const [toggleDropOTP, setToggleDropOTP] = useState(false);

    const [isArriedOTPDropDate, setIsArriedOTPDropDate] = useState('');
    const [isArriedTrueDropOTPDate, setIsArriedTrueDropOTPDate] = useState('');
    const [isArriedOTPDate, setIsArriedOTPDate] = useState('');
    const [isArriedTrueOTPDate, setIsArriedTrueOTPDate] = useState('');


    // TODO :
    const [isPaynow, setPaynow] = useState(true);
    const [isFeedback, setFeedback] = useState(true);

    const [isPICKSHARE, setPICKSHARE] = useState(true);
    const [isDROPSHARE, setDROPSHARE] = useState(true);
    const [isPhoneNumber, setPhoneNumber] = useState("");

    // TODO :


    let formattedDateLL;

    let statusCheack;
    let dateCheack;


    let BookingRequestTimeArrived;
    let PaymentStatusTimeArrived;


    let DropOTPArrived;
    let DropOTPStatusArrived;
    let DropOTPGenerateTimeArrived;



    let OTPGenerateTimeArrived;
    let OTPVerifyTimeArrived;

    let ArrivedOTP_GET_PICK;
    let ArrivedOTP_GET_DROP;

    let OTPVerify;
    let ArrivedOTPPICK;


    let PaymentStatusArrived;
    let RideStatusArrived;


    let OTPGenerated;

    let OTPGenerated_;

    let paymentStatus;
    let rideStatus;
    let OTPStatus;


    // Get Current Date
    const currentDate = moment();



    const onPressCallUser = () => {
        const phoneNumberWithPrefix = `tel:${isPhoneNumber}`;
        Linking.openURL(phoneNumberWithPrefix);
    }


    const toggleModalCancel = () => {
        setModalCancel(!isModalCancel);
    };

    const toggleModalFeedback = () => {
        setModalFeedBack(!isModalFeedBack);
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


    const onPressSubmit = () => {
        axiosPostRateDriverRequest(defaultRatingSubmit);
    }

    // working !
    const axiosPostRateDriverRequest = async (defaultRatingSubmit: any) => {

        console.log("axiosPostRateDriverRequest/////", defaultRatingSubmit);
        console.log("axiosPostRateDriverRequest/////", defaultRatingSubmit);
        console.log("axiosPostRateDriverRequest/////", defaultRatingSubmit);
        console.log("axiosPostRateDriverRequest/////", defaultRatingSubmit);
        console.log("axiosPostRateDriverRequest/////", defaultRatingSubmit);
        console.log("axiosPostRateDriverRequest/////", defaultRatingSubmit);

        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostRateDriverRequestConfirm(defaultRatingSubmit);
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    // working !
    const axiosPostRateDriverRequestConfirm = async (defaultRatingSubmit: any) => {

        const storedLinkedId = await AsyncStorage.getItem('user_register_id');
        const storedLinkedId_ = await AsyncStorage.getItem('store_driver_id');

        if (storedLinkedId !== null && storedLinkedId_ !== null) {

            // const url = 'https://rideshareandcourier.graphiglow.in/api/ratting/rateDriver';
            const url = `${API.BASE_URL}/ratting/rateDriver`; //todo

            // Prepare data in JSON format
            const data = {
                UserID: JSON.parse(storedLinkedId),
                DriverID: JSON.parse(storedLinkedId_),
                rating: defaultRatingSubmit
            };

            console.log("RateDriverData**000000==>", JSON.stringify(data, null, 2));

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 201
                        &&
                        response?.data?.message === 'Rating recorded successfully') {
                        // Handle API response here
                        // Vehicles Are

                        // console.log("BookingDataResponse==>",
                        //     JSON.stringify(response?.data?.matchingVehicles, null, 2));

                        // console.log("RateDriverData...==>", JSON.stringify(response, null, 2));

                        Toast.show('Rating Submitted Successfully!', Toast.SHORT);
                        // setModalDriver(false);

                        // Working !

                        // AFTER STRIPE :
                        // SET STRIPE MODAL :
                        // setSTRIPEModal(true)

                        // axiosPostRequestStripe();

                        // TODO : PAY SUCESSFUL

                        setModalPAYFUL(true);

                        // navigation.navigate('PaymentSuccessfulUp', { // Paysucess ui
                        //     itemSuccessfulAmount: isAmount,
                        // });

                        // TODO : PAY SUCESSFUL

                    } else {
                        Toast.show('Enabel To Submit Ratting!', Toast.SHORT);
                        // setModalDriver(false);
                        // setSTRIPEModal(true);
                        //  Welcome! Signed in successfully.
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Enabel To Submit Ratting!', Toast.SHORT);
                    // setModalDriver(false);
                    // setSTRIPEModal(true);
                });

        } else {
            Toast.show('Enabel To Submit Ratting!', Toast.SHORT);

            // setModalDriver(false);
            // setSTRIPEModal(true);

            // Payment Getway
            // id - amount
            // axiosPostRequestStripe();
        }
    };

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
                        setToggleFeedBack(true);///modaltodo
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
    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log("RIDE_ID_REQUEST00000.===>", route.params.itemRIDEID_SENT);

                // itemRIDER_ID_SENT

                console.log("RIDER_USER_ID_REQUEST1111.===>", route.params.itemRIDER_ID_SENT);

                // Pay Now
                console.log("itemRIDER_DISTANCE_SENT0000.===>", route.params.itemRIDER_DISTANCE_SENT);
                console.log("itemRIDER_DURATUION_SENT0000.===>", route.params.itemRIDER_DURATUION_SENT);

                // Added MapData
                console.log("itemPICK_STATION_SENT0000.===>", route.params.itemRIDER_PICKSTATION);
                console.log("itemDROP_STATION_SENT0000.===>", route.params.itemRIDER_DROPSTATION);

                // Payment
                console.log("itemRIDER_RIDE_CHARGE_SENT0000.===>", route.params.itemRIDER_RIDE_CHARGE);
                console.log("itemRIDER_RIDE_FEES_CON_SENT0000.===>",
                    route.params.itemRIDER_RIDE_FEES_CON);
                console.log("itemRIDER_RIDE_WAITING_CHARGES_SENT0000.===>",
                    route.params.itemRIDER_RIDE_WAITING_CHARGES);
                console.log("itemRIDER_RIDE_DICOUNT_SENT000.===>",
                    route.params.itemRIDER_RIDE_DICOUNT);
                console.log("itemRIDER_RIDE_TOTAL_AMOUNT_SENT000.===>",
                    route.params.itemRIDER_RIDE_TOTALAMOUNT);

                // // Get Current Date
                // const currentDate = moment();
                // formattedDateLL = currentDate.format('LLL'); // SelectDropofflocation

                // Get User In User Info
                await axiosGetRideStatusRequest();

                // PAY - 1
                await axiosPostRideDetailsRequest();
                await axiosPostDriverInfoRequest();
                await axiosGetRideRattingRequest();

                // LOYAL PONITS
                await axiosPostProfilDataGetInfo();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Set interval to refresh every 15 seconds
        const intervalId = setInterval(fetchData, 15 * 1000);

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

    useEffect(() => {
        // IF PICK OTP VERIFY THEN CALL AS STATE...
        if (toggleONE === true) {
            console.log(toggleONE);
            console.log(toggleONE);
            console.log(toggleONE);
            console.log(toggleONE);

            // setToggleArrivedDrop(true);
            // axiosRequestArrivedDROPOTP(); // 15 SEC CALL - WORKING TEST

        } else {
            // CALL DROP OTP - 2 API
            console.log("toggleONE", toggleONE);
            console.log("toggleONE", toggleONE);
            console.log("toggleONE", toggleONE);
            console.log("toggleONE", toggleONE);
            console.log("toggleONE", toggleONE);
        }
    }, [toggleONE]); // This effect depends on toggleONE, so it will re-run whenever toggleONE changes


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

        const type = await AsyncStorage.getItem('user_type');

        if (type !== null && storedLinkedId !== null) {

            // const url = 'https://rideshareandcourier.graphiglow.in/api/userInfo/userInfo';
            const url = `${API.BASE_URL}/userInfo/userInfo`;

            const data = {
                facebook_id: JSON.parse(storedLinkedId)
            };

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200 &&
                        response?.data?.message === 'User Information') {

                        user_point = response?.data?.matchingUsers[0]?.Point;
                        setLoyalPoints(user_point);

                    } else {
                        // Toast.show('User Information Credentials Invalid', Toast.SHORT);
                    }

                })
                .catch(error => {
                    // Handle errors
                    // Toast.show('User Information Credentials Invalid!', Toast.SHORT);
                });

        } else {

            // const url = 'https://rideshareandcourier.graphiglow.in/api/userInfo/userInfo';
            const url = `${API.BASE_URL}/userInfo/userInfo`;

            const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            if (storedLinkedId !== null && type == null) {
                const data = {
                    id: JSON.parse(storedLinkedId)
                };

                await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 200 &&
                            response?.data?.message === 'User Information') {

                            user_point = response?.data?.matchingUsers[0]?.Point;
                            setLoyalPoints(user_point);

                            // setRatedPerson("(" + user_name + ")");

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
                // const url = `https://rideshareandcourier.graphiglow.in/api/rattingCalculateDriver/calculateRating/${userId}`;
                const url = `${API.BASE_URL}/rattingCalculateDriver/calculateRating/${userId}`;

                console.log("URL_RATTING==>", JSON.stringify(url, null, 2));
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
                            // avg_username = response?.data?.ratings?.username;

                            no_rate = response?.data?.ratings?.numberOfRatings;
                            setRated(no_rate);

                            console.log("AVG_username*****===>", response?.data);

                            setDefaultRating(averageRating);


                            //  PHOTO // ADDED 

                            console.log("RESDATA===>",
                                JSON.stringify(averageRating, null, 2));
                            // Toast.show('Driver Ratings Get Success!', Toast.SHORT);

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

    const onPressModalCheckPayment = () => {

        // Payment Status Addded !
        axiosPostRideStatusAccepted();
    }

    const axiosPostRideStatusAccepted = async () => {

        // const url = 'https://rideshareandcourier.graphiglow.in/api/bookingPaymentStatus/bookingPayment';
        const url = `${API.BASE_URL}/bookingPaymentStatus/bookingPayment`;

        // Prepare data in JSON format
        const data = {
            // id: route.params.itemCompleteRideId,
            id: route.params.itemRIDER_ID_SENT,
            PaymentStatus: "Complete"
        };

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    &&
                    response?.data?.message === 'Payment Status changed successfully') {
                    // Handle API response here

                    // console.log("BookingDataResponse==>",
                    //     JSON.stringify(response?.data?.matchingVehicles, null, 2));

                    // console.log("RateDriverData...==>", JSON.stringify(response, null, 2));

                    // Toast.show('Status Completed!', Toast.SHORT);

                    axiosPostRideDetailsRequestCourier(); // CEHCK STATUS AS API

                    // setModalDriver(false);

                    // Working !

                    // AFTER STRIPE :
                    // SET STRIPE MODAL :
                    // setSTRIPEModal(true)

                    // axiosPostRequestStripe();

                    // navigation.navigate('PaymentSuccessful', {
                    //     itemSuccessfulAmount: route?.params?.itemCompleteTotalAmount,
                    // });  **no use**

                } else {
                    Toast.show('Enabel To Submit Ratting!', Toast.SHORT);
                    // setModalDriver(false);
                    // setSTRIPEModal(true);
                    //  Welcome! Signed in successfully.
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Enabel To Submit Ratting!', Toast.SHORT);
                // setModalDriver(false);
                // setSTRIPEModal(true);
            });

    }


    const axiosPostRideDetailsRequestCourier = async () => {
        // const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';
        const url = `${API.BASE_URL}/rideDetail/rideDetail`;

        // Prepare data in JSON format
        const data = {
            id: route.params.itemRIDER_ID_SENT //quick
        };

        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));


        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    && response?.data?.message === "Ride Details") {

                    console.log("Ride Details====>", JSON.stringify(response?.data, null, 2));

                    // Handle API response here
                    // Toast.show('Ride Details Get Successfully!', Toast.SHORT);

                    USER_PAY_STATUS = response?.data?.matchingVehicle?.PaymentStatus;
                    USER_PAY_CARD = response?.data?.matchingVehicle?.payment_type;

                    // USER_PAY_ID_ID = response?.data?.matchingVehicle?._id;

                    console.log("USER_PAY_STATUS", USER_PAY_STATUS);
                    console.log("USER_PAY_STATUS", USER_PAY_STATUS);

                    console.log("USER_PAY_CARD", USER_PAY_CARD);
                    console.log("USER_PAY_CARD", USER_PAY_CARD);


                    if (USER_PAY_STATUS == "Complete" && USER_PAY_CARD == "Card") {
                        // Alert.alert("Yes");

                        setSTRIPEModal(false);

                        setModalCANCELPAYSTRIPE(false);

                        setModalDriver(true);

                    } else {

                        Toast.show('Unable to Process Payment!', Toast.SHORT);
                    }


                    // stored id : todo
                    // StoredRideID(USER_RIDEID);

                    // console.log("RideDetails101===>",
                    //     JSON.stringify(response?.data?.matchingVehicle?.RideId, null, 2));

                } else {
                    // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
            });
    };

    const onPressCompletePaymentCancel = async () => {
        try {
            // GET TYPE HERE :
            const USER_PAY_TYPE = await AsyncStorage.getItem('store_pay_type');

            // Check if USER_PAY_TYPE is not null or undefined
            if (USER_PAY_TYPE !== null && USER_PAY_TYPE !== undefined) {
                const PAY_TYPE = JSON.parse(USER_PAY_TYPE);

                if (PAY_TYPE === "Cash Payment" || PAY_TYPE === "Wallet") {
                    axiosPostRideStatusAccepted1();
                } else {
                    setModalCANCELPAYSTRIPE(true);
                    axiosPostRequestStripe();
                }
            } else {
                // Handle case when USER_PAY_TYPE is null or undefined
                console.error("USER_PAY_TYPE is null or undefined.");
                // You might want to perform some fallback action here
            }
        } catch (error) {
            console.error("Error fetching USER_PAY_TYPE:", error);
            // Handle error
        }
    }


    const axiosPostRequestStripe = async () => {
        const storedLinkedId = await AsyncStorage.getItem('user_register_id');

        // USE RIDE ID AS STRIPE 
        const USER_RIDEIDID = await AsyncStorage.getItem('store_RIDEID');

        if (storedLinkedId !== null && USER_RIDEIDID !== null) {
            // const url = 'https://rideshareandcourier.graphiglow.in/api/webStriperedirect/stripeWeb';
            const url = `${API.BASE_URL}/webStriperedirect/stripeWeb`;

            // Prepare data in JSON format
            const data = {
                userId: JSON.parse(storedLinkedId),
                amount: isModalCOUIERCANCEL === true ? isGETPERCENTAGE : isAmount,
                rideId: JSON.parse(USER_RIDEIDID), // RIDE ID USE
            };

            console.log("PAYYYYY==>", JSON.stringify(data, null, 2));
            console.log("PAYYYYY==>", JSON.stringify(data, null, 2));
            console.log("PAYYYYY==>", JSON.stringify(data, null, 2));
            console.log("PAYYYYY==>", JSON.stringify(data, null, 2));
            console.log("PAYYYYY==>", JSON.stringify(data, null, 2));
            console.log("PAYYYYY==>", JSON.stringify(data, null, 2));

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200
                        &&
                        response?.data?.message === 'URL constructed successfully') {

                        console.log("ALLL----***RES===>",
                            JSON.stringify(response?.data?.data?.apiUrl, null, 2));

                        console.log("ALLL----***RES===>",
                            JSON.stringify(response?.data?.data?.apiUrl, null, 2));

                        // Get Payment URL :
                        apiUrlPAY = response?.data?.data?.apiUrl;

                        // setSTRIPEModal(true);
                        setISURLPAY(apiUrlPAY);

                        // Check Payment Complete OR Not ! - API CALL
                        // setModalDriver(true);

                        // axiosPostRequestBookingPaymentStatus()

                        // Get Link And Set In WebView

                    } else {
                        // Handle errors
                        Toast.show('Payment Failed!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Payment Failed!', Toast.SHORT);
                });

        } else {
            Toast.show('Payment Failed!', Toast.SHORT);
        }
    }

    const axiosPostRideStatusAccepted1 = async () => {

        // const url = 'https://rideshareandcourier.graphiglow.in/api/bookingPaymentStatus/bookingPayment';
        const url = `${API.BASE_URL}/bookingPaymentStatus/bookingPayment`;

        // Prepare data in JSON format
        const data = {
            // id: route.params.itemCompleteRideId,
            id: route.params.itemRIDER_ID_SENT,
            PaymentStatus: "Complete"
        };

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    &&
                    response?.data?.message === 'Payment Status changed successfully') {

                    axiosPostRideDetailsRequest1();

                } else {
                    Toast.show('Enabel To Submit Ratting!', Toast.SHORT);

                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Enabel To Submit Ratting!', Toast.SHORT);

            });

    }



    const onPressCompletePayment = async () => {
        try {
            // GET TYPE HERE :
            const USER_PAY_TYPE = await AsyncStorage.getItem('store_pay_type');

            // Check if USER_PAY_TYPE is not null or undefined
            if (USER_PAY_TYPE !== null && USER_PAY_TYPE !== undefined) {
                const PAY_TYPE = JSON.parse(USER_PAY_TYPE);

                if (PAY_TYPE === "Cash Payment" || PAY_TYPE === "Wallet") {
                    axiosPostRideStatusAccepted1();
                } else {
                    setSTRIPEModal(true);
                    axiosPostRequestStripe();
                }
            } else {
                // Handle case when USER_PAY_TYPE is null or undefined
                console.error("USER_PAY_TYPE is null or undefined.");
                // You might want to perform some fallback action here
            }
        } catch (error) {
            console.error("Error fetching USER_PAY_TYPE:", error);
            // Handle error
        }
    }


    const axiosPostRideDetailsRequest1 = async () => {
        // const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';
        const url = `${API.BASE_URL}/rideDetail/rideDetail`;

        // Prepare data in JSON format
        const data = {
            id: route.params.itemRIDER_ID_SENT //quick
        };

        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));
        console.log("ERRROROROOR===>===>", JSON.stringify(data, null, 2));


        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    && response?.data?.message === "Ride Details") {


                    console.log("Ride Details====>", JSON.stringify(response?.data, null, 2));

                    // Handle API response here
                    // Toast.show('Ride Details Get Successfully!', Toast.SHORT);

                    USER_PAY_STATUS = response?.data?.matchingVehicle?.PaymentStatus;
                    USER_PAY_CARD = response?.data?.matchingVehicle?.payment_type;

                    // USER_PAY_ID_ID = response?.data?.matchingVehicle?._id;

                    console.log("USER_PAY_STATUS", USER_PAY_STATUS);
                    console.log("USER_PAY_STATUS", USER_PAY_STATUS);

                    console.log("USER_PAY_CARD", USER_PAY_CARD);
                    console.log("USER_PAY_CARD", USER_PAY_CARD);

                    // && USER_PAY_CARD == "Card"

                    if (USER_PAY_STATUS == "Complete") {
                        setModalDriver(true);

                        // Alert.alert("Yes");
                        // setSTRIPEModal(false);
                        // setModalDriver(true);

                    } else {

                        Toast.show('Unable to Process Payment!', Toast.SHORT);
                    }


                    // stored id : todo
                    // StoredRideID(USER_RIDEID);

                    // console.log("RideDetails101===>",
                    //     JSON.stringify(response?.data?.matchingVehicle?.RideId, null, 2));

                } else {
                    // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
            });
    };

    const axiosUserPostDriverInfoRequest = async () => {

        const storedLinkedId = await AsyncStorage.getItem('store_driver_id'); // store_ride_id
        if (storedLinkedId !== null) {
            // const url = 'https://rideshareandcourier.graphiglow.in/api/driverInfo/driverInfo';
            const url = `${API.BASE_URL}/driverInfo/driverInfo`;

            // Prepare data in JSON format
            const data = {
                id: JSON.parse(storedLinkedId)
                // id: "6597c2783b2995084b012bf9"
            };

            console.log("DriverInfoData==>", JSON.stringify(data, null, 2));

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

                        DriverBookingName = response?.data?.matchingUsers[0]?.username;

                        DriverBookingImage1 = response?.data?.matchingUsers[0]?.vehicle_pictures1_Url;
                        DriverBookingImage2 = response?.data?.matchingUsers[0]?.vehicle_pictures2_Url;
                        DriverBookingImage3 = response?.data?.matchingUsers[0]?.vehicle_pictures3_Url;
                        DriverBookingImage4 = response?.data?.matchingUsers[0]?.vehicle_pictures4_Url;

                        DriverVehicleNumber = response?.data?.matchingUsers[0]?.Plate_number;
                        DriverVehicleType = response?.data?.matchingUsers[0]?.Vehicle_type;
                        DriverVehicleName = response?.data?.matchingUsers[0]?.Company_name;

                        DriverVehicleDecription = response?.data?.matchingUsers[0]?.Vehicle_Details;

                        DriverVehiclePhone = response?.data?.matchingUsers[0]?.mobilenumber;

                        DriverProfileImage = response?.data?.matchingUsers[0]?.ProfileImage;

                        DriverVehicleColor = response?.data?.matchingUsers[0]?.Vehicle_Color;


                        DriverUserVIN = response?.data?.matchingUsers[0]?.VINumber;


                        DriverNumberOfSeat = response?.data?.matchingUsers[0]?.NumberOfSeat;
                        setSeats(DriverNumberOfSeat);


                        // _id99
                        Driver_id = response?.data?.matchingUsers[0]?._id;
                        // Store for star : todo
                        StoredDriverID(Driver_id);



                        setDriverVIN(DriverUserVIN);

                        setDriverVehicleColor(DriverVehicleColor);


                        setURL5(DriverProfileImage);

                        setURL1(DriverBookingImage1);
                        setURL2(DriverBookingImage2);
                        setURL3(DriverBookingImage3);
                        setURL4(DriverBookingImage4);

                        setDriverName(DriverBookingName);

                        setDriverPlateNumber(DriverVehicleNumber);
                        setDriverPlateName(DriverVehicleName);
                        setDriverVehicleType(DriverVehicleType);
                        setDriverVehicleDesc(DriverVehicleDecription);

                        setPhoneNumber(DriverVehiclePhone);

                        console.log("Driver Name==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.username, null, 2));

                        console.log("Vehicle Image1==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.vehicle_pictures1_Url, null, 2));
                        console.log("Vehicle Image2==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.vehicle_pictures2_Url, null, 2));
                        console.log("Vehicle Image3==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.vehicle_pictures3_Url, null, 2));
                        console.log("Vehicle Image4==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.vehicle_pictures4_Url, null, 2));

                        console.log("Vehicle No==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.Plate_number, null, 2));
                        console.log("Vehicle Type==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.Company_name, null, 2));
                        console.log("Vehicle Name==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.Model_name, null, 2));

                        console.log("Vehicle Decription==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.Vehicle_Details, null, 2));

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


    const axiosPostRideDetailsRequest = async () => {
        // const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';
        const url = `${API.BASE_URL}/rideDetail/rideDetail`;

        // Prepare data in JSON format
        const data = {
            id: route.params.itemRIDER_ID_SENT
        };

        console.log("RideDetails===>", data);

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    && response?.data?.message === 'Ride Details') {
                    // Handle API response here
                    // Toast.show('Ride Details Get Successfully!', Toast.SHORT);

                    USER_DRIVEID = response?.data?.matchingVehicle?.DriverID;

                    // stored id : todo
                    StoredRideID(USER_DRIVEID);
                    console.log("RideDetails101===>",
                        JSON.stringify(response?.data?.matchingVehicle?.RideId, null, 2));

                    // TODO :
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


                    setDURATION(USER_RIDEDURATION);
                    setDISTANCE(USER_RIDEDISTANCE);


                    USER_BOOKINGSTATUS = response?.data?.matchingVehicle?.BookingCurrentStatus;
                    USER_CANCELLATION = response?.data?.matchingVehicle?.cancelationsAmount;


                    PER = USER_TOTAL_AMOUNT * USER_CANCELLATION / 100;

                    // cancelationsAmount
                    setGETPERCENTAGE(PER);

                    CAN = USER_TOTAL_AMOUNT - PER

                    setCHARGE(CAN);


                    // RideCharge
                    USER_RIDE_CHARGE = response?.data?.matchingVehicle?.RideCharge;
                    USER_CON_CHARGE = response?.data?.matchingVehicle?.BookingFeesConvenience;
                    USER_DISCOUNT = response?.data?.matchingVehicle?.Discount;

                    USER_FARE_VALUE = response?.data?.matchingVehicle?.farValues;

                    USER_RIDE_ID_ = response?.data?.matchingVehicle?._id;

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

                    // STORED AS LOCAL :
                    StoreDriverID(USER_DRIVEID);
                    StoreRideID(USER_RIDE_ID_);
                    StoreRideIDID(USER_RIDEID);
                    StorePayType(USER_PAYMEMT_TYPE);

                    // USER_DISCOUNT - NO USE
                    _DISCOUNT = USER_TOTAL_AMOUNT - USER_DISCOUNT;
                    setTOTAL_AMOUNT(_DISCOUNT); // ---- // 

                    // Complete UI 
                    setIsAmount(_DISCOUNT);

                    setFARE(USER_FARE_VALUE); // ADDED
                    // Discount  // ADDED
                    // Ride Charge
                    // Booking Fees

                    setDRIVERRIDECHARGE(USER_RIDE_CHARGE);
                    setDRIVERCONCHARGE(USER_CON_CHARGE);
                    setDRIVERDISCOUNT(USER_DISCOUNT);

                    // TODO :

                } else {
                    // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
            });
    };

    const StorePayType = async (USER_PAYMEMT_TYPE: any) => {
        try {
            await AsyncStorage.setItem('store_pay_type', JSON.stringify(USER_PAYMEMT_TYPE));
            console.log('store_pay_type===>', JSON.parse(USER_PAYMEMT_TYPE));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_pay_type :', error);
        }
    }


    const StoreRideIDID = async (USER_RIDEID: any) => {
        try {
            await AsyncStorage.setItem('store_RIDEID', JSON.stringify(USER_RIDEID));
            console.log('store_RIDEID===>', JSON.parse(USER_RIDEID));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_RIDEID :', error);
        }
    }

    const StoreDriverID = async (USER_DRIVER_ID: any) => {
        try {
            await AsyncStorage.setItem('store_driver_id', JSON.stringify(USER_DRIVER_ID));
            console.log('store_driver_id===>', JSON.parse(USER_DRIVER_ID));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_driver_id :', error);
        }
    }

    const StoreRideID = async (USER_RIDE_ID_: any) => {
        try {
            await AsyncStorage.setItem('store_ride_id_', JSON.stringify(USER_RIDE_ID_));
            console.log('store_ride_id_===>', JSON.parse(USER_RIDE_ID_));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_ride_id_ :', error);
        }
    }

    const StoredRideID = async (USER_RIDEID: any) => {
        try {
            await AsyncStorage.setItem('store_driver_id', JSON.stringify(USER_RIDEID));
            console.log('store_driver_id===>', JSON.parse(USER_RIDEID));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_driver_id :', error);
        }
    }


    const onPressAddPreferred = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostDataAddPreferredDriver();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostDataAddPreferredDriver = async () => {

        const storedLinkedId = await AsyncStorage.getItem('user_register_id');
        const storedDriverLinkedId = await AsyncStorage.getItem('store_driver_id');

        if (storedLinkedId !== null && storedDriverLinkedId != null) {
            // const url = 'https://rideshareandcourier.graphiglow.in/api/preferredDriverAdd/add';
            const url = `${API.BASE_URL}/preferredDriverAdd/add`;

            // Prepare data in JSON format
            const data = {
                UserID: JSON.parse(storedLinkedId),
                DriverID: JSON.parse(storedDriverLinkedId),
            };

            console.log("AddPreferredData==>", data);

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 201
                        &&
                        response?.data?.message === 'Preferred driver added successfully') {
                        // Handle API response here
                        // Vehicles Are

                        console.log("AddPreferredDataResponse==>",
                            JSON.stringify(response?.data, null, 2));

                        Toast.show('Preferred Driver Successfully Added!', Toast.SHORT);
                        navigation.goBack();

                    } else {
                        Toast.show('Already Preferred Driver Added!', Toast.SHORT);
                        //  Welcome! Signed in successfully.
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Already Preferred Driver Added!', Toast.SHORT);
                });
        } else {

        }
    };



    const onPressCancelCourier = () => {
        // Cancel Courier 
        axiosCancelCourierPostRequest();
    }

    const axiosCancelCourierPostRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosCancelCourierSurePostRequest();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosCancelCourierSurePostRequest = async () => {
        try {

            // const url = `https://rideshareandcourier.graphiglow.in/api/Cancelbooking/CancelBooking`
            const url = `${API.BASE_URL}/Cancelbooking/CancelBooking`;

            console.log("axiosCancelCourierSurePostRequest===>", url);

            // Prepare data in JSON format
            const data = {
                RideId: route?.params?.itemRIDEID_SENT
            };

            console.log("CancelCourierData=>=>", JSON.stringify(data, null, 2));


            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200
                        && response?.data?.message === 'Booking Successfully Cancelled') {

                        Toast.show('Your Courier has been Successfully Cancelled!', Toast.SHORT);

                        // TODO : As Modal  - CancelCourierDetailsMapPast
                        setModalCOUIERCANCEL(true);
                        // TODO :


                        // navigation.navigate("CancelCourierDetailsMapPast", {
                        //     itemBokingDetailsMapId: route.params.itemRIDER_ID_SENT,
                        //     itemBokingDetailsMapDistance: route.params.itemRIDER_DISTANCE_SENT,
                        //     itemBokingDetailsMapDuration: route.params.itemRIDER_DURATUION_SENT,

                        //     itemMapPickStation: route.params.itemRIDER_PICKSTATION,
                        //     itemMapDropStation: route.params.itemRIDER_DROPSTATION,

                        //     // itemMapKmStation: route?.params?.itemRIDER_DISTANCE_SENT,
                        //     // itemMapMinStation: route?.params?.itemRIDER_DURATUION_SENT,

                        //     itemMapRideCharge: route.params.itemRIDER_RIDE_CHARGE,
                        //     itemMapRideFeesCon: route.params.itemRIDER_RIDE_FEES_CON,
                        //     itemMapRideWattingCharges: route.params.itemRIDER_RIDE_WAITING_CHARGES,
                        //     itemMapRideDiscount: route.params.itemRIDER_RIDE_DICOUNT,
                        //     itemMapRideTotalAmount: route.params.itemRIDER_RIDE_TOTALAMOUNT,
                        // })

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

    const axiosCheckGetRideStatusRequest = async () => { //1103
        try {

            // const url = `https://rideshareandcourier.graphiglow.in/api/rideStatus/checkRide/${route.params.itemRIDEID_SENT}`
            const url = `${API.BASE_URL}/rideStatus/checkRide/${route.params.itemRIDEID_SENT}`;

            // AS COUIER 
            //const url = `https://rideshareandcourier.graphiglow.in/api/CourierStatus/checkCourier/${route.params.itemRIDEID_SENT}`
            // Y314WAGVFRKV

            console.log("axiosCheckGetRideStatusRequest11111===>", url);
            console.log("axiosCheckGetRideStatusRequest11111===>", url);
            console.log("axiosCheckGetRideStatusRequest2222===>", url);
            console.log("axiosCheckGetRideStatusRequest22222===>", url);


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
                        // rideStatus = response?.data?.matchingUsers?.RideStatus;

                        // TODO :
                        OTPStatus = response?.data?.matchingUsers?.OTP;

                        console.log("OTPStatus-1", OTPStatus);
                        console.log("OTPStatus-1", OTPStatus);
                        console.log("OTPStatus-1", OTPStatus);
                        console.log("OTPStatus-1", OTPStatus);


                        // TODO :
                        OTPGenerateTimeArrived = response?.data?.matchingUsers?.OTPGenerateTime;
                        OTPVerifyTimeArrived = response?.data?.matchingUsers?.OTPVerifyTime;

                        BookingRequestTimeArrived = response?.data?.matchingUsers?.BookingRequestTime;
                        PaymentStatusTimeArrived = response?.data?.matchingUsers?.PaymentStatusTime;

                        if (PaymentStatusTimeArrived !== null) {
                            setIsRequestPayAcceptTime(PaymentStatusTimeArrived);
                        } else {
                            setIsRequestPayAcceptTime('');
                        }


                        OTPVerify = response?.data?.matchingUsers?.ArrivedOTPStatus;
                        console.log("OTPVerify===>", OTPVerify);

                        ArrivedOTPPICK = response?.data?.matchingUsers?.ArrivedOTP;

                        console.log("ArrivedOTPPICK///===>", ArrivedOTPPICK);
                        console.log("ArrivedOTPPICK///===>", ArrivedOTPPICK);


                        console.log("paymentStatus===>", JSON.stringify(response?.data, null, 2));

                        PaymentStatusArrived = response?.data?.matchingUsers?.PaymentStatus;

                        RideStatusArrived = response?.data?.matchingUsers?.RideStatus;

                        // DROP 1 -2 - 3
                        DropOTPArrived = response?.data?.matchingUsers?.DropOTP;

                        console.log("DropOTPArrived-1", DropOTPArrived);
                        console.log("DropOTPArrived-1", DropOTPArrived);
                        console.log("DropOTPArrived-1", DropOTPArrived);
                        console.log("DropOTPArrived-1", DropOTPArrived);


                        DropOTPStatusArrived = response?.data?.matchingUsers?.DropOTPStatus;
                        DropOTPGenerateTimeArrived = response?.data?.matchingUsers?.DropOTPGenerateTime;

                        console.log("paymentStatus****===>", paymentStatus);

                        if (BookingRequestTimeArrived !== null) {
                            setIsRequestAcceptTime(BookingRequestTimeArrived);
                        } else {
                            setIsRequestAcceptTime('');
                        }
                        // DROP 


                        // if (DropOTPArrived == '') {
                        //     setDROPOTP("");
                        //     setToggleArrivedDrop(false);

                        // } else {
                        //     setDROPSHARE(false)
                        //     setDROPOTP(DropOTPArrived);
                        //     setToggleArrivedDrop(true);
                        //     // SHOW SHARE TEXT WITH

                        //     // Driver arrived your location
                        //     setDRIVERSTATUS("Driver Arrived Your Location");
                        // }

                        if (DropOTPArrived == '') {
                            setDROPOTP("");
                            setToggleArrivedDrop(false); //00 - 1

                            console.log("1-EMPTY");
                            console.log("1-EMPTY");
                            console.log("1-EMPTY");

                        } else {
                            setDROPOTP(DropOTPArrived); //last
                            setDROPSHARE(false);
                            setToggleArrivedDrop(true); //00 - 2

                            console.log("2-EMPTY");
                            console.log("2-EMPTY");
                            console.log("2-EMPTY");

                            // Driver arrived your location
                            setDRIVERSTATUS("Driver Arrived Your Location");
                        }

                        // PICK 
                        if (OTPStatus == '') {
                            setPICKOTP("");
                            setToggleArrived(false);

                        } else {
                            setToggleArrived(true);
                            setPICKSHARE(false)
                            setPICKOTP(OTPStatus);
                            // SHOW SHARE TEXT WITH

                            // Driver arrived your location
                            setDRIVERSTATUS("Driver Arrived Your Location");
                        }


                        // TODO :
                        if (DropOTPStatusArrived === "Pending") {
                            setToggleArrivedDrop(false);

                        } else if (DropOTPStatusArrived === "Verify") {

                            // OTP DROP VERFIFICATION :
                            setToggleDropOTP(true);
                            setToggleAccepted(true);
                            setPaynow(false);

                            // SET OTP GenerateTimeArrived
                            if (DropOTPGenerateTimeArrived !== null) {
                                setIsArriedOTPDropDate(OTPGenerateTimeArrived);
                            } else {
                                setIsArriedOTPDropDate(OTPGenerateTimeArrived);
                            }

                            if (DropOTPGenerateTimeArrived !== null) {
                                setIsArriedTrueDropOTPDate(OTPVerifyTimeArrived);
                            } else {
                                setIsArriedTrueDropOTPDate(OTPVerifyTimeArrived);
                            }

                        } else {
                            setToggleDropOTP(false);
                            setPaynow(true);
                            setDRIVERSTATUS("Driver Started Waiting Timer");
                        }

                        // TODO :



                        if (OTPVerify === "Pending") {
                            setToggleOTP(false);

                        } else if (OTPVerify === "Verify") {
                            setToggleOTP(true);
                            setToggleAccepted(true);

                            // setToggleArrivedDrop(true); // DROP 
                            // setToggleONE(true);

                            // CALL DROP OTP - 2 API
                            // axiosRequestArrivedDROPOTP(); // todo...

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
                            setPaynow(false);
                        }


                        if (RideStatusArrived === "Complete") {
                            setToggleDelivered(true);
                            setFeedback(false);
                            setDRIVERSTATUS("Ride Complete");
                        } else {
                            setToggleDelivered(false);
                        }


                        // 1
                        if (statusCheack === "Accept") {
                            console.log("GetStatus===>", statusCheack);

                            setToggleAccepted(true);
                            setIsAccepted(false);

                            // CALL OTP -1  GET API
                            // axiosRequestArrivedPICKOTP(); // 15 SEC CALL - WORKING TEST

                            // setToggleArrived(false);

                            // Booking Request Accepted
                            setDRIVERSTATUS("Courier Request Accepted");
                            setDRIVERSTATUS("Ride Started , Enjoy your ride");
                            setDRIVERSTATUS("Driver is On the Way");


                            setDriverOnTheWay(true);

                            //  Arrived OTP - 1 - WORKING TEST
                            //  axiosGetOTPPostRequest();

                            // Ride Started , Enjoy your ride
                            setDRIVERSTATUS("Ride Started , Enjoy your ride");


                        } else if (statusCheack === "Arrived") {
                            setToggleAccepted(true);
                            setIsAccepted(false);


                            // SET OTPGenerateTimeArrived
                            if (OTPGenerateTimeArrived !== null) {
                                setIsArriedOTPDate(OTPGenerateTimeArrived);
                            } else {
                                setIsArriedOTPDate(OTPGenerateTimeArrived);
                            }

                            setDRIVERSTATUS("Driver Arrived Your Location");

                        } else if (statusCheack === "RideStart") {
                            setToggleAccepted(true);
                            // setToggleDropOTP(true); // other  CALL TO CHECK
                            setIsAccepted(false);

                        } else if (statusCheack === "Complete") {
                            setToggleAccepted(true);
                            setIsAccepted(false);

                        } else {
                            // setToggleAccepted(false);
                            // Toast.show('Unable to Get Ride Status!', Toast.SHORT);
                        }

                        // // 2
                        // if (paymentStatus === "Done") {
                        //     setTogglePaymentCompleted(true);
                        // } else {
                        //     setTogglePaymentCompleted(false);
                        // }

                        // // 3
                        // if (rideStatus === "Completed") {
                        //     setDRIVERSTATUS("Courier Delivered");
                        //     setToggleRideCompleted(true);
                        //     setToggleDelivered(true)

                        //     // setToggleFeedBack(true);
                        // } else {
                        //     setToggleRideCompleted(false);
                        //     setToggleDelivered(false);
                        // }

                        // 4 - setToggleDelivered

                    } else {
                        setToggleAccepted(false);
                        Toast.show('Unable to Get Ride Status!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    setToggleAccepted(false);
                    Toast.show('Unable to Get Ride Status!', Toast.SHORT);
                });

        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    };


    const axiosRequestArrivedPICKOTP = async () => {
        try {
            const url = `https://rideshareandcourier.graphiglow.in/api/ArrivedOTPGenerate/ArrivedOTPgenerate`;

            const data = {
                id: route?.params?.itemRIDER_ID_SENT
            }

            console.log("_IIDIDIDIIDIDID===>", data);
            console.log("_IIDIDIDIIDIDID===>", data);
            console.log("_IIDIDIDIIDIDID===>", data);


            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200
                        && response?.data?.message === 'ArrivedOTP generated successfully') {

                        // GET OTP SET
                        ArrivedOTP_GET_PICK = response?.data?.OTP;
                        setPICKOTP(ArrivedOTP_GET_PICK);


                    } else {
                        Toast.show('Enabel To Generat OTP!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Enabel To Generat OTP!', Toast.SHORT);
                });


        } catch (error) {

        }
    }


    // 02
    const handleRedeem = (userredeem: any) => {
        setCouponRedeem(userredeem);
        if (userredeem.length < 1) {
            setIsFocusedRedeem(true);
            setValidRedeem(false)
        } else {
            setValidRedeem(true);
            setIsFocusedRedeem(false)
        }
    }

    const onPressCrossPoints = () => {
        setIsAmount(isAmount);
        setLoyalPointsDeafult("");

        setRedeemBG(true);
        setApplyRedeem(true);
        // setisApplyNowBtn(true);
        setisRedeemText(false);
        setIsFocusedRedeem(true);
    }

    const handleFocusRedeem = () => {
        setIsFocusedRedeem(true)
    }


    const onPressRedeem = () => {
        if (redeem.length < 1) {
            Toast.show('Enabel To Submit Redeem!', Toast.SHORT);
        } else {
            // Call Redeem API :
            axiosGetRedeemRequest();
        }

        // setRedeemBG(false);
        // setApplyRedeem(false);
        // setisRedeemBtn(true);
        // setisRedeemText(true);
    }

    const axiosGetRedeemRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosGetRedeemRequestCalculation();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }


    const axiosGetRedeemRequestCalculation = async () => {

        // GET REG ID
        const storedLinkedId = await AsyncStorage.getItem('user_register_id');
        if (storedLinkedId !== null) {

            // Prepare data in JSON format
            const data = {
                userId: JSON.parse(storedLinkedId), // 65c4bf726e435ad32b0e86ca
                // userId: "65c4bf726e435ad32b0e86ca",
                point: redeem, // USED
                amount: isAmount, // USER
                totalPoint: isLoyalPoints // TOTAL // //0909
            };

            console.log("RedeemCodeData***==>", JSON.stringify(data, null, 2));
            console.log("RedeemCodeData***==>", JSON.stringify(data, null, 2));
            console.log("RedeemCodeData***==>", JSON.stringify(data, null, 2));
            console.log("RedeemCodeData***==>", JSON.stringify(data, null, 2));
            console.log("RedeemCodeData***==>", JSON.stringify(data, null, 2));
            console.log("RedeemCodeData***==>", JSON.stringify(data, null, 2));

            // const url = 'https://rideshareandcourier.graphiglow.in/api/redeem/coin';
            const url = `${API.BASE_URL}/redeem/coin`;

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200
                        &&
                        response?.data?.message === 'You can use points') {

                        // Now Your Current Point 
                        // NowYourCurrentPoint = response?.data?.NowYourCurrentPoint;

                        // Toast.show('Redeem Points Applied Successfully!' + NowYourCurrentPoint, Toast.SHORT);

                        // Set Loyal Points - working !
                        // setLoyalPointsDeafult(isLoyalPoints * 0.10)

                        setLoyalPointsDeafult(redeem);

                        // Re Set Total Amount as Redeem - working !
                        // setIsAmount(isAmount - (isLoyalPoints * 0.10));
                        // isLoyalPointsDefault

                        setIsAmount(isAmount - (redeem * 0.10));

                        setRedeemBG(false);
                        setApplyRedeem(false);
                        setisRedeemBtn(true);
                        setisRedeemText(true);

                    } else {
                        Toast.show('Enabel To Submit Redeem!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Enabel To Submit Redeem!', Toast.SHORT);
                });
        } else {

        }


    }


    const onPressCross = () => {
        // setIsAmount(route.params.itemCompleteTotalAmount);
        setIsAmount(isAmount);
        setDefault("-5"); // ELSE

        setApplyNowBG(true);
        setApplyEdit(true);
        // setisApplyNowBtn(true);
        setisApplyNowText(false);
        setIsFocusedApplyNow(true);
    }


    const handleApplyNow = (usercouponcode: any) => {
        setCouponcode(usercouponcode);
        if (usercouponcode.length < 5) {
            setIsFocusedApplyNow(true);
            setValidCode(false);
        } else {
            setValidCode(true);
            setIsFocusedApplyNow(false)
        }
    }


    const handleFocusApplyNow = () => {
        setIsFocusedApplyNow(true)
    }

    const onPressApplyNow = () => {
        if (couponcode.length < 1) {
            Toast.show('Enabel To Submit Coupon!', Toast.SHORT);
        } else {
            // Call Coupon API :
            axiosGetCouponRequest();
        }
    }

    const axiosGetCouponRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosGetCouponRequestCalculation();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosGetCouponRequestCalculation = async () => {

        // Prepare data in JSON format
        const data = {
            CouponCode: couponcode,
        };
        console.log("CouponCodeData==>", JSON.stringify(data, null, 2));

        // const url = 'https://rideshareandcourier.graphiglow.in/api/couponCode/checkCoupon';
        const url = `${API.BASE_URL}/couponCode/checkCoupon`;

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    &&
                    response?.data?.message === 'Matching records found') {

                    console.log("CouponCodeDataAll==>", JSON.stringify(response?.data, null, 2));

                    CouponDiscount = response?.data?.matchingCodes?.Discount;

                    // CouponDiscount As Total  - route.params.itemCompleteTotalAmount
                    GetAsDiscount = isAmount * CouponDiscount / 100;

                    console.log("GetAsDiscount", GetAsDiscount);
                    console.log("GetAsDiscount", GetAsDiscount);
                    console.log("GetAsDiscount", GetAsDiscount);
                    setDefault(GetAsDiscount);

                    // SET AFTER AMOUNT
                    GetNewAmoount = isAmount - GetAsDiscount
                    setIsAmount(GetNewAmoount)

                    // Handle API response here
                    Toast.show('Coupon Applied Successfully!', Toast.SHORT);

                    setApplyNowBG(false);
                    setApplyEdit(false);
                    setisApplyNowBtn(true);
                    setisApplyNowText(true);

                } else {
                    Toast.show('Enabel To Submit Coupon!', Toast.SHORT);
                    //  Welcome! Signed in successfully.
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Enabel To Submit Coupon!', Toast.SHORT);
            });

    }



    const STOREPICK = async (ArrivedOTP_GET_PICK: any) => {
        try {
            await AsyncStorage.setItem('user_pick_otp', JSON.stringify(ArrivedOTP_GET_PICK));
            console.log('user_pick_otp===>', JSON.stringify(ArrivedOTP_GET_PICK));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_pick_otp :', error);
        }
    }

    const axiosRequestArrivedCHECK = async () => {

        try {

            const url = "https://rideshareandcourier.graphiglow.in/api/verifyArrivedOTP/otp";

            const storedPickOTP = await AsyncStorage.getItem('user_pick_otp');

            if (storedPickOTP !== null) {
                const data = {
                    id: route?.params?.itemRIDER_ID_SENT,
                    otp: JSON.parse(storedPickOTP)
                }

                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);
                console.log("000000000000000===>", data);



                await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 200
                            && response?.data?.message === 'Ride Completed') {

                            setDROPOTP('123456');

                            if (isDROPOTP !== null) {
                                setTogglePaymentCompleted(true);
                                setToggleDelivered(true);
                            } else {
                                setTogglePaymentCompleted(false);
                                setToggleDelivered(false);
                            }

                            // Toast.show('OTP PICK - Verfiy!', Toast.SHORT);

                        } else {
                            Toast.show('Enabel To Generat OTP!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Handle errors
                        Toast.show('Enabel To Generat OTP!', Toast.SHORT);
                    });
            } else {

            }


        } catch (error) {

        }
    }


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

    //                     // setToggleOTP(true); // auto true

    //                     // // Call Other OTP API 
    //                     // if (toggleOTP === true) {
    //                     //     axiosGetOTPPostRequestSendDrop();

    //                     // } else {
    //                     //     Toast.show('Enabel To Generat OTP!', Toast.SHORT);
    //                     // }

    //                     // axiosGetOTPPostRequestSendDrop();

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

    // const axiosGetOTPPostRequestSendDrop = async () => {
    //     try {
    //         setToggleOTP(true); // auto true
    //         setToggleArrivedDrop(true)

    //         const url = `https://rideshareandcourier.graphiglow.in/api/otpGenerate/generateOTP`;

    //         console.log("URL_RATTING==>", JSON.stringify(url, null, 2));

    //         const data = {
    //             id: route?.params?.itemRIDER_ID_SENT
    //         }

    //         console.log("DROP_SEND==>", JSON.stringify(data, null, 2));

    //         await axios.post(url, data, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //             .then(response => {
    //                 if (response.status === 200
    //                     && response?.data?.message === 'OTP generated successfully, status updated to Arrived') {

    //                     // GET OTP FROM API99
    //                     OTPGenerated_ = response?.data?.OTP;
    //                     console.log("OTPGenerated==>", OTPGenerated_);

    //                     Toast.show('Generat OTP Successfully!', Toast.SHORT);
    //                     setDROPOTP(OTPGenerated_);

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


    const axiosRequestArrivedDROPOTP = async () => {
        try {
            const url = `https://rideshareandcourier.graphiglow.in/api/ArrivedOTPGenerate/ArrivedOTPgenerate`;

            const data = {
                id: route?.params?.itemRIDER_ID_SENT
            }
            console.log("_IIDIDIDIIDIDID===>", data);

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200
                        && response?.data?.message === 'ArrivedOTP generated successfully') {

                        // GET OTP SET
                        ArrivedOTP_GET_DROP = response?.data?.ArrivedOTP;
                        setDROPOTP(ArrivedOTP_GET_DROP);

                    } else {
                        Toast.show('Enabel To Generat OTP!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Enabel To Generat OTP!', Toast.SHORT);
                });


        } catch (error) {

        }

    }

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />

            <Modal
                isVisible={isModalVisibleREQ}

                swipeDirection={[]} // Disables swiping
                style={Styles.viewModalMargin}>

                <View style={Styles.container}>

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
                            titleWithRightContent={"Cancel Courier?"}
                            title={"Courier Status"}
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
                                    title={currentDate.format('LLL')} // as request accept
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
                onPress={() => props.navigation.navigate("ViewRequest")}
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
                                    textAlign='center'
                                />
                                <TextComponent
                                    color={Colors.gray}
                                    // title={ScreenText.Date}
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
                                    color={Colors.orange} /******///1
                                    title={isAccepted ? "" : ScreenText.ViewCourierboy} //99
                                    // title={ScreenText.ViewCourierboy} // View courier boy
                                    textDecorationLine={'underline'}
                                    onPress={() => setModalDRIVER(true)}
                                    // onPress={() =>
                                    //     navigation.navigate("CourierPreferredDriverPast", {
                                    //         itemRider_ID_: route.params.itemRIDER_ID_SENT
                                    //     })
                                    // }
                                    //onPress={() => setInnerModalVisible(true)}
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
                                    title={ScreenText.DriverArrivedPickuplocation}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    marginVertical={wp(0)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.gray}
                                    // title={ScreenText.Date}
                                    title={isArriedOTPDate}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3)}
                                    marginVertical={wp(0)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={{ justifyContent: 'center', flex: 1 }}>
                                <TextComponent
                                    color={Colors.white}
                                    title={isPICKOTP}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(4.5)}
                                    marginVertical={wp(0)}
                                    marginLeft={wp(2)}
                                    textAlign='right'
                                    fontFamily={Fonts.PoppinsRegular}
                                />

                                <TextComponent
                                    color={Colors.gray}
                                    // title={ScreenText.OTPShareWithCourierBoy}
                                    title={isPICKSHARE ? "" : ScreenText.OTPShareWithCourierBoy}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3)}
                                    marginVertical={wp(0)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='right'
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
                                    title={ScreenText.OTPVerificationPick}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    marginVertical={wp(0)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='center'
                                />
                                <TextComponent
                                    color={Colors.gray}
                                    // title={ScreenText.Date}
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

                        <View style={{ flexDirection: "row" }}>

                            <View style={{ justifyContent: 'center' }}>
                                <CheckBox
                                    onCheckColor={'white'}
                                    onFillColor={'blue'}
                                    boxType="square"
                                    disabled={true}
                                    tintColors={{ true: Colors.blue, false: Colors.white }}
                                    value={toggleArrivedDrop}
                                    onValueChange={(newValue) => setToggleArrivedDrop(newValue)}
                                />
                            </View>

                            <View>
                                <TextComponent
                                    color={Colors.white}
                                    title={ScreenText.DriverArrivedDropOfflocation}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    marginVertical={wp(0)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.gray}
                                    // title={ScreenText.Date}
                                    title={isArriedOTPDropDate}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3)}
                                    marginVertical={wp(0)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={{ justifyContent: 'center', flex: 1 }}>
                                <TextComponent
                                    color={Colors.white}
                                    title={isDROPOTP}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(4.5)}
                                    marginVertical={wp(0)}
                                    marginLeft={wp(2)}
                                    textAlign='right'
                                    fontFamily={Fonts.PoppinsRegular}
                                />

                                <TextComponent
                                    color={Colors.gray}
                                    // title={ScreenText.OTPShareWithCourierBoy}
                                    title={isDROPSHARE ? "" : ScreenText.OTPShareWithCourierBoy}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3)}
                                    marginVertical={wp(0)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='right'
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
                                    value={toggleDropOTP}
                                    onValueChange={(newValue) => setToggleOTP(newValue)}
                                />
                            </View>

                            <View>
                                <TextComponent
                                    color={Colors.white}
                                    title={ScreenText.OTPVerificationDrop}
                                    // title={isArriedTrueOTPDate}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    marginVertical={wp(0)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.gray}
                                    // title={route?.params?.itemDateBookingSent}
                                    title={isArriedTrueDropOTPDate}
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
                                    textAlign='center'
                                />
                                <TextComponent
                                    color={Colors.gray}
                                    // title={ScreenText.Date}
                                    title={isRequestPayAcceptTime}
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
                title={ScreenText.PayNow}
                textDecorationLine={'underline'}
                fontWeight="400"
                fontSize={wp(3.5)}
                marginVertical={wp(0)}
                fontFamily={Fonts.PoppinsRegular}
                textAlign='right'
            />
        </View> */}


                            <View style={{ flex: 1 }}>
                                <TextComponent
                                    color={Colors.orange}
                                    title={isPaynow ? "" : ScreenText.PayNow}
                                    textDecorationLine={'underline'} // BookingDetailsMap---1
                                    onPress={() => {
                                        console.log({
                                            itemBokingDetailsMapId: route.params.itemRIDER_ID_SENT,
                                            itemBokingDetailsMapDistance: route.params.itemRIDER_DISTANCE_SENT,
                                            itemBokingDetailsMapDuration: route.params.itemRIDER_DURATUION_SENT,
                                            itemMapPickStation: route.params.itemRIDER_PICKSTATION,
                                            itemMapDropStation: route.params.itemRIDER_DROPSTATION,
                                            itemMapRideCharge: route.params.itemRIDER_RIDE_CHARGE,
                                            itemMapRideFeesCon: route.params.itemRIDER_RIDE_FEES_CON,
                                            itemMapRideWattingCharges: route.params.itemRIDER_RIDE_WAITING_CHARGES,
                                            itemMapRideDiscount: route.params.itemRIDER_RIDE_DICOUNT,
                                            itemMapRideTotalAmount: route.params.itemRIDER_RIDE_TOTALAMOUNT,
                                        });
                                        navigation.navigate("BookingDetailsMapUp", {
                                            itemBokingDetailsMapId: route.params.itemRIDER_ID_SENT,
                                            itemBokingDetailsMapDistance: route.params.itemRIDER_DISTANCE_SENT,
                                            itemBokingDetailsMapDuration: route.params.itemRIDER_DURATUION_SENT,
                                            itemMapPickStation: route.params.itemRIDER_PICKSTATION,
                                            itemMapDropStation: route.params.itemRIDER_DROPSTATION,
                                            itemMapRideCharge: route.params.itemRIDER_RIDE_CHARGE,
                                            itemMapRideFeesCon: route.params.itemRIDER_RIDE_FEES_CON,
                                            itemMapRideWattingCharges: route.params.itemRIDER_RIDE_WAITING_CHARGES,
                                            itemMapRideDiscount: route.params.itemRIDER_RIDE_DICOUNT,
                                            itemMapRideTotalAmount: route.params.itemRIDER_RIDE_TOTALAMOUNT,
                                        });
                                    }}
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
                                    value={toggleDelivered}
                                    onValueChange={(newValue) => setToggleDelivered(newValue)}
                                />
                            </View>

                            <View>
                                <TextComponent
                                    color={Colors.white}
                                    title={ScreenText.CourierDelivered}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    marginVertical={wp(0)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />

                                <TextComponent
                                    color={Colors.gray}
                                    // title={ScreenText.Date}
                                    title={isRequestPayAcceptTime}
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
                                    // title={ScreenText.Date}
                                    title={toggleFeedBack ? currentDate.format('LLL') : ""}
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
                                    // title={ScreenText.Feedback}
                                    title={isFeedback ? "" : ScreenText.Feedback}
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
                                    title={ScreenText.FeedbackRequest_}
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
                                    isRightArrow={false}
                                    onPress={onPressCancelCourier}
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

                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>

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
                                            title={isDRIVERSTATUS == "Courier Delivered" ? "Pay Now" : "View On Map"}
                                            textDecorationLine={'underline'}
                                            onPress={() =>

                                                isDRIVERSTATUS ==

                                                    "Courier Delivered" ?
                                                    navigation.navigate('CourierRequestDriverPast', {
                                                        itemCompleteMapId: route.params.itemRIDER_ID_SENT,

                                                        itemCompleteDistance: route?.params?.itemRIDER_DISTANCE_SENT,
                                                        itemCompleteDuration: route?.params?.itemRIDER_DURATUION_SENT,

                                                        itemCompletePickStation: route.params.itemRIDER_PICKSTATION,
                                                        itemCompleteDropStation: route.params.itemRIDER_DROPSTATION,

                                                        itemCompleteRideCharge: route.params.itemRIDER_RIDE_CHARGE,
                                                        itemCompleteRideFeesCon: route.params.itemRIDER_RIDE_FEES_CON,
                                                        itemCompleteRideWattingCharges: route.params.itemRIDER_RIDE_WAITING_CHARGES,
                                                        itemCompleteRideDiscount: route.params.itemRIDER_RIDE_DICOUNT,
                                                        itemCompleteTotalAmount: route.params.itemRIDER_RIDE_TOTALAMOUNT,
                                                    })
                                                    : navigation.navigate('CourierRequestAcceptedPast', {

                                                        itemBokingDetailsMapId: route.params.itemRIDER_ID_SENT,
                                                        // itemBokingDetailsMapDistance: route.params.itemRIDER_DISTANCE_SENT,
                                                        // itemBokingDetailsMapDuration: route.params.itemRIDER_DURATUION_SENT,

                                                        itemMapPickStation: route.params.itemRIDER_PICKSTATION,
                                                        itemMapDropStation: route.params.itemRIDER_DROPSTATION,

                                                        itemMapKmStation: route?.params?.itemRIDER_DISTANCE_SENT,
                                                        itemMapMinStation: route?.params?.itemRIDER_DURATUION_SENT,

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


                    {/* <View style={{ margin: 0 }}>
                        <Modal
                            isVisible={isInnerModalVisible}
                            onBackButtonPress={() => setInnerModalVisible(false)}
                            onBackdropPress={() => setInnerModalVisible(false)}>
                            <View style={{
                                flex: 1,
                                backgroundColor: 'white',
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 15
                                }}>This is the Inner Modal</Text>
                            </View>
                        </Modal>
                    </View> */}



                </View>



            </Modal>

            <Modal
                isVisible={isModalDRIVER}
                animationIn="slideInLeft"  // Specify the animation for entering the screen
                style={Styles.viewModalMargin}
                onBackdropPress={() => setModalDRIVER(false)}
                onBackButtonPress={() => setModalDRIVER(false)}>

                <ScrollView style={Styles.container}
                    showsVerticalScrollIndicator={false}>
                    <View style={Styles.container}>

                        <View style={Styles.viewHeader}>
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
                                fontWeight="500" // Courier Boy Details
                                title={"Courier Boy Details"} // Driver Details
                                fontSize={wp(4)}
                                onPress={() => setModalDRIVER(false)}
                            />
                        </View>

                        <View>
                            <View
                                style={Styles.bottamClickContain}>

                                <View style={CommonStyle.justifyContent}>
                                    <Image
                                        style={Styles.imageStop}
                                        resizeMode="contain" // Images.driverDeatilsIcon
                                        source={{ uri: isURL5 }} />
                                </View>

                                <View style={{
                                    flex: 1
                                }}>
                                    <TextComponent
                                        color={Colors.white}
                                        title={isDriverName}
                                        textDecorationLine={'none'}
                                        fontWeight="500"
                                        fontSize={wp(3.5)}
                                        marginVertical={wp(3)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        textAlign='left'
                                    />
                                    <View>

                                        <View style={CommonStyle.justifyContent}>
                                            <TextComponent
                                                color={Colors.gray}
                                                title={"Top Rated " + "(" + isRated + "K" + ")"}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(3.5)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                textAlign='left'
                                            />
                                        </View>

                                        <View>
                                            <View style={Styles.customRatingBarStyle}>
                                                {maxRating.map((item, key) => {
                                                    return (
                                                        <View style={CommonStyle.commonRow}>
                                                            <TouchableOpacity
                                                                activeOpacity={0.7}
                                                                key={item}
                                                                disabled={true}
                                                                onPress={() => setDefaultRating(item)}>
                                                                <Image
                                                                    style={Styles.starImageStyle1}
                                                                    source={
                                                                        item <= defaultRating
                                                                            ? starImageFilled
                                                                            : starImageCorner
                                                                    }
                                                                />
                                                            </TouchableOpacity>
                                                        </View>

                                                    );
                                                })}

                                            </View>
                                        </View>

                                    </View>

                                </View>

                                <View style={{
                                    // flex: 1
                                }}>
                                    <TouchableOpacity onPress={onPressCallUser}>
                                        <Image
                                            style={Styles.imageCall}
                                            resizeMode="contain"
                                            source={Images.callIcon} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={ScreenText.VehiclePhotos}
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(3.5)}
                                marginHorizontal={wp(5)}
                                marginVertical={wp(3)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        {/* <View>
                        <VehiclePhotosListDetails
                            data={CarData} />
                    </View> */}

                        <View style={{ flexDirection: 'row' }}>
                            <ScrollView horizontal
                                showsHorizontalScrollIndicator={false}>
                                <View>
                                    <Image
                                        style={Styles.carImageIcon}
                                        resizeMode="cover"
                                        source={{ uri: isURL1 }} />
                                </View>
                                <View>
                                    <Image
                                        style={Styles.carImageIcon}
                                        resizeMode="cover"
                                        source={{ uri: isURL2 }} />
                                </View>
                                <View>
                                    <Image
                                        style={Styles.carImageIcon}
                                        resizeMode="cover"
                                        source={{ uri: isURL3 }} />
                                </View>
                                <View>
                                    <Image
                                        style={Styles.carImageIcon}
                                        resizeMode="cover"
                                        source={{ uri: isURL4 }} />
                                </View>
                            </ScrollView>

                        </View>


                        <View style={Styles.viewGrayLineHorizontal}>
                        </View>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={ScreenText.Details}
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(3.5)}
                                marginHorizontal={wp(5)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='left'
                            />
                        </View>

                        <View>

                            <View style={Styles.viewSeprateLine3}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Vehicle Name"}
                                    marginVertical={wp(1)}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.grayFull}
                                    title={isDriverPlateName}
                                    marginVertical={wp(1)}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewSeprateLine3}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Vehicle Color"}
                                    textDecorationLine={'none'}
                                    marginVertical={wp(1)}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.grayFull}
                                    title={isDriverVehicleColor}
                                    marginVertical={wp(1)}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewSeprateLine3}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Vehicle Type"}
                                    marginVertical={wp(1)}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.grayFull}
                                    title={isDriverVehicleType}
                                    marginVertical={wp(1)}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewSeprateLine3}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Vehicle No."}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.grayFull}
                                    title={isDriverPlateNumber}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewSeprateLine3}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Seats"}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.grayFull}
                                    title={isSeats}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewSeprateLine3}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"VIN number"}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.grayFull}
                                    title={isDriverVIN}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                        </View>

                        <View style={Styles.viewLoreumText}>
                            <TextComponent
                                color={Colors.white}
                                title={isDriverVehicleDesc}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <View style={CommonStyle.commonJustifyContent}>
                            <ButtonComponent
                                isVisibleMobile={false}
                                isVisibleFaceBook={false}
                                marginVertical={hp(1)}
                                heightBtn={hp(7)}
                                isVisibleAddHeart={true}
                                widthBtn={wp(90)}
                                isRightArrow={false}
                                color={Colors.white}
                                title={ScreenText.AddDriverList}
                                marginHorizontal={wp(2)}
                                fontWeight="600"
                                fontSize={wp(4)}
                                onPress={onPressAddPreferred}
                                fontFamily={Fonts.PoppinsSemiBold}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                backgroundColor={Colors.blue}
                            />

                        </View>

                    </View>
                </ScrollView>

            </Modal>

            <Modal
                isVisible={isModalCOUIERCANCEL}
                animationIn="slideInLeft"  // Specify the animation for entering the screen
                style={Styles.viewModalMargin}
                onBackdropPress={() => setModalCOUIERCANCEL(false)}
                onBackButtonPress={() => setModalCOUIERCANCEL(false)}>
                <ScrollView
                    bounces={true}
                    overScrollMode="always">
                    <View style={CommonStyle.commonFlex}>
                        <View style={Styles.viewHeader_}>
                            <HeaderComponent
                                margin={wp(3)}
                                backgroundColorOpacity={Colors.circleGray}
                                borderRadiusOpacity={hp(8)}
                                paddingOpacity={wp(2.5)}
                                transform={[{ rotate: '180deg' }]}
                                textAlign={"left"}
                                source={Images.arrowRight}
                                marginTop={wp(2)}
                                width={wp(7)}
                                height={wp(7)} // 7
                                marginHorizontal={wp(5)}
                                color={Colors.white}
                                fontFamily={Fonts.InterSemiBold}
                                fontWeight="500"
                                title={"Payment"}
                                isVisiblePayout={false}
                                fontSize={wp(4)}
                                onPress={() => navigation.goBack()}
                            />


                        </View>
                        <View style={Styles.viewRowContent}>

                            <View style={Styles.viewKMConatiner}>
                                <View style={Styles.rowSpace}>
                                    <View style={CommonStyle.justifyContent}>
                                        <TextComponent
                                            color={Colors.white}
                                            // title={route?.params?.itemBokingDetailsMapDuration}
                                            title={isDISTANCE}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            marginHorizontal={wp(2)}
                                            marginVertical={wp(1)}
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            textAlign='center'
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            title={"Distance"}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            marginHorizontal={wp(2)}
                                            marginVertical={wp(1)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={Styles.viewSeprateLine}>
                                    </View>

                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            // title={route?.params?.itemBokingDetailsMapDistance}
                                            title={isDURATION}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            marginHorizontal={wp(2)}
                                            marginVertical={wp(1)}
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            textAlign='center'
                                        />
                                        <TextComponent
                                            color={Colors.gray}
                                            title={"Duration"}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            marginHorizontal={wp(2)}
                                            marginVertical={wp(1)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                </View>
                            </View>


                            <View style={CommonStyle.commonRow}>
                                <View style={CommonStyle.commonContent}>

                                    <Image
                                        style={Styles.viewOrangeDot}
                                        resizeMode="contain"
                                        source={Images.blueDot} />

                                    <View style={Styles.lineVerticalLine1} />
                                    <View style={Styles.lineVerticalLine4} />
                                    <View style={Styles.lineVerticalLine3} />

                                    <Image
                                        style={Styles.viewOrangeDot}
                                        resizeMode="contain"
                                        source={Images.orangeDot} />
                                </View>
                                <View>
                                    <TextComponent
                                        color={Colors.gray}
                                        title={isPICK_UP_LOCATION}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(2)}
                                        marginVertical={wp(1)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='left'
                                    />
                                    <TextComponent
                                        color={Colors.gray}
                                        title={isDROP_UP_LOCATION}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(2)}
                                        marginVertical={wp(1)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='left'
                                    />
                                </View>
                            </View>

                            <View style={Styles.viewSeprateLine2}>
                            </View>

                            <View>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Payment"}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    marginHorizontal={wp(2)}
                                    marginVertical={wp(1)}
                                    fontFamily={Fonts.PoppinsSemiBold}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewSeprateLine3_}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Courier Booking  Charge"}
                                    marginVertical={wp(3)}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.grayFull}
                                    title={"$ " + isDRIVERIDECHARGE}
                                    marginVertical={wp(3)}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewSeprateLine3_}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Bookings Fees & Convenience Charges"}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.grayFull}
                                    title={"$ " + isDRIVERCONCHARGE}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewSeprateLine3_}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Waiting Charge"}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    marginVertical={wp(3)}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.grayFull}
                                    title={"$   " + isWATTING_CHARGES}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    marginVertical={wp(3)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewSeprateLine3_}>
                                <TextComponent
                                    color={Colors.discount}
                                    title={"Discount"}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    marginVertical={wp(3)}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.discount}
                                    title={"-$ " + isDRIVERDISCOUNT}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    marginVertical={wp(3)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewSeprateLine2}>
                            </View>

                            <View style={Styles.viewSeprateLine3_}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Total Amount"}
                                    marginVertical={wp(1)}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    fontFamily={Fonts.PoppinsSemiBold}
                                    textAlign='left'
                                />
                                <TextComponent
                                    color={Colors.white}
                                    title={"$   " + isTOTAL_AMOUNT}
                                    marginVertical={wp(1)} // 3
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    fontFamily={Fonts.PoppinsSemiBold}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewSeprateLine3_}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Inclusive of Taxes"}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View>
                                <View style={Styles.viewSeprateLine3_}>
                                    <TextComponent
                                        color={Colors.discount}
                                        title={"cancellation "}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        marginVertical={wp(3)}
                                        textAlign='left'
                                    />
                                    <TextComponent
                                        color={Colors.discount}
                                        title={USER_BOOKINGSTATUS = "Cancel" ? "-$ " + isCHARGE : "$ " + "20"}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        marginVertical={wp(3)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='left'
                                    />
                                </View>
                                <View style={Styles.viewSeprateLine3_}>
                                    <TextComponent
                                        color={Colors.white}
                                        title={"cancellation charges"}
                                        marginVertical={wp(1)}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(4)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        textAlign='left'
                                    />
                                    <TextComponent
                                        color={Colors.white}
                                        title={USER_BOOKINGSTATUS = "Cancel" ? "$ " + isGETPERCENTAGE : "$ " + "5"}
                                        marginVertical={wp(0)} // 3
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(4)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        textAlign='left'
                                    />
                                </View>
                                <View style={Styles.viewSeprateLine3_}>
                                    <TextComponent
                                        color={Colors.white}
                                        title={"*cancellation policy"}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        marginVertical={wp(0)}
                                        textAlign='left'
                                    />
                                </View>
                            </View>


                            <View>
                                <ButtonComponent
                                    isVisibleMobile={false}
                                    isVisibleFaceBook={false}
                                    marginVertical={hp(3)}
                                    heightBtn={hp(7)}
                                    widthBtn={wp(90)}
                                    isRightArrow={false} // setModalPAYFUL(true)
                                    // onPress={() => setModalPAYCOMPLETE(true)}
                                    onPress={() => setModalPAYCOMPLETE(true)}
                                    // onPress={onPressCompletePaymentCancel}
                                    // onPress={() =>
                                    //     navigation.navigate('PaymentSuccessful', {
                                    //         // itemSuccessfulAmount: route?.params?.itemCompleteTotalAmount,
                                    //         itemSuccessfulAmount: isGETPERCENTAGE,
                                    //     })
                                    // }
                                    color={Colors.white}
                                    title={ScreenText.PayNow}
                                    marginHorizontal={wp(2)}
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
                    </View>

                </ScrollView>
            </Modal>

            <Modal
                isVisible={isModalPAYFUL}
                animationIn="slideInLeft"  // Specify the animation for entering the screen
                style={Styles.viewModalMargin}
                onBackdropPress={() => setModalPAYFUL(false)}
                onBackButtonPress={() => setModalPAYFUL(false)}>

                <ScrollView style={CommonStyle.commonFlex}>
                    <View style={Styles.container}>
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
                                title={""}
                                fontSize={wp(4)}
                                onPress={() => setModalPAYFUL(false)}
                            />
                        </View>

                        <View style={Styles.viewCenterContain}>

                            <View>
                                <Image
                                    style={Styles.viewPayImage}
                                    resizeMode="contain"
                                    source={Images.payIcon} />
                            </View>

                            <View>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Payment Successful"}
                                    textDecorationLine={'none'}
                                    marginTop={wp(10)}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    marginHorizontal={wp(2)}
                                    fontFamily={Fonts.PoppinsSemiBold}
                                    textAlign='center'
                                />
                            </View>


                            <View>
                                <TextComponent
                                    color={Colors.gray}
                                    title={"Your payment has been successfully done."}
                                    textDecorationLine={'none'}
                                    marginVertical={wp(3)}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    marginHorizontal={wp(5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='center'
                                />


                            </View>

                            <View style={Styles.viewSeprateLine2}>
                            </View>

                            <View>

                                <TextComponent
                                    color={Colors.gray}
                                    title={"Total Payment"}
                                    textDecorationLine={'none'}
                                    marginTop={wp(3)}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    marginHorizontal={wp(2)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='center'
                                />

                                <TextComponent
                                    color={Colors.white}
                                    title={"$ " + (isModalCOUIERCANCEL === true ? isGETPERCENTAGE : isAmount)}
                                    textDecorationLine={'none'}
                                    marginTop={wp(5)}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    marginHorizontal={wp(2)}
                                    fontFamily={Fonts.PoppinsSemiBold}
                                    textAlign='center'
                                />

                                <TextComponent
                                    color={Colors.blue}
                                    title={"Go To Home"}
                                    textDecorationLine={'none'}
                                    marginTop={wp(10)}
                                    onPress={() => navigation.goBack()}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    marginHorizontal={wp(2)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='center'
                                />

                            </View>

                        </View>



                    </View>
                </ScrollView>

            </Modal>

            <Modal
                isVisible={isModalCANCELPAYSTRIPE}
                animationIn="slideInLeft"  // Specify the animation for entering the screen
                style={Styles.viewModalMargin}
                onBackdropPress={() => setModalCANCELPAYSTRIPE(false)}
                onBackButtonPress={() => setModalCANCELPAYSTRIPE(false)}>

                <ScrollView
                    bounces={true}
                    overScrollMode="always">
                    <View style={Styles.viewModalDriverStripeCancel}>

                        <WebView
                            source={{ uri: isURLPAY }}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                        />

                        <ButtonComponent
                            isVisibleMobile={false}
                            isVisibleFaceBook={false}
                            marginVertical={hp(1)}
                            heightBtn={hp(6)}
                            widthBtn={wp(50)}
                            isRightArrow={false}
                            onPress={onPressModalCheckPayment}
                            color={Colors.white}
                            title={ScreenText.Next}
                            marginHorizontal={wp(20)}
                            fontWeight="500"
                            fontSize={wp(4)}
                            fontFamily={Fonts.PoppinsSemiBold}
                            alignSelf='center'
                            textAlign='center'
                            borderRadius={wp(2)}
                            backgroundColor={Colors.blue}
                        />

                    </View>
                </ScrollView>

            </Modal>

            <Modal
                isVisible={isModalPAYCOMPLETE}
                animationIn="slideInLeft"  // Specify the animation for entering the screen
                style={Styles.viewModalMargin}
                onBackdropPress={() => setModalPAYCOMPLETE(false)}
                onBackButtonPress={() => setModalPAYCOMPLETE(false)}>

                <ScrollView style={CommonStyle.commonFlex}>

                    <View style={Styles.container}>

                        <View style={Styles.viewHeaderComplete}>
                            <HeaderComponent
                                margin={wp(3)}
                                backgroundColorOpacity={Colors.circleGray}
                                borderRadiusOpacity={hp(8)}
                                paddingOpacity={wp(2.5)}
                                LoyalPonits={isLoyalPoints}
                                textAlign={"left"}
                                source={Images.arrowRight}
                                marginTop={wp(2)}
                                width={wp(7)}
                                transform={[{ rotate: '180deg' }]}
                                height={wp(7)} // 7
                                marginHorizontal={wp(5)}
                                color={Colors.white}
                                fontFamily={Fonts.InterSemiBold}
                                fontWeight="500"
                                title={"Payment"}
                                isVisiblePayout={true} //0000
                                fontSize={wp(4)}
                                onPress={() => setModalPAYCOMPLETE(false)}
                            />
                        </View>

                        <View style={Styles.viewKMConatinerGray}>
                            <View style={Styles.rowSpace}>
                                <View style={CommonStyle.justifyContent}>
                                    <TextComponent
                                        color={Colors.white}
                                        // title={route.params.itemCompleteDuration}
                                        title={isDISTANCE}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(2)}
                                        marginVertical={wp(1)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        textAlign='center'
                                    />
                                    <TextComponent
                                        color={Colors.gray}
                                        title={"Distance"}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(2)}
                                        marginVertical={wp(1)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='center'
                                    />
                                </View>

                                <View style={Styles.viewSeprateLine}>
                                </View>

                                <View>
                                    <TextComponent
                                        color={Colors.white}
                                        // title={route.params.itemCompleteDistance}
                                        title={isDURATION}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(2)}
                                        marginVertical={wp(1)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        textAlign='center'
                                    />
                                    <TextComponent
                                        color={Colors.gray}
                                        title={"Duration"}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(2)}
                                        marginVertical={wp(1)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='center'
                                    />
                                </View>

                            </View>
                        </View>


                        <View>
                            <View style={CommonStyle.commonRow}>
                                <View style={Styles.viewStationConatiner}>
                                    <Image
                                        style={Styles.viewOrangeDot}
                                        resizeMode="contain"
                                        source={Images.blueDot} />

                                    <View style={Styles.lineVerticalLine1} />
                                    <View style={Styles.lineVerticalLine4} />
                                    <View style={Styles.lineVerticalLine3} />

                                    <Image
                                        style={Styles.viewOrangeDot}
                                        resizeMode="contain"
                                        source={Images.orangeDot} />
                                </View>
                                <View style={CommonStyle.justifyContent}>
                                    <TextComponent
                                        color={Colors.gray}
                                        title={isPICK_UP_LOCATION}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(2)}
                                        marginVertical={wp(1)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='left'
                                    />
                                    <TextComponent
                                        color={Colors.gray}
                                        title={isDROP_UP_LOCATION}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(2)}
                                        marginVertical={wp(1)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='left'
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={Styles.viewSeprateLine2}>
                        </View>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={"Payment"}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                marginVertical={wp(1)}
                                marginHorizontal={wp(5)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='left'
                            />
                        </View>

                        <View style={Styles.viewSeprateLine3_}>
                            <TextComponent
                                color={Colors.white}
                                title={"Courier Charge"}
                                marginVertical={wp(3)}
                                marginHorizontal={wp(3)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.grayFull}
                                // title={"$ " + route.params.itemCompleteRideCharge}
                                title={"$ " + isDRIVERIDECHARGE}
                                marginVertical={wp(3)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <View style={Styles.viewSeprateLine3_}>
                            <TextComponent
                                color={Colors.white}
                                title={"Bookings Fees & Convenience Charges"}
                                marginHorizontal={wp(3)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.grayFull}
                                // title={"$ " + route.params.itemCompleteRideFeesCon}
                                title={"$ " + isDRIVERCONCHARGE}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <View style={Styles.viewSeprateLine3_}>
                            <TextComponent
                                color={Colors.white}
                                title={"Waiting Charge"}
                                marginHorizontal={wp(3)}
                                marginVertical={wp(2)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.grayFull}
                                // title={"$ " + route.params.itemCompleteRideWattingCharges}
                                title={"$ " + isWATTING_CHARGES}
                                marginVertical={wp(2)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <View style={Styles.viewSeprateLine3_}>
                            <TextComponent
                                color={Colors.white}
                                title={"Loyalty Points"}
                                marginHorizontal={wp(3)}
                                marginVertical={wp(2)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />

                            <TextComponent
                                color={Colors.grayFull}
                                title={"-$ " + isLoyalPointsDefault}
                                marginVertical={wp(2)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>


                        <View style={Styles.viewSeprateLine3_}>
                            <TextComponent
                                color={Colors.greenDark}
                                title={"Discount"}
                                marginHorizontal={wp(3)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                marginVertical={wp(3)}
                                textAlign='left'
                            />

                            <TextComponent
                                color={Colors.greenDark}
                                title={"-$ " + Default}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                marginVertical={wp(3)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />

                            {/* <TextComponent
                                    color={Colors.greenDark}
                                    title={"-$ " + Default}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    marginVertical={wp(3)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                /> */}

                        </View>

                        <View style={Styles.viewSeprateLine2}>
                        </View>

                        <View style={Styles.viewSeprateLine3_}>
                            <TextComponent
                                color={Colors.white}
                                title={"Total Amount"}
                                marginHorizontal={wp(3)}
                                marginVertical={wp(1)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.white}
                                title={"$ " + isAmount}
                                marginVertical={wp(1)} // 3
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='left'
                            />
                        </View>

                        <View style={Styles.viewSeprateLine3_}>
                            <TextComponent
                                color={Colors.gray}
                                title={"Inclusive of Taxes"}
                                marginHorizontal={wp(3)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={"Coupon Code"}
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(3.5)}
                                marginHorizontal={wp(5)}
                                marginTop={wp(5)}
                                marginVertical={wp(1)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />

                            <TextInputComponent
                                selectionColor={Colors.white}
                                isVisibleDropDown={false}
                                isVisibleEye={false}
                                isVisibleEye_={false}
                                isVisibleMail={false}
                                isVisibleMailGray={false}
                                isVisibleLockWhite={false}
                                width={wp(90)}
                                borderWidth={isFocusedApplyNow ? ConstValue.value1 : ConstValue.value0}
                                borderColor={isFocusedApplyNow ? Colors.white : Colors.blue}
                                height={hp(7)}
                                marginHorizontal={wp(3.5)}
                                marginVertical={wp(1)}
                                isUserHide={false}
                                textfontSize={ConstValue.value15}
                                textfontFamily={Fonts.PoppinsRegular}
                                textlineHeight={ConstValue.value0}
                                ref={refApplyNow}
                                placeholder={ScreenText.ApplyCouponCode}
                                editable={isApplyEdit}
                                multiline={false}
                                secureTextEntry={false}
                                isPadding={true}
                                keyboardType='default'
                                textAlign='left'
                                numberOfLines={null}
                                isApplyNow={isApplyNowBtn}
                                isVisibleApplyNow={!isApplyNowText}
                                onPressApplyNow={onPressApplyNow}
                                color={Colors.white}
                                backgroundColor={isApplyNowBG ? Colors.grayDark : Colors.lightGreen}
                                borderRadius={wp(2)}
                                onFocus={handleFocusApplyNow}
                                onChangeText={handleApplyNow}
                                onPressCross={onPressCross}
                                onSubmitEditing={() => {
                                }}
                                placeholderTextColor={Colors.white}
                            />
                            {!isValidCode ?
                                <TextComponent
                                    textDecorationLine={'none'}
                                    color={Colors.red}
                                    title={ScreenText.ValidCouponCode}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    marginLeft={wp(5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                />
                                : null}

                        </View>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={"Redeem Loyalty points  ( Max 10% Of all Payment )"}
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(3.5)}
                                marginHorizontal={wp(5)}
                                marginVertical={wp(3)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <TextInputComponent
                            selectionColor={Colors.white}
                            isVisibleDropDown={false}
                            isVisibleEye={false}
                            isVisibleEye_={false}
                            isVisibleMail={false}
                            isVisibleMailGray={false}
                            isVisibleLockWhite={false}
                            width={wp(90)}
                            borderWidth={isFocusedRedeem ? ConstValue.value1 : ConstValue.value0}
                            borderColor={isFocusedRedeem ? Colors.white : Colors.blue}
                            height={hp(7)}
                            marginHorizontal={wp(3.5)}
                            marginVertical={wp(1)}
                            isUserHide={false}
                            textfontSize={ConstValue.value15}
                            textfontFamily={Fonts.PoppinsRegular}
                            textlineHeight={ConstValue.value0}
                            ref={refRedeem}
                            placeholder={ScreenText.EnterPointsToRedeem}
                            editable={isApplyRedeem}
                            multiline={false}
                            secureTextEntry={false}
                            isPadding={false}
                            paddingLeft={wp(2)}
                            keyboardType='default'
                            textAlign='left'
                            numberOfLines={null}
                            isApplyNowPoints={isRedeemBtn}
                            isVisibleApplyNowPoints={!isRedeemText}
                            onPressApplyNowRedeem={onPressRedeem}
                            color={Colors.white}
                            backgroundColor={isRedeemBG ? Colors.grayDark : Colors.lightGreen}
                            borderRadius={wp(2)}
                            onFocus={handleFocusRedeem}
                            onChangeText={handleRedeem}
                            onPressCrossPoints={onPressCrossPoints}
                            onSubmitEditing={() => {

                            }}
                            placeholderTextColor={Colors.white}
                        />
                        {!isValidRedeem ?
                            <TextComponent
                                textDecorationLine={'none'}
                                color={Colors.red}
                                title={ScreenText.ValidCouponRedeem}
                                fontWeight="400"
                                fontSize={wp(4)}
                                marginLeft={wp(5)}
                                fontFamily={Fonts.PoppinsRegular}
                            />
                            : null}

                        <View style={CommonStyle.commonContentAlign}>
                            <ButtonComponent
                                isVisibleMobile={false}
                                isVisibleFaceBook={false}
                                heightBtn={hp(7)}
                                widthBtn={wp(90)}
                                marginTop={wp(10)}
                                marginVertical={wp(2)}
                                isRightArrow={false}
                                color={Colors.white}
                                title={ScreenText.CompletePayment}
                                onPress={onPressCompletePayment}
                                // onPress={() => setModalPAYFUL(true)}
                                // onPress={() => setModalDriver(true)}
                                marginHorizontal={wp(2)}
                                fontWeight="600"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                backgroundColor={Colors.blue}
                            />
                        </View>

                        <View>
                            <Modal isVisible={isSTRIPEModal}
                                onBackButtonPress={() => setSTRIPEModal(false)}
                                onBackdropPress={() => setSTRIPEModal(false)}>
                                <View style={Styles.viewModalDriverStripe}>

                                    <WebView
                                        source={{ uri: isURLPAY }}
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                        }}
                                        javaScriptEnabled={true}
                                        domStorageEnabled={true}
                                    />

                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(1)}
                                        heightBtn={hp(6)}
                                        widthBtn={wp(50)}
                                        isRightArrow={false}
                                        onPress={onPressModalCheckPayment}
                                        color={Colors.white}
                                        title={ScreenText.Next}
                                        marginHorizontal={wp(15)}
                                        fontWeight="500"
                                        fontSize={wp(4)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={Colors.blue}
                                    />

                                </View>
                            </Modal>
                        </View>

                        <View>
                            <Modal isVisible={isModalDriver}
                                onBackButtonPress={() => setModalDriver(false)}>
                                <View style={Styles.viewModalDriver}>
                                    <TextComponent
                                        color={Colors.white}
                                        title={ScreenText.CustomerRating}
                                        textDecorationLine={'none'}
                                        fontWeight="700"
                                        fontSize={wp(5)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        textAlign='center'
                                        marginVertical={wp(3)}
                                        marginTop={wp(5)}
                                    />
                                    <TextComponent
                                        color={Colors.modalGray}
                                        title={ScreenText.Howtoknow}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='center'
                                        marginVertical={wp(3)}
                                    />

                                    <View>
                                        <View style={Styles.customRatingBarStyle}>
                                            {maxRatingSubmit.map((item, key) => {
                                                return (
                                                    <View style={CommonStyle.commonRow}>
                                                        <TouchableOpacity
                                                            activeOpacity={0.7}
                                                            key={item}
                                                            onPress={() => setDefaultRatingsubmit(item)}>

                                                            <Image
                                                                style={Styles.starImageStyle_}
                                                                source={
                                                                    item <= defaultRatingSubmit
                                                                        ? starImageFilled1
                                                                        : starImageCorner1
                                                                }
                                                            />

                                                        </TouchableOpacity>
                                                    </View>

                                                );
                                            })}

                                        </View>

                                    </View>


                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(2)}
                                        heightBtn={hp(6)}
                                        widthBtn={wp(50)}
                                        isRightArrow={false}
                                        onPress={onPressSubmit}
                                        color={Colors.white}
                                        title={ScreenText.Submit}
                                        marginHorizontal={wp(15)}
                                        fontWeight="500"
                                        fontSize={wp(4)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={Colors.blue}
                                    />
                                </View>
                            </Modal>
                        </View>

                    </View>



                </ScrollView>
            </Modal>

        </SafeAreaView>

    )
}

export default CourierRequestPast;