import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button/index';
import ConfirmBookingListComponent from '../../components/ConfirmBookingList/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import TextInputComponent from '../../components/TextInput/index';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from '../../utils/commonfunction';
import { ConstValue, ScreenText } from '../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}

const BiddingBookNowScreen = ({ route, navigation }) => {


    const [isModalBid, setModalBid] = useState(false);
    const [isModalFocuedBidAdjust, setModalFcouedBidAdjust] = useState(false);

    const [isFocused, setIsFocused] = useState(false);

    const [isValidAdjut, setValidAdjust] = useState(true);

    const [adjust, setAdjust] = useState('');
    const [isClickItems, setClickItems] = useState(false);

    let RideIdGet;
    let distanceGet;
    let timeGet;
    let UserSelctedVehicalName;
    var UserSelctedVehicalPrice;
    var beforeHyphenValue;


    let _idRider;
    let RidePickStation;
    let RideDropStation;

    let ConfirmRideCharge;
    let ConfirmBookingFeesConvenience;
    let ConfirmWaiting_Charge;
    let ConfirmDiscount;
    let ConfirmTotalAmount;


    const refPassword = useRef<any>(null);
    const refAdjust = useRef<any>(null);

    const handleFocus = () => {
        setIsFocused(true)
    }

    const [isValidName, setValidName] = useState(true);
    const [name, setName] = useState('');


    const toggleModalBidAmount = () => {
        setModalBid(!isModalBid);
    };


    const onPressSubmitAmount = () => {
        if (name === '') {
            Toast.show("Selected Vehicle Minimum Amount Between Range", Toast.SHORT);
        } else {
            // Toast.show("Done", Toast.SHORT);
            // setModalBid(false);

            // Bidding Confirm Request
            // Check Service Type & Request Sent!
            if (route?.params?.itemServiceConfrim === "Bidding Ride") {
                console.log("a===>", "Bidding Ride");
                if (isClickItems === true &&
                    route?.params?.itemPickLocationConfrim !== "Select Pickup Location"
                    && route?.params?.itemPickLocationConfrim !== "Select Drop off Location"
                ) {
                    console.log("true===>", "Bidding Ride");
                    axiosUserBiddingConfirmRequest();
                } else {
                    console.log("false===>", "Bidding Ride");
                    Toast.show("Oops! There Was An Error Submitting Your Booking!", Toast.SHORT);
                }
            } else {
                console.log("error===>", "no");
            }

        }
    }


    const axiosUserBiddingConfirmRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosUserConfirmRequestToStatus();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosUserConfirmRequestToStatus = async () => {

        try {
            const get_last_price = await AsyncStorage.getItem('store_bid_price');

            const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            if (storedLinkedId !== null && get_last_price !== null) {


                console.log("get_last_pricerrrrrrrr===>", JSON.parse(get_last_price));

                const url = 'https://rideshareandcourier.graphiglow.in/api/booking/booking';

                // Prepare data in JSON format
                const data = {
                    UserID: JSON.parse(storedLinkedId),   // User ID TO Whice user Book Services
                    type: route?.params?.itemTypeConfrim,      // Courier Delivery And Taxi Booking
                    service_stype: route?.params?.itemServiceConfrim,   // Schedule booking And Book Now ,   Ride Now , Pool Ride , Hourly Ride , Bidding Ride
                    pickup_locations: route?.params?.itemPickLocationConfrim,
                    drop_locations: route?.params?.itemDropLocationConfrim,
                    vehical: UserSelctedVehicalName,
                    Price: name.toString(), // UserSelctedVehicalPrice // ERROR " " //  "$" + price
                    // "No_of_Seats": 2,               // When Pool Ride used
                    //Price: "$".concat(JSON.parse(get_last_price)), // UserSelctedVehicalPrice // ERROR " " //  "$" + price
                    payment_type: route?.params?.itemPaymentTypeConfrim,
                    Waiting_Charge: 0,
                    Cancelled_Trip_Payment: 25,
                    Platform_charges: 10,

                    // bidding_amount: "Bidding Amount", // Bidding Ride - 2828

                    // distance: route?.params?.itemLocationDistanceConfrim + "",      // When Hourly Ride Functions used
                    // time: route?.params?.itemLocationDurationConfrim,      // When Hourly Ride Functions used   
                    //schedule_date: "04-10-2023",      // When schedule Functions used
                    //schedule_time: "30 Minutes",      // When schedule Functions used
                    loyalty_points: route?.params?.itemLoyalPointsConfrim,            // When loyalty Point used
                    pin_code: route?.params?.itemLocationPinCodeConfrim,
                    date: route?.params?.itemLocationCurrentDateConfrim,                // User Current Date
                    current_latitude: route?.params?.itemGetCurrentLatitudeConfrim,     // User Current Locations
                    current_longitude: route?.params?.itemGetCurrentLongitudeConfrim,    // User Current Locations
                    DriverID: "65214b5d906807c5544fb29e",           // When Any Doctor Accept Booking   // How to Get
                    status: "Accept"
                };

                console.log("All_CONFIRM_BIDDING==>", JSON.stringify(data, null, 2));

                await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 201
                            && response?.data?.message === 'Booking Added Successfully') {
                            // Get Ride Id
                            // QuickRideNow
                            RideIdGet = response?.data?.data?.RideId;
                            console.log("RideIdGet===>", RideIdGet);

                            distanceGet = route?.params?.itemLocationDistanceConfrim;
                            console.log("DIStanceGet===>", distanceGet);

                            timeGet = route?.params?.itemLocationDurationConfrim;
                            console.log("TIMeGet===>", timeGet);

                            // _id - Rider Get
                            _idRider = response?.data?.data?._id;
                            console.log("_idRider====>", _idRider);

                            // Added 
                            RidePickStation = route?.params?.itemPickLocationConfrim;
                            console.log("PickStation1111====>", RidePickStation);

                            RideDropStation = route?.params?.itemDropLocationConfrim;
                            console.log("DropStation2222====>", RideDropStation);


                            ConfirmRideCharge = response?.data?.data?.RideCharge;
                            ConfirmBookingFeesConvenience = response?.data?.data?.BookingFeesConvenience;
                            ConfirmWaiting_Charge = response?.data?.data?.Waiting_Charge;
                            ConfirmDiscount = response?.data?.data?.Discount;
                            ConfirmTotalAmount = response?.data?.data?.TotalAmount;

                            console.log("PAY1====>", ConfirmRideCharge);
                            console.log("PAY2====>", ConfirmBookingFeesConvenience);
                            console.log("PAY3====>", ConfirmWaiting_Charge);
                            console.log("PAY4====>", ConfirmDiscount);
                            console.log("PAY5====>", ConfirmTotalAmount);

                            navigation.navigate('BiddingCheckStatus', {
                                itemRIDEID: RideIdGet,
                                itemRider_ID: _idRider,
                                itemRiderDuration: distanceGet,
                                itemRiderDistance: timeGet,
                                itemRidePickStation: RidePickStation,
                                itemRideDropStation: RideDropStation,

                                itemPaymentRideCharge: ConfirmRideCharge,
                                itemPaymentFeesConvenience: ConfirmBookingFeesConvenience,
                                itemPaymentWaitingCharge: ConfirmWaiting_Charge,
                                itemPaymentDiscount: ConfirmDiscount,
                                itemPaymentTotalAmount: ConfirmTotalAmount,
                            });

                            // Handle API response here
                            Toast.show('Booking Confirm Successfully!', Toast.SHORT);


                        } else {
                            Toast.show('Booking Credentials Invalid!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Handle errors
                        Toast.show('Booking Credentials Invalid!', Toast.SHORT);
                    });
            } else {
                Toast.show('Booking Credentials Invalid!', Toast.SHORT);
            }
        } catch (error) {

        }



    };

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

    const handleAccountName = (userpass: any) => {
        setName(userpass);
        if (userpass.length < 3) {
            setIsFocused(true);
            setValidName(false)
        } else {
            setValidName(true);
            setIsFocused(false)
        }
    }

    const [markerCoordinates, setMarkerCoordinates] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });

    const dummyData = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
        'Item 8',
        'Item 9',
        'Item 10',
        'Item 11',
        'Item 12',
        'Item 13',
        'Item 14',
        'Item 15',
        'Item 16',
        'Item 17',
        'Item 18',
        'Item 19',
        'Item 20',
        // Add more items as needed
    ];

    const [radius, setRadius] = useState(1200); // Define the radius in meters

    const [isPickVisible, setPickVisible] = useState(false);

    const refPickUp = useRef<any>(null);

    const [isBorder, setIsBorder] = useState(false);

    const [isBorder1, setIsBorder1] = useState(false);
    const [isBorder2, setIsBorder2] = useState(false);

    const [isBordeWidth, setIsBorderWidth] = useState(false);

    const [isBordeWidth1, setIsBorderWidth1] = useState(false);
    const [isBordeWidth2, setIsBorderWidth2] = useState(false);

    const [isCar, setIsCar] = useState(false);
    const [isAuto, setIsAuto] = useState(false);
    const [isBike, setIsBike] = useState(false);

    const [vehicles, setVehicles] = useState<any>([]);



    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const renderItem = ({ item }) => {
        return (
            <View style={{ padding: 10 }}>
                <Text style={{ color: 'white', fontSize: 30 }}>{item}</Text>
            </View>
        );
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const closeModal1 = () => {
        setModalVisible1(false);
    };

    const closeModal2 = () => {
        setModalVisible2(false);
    };


    const [markerCoordinates1, setMarkerCoordinates1] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });

    const [markerCoordinates2, setMarkerCoordinates2] = useState({
        latitude: 37.80825, // Increased latitude for more distance
        longitude: -122.4524, // Increased longitude for more distance
    });

    const [passDrop, setPassDrop] = useState('');

    const refDropUp = useRef<any>(null);
    const [pass, setPass] = useState('');


    const handleAccountPasswordDrop = (userpass_: any) => {
        setPassDrop(userpass_);
    }


    const handleAccountPassword = (userpass: any) => {
        setPass(userpass);
    }

    const handleMapPress = (event) => {
        // Update the marker's coordinates when the map is pressed
        setMarkerCoordinates(event.nativeEvent.coordinate);
    };

    const handleMarkerDrag = (event) => {
        // Handle marker drag event, e.g., update coordinates
        setMarkerCoordinates(event.nativeEvent.coordinate);
    };

    const handleMarkerDragEnd = (event) => {
        // Handle marker drag end event, e.g., save new coordinates to state or server
        setMarkerCoordinates(event.nativeEvent.coordinate);
    };

    const handleMarkerPress = () => {
        setPickVisible(true)
    };

    const handleItemClick1 = () => {
        setIsBorder1(false)
        setIsBorderWidth1(false)

        setIsBorder2(false)
        setIsBorderWidth2(false)

        setIsBorder(true)
        setIsBorderWidth(true)
    }

    const handleItemClick2 = () => {

        setIsBorder(false)
        setIsBorderWidth(false)

        setIsBorder2(false)
        setIsBorderWidth2(false)

        setIsBorder1(true)
        setIsBorderWidth1(true)

    }

    const handleItemClick3 = () => {
        setIsBorder(false)
        setIsBorderWidth(false)

        setIsBorder1(false)
        setIsBorderWidth1(false)

        setIsBorder2(true)
        setIsBorderWidth2(true)


    }

    useEffect(() => {
        // This function will run when the component mounts
        requestRideNowData();
        axiosPostSetVehicalDataBooking();

        // Set a delay of 15000 milliseconds (15 seconds) before calling axiosPostSetVehicalDataBooking
        // const delay = 15000;
        // const timeoutId = setTimeout(() => {
        //     axiosPostSetVehicalDataBooking();
        // }, delay);

        // // Cleanup: Clear the timeout when the component unmounts
        // return () => clearTimeout(timeoutId);
    }, []); // The empty dependency array ensures that this effect runs only once after the initial render


    const requestRideNowData = () => {
        console.log("itemTypeConfrim==", route?.params?.itemTypeConfrim);
        console.log("itemServiceConfrim==", route?.params?.itemServiceConfrim);
        console.log("itemPickLocationConfrim==", route?.params?.itemPickLocationConfrim);
        console.log("itemDropLocationConfrim==", route?.params?.itemDropLocationConfrim);
        console.log("itemPaymentTypeConfrim==", route?.params?.itemPaymentTypeConfrim);
        console.log("itemLocationDistanceConfrim==", route?.params?.itemLocationDistanceConfrim);
        console.log("itemLocationDurationConfrim==", route?.params?.itemLocationDurationConfrim);
        console.log("itemLoyalPointsConfrim==", route?.params?.itemLoyalPointsConfrim);
        console.log("itemLocationPinCodeConfrim==", route?.params?.itemLocationPinCodeConfrim);
        console.log("itemLocationCurrentDateConfrim==", route?.params?.itemLocationCurrentDateConfrim);
        console.log("itemGetCurrentLatitudeConfrim==", route?.params?.itemGetCurrentLatitudeConfrim);
        console.log("itemGetCurrentLongitudeConfrim==", route?.params?.itemGetCurrentLongitudeConfrim);

        // Added
        console.log("itemSelectNoOfSeatsConfrim==", route?.params?.itemSelectNoOfSeatsConfrim);

        //Added 
        console.log("itemEnterNoOfHourConfrim==", route?.params?.itemEnterNoOfHourConfrim);
        console.log("itemEnterDistanceConfrim==", route?.params?.itemEnterDistanceConfrim);


    }


    const axiosPostSetVehicalDataBooking = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostSetDataBooking();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostSetDataBooking = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/fetchVehical/Vehical';

        // Prepare data in JSON format
        const data = {
            type: "Booking" // Bidding
        };

        console.log("BiddingData==>", data);

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    &&
                    response?.data?.message === 'Vehicles Are') {
                    // Handle API response here
                    // Vehicles Are

                    console.log("BookingDataResponse==>",
                        JSON.stringify(response?.data?.matchingVehicles, null, 2));

                    setVehicles(response.data.matchingVehicles);

                    Toast.show('Successfully Retrieved The Vehicles Booking List!', Toast.SHORT);

                } else {
                    Toast.show('Enabel To Request Booking List!', Toast.SHORT);
                    //  Welcome! Signed in successfully.
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Enabel To Request Booking List!', Toast.SHORT);
            });
    };


    const handlePress = ({ item }) => {
        // quick
        setClickItems(true);
        // quick

        console.log("OnPressItems==>", JSON.stringify(item, null, 2));

        UserSelctedVehicalName = item?.vehicle_name;
        // UserSelctedVehicalPrice = item?.charge;

        UserSelctedVehicalPrice = item?.charge.trim();
        beforeHyphenValue = Number(UserSelctedVehicalPrice.match(/^\d+/));


        console.log("User Selected Vehicle Price:", beforeHyphenValue);
        // Store As Local Price
        storedSelectedPrice(beforeHyphenValue);
        // parseFloat(UserSelctedVehicalPrice.trim())

    }

    const storedSelectedPrice = async (storelastprice: any) => {
        try {
            await AsyncStorage.setItem('store_bid_price', JSON.stringify(storelastprice));
            console.log('store_bid_price===>', JSON.parse(storelastprice));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_bid_price :', error);
        }
    }


    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />

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
                    <Circle
                        center={markerCoordinates1}
                        radius={radius}
                        fillColor="rgba(0, 0, 255, 0.2)" // Transparent blue fill color
                        strokeWidth={0} // No border
                    />

                    <Marker
                        coordinate={markerCoordinates1}
                        title="Draggable Marker"
                        description="Drag me!"
                        draggable
                        onDrag={handleMarkerDrag}
                        onDragEnd={handleMarkerDragEnd}
                        onPress={handleMarkerPress}
                        icon={Images.mapOrangeIcon}
                    />
                    <Marker
                        coordinate={markerCoordinates2}
                        title="Second Marker"
                        description="Another location"
                        icon={Images.mapBlueIcon}
                    />

                    <Polyline
                        coordinates={[markerCoordinates1, markerCoordinates2]}
                        strokeColor="#0040FF" // Line color
                        strokeWidth={2} // Line width
                    />


                </MapView>

                <TouchableOpacity
                    style={Styles.viewPick_}
                    onPress={() => navigation.goBack()}>
                    <View style={Styles.overlay}>
                        <Image
                            style={Styles.imageOpenIcon}
                            resizeMode="contain"
                            source={Images.arrowLeft} />
                    </View>
                </TouchableOpacity>

                <View style={{
                    backgroundColor: Colors.blue,
                    height: wp(23),
                    width: wp(95),
                    borderBottomLeftRadius: wp(5),
                    borderBottomRightRadius: wp(5),
                    marginHorizontal: wp(3),
                    marginBottom: wp(95), // 120
                }}>


                    <View
                        style={Styles.viewPick2}>

                        <View>
                            <View style={{
                                backgroundColor: Colors.grayDrawerBg,
                                height: "auto",
                                width: "100%",
                                padding: wp(3),
                                borderBottomLeftRadius: wp(5),
                                borderBottomRightRadius: wp(5),
                                borderRadius: wp(3),
                            }}>

                                <View style={CommonStyle.commonRow}>

                                    <View style={CommonStyle.commonContent}>

                                        <View style={CommonStyle.commonRow}>

                                            <>
                                                <View>
                                                    <Image
                                                        style={Styles.blueDot}
                                                        resizeMode="contain"
                                                        source={Images.blueDot} />
                                                    <View style={Styles.lineVerticalLine1} />

                                                </View>

                                            </>

                                            <>
                                                <View style={Styles.lineVerticalLine2} />

                                                <TouchableOpacity
                                                    activeOpacity={0.2}
                                                //     onPress={() => navigation.navigate("PickupScreen")
                                                // }
                                                >
                                                    <TextInputComponent
                                                        isVisibleDropDown={false}
                                                        isVisibleLock={false}
                                                        isVisibleMail={false}
                                                        isVisibleCloseIcon={true} // As Text Available To Show !
                                                        isVisibleLockWhite={false}
                                                        marginVertical={hp(1)}
                                                        selectionColor={Colors.white}
                                                        marginHorizontal={wp(2)}
                                                        width={wp(90)}
                                                        height={hp(7)}
                                                        // marginTop={hp(2)}
                                                        isUserHide={false}
                                                        textfontSize={ConstValue.value15}
                                                        textfontFamily={Fonts.PoppinsRegular}
                                                        textlineHeight={ConstValue.value0}
                                                        ref={refPickUp}
                                                        placeholder={ScreenText.SelectPickuplocation}
                                                        editable={false}
                                                        multiline={false}
                                                        secureTextEntry={false}
                                                        isPadding={true}
                                                        keyboardType='default'
                                                        maxLength={null}
                                                        textAlign='left'
                                                        numberOfLines={null}
                                                        value={route?.params?.itemPickLocationConfrim}
                                                        color={Colors.white}
                                                        borderRadius={wp(2)}
                                                        onChangeText={handleAccountPassword}
                                                        onSubmitEditing={() => {
                                                        }}
                                                        placeholderTextColor={Colors.white}
                                                    />

                                                </TouchableOpacity>
                                            </>

                                        </View>


                                        <View style={Styles.lineHorizontalLine3} />


                                        <View style={CommonStyle.commonRow}>

                                            <>
                                                <View style={Styles.lineVerticalLine4} />
                                            </>

                                            <>
                                                <View style={CommonStyle.commonRow}>

                                                    <Image
                                                        style={Styles.viewOrangeDot}
                                                        resizeMode="contain"
                                                        source={Images.orangeDot} />
                                                    <TouchableOpacity
                                                        activeOpacity={0.2}
                                                    // onPress={() => navigation.navigate("DropupScreen")}
                                                    >
                                                        <TextInputComponent
                                                            isVisibleDropDown={false}
                                                            isVisibleLock={false}
                                                            isVisibleMail={false}
                                                            isVisibleCloseIcon={true} // As Text Available To Show !
                                                            isVisibleLockWhite={false}
                                                            // marginHorizontal={wp(10)}
                                                            width={wp(90)}
                                                            // marginTop={wp(2)}
                                                            selectionColor={Colors.white}
                                                            height={hp(7)}
                                                            isUserHide={false}
                                                            textfontSize={ConstValue.value15}
                                                            textfontFamily={Fonts.PoppinsRegular}
                                                            textlineHeight={ConstValue.value0}
                                                            ref={refDropUp}
                                                            placeholder={ScreenText.SelectDropofflocation}
                                                            editable={false}
                                                            multiline={false}
                                                            secureTextEntry={false}
                                                            isPadding={true}
                                                            keyboardType='default'
                                                            maxLength={null}
                                                            textAlign='left'
                                                            numberOfLines={null}
                                                            color={Colors.white}
                                                            value={route?.params?.itemDropLocationConfrim}
                                                            borderRadius={wp(2)}
                                                            onChangeText={handleAccountPasswordDrop}
                                                            onSubmitEditing={() => {
                                                            }}
                                                            placeholderTextColor={Colors.white}
                                                        />


                                                    </TouchableOpacity>


                                                </View>
                                            </>

                                        </View>



                                    </View>

                                </View>


                            </View>

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: wp(2)
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                }}>
                                    <Image
                                        style={Styles.whiteDot}
                                        resizeMode="contain"
                                        source={Images.mapInIcon} />

                                    <TextComponent
                                        color={Colors.white}
                                        title={route?.params?.itemLocationDistanceConfrim !== undefined && route?.params?.itemLocationDistanceConfrim !== '' ? route.params.itemLocationDistanceConfrim : '20 KM'}
                                        textDecorationLine={'none'}
                                        fontWeight="500"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(8)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='center'
                                    />

                                </View>


                                <View style={{
                                    flexDirection: "row",
                                }}>

                                    <Image
                                        style={Styles.whiteDot}
                                        resizeMode="contain"
                                        source={Images.clockIcon} />

                                    <TextComponent
                                        color={Colors.white}
                                        title={route?.params?.itemLocationDurationConfrim !== undefined && route?.params?.itemLocationDurationConfrim !== '' ? route.params.itemLocationDurationConfrim : '30 Mins'}
                                        textDecorationLine={'none'}
                                        fontWeight="500"
                                        fontSize={wp(3.5)}
                                        marginHorizontal={wp(8)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='center'
                                    />

                                </View>
                            </View>

                        </View>


                    </View>

                    <View>

                        <View style={Styles.viewPickConatiner}>

                            <View style={{
                                justifyContent: 'center',
                            }}>

                                <TextComponent
                                    color={Colors.white}
                                    title={ScreenText.SelectVehicle} // As HTML Contain
                                    textDecorationLine={'none'}
                                    fontWeight="600"
                                    fontSize={wp(4)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign="left"
                                    marginHorizontal={wp(5)}
                                    marginVertical={hp(2)}
                                />

                            </View>


                            <View style={{
                                justifyContent: 'center',
                                // flex: 1
                            }}>
                                <ScrollView>
                                    {/* <FlatList
                        bounces={true}
                        data={dummyData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem} // Custom renderItem function
                    /> */}

                                    <ConfirmBookingListComponent
                                        handleGetItemDetails={(item) => handlePress({ item })}
                                        data={vehicles} />

                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={"Enter Bidding Amount"}
                                            textDecorationLine={'none'}
                                            fontWeight="600"
                                            fontSize={wp(4)}
                                            marginVertical={wp(2.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign="left"
                                            marginHorizontal={wp(5)}
                                        />

                                        <TextInputComponent
                                            selectionColor={Colors.white}
                                            isVisibleDropDown={false}
                                            isVisibleEye={false}
                                            isVisibleEye_={false}
                                            isVisibleMail={false}
                                            isVisibleMailGray={false}
                                            isVisibleLockWhite={false}
                                            isVisibleUser={false}
                                            isVisiblePayBookNow={true}
                                            width={wp(85)}
                                            borderWidth={isFocused ? ConstValue.value1 : ConstValue.value0}
                                            borderColor={isFocused ? Colors.white : Colors.blue}
                                            height={hp(7)}
                                            marginHorizontal={wp(5)}
                                            marginVertical={wp(1)}
                                            isUserHide={false}
                                            textfontSize={ConstValue.value15}
                                            textfontFamily={Fonts.PoppinsRegular}
                                            textlineHeight={ConstValue.value0}
                                            ref={refPassword}
                                            placeholder={ScreenText.EnterBiddingAmount}
                                            editable={true}
                                            multiline={false}
                                            secureTextEntry={false}
                                            isPadding={true}
                                            keyboardType='numeric'
                                            textAlign='left'
                                            numberOfLines={null}
                                            maxLength={null}
                                            color={Colors.white}
                                            backgroundColor={Colors.grayDark}
                                            borderRadius={wp(2)}
                                            onFocus={handleFocus}
                                            onChangeText={handleAccountName}
                                            onSubmitEditing={() => {

                                            }}
                                            placeholderTextColor={Colors.white}
                                        />
                                        {!isValidName ?
                                            <TextComponent
                                                textDecorationLine={'none'}
                                                color={Colors.red}
                                                title={ScreenText.BiddingAmount}
                                                fontWeight="400"
                                                fontSize={wp(4)}
                                                marginLeft={wp(5)}
                                                fontFamily={Fonts.PoppinsRegular}
                                            />
                                            : null}
                                    </View>

                                </ScrollView>

                                <View>
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(1)}
                                        heightBtn={hp(7)}
                                        widthBtn={wp(80)}
                                        isRightArrow={false}
                                        onPress={onPressSubmitAmount}
                                        color={Colors.white}
                                        title={ScreenText.BookNow}
                                        marginHorizontal={wp(6)}
                                        fontWeight="600"
                                        fontSize={wp(4)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={Colors.blue}
                                    />
                                </View>

                                <Modal isVisible={isModalBid}
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
                                                maxLength={null}
                                                color={Colors.white}
                                                backgroundColor={Colors.grayDark}
                                                borderRadius={wp(2)}
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

                                        {/* <View style={Styles.ButtonYesNoConatiner}>
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
                                        </View> */}

                                    </View>

                                </Modal>

                            </View>



                        </View>

                    </View>

                </View>

            </View>


        </SafeAreaView >
    )
}

export default BiddingBookNowScreen;