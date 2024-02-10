import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import WebView from 'react-native-webview';
import ButtonComponent from '../../components/Button';
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text';
import TextInputComponent from '../../components/TextInput';
import { Colors, Fonts, Images } from '../../themes/index';
import { ConstValue, ScreenText } from '../../utils';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from '../../utils/commonfunction';
import Styles from './style';

type Props = {
    navigation: any
}

const CourierPaymentCompletePast = ({ route, navigation }) => {

    const [isFocusedApplyNow, setIsFocusedApplyNow] = useState(false);
    const [isFocusedRedeem, setIsFocusedRedeem] = useState(false);

    const [isLoyalPoints, setLoyalPoints] = useState('');
    const [isLoyalPointsDefault, setLoyalPointsDeafult] = useState<any>('');


    const refApplyNow = useRef<any>(null);
    const refRedeem = useRef<any>(null);

    const handleFocusApplyNow = () => {
        setIsFocusedApplyNow(true)
    }

    const handleFocusRedeem = () => {
        setIsFocusedRedeem(true)
    }

    // TODO :
    let user_point;

    let USER_PAY_STATUS;
    let USER_PAY_CARD;

    const [isValidCode, setValidCode] = useState(true);
    const [isValidRedeem, setValidRedeem] = useState(true);

    const [couponcode, setCouponcode] = useState('');
    const [redeem, setCouponRedeem] = useState<any>('');

    // isApplyNow
    const [isApplyNowBG, setApplyNowBG] = useState(true);
    const [isRedeemBG, setRedeemBG] = useState(true);

    // isApplyNowBtn
    const [isApplyNowBtn, setisApplyNowBtn] = useState(true);
    const [isRedeemBtn, setisRedeemBtn] = useState(true);

    // isVisibleApplyNow
    const [isApplyNowText, setisApplyNowText] = useState(false);
    const [isRedeemText, setisRedeemText] = useState(false);


    const [isApplyEdit, setApplyEdit] = useState(true);
    const [isApplyRedeem, setApplyRedeem] = useState(true);


    const [isModalDriver, setModalDriver] = useState(false);

    const [maxRatingSubmit, setMaxRatingsubmit] = useState([1, 2, 3, 4, 5]);
    const [defaultRatingSubmit, setDefaultRatingsubmit] = useState(0);

    let USER_RIDEID;


    // STRIPE :
    const [isSTRIPEModal, setSTRIPEModal] = useState(false);



    // TODO :
    // let user_point;
    let CouponDiscount;
    let GetNewAmoount;

    let GetRedeemPonints;
    let GetAsDiscount;



    // -5 ---> Default Use 
    const [Default, setDefault] = useState("");

    let NowYourCurrentPoint;

    const [DefaultLoyal, setDefaultLoyal] = useState("");

    let apiUrlPAY;


    // route.params.itemCompleteTotalAmount
    const [isAmount, setIsAmount] = useState<any>("");

    // isURLPAY
    const [isURLPAY, setISURLPAY] = useState<any>("https://rideshareandcourier.graphiglow.in/app/StripeWeb.php?userId=65b9e2f0eb9e0db05a70bb0b&amount=105");


    const starImageFilled1 =
        Images.fillstarIcon; // fillStarIcon
    const starImageCorner1 =
        Images.unfillstarIcon; // unfillStarIcon

    const starImageFilled =
        Images.fillStarIcon;
    const starImageCorner =
        Images.unfillStarIcon;


    const handleApplyNow = (usercouponcode: any) => {
        setCouponcode(usercouponcode);
        if (usercouponcode.length < 5) {
            setIsFocusedApplyNow(true);
            setValidCode(false)
        } else {
            setValidCode(true);
            setIsFocusedApplyNow(false)
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


    // 01
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

    // // 01
    // const onPressRedeem = () => {
    //     setRedeemBG(false);
    //     setApplyRedeem(false);
    //     setisRedeemBtn(true);
    //     setisRedeemText(true);
    // }


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

            const url = 'https://rideshareandcourier.graphiglow.in/api/redeem/coin';

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

                        Toast.show('Redeem Points Applied Successfully!' + NowYourCurrentPoint, Toast.SHORT);

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

    const onPressCrossPoints = () => {

        setIsAmount(route.params.itemCompleteTotalAmount);
        setLoyalPointsDeafult("");

        setRedeemBG(true);
        setApplyRedeem(true);
        // setisApplyNowBtn(true);
        setisRedeemText(false);
        setIsFocusedRedeem(true);
    }

    // 02
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

    const onPressCross = () => {

        setIsAmount(route.params.itemCompleteTotalAmount);
        setDefault("-5"); // ELSE

        setApplyNowBG(true);
        setApplyEdit(true);
        // setisApplyNowBtn(true);
        setisApplyNowText(false);
        setIsFocusedApplyNow(true);

        // setApplyNowBG(true);
        // setApplyEdit(true);
        // // setisApplyNowBtn(true);
        // setisApplyNowText(false);
        // setIsFocusedApplyNow(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // RIDER_MAP_ID
                console.log("COMPLETE1==*=>", route.params.itemCompleteDistance);
                console.log("COMPLETE2===>", route.params.itemCompleteDuration);
                console.log("COMPLETE3===>", route.params.itemCompletePickStation);
                console.log("COMPLETE4===>", route.params.itemCompleteDropStation);
                console.log("COMPLETE5===>", route.params.itemCompleteRideCharge);
                console.log("COMPLETE6===>", route.params.itemCompleteRideFeesCon);
                console.log("COMPLETE7===>", route.params.itemCompleteRideWattingCharges);
                console.log("COMPLETE8===>", route.params.itemCompleteRideDiscount);
                console.log("COMPLETE9===>", route.params.itemCompleteTotalAmount);


                // TODO :
                console.log("COMPLETE10===>", route.params.itemCompleteDriverId);
                console.log("COMPLETE11===>", route.params.itemCompleteRideId);
                console.log("COMPLETE10===>", route.params.itemCompleteDriverId);
                console.log("COMPLETE11===>", route.params.itemCompleteRideId);
                // TODO :


                // TODO :
                console.log("COMPLETE12===>", route.params.itemCompleteRideIDID);
                console.log("COMPLETE12===>", route.params.itemCompleteRideIDID);
                console.log("COMPLETE12===>", route.params.itemCompleteRideIDID);
                // TODO :

                // TODO :
                console.log("COMPLETE13===>", route.params.itemCompletePayType);
                console.log("COMPLETE13===>", route.params.itemCompletePayType);
                console.log("COMPLETE13===>", route.params.itemCompletePayType);
                console.log("COMPLETE13===>", route.params.itemCompletePayType);
                console.log("COMPLETE13===>", route.params.itemCompletePayType);
                // TODO :

                // itemCompletePayType


                // setDefault(route.params.itemCompleteRideDiscount);
                setIsAmount(route.params.itemCompleteTotalAmount);

                // axios :
                // await axiosPostRideDetailsRequest();


                // Get Total Loyal Points : //0909
                // await axiosPostProfilDataGetInfo();


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // // Set interval to refresh every 5 seconds
        // const intervalId = setInterval(fetchData, 5 * 1000);

        // // Cleanup function
        // return () => {
        //     // Clear the interval when the component unmounts
        //     clearInterval(intervalId);
        // };
    }, [

        route.params.itemCompleteDistance,
        route.params.itemCompleteDuration,
        route.params.itemCompletePickStation,
        route.params.itemCompleteDropStation,
        route.params.itemCompleteRideCharge,
        route.params.itemCompleteRideFeesCon,
        route.params.itemCompleteRideWattingCharges,
        route?.params?.itemCompleteRideDiscount,
        route?.params?.itemMapRideDiscount,
        route.params.itemCompleteTotalAmount
    ]);

    // // useEffect
    // useEffect(() => {
    //     const fetchData = async () => { //0111111
    //         try {
    //             // RIDER_MAP_ID
    //             console.log("COMPLETE1===>", route.params.itemCompleteDistance);
    //             console.log("COMPLETE2===>", route.params.itemCompleteDuration);
    //             console.log("COMPLETE3===>", route.params.itemCompletePickStation);
    //             console.log("COMPLETE4===>", route.params.itemCompleteDropStation);
    //             console.log("COMPLETE5===>", route.params.itemCompleteRideCharge);
    //             console.log("COMPLETE6===>", route.params.itemCompleteRideFeesCon);
    //             console.log("COMPLETE7===>", route.params.itemCompleteRideWattingCharges);
    //             console.log("COMPLETE8===>", route.params.itemCompleteRideDiscount);
    //             console.log("COMPLETE9===>", route.params.itemCompleteTotalAmount);

    //             // axios
    //             // await axiosPostRideDetailsRequest();

    //             // Get Total Loyal Points :
    //             await axiosPostProfilDataGetInfo();

    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();

    //     // Set interval to refresh every 10 seconds
    //     const intervalId = setInterval(fetchData, 10 * 1000);

    //     // Cleanup function
    //     return () => {
    //         // Clear the interval when the component unmounts
    //         clearInterval(intervalId);
    //     };
    // }, [
    //     route.params.itemCompleteDistance,
    //     route.params.itemCompleteDuration,
    //     route.params.itemCompletePickStation,
    //     route.params.itemCompleteDropStation,
    //     route.params.itemCompleteRideCharge,
    //     route.params.itemCompleteRideFeesCon,
    //     route.params.itemCompleteRideWattingCharges,
    //     route?.params?.itemCompleteRideDiscount,
    //     route?.params?.itemMapRideDiscount,
    //     route.params.itemCompleteTotalAmount
    // ]);

    useEffect(() => {
        // Function to fetch or refresh data
        const fetchData1 = async () => {
            // Replace this with your data fetching logic
            console.log('Data refreshed');

            // Get Total Loyal Points : //0909
            await axiosPostProfilDataGetInfo();
        };

        // Call fetchData initially
        fetchData1();

        // Set interval to refresh every 1 seconds
        const intervalId = setInterval(fetchData1, 1 * 1000);

        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };


        // // Refresh data every 5 seconds
        // const intervalId = setInterval(fetchData, 5000);

        // // Clean up the interval on component unmount
        // return () => clearInterval(intervalId);

    }, []); // Emp

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

        const url = 'https://rideshareandcourier.graphiglow.in/api/couponCode/checkCoupon';

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

                    // CouponDiscount As Total 
                    GetAsDiscount = route.params.itemCompleteTotalAmount * CouponDiscount / 100;

                    console.log("GetAsDiscount", GetAsDiscount);
                    console.log("GetAsDiscount", GetAsDiscount);
                    console.log("GetAsDiscount", GetAsDiscount);
                    setDefault(GetAsDiscount);

                    // SET AFTER AMOUNT 
                    GetNewAmoount = route.params.itemCompleteTotalAmount - GetAsDiscount
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


    const axiosPostSetProfileData = async () => {

        const storedLinkedId = await AsyncStorage.getItem('user_register_id');

        console.log("storedLinkedId=====>", storedLinkedId);
        console.log("storedLinkedId=====>", storedLinkedId);
        console.log("storedLinkedId=====>", storedLinkedId);
        console.log("storedLinkedId=====>", storedLinkedId);

        if (storedLinkedId !== null) {
            const url = 'https://rideshareandcourier.graphiglow.in/api/userInfo/userInfo';

            // Prepare data in JSON format
            const data = {
                id: JSON.parse(storedLinkedId), //0909
                // id: "65c4bf726e435ad32b0e86ca"
            };

            console.log("axiosPostSetProfileData....==>", data);
            console.log("axiosPostSetProfileData==>", data);
            console.log("axiosPostSetProfileData==>", data);
            console.log("axiosPostSetProfileData==>", data);
            console.log("axiosPostSetProfileData==>", data);

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

                        // Toast.show('Done' + user_point, Toast.SHORT);

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


    // const axiosPostRideDetailsRequest = async () => {
    //     const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';

    //     // Prepare data in JSON format
    //     const data = {
    //         id: route?.params?.itemRider_ID_
    //     };

    //     console.log("RideDetails===>===>", data);

    //     await axios.post(url, data, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             if (response.status === 200
    //                 && response?.data?.message === 'Ride Details') {
    //                 // Handle API response here
    //                 // Toast.show('Ride Details Get Successfully!', Toast.SHORT);

    //                 USER_RIDEID = response?.data?.matchingVehicle?.DriverID;

    //                 // stored id : todo
    //                 StoredRideID(USER_RIDEID);

    //                 console.log("RideDetails101===>",
    //                     JSON.stringify(response?.data?.matchingVehicle?.RideId, null, 2));

    //             } else {
    //                 // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
    //             }
    //         })
    //         .catch(error => {
    //             // Handle errors
    //             // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
    //         });
    // };

    // const StoredRideID = async (USER_RIDEID: any) => {
    //     try {
    //         await AsyncStorage.setItem('store_ride_id', JSON.stringify(USER_RIDEID));
    //         console.log('store_ride_id===>', JSON.parse(USER_RIDEID));

    //     } catch (error) {
    //         // Handle any errors that might occur during the storage operation
    //         console.log('Error store_ride_id :', error);
    //     }
    // }

    const onPressCompletePayment = () => {
        // setModalDriver(true)
        if (route.params.itemCompletePayType == "Cash Payment"
            || route.params.itemCompletePayType == "Wallet") {
            // Payment Status Addded !
            axiosPostRideStatusAccepted1();
        } else {
            setSTRIPEModal(true);
            axiosPostRequestStripe();
        }

        // setSTRIPEModal(true);
        // axiosPostRequestStripe();
    }

    const axiosPostRequestStripe = async () => {
        const storedLinkedId = await AsyncStorage.getItem('user_register_id');

        if (storedLinkedId !== null) {
            const url = 'https://rideshareandcourier.graphiglow.in/api/webStriperedirect/stripeWeb';

            // Prepare data in JSON format
            const data = {
                userId: JSON.parse(storedLinkedId),
                amount: isAmount,
                rideId: route.params.itemCompleteRideIDID // RIDE ID 
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


    const axiosPostRideDetailsRequest = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';

        // Prepare data in JSON format
        const data = {
            id: route.params.itemCompleteRideId //quick
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

    const axiosPostRideStatusAccepted = async () => {

        const url = 'https://rideshareandcourier.graphiglow.in/api/bookingPaymentStatus/bookingPayment';

        // Prepare data in JSON format
        const data = {
            id: route.params.itemCompleteRideId,
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


    const onPressModalCheckPayment = () => {
        // Payment Status Addded !
        axiosPostRideStatusAccepted();
    }

    const axiosPostRideStatusAccepted1 = async () => {

        const url = 'https://rideshareandcourier.graphiglow.in/api/bookingPaymentStatus/bookingPayment';

        // Prepare data in JSON format
        const data = {
            id: route.params.itemCompleteRideId,
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
        const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';

        // Prepare data in JSON format
        const data = {
            id: route.params.itemCompleteRideId //quick
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

    const onPressSubmit = () => {
        axiosPostRateDriverRequest(defaultRatingSubmit);
    }


    const axiosPostRateDriverRequest = async (defaultRatingSubmit: any) => {
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

    const axiosPostRateDriverRequestConfirm = async (defaultRatingSubmit: any) => {

        const storedLinkedId = await AsyncStorage.getItem('user_register_id');

        if (storedLinkedId !== null) {

            const url = 'https://rideshareandcourier.graphiglow.in/api/ratting/rateDriver';

            // Prepare data in JSON format
            const data = {
                UserID: JSON.parse(storedLinkedId),
                DriverID: route.params.itemCompleteDriverId,
                rating: defaultRatingSubmit
            };

            console.log("RateDriverData***********==>", JSON.stringify(data, null, 2));
            console.log("RateDriverData**==>", JSON.stringify(data, null, 2));
            console.log("RateDriverData**==>", JSON.stringify(data, null, 2));
            console.log("RateDriverData**==>", JSON.stringify(data, null, 2));

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

                        /********/
                        /********/

                        navigation.navigate('CourierPaymentSuccessful', {
                            itemSuccessfulAmount: isAmount,
                        });

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


    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />

            <ScrollView style={CommonStyle.commonFlex}>

                <View style={Styles.container}>

                    <View style={Styles.viewHeader}>
                        <HeaderComponent
                            margin={wp(3)}
                            backgroundColorOpacity={Colors.circleGray}
                            borderRadiusOpacity={hp(8)}
                            LoyalPonits={isLoyalPoints}
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
                            isVisiblePayout={true}
                            fontSize={wp(4)}
                            onPress={() => navigation.goBack()}
                        />
                    </View>

                    <View style={Styles.viewKMConatiner}>
                        <View style={Styles.rowSpace}>
                            <View style={CommonStyle.justifyContent}>
                                <TextComponent
                                    color={Colors.white}
                                    title={route.params.itemCompleteDuration}
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
                                    title={route.params.itemCompleteDistance}
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
                                    title={route.params.itemCompletePickStation}
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
                                    title={route.params.itemCompleteDropStation}
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
                            marginHorizontal={wp(5)}
                            marginVertical={wp(1)}
                            fontFamily={Fonts.PoppinsSemiBold}
                            textAlign='left'
                        />
                    </View>

                    <View style={Styles.viewSeprateLine3}>
                        <TextComponent
                            color={Colors.white}
                            title={"Courier Booking Charge"}
                            marginVertical={wp(3)}
                            textDecorationLine={'none'}
                            marginHorizontal={wp(3)}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                        />
                        <TextComponent
                            color={Colors.grayFull}
                            title={"$ " + route.params.itemCompleteRideCharge}
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
                            title={"Bookings Fees & Convenience Charges "}
                            textDecorationLine={'none'}
                            marginHorizontal={wp(3)}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                        />
                        <TextComponent
                            color={Colors.grayFull}
                            title={"$ " + route.params.itemCompleteRideFeesCon}
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
                            title={"$ " + isLoyalPointsDefault}
                            marginVertical={wp(2)}
                            textDecorationLine={'none'}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                        />
                    </View>


                    {/* <View style={Styles.viewSeprateLine3}>
                        <TextComponent
                            color={Colors.white}
                            title={"Waiting Charge"}
                            marginVertical={wp(2)}
                            textDecorationLine={'none'}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                        />
                        <TextComponent
                            color={Colors.grayFull}
                            title={"$ 0"}
                            marginVertical={wp(2)}
                            textDecorationLine={'none'}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                        />
                    </View> */}

                    <View style={Styles.viewSeprateLine3}>
                        <TextComponent
                            color={Colors.greenDark}
                            title={"Discount"}
                            textDecorationLine={'none'}
                            marginHorizontal={wp(3)}
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
                            marginHorizontal={wp(5)}
                            fontWeight="500"
                            fontSize={wp(3.5)}
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
                            maxLength={null}
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
                        maxLength={null}
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
                            onBackButtonPress={() => setSTRIPEModal(false)}>
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
                        <Modal isVisible={isModalDriver}>
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
                                                            style={Styles.starImageStyle}
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
                                    marginVertical={hp(1)}
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

        </SafeAreaView>
    )
}
export default CourierPaymentCompletePast;