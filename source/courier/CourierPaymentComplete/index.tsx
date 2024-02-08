import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
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

const CourierPaymentCompleteScreen = ({ route, navigation }) => {

    const [isFocusedApplyNow, setIsFocusedApplyNow] = useState(false);
    const [isFocusedRedeem, setIsFocusedRedeem] = useState(false);


    const [isLoyalPoints, setLoyalPoints] = useState('');


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

    const [isValidCode, setValidCode] = useState(true);
    const [isValidRedeem, setValidRedeem] = useState(true);

    const [couponcode, setCouponcode] = useState('');
    const [redeem, setCouponRedeem] = useState('');

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

    const [maxRatingSubmit, setMaxRatingsubmit] = useState([1, 2, 3, 4, 5, 6]);
    const [defaultRatingSubmit, setDefaultRatingsubmit] = useState(0);

    let USER_RIDEID;

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
        setRedeemBG(false);
        setApplyRedeem(false);
        setisRedeemBtn(true);
        setisRedeemText(true);
    }

    const onPressCrossPoints = () => {
        setRedeemBG(true);
        setApplyRedeem(true);
        // setisApplyNowBtn(true);
        setisRedeemText(false);
        setIsFocusedRedeem(true);
    }

    // 02
    const onPressApplyNow = () => {
        setApplyNowBG(false);
        setApplyEdit(false);
        setisApplyNowBtn(true);
        setisApplyNowText(true);
    }

    const onPressCross = () => {
        setApplyNowBG(true);
        setApplyEdit(true);
        // setisApplyNowBtn(true);
        setisApplyNowText(false);
        setIsFocusedApplyNow(true);
    }

    // useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                // RIDER_MAP_ID
                console.log("COMPLETE1===>", route.params.itemCompleteDistance);
                console.log("COMPLETE2===>", route.params.itemCompleteDuration);
                console.log("COMPLETE3===>", route.params.itemCompletePickStation);
                console.log("COMPLETE4===>", route.params.itemCompleteDropStation);
                console.log("COMPLETE5===>", route.params.itemCompleteRideCharge);
                console.log("COMPLETE6===>", route.params.itemCompleteRideFeesCon);
                console.log("COMPLETE7===>", route.params.itemCompleteRideWattingCharges);
                console.log("COMPLETE8===>", route.params.itemCompleteRideDiscount);
                console.log("COMPLETE9===>", route.params.itemCompleteTotalAmount);

                // axios
                await axiosPostRideDetailsRequest();

                // Get Total Loyal Points :
                await axiosPostProfilDataGetInfo();

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
        if (storedLinkedId !== null) {
            const url = 'https://rideshareandcourier.graphiglow.in/api/userInfo/userInfo';

            // Prepare data in JSON format
            const data = {
                id: JSON.parse(storedLinkedId),
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

        }
    }

    const axiosPostRideDetailsRequest = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';

        // Prepare data in JSON format
        const data = {
            id: route?.params?.itemRider_ID_
        };

        console.log("RideDetails===>===>", data);

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

    const onPressCompletePayment = () => {
        setModalDriver(true)
    }

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

        const storedDriverLinkedId = await AsyncStorage.getItem('store_ride_id');

        if (storedLinkedId !== null && storedDriverLinkedId !== null) {

            const url = 'https://rideshareandcourier.graphiglow.in/api/ratting/rateDriver';

            // Prepare data in JSON format
            const data = {
                UserID: JSON.parse(storedLinkedId),
                DriverID: JSON.parse(storedDriverLinkedId),
                rating: defaultRatingSubmit
            };

            console.log("RateDriverData==>", JSON.stringify(data, null, 2));


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
                        setModalDriver(false);

                        navigation.navigate('PaymentSuccessful', {
                            itemSuccessfulAmount: route?.params?.itemCompleteTotalAmount,
                        })

                        // Toast.show('Successfully Retrieved The Vehicles Booking List!', Toast.SHORT);

                    } else {
                        Toast.show('Enabel To Submit Ratting!', Toast.SHORT);
                        //  Welcome! Signed in successfully.
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Enabel To Submit Ratting!', Toast.SHORT);
                });

        } else {

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
                            title={"$ " + isLoyalPoints}
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
                            title={"$ " + route?.params?.itemCompleteRideDiscount}
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
                            title={"$ " + route.params.itemCompleteTotalAmount}
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
export default CourierPaymentCompleteScreen;