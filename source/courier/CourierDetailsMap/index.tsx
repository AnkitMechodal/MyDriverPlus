import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button';
import HeaderComponent from '../../components/Header/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import { Colors, Fonts, Images } from '../../themes/index';
import { ScreenText } from '../../utils';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from "../../utils/commonfunction";
import Styles from './style';


type Props = {
    navigation: any // props: Props
}

const CourierDetailsMap = ({ route, navigation }) => {

    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5, 6]);

    const [isGETPERCENTAGE, setGETPERCENTAGE] = useState("0");
    const [isCHARGE, setCHARGE] = useState("20");

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


    let USER_DRIVER_ID;
    let USER_RIDE_ID_;
    let USER_RIDE_IDID;

    let USER_PAY_TYPE;


    let USER_RIDE_CHARGE;
    let USER_CON_CHARGE;
    let USER_DISCOUNT;
    let USER_FARE_VALUE;

    let USER_TOTAL;


    let USER_BOOKINGSTATUS;
    let USER_CANCELLATION;   //cancellation---->


    let PER;
    let CAN;


    const [isDRIVERIDECHARGE, setDRIVERRIDECHARGE] = useState("");
    const [isDRIVERCONCHARGE, setDRIVERCONCHARGE] = useState("");
    const [isDRIVERDISCOUNT, setDRIVERDISCOUNT] = useState("");


    let DISCOUNT;

    // const [isModalVisible, setModalVisible] = useState(true);

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

    const [isDRIVERNAME, setDRIVERNAME] = useState("");

    const [isDRIVERPROFILe, setDRIVERPROFILE] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo"); // USER_RIDE_CHARGE


    // Driver Get Booking 
    let DriverBookingName;
    let DriverProfileImage;

    let Driver_id;

    let averageRating;
    let avg_username;


    useEffect(() => {
        const fetchData = async () => {
            try {

                // RIDER_MAP_ID
                console.log("RIDER_MAP_ID***===>", route.params.itemBokingDetailsMapId);
                console.log("RIDER_MAP_ID***===>", route.params.itemBokingDetailsMapId);
                console.log("RIDER_MAP_ID***===>", route.params.itemBokingDetailsMapId);
                console.log("RIDER_MAP_ID***===>", route.params.itemBokingDetailsMapId);
                console.log("RIDER_MAP_ID***===>", route.params.itemBokingDetailsMapId);


                // Duration & Distnace
                console.log("ITEM1===>", route?.params?.itemBokingDetailsMapDistance);
                console.log("ITEM2===>", route?.params?.itemBokingDetailsMapDuration);

                console.log("ITEM3===>", route?.params?.itemMapPickStation);
                console.log("ITEM4===>", route?.params?.itemMapDropStation);
                console.log("ITEM5===>", route?.params?.itemMapRideCharge);
                console.log("ITEM6===>", route?.params?.itemMapRideFeesCon);
                console.log("ITEM7===>", route?.params?.itemMapRideWattingCharges);
                console.log("ITEM8===>", route?.params?.itemMapRideDiscount);
                console.log("ITEM9===>", route?.params?.itemMapRideTotalAmount);

                // axios
                await axiosPostRideDetailsOfMap();

                // axios
                await axiosPostDriverInfoRequest();
                await axiosGetRideRattingRequest();

                // await axiosPostRideDetailsOfMap();
                // await axiosGetRideRattingRequest();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Set interval to refresh every 1 seconds
        const intervalId = setInterval(fetchData, 1 * 1000);

        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, [route.params.itemBokingDetailsMapId,
    route?.params?.itemBokingDetailsMapDistance,
    route?.params?.itemBokingDetailsMapDuration,
    route?.params?.itemMapPickStation,
    route?.params?.itemMapDropStation,
    route?.params?.itemMapRideCharge,
    route?.params?.itemMapRideFeesCon,
    route?.params?.itemMapRideWattingCharges,
    route?.params?.itemMapRideDiscount,
    route?.params?.itemMapRideTotalAmount
    ]);


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

        const storedLinkedId = await AsyncStorage.getItem('store_driver_id'); // store_driver_id / /store_ride_id
        if (storedLinkedId !== null) {
            const url = 'https://rideshareandcourier.graphiglow.in/api/driverInfo/driverInfo';

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

                        console.log("DriverProfileImage==>",
                            JSON.stringify(DriverProfileImage, null, 2));
                        console.log("DriverProfileImage==>",
                            JSON.stringify(DriverProfileImage, null, 2));
                        console.log("DriverProfileImage==>",
                            JSON.stringify(DriverProfileImage, null, 2));
                        console.log("DriverProfileImage==>",
                            JSON.stringify(DriverProfileImage, null, 2));
                        console.log("DriverProfileImage==>",
                            JSON.stringify(DriverProfileImage, null, 2));
                        console.log("DriverProfileImage==>",
                            JSON.stringify(DriverProfileImage, null, 2));


                        setDRIVERNAME(DriverBookingName);
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
                            avg_username = response?.data?.ratings?.username;

                            console.log("AVG_username*****===>", response?.data);

                            setDefaultRating(averageRating);

                            //  PHOTO // ADDED 

                            console.log("RESDATA===>",
                                JSON.stringify(averageRating, null, 2));
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


    const axiosPostRideDetailsOfMap = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';

        // Prepare data in JSON format
        const data = {
            id: route.params.itemBokingDetailsMapId // route.params.itemBokingDetailsMapId
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

                    // PASSING DATA TO PAYMENT SECTION :

                    USER_DRIVER_ID = response?.data?.matchingVehicle?.DriverID;
                    USER_RIDE_ID_ = response?.data?.matchingVehicle?._id;
                    // USER_PAY_TYPE = response?.data?.matchingVehicle?.payment_type;


                    // payment_type

                    // STORED AS LOCAL :
                    StoreDriverID(USER_DRIVER_ID);
                    StoreRideID(USER_RIDE_ID_);
                    StoreRideIDID(USER_RIDEID);
                    StorePayType(USER_PAYMEMT_TYPE);


                    console.log("USER_DRIVER_ID==>", USER_DRIVER_ID);
                    console.log("USER_RIDE_ID_==>", USER_RIDE_ID_);
                    console.log("USER_DRIVER_ID==>", USER_DRIVER_ID);
                    console.log("USER_RIDE_ID_==>", USER_RIDE_ID_);

                    // BookingCurrentStatus 
                    USER_BOOKINGSTATUS = response?.data?.matchingVehicle?.BookingCurrentStatus;
                    USER_CANCELLATION = response?.data?.matchingVehicle?.cancelationsAmount;

                    PER = USER_TOTAL_AMOUNT * USER_CANCELLATION / 100;

                    // cancelationsAmount
                    setGETPERCENTAGE(PER);

                    CAN = USER_TOTAL_AMOUNT - PER

                    setCHARGE(CAN)

                    // RideCharge
                    USER_RIDE_CHARGE = response?.data?.matchingVehicle?.RideCharge;
                    USER_CON_CHARGE = response?.data?.matchingVehicle?.BookingFeesConvenience;
                    USER_DISCOUNT = response?.data?.matchingVehicle?.Discount;

                    USER_FARE_VALUE = response?.data?.matchingVehicle?.farValues;


                    console.log("USER_VEHICAL==>", USER_VEHICAL);

                    setRIDEID(USER_RIDEID);
                    setVEHICAL(USER_VEHICAL); // ADDED
                    setSERVICE_TYPE(USER_SERVICE_TYPE);
                    setDATE_OF_RIDE(USER_DATE_OF_RIDE); // ADDED 
                    setPAYMEMT_TYPE(USER_PAYMEMT_TYPE);
                    setPICK_UP_LOCATION(USER_PICK_UP_LOCATION);
                    setDROP_UP_LOCATION(USER_DROP_UP_LOCATION);
                    setWATTING_CHARGES(USER_WATTING_CHARGES);

                    // GET TOTAL :
                    USER_TOTAL = parseInt(USER_RIDE_CHARGE) + parseInt(USER_CON_CHARGE) +
                        parseInt(USER_WATTING_CHARGES);

                    console.log("USER_TOTAL1==>", parseInt(USER_RIDE_CHARGE));
                    console.log("USER_TOTAL2==>", parseInt(USER_CON_CHARGE));
                    console.log("USER_TOTAL3==>", parseInt(USER_WATTING_CHARGES));

                    console.log("USER_TOTAL==>", USER_TOTAL);

                    // USER_DISCOUNT - NO USE
                    DISCOUNT = USER_TOTAL - USER_DISCOUNT;
                    setTOTAL_AMOUNT(DISCOUNT);


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


    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <View style={Styles.container}>
                {/* <Modal
                    isVisible={isModalVisible}
                    swipeDirection={[]} // Disables swiping
                    style={Styles.viewModalMargin}> */}
                <ScrollView
                    bounces={true}
                    overScrollMode="always">
                    <View style={CommonStyle.commonFlex}>
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
                                title={"Booking Details"}
                                fontSize={wp(4)}
                                onPress={() => navigation.goBack()}
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
                                    title={"Paid by " + isPAYMEMT_TYPE}
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
                                            title={route.params.itemBokingDetailsMapDuration}
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
                                            title={route.params.itemBokingDetailsMapDistance}
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

                            <TouchableOpacity onPress={() => navigation.navigate("HelpScreen")}>
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
                                    onPress={async () => {

                                        // GET DATA :
                                        try {
                                            const USER_DRIVER_IDget = await AsyncStorage.getItem('store_driver_id');
                                            const USER_RIDE_ID_get = await AsyncStorage.getItem('store_ride_id_');
                                            const USER_RIDEIDID = await AsyncStorage.getItem('store_RIDEID');
                                            const USER_PAY_TYPE = await AsyncStorage.getItem('store_pay_type');


                                            if (USER_DRIVER_IDget !== null && USER_RIDE_ID_get !==
                                                null && USER_RIDEIDID !== null && USER_PAY_TYPE !== null) {
                                                navigation.navigate('CourierPaymentComplete', {
                                                    itemCompleteDistance: route?.params?.itemBokingDetailsMapDistance,
                                                    itemCompleteDuration: route?.params?.itemBokingDetailsMapDuration,
                                                    itemCompletePickStation: route?.params?.itemMapPickStation,
                                                    itemCompleteDropStation: route?.params?.itemMapDropStation,
                                                    itemCompleteRideCharge: route?.params?.itemMapRideCharge,
                                                    itemCompleteRideFeesCon: route?.params?.itemMapRideFeesCon,
                                                    itemCompleteRideWattingCharges: route?.params?.itemMapRideWattingCharges,
                                                    itemCompleteRideDiscount: route?.params?.itemMapRideDiscount,
                                                    itemCompleteTotalAmount: isTOTAL_AMOUNT, // Note: This line might need correction
                                                    itemCompleteDriverId: JSON.parse(USER_DRIVER_IDget),
                                                    itemCompleteRideId: JSON.parse(USER_RIDE_ID_get),
                                                    itemCompleteRideIDID: JSON.parse(USER_RIDEIDID),
                                                    itemCompletePayType: JSON.parse(USER_PAY_TYPE)
                                                });
                                            } else {

                                            }

                                        } catch (error) {

                                        }
                                    }}
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

                            {/* <View style={Styles.viewWhiteConatiner}>
                                    <View style={Styles.viewRatting}>
                                        <View style={CommonStyle.justifyContent}>
                                            <Image
                                                style={Styles.viewWhiteDot}
                                                resizeMode="contain"
                                                source={Images.orangeDot} />
                                        </View>

                                        <View>
                                            <TextComponent
                                                color={Colors.white}
                                                title={"Courier delivery Complete"}
                                                marginVertical={wp(1)} // 3
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                marginHorizontal={wp(5)}
                                                fontSize={wp(4)}
                                                fontFamily={Fonts.PoppinsSemiBold}
                                                textAlign='left'
                                            />
                                        </View>

                                    </View>

                                </View> */}

                        </View>
                    </View>

                </ScrollView>

                {/* </Modal> */}
            </View>
        </SafeAreaView>
    )
}

export default CourierDetailsMap;
