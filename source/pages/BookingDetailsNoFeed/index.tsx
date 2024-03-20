import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import WebView from 'react-native-webview';
import ButtonComponent from '../../components/Button';
import CustomSelectOrder from '../../components/CustomSelectOrder';
import HeaderComponent from '../../components/Header/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import TextInputComponent from '../../components/TextInput';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils, { validateIsEmail, validateIsPhoneNumber } from '../../utils/commonfunction';
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


    const [isURL1, setURL1] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL2, setURL2] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL3, setURL3] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL4, setURL4] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");

    const [isDriverPlateNumber, setDriverPlateNumber] = useState("GJ 06 MA 2500");
    const [isDriverPlateName, setDriverPlateName] = useState("Crash Test Dummy");
    const [isDriverVehicleType, setDriverVehicleType] = useState("Car");

    const [isDriverVehicleColor, setDriverVehicleColor] = useState("yellow");

    const [isDriverVehicleDesc, setDriverVehicleDesc] = useState(ScreenText.Loreum);



    let user_latitude;
    let user_longitude;


    // MAP
    const mapViewRef = useRef<any>(null);


    // SET AS PICK  & DROP 
    const [markerCoordinates1, setMarkerCoordinates1] = useState<any>({
        latitude: 37.78825,
        longitude: -122.4324,
    });

    const [markerCoordinates2, setMarkerCoordinates2] = useState<any>({
        latitude: 37.80825, // Increased latitude for more distance
        longitude: -122.4524, // Increased longitude for more distance
    });


    const [radius, setRadius] = useState(50); // Define the radius in meters



    // ProfileImage
    const [isURL5, setURL5] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");



    const [defaultRating, setDefaultRating] = useState(4);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    const [maxRatingSubmit, setMaxRatingsubmit] = useState([1, 2, 3, 4, 5]);

    const [defaultRatingSubmit, setDefaultRatingsubmit] = useState(0);


    const starImageFilled1 =
        Images.fillstarIcon; // fillStarIcon
    const starImageCorner1 =
        Images.unfillstarIcon;



    let USER_PAY_STATUS;
    let USER_PAY_CARD;

    // MAP
    const [isDriverName, setDriverName] = useState(ScreenText.UserName);


    const [isPICKSHARE, setPICKSHARE] = useState(true);
    const [isFocusedPasswordDesc, setIsFocusedPasswordDesc] = useState(false);
    const refSubject = useRef<any>(null);


    const [couponcode, setCouponcode] = useState('');
    const [redeem, setCouponRedeem] = useState<any>('');


    const [isValidRedeem, setValidRedeem] = useState(true);


    //
    let CouponDiscount;
    let GetAsDiscount;
    let GetNewAmoount;
    //

    const dataSeat = [
        { labelSeat: 'Type1', value: '1' },
        { labelSeat: 'Type2', value: '2' },
        { labelSeat: 'Type3', value: '3' },
        { labelSeat: 'Type4', value: '4' },
        { labelSeat: 'Type5', value: '5' },
        // Add more options as needed
    ];

    const [selectedOption, setSelectedOption] = useState<any>('Select Order type');
    const [modalVisible, setModalVisible] = useState(false);

    const [isLoyalPointsDefault, setLoyalPointsDeafult] = useState<any>('');
    const [Default, setDefault] = useState("");
    const [isAmount, setIsAmount] = useState<any>("");


    const [isFocusedApplyNow, setIsFocusedApplyNow] = useState(false);
    const [isFocusedRedeem, setIsFocusedRedeem] = useState(false);


    const refRedeem = useRef<any>(null);


    const [isValidCode, setValidCode] = useState(true);


    const [isApplyNowBG, setApplyNowBG] = useState(true);
    const [isRedeemBG, setRedeemBG] = useState(true);

    const [isApplyEdit, setApplyEdit] = useState(true);
    const [isApplyRedeem, setApplyRedeem] = useState(true);

    const [isApplyNowBtn, setisApplyNowBtn] = useState(true);
    const [isRedeemBtn, setisRedeemBtn] = useState(true);


    const [isRedeemText, setisRedeemText] = useState(false);


    const [isApplyNowText, setisApplyNowText] = useState(false);


    // PAY COMPLETE
    const refApplyNow = useRef<any>(null);


    // STRIPE :
    const [isSTRIPEModal, setSTRIPEModal] = useState(false);
    const [isModalDriver, setModalDriver] = useState(false); // false


    const [deafultMsg, setDefaultMsgMsg] = useState(ScreenText.PleaseStartYourRide);
    const [isModalSOS, setModalSOS] = useState(false);


    const [timerValue, setTimerValue] = useState(5); // Initial timer value in seconds
    const [isRunning, setIsRunning] = useState(false);


    const onPressCrossPoints = () => {
        setIsAmount(isAmount);
        setLoyalPointsDeafult("");

        setRedeemBG(true);
        setApplyRedeem(true);
        // setisApplyNowBtn(true);
        setisRedeemText(false);
        setIsFocusedRedeem(true);
    }

    const onPressRightEnd = () => {
        setModalSOS(true),
            setIsRunning(true);
    }

    const onPressSOS = () => {
        setModalSOS(false),
            setIsRunning(false);
    }

    const onPressModalCheckPayment = () => {

        // Check Payment Status - Yes To Next
        // PaymentStatus : TODO

        // payment_type

        // Payment Status Addded !
        axiosPostRideStatusAccepted();

        // axiosPostRideDetailsRequest();

        // setModalDriver(true);
        // navigation.navigate('PaymentSuccessful', {
        // itemSuccessfulAmount: isAmount,
        // });
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

                    axiosPostRideDetailsRequest();

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


    const axiosPostRideDetailsRequest = async () => {
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
            .then(async response => {
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

                        if (isModalBOOKINGCANCEL === true) {

                            await axiosCancelBookingPostRequest();

                            setSTRIPEModal(false);

                            setModalCANCELPAYSTRIPE(false);

                            setModalDriver(true);

                        } else {

                            setSTRIPEModal(false);

                            setModalCANCELPAYSTRIPE(false);

                            setModalDriver(true);

                        }


                        // setSTRIPEModal(false);

                        // setModalCANCELPAYSTRIPE(false);

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
                amount: isModalBOOKINGCANCEL === true ? isGETPERCENTAGE : isAmount,
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
            .then(async response => {
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
                        if (response?.data?.matchingVehicle?.BookingCurrentStatus == "pending") {

                            // CALL CANCEL API :
                            await axiosCancelBookingPostRequest();


                            setModalDriver(true);
                        } else {

                            setModalDriver(true);
                        }
                        // setModalDriver(true);

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



    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        // Perform any other actions with the selected option
    };

    const onRequestClose = () => {
        setModalVisible(true);
        // console.log('Modal Closed');
        // Perform any other actions when the modal is closed
    };


    // Get Current Date
    const currentDate = moment();


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


    // const [isModalVisible, setModalVisible] = useState(true);


    // MODAL AS LIB USE : TODO 
    const [isModalStatus, setModalStatus] = useState(true);
    const [isModalPAY1, setModalPAY1] = useState(false);
    const [isModalHELP, setModalHELP] = useState(false);


    const [isFocused, setIsFocused] = useState(true);
    const [isFocusedMobile, setIsFocusedMobile] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const refName = useRef<any>(null);
    const refMobile = useRef<any>(null);
    const refEmail = useRef<any>(null);

    const [name, setName] = useState('')

    const [isFocusedName, setIsFocusedName] = useState(false);

    const [isValidName, setValidName] = useState(true);
    const [selectedImage, setSelectedImage] = useState(undefined);


    const [selected, setSelected] = useState('Select');
    const [visible, setVisible] = useState(false);


    const [isModalRISE, setModalRISE] = useState(false);
    const [isModalPAY, setModalPAY] = useState(false);
    const [isModalOTHER, setModalOTHER] = useState(false);


    const [isModalPAYFUL, setModalPAYFUL] = useState(false);

    const [isModalDRIVER, setModalDRIVER] = useState(false);

    const [isModalPAYCOMPLETE, setModalPAYCOMPLETE] = useState(false);


    const [isValidNumber, setValidNumber] = useState(true);

    const [email, setEmail] = useState('');
    const [isValidEmail, setValidEmail] = useState(true);

    const refDispute = useRef<any>(null);

    const [num, setNumber] = useState('');
    const refDesc = useRef<any>(null);


    const [isFocusedPasswordRef, setIsFocusedPasswordRef] = useState(false);
    const [passRef, setPassRef] = useState('');
    const [isValidRefCode, setValidRefCode] = useState(true);
    const [isValidDescCode, setValidDescCode] = useState(true);

    const [isModalBOOKINGCANCEL, setModalBOOKINGCANCEL] = useState(false);
    const [isModalCANCELPAYSTRIPE, setModalCANCELPAYSTRIPE] = useState(false);


    const [isModalMAP, setModalMAP] = useState(false);


    // MODLA - Support
    const refPassword = useRef<any>(null);

    const Images1 = {
        flagIcon: Images.flagIcon,
        // appIcon: Images.appIcon,

        // Flag Images
        flag1: Images.flag1,
        flag2: Images.flag2,
        flag3: Images.flag3,
        flag4: Images.flag4,
        flag5: Images.flag5,
        flag6: Images.flag6,
        flag7: Images.flag7,
        flag8: Images.flag8,
        flag9: Images.flag9,
        flag10: Images.flag10,
        flag11: Images.flag11,
        flag12: Images.flag12,
        flag13: Images.flag13,
        flag14: Images.flag14,
        flag15: Images.flag15,
        flag16: Images.flag16,
        flag17: Images.flag17,
        flag18: Images.flag18,

        flag19: Images.flag19,

        flag20: Images.flag20,
        flag21: Images.flag21,
        flag22: Images.flag22,
        flag23: Images.flag23,
        flag24: Images.flag24,
        flag25: Images.flag25,
        flag26: Images.flag26,
        flag27: Images.flag27,
        flag28: Images.flag28,
        flag29: Images.flag29,
        flag30: Images.flag30,
        flag31: Images.flag31,
        flag32: Images.flag32,
        flag33: Images.flag33,
        flag34: Images.flag34,
        flag35: Images.flag35,
        flag36: Images.flag36,
        flag37: Images.flag37,
        flag38: Images.flag38,
        flag39: Images.flag39,
        flag40: Images.flag40,
        flag41: Images.flag41,
        flag42: Images.flag42,
        flag43: Images.flag43,
        flag44: Images.flag44,
        flag45: Images.flag45,
        flag46: Images.flag46,
        flag47: Images.flag47,
        flag48: Images.flag48,
        flag49: Images.flag49,
        flag50: Images.flag50,
        flag51: Images.flag51,
        flag52: Images.flag52,
        flag53: Images.flag53,
        flag54: Images.flag54,
        flag55: Images.flag55,
        flag56: Images.flag56,
        flag57: Images.flag57,
        flag58: Images.flag58,
        flag59: Images.flag59,
        flag60: Images.flag60,
        flag61: Images.flag61,
        flag62: Images.flag62,
        flag63: Images.flag63,
        flag64: Images.flag64,
        flag65: Images.flag65,
        flag66: Images.flag66,
        flag67: Images.flag67,
        flag68: Images.flag68,
        flag69: Images.flag69,
        flag70: Images.flag70,
        flag71: Images.flag71,
        flag72: Images.flag72,
        flag73: Images.flag73,
        flag74: Images.flag74,
        flag75: Images.flag75,
        flag76: Images.flag76,
        flag77: Images.flag77,
        flag78: Images.flag78,
        flag79: Images.flag79,
        flag80: Images.flag80,
        flag81: Images.flag81,
        flag82: Images.flag82,
        flag83: Images.flag83,
        flag84: Images.flag84,
        flag85: Images.flag85,
        flag86: Images.flag86,
        flag87: Images.flag87,
        flag88: Images.flag88,
        flag89: Images.flag89,
        flag90: Images.flag90,
        flag91: Images.flag91,
        flag92: Images.flag92,
        flag93: Images.flag93,
        flag94: Images.flag94,
        flag95: Images.flag95,
        flag96: Images.flag96,
        flag97: Images.flag97,
        flag98: Images.flag98,
        // Flag Images

        downArrow: Images.flagIcon,
        // Add more options as needed

    };

    const data = [
        { label: '+91 ', value: '1', img: Images1.flagIcon },
        { label: '+93 ', value: '3', img: Images1.flag19 },
        { label: '+1 ', value: '4', img: Images1.flag1 },
        { label: '+20 ', value: '5', img: Images1.flag2 },
        { label: '+30 ', value: '6', img: Images1.flag3 },
        { label: '+32 ', value: '7', img: Images1.flag4 },
        { label: '+33 ', value: '8', img: Images1.flag5 },
        { label: '+36 ', value: '9', img: Images1.flag6 },
        { label: '+39 ', value: '10', img: Images1.flag7 },
        { label: '+43 ', value: '11', img: Images1.flag8 },
        { label: '+44 ', value: '12', img: Images1.flag9 },
        { label: '+45 ', value: '13', img: Images1.flag10 },
        { label: '+49 ', value: '14', img: Images1.flag11 },
        { label: '+53 ', value: '15', img: Images1.flag12 },
        { label: '+54 ', value: '16', img: Images1.flag13 },
        { label: '+56 ', value: '17', img: Images1.flag14 },
        { label: '+57 ', value: '18', img: Images1.flag15 },
        { label: '+61 ', value: '19', img: Images1.flag16 },
        { label: '+62 ', value: '20', img: Images1.flag17 },
        { label: '+86 ', value: '21', img: Images1.flag18 },
        { label: '+95 ', value: '22', img: Images1.flag20 },
        { label: '+98 ', value: '23', img: Images1.flag21 },
        { label: '+213 ', value: '24', img: Images1.flag22 },
        { label: '+220 ', value: '25', img: Images1.flag23 },
        { label: '+224 ', value: '26', img: Images1.flag24 },
        { label: '+225 ', value: '27', img: Images1.flag25 },
        { label: '+226 ', value: '28', img: Images1.flag26 },
        { label: '+233 ', value: '29', img: Images1.flag27 },
        { label: '+235 ', value: '30', img: Images1.flag28 },
        { label: '+236 ', value: '31', img: Images1.flag29 },
        { label: '+237 ', value: '32', img: Images1.flag30 },
        { label: '+238 ', value: '33', img: Images1.flag31 },
        { label: '+240 ', value: '34', img: Images1.flag32 },
        { label: '+241 ', value: '35', img: Images1.flag33 },
        { label: '+243 ', value: '36', img: Images1.flag34 },
        { label: '+244 ', value: '37', img: Images1.flag35 },
        { label: '+245 ', value: '38', img: Images1.flag36 },
        { label: '+246 ', value: '39', img: Images1.flag37 },
        { label: '+247 ', value: '40', img: Images1.flag38 },
        { label: '+251 ', value: '41', img: Images1.flag39 },
        { label: '+253 ', value: '42', img: Images1.flag40 },
        { label: '+257 ', value: '43', img: Images1.flag41 },
        { label: '+267 ', value: '44', img: Images1.flag42 },
        { label: '+269 ', value: '45', img: Images1.flag43 },
        { label: '+291 ', value: '46', img: Images1.flag44 },
        { label: '+297 ', value: '47', img: Images1.flag45 },
        { label: '+298 ', value: '48', img: Images1.flag46 },
        { label: '+299 ', value: '49', img: Images1.flag47 },
        { label: '+350 ', value: '50', img: Images1.flag48 },
        { label: '+353 ', value: '51', img: Images1.flag49 },
        { label: '+354 ', value: '52', img: Images1.flag50 },
        { label: '+355 ', value: '53', img: Images1.flag50 },
        { label: '+357 ', value: '54', img: Images1.flag52 },
        { label: '+358 ', value: '55', img: Images1.flag53 },
        { label: '+359 ', value: '56', img: Images1.flag54 },
        { label: '+372 ', value: '57', img: Images1.flag55 },
        { label: '+374 ', value: '58', img: Images1.flag56 },
        { label: '+375 ', value: '59', img: Images1.flag57 },
        { label: '+376 ', value: '60', img: Images1.flag58 },
        { label: '+385 ', value: '61', img: Images1.flag59 },
        { label: '+387 ', value: '62', img: Images1.flag60 },
        { label: '+420 ', value: '63', img: Images1.flag61 },
        { label: '+500 ', value: '64', img: Images1.flag62 },
        { label: '+501 ', value: '65', img: Images1.flag63 },
        { label: '+502 ', value: '66', img: Images1.flag64 },
        { label: '+503 ', value: '67', img: Images1.flag65 },
        { label: '+504 ', value: '68', img: Images1.flag66 },
        { label: '+509 ', value: '69', img: Images1.flag67 },
        { label: '+590 ', value: '70', img: Images1.flag68 },
        { label: '+591 ', value: '71', img: Images1.flag69 },
        { label: '+592 ', value: '72', img: Images1.flag70 },
        { label: '+593 ', value: '73', img: Images1.flag71 },
        { label: '+594 ', value: '74', img: Images1.flag72 },
        { label: '+673 ', value: '75', img: Images1.flag73 },
        { label: '+679 ', value: '76', img: Images1.flag74 },
        { label: '+682 ', value: '77', img: Images1.flag75 },
        { label: '+689 ', value: '78', img: Images1.flag76 },
        { label: '+852 ', value: '79', img: Images1.flag77 },
        { label: '+855 ', value: '80', img: Images1.flag78 },
        { label: '+880 ', value: '81', img: Images1.flag79 },
        { label: '+964 ', value: '82', img: Images1.flag80 },
        { label: '+972 ', value: '83', img: Images1.flag81 },
        { label: '+973 ', value: '84', img: Images1.flag82 },
        { label: '+975 ', value: '85', img: Images1.flag83 },
        { label: '+994 ', value: '86', img: Images1.flag84 },
        { label: '+995 ', value: '87', img: Images1.flag85 },
        { label: '+1246 ', value: '88', img: Images1.flag86 },
        { label: '+1264 ', value: '89', img: Images1.flag87 },
        { label: '+1268 ', value: '90', img: Images1.flag88 },
        { label: '+1284 ', value: '91', img: Images1.flag89 },
        { label: '+1345 ', value: '92', img: Images1.flag90 },
        { label: '+1441 ', value: '93', img: Images1.flag91 },
        { label: '+1473 ', value: '94', img: Images1.flag92 },
        { label: '+1671 ', value: '95', img: Images1.flag93 },
        { label: '+1684 ', value: '96', img: Images1.flag94 },
        { label: '+1767 ', value: '97', img: Images1.flag95 },
        { label: '+1849 ', value: '98', img: Images1.flag96 },
        { label: '+67264 ', value: '99', img: Images1.flag97 },
        { label: '+506 ', value: '100', img: Images1.flag98 }
        // Add more options as needed

    ];
    // MODAL AS LIB USE : TODO 


    const [requestSentDate, setRequestSentDate] = useState(ScreenText.Date);
    const [toggleArrived, setToggleArrived] = useState(false);

    const [togglePaymentCompleted, setTogglePaymentCompleted] = useState(false);
    const [toggleRideCompleted, setToggleRideCompleted] = useState(false);
    const [toggleFeedBack, setToggleFeedBack] = useState(false);


    const [isPaynow, setPaynow] = useState(true);
    const [isFeedback, setFeedback] = useState(true);

    const [descRef, setDescRef] = useState('')


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


    let _DISCOUNT;


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


    const [isDURATION, setDURATION] = useState("");
    const [isDISTANCE, setDISTANCE] = useState("");


    const [isDUR, setDUR] = useState("");
    const [isDIS, setDIS] = useState("");


    const [isTRIP, setTRIP] = useState("");
    const [isLP, setLP] = useState("");
    const [isPC, setPC] = useState("");


    const [isDRIVERNAME, setDRIVERNAME] = useState("");
    const [isRated, setRated] = useState("0");


    const [isDRIVERIDECHARGE, setDRIVERRIDECHARGE] = useState("");
    const [isDRIVERCONCHARGE, setDRIVERCONCHARGE] = useState("");
    const [isDRIVERDISCOUNT, setDRIVERDISCOUNT] = useState("");
    const [isSeats, setSeats] = useState("0");

    const [isDriverVIN, setDriverVIN] = useState("583245");

    const [isDRIVERPROFILe, setDRIVERPROFILE] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo"); // USER_RIDE_CHARGE


    const [isURLPAY, setISURLPAY] = useState<any>("https://rideshareandcourier.graphiglow.in/app/StripeWeb.php?userId=65b9e2f0eb9e0db05a70bb0b&amount=105");


    let apiUrlPAY;


    // isDriverOnTheWay
    const [isDriverOnTheWay, setDriverOnTheWay] = useState(false);
    const [isAccepted, setIsAccepted] = useState(true);


    let OTPGenerateTimeArrived;
    let OTPVerifyTimeArrived;
    let PaymentStatusArrived;
    let RideStatusArrived;
    let BookingRequestTimeArrived;
    let PaymentStatusTimeArrived;



    // PAY - 1 
    let USER_BOOKINGSTATUS;
    let USER_CANCELLATION;

    let USER_DRIVER_ID;
    let USER_RIDE_ID_;


    let PER;
    let CAN;


    // PAY COMPLETE
    const [isLoyalPoints, setLoyalPoints] = useState<any>('');


    const [isGETPERCENTAGE, setGETPERCENTAGE] = useState("0");
    const [isCHARGE, setCHARGE] = useState("20");


    // TODO :
    const [isFocusedFeedBack, setIsFocusedFeedBack] = useState(false);
    const refFeedBack = useRef<any>(null);
    const [isSecure, setSecure] = useState(true);
    const [feed, setFeed] = useState('')
    const [isValidFeed, setValidFeed] = useState(true);
    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));


    const [modalVisibleOTP, setModalVisibleOTP] = useState(false);


    const [isPhoneNumber, setPhoneNumber] = useState("");


    let averageRating;
    let avg_username;
    let no_rate;


    let statusCheack;
    let dateCheack;

    let paymentStatus;
    let rideStatus;
    let OTPVerify;

    // Driver Get Booking 
    let DriverBookingName;
    let DriverProfileImage;
    let Driver_id;

    let DriverVehicleColor;
    let DriverUserVIN;
    let DriverNumberOfSeat;


    let DriverBookingImage1;
    let DriverBookingImage2;
    let DriverBookingImage3;
    let DriverBookingImage4;


    let DriverVehicleNumber;
    let DriverVehicleType;
    let DriverVehicleName;

    let DriverVehicleDecription;
    let DriverVehiclePhone;




    let OTPStatus;


    let user_point;


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

                // PAY - 1
                await axiosPostRideDetailsOfMap();
                await axiosPostDriverInfoRequest();
                await axiosGetRideRattingRequest();

                // LOYAL PONITS
                await axiosPostProfilDataGetInfo();


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

    // SET AS PICK  & DROP  - DEAFULT
    const [markerCoordinates0, setMarkerCoordinates0] = useState<any>({
        latitude: 37.78825,
        longitude: -122.4324,
    });


    // Auto Zoom Added
    useEffect(() => {
        // Zoom to the marker using animateToRegion when markerCoordinate changes
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion({
                latitude: markerCoordinates1.latitude,
                longitude: markerCoordinates1.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000); // Adjust duration as needed
        }
    }, [markerCoordinates1]);



    // SET CURRENT LOCATION 
    useEffect(() => {

        const fetchData1 = () => {
            // Get Current Lat And Long
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;

                    user_latitude = position.coords.latitude;
                    user_longitude = position.coords.longitude;

                    console.log("user_latitude2222222222222222", user_latitude);
                    console.log("user_longitude44444444444444", user_longitude);
                    console.log("user_latitude2222222222222222", user_latitude);
                    console.log("user_longitude44444444444444", user_longitude);
                    console.log("user_latitude2222222222222222", user_latitude);
                    console.log("user_longitude44444444444444", user_longitude);
                    console.log("user_latitude2222222222222222", user_latitude);
                    console.log("user_longitude44444444444444", user_longitude);

                    let newCoordinate = { latitude: user_latitude, longitude: user_longitude };
                    setMarkerCoordinates0(newCoordinate);
                },
                error => {
                    console.log(`Error getting location: ${error.message}`);
                    console.log(`Error getting location: ${error.message}`);
                    console.log(`Error getting location: ${error.message}`);

                },
                { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
            );
        }

        fetchData1();

        // // Set interval to refresh every 10 seconds
        // const intervalId = setInterval(fetchData, 5 * 1000);
        // // Cleanup function
        // return () => {
        //     // Clear the interval when the component unmounts
        //     clearInterval(intervalId);
        // };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // Get Lat & Long:
            const user_drop_lat = await AsyncStorage.getItem('user_drop_lat');
            const user_drop_long = await AsyncStorage.getItem('user_drop_long');
            const user_pick_lat = await AsyncStorage.getItem('user_pick_lat');
            const user_pick_long = await AsyncStorage.getItem('user_pick_long');

            // console.log("DROP----->1", user_drop_lat);
            // console.log("DROP----->1", user_drop_long);
            // console.log("PICK----->1", user_pick_lat);
            // console.log("PICK----->1", user_pick_long);

            // Check for null or undefined values
            if (user_pick_lat !== null && user_pick_long !== null) {
                // Set Lat Long As Marker
                setMarkerCoordinates1({ latitude: parseFloat(user_pick_lat), longitude: parseFloat(user_pick_long) });
            }

            if (user_drop_lat !== null && user_drop_long !== null) {
                // Set Lat Long As Marker
                setMarkerCoordinates2({ latitude: parseFloat(user_drop_lat), longitude: parseFloat(user_drop_long) });
            }
        };

        fetchData(); // Call fetchData function

        // if (mapViewRef.current) {
        //     const coordinates = [markerCoordinates1, markerCoordinates2];

        //     mapViewRef.current?.fitToCoordinates(coordinates, {
        //         edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        //         animated: false,
        //     });
        // }

    }, [markerCoordinates1, markerCoordinates2]);


    useEffect(() => {
        let timerId;

        if (isRunning && timerValue > 0) {
            timerId = setTimeout(() => {
                setTimerValue(timerValue - 1);
            }, 1000); // 1000 milliseconds (1 second)
        }

        if (timerValue === 0) {
            console.log('Timer reached zero!');
            Linking.openURL(`tel:${+9100000000000}`);
        }

        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [timerValue, isRunning]);


    const [markerCoordinates, setMarkerCoordinates] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });


    const handleMapPress = (event) => {
        // Update the marker's coordinates when the map is pressed
        setMarkerCoordinates(event.nativeEvent.coordinate);
    };

    const onPressCallUser = () => {
        const phoneNumberWithPrefix = `tel:${isPhoneNumber}`;
        Linking.openURL(phoneNumberWithPrefix);
    }

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

            //const url = `https://rideshareandcourier.graphiglow.in/api/rideStatus/checkRide/${route.params.itemRIDEID_SENT}`
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
                            setToggleArrived(true);
                            setPICKSHARE(false);
                            setPICKOTP(OTPStatus);


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

                            // Show Paynow
                            setPaynow(false)

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
                            setPaynow(false)
                        }

                        if (RideStatusArrived === "Complete") {
                            setToggleRideCompleted(true);
                            setFeedback(false);

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


                        } else if (statusCheack === "Arrived") { //////01101todo
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

                            setIsAccepted(false);


                        } else if (statusCheack === "Complete") {  // Complete - RideStart
                            // setToggleRideCompleted(true);
                            // setDRIVERSTATUS("Ride Complete");

                            setIsAccepted(false);

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
        // const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';
        const url = `${API.BASE_URL}/rideDetail/rideDetail`;

        // Prepare data in JSON format
        const data = {
            id: route.params.itemRIDER_ID_SENT // route.params.itemBokingDetailsMapId
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

                    console.log("USER_RIDEDURATION", USER_RIDEDURATION);
                    console.log("USER_RIDEDISTANCE", USER_RIDEDISTANCE);

                    setDURATION(USER_RIDEDURATION);
                    setDISTANCE(USER_RIDEDISTANCE);



                    // PASSING DATA TO PAYMENT SECTION :
                    USER_DRIVER_ID = response?.data?.matchingVehicle?.DriverID;
                    USER_RIDE_ID_ = response?.data?.matchingVehicle?._id;

                    // BookingCurrentStatus 
                    USER_BOOKINGSTATUS = response?.data?.matchingVehicle?.BookingCurrentStatus;
                    USER_CANCELLATION = response?.data?.matchingVehicle?.cancelationsAmount;

                    PER = (USER_TOTAL_AMOUNT * USER_CANCELLATION) / 100;

                    // cancelationsAmount
                    setGETPERCENTAGE(PER);

                    console.log("PER", PER);
                    console.log("PER", PER);
                    console.log("PER", PER);
                    console.log("PER", PER);


                    CAN = USER_TOTAL_AMOUNT - PER
                    console.log("CAN", CAN);
                    console.log("CAN", CAN);
                    console.log("CAN", CAN);
                    console.log("CAN", CAN);
                    console.log("CAN", CAN);

                    setCHARGE(CAN)

                    console.log("CAN", CAN);
                    console.log("CAN", CAN);
                    console.log("CAN", CAN);
                    console.log("CAN", CAN);
                    console.log("CAN", CAN);

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
                    // setTOTAL_AMOUNT(USER_TOTAL);

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
                    StoreDriverID(USER_DRIVER_ID);
                    StoreRideID(USER_RIDE_ID_);
                    StoreRideIDID(USER_RIDEID);
                    StorePayType(USER_PAYMEMT_TYPE);

                    // // USER_DISCOUNT - NO USE
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


                    console.log("RideDetails101===>",
                        JSON.stringify(response?.data?.matchingVehicle?.RideId, null, 2));

                } else {
                    // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
            });
    };


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

    const StoreRideIDID = async (USER_RIDEID: any) => {
        try {
            await AsyncStorage.setItem('store_RIDEID', JSON.stringify(USER_RIDEID));
            console.log('store_RIDEID===>', JSON.parse(USER_RIDEID));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_RIDEID :', error);
        }
    }

    const StorePayType = async (USER_PAYMEMT_TYPE: any) => {
        try {
            await AsyncStorage.setItem('store_pay_type', JSON.stringify(USER_PAYMEMT_TYPE));
            console.log('store_pay_type===>', JSON.parse(USER_PAYMEMT_TYPE));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_pay_type :', error);
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

    const axiosUserPostDriverInfoRequest = async () => {

        const storedLinkedId = await AsyncStorage.getItem('store_driver_id');
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

                        // ADDED
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

                        // _id99
                        Driver_id = response?.data?.matchingUsers[0]?._id;
                        // Store for star : todo
                        StoredDriverID(Driver_id);

                        console.log("Driver_id==>",
                            JSON.stringify(Driver_id, null, 2));

                        setDRIVERNAME(DriverBookingName);
                        setDRIVERPROFILE(DriverProfileImage);

                        setDriverVIN(DriverUserVIN);

                        setURL1(DriverBookingImage1);
                        setURL2(DriverBookingImage2);
                        setURL3(DriverBookingImage3);
                        setURL4(DriverBookingImage4);
                        setURL5(DriverProfileImage);

                        setSeats(DriverNumberOfSeat);
                        setDriverPlateNumber(DriverVehicleNumber);
                        setDriverPlateName(DriverVehicleName);
                        setDriverVehicleType(DriverVehicleType);
                        setDriverVehicleDesc(DriverVehicleDecription);
                        setPhoneNumber(DriverVehiclePhone);
                        setDriverVehicleColor(DriverVehicleColor);


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



    const toggleDropdown = () => {
        setVisible((prevVisible) => !prevVisible);
    };

    const renderDropdown = () => (
        <Modal
            style={Styles.modalStyle}
            visible={visible}
            transparent animationType="none">
            <View style={[Styles.dropdown]}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </Modal>
    );


    const renderItem = ({ item }) => (
        <TouchableOpacity style={Styles.item}
            onPress={() => onItemPress(item)}>
            <View style={Styles.onItemPress}>
                <Image
                    source={item.img || Images.downArrow}
                    resizeMode="contain"
                    style={Styles.imageDefaultDownArrow}
                />
                <Text style={Styles.textLabel}>{item.label}</Text>
            </View>
        </TouchableOpacity>
    );

    const onItemPress = (item) => {
        setSelected(item);
        setVisible(false);
        setSelectedImage(item.img || Images.downArrow);
        // Handle selection logic here
    };

    const handleFocusEmail = () => {
        setIsFocusedEmail(true)
    }


    const onPressPaymentSupport = () => {
        if (name === '') {
            Toast.show("Name Field Is Required", Toast.SHORT);
        } else if (name.length < 3) {
            Toast.show("Please Enter Must 3 Character Name", Toast.SHORT);
        } else if (num === '') {
            Toast.show("Mobile Number Field Is Required", Toast.SHORT);
        } else if (num.length < 10) {
            Toast.show("Please Enter Must 10 Digit Mobile Number", Toast.SHORT);
        } else if (selected === 'Select') {
            Toast.show("Please Select A Valid Country Code", Toast.SHORT);
        } else if (email === '') {
            Toast.show("Email Field Is Required", Toast.SHORT);
        } else if (email !== '' && validateIsEmail(email) === false) {
            Toast.show("Please Enter Valid Email Address", Toast.SHORT);
        } else if (selectedOption === 'Select Order type') {
            Toast.show("Please Select A Select Order Type", Toast.SHORT);
        } else if (descRef === '') {
            Toast.show("Description Field Is Required", Toast.SHORT);
        } else {
            // Toast.show("Done", Toast.SHORT);
            // props.navigation.goBack();
            axiosPaymentSupportPostRequest();
        }
    }

    const axiosPaymentSupportPostRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosUserPaymentSupportPostRequest();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosUserPaymentSupportPostRequest = async () => {
        // const url = 'https://rideshareandcourier.graphiglow.in/api/paymentSupport/add';
        const url = `${API.BASE_URL}/paymentSupport/add`;

        // Prepare data in JSON format
        const data = {
            type: "Driver",
            username: name,
            email: email,
            mobilenumber: selected.label + num,
            orderType: selectedOption.labelSeat,
            descriptionsDispute: descRef
        };

        console.log("SupportData==>", JSON.stringify(data, null, 2));

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 201
                    &&
                    response?.data?.message === 'PaymentSupport created successfully') {
                    // Handle API response here

                    console.log("SupportDataResponse==>",
                        JSON.stringify(response?.data, null, 2));

                    Toast.show('Success! Payment Support Details Submitted!', Toast.SHORT);
                    // props.navigation.goBack();
                    setModalPAY(false);

                } else {
                    Toast.show('Enabel To Request Submitted!', Toast.SHORT);
                    //  Welcome! Signed in successfully.
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Enabel To Request Submitted!', Toast.SHORT);
            });
    };



    const handleAccountEmail = (useremail: any) => {
        setEmail(useremail);
        if (validateIsEmail(useremail) === false) {
            setIsFocusedEmail(true)
            setValidEmail(false)
        } else {
            setValidEmail(true)
            setIsFocusedEmail(false)
        }
    }

    const handleAccountName1 = (userpass: any) => {
        setName(userpass);
        if (userpass.length < 3) {
            setIsFocusedName(true);
            setValidName(false)
        } else {
            setValidName(true);
            setIsFocusedName(false)
        }
    }

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleFocusMobile = () => {
        setIsFocusedMobile(true)
    }

    const handleFocusPassRefCode = () => {
        setIsFocusedPasswordRef(true)
    }

    const handleAccountRefCode = (userpass: any) => {
        setPassRef(userpass);
        if (userpass.length < 6) {
            setIsFocusedPasswordRef(true);
            setValidRefCode(false)
        } else {
            setValidRefCode(true);
            setIsFocusedPasswordRef(false)
        }
    }


    const handleAccountNumber = (useremail: any) => {
        setNumber(useremail);
        if (validateIsPhoneNumber(useremail) === false) {
            setIsFocusedMobile(true)
            setValidNumber(false)
        } else {
            setValidNumber(true)
            setIsFocusedMobile(false)
        }
    }



    const onPressRaiseDispute = () => {
        if (name === '') {
            Toast.show("Name Field Is Required", Toast.SHORT);
        } else if (name.length < 3) {
            Toast.show("Please Enter Must 3 Character Name", Toast.SHORT);
        } else if (num === '') {
            Toast.show("Mobile Number Field Is Required", Toast.SHORT);
        } else if (num.length < 10) {
            Toast.show("Please Enter Must 10 Digit Mobile Number", Toast.SHORT);
        } else if (selected === 'Select') {
            Toast.show("Please Select A Valid Country Code", Toast.SHORT);
        } else if (email === '') {
            Toast.show("Email Field Is Required", Toast.SHORT);
        } else if (email !== '' && validateIsEmail(email) === false) {
            Toast.show("Please Enter Valid Email Address", Toast.SHORT);
        } else if (passRef === '') {
            Toast.show("Reason of Dispute Field Is Required", Toast.SHORT);
        } else if (passRef.length < 6) {
            Toast.show("Please Enter Must 5-10 Character Reason of Dispute Address", Toast.SHORT);
        } else if (descRef === '') {
            Toast.show("Description Field Is Required", Toast.SHORT);
        } else {

            // Toast.show("Done", Toast.SHORT);
            // props.navigation.goBack();
            axiosPostRequestRaiseDispute()
        }
    }

    const axiosPostRequestRaiseDispute = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostRequestUserRaiseDispute();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostRequestUserRaiseDispute = async () => {
        // const url = 'https://rideshareandcourier.graphiglow.in/api/raiseDispute/add';
        const url = `${API.BASE_URL}/raiseDispute/add`;

        // Prepare data in JSON format
        const data = {
            type: "user",
            username: name,
            email: email,
            mobilenumber: selected.label + num,
            reason: passRef,
            descriptionsDispute: descRef
        };

        console.log("RaiseDisputeData==>", JSON.stringify(data, null, 2));

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 201
                    &&
                    response?.data?.message === 'RaiseDispute created successfully') {
                    // Handle API response here

                    console.log("RaiseDisputeDataResponse==>",
                        JSON.stringify(response?.data, null, 2));

                    Toast.show('Success! Raise Dispute Details Submitted!', Toast.SHORT);
                    // navigation.goBack();
                    setModalRISE(false);

                } else {
                    Toast.show('Enabel To Request Submitted!', Toast.SHORT);
                    //  Welcome! Signed in successfully.
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Enabel To Request Submitted!', Toast.SHORT);
            });
    };


    const handleAccountDesc = (userpass: any) => {
        setDescRef(userpass);
        if (userpass.length < 3) {
            setIsFocusedPasswordDesc(true);
            setValidDescCode(false)
        } else {
            setValidDescCode(true);
            setIsFocusedPasswordDesc(false)
        }
    }


    const handleFocusPassDesc = () => {
        setIsFocusedPasswordDesc(true)
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

        // setApplyNowBG(false);
        // setApplyEdit(false);
        // setisApplyNowBtn(true);
        // setisApplyNowText(true);
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


    const handleAccountName = (userpass: any) => {
        setName(userpass);
        if (userpass.length < 3) {
            setIsFocusedName(true);
            setValidName(false)
        } else {
            setValidName(true);
            setIsFocusedName(false)
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

                            no_rate = response?.data?.ratings?.numberOfRatings;
                            setRated(no_rate);

                            console.log("avg_username===>", avg_username);

                            setDefaultRating(averageRating);
                            // setDRIVERNAME(avg_username);
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

    const toggleModalFeedback = () => {
        setModalFeedBack(!isModalFeedBack);
    };


    const toggleModalCancel = () => {
        setModalCancel(!isModalCancel);
    };

    const onPressCancelBooking = () => {
        setModalBOOKINGCANCEL(true);

        // Cancel Booking 
        // axiosCancelBookingPostRequest();
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
                        // navigation.goBack();
                        setModalDRIVER(false);

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

            const USER_RIDEIDID = await AsyncStorage.getItem('store_RIDEID');

            console.log("axiosCancelBookingSurePostRequest===>", url);

            // Prepare data in JSON format
            const data = {
                RideId: USER_RIDEIDID !== null ? JSON.parse(USER_RIDEIDID) : ""
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

                        // TODO :
                        // setModalCancel(false) // Cancel-1
                        // setModalBOOKINGCANCEL(true);

                        // navigation.navigate("CancelBookingDetailsMapUp", {
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



    const onPressContactUs = () => {
        if (name === '') {
            Toast.show("Name Field Is Required", Toast.SHORT);
        } else if (name.length < 3) {
            Toast.show("Please Enter Must 3 Character Name", Toast.SHORT);
        } else if (num === '') {
            Toast.show("Mobile Number Field Is Required", Toast.SHORT);
        } else if (num.length < 10) {
            Toast.show("Please Enter Must 10 Digit Mobile Number", Toast.SHORT);
        } else if (selected === 'Select') {
            Toast.show("Please Select A Valid Country Code", Toast.SHORT);
        } else if (email === '') {
            Toast.show("Email Field Is Required", Toast.SHORT);
        } else if (email !== '' && validateIsEmail(email) === false) {
            Toast.show("Please Enter Valid Email Address", Toast.SHORT);
        } else if (passRef === '') {
            Toast.show("Subject Field Is Required", Toast.SHORT);
        } else if (descRef === '') {
            Toast.show("Description Field Is Required", Toast.SHORT);
        } else {
            // Toast.show("Done", Toast.SHORT);
            axiosContactUsPostRequest();
        }
    }

    const axiosContactUsPostRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosUserContactUsPostRequest();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosUserContactUsPostRequest = async () => {
        // const url = 'https://rideshareandcourier.graphiglow.in/api/contact/contact';
        const url = `${API.BASE_URL}/contact/contact`;

        // Prepare data in JSON format
        const data = {
            username: name,
            email: email,
            mobilenumber: selected.label + num,
            descriptions: descRef
        };

        console.log("ContactData==>", JSON.stringify(data, null, 2));

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 201
                    &&
                    response?.data?.message === 'Contact created successfully') {
                    // Handle API response here

                    console.log("ContactDataResponse==>",
                        JSON.stringify(response?.data, null, 2));

                    Toast.show('Success! Contact Us Details Submitted!', Toast.SHORT);
                    // props.navigation.goBack();
                    setModalOTHER(false);

                } else {
                    Toast.show('Enabel To Request Submitted!', Toast.SHORT);
                    //  Welcome! Signed in successfully.
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Enabel To Request Submitted!', Toast.SHORT);
            });
    };


    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <View style={Styles.container}>

                <Modal
                    isVisible={isModalStatus}
                    style={Styles.viewModalMargin}
                    onBackdropPress={() => setModalStatus(false)}
                    onBackButtonPress={() => setModalStatus(false)}>
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
                                            // title={requestSentDate} // title={ScreenText.Date}----00000
                                            textDecorationLine={'none'}
                                            title={currentDate.format('LLL')} // as request accept
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
                                            onPress={() => setModalDRIVER(true)}
                                            // onPress={() =>
                                            //     navigation.navigate('PreferredDriverUp', {
                                            //         itemRider_ID_: route.params.itemRIDER_ID_SENT,
                                            //     })
                                            // }**
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
                                            // title={ScreenText.OTPShareWithDriver}
                                            title={isPICKSHARE ? "" : ScreenText.OTPShareWithDriver}
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
                                            title={isPaynow ? "" : ScreenText.PayNow}
                                            textDecorationLine={'underline'} // BookingDetailsMapUp
                                            onPress={() => setModalPAY1(true)}
                                            // onPress={() => {
                                            //     console.log({
                                            //         itemBokingDetailsMapId: route.params.itemRIDER_ID_SENT,
                                            //         itemBokingDetailsMapDistance: route.params.itemRIDER_DISTANCE_SENT,
                                            //         itemBokingDetailsMapDuration: route.params.itemRIDER_DURATUION_SENT,
                                            //         itemMapPickStation: route.params.itemRIDER_PICKSTATION,
                                            //         itemMapDropStation: route.params.itemRIDER_DROPSTATION,
                                            //         itemMapRideCharge: route.params.itemRIDER_RIDE_CHARGE,
                                            //         itemMapRideFeesCon: route.params.itemRIDER_RIDE_FEES_CON,
                                            //         itemMapRideWattingCharges: route.params.itemRIDER_RIDE_WAITING_CHARGES,
                                            //         itemMapRideDiscount: route.params.itemRIDER_RIDE_DICOUNT,
                                            //         itemMapRideTotalAmount: route.params.itemRIDER_RIDE_TOTALAMOUNT,
                                            //     });
                                            //     navigation.navigate("BookingDetailsMapUp", {
                                            //         itemBokingDetailsMapId: route.params.itemRIDER_ID_SENT,
                                            //         itemBokingDetailsMapDistance: route.params.itemRIDER_DISTANCE_SENT,
                                            //         itemBokingDetailsMapDuration: route.params.itemRIDER_DURATUION_SENT,
                                            //         itemMapPickStation: route.params.itemRIDER_PICKSTATION,
                                            //         itemMapDropStation: route.params.itemRIDER_DROPSTATION,
                                            //         itemMapRideCharge: route.params.itemRIDER_RIDE_CHARGE,
                                            //         itemMapRideFeesCon: route.params.itemRIDER_RIDE_FEES_CON,
                                            //         itemMapRideWattingCharges: route.params.itemRIDER_RIDE_WAITING_CHARGES,
                                            //         itemMapRideDiscount: route.params.itemRIDER_RIDE_DICOUNT,
                                            //         itemMapRideTotalAmount: route.params.itemRIDER_RIDE_TOTALAMOUNT,
                                            //     });
                                            // }}
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
                                            // title={requestSentDate}
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

                            <Modal
                                // isVisible={isModalCancel}
                                isVisible={isModalCancel}
                                onBackButtonPress={() => setModalCancel(false)}
                                onBackdropPress={() => setModalCancel(false)}
                            >
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

                            <Modal
                                // isVisible={isModalFeedBack}
                                isVisible={isModalFeedBack}
                                onBackButtonPress={() => setModalFeedBack(false)}
                                onBackdropPress={() => setModalFeedBack(false)}
                            >
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
                                        onPress={() => setModalHELP(true)}
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
                                                    onPress={() => {
                                                        if (isDRIVERSTATUS === "Ride Complete") {

                                                            setModalPAY1(true);

                                                            // navigation.navigate("BookingDetailsMapUp", {
                                                            //     itemBokingDetailsMapId: route.params.itemRIDER_ID_SENT,
                                                            //     itemBokingDetailsMapDistance: route.params.itemRIDER_DISTANCE_SENT,
                                                            //     itemBokingDetailsMapDuration: route.params.itemRIDER_DURATUION_SENT,
                                                            //     itemMapPickStation: route.params.itemRIDER_PICKSTATION,
                                                            //     itemMapDropStation: route.params.itemRIDER_DROPSTATION,
                                                            //     itemMapRideCharge: route.params.itemRIDER_RIDE_CHARGE,
                                                            //     itemMapRideFeesCon: route.params.itemRIDER_RIDE_FEES_CON,
                                                            //     itemMapRideWattingCharges: route.params.itemRIDER_RIDE_WAITING_CHARGES,
                                                            //     itemMapRideDiscount: route.params.itemRIDER_RIDE_DICOUNT,
                                                            //     itemMapRideTotalAmount: route.params.itemRIDER_RIDE_TOTALAMOUNT,
                                                            // });
                                                        } else {
                                                            setModalMAP(true);
                                                        }
                                                    }}

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

                <Modal
                    isVisible={isModalPAY1}
                    animationIn="slideInLeft"  // Specify the animation for entering the screen
                    style={Styles.viewModalMargin}
                    onBackdropPress={() => setModalPAY1(false)}
                    onBackButtonPress={() => setModalPAY1(false)}>
                    <View style={Styles.container}>
                        <ScrollView
                            bounces={true}
                            overScrollMode="always">
                            <View style={CommonStyle.commonFlex}>
                                <View style={Styles.viewHeader}>
                                    <HeaderComponent
                                        margin={wp(3)}
                                        backgroundColorOpacity={Colors.circleGray}
                                        borderRadiusOpacity={wp(10)}
                                        paddingOpacity={wp(2)}
                                        transform={[{ rotate: '180deg' }]}
                                        textAlign={"left"}
                                        source={Images.arrowRight}
                                        marginTop={wp(2)}
                                        width={wp(7)}
                                        marginHorizontal={wp(5)}
                                        height={wp(7)}
                                        color={Colors.white}
                                        fontFamily={Fonts.InterSemiBold}
                                        fontWeight="500"
                                        title={"Booking Details"} //uPUPUPPUPu
                                        fontSize={wp(4)}
                                        onPress={() => setModalPAY1(false)}
                                    />


                                </View>

                                <View style={Styles.viewRowContent}>

                                    <View style={Styles.textConatiner1}>
                                        <TextComponent
                                            color={Colors.white}
                                            title={"Services Request"}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.grayFull}
                                            title={isSERVICE_TYPE}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={Styles.textConatiner2}>
                                        <TextComponent
                                            color={Colors.white}
                                            title={"Vehicle"}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.grayFull}
                                            title={isVEHICAL}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={Styles.textConatiner3}>
                                        <TextComponent
                                            color={Colors.white}
                                            title={"Date Of Ride"}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.grayFull}
                                            title={isDATE_OF_RIDE}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={Styles.textConatiner2}>
                                        <TextComponent
                                            color={Colors.white}
                                            title={"Ride Id"}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.grayFull}
                                            title={isRIDEID}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={Styles.viewLineHorizontal}>
                                    </View>

                                    <View style={Styles.viewRowConatiner}>

                                        <View style={CommonStyle.commonContent}>
                                            <Image
                                                style={Styles.imageUser}
                                                resizeMode="contain"
                                                source={{ uri: isDRIVERPROFILe }} />
                                        </View>

                                        <View style={CommonStyle.commonContent}>
                                            <TextComponent
                                                color={Colors.white}
                                                title={isDRIVERNAME}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(3.5)}
                                                marginHorizontal={wp(2)}
                                                marginVertical={wp(1)}
                                                fontFamily={Fonts.PoppinsSemiBold}
                                                textAlign='left'
                                            />
                                            <View style={CommonStyle.commonRow}>
                                                <TextComponent
                                                    color={Colors.grayDark}
                                                    title={"You Rated"}
                                                    textDecorationLine={'none'}
                                                    marginHorizontal={wp(2)}
                                                    fontWeight="400"
                                                    fontSize={wp(3.5)}
                                                    marginVertical={wp(1)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    textAlign='left'
                                                />
                                                <View style={Styles.viewRatting}>

                                                    <View style={Styles.customRatingBarStyle}>
                                                        {maxRating.map((item, key) => {
                                                            return (
                                                                <View style={CommonStyle.commonRow}>
                                                                    <TouchableOpacity
                                                                        activeOpacity={0.7}
                                                                        disabled={true}
                                                                        key={item}
                                                                        onPress={() => setDefaultRating(item)}>
                                                                        <Image
                                                                            style={Styles.starImageStyle}
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

                                    </View>

                                    <View style={Styles.textFareConatiner}>
                                        <TextComponent
                                            color={Colors.white}
                                            title={"Fare"}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.grayFull}
                                            title={"$ " + isFARE}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={Styles.textConatiner2}>
                                        <TextComponent
                                            color={Colors.white}
                                            title={"Paid by"}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.grayFull}
                                            title={isPAYMEMT_TYPE}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={Styles.viewKMConatiner}>
                                        <View style={Styles.rowSpace}>
                                            <View style={CommonStyle.justifyContent}>
                                                <TextComponent
                                                    color={Colors.white}
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
                                                    // title={route?.params?.itemRIDER_DISTANCE_SENT}
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

                                    <View style={Styles.viewSeprateLine3}>
                                        <TextComponent
                                            color={Colors.white}
                                            title={"Ride Charge"}
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

                                    <View style={Styles.viewSeprateLine3}>
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

                                    <View style={Styles.viewSeprateLine3}>
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
                                            title={"$ " + isWATTING_CHARGES}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            marginVertical={wp(3)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={Styles.viewSeprateLine3}>
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

                                    <View style={Styles.viewSeprateLine3}>
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
                                            title={"$ " + isTOTAL_AMOUNT}
                                            marginVertical={wp(1)} // 3
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={Styles.viewSeprateLine3}>
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

                                    <TouchableOpacity
                                        activeOpacity={0.1}
                                        onPress={() =>
                                            setModalHELP(true)}
                                    >

                                        <View style={Styles.viewHelpAndSupport}>
                                            <View style={CommonStyle.justifyContent}>
                                                <Image
                                                    style={Styles.imageHelp}
                                                    resizeMode="contain"
                                                    source={Images.helpAndSupportIcon} />
                                            </View>

                                            <View style={CommonStyle.justifyContent}>
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={"Help & Support"}
                                                    textDecorationLine={'none'}
                                                    fontWeight="400"
                                                    fontSize={wp(4)}
                                                    marginHorizontal={wp(3)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    marginVertical={wp(3)}
                                                    textAlign='left'
                                                />
                                            </View>

                                            <View style={Styles.viewRightArrow}>
                                                <Image
                                                    style={Styles.imageArrow}
                                                    resizeMode="contain"
                                                    source={Images.rightArrowIcon} />
                                            </View>


                                        </View>

                                    </TouchableOpacity>


                                    <View>
                                        <ButtonComponent
                                            isVisibleMobile={false}
                                            isVisibleFaceBook={false}
                                            marginVertical={hp(1)}
                                            heightBtn={hp(7)}
                                            widthBtn={wp(90)}
                                            isRightArrow={false}
                                            onPress={() => setModalPAYCOMPLETE(true)}
                                            // onPress={async () => {

                                            //     // GET DATA :
                                            //     try {
                                            //         const USER_DRIVER_IDget = await AsyncStorage.getItem('store_driver_id');
                                            //         const USER_RIDE_ID_get = await AsyncStorage.getItem('store_ride_id_');
                                            //         const USER_RIDEIDID = await AsyncStorage.getItem('store_RIDEID');
                                            //         const USER_PAY_TYPE = await AsyncStorage.getItem('store_pay_type');


                                            //         if (USER_DRIVER_IDget !== null && USER_RIDE_ID_get !==
                                            //             null && USER_RIDEIDID !== null && USER_PAY_TYPE !== null) {
                                            //             navigation.navigate('PaymentCompleteUp', {
                                            //                 itemCompleteDistance: route?.params?.itemBokingDetailsMapDistance,
                                            //                 itemCompleteDuration: route?.params?.itemBokingDetailsMapDuration,
                                            //                 itemCompletePickStation: route?.params?.itemMapPickStation,
                                            //                 itemCompleteDropStation: route?.params?.itemMapDropStation,
                                            //                 itemCompleteRideCharge: route?.params?.itemMapRideCharge,
                                            //                 itemCompleteRideFeesCon: route?.params?.itemMapRideFeesCon,
                                            //                 itemCompleteRideWattingCharges: route?.params?.itemMapRideWattingCharges,
                                            //                 itemCompleteRideDiscount: route?.params?.itemMapRideDiscount,

                                            //                 itemCompleteTotalAmount: isTOTAL_AMOUNT, // Note: This line might need correction
                                            //                 itemCompleteDriverId: JSON.parse(USER_DRIVER_IDget),
                                            //                 itemCompleteRideId: JSON.parse(USER_RIDE_ID_get),
                                            //                 itemCompleteRideIDID: JSON.parse(USER_RIDEIDID),
                                            //                 itemCompletePayType: JSON.parse(USER_PAY_TYPE)
                                            //             });
                                            //         } else {

                                            //         }

                                            //     } catch (error) {

                                            //     }
                                            // }}
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
                    </View>
                </Modal>

                <Modal
                    isVisible={isModalHELP}
                    animationIn="slideInLeft"  // Specify the animation for entering the screen
                    style={Styles.viewModalMargin}
                    onBackdropPress={() => setModalHELP(false)}
                    onBackButtonPress={() => setModalHELP(false)}>

                    <View style={Styles.container}
                    >
                        <ScrollView
                            bounces={true}
                            overScrollMode="always">
                            <View style={Styles.container}>
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
                                    title={"Help & Support"}
                                    fontSize={wp(4)}
                                    onPress={() => setModalHELP(false)}
                                />

                                <View>
                                    <TouchableOpacity
                                        activeOpacity={0.2}
                                        style={Styles.helpConatiner}
                                        onPress={() => setModalRISE(true)}>

                                        <View>
                                            <Image
                                                style={Styles.imageStop}
                                                resizeMode="contain"
                                                source={Images.stopIcon} />
                                        </View>

                                        <View>
                                            <TextComponent
                                                color={Colors.white}
                                                title={ScreenText.RaiseDispute}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                marginHorizontal={wp(5)}
                                                textAlign='left'
                                            />
                                            <TextComponent
                                                color={Colors.gray}
                                                title={ScreenText.Help1}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(3)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                marginHorizontal={wp(5)}
                                                textAlign='left'
                                            />
                                        </View>

                                        <View style={CommonStyle.commonContent}>
                                            <Image
                                                style={Styles.imageArrow}
                                                resizeMode="contain"
                                                source={Images.rightArrowIcon} />
                                        </View>

                                    </TouchableOpacity>
                                </View>

                                <View style={Styles.ItemSeparatorComponent}>
                                </View>

                                <View>
                                    <TouchableOpacity
                                        activeOpacity={0.2}
                                        style={Styles.helpConatiner}
                                        onPress={() => setModalPAY(true)}>
                                        <View>
                                            <Image
                                                style={Styles.imageStop}
                                                resizeMode="contain"
                                                source={Images.headPhoneIcon} />
                                        </View>

                                        <View>
                                            <TextComponent
                                                color={Colors.white}
                                                title={ScreenText.PaymentSupport}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                marginHorizontal={wp(5)}
                                                textAlign='left'
                                            />
                                            <TextComponent
                                                color={Colors.gray}
                                                title={ScreenText.Help2}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(3)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                marginHorizontal={wp(5)}
                                                textAlign='left'
                                            />
                                        </View>

                                        <View style={CommonStyle.commonContent}>
                                            <Image
                                                style={Styles.imageArrow}
                                                resizeMode="contain"
                                                source={Images.rightArrowIcon} />
                                        </View>

                                    </TouchableOpacity>
                                </View>

                                <View style={Styles.ItemSeparatorComponent}>
                                </View>

                                <View>
                                    <TouchableOpacity
                                        activeOpacity={0.2}
                                        style={Styles.helpConatiner}
                                        onPress={() => setModalOTHER(true)}>
                                        <View>
                                            <Image
                                                style={Styles.imageStop}
                                                resizeMode="contain"
                                                source={Images.questionIcon} />
                                        </View>

                                        <View>
                                            <TextComponent
                                                color={Colors.white}
                                                title={ScreenText.OtherSupport}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                marginHorizontal={wp(5)}
                                                textAlign='left'
                                            />
                                            <TextComponent
                                                color={Colors.gray}
                                                title={ScreenText.Help3}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(3)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                marginHorizontal={wp(5)}
                                                textAlign='left'
                                            />
                                        </View>

                                        <View style={CommonStyle.commonContent}>
                                            <Image
                                                style={Styles.imageArrow}
                                                resizeMode="contain"
                                                source={Images.rightArrowIcon} />
                                        </View>

                                    </TouchableOpacity>
                                </View>

                            </View>

                        </ScrollView>

                    </View>

                </Modal>

                <Modal
                    isVisible={isModalRISE}
                    animationIn="slideInLeft"  // Specify the animation for entering the screen
                    style={Styles.viewModalMargin}
                    onBackdropPress={() => setModalRISE(false)}
                    onBackButtonPress={() => setModalRISE(false)}>
                    <View style={Styles.container}>

                        <ScrollView style={Styles.container}
                            bounces={true}
                            overScrollMode="always"
                        >
                            <View style={Styles.container}>
                                <View style={Styles.viewRiseHeader}>
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
                                        title={"Raise Dispute"}
                                        fontSize={wp(4)}
                                        onPress={() => setModalRISE(false)}
                                    />
                                </View>
                                <View style={Styles.viewFirstConatiner}>
                                    <View style={Styles.textCreateANewAccount}>
                                        <TextInputComponent
                                            selectionColor={Colors.white}
                                            isVisibleDropDown={false}
                                            isVisibleEye={false}
                                            isVisibleEye_={false}
                                            isVisibleMail={false}
                                            isVisibleMailGray={false}
                                            isVisibleLockWhite={false}
                                            marginVertical={hp(0)}
                                            marginTop={wp(5)}
                                            isVisibleUser={true}
                                            width={wp(90)}
                                            borderWidth={isFocused ? ConstValue.value1 : ConstValue.value0}
                                            borderColor={isFocused ? Colors.white : Colors.blue}
                                            height={hp(7)}
                                            isUserHide={false}
                                            textfontSize={ConstValue.value15}
                                            textfontFamily={Fonts.PoppinsRegular}
                                            textlineHeight={ConstValue.value0}
                                            ref={refName}
                                            placeholder={ScreenText.EnterUserName}
                                            editable={true}
                                            multiline={false}
                                            secureTextEntry={false}
                                            isPadding={true}
                                            keyboardType='default'
                                            textAlign='left'
                                            numberOfLines={null}
                                            color={Colors.white}
                                            backgroundColor={Colors.grayDark}
                                            borderRadius={wp(2)}
                                            onFocus={handleFocus}
                                            onChangeText={handleAccountName}
                                            onSubmitEditing={() => {
                                                refMobile?.current?.focus();
                                            }}
                                            placeholderTextColor={Colors.gray}
                                        />
                                        {!isValidName ?
                                            <TextComponent
                                                textDecorationLine={'none'}
                                                color={Colors.red}
                                                title={ScreenText.ValidUserName}
                                                fontWeight="400"
                                                marginTop={wp(1)}
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                            />
                                            : null}

                                    </View>

                                    <View>
                                        <TextInputComponent
                                            selectionColor={Colors.white}
                                            isVisibleDropDown={true}
                                            isVisibleEye={false}
                                            isVisibleEye_={false}
                                            selectedImage={selectedImage || Images1.downArrow}
                                            selected={(!!selected && selected.label) || 'Select'}
                                            toggleDropdown={toggleDropdown}
                                            renderDropdown={renderDropdown}
                                            isArrow={false}
                                            isArrowLeft={true}
                                            marginVertical={hp(0)}
                                            marginHorizontal={wp(4)}
                                            width={wp(90)}
                                            borderWidth={isFocusedMobile ? ConstValue.value1 : ConstValue.value0}
                                            borderColor={isFocusedMobile ? Colors.white : Colors.blue}
                                            height={hp(7)}
                                            isUserHide={false}
                                            textfontSize={ConstValue.value15}
                                            textfontFamily={Fonts.PoppinsRegular}
                                            textlineHeight={ConstValue.value0}
                                            ref={refMobile}
                                            placeholder={ScreenText.EnterMobile}
                                            editable={true}
                                            multiline={false}
                                            secureTextEntry={false}
                                            isPadding={true}
                                            keyboardType='numeric'
                                            textAlign='left'
                                            numberOfLines={null}
                                            maxLength={10}
                                            color={Colors.white}
                                            backgroundColor={Colors.grayDark}
                                            borderRadius={wp(2)}
                                            onFocus={handleFocusMobile}
                                            onChangeText={handleAccountNumber}
                                            onSubmitEditing={() => {
                                                refEmail?.current?.focus();
                                            }}
                                            placeholderTextColor={Colors.gray}
                                        />
                                        {!isValidNumber ?
                                            <TextComponent
                                                marginLeft={wp(4)}
                                                textDecorationLine={'none'}
                                                color={Colors.red}
                                                title={ScreenText.ValidMobileNumber}
                                                fontWeight="400"
                                                fontSize={wp(4)}
                                                marginTop={wp(1)}
                                                fontFamily={Fonts.PoppinsRegular}
                                            />
                                            : null}

                                    </View>

                                    <View>
                                        <TextInputComponent
                                            selectionColor={Colors.white}
                                            isVisibleDropDown={false}
                                            isVisibleEye={false}
                                            isVisibleEye_={false}
                                            isVisibleMail={false}
                                            isVisibleMailGray={true}
                                            isVisibleLockWhite={false}
                                            marginVertical={hp(0)}
                                            marginHorizontal={wp(4)}
                                            width={wp(90)}
                                            borderWidth={isFocusedEmail ? ConstValue.value1 : ConstValue.value0}
                                            borderColor={isFocusedEmail ? Colors.white : Colors.blue}
                                            height={hp(7)}
                                            marginTop={hp(2)}
                                            isUserHide={false}
                                            textfontSize={ConstValue.value15}
                                            textfontFamily={Fonts.PoppinsRegular}
                                            textlineHeight={ConstValue.value0}
                                            ref={refEmail}
                                            placeholder={ScreenText.EnterEmail}
                                            editable={true}
                                            multiline={false}
                                            secureTextEntry={false}
                                            isPadding={true}
                                            keyboardType='default'
                                            textAlign='left'
                                            numberOfLines={null}
                                            color={Colors.white}
                                            backgroundColor={Colors.grayDark}
                                            borderRadius={wp(2)}
                                            onFocus={handleFocusEmail}
                                            onChangeText={handleAccountEmail}
                                            onSubmitEditing={() => {
                                                refDispute?.current?.focus();
                                            }}
                                            placeholderTextColor={Colors.gray}
                                        />
                                        {!isValidEmail ?
                                            <TextComponent
                                                marginLeft={wp(4)}
                                                textDecorationLine={'none'}
                                                color={Colors.red}
                                                title={ScreenText.ValidEmail}
                                                fontWeight="400"
                                                marginTop={wp(1)}
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                            />
                                            : null}
                                    </View>

                                    <View>
                                        <TextInputComponent
                                            selectionColor={Colors.white}
                                            isVisibleDropDown={false}
                                            isVisibleLock={false}
                                            isVisibleRef={false}
                                            marginVertical={hp(1)}
                                            marginHorizontal={wp(4)}
                                            width={wp(90)}
                                            borderWidth={isFocusedPasswordRef ? ConstValue.value1 : ConstValue.value0}
                                            borderColor={isFocusedPasswordRef ? Colors.white : Colors.blue}
                                            height={hp(7)}
                                            marginTop={hp(2)}
                                            isUserHide={false}
                                            textfontSize={ConstValue.value15}
                                            textfontFamily={Fonts.PoppinsRegular}
                                            textlineHeight={ConstValue.value0}
                                            ref={refDispute}
                                            placeholder={ScreenText.ReasonofDispute}
                                            editable={true}
                                            multiline={false}
                                            isPadding={true}
                                            keyboardType='default'
                                            textAlign='left'
                                            numberOfLines={null}
                                            color={Colors.white}
                                            backgroundColor={Colors.grayDark}
                                            borderRadius={wp(2)}
                                            onFocus={handleFocusPassRefCode}
                                            onChangeText={handleAccountRefCode}
                                            onSubmitEditing={() => {
                                                refDesc?.current?.focus();
                                            }}
                                            placeholderTextColor={Colors.gray}
                                        />
                                        {!isValidRefCode ?
                                            <TextComponent
                                                marginLeft={wp(4)}
                                                textDecorationLine={'none'}
                                                color={Colors.red}
                                                title={ScreenText.ValidRef}
                                                fontWeight="400"
                                                marginTop={wp(1)}
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                            />
                                            : null}
                                    </View>

                                    <View>
                                        <TextInputComponent
                                            selectionColor={Colors.white}
                                            isVisibleDropDown={false}
                                            isVisibleLock={false}
                                            isVisibleRef={false}
                                            marginVertical={hp(1)}
                                            marginHorizontal={wp(4)}
                                            width={wp(90)}
                                            borderWidth={isFocusedPasswordDesc ? ConstValue.value1 : ConstValue.value0}
                                            borderColor={isFocusedPasswordDesc ? Colors.white : Colors.blue}
                                            height={hp(15)}
                                            marginTop={hp(2)}
                                            isUserHide={false}
                                            textfontSize={ConstValue.value15}
                                            textfontFamily={Fonts.PoppinsRegular}
                                            textlineHeight={ConstValue.value0}
                                            ref={refDesc}
                                            textAlignVertical="top"
                                            placeholder={ScreenText.WritedescriptionHear}
                                            editable={true}
                                            multiline={false}
                                            isPadding={true}
                                            keyboardType='default'
                                            textAlign='left'
                                            numberOfLines={null}
                                            color={Colors.white}
                                            backgroundColor={Colors.grayDark}
                                            borderRadius={wp(2)}
                                            onFocus={handleFocusPassDesc}
                                            onChangeText={handleAccountDesc}
                                            onSubmitEditing={() => {
                                            }}
                                            placeholderTextColor={Colors.gray}
                                        />
                                        {!isValidDescCode ?
                                            <TextComponent
                                                marginLeft={wp(4)}
                                                marginTop={wp(1)}
                                                textDecorationLine={'none'}
                                                color={Colors.red}
                                                title={ScreenText.ValidDesc}
                                                fontWeight="400"
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                            />
                                            : null}
                                    </View>

                                </View>

                                <View style={Styles.viewSecondConatiner}>
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        heightBtn={hp(7)}
                                        widthBtn={wp(90)}
                                        isRightArrow={false}
                                        color={Colors.white}
                                        title={ScreenText.Submit}
                                        marginVertical={wp(10)}
                                        onPress={onPressRaiseDispute}
                                        // onPress={() => {
                                        //     if (name === "") {
                                        //         // Do something if condition is true
                                        //         Alert.alert("tests" + name);
                                        //     } else {
                                        //         // Do something else if condition is false
                                        //         Alert.alert("tests-error");
                                        //     }
                                        // }}
                                        marginHorizontal={wp(4)}
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

                                </View>
                            </View>
                        </ScrollView>

                    </View>
                </Modal>

                <Modal
                    isVisible={isModalPAY}
                    animationIn="slideInLeft"  // Specify the animation for entering the screen
                    style={Styles.viewModalMargin}
                    onBackdropPress={() => setModalPAY(false)}
                    onBackButtonPress={() => setModalPAY(false)}>
                    <View style={Styles.container}>
                        <ScrollView style={Styles.container}
                            bounces={true}
                            overScrollMode="always">
                            <View style={Styles.container}>

                                <View style={Styles.viewRiseHeader}>
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
                                        title={"Payment Support"}
                                        fontSize={wp(4)}
                                        onPress={() => setModalPAY(false)}
                                    />
                                </View>

                                <View style={Styles.viewFirstConatiner}>
                                    <View style={Styles.textCreateANewAccount}>
                                        <TextInputComponent
                                            selectionColor={Colors.white}
                                            isVisibleDropDown={false}
                                            isVisibleEye={false}
                                            isVisibleEye_={false}
                                            isVisibleMail={false}
                                            isVisibleMailGray={false}
                                            isVisibleLockWhite={false}
                                            marginVertical={hp(0)}
                                            marginTop={wp(5)}
                                            isVisibleUser={true}
                                            width={wp(90)}
                                            borderWidth={isFocused ? ConstValue.value1 : ConstValue.value0}
                                            borderColor={isFocused ? Colors.white : Colors.blue}
                                            height={hp(7)}
                                            isUserHide={false}
                                            textfontSize={ConstValue.value15}
                                            textfontFamily={Fonts.PoppinsRegular}
                                            textlineHeight={ConstValue.value0}
                                            ref={refPassword}
                                            placeholder={ScreenText.EnterUserName}
                                            editable={true}
                                            multiline={false}
                                            secureTextEntry={false}
                                            isPadding={true}
                                            keyboardType='default'
                                            textAlign='left'
                                            numberOfLines={null}
                                            color={Colors.white}
                                            backgroundColor={Colors.grayDark}
                                            borderRadius={wp(2)}
                                            onFocus={handleFocus}
                                            onChangeText={handleAccountName1}
                                            onSubmitEditing={() => {
                                                refMobile?.current?.focus();
                                            }}
                                            placeholderTextColor={Colors.gray}
                                        />
                                        {!isValidName ?
                                            <TextComponent
                                                textDecorationLine={'none'}
                                                color={Colors.red}
                                                title={ScreenText.ValidUserName}
                                                fontWeight="400"
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                            />
                                            : null}

                                    </View>

                                    <View>
                                        <TextInputComponent
                                            selectionColor={Colors.white}
                                            isVisibleDropDown={true}
                                            isVisibleEye={false}
                                            isVisibleEye_={false}
                                            selectedImage={selectedImage || Images1.downArrow}
                                            selected={(!!selected && selected.label) || 'Select'}
                                            toggleDropdown={toggleDropdown}
                                            renderDropdown={renderDropdown}
                                            isArrow={false}
                                            isArrowLeft={true}
                                            marginVertical={hp(0)}
                                            marginHorizontal={wp(4)}
                                            width={wp(90)}
                                            borderWidth={isFocusedMobile ? ConstValue.value1 : ConstValue.value0}
                                            borderColor={isFocusedMobile ? Colors.white : Colors.blue}
                                            height={hp(7)}
                                            isUserHide={false}
                                            textfontSize={ConstValue.value15}
                                            textfontFamily={Fonts.PoppinsRegular}
                                            textlineHeight={ConstValue.value0}
                                            ref={refMobile}
                                            placeholder={ScreenText.EnterMobile}
                                            editable={true}
                                            multiline={false}
                                            secureTextEntry={false}
                                            isPadding={true}
                                            keyboardType='numeric'
                                            textAlign='left'
                                            numberOfLines={null}
                                            maxLength={10}
                                            color={Colors.white}
                                            backgroundColor={Colors.grayDark}
                                            borderRadius={wp(2)}
                                            onFocus={handleFocusMobile}
                                            onChangeText={handleAccountNumber}
                                            onSubmitEditing={() => {
                                                refEmail?.current?.focus();
                                            }}
                                            placeholderTextColor={Colors.gray}
                                        />
                                        {!isValidNumber ?
                                            <TextComponent
                                                marginLeft={wp(4)}
                                                textDecorationLine={'none'}
                                                color={Colors.red}
                                                title={ScreenText.ValidMobileNumber}
                                                fontWeight="400"
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                            />
                                            : null}

                                    </View>

                                    <View>
                                        <TextInputComponent
                                            selectionColor={Colors.white}
                                            isVisibleDropDown={false}
                                            isVisibleEye={false}
                                            isVisibleEye_={false}
                                            isVisibleMail={false}
                                            isVisibleMailGray={true}
                                            isVisibleLockWhite={false}
                                            marginVertical={hp(0)}
                                            marginHorizontal={wp(4)}
                                            width={wp(90)}
                                            borderWidth={isFocusedEmail ? ConstValue.value1 : ConstValue.value0}
                                            borderColor={isFocusedEmail ? Colors.white : Colors.blue}
                                            height={hp(7)}
                                            marginTop={hp(2)}
                                            isUserHide={false}
                                            textfontSize={ConstValue.value15}
                                            textfontFamily={Fonts.PoppinsRegular}
                                            textlineHeight={ConstValue.value0}
                                            ref={refEmail}
                                            placeholder={ScreenText.EnterEmail}
                                            editable={true}
                                            multiline={false}
                                            secureTextEntry={false}
                                            isPadding={true}
                                            keyboardType='default'
                                            textAlign='left'
                                            numberOfLines={null}
                                            color={Colors.white}
                                            backgroundColor={Colors.grayDark}
                                            borderRadius={wp(2)}
                                            onFocus={handleFocusEmail}
                                            onChangeText={handleAccountEmail}
                                            onSubmitEditing={() => {
                                                refDesc?.current?.focus();
                                            }}
                                            placeholderTextColor={Colors.gray}
                                        />
                                        {!isValidEmail ?
                                            <TextComponent
                                                marginLeft={wp(4)}
                                                textDecorationLine={'none'}
                                                color={Colors.red}
                                                title={ScreenText.ValidEmail}
                                                fontWeight="400"
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                            />
                                            : null}

                                    </View>

                                    <View style={{
                                        marginHorizontal: wp(2)
                                        , marginVertical: wp(2)
                                    }}>
                                        <CustomSelectOrder
                                            options={dataSeat}
                                            selectedLabel={selectedOption ? selectedOption.labelSeat : "Select Order type"}
                                            modalVisibleProp={modalVisible}
                                            handleOptionSelectProp={handleOptionSelect}
                                            onRequestCloseProp={onRequestClose}
                                        />
                                    </View>

                                    <View>
                                        <TextInputComponent
                                            selectionColor={Colors.white}
                                            isVisibleDropDown={false}
                                            isVisibleLock={false}
                                            isVisibleRef={false}
                                            marginVertical={hp(1)}
                                            marginHorizontal={wp(4)}
                                            width={wp(90)}
                                            borderWidth={isFocusedPasswordDesc ? ConstValue.value1 : ConstValue.value0}
                                            borderColor={isFocusedPasswordDesc ? Colors.white : Colors.blue}
                                            height={hp(15)}
                                            isUserHide={false}
                                            textfontSize={ConstValue.value15}
                                            textfontFamily={Fonts.PoppinsRegular}
                                            textlineHeight={ConstValue.value0}
                                            ref={refDesc}
                                            textAlignVertical="top"
                                            placeholder={ScreenText.WritedescriptionHear}
                                            editable={true}
                                            multiline={false}
                                            isPadding={true}
                                            keyboardType='default'
                                            textAlign='left'
                                            numberOfLines={null}
                                            color={Colors.white}
                                            backgroundColor={Colors.grayDark}
                                            borderRadius={wp(2)}
                                            onFocus={handleFocusPassDesc}
                                            onChangeText={handleAccountDesc}
                                            onSubmitEditing={() => {
                                            }}
                                            placeholderTextColor={Colors.gray}
                                        />
                                        {!isValidDescCode ?
                                            <TextComponent
                                                marginLeft={wp(4)}
                                                textDecorationLine={'none'}
                                                color={Colors.red}
                                                title={ScreenText.ValidDesc}
                                                fontWeight="400"
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsRegular}
                                            />
                                            : null}
                                    </View>

                                </View>

                                <View style={Styles.viewSecondConatiner}>
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        heightBtn={hp(7)}
                                        widthBtn={wp(90)}
                                        isRightArrow={false}
                                        color={Colors.white}
                                        title={ScreenText.Submit}
                                        onPress={onPressPaymentSupport}
                                        marginVertical={wp(10)}
                                        marginHorizontal={wp(4)}
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

                                </View>
                            </View>
                        </ScrollView>

                    </View>
                </Modal>

                <Modal
                    isVisible={isModalOTHER}
                    animationIn="slideInLeft"  // Specify the animation for entering the screen
                    style={Styles.viewModalMargin}
                    onBackdropPress={() => setModalOTHER(false)}
                    onBackButtonPress={() => setModalOTHER(false)}>
                    <ScrollView
                        bounces={true}
                        overScrollMode="always"
                    >
                        <View style={Styles.container}>
                            <View style={Styles.viewRiseHeader}>
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
                                    title={"Contact Us"}
                                    fontSize={wp(4)}
                                    onPress={() => setModalOTHER(false)}
                                />
                            </View>
                            <View style={Styles.viewFirstConatiner}>
                                <View style={Styles.textCreateANewAccount}>
                                    <TextInputComponent
                                        selectionColor={Colors.white}
                                        isVisibleDropDown={false}
                                        isVisibleEye={false}
                                        isVisibleEye_={false}
                                        isVisibleMail={false}
                                        isVisibleMailGray={false}
                                        isVisibleLockWhite={false}
                                        marginVertical={hp(0)}
                                        marginTop={wp(5)}
                                        isVisibleUser={true}
                                        width={wp(90)}
                                        borderWidth={isFocused ? ConstValue.value1 : ConstValue.value0}
                                        borderColor={isFocused ? Colors.white : Colors.blue}
                                        height={hp(7)}
                                        isUserHide={false}
                                        textfontSize={ConstValue.value15}
                                        textfontFamily={Fonts.PoppinsRegular}
                                        textlineHeight={ConstValue.value0}
                                        ref={refPassword}
                                        placeholder={ScreenText.EnterUserName}
                                        editable={true}
                                        multiline={false}
                                        secureTextEntry={false}
                                        isPadding={true}
                                        keyboardType='default'
                                        textAlign='left'
                                        numberOfLines={null}
                                        color={Colors.white}
                                        backgroundColor={Colors.grayDark}
                                        borderRadius={wp(2)}
                                        onFocus={handleFocus}
                                        onChangeText={handleAccountName}
                                        onSubmitEditing={() => {
                                            refMobile?.current?.focus();
                                        }}
                                        placeholderTextColor={Colors.gray}
                                    />
                                    {!isValidName ?
                                        <TextComponent
                                            textDecorationLine={'none'}
                                            color={Colors.red}
                                            title={ScreenText.ValidUserName}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            marginTop={wp(1)}
                                            fontFamily={Fonts.PoppinsRegular}
                                        />
                                        : null}

                                </View>

                                <View>
                                    <TextInputComponent
                                        selectionColor={Colors.white}
                                        isVisibleDropDown={true}
                                        isVisibleEye={false}
                                        isVisibleEye_={false}
                                        selectedImage={selectedImage || Images1.downArrow}
                                        selected={(!!selected && selected.label) || 'Select'}
                                        toggleDropdown={toggleDropdown}
                                        renderDropdown={renderDropdown}
                                        isArrow={false}
                                        isArrowLeft={true}
                                        marginVertical={hp(0)}
                                        marginHorizontal={wp(4)}
                                        width={wp(90)}
                                        borderWidth={isFocusedMobile ? ConstValue.value1 : ConstValue.value0}
                                        borderColor={isFocusedMobile ? Colors.white : Colors.blue}
                                        height={hp(7)}
                                        isUserHide={false}
                                        textfontSize={ConstValue.value15}
                                        textfontFamily={Fonts.PoppinsRegular}
                                        textlineHeight={ConstValue.value0}
                                        ref={refMobile}
                                        placeholder={ScreenText.EnterMobile}
                                        editable={true}
                                        multiline={false}
                                        secureTextEntry={false}
                                        isPadding={true}
                                        keyboardType='numeric'
                                        textAlign='left'
                                        numberOfLines={null}
                                        maxLength={10}
                                        color={Colors.white}
                                        backgroundColor={Colors.grayDark}
                                        borderRadius={wp(2)}
                                        onFocus={handleFocusMobile}
                                        onChangeText={handleAccountNumber}
                                        onSubmitEditing={() => {
                                            refEmail?.current?.focus();
                                        }}
                                        placeholderTextColor={Colors.gray}
                                    />
                                    {!isValidNumber ?
                                        <TextComponent
                                            marginLeft={wp(4)}
                                            marginTop={wp(1)}
                                            textDecorationLine={'none'}
                                            color={Colors.red}
                                            title={ScreenText.ValidMobileNumber}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsRegular}
                                        />
                                        : null}

                                </View>

                                <View>
                                    <TextInputComponent
                                        selectionColor={Colors.white}
                                        isVisibleDropDown={false}
                                        isVisibleEye={false}
                                        isVisibleEye_={false}
                                        isVisibleMail={false}
                                        isVisibleMailGray={true}
                                        isVisibleLockWhite={false}
                                        marginVertical={hp(0)}
                                        marginHorizontal={wp(4)}
                                        width={wp(90)}
                                        borderWidth={isFocusedEmail ? ConstValue.value1 : ConstValue.value0}
                                        borderColor={isFocusedEmail ? Colors.white : Colors.blue}
                                        height={hp(7)}
                                        marginTop={hp(2)}
                                        isUserHide={false}
                                        textfontSize={ConstValue.value15}
                                        textfontFamily={Fonts.PoppinsRegular}
                                        textlineHeight={ConstValue.value0}
                                        ref={refEmail}
                                        placeholder={ScreenText.EnterEmail}
                                        editable={true}
                                        multiline={false}
                                        secureTextEntry={false}
                                        isPadding={true}
                                        keyboardType='default'
                                        textAlign='left'
                                        numberOfLines={null}
                                        color={Colors.white}
                                        backgroundColor={Colors.grayDark}
                                        borderRadius={wp(2)}
                                        onFocus={handleFocusEmail}
                                        onChangeText={handleAccountEmail}
                                        onSubmitEditing={() => {
                                            refSubject?.current?.focus();
                                        }}
                                        placeholderTextColor={Colors.gray}
                                    />
                                    {!isValidEmail ?
                                        <TextComponent
                                            marginLeft={wp(4)}
                                            textDecorationLine={'none'}
                                            color={Colors.red}
                                            title={ScreenText.ValidEmail}
                                            fontWeight="400"
                                            marginTop={wp(1)}
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsRegular}
                                        />
                                        : null}

                                </View>

                                <View>
                                    <TextInputComponent
                                        selectionColor={Colors.white}
                                        isVisibleDropDown={false}
                                        isVisibleLock={false}
                                        isVisibleRef={false}
                                        marginVertical={hp(1)}
                                        marginHorizontal={wp(4)}
                                        width={wp(90)}
                                        borderWidth={isFocusedPasswordRef ? ConstValue.value1 : ConstValue.value0}
                                        borderColor={isFocusedPasswordRef ? Colors.white : Colors.blue}
                                        height={hp(7)}
                                        marginTop={hp(2)}
                                        isUserHide={false}
                                        textfontSize={ConstValue.value15}
                                        textfontFamily={Fonts.PoppinsRegular}
                                        textlineHeight={ConstValue.value0}
                                        ref={refSubject}
                                        placeholder={ScreenText.Subject}
                                        editable={true}
                                        multiline={false}
                                        isPadding={true}
                                        keyboardType='default'
                                        textAlign='left'
                                        numberOfLines={null}
                                        color={Colors.white}
                                        backgroundColor={Colors.grayDark}
                                        borderRadius={wp(2)}
                                        onFocus={handleFocusPassRefCode}
                                        onChangeText={handleAccountRefCode}
                                        onSubmitEditing={() => {
                                            refDesc?.current?.focus();
                                        }}
                                        placeholderTextColor={Colors.gray}
                                    />
                                    {!isValidRefCode ?
                                        <TextComponent
                                            marginLeft={wp(4)}
                                            textDecorationLine={'none'}
                                            color={Colors.red}
                                            title={ScreenText.ValidSubject}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsRegular}
                                        />
                                        : null}
                                </View>

                                <View>
                                    <TextInputComponent
                                        selectionColor={Colors.white}
                                        isVisibleDropDown={false}
                                        isVisibleLock={false}
                                        isVisibleRef={false}
                                        marginVertical={hp(1)}
                                        marginHorizontal={wp(4)}
                                        width={wp(90)}
                                        borderWidth={isFocusedPasswordDesc ? ConstValue.value1 : ConstValue.value0}
                                        borderColor={isFocusedPasswordDesc ? Colors.white : Colors.blue}
                                        height={hp(15)}
                                        marginTop={hp(2)}
                                        isUserHide={false}
                                        textfontSize={ConstValue.value15}
                                        textfontFamily={Fonts.PoppinsRegular}
                                        textlineHeight={ConstValue.value0}
                                        ref={refDesc}
                                        textAlignVertical="top"
                                        placeholder={ScreenText.WritedescriptionHear}
                                        editable={true}
                                        multiline={false}
                                        isPadding={true}
                                        keyboardType='default'
                                        textAlign='left'
                                        numberOfLines={null}
                                        color={Colors.white}
                                        backgroundColor={Colors.grayDark}
                                        borderRadius={wp(2)}
                                        onFocus={handleFocusPassDesc}
                                        onChangeText={handleAccountDesc}
                                        onSubmitEditing={() => {
                                        }}
                                        placeholderTextColor={Colors.gray}
                                    />
                                    {!isValidDescCode ?
                                        <TextComponent
                                            marginLeft={wp(4)}
                                            textDecorationLine={'none'}
                                            color={Colors.red}
                                            title={ScreenText.ValidDesc}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsRegular}
                                        />
                                        : null}
                                </View>

                            </View>

                            <View style={Styles.viewSecondConatiner}>
                                <ButtonComponent
                                    isVisibleMobile={false}
                                    isVisibleFaceBook={false}
                                    heightBtn={hp(7)}
                                    widthBtn={wp(90)}
                                    isRightArrow={false}
                                    marginVertical={wp(10)}
                                    color={Colors.white}
                                    title={ScreenText.Submit}
                                    onPress={onPressContactUs}
                                    marginHorizontal={wp(4)}
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

                            </View>
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

                            <View style={Styles.viewSeprateLine3}>
                                <TextComponent
                                    color={Colors.white}
                                    title={"Ride Charge"}
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

                            <View style={Styles.viewSeprateLine3}>
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

                            <View style={Styles.viewSeprateLine3}>
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

                            <View style={Styles.viewSeprateLine3}>
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


                            <View style={Styles.viewSeprateLine3}>
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

                            <View style={Styles.viewSeprateLine3}>
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

                            <View style={Styles.viewSeprateLine3}>
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
                                        title={"$ " + (isModalBOOKINGCANCEL === true ? isGETPERCENTAGE : isAmount)}
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
                                    fontWeight="500"
                                    title={"Driver Details"} // Booking Flow
                                    fontSize={wp(4)}
                                    onPress={() => setModalDRIVER(false)}
                                />
                            </View>

                            <View>
                                <View
                                    style={Styles.bottamClickContain}>

                                    <View style={CommonStyle.justifyContent}>
                                        <Image
                                            style={Styles.imageDriver}
                                            resizeMode="contain"
                                            source={{ uri: isURL5 }}
                                        />
                                    </View>

                                    <View style={{
                                        flex: 1
                                    }}>
                                        <TextComponent
                                            color={Colors.white}
                                            title={isDRIVERNAME}
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
                                                                    disabled={true}
                                                                    key={item}
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
                                        title={isDriverVehicleType} // Car
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
                                        title={isDriverPlateNumber} // qqq
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
                    isVisible={isModalBOOKINGCANCEL}
                    animationIn="slideInLeft"  // Specify the animation for entering the screen
                    style={Styles.viewModalMargin}
                    onBackdropPress={() => setModalBOOKINGCANCEL(false)}
                    onBackButtonPress={() => setModalBOOKINGCANCEL(false)}>
                    <ScrollView
                        bounces={true}
                        overScrollMode="always">
                        <View style={CommonStyle.commonFlex}>
                            <View style={Styles.viewHeaderComplete}>
                                <HeaderComponent
                                    margin={wp(3)}
                                    backgroundColorOpacity={Colors.circleGray}
                                    borderRadiusOpacity={hp(8)}
                                    transform={[{ rotate: '180deg' }]}
                                    paddingOpacity={wp(2.5)}
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

                                <View style={Styles.viewKMConatinerGray}>
                                    <View style={Styles.rowSpace}>
                                        <View style={CommonStyle.justifyContent}>
                                            <TextComponent
                                                color={Colors.white}
                                                // title={route?.params?.itemBokingDetailsMapDistance}
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
                                                // title={route?.params?.itemBokingDetailsMapDuration}
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

                                <View style={Styles.viewSeprateLine3}>
                                    <TextComponent
                                        color={Colors.white}
                                        title={"Ride Charge"}
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

                                <View style={Styles.viewSeprateLine3}>
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

                                <View style={Styles.viewSeprateLine3}>
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

                                <View style={Styles.viewSeprateLine3}>
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
                                        title={"-$   " + isDRIVERDISCOUNT}
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

                                <View style={Styles.viewSeprateLine3}>
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

                                <View style={Styles.viewSeprateLine3}>
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
                                    <View style={Styles.viewSeprateLine3}>
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
                                    <View style={Styles.viewSeprateLine3}>
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
                                            marginVertical={wp(0)}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            textAlign='left'
                                        />
                                    </View>
                                    <View style={Styles.viewSeprateLine3}>
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
                                        isRightArrow={false}
                                        // onPress={() => setModalPAYFUL(true);(true)}
                                        // onPress={() => setModalPAYFUL(true)}
                                        onPress={onPressCompletePaymentCancel}

                                        // onPress={() => setModalCANCELPAYSUC(true)} // stri[]
                                        // onPress={() =>
                                        //     navigation.navigate('PaymentSuccessfulUp', {
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
                    isVisible={isModalMAP}
                    animationIn="slideInLeft"  // Specify the animation for entering the screen
                    style={Styles.viewModalMargin}
                    onBackdropPress={() => setModalMAP(false)}
                    onBackButtonPress={() => setModalMAP(false)}>

                    <ScrollView
                        bounces={true}
                        overScrollMode="always">

                        {/* <View style={Styles.container}> */}

                        <MapView
                            ref={mapViewRef}
                            // style={Styles.viewMapview}
                            style={{
                                width: Dimensions.get("window").width,
                                height: Dimensions.get("window").height,
                                flex: 1,
                            }}
                            provider={PROVIDER_GOOGLE}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
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

                            {/* First Lat Long */}
                            <Marker
                                coordinate={markerCoordinates1}
                                title="Draggable Marker"
                                description="Drag me!"

                                icon={Images.mapOrangeIcon}
                            />

                            {/* Second Lat Long */}
                            <Marker
                                coordinate={markerCoordinates2}
                                title="Second Marker"
                                description="Another location"
                                icon={Images.mapBlueIcon}
                            />

                            <MapViewDirections
                                origin={markerCoordinates1}
                                destination={markerCoordinates2}
                                strokeWidth={2} // Width of the direction line
                                strokeColor="blue" // Color of the direction line
                                // lineDashPattern={[30]} // Pattern for creating a dotted line
                                apikey={'AIzaSyDMZwBszNuk7X4MTvW4K3D8_zyBqAy0slE'} // Replace 'Your-API-Key' with your actual Google Maps API key
                                mode="DRIVING" // Mode of transportation (DRIVING, BICYCLING, TRANSIT, or WALKING)
                                language="en" // Language for response
                                optimizeWaypoints={true} // Optimize waypoints for the most efficient route
                                resetOnChange={true} // Reset route when origin or destination changes
                                onStart={(params) => { }} // Callback when directions fetching starts
                                onReady={(result) => { }} // Callback when the route is ready
                                onError={(errorMessage) => { }} // Callback when an error occurs
                                region="us" // Country region for which direction results are biased
                                timePrecision="now" // Time precision for time in directions
                            />

                            <Circle
                                center={markerCoordinates2}
                                radius={radius}
                                fillColor="rgba(255, 165, 0, 0.2)"
                                strokeWidth={0} // No border
                            />

                        </MapView>

                        <View style={Styles.requestHeaderConatin}>
                            <View>
                                <HeaderComponent
                                    margin={wp(3)}
                                    backgroundColorOpacity={Colors.circleGray}
                                    borderRadiusOpacity={wp(10)}
                                    paddingOpacity={wp(2)}
                                    textAlign={"left"}
                                    transform={[{ rotate: '180deg' }]}
                                    source={Images.arrowRight}
                                    marginTop={wp(2)}
                                    width={wp(7)}
                                    marginHorizontal={wp(2)}
                                    height={wp(7)}
                                    color={Colors.white}
                                    fontFamily={Fonts.InterSemiBold}
                                    fontWeight="500"
                                    fontSizeRight={wp(3)}
                                    textAlignRight={"center"}
                                    marginTopRight={wp(3)}
                                    colorRight={Colors.white}
                                    titleWithRightContent={"SOS/Help ?"}
                                    marginRight={wp(5)}
                                    fontFamilyRight={Fonts.InterSemiBold}
                                    title={"Booking Request Accepted"}
                                    onPressRightEnd={onPressRightEnd}
                                    fontSize={wp(4)}
                                    onPress={() => setModalMAP(false)}
                                />
                            </View>

                            <View style={CommonStyle.commonRow}>

                                <View style={CommonStyle.justifyContent}>
                                    <Image
                                        style={Styles.blueDot}
                                        resizeMode="contain"
                                        source={Images.whiteDot} />

                                    <TextComponent
                                        color={Colors.white}
                                        // title={route.params.itemMapPickStation}
                                        title={isPICK_UP_LOCATION}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='left'
                                        marginVertical={wp(-3)}
                                        marginHorizontal={wp(15)}
                                    />

                                    <View style={Styles.lineVerticalLine11} />
                                    <View style={Styles.lineVerticalLine11} />
                                    <View style={Styles.lineVerticalLine11} />

                                    <Image
                                        style={Styles.blueDot}
                                        resizeMode="contain"
                                        source={Images.orangeDot} />

                                    <TextComponent
                                        color={Colors.white}
                                        // title={route.params.itemMapDropStation}
                                        title={isDROP_UP_LOCATION}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3.5)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='left'
                                        marginVertical={wp(-6)}
                                        marginHorizontal={wp(15)}
                                    />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <View style={Styles.textKMConatiner}>
                                        <View>
                                            <TextComponent
                                                color={Colors.blue}
                                                // title={route?.params?.itemBokingDetailsMapDuration}
                                                title={isDISTANCE}
                                                textDecorationLine={'none'}
                                                fontWeight="700"
                                                fontSize={wp(3)} // 3
                                                fontFamily={Fonts.PoppinsSemiBold}
                                                textAlign='center'
                                                numberOfLines={2}
                                                marginVertical={wp(5)} // 4
                                            // marginHorizontal={wp(2)}
                                            />
                                        </View>


                                    </View>

                                    <View style={Styles.marginRight}>
                                        <TextComponent
                                            color={Colors.white}
                                            // title={route?.params?.itemBokingDetailsMapDistance}
                                            title={isDURATION}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3)} // 3
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                            numberOfLines={2}
                                            marginVertical={wp(1)}
                                        />
                                    </View>
                                </View>

                            </View>

                            <View>
                                <View style={Styles.marginRight}>
                                    <TextComponent
                                        color={Colors.white}
                                        title={""}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='center'
                                        marginVertical={wp(1)}
                                    />
                                </View>

                            </View>

                            <View style={Styles.marginVertical}>
                                <View style={Styles.bottamUserConatin}>

                                    <TouchableOpacity
                                        onPress={() =>
                                            // navigation.navigate("PreferredDriver") // todo
                                            setModalDRIVER(true)
                                        }
                                        style={Styles.bottamClickContain}
                                    >
                                        <View style={CommonStyle.justifyContent}>
                                            <Image
                                                style={Styles.imageStop_}
                                                resizeMode="contain"
                                                source={{ uri: isDRIVERPROFILe }} />
                                        </View>

                                        <View>
                                            <TextComponent
                                                color={Colors.white}
                                                title={isDriverName}
                                                textDecorationLine={'none'}
                                                fontWeight="500"
                                                fontSize={wp(3.5)}
                                                marginVertical={wp(2)}
                                                fontFamily={Fonts.PoppinsSemiBold}
                                                textAlign='left'
                                            />

                                            <View style={CommonStyle.commonRow}>

                                                <View style={CommonStyle.justifyContent}>
                                                    <TextComponent
                                                        color={Colors.gray}
                                                        title={ScreenText.Rating}
                                                        textDecorationLine={'none'}
                                                        fontWeight="400"
                                                        fontSize={wp(3.5)}
                                                        fontFamily={Fonts.PoppinsRegular}
                                                        textAlign='left'
                                                    />
                                                </View>

                                                <View>
                                                    <View style={Styles.customRatingBarStyle_}>
                                                        {maxRating.map((item, key) => {
                                                            return (
                                                                <View style={CommonStyle.commonRow}>
                                                                    <TouchableOpacity
                                                                        activeOpacity={0.7}
                                                                        disabled={true}
                                                                        key={item}
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

                                        <View style={CommonStyle.justifyContent}>
                                            <TouchableOpacity onPress={onPressCallUser}>
                                                <Image
                                                    style={Styles.imageStop_}
                                                    resizeMode="contain"
                                                    source={Images.callIcon} />
                                            </TouchableOpacity>

                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={Styles.blueRide}>

                                    <View style={Styles.riderConatin}>

                                        <View style={Styles.viewImage}>
                                            <Image
                                                style={Styles.blueDot1}
                                                resizeMode="contain"
                                                source={Images.whiteDot} />
                                        </View>

                                        <View style={Styles.viewImage1}>
                                            <TextComponent
                                                color={Colors.white}
                                                title={deafultMsg}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                numberOfLines={2}
                                                fontSize={wp(3.5)}
                                                marginHorizontal={wp(2)}
                                                marginVertical={wp(2)}
                                                fontFamily={Fonts.PoppinsSemiBold}
                                                textAlign='left' />
                                        </View>

                                        <View>
                                            <TextComponent
                                                color={Colors.gray}
                                                marginVertical={wp(2)}
                                                title={"Pay Now"} //99
                                                onPress={() => setModalPAY1(true)} /**/
                                                // onPress={() =>
                                                //     navigation.navigate('BookingRequestDriver', {
                                                //         itemCompleteMapId: route?.params?.itemBokingDetailsMapId,
                                                //         itemCompleteDistance: route?.params?.itemBokingDetailsMapDistance,
                                                //         itemCompleteDuration: route?.params?.itemBokingDetailsMapDuration,
                                                //         itemCompletePickStation: route?.params?.itemMapPickStation,
                                                //         itemCompleteDropStation: route?.params?.itemMapDropStation,
                                                //         itemCompleteRideCharge: route?.params?.itemMapRideCharge,
                                                //         itemCompleteRideFeesCon: route?.params?.itemMapRideFeesCon,
                                                //         itemCompleteRideWattingCharges: route?.params?.itemMapRideWattingCharges,
                                                //         itemCompleteRideDiscount: route?.params?.itemMapRideDiscount,
                                                //         itemCompleteTotalAmount: route?.params?.itemMapRideTotalAmount
                                                //     })
                                                // }
                                                textDecorationLine={'underline'}
                                                fontWeight="400"
                                                fontSize={wp(3)}
                                                marginLeft={wp(10)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                textAlign='right'
                                            />
                                        </View>

                                    </View>


                                </View>
                            </View>

                        </View>

                        <View>
                            <Modal isVisible={isModalSOS}
                                onBackButtonPress={() => setModalSOS(false)}
                                onBackdropPress={() => setModalSOS(false)}>
                                <View style={Styles.modalIOS}>

                                    <View style={Styles.timerValueContain}>
                                        <TextComponent
                                            color={Colors.blue}
                                            title={timerValue}
                                            textDecorationLine={'none'}
                                            fontWeight="700"
                                            fontSize={wp(5)}
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            textAlign='center'
                                            marginVertical={wp(3)}
                                            marginHorizontal={wp(2)}
                                        />
                                    </View>


                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.AreyouwanttoSendSOSEmergency}
                                            textDecorationLine={'none'}
                                            fontWeight="500"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='center'
                                            marginVertical={wp(5)}
                                            marginHorizontal={wp(2)}
                                        />
                                    </View>


                                    <View>
                                        <ButtonComponent
                                            isVisibleMobile={false}
                                            isVisibleFaceBook={false}
                                            marginVertical={hp(1)}
                                            heightBtn={hp(7)}
                                            widthBtn={wp(60)}
                                            isRightArrow={false}
                                            onPress={onPressSOS}
                                            color={Colors.white}
                                            title={ScreenText.Cancel}
                                            marginHorizontal={wp(10)}
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

                        </View>

                        {/* </View> */}

                    </ScrollView>

                </Modal>


            </View>
        </SafeAreaView >
    )
}

export default BookingDetailsNoFeed;
