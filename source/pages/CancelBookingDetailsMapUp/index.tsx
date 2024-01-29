import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import Modal from "react-native-modal";
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

const CancelBookingDetailsMapUp = ({ route, navigation }) => {

    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5, 6]);

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

    let USER_BOOKINGSTATUS;
    let USER_CANCELLATION;   // cancellation 

    let USER_RIDE_CHARGE;
    let USER_CON_CHARGE;
    let USER_DISCOUNT;
    let USER_FARE_VALUE;
    let USER_TOTAL;

    let PER;
    let CAN;

    const [isDRIVERIDECHARGE, setDRIVERRIDECHARGE] = useState("");
    const [isDRIVERCONCHARGE, setDRIVERCONCHARGE] = useState("");
    const [isDRIVERDISCOUNT, setDRIVERDISCOUNT] = useState("");


    const [isGETPERCENTAGE, setGETPERCENTAGE] = useState("0");
    const [isCHARGE, setCHARGE] = useState("20");

    const [isModalVisible, setModalVisible] = useState(true);

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


    let averageRating;
    let avg_username;


    useEffect(() => {
        const fetchData = async () => {
            try {
                // RIDER_MAP_ID
                console.log("RIDER_MAP_ID===>", route.params.itemBokingDetailsMapId);

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


                await axiosPostRideDetailsOfMap();
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
            const storedLinkedId = await AsyncStorage.getItem('user_register_id');

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

                            console.log("avg_username===>", avg_username);

                            setDefaultRating(averageRating);
                            setDRIVERNAME(avg_username);

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


                    console.log("PER_USER_CANCELLATION==>", USER_BOOKINGSTATUS);

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
                    // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
            });
    };



    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <Modal
                isVisible={isModalVisible}
                swipeDirection={[]} // Disables swiping
                style={Styles.viewModalMargin}>
                <View style={Styles.container}>


                    <ScrollView
                        bounces={true}
                        overScrollMode="always">
                        <View style={CommonStyle.commonFlex}>
                            <View style={Styles.viewHeader}>
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

                                <View style={Styles.viewKMConatiner}>
                                    <View style={Styles.rowSpace}>
                                        <View style={CommonStyle.justifyContent}>
                                            <TextComponent
                                                color={Colors.white}
                                                title={route?.params?.itemBokingDetailsMapDistance}
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
                                                title={route?.params?.itemBokingDetailsMapDuration}
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
                                        onPress={() =>
                                            navigation.navigate('PaymentSuccessfulUp', {
                                                // itemSuccessfulAmount: route?.params?.itemCompleteTotalAmount,
                                                itemSuccessfulAmount: isGETPERCENTAGE,
                                            })
                                        }
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


                </View>
            </Modal>
        </SafeAreaView >
    )
}

export default CancelBookingDetailsMapUp;
