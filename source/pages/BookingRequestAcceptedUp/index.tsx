import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { Image, Linking, SafeAreaView, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button/index';
import HeaderComponent from '../../components/Header/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import TextInputComponent from '../../components/TextInput/index';
import { Colors, Fonts, Images } from '../../themes/index';
import { ConstValue, ScreenText } from '../../utils';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from '../../utils/commonfunction';
import Styles from './style';


type Props = {
    navigation: any // props: Props
}


const BookingRequestAcceptedUp = ({ route, navigation }) => {

    const [timerValue, setTimerValue] = useState(5); // Initial timer value in seconds
    const [isRunning, setIsRunning] = useState(false);

    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5, 6]);

    const [defaultRatingSubmit, setDefaultRatingsubmit] = useState(0);
    const [maxRatingSubmit, setMaxRatingsubmit] = useState([1, 2, 3, 4, 5, 6]);

    const starImageFilled1 =
        Images.fillstarIcon; // fillStarIcon
    const starImageCorner1 =
        Images.unfillstarIcon; // unfillStarIcon

    const starImageFilled =
        Images.fillStarIcon;
    const starImageCorner =
        Images.unfillStarIcon;

    // const [isModalDriver, setModalDriver] = useState(false);

    const [modalVisibleOTP, setModalVisibleOTP] = useState(false);

    const [buttonText, setButtonText] = useState(ScreenText.Start);

    const [deafultMsg, setDefaultMsgMsg] = useState(ScreenText.PleaseStartYourRide);

    // OnwaitingTimer
    const [deafultTimer, setDefaultTimer] = useState("");


    const [isStart, setIsStart] = useState(false);
    const [isArrived, setIsArrived] = useState(false);
    const [isOTP, setIsOTP] = useState(false);
    const [isSTOP, setIsSTOP] = useState(false);

    const [isStartMsg, setIsStartMsg] = useState("");
    const [isArrivedMsg, setIsArrivedMsg] = useState("");
    const [isOTPMsg, setIsOTPMsg] = useState("");
    const [isStopMsg, setIsStopMsg] = useState("");

    const [seconds, setSeconds] = useState(120);
    const [isActive, setIsActive] = useState(false);


    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [remainingTime, setRemainingTime] = useState(120); // 2 minutes in seconds

    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [isFocused4, setIsFocused4] = useState(false);
    const [isFocused5, setIsFocused5] = useState(false);
    const [isFocused6, setIsFocused6] = useState(false);

    const refPassword = useRef<any>(null);
    const refnumber2 = useRef<any>(null);
    const refnumber3 = useRef<any>(null);
    const refnumber4 = useRef<any>(null);
    const refnumber5 = useRef<any>(null);
    const refnumber6 = useRef<any>(null);


    const [one, setOne] = useState('');
    const [two, setTwo] = useState('');
    const [three, setThree] = useState('');
    const [four, setFour] = useState('');
    const [five, setFive] = useState('');
    const [six, setSix] = useState('');



    const [isModalVisible, setModalVisible] = useState(true);


    // Driver Get Booking 
    let DriverBookingName;
    let DriverProfileImage;


    let DriverBookingImage1;
    let DriverBookingImage2;
    let DriverBookingImage3;
    let DriverBookingImage4;

    let DriverVehicleNumber;
    let DriverVehicleType;
    let DriverVehicleName;
    let DriverModalName;

    let DriverVehicleDecription;

    let DriverVehiclePhone;
    let Driver_id;


    let averageRating;

    let USER_RIDEID;

    const [isDriverName, setDriverName] = useState(ScreenText.UserName);
    const [isPhoneNumber, setPhoneNumber] = useState("");

    const [isDRIVERPROFILe, setDRIVERPROFILE] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo"); // USER_RIDE_CHARGE


    // useEffect(() => {
    //     setModalDriver(true);
    // }, []);


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


    // ADDED
    useEffect(() => {
        const fetchData = async () => {
            try {


                console.log("itemMapId==>", route.params.itemBokingDetailsMapId);

                console.log("itemMapPickStation==>", route.params.itemMapPickStation);
                console.log("itemMapDropStation==>", route.params.itemMapDropStation);
                console.log("itemMapKmStation==>", route?.params?.itemMapKmStation);
                console.log("itemMapMinStation==>", route?.params?.itemMapMinStation);

                console.log("PayRideCharge==>", route?.params?.itemMapRideCharge);
                console.log("PayBookingsFees==>", route?.params?.itemMapRideFeesCon);
                console.log("PayWaitingCharge==>", route?.params?.itemMapRideWattingCharges);
                console.log("PayDiscount==>", route?.params?.itemMapRideDiscount);
                console.log("PayTotalAmount==>", route?.params?.itemMapRideTotalAmount);


                // axios
                await axiosPostRideDetailsRequest();


                // Get User In User Info
                await axiosPostDriverInfoRequest();
                await axiosGetRideRattingRequest();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Set interval to refresh every 10 seconds
        const intervalId = setInterval(fetchData, 10 * 1000);

        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, [
        route.params.itemMapPickStation,
        route.params.itemMapDropStation,
        route?.params?.itemMapKmStation,
        route?.params?.itemMapMinStation,
        route?.params?.itemMapRideCharge,
        route?.params?.itemMapRideFeesCon,
        route?.params?.itemMapRideWattingCharges,
        route?.params?.itemMapRideDiscount,
        route?.params?.itemMapRideTotalAmount
    ]);


    const axiosPostRideDetailsRequest = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';

        // Prepare data in JSON format
        const data = {
            id: route?.params?.itemRider_ID_
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

                    USER_RIDEID = response?.data?.matchingVehicle?.DriverID;

                    // stored id : todo
                    StoredRideID(USER_RIDEID);

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


    const StoredRideID = async (USER_RIDEID: any) => {
        try {
            await AsyncStorage.setItem('store_ride_id', JSON.stringify(USER_RIDEID));
            console.log('store_ride_id===>', JSON.parse(USER_RIDEID));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_ride_id :', error);
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

        const storedLinkedId = await AsyncStorage.getItem('store_ride_id');

        if (storedLinkedId !== null) {
            const url = 'https://rideshareandcourier.graphiglow.in/api/driverInfo/driverInfo';

            // Prepare data in JSON format
            const data = {
                id: JSON.parse(storedLinkedId) // Booking - 
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
                        DriverProfileImage = response?.data?.matchingUsers[0]?.ProfileImage;


                        DriverBookingImage1 = response?.data?.matchingUsers[0]?.vehicle_pictures1_Url;
                        DriverBookingImage2 = response?.data?.matchingUsers[0]?.vehicle_pictures2_Url;
                        DriverBookingImage3 = response?.data?.matchingUsers[0]?.vehicle_pictures3_Url;
                        DriverBookingImage4 = response?.data?.matchingUsers[0]?.vehicle_pictures4_Url;
                        DriverVehicleNumber = response?.data?.matchingUsers[0]?.Plate_number;
                        DriverVehicleType = response?.data?.matchingUsers[0]?.Vehicle_type;
                        DriverVehicleName = response?.data?.matchingUsers[0]?.Company_name;

                        DriverVehicleDecription = response?.data?.matchingUsers[0]?.Vehicle_Details;
                        DriverVehiclePhone = response?.data?.matchingUsers[0]?.mobilenumber;

                        // _id99
                        Driver_id = response?.data?.matchingUsers[0]?._id;
                        // Store for star : todo
                        StoredDriverID(Driver_id);

                        setDriverName(DriverBookingName);
                        setPhoneNumber(DriverVehiclePhone);

                        setDRIVERPROFILE(DriverProfileImage);

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

    const axiosCheckUserGetRideRattingRequest = async () => {
        try {
            const storedLinkedId = await AsyncStorage.getItem('store_star_id');

            if (storedLinkedId !== null) {
                const userId = JSON.parse(storedLinkedId);
                const url = `https://rideshareandcourier.graphiglow.in/api/rattingCalculateDriver/calculateRating/${userId}`;

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
                            setDefaultRating(averageRating);

                            console.log("RattingResponseData==>",
                                JSON.stringify(response?.data?.ratings?.averageRating, null, 2));
                            // Toast.show('Driver Ratings Get Success!', Toast.SHORT);

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

    const [markerCoordinates, setMarkerCoordinates] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });

    const stopTimer = () => {
        setIsActive(false);
    };

    // const onPressSubmit = () => {
    //     axiosPostRateDriverRequest(defaultRatingSubmit);
    // }

    // const axiosPostRateDriverRequest = async (defaultRatingSubmit: any) => {
    //     try {
    //         const isConnected = await NetworkUtils.isNetworkAvailable()
    //         if (isConnected) {
    //             axiosPostRateDriverRequestConfirm(defaultRatingSubmit);
    //         } else {
    //             Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
    //         }
    //     } catch (error) {
    //         Toast.show("axios error", Toast.SHORT);
    //     }
    // }

    // const axiosPostRateDriverRequestConfirm = async (defaultRatingSubmit: any) => {
    //     const url = 'https://rideshareandcourier.graphiglow.in/api/ratting/rateDriver';

    //     // Prepare data in JSON format
    //     const data = {
    //         UserID: "65214aec906807c5544fb29b",
    //         DriverID: "65214b5d906807c5544fb29e",
    //         rating: defaultRatingSubmit
    //     };

    //     console.log("RateDriverData==>", data);

    //     await axios.post(url, data, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             if (response.status === 201
    //                 &&
    //                 response?.data?.message === 'Rating recorded successfully') {
    //                 // Handle API response here
    //                 // Vehicles Are

    //                 // console.log("BookingDataResponse==>",
    //                 //     JSON.stringify(response?.data?.matchingVehicles, null, 2));

    //                 Toast.show('Rating Submitted Successfully!', Toast.SHORT);
    //                 setModalDriver(false);

    //                 // Toast.show('Successfully Retrieved The Vehicles Booking List!', Toast.SHORT);

    //             } else {
    //                 Toast.show('Enabel To Submit Ratting!', Toast.SHORT);
    //                 //  Welcome! Signed in successfully.
    //             }
    //         })
    //         .catch(error => {
    //             // Handle errors
    //             Toast.show('Enabel To Submit Ratting!', Toast.SHORT);
    //         });
    // };


    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const [isModalSOS, setModalSOS] = useState(false);


    const handleAccountOne = (useremail: any) => {
        setOne(useremail);
    }

    const handleAccountTwo = (useremail: any) => {
        setTwo(useremail);
    }

    const handleAccountThree = (useremail: any) => {
        setThree(useremail);
    }

    const handleAccountFour = (useremail: any) => {
        setFour(useremail);
    }

    const handleAccountFive = (useremail: any) => {
        setFive(useremail);
    }

    const handleAccountSix = (useremail: any) => {
        setSix(useremail);
    }

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleFocus2 = () => {
        setIsFocused2(true)
    }

    const handleFocus3 = () => {
        setIsFocused3(true)
    }

    const handleFocus4 = () => {
        setIsFocused4(true)
    }

    const handleFocus5 = () => {
        setIsFocused5(true)
    }

    const handleFocus6 = () => {
        setIsFocused6(true)
    }

    const onPressStart = () => {

    };

    const onPressRightEnd = () => {
        setModalSOS(true),
            setIsRunning(true);
    }

    const startTimer = () => {
        setIsActive(true);
    };


    const onPressSOS = () => {
        setModalSOS(false),
            setIsRunning(false);
    }

    const handleMapPress = (event) => {
        // Update the marker's coordinates when the map is pressed
        setMarkerCoordinates(event.nativeEvent.coordinate);
    };

    const onPressCallUser = () => {
        const phoneNumberWithPrefix = `tel:${isPhoneNumber}`;
        Linking.openURL(phoneNumberWithPrefix);
    }

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />

            <Modal
                isVisible={isModalVisible}
                swipeDirection={[]} // Disables swiping
                style={Styles.viewModalMargin}>

                <View style={Styles.container}>

                    <MapView
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
                                title={"Boking Request Accepted"}
                                onPressRightEnd={onPressRightEnd}
                                fontSize={wp(4)}
                                onPress={() => navigation.goBack()}
                            />
                        </View>

                        <View style={CommonStyle.commonFlex}>
                            <Modal isVisible={modalVisibleOTP}
                                style={Styles.modalStyle}>
                                <View style={Styles.modalConatiner}>
                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={ScreenText.OTPVerification}
                                            textDecorationLine={'none'}
                                            fontWeight="500"
                                            fontSize={wp(4)}
                                            marginVertical={wp(3)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='center'
                                        />
                                    </View>

                                    <View>
                                        <TextComponent
                                            color={Colors.gray}
                                            title={ScreenText.EnterOTPInfo}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            // marginVertical={wp(5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='center'
                                        />
                                    </View>

                                    <View>
                                        <View style={Styles.viewInput1}>
                                            <TextInputComponent
                                                isVisibleDropDown={false}
                                                selectionColor={Colors.white}
                                                isVisibleEye={false}
                                                isVisibleEye_={false}
                                                isVisibleMail={false}
                                                isVisibleMailGray={false}
                                                isVisibleLockWhite={false}
                                                marginVertical={hp(0)}
                                                marginHorizontal={wp(1.5)}
                                                width={wp(12)}
                                                borderWidth={isFocused ? ConstValue.value1 : ConstValue.value0}
                                                borderColor={isFocused ? Colors.white : Colors.blue}
                                                height={hp(7)}
                                                marginTop={hp(2)}
                                                isUserHide={false}
                                                textfontSize={ConstValue.value15}
                                                textfontFamily={Fonts.PoppinsRegular}
                                                textlineHeight={ConstValue.value0}
                                                ref={refPassword}
                                                placeholder={ScreenText.EnterZero}
                                                editable={true}
                                                multiline={false}
                                                secureTextEntry={false}
                                                isPadding={true}
                                                keyboardType='numeric'
                                                textAlign='center'
                                                numberOfLines={null}
                                                maxLength={1}
                                                color={Colors.white}
                                                backgroundColor={Colors.grayDark}
                                                borderRadius={wp(2)}
                                                onFocus={handleFocus}
                                                onChangeText={handleAccountOne}
                                                onSubmitEditing={() => {
                                                    refnumber2?.current?.focus();
                                                }}
                                                placeholderTextColor={Colors.gray}
                                            />
                                            <TextInputComponent
                                                isVisibleDropDown={false}
                                                selectionColor={Colors.white}
                                                isVisibleEye={false}
                                                isVisibleEye_={false}
                                                isVisibleMail={false}
                                                isVisibleMailGray={false}
                                                isVisibleLockWhite={false}
                                                marginVertical={hp(0)}
                                                marginHorizontal={wp(1.5)}
                                                width={wp(12)}
                                                borderWidth={isFocused2 ? ConstValue.value1 : ConstValue.value0}
                                                borderColor={isFocused2 ? Colors.white : Colors.blue}
                                                height={hp(7)}
                                                marginTop={hp(2)}
                                                isUserHide={false}
                                                textfontSize={ConstValue.value15}
                                                textfontFamily={Fonts.PoppinsRegular}
                                                textlineHeight={ConstValue.value0}
                                                ref={refnumber2}
                                                placeholder={ScreenText.EnterZero}
                                                editable={true}
                                                multiline={false}
                                                secureTextEntry={false}
                                                isPadding={true}
                                                keyboardType='numeric'
                                                textAlign='center'
                                                numberOfLines={null}
                                                maxLength={1}
                                                color={Colors.white}
                                                backgroundColor={Colors.grayDark}
                                                borderRadius={wp(2)}
                                                onFocus={handleFocus2}
                                                onChangeText={handleAccountTwo}
                                                onSubmitEditing={() => {
                                                    refnumber3?.current?.focus();
                                                }}
                                                placeholderTextColor={Colors.gray}
                                            />

                                            <TextInputComponent
                                                isVisibleDropDown={false}
                                                selectionColor={Colors.white}
                                                isVisibleEye={false}
                                                isVisibleEye_={false}
                                                isVisibleMail={false}
                                                isVisibleMailGray={false}
                                                isVisibleLockWhite={false}
                                                marginVertical={hp(0)}
                                                marginHorizontal={wp(1.5)}
                                                width={wp(12)}
                                                borderWidth={isFocused3 ? ConstValue.value1 : ConstValue.value0}
                                                borderColor={isFocused3 ? Colors.white : Colors.blue}
                                                height={hp(7)}
                                                marginTop={hp(2)}
                                                isUserHide={false}
                                                textfontSize={ConstValue.value15}
                                                textfontFamily={Fonts.PoppinsRegular}
                                                textlineHeight={ConstValue.value0}
                                                ref={refnumber3}
                                                placeholder={ScreenText.EnterZero}
                                                editable={true}
                                                multiline={false}
                                                secureTextEntry={false}
                                                isPadding={true}
                                                keyboardType='numeric'
                                                textAlign='center'
                                                numberOfLines={null}
                                                maxLength={1}
                                                color={Colors.white}
                                                backgroundColor={Colors.grayDark}
                                                borderRadius={wp(2)}
                                                onFocus={handleFocus3}
                                                onChangeText={handleAccountThree}
                                                onSubmitEditing={() => {
                                                    refnumber4?.current?.focus();
                                                }}
                                                placeholderTextColor={Colors.gray}
                                            />


                                            <TextInputComponent
                                                isVisibleDropDown={false}
                                                selectionColor={Colors.white}
                                                isVisibleEye={false}
                                                isVisibleEye_={false}
                                                isVisibleMail={false}
                                                isVisibleMailGray={false}
                                                isVisibleLockWhite={false}
                                                marginVertical={hp(0)}
                                                marginHorizontal={wp(1.5)}
                                                width={wp(12)}
                                                borderWidth={isFocused4 ? ConstValue.value1 : ConstValue.value0}
                                                borderColor={isFocused4 ? Colors.white : Colors.blue}
                                                height={hp(7)}
                                                marginTop={hp(2)}
                                                isUserHide={false}
                                                textfontSize={ConstValue.value15}
                                                textfontFamily={Fonts.PoppinsRegular}
                                                textlineHeight={ConstValue.value0}
                                                ref={refnumber4}
                                                placeholder={ScreenText.EnterZero}
                                                editable={true}
                                                multiline={false}
                                                secureTextEntry={false}
                                                isPadding={true}
                                                keyboardType='numeric'
                                                textAlign='center'
                                                numberOfLines={null}
                                                maxLength={1}
                                                color={Colors.white}
                                                backgroundColor={Colors.grayDark}
                                                borderRadius={wp(2)}
                                                onFocus={handleFocus4}
                                                onChangeText={handleAccountFour}
                                                onSubmitEditing={() => {
                                                    refnumber5?.current?.focus();
                                                }}
                                                placeholderTextColor={Colors.gray}
                                            />

                                            <TextInputComponent
                                                isVisibleDropDown={false}
                                                selectionColor={Colors.white}
                                                isVisibleEye={false}
                                                isVisibleEye_={false}
                                                isVisibleMail={false}
                                                isVisibleMailGray={false}
                                                isVisibleLockWhite={false}
                                                marginVertical={hp(0)}
                                                marginHorizontal={wp(1.5)}
                                                width={wp(12)}
                                                borderWidth={isFocused5 ? ConstValue.value1 : ConstValue.value0}
                                                borderColor={isFocused5 ? Colors.white : Colors.blue}
                                                height={hp(7)}
                                                marginTop={hp(2)}
                                                isUserHide={false}
                                                textfontSize={ConstValue.value15}
                                                textfontFamily={Fonts.PoppinsRegular}
                                                textlineHeight={ConstValue.value0}
                                                ref={refnumber5}
                                                placeholder={ScreenText.EnterZero}
                                                editable={true}
                                                multiline={false}
                                                secureTextEntry={false}
                                                isPadding={true}
                                                keyboardType='numeric'
                                                textAlign='center'
                                                numberOfLines={null}
                                                maxLength={1}
                                                color={Colors.white}
                                                backgroundColor={Colors.grayDark}
                                                borderRadius={wp(2)}
                                                onFocus={handleFocus5}
                                                onChangeText={handleAccountFive}
                                                onSubmitEditing={() => {
                                                    refnumber6?.current?.focus();
                                                }}
                                                placeholderTextColor={Colors.gray}
                                            />

                                            <TextInputComponent
                                                isVisibleDropDown={false}
                                                selectionColor={Colors.white}
                                                isVisibleEye={false}
                                                isVisibleEye_={false}
                                                isVisibleMail={false}
                                                isVisibleMailGray={false}
                                                isVisibleLockWhite={false}
                                                marginVertical={hp(0)}
                                                marginHorizontal={wp(1.5)}
                                                width={wp(12)}
                                                borderWidth={isFocused6 ? ConstValue.value1 : ConstValue.value0}
                                                borderColor={isFocused6 ? Colors.white : Colors.blue}
                                                height={hp(7)}
                                                marginTop={hp(2)}
                                                isUserHide={false}
                                                textfontSize={ConstValue.value15}
                                                textfontFamily={Fonts.PoppinsRegular}
                                                textlineHeight={ConstValue.value0}
                                                ref={refnumber6}
                                                placeholder={ScreenText.EnterZero}
                                                editable={true}
                                                multiline={false}
                                                secureTextEntry={false}
                                                isPadding={true}
                                                keyboardType='numeric'
                                                textAlign='center'
                                                numberOfLines={null}
                                                maxLength={1}
                                                color={Colors.white}
                                                backgroundColor={Colors.grayDark}
                                                borderRadius={wp(2)}
                                                onFocus={handleFocus6}
                                                onChangeText={handleAccountSix}
                                                onSubmitEditing={() => {
                                                }}
                                                placeholderTextColor={Colors.gray}
                                            />

                                            {/* {!isValidEmail ?
                            <TextComponent
                                marginLeft={wp(4)}
                                textDecorationLine={'none'}
                                color={Colors.red}
                                title={ScreenText.ValidEmail}
                                fontWeight="400"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                            />
                            : null} */}
                                        </View>
                                    </View>

                                    <View>
                                        <ButtonComponent
                                            isVisibleMobile={false}
                                            isVisibleFaceBook={false}
                                            heightBtn={hp(5)}
                                            widthBtn={wp(40)}
                                            isRightArrow={false}
                                            marginVertical={wp(2)}
                                            onPress={() => setModalVisibleOTP(false)}
                                            color={Colors.white}
                                            title={ScreenText.Verify}
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

                        <View style={CommonStyle.commonRow}>

                            <View style={CommonStyle.justifyContent}>
                                <Image
                                    style={Styles.blueDot}
                                    resizeMode="contain"
                                    source={Images.whiteDot} />

                                <TextComponent
                                    color={Colors.white}
                                    title={route.params.itemMapPickStation}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                    marginVertical={wp(-3)}
                                    marginHorizontal={wp(15)}
                                />

                                <View style={Styles.lineVerticalLine1} />
                                <View style={Styles.lineVerticalLine1} />
                                <View style={Styles.lineVerticalLine1} />

                                <Image
                                    style={Styles.blueDot}
                                    resizeMode="contain"
                                    source={Images.orangeDot} />
                                <TextComponent
                                    color={Colors.white}
                                    title={route.params.itemMapDropStation}
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
                                            title={route?.params?.itemMapMinStation + "KM"}
                                            textDecorationLine={'none'}
                                            fontWeight="700"
                                            fontSize={wp(2.5)} // 3
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            textAlign='center'
                                            marginVertical={wp(4)}
                                            marginHorizontal={wp(2)}
                                        />
                                    </View>


                                </View>

                                <View style={Styles.marginRight}>
                                    <TextComponent
                                        color={Colors.white}
                                        title={route?.params?.itemMapKmStation}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(3)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='center'
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
                                    onPress={() => navigation.navigate("PreferredDriver")}
                                    style={Styles.bottamClickContain}
                                >
                                    <View style={CommonStyle.justifyContent}>
                                        <Image
                                            style={Styles.imageStop}
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
                                            marginVertical={wp(3)}
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

                                    <View style={CommonStyle.justifyContent}>
                                        <TouchableOpacity onPress={onPressCallUser}>
                                            <Image
                                                style={Styles.imageStop}
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
                                            onPress={() =>
                                                navigation.navigate('BookingRequestDriver', {
                                                    itemCompleteMapId: route?.params?.itemBokingDetailsMapId,
                                                    itemCompleteDistance: route?.params?.itemBokingDetailsMapDistance,
                                                    itemCompleteDuration: route?.params?.itemBokingDetailsMapDuration,
                                                    itemCompletePickStation: route?.params?.itemMapPickStation,
                                                    itemCompleteDropStation: route?.params?.itemMapDropStation,
                                                    itemCompleteRideCharge: route?.params?.itemMapRideCharge,
                                                    itemCompleteRideFeesCon: route?.params?.itemMapRideFeesCon,
                                                    itemCompleteRideWattingCharges: route?.params?.itemMapRideWattingCharges,
                                                    itemCompleteRideDiscount: route?.params?.itemMapRideDiscount,
                                                    itemCompleteTotalAmount: route?.params?.itemMapRideTotalAmount
                                                })
                                            }
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
                        <Modal isVisible={isModalSOS}>
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

                    {/* <View>
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
                </View> */}

                </View>

            </Modal>
        </SafeAreaView >

    )
}

export default BookingRequestAcceptedUp;