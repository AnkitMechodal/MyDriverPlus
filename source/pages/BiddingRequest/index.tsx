import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import axios from "axios";
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
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
import { ConstValue, ScreenText } from '../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}

const BiddingRequestScreen = ({ route, navigation }) => {

    const [toggleRequestSent, setToggleRequestSent] = useState(true);
    const [toggleAccepted, setToggleAccepted] = useState(false);
    const [toggleArrived, setToggleArrived] = useState(false);
    const [toggleOTP, setToggleOTP] = useState(false);

    const [togglePaymentCompleted, setTogglePaymentCompleted] = useState(false);
    const [toggleRideCompleted, setToggleRideCompleted] = useState(false);
    const [toggleFeedBack, setToggleFeedBack] = useState(false);


    const [isModalFocuedBidAdjust, setModalFcouedBidAdjust] = useState(false);
    const refAdjust = useRef<any>(null);

    const [isValidAdjut, setValidAdjust] = useState(true);

    // All Date Status Date


    let OTPGenerateTimeArrived;
    let OTPVerifyTimeArrived;
    let PaymentStatusArrived;
    let RideStatusArrived;
    let BookingRequestTimeArrived;
    let PaymentStatusTimeArrived;





    // const [requestSentDate, setRequestSentDate] = useState(ScreenText.Date);


    // TODO : Modal 
    const [isModalFeedBack, setModalFeedBack] = useState(false);

    const [isModalCancel, setModalCancel] = useState(false);

    // TODO :
    const [isFocusedFeedBack, setIsFocusedFeedBack] = useState(false);
    const refFeedBack = useRef<any>(null);
    const [isSecure, setSecure] = useState(true);
    const [feed, setFeed] = useState('')
    const [isValidFeed, setValidFeed] = useState(true);


    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));


    //QUICK
    const [viewRequest, setViewRequest] = useState(ScreenText.ViewRequest);


    // TODO :
    const [isArriedOTPDate, setIsArriedOTPDate] = useState('');
    const [isArriedTrueOTPDate, setIsArriedTrueOTPDate] = useState('');
    const [isRequestAcceptTime, setIsRequestAcceptTime] = useState('');
    const [isRequestPayAcceptTime, setIsRequestPayAcceptTime] = useState('');


    // isDriverOnTheWay
    const [isDriverOnTheWay, setDriverOnTheWay] = useState(false);
    const [isAccepted, setIsAccepted] = useState(true);

    const [isModalBid, setModalBid] = useState(false);

    const [adjust, setAdjust] = useState('');


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
        const url = 'https://rideshareandcourier.graphiglow.in/api/userFeedBack/feedback';

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

                // TODO : itemRIDER_RIDE_DATE
                console.log("itemRIDER_RIDE_DATE----00BID--===>", route.params.itemRIDER_RIDE_DATE);


                console.log("RIDE_ID_REQUEST-BID-------===>", route.params.itemRIDEID_SENT);

                // itemRIDER_ID_SENT

                console.log("RIDER_USER_ID_REQUEST===>", route.params.itemRIDER_ID_SENT);

                // Pay Now
                console.log("itemRIDER_DISTANCE_SENT===>", route.params.itemRIDER_DISTANCE_SENT);
                console.log("itemRIDER_DURATUION_SENT===>", route.params.itemRIDER_DURATUION_SENT);

                // Added MapData
                console.log("itemPICK_STATION_SENT===>", route.params.itemRIDER_PICKSTATION);
                console.log("itemDROP_STATION_SENT===>", route.params.itemRIDER_DROPSTATION);

                // Payment
                console.log("itemRIDER_RIDE_CHARGE_SENT===>", route.params.itemRIDER_RIDE_CHARGE);
                console.log("itemRIDER_RIDE_FEES_CON_SENT===>", route.params.itemRIDER_RIDE_FEES_CON);
                console.log("itemRIDER_RIDE_WAITING_CHARGES_SENT===>", route.params.itemRIDER_RIDE_WAITING_CHARGES);
                console.log("itemRIDER_RIDE_DICOUNT_SENT===>", route.params.itemRIDER_RIDE_DICOUNT);
                console.log("itemRIDER_RIDE_TOTAL_AMOUNT_SENT===>", route.params.itemRIDER_RIDE_TOTALAMOUNT);


                // Get User In User Info
                await axiosGetRideStatusRequest();

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
    route.params.itemRIDER_DROPSTATION
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



    // const axiosCheckUserGetRideRattingRequest = async () => {

    //     try {

    //         const storedLinkedId = await AsyncStorage.getItem('user_register_id');

    //         if (storedLinkedId !== null) {

    //         }else{

    //         }

    //         const userId = JSON.parse(storedLinkedId);
    //         const url = `https://rideshareandcourier.graphiglow.in/api/updateProfile/updateProfile/${userId}`;

    //         console.log("axiosPostRequestCreateAccount==>", JSON.stringify(data, null, 2));

    //         await axios.get(url, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //             .then(response => {
    //                 if (response.status === 201
    //                     && response?.data?.message === 'User Registered Successfully') {

    //                     // GETUSERID = response?.data?.data?._id;
    //                     // console.log("GETUSERID==>", GETUSERID);

    //                     user_register_id = response?.data?.data?._id;
    //                     storeCreateAccountId(user_register_id);

    //                     Toast.show('Your Account Has Been Successfully Registered!', Toast.SHORT);

    //                     navigation.navigate("VerifyYourAccount", {
    //                         itemAccountUserId: user_register_id
    //                         // itemAccountMobile: selected.label + num.toString(),
    //                         // itemAccountEmail: email.toString()
    //                     })

    //                 } else {
    //                     Toast.show('Registered Credentials Invalid!', Toast.SHORT);
    //                 }
    //             })
    //             .catch(error => {
    //                 // Handle errors
    //                 Toast.show('Registered Credentials Invalid!', Toast.SHORT);
    //             });
    //     } catch (error) {

    //     }


    // };


    let statusCheack;
    let dateCheack;

    let paymentStatus;
    let rideStatus;

    let OTPVerify;


    let OTPStatus;
    let OTPGenerated;

    //ScreenText.ViewRequest
    const [isVIEWREQ, setIsVIEWREQ] = useState('');

    // is ArrivedOTP
    const [isPICKOTP, setPICKOTP] = useState('');
    const [isDROPOTP, setDROPOTP] = useState('');

    const [isDRIVERSTATUS, setDRIVERSTATUS] = useState("Booking Request Sent");


    const onPressSubmitAmount = () => {
        // Cancel Bidding 
        // axiosCancelBiddingPostRequest();

        if (adjust === '') {
            // If 'adjust' is null, execute this logic
            Toast.show('Please Adjust Bidding Amount!', Toast.SHORT);
            // setModalCancel(false);
        } else {
            // If 'adjust' is not null, execute the following logic
            // Cancel Bidding 
            axiosCancelBiddingPostRequest();
        }
    }


    const axiosCancelBiddingPostRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosCancelBiddingSurePostRequest();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosCancelBiddingSurePostRequest = async () => {
        try {

            const url = `https://rideshareandcourier.graphiglow.in/api/AdjustBidAmount/AdjustAmount`

            console.log("axiosCancelBiddingSurePostRequest===>", url);

            // Prepare data in JSON format
            const data = {
                RideId: route?.params?.itemRIDEID_SENT,
                AdjustBidAmount: adjust // get by box
            };

            console.log("CancelBiddingData==>", JSON.stringify(data, null, 2));


            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200
                        && response?.data?.message === 'Adjust Bid Amount and Price Successfully') {

                        Toast.show('Your Bidding Amount Submitted!', Toast.SHORT);
                        setModalCancel(false);

                    } else {
                        Toast.show('Unable to Bidding Amount Submitted!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    Toast.show('Unable to Bidding Amount Submitted!', Toast.SHORT);
                });

        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    };


    const axiosCheckGetRideStatusRequest = async () => {
        try {

            const url = `https://rideshareandcourier.graphiglow.in/api/rideStatus/checkRide/${route.params.itemRIDEID_SENT}`


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

    const handleFocusAdjust = () => {
        setModalFcouedBidAdjust(true)
    }

    const handleAccountAdjust = (userad: any) => {
        setAdjust(userad);
        if (userad.length < 3) {
            setModalFcouedBidAdjust(true);
            setValidAdjust(false)
        } else {
            setValidAdjust(true);
            setModalFcouedBidAdjust(false)
        }
    }

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />

            <View style={Styles.container}>

                <View>
                    <HeaderComponent
                        margin={wp(3)}
                        backgroundColorOpacity={Colors.circleGray}
                        borderRadiusOpacity={wp(10)}
                        paddingOpacity={wp(2.8)}
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
                        textAlignRight={"right"}
                        colorRight={Colors.blue}
                        fontSizeRight={wp(3.5)}
                        marginTopRight={wp(3)}
                        onPressRightEnd={toggleModalCancel} // Bidding Ride
                        titleWithRightContent={"Adjust Bidding Amount ?"}
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
                                title={"Create Bidding Ride"}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(4)}
                                marginVertical={wp(0)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='center'
                            />
                            <TextComponent
                                color={Colors.gray}
                                title={route.params.itemRIDER_RIDE_DATE} // title={ScreenText.Date}
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
                                title={viewRequest} //QUICK
                                textDecorationLine={'underline'}
                                onPress={() =>
                                    navigation.navigate("ViewRequest", {
                                        itemRIDE: route.params.itemRIDEID_SENT
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
                                // title={route.params.itemRIDER_RIDE_DATE} // title={ScreenText.Date}
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
                                    navigation.navigate('PreferredDriver', {
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
                                // title={route.params.itemRIDER_RIDE_DATE} // title={ScreenText.Date}
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
                                fontSize={wp(2)}
                                marginRight={wp(5)}
                                numberOfLines={2}
                                marginVertical={wp(0)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='center'
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
                                // title={route.params.itemRIDER_RIDE_DATE} 
                                title={isArriedTrueOTPDate}// title={ScreenText.Date}
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
                                // title={route.params.itemRIDER_RIDE_DATE} 
                                title={isRequestPayAcceptTime}// title={ScreenText.Date}
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
                                    navigation.navigate("BookingDetailsMap", {
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
                                // title={route.params.itemRIDER_RIDE_DATE} // title={ScreenText.Date}
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

                        {/* <View style={{ justifyContent: 'center' }}>
                            <CheckBox
                                onCheckColor={'white'}
                                onFillColor={'blue'}
                                boxType="square"
                                disabled={false}
                                tintColors={{ true: Colors.blue, false: Colors.white }}
                                value={toggleFeedBack}
                                onValueChange={(newValue) => setToggleFeedBack(newValue)}
                            />
                        </View> */}

                        {/* <View>
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
                        </View> */}

                    </View>

                </View>

                <Modal isVisible={isModalCancel}
                    onBackButtonPress={() => setModalCancel(false)}
                    onBackdropPress={() => setModalCancel(false)
                    }
                >
                    <View
                        style={Styles.modalCancelConatiner}>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={ScreenText.AdjustBiddingAmount}
                                textDecorationLine={'none'}
                                fontWeight="700"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                                marginVertical={wp(5)}
                                marginHorizontal={wp(2)}
                            />

                        </View>

                        <View>
                            <TextInputComponent
                                selectionColor={Colors.white}
                                isVisibleDropDown={false}
                                marginVertical={hp(1)}
                                width={wp(80)}
                                borderWidth={isModalFocuedBidAdjust ? ConstValue.value1 : ConstValue.value0}
                                borderColor={isModalFocuedBidAdjust ? Colors.white : Colors.blue}
                                height={hp(7)}
                                isUserHide={false}
                                textfontSize={ConstValue.value15}
                                textfontFamily={Fonts.PoppinsRegular}
                                textlineHeight={ConstValue.value0}
                                ref={refAdjust}
                                placeholder={ScreenText.EnterAdjustBiddingAmount}
                                editable={true}
                                multiline={false}
                                isPadding={true}
                                isVisiblePayBookNow={true}
                                keyboardType='numeric'
                                textAlign='left'
                                numberOfLines={null}
                                color={Colors.white}
                                backgroundColor={Colors.grayDark}
                                borderRadius={wp(2)}
                                value={adjust}
                                onFocus={handleFocusAdjust}
                                onChangeText={handleAccountAdjust}
                                onSubmitEditing={() => {
                                }}
                                placeholderTextColor={Colors.gray}
                            />
                            {!isValidAdjut ?
                                <TextComponent
                                    textDecorationLine={'none'}
                                    color={Colors.red}
                                    title={ScreenText.ValidBidding}
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
                                onPress={onPressSubmitAmount} // onPressSubmitAmount
                                color={Colors.white}
                                title={ScreenText.Submit}
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
                            onPress={() => navigation.navigate("HelpScreen")}
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
                            <View style={{
                                width: "100%",
                                height: "auto",
                                padding: wp(3),
                                borderTopLeftRadius: wp(5),
                                borderTopRightRadius: wp(5),
                                // backgroundColor: isDRIVERSTATUS ? "" : Colors.blue,
                                backgroundColor: isDRIVERSTATUS ==
                                    "Driver Started Waiting Timer" ? Colors.orange : Colors.blue,
                                // (isRideStatus ? Colors.header : Colors.transparent),
                                flexDirection: 'row',
                                justifyContent: 'flex-end'
                            }}>

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

                                                "Ride Complete" ?
                                                navigation.navigate("BookingDetailsMap", {
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

                                                }) : navigation.navigate('BookingRequestAccepted', {

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
        </SafeAreaView>

    )
}

export default BiddingRequestScreen;