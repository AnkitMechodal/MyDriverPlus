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

const CourierRequestScreen = ({ route, navigation }) => {

    const [toggleRequestSent, setToggleRequestSent] = useState(true);
    const [toggleAccepted, setToggleAccepted] = useState(false);
    const [toggleArrived, setToggleArrived] = useState(false);



    const [isModalVisible, setModalVisible] = useState(true);


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

    // const [isDRIVERSTATUS, setDRIVERSTATUS] = useState('Courier Boy is On the Way');

    const [isDRIVERSTATUS, setDRIVERSTATUS] = useState("Courier Request Sent");
    // Courier Request Sent


    let statusCheack;
    let dateCheack;


    let OTPGenerated;

    let OTPGenerated_;

    let paymentStatus;
    let rideStatus;
    let OTPStatus;
    let OTPVerify;

    useEffect(() => {
        const fetchData = async () => {
            try {

                // itemDateBookingSent
                console.log("RIDE_DATE==DATE==DATE==>", route.params.itemDateBookingSent);

                console.log("RIDE_ID_REQUEST===>", route.params.itemRIDEID_SENT);

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
                console.log("itemRIDER_RIDE_FEES_CON_SENT===>",
                    route.params.itemRIDER_RIDE_FEES_CON);
                console.log("itemRIDER_RIDE_WAITING_CHARGES_SENT===>",
                    route.params.itemRIDER_RIDE_WAITING_CHARGES);
                console.log("itemRIDER_RIDE_DICOUNT_SENT===>",
                    route.params.itemRIDER_RIDE_DICOUNT);
                console.log("itemRIDER_RIDE_TOTAL_AMOUNT_SENT===>",
                    route.params.itemRIDER_RIDE_TOTALAMOUNT);


                // Get User In User Info
                await axiosGetRideStatusRequest();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // // Set interval to refresh every 10 seconds
        // const intervalId = setInterval(fetchData, 10 * 1000);

        // // Cleanup function
        // return () => {
        //     // Clear the interval when the component unmounts
        //     clearInterval(intervalId);
        // };

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

            const url = `https://rideshareandcourier.graphiglow.in/api/Cancelbooking/CancelBooking`

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

                        navigation.navigate("CancelCourierDetailsMap", {
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
                        Toast.show('Ride Status Get Successfully!', Toast.SHORT);

                        statusCheack = response?.data?.matchingUsers?.Status;
                        dateCheack = response?.data?.matchingUsers?.date;

                        paymentStatus = response?.data?.matchingUsers?.PaymentStatus;
                        rideStatus = response?.data?.matchingUsers?.RideStatus;

                        // TODO :
                        OTPStatus = response?.data?.matchingUsers?.OTP;
                        setPICKOTP(OTPStatus);

                        OTPVerify = response?.data?.matchingUsers?.OTPStatus;
                        console.log("OTPVerify===>", OTPVerify);

                        setToggleArrived(true);
                        setToggleOTP(true);

                        // setToggleArrived

                        // TODO :
                        if (OTPVerify === "Verify") {
                            setToggleOTP(true);
                        } else {
                            setToggleOTP(false);
                            setDRIVERSTATUS("Driver Started Waiting Timer")
                        }


                        if (toggleOTP === true) {
                            setToggleOTP(true); // auto true

                            setToggleArrivedDrop(true)
                            setDROPOTP("000000"); // DROP OTP Set

                            // setDROPOTP(OTPGenerated_); // DROP OTP Set
                        } else {
                            console.log("ERROR!", "ERROR!");
                        }
                        // TODO :

                        console.log("paymentStatus===>", JSON.stringify(response?.data, null, 2));


                        console.log("paymentStatus****===>", paymentStatus);

                        // 1
                        if (statusCheack === "Accept") {
                            console.log("GetStatus===>", statusCheack);
                            setToggleAccepted(true);

                            // Booking Request Accepted
                            setDRIVERSTATUS("Booking Request Accepted");
                            setDRIVERSTATUS("Ride Started , Enjoy your ride");
                            setDRIVERSTATUS("Driver is On the Way");

                            // setRequestSentDate(dateCheack.concat(" " + currentTime))
                            setDriverOnTheWay(true);

                            //  generateOTP 
                            // axiosGetOTPPostRequest();

                            // Ride Started , Enjoy your ride
                            // Booking Request Accepted
                            // setDRIVERSTATUS("Ride Started , Enjoy your ride");**

                        } else {
                            setToggleAccepted(false);
                            // Toast.show('Unable to Get Ride Status!', Toast.SHORT); **
                        }

                        // 2
                        if (paymentStatus === "Done") {
                            setTogglePaymentCompleted(true);
                        } else {
                            setTogglePaymentCompleted(false);
                        }

                        // 3
                        if (rideStatus === "Completed") {
                            setDRIVERSTATUS("Courier Delivered");
                            setToggleRideCompleted(true);
                            setToggleDelivered(true)

                            // setToggleFeedBack(true);
                        } else {
                            setToggleRideCompleted(false);
                            setToggleDelivered(false);
                        }

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

    //                     axiosGetOTPPostRequestSendDrop();

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

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            {/* 
            <Modal
                isVisible={isModalVisible}
                swipeDirection={[]} // Disables swiping
                style={Styles.viewModalMargin}> */}

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
                                title={route?.params?.itemDateBookingSent}
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
                                title={route?.params?.itemDateBookingSent}
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
                                title={ScreenText.ViewCourierboy} // View courier boy
                                textDecorationLine={'underline'}
                                onPress={() => navigation.navigate("CourierPreferredDriver")}
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
                                title={route?.params?.itemDateBookingSent}
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
                                title={ScreenText.OTPShareWithCourierBoy}
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
                                title={ScreenText.OTPVerification}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(4)}
                                marginVertical={wp(0)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='center'
                            />
                            <TextComponent
                                color={Colors.gray}
                                title={route?.params?.itemDateBookingSent}
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
                                title={route?.params?.itemDateBookingSent}
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
                                title={ScreenText.OTPShareWithCourierBoy}
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
                                title={route?.params?.itemDateBookingSent}
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
                                title={route?.params?.itemDateBookingSent}
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
                                title={route?.params?.itemDateBookingSent}
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

                <Modal isVisible={isModalCancel}>
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

                <Modal isVisible={isModalFeedBack}>
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
                                maxLength={null}
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
                                        title={isDRIVERSTATUS == "Courier Delivered" ? "Pay Now" : "View On Map"}
                                        textDecorationLine={'underline'}
                                        onPress={() =>

                                            isDRIVERSTATUS ==

                                                "Courier Delivered" ?
                                                navigation.navigate('CourierRequestDriver', {
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
                                                : navigation.navigate('CourierRequestAccepted', {

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

            </View>

            {/* </Modal> */}


        </SafeAreaView>

    )
}

export default CourierRequestScreen;