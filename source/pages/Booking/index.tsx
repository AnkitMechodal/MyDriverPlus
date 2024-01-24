import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import {
    Image, SafeAreaView, ScrollView, Text,
    TouchableOpacity, View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button/index';
import CustomDropdownSelect from '../../components/CustDropdown';
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import TextInputComponent from '../../components/TextInput/index';
import { Colors, Fonts, Images } from '../../themes';
import CommonStyle from '../../utils/commonStyle';
import { ConstValue, ScreenText } from '../../utils/index';
import Styles from './style';


const BookingScreen = ({ route, navigation }) => {

    // itemPickName
    var distanceCal;
    var dis;

    let PinPickUp;
    let PinDropUp;

    let GetUserLat_;
    let GetUserLong_;
    let GetUserPickUpPin_;

    let currentDate;
    let formattedDate;

    let user_latitude;
    let user_longitude;

    let itemPickNameGet;
    let itemDropNameGet;

    const [isSelectedViewFirst, setIsSelectedViewFirst] = useState(false);

    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedDistance, setIsFocusedDistnace] = useState(false);

    const [toggleCheckBoxCardInfo, setToggleCheckBoxCardInfo] = useState(false);

    const refPassword = useRef<any>(null);
    const refPasswordDistance = useRef<any>(null);

    const [name, setName] = useState('')
    const [distance, setDistance] = useState('')


    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [displayMode, setDisplayMode] = useState('time');



    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [isBackground11, setIsBackground11] = useState(true);
    const [isBackground22, setIsBackground22] = useState(false);

    const [isBackground1, setIsBackground1] = useState(true);
    const [isBackground2, setIsBackground2] = useState(false);
    const [isBackground3, setIsBackground3] = useState(false);
    const [isBackground4, setIsBackground4] = useState(false);

    const [toggleCheckBoxYes, setToggleCheckBoxYes] = useState<any>(false);
    const [toggleCheckBoxNo, setToggleCheckBoxNo] = useState<any>(false);


    const [toggleCheckBoxYes1, setToggleCheckBoxYes1] = useState(false);
    const [toggleCheckBoxNo1, setToggleCheckBoxNo1] = useState(false);


    const [toggleCheckBoxYesBid, setToggleCheckBoxYesBid] = useState(false);
    const [toggleCheckBoxNoBid, setToggleCheckBoxNoBid] = useState(false);


    const [toggleCheckBoxYesPool, setToggleCheckBoxYesPool] = useState(false);

    const [toggleCheckBoxYesHour, setToggleCheckBoxYesHour] = useState(false);

    const [toggleCheckBoxNoPool, setToggleCheckBoxNoPool] = useState(false);
    const [toggleCheckBoxNoHour, setToggleCheckBoxNoHour] = useState(false);


    const [toggleCheckBoxCashPool, setToggleCheckBoxCashPool] = useState(false);
    const [toggleCheckBoxCardPool, setToggleCheckBoxCardPool] = useState(false);
    const [toggleCheckBoxWalletPool, setToggleCheckBoxWalletPool] = useState(false);

    const [toggleCheckBoxCashBid, setToggleCheckBoxCashBid] = useState(false);
    const [toggleCheckBoxCardBid, setToggleCheckBoxCardBid] = useState(false);
    const [toggleCheckBoxWalletBid, setToggleCheckBoxWalletBid] = useState(false);

    const [toggleCheckBoxCashRide, setToggleCheckBoxCashRide] = useState(false);
    const [toggleCheckBoxWalletRide, setToggleCheckBoxWalletRide] = useState(false);
    const [toggleCheckBoxCardRide, setToggleCheckBoxCardRide] = useState(false);

    const [toggleCheckBoxCash, setToggleCheckBoxCash] = useState<any>(false);
    const [toggleCheckBoxCard, setToggleCheckBoxCard] = useState<any>(false);


    const [PickPlace1, setPickPlace1] = useState(ScreenText.SelectPickuplocation);
    const [PickPlace2, setPickPlace2] = useState(ScreenText.SelectDropofflocation);

    const [UserLocationPin, setUserLocationPin] = useState('000000');


    const [selectedImage, setSelectedImage] = useState(undefined);

    const [selectedSeatImage, setSelectedSeatImage] = useState(undefined);

    const [selected, setSelected] = useState(undefined);

    const [selectedSeat, setSelectedSeat] = useState(undefined);

    const [isValidName, setValidName] = useState(true);
    const [isValidDistance, setValidDistnace] = useState(true);


    const [visible, setVisible] = useState(false);
    const [visibleSeatNo, setVisibleSeatNo] = useState(false);

    const [isFocusedName, setIsFocusedName] = useState(false);

    const refPickUp = useRef<any>(null);
    const refDropUp = useRef<any>(null);

    const [isService, setService] = useState('');

    const [toggleCheckBoxCash2, setToggleCheckBoxCash2] = useState(false);
    const [toggleCheckBoxCard2, setToggleCheckBoxCard2] = useState(false);

    const [toggleCheckBoxYesPoolSB, setToggleCheckBoxYesPoolSB] = useState(false);
    const [toggleCheckBoxNoPoolSB, setToggleCheckBoxNoPoolSB] = useState(false);


    const [toggleCheckBoxCashPoolSB, setToggleCheckBoxCashPoolSB] = useState(false);
    const [toggleCheckBoxCardPoolSB, setToggleCheckBoxCardPoolSB] = useState(false);
    const [toggleCheckBoxWalletPoolSB, setToggleCheckBoxWalletPoolSB] = useState(false);

    const [isScheduleDate, setScheduleDate] = useState("09/05/2023");
    const [isSchedule, setSchedule] = useState("3:00 PM");

    const [isShedulePickerVisible, setShedulePickerVisible] = useState(false);
    const [selectedSheduleDate, setSelectedSheduleDate] = useState(new Date());



    const handleDateChange = (event, date) => {
        hideDatePicker();
        changeSelectedDate(event, date);
    };


    const changeSelectedDate = (event, date) => {
        const currentDate = date || selectedDate;
        setSelectedDate(currentDate);

        // Format the selected time and set it in the state
        const formattedTime = currentDate.toLocaleTimeString([],
            { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

        setSchedule(formattedTime);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };


    const handleSheduleDateChange = (event, date) => {
        hideSheduleDatePicker();
        changeSelectedSheduleDate(event, date);
    };

    const changeSelectedSheduleDate = (event, date) => {
        const currentDate = date || selectedSheduleDate;
        setSelectedSheduleDate(currentDate);

        // Format the selected date as "MM/DD/YYYY"
        const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')
            }/${currentDate.getFullYear()}`;

        setScheduleDate(formattedDate);
    };


    const hideSheduleDatePicker = () => {
        setShedulePickerVisible(false);
    };


    const onPressSheduleBooking = () => {
        setIsBackground22(true)
        setIsBackground11(false)
    }

    const handleAccountName = (userpass: any) => {
        setName(userpass);
        if (userpass.length < 1) {
            setIsFocusedName(true);
            setValidName(false)
        } else {
            setValidName(true);
            setIsFocusedName(false)
        }
    }

    const handleAccountDistance = (userpass: any) => {
        setDistance(userpass);
        if (userpass.length < 1) {
            setIsFocusedDistnace(true);
            setValidDistnace(false)
        } else {
            setValidDistnace(true);
            setIsFocusedDistnace(false)
        }
    }

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleFocusDistance = () => {
        setIsFocusedDistnace(true)
    }


    const [pass, setPass] = useState('');
    const [passDrop, setPassDrop] = useState('');

    const handleAccountPassword = (userpass: any) => {
        setPass(userpass);
    }

    const handleAccountPasswordDrop = (userpass_: any) => {
        setPassDrop(userpass_);
    }

    const Images1 = {
        flagIcon: Images.whiteCardIcon,
        appIcon: Images.whiteCourierIcon,
        defaultIcon: Images.selectTypeIcon, // Replace 'defaultIcon' with your actual default icon
        // Add more options as needed
    };


    const data = [
        { label: 'Taxi Booking', value: '1', img: Images1.flagIcon },
        { label: 'Courier Delivery', value: '2', img: Images1.appIcon },
        // Add more options as needed
    ];

    // const selectedData = data.find(item => item.value === selectedValue);
    const selectedData = data.find(item => item.value === selectedValue);

    // const [selectedValue, setSelectedValue] = useState(null);

    const dataSeat = [
        { labelSeat: '1', value: '1' },
        { labelSeat: '2', value: '2' },
        { labelSeat: '3', value: '3' },
        { labelSeat: '4', value: '4' },
        { labelSeat: '5', value: '5' },
        // Add more options as needed
    ];



    const [selectedOption, setSelectedOption] = useState(null); ///
    const [modalVisible, setModalVisible] = useState(false);


    const [isHint, setHint] = useState("Select No of seats");


    const [selectedValue, setSelectedValue] = useState(null);

    const handleSelect = (item) => {
        console.log("item==>", item);
        if (item === "1") {
            setIsSelectedViewFirst(false)
        } else {
            setIsSelectedViewFirst(true)
        }
        // if (value.label === "Taxi Booking") {
        //     // setIsSelectedViewFirst(false)
        //     Alert.alert("1")
        // } else if (value.label === "Courier Delivery") {
        //     Alert.alert("2")
        //     setIsSelectedViewFirst(true)
        // } else {
        //     // setIsSelectedViewFirst(true)
        // }
        setSelectedValue(item);
        setVisible(false);
    };

    // const onItemPress = (item) => {
    //     if (item.label === "Taxi Booking") {
    //         setIsSelectedViewFirst(false)
    //     } else {
    //         setIsSelectedViewFirst(true)
    //     }
    //     setSelected(item);
    //     setVisible(false);
    // };


    const onItemPressSeat = (item) => {
        setSelectedSeat(item);
        setVisibleSeatNo(false);
    };


    const onPressBookNow = () => {
        setIsBackground11(true)
        setIsBackground22(false)
    }

    // const renderItem = ({ item }) => (
    //     <TouchableOpacity style={Styles.item}
    //         onPress={() => onItemPress(item)}>
    //         <View style={Styles.onItemPress}>
    //             <View>
    //                 <Image
    //                     source={item.img || Images.downArrow}
    //                     resizeMode="contain"
    //                     style={Styles.imageDefaultDownArrow}
    //                 />
    //             </View>
    //             <View>
    //                 <Text style={Styles.textLabel}>{item.label}</Text>
    //             </View>

    //         </View>
    //     </TouchableOpacity>
    // );


    const renderDropdown = () => (
        <>
        </>
        // <Modal
        //     style={Styles.modalStyle}
        //     visible={visible}
        //     animationIn="slideInUp" // Animation when the modal appears
        //     animationOut="slideOutDown" //
        //     transparent animationType="none">
        //     {/* Your dropdown content goes here */}
        //     <View style={[Styles.dropdown]}>
        //         <FlatList
        //             data={data}
        //             renderItem={renderItem}
        //             keyExtractor={(item, index) => index.toString()}
        //         />
        //     </View>
        // </Modal>
    );


    const toggleDropdown = () => {
        setVisible((prevVisible) => !prevVisible);
    };


    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const onPressPoolRide = () => {
        setIsBackground2(true)
        setIsBackground1(false)
        setIsBackground3(false)
        setIsBackground4(false)
    }

    const onPressRideNow = () => {
        setIsBackground1(true)
        setIsBackground2(false)
        setIsBackground3(false)
        setIsBackground4(false)
    }

    const onPressHourlyRide = () => {
        setIsBackground3(true)
        setIsBackground1(false)
        setIsBackground2(false)
        setIsBackground4(false)
    }
    const onPressBinddingRide = () => {
        setIsBackground4(true)
        setIsBackground1(false)
        setIsBackground2(false)
        setIsBackground3(false)
    }


    // useEffect(() => {
    //     // Update displayText when the screen is focused and params.text is available
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         const textFromOtherScreen = route.params?.itemPickName;
    //         if (textFromOtherScreen) {
    //             setPickPlace1(textFromOtherScreen);
    //         }
    //     });
    //     return unsubscribe;
    // }, [navigation, route.params?.itemPickName]); // QUICK---->


    useEffect(() => {

        const fetchData = () => { // itemPin
            try {

                if (route.params.itemPickName === undefined) {
                    setPickPlace1(ScreenText.SelectPickuplocation);
                } else if (route.params.itemPickName === '') {
                    setPickPlace1(ScreenText.SelectPickuplocation);
                } else {
                    setPickPlace1(route.params.itemPickName);

                    console.log("setPickPlace1ERROR==>", route.params.itemPickName);

                    // PickName Stored
                    itemPickNameGet = route.params.itemPickName;
                    storedPreviousPickName(itemPickNameGet);

                    // DropName ReStored
                    restoredPreviousDropName();
                }

                if (route.params.itemPin === undefined) {
                    setUserLocationPin('');
                } else if (route.params.itemPin === '') {
                    setUserLocationPin('');
                } else {
                    setUserLocationPin(route.params.itemPin);
                    console.log("USER_LOCATION_PIN==>", route.params.itemPin);

                    // Get Pick Pin 
                    PinPickUp = route.params.itemPin;

                    // Picked Stored Pin
                    PickUpLocationPin(PinPickUp);
                }

                if (route.params.itemDropName === undefined) {
                    setPickPlace2(ScreenText.SelectDropofflocation);
                } else if (route.params.itemDropName === '') {
                    setPickPlace2(ScreenText.SelectDropofflocation);
                } else {
                    setPickPlace2(route.params.itemDropName);

                    console.log("setPickPlace2ERROR==>", route.params.itemDropName);


                    // DropName Stored
                    itemDropNameGet = route.params.itemDropName;
                    storedPreviousDropName(itemDropNameGet);

                    // PickName ReStored
                     restoredPreviousPickName();

                }


                Geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;

                        user_latitude = position.coords.latitude;
                        user_longitude = position.coords.longitude;

                        // Store Current Location - Lat Long
                        store_user_latitude(user_latitude);
                        store_user_longitude(user_longitude);

                        console.log("User-Latitude111==>", user_latitude);
                        console.log("User-Longitude222==>", user_longitude);

                    },
                    error => {
                        // 15000 - 10000
                        console.log(`Error getting location: ${error.message}`);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );

                // Drop :

                // if (route.params.itemDropPin === undefined) {
                //     setUserLocationPin('');
                // } else if (route.params.itemDropPin === '') {
                //     setUserLocationPin('');
                // } else {
                //     setUserLocationPin(route.params.itemDropPin);
                //     console.log("setUserLocationPin==>", route.params.itemDropPin);
                // }

            } catch (error) {

            }
        }

        console.log("itemPickNamePrevious11==>", route?.params?.itemPickName);

        fetchData();

        // Set interval to refresh every 10 seconds
        const intervalId = setInterval(fetchData, 10 * 1000);
        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, [route.params.itemPickName, route.params.itemDropName,
    route.params.itemPin, route.params.itemDropPin]);


    const PickUpLocationPin = async (StorePinPickUp: any) => {
        try {
            await AsyncStorage.setItem('user_pick_pin', JSON.stringify(StorePinPickUp));
            console.log('user_pick_pin===>', JSON.stringify(StorePinPickUp));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_pick_pin :', error);
        }
    }

    const store_user_latitude = async (current_latitude: any) => {
        try {
            await AsyncStorage.setItem('user_lat', JSON.stringify(current_latitude));
            console.log('user_lat===>', JSON.stringify(current_latitude));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_lat :', error);
        }
    }

    const store_user_longitude = async (current_logitude: any) => {
        try {
            await AsyncStorage.setItem('user_log', JSON.stringify(current_logitude));
            console.log('user_log===>', JSON.stringify(current_logitude));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_log :', error);
        }
    }


    const storedPreviousPickName = async (storeidpick: any) => {
        try {
            await AsyncStorage.setItem('user_name_pick', JSON.stringify(storeidpick));
            console.log('user_name_pick===>', JSON.stringify(storeidpick));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_name_pick :', error);
        }
    }

    const storedPreviousDropName = async (storeiddrop: any) => {
        try {
            await AsyncStorage.setItem('user_name_drop', JSON.stringify(storeiddrop));
            console.log('user_name_drop===>', JSON.stringify(storeiddrop));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_name_drop :', error);
        }
    }

    const restoredPreviousPickName = async () => {
        try {
            const storedPickPrev = await AsyncStorage.getItem('user_name_pick');
            console.log('ErrorrestoredPreviousPickName :', storedPickPrev);
            if (storedPickPrev !== null) {
                setPickPlace1(JSON.parse(storedPickPrev));
            } else {
                setPickPlace1(ScreenText.SelectPickuplocation);
            }
        } catch (error) {

        }
    }

    const restoredPreviousDropName = async () => {
        try {
            const storedDropPrev = await AsyncStorage.getItem('user_name_drop');
            console.log('ErrorrestoredPreviousPickName :', storedDropPrev);
            if (storedDropPrev !== null) {
                setPickPlace1(JSON.parse(storedDropPrev));
            } else {
                setPickPlace1(ScreenText.SelectPickuplocation);
            }
        } catch (error) {

        }
    }



    const onPressBookingConfirmRideNow = async () => {


        // Pick And Drop Passing ! // As Type Flow
        var dis = getDistance(
            { latitude: 2.7689, longitude: 1.1316 },
            { latitude: 1.7689, longitude: -0.3817 },
        );

        try {
            // Get Latitude by stoarge
            GetUserLat_ = await AsyncStorage.getItem('user_lat');
            GetUserLong_ = await AsyncStorage.getItem('user_log');

            GetUserPickUpPin_ = await AsyncStorage.getItem('user_pick_pin');

            console.log("GetUser-----Lat_", JSON.parse(GetUserLat_));
            console.log("GetUser-----Long_", JSON.parse(GetUserLong_));
            console.log("GetUser-----Pin_", JSON.parse(GetUserPickUpPin_));

        } catch (error) {

        }

        // Get Current Date
        const currentDate = moment();
        let formattedDateLL = currentDate.format('LLL'); // SelectDropofflocation


        if (toggleCheckBoxYes || toggleCheckBoxNo) {
            if (toggleCheckBoxCash || toggleCheckBoxCard) {
                if (PickPlace1 === ScreenText.SelectPickuplocation
                    || PickPlace2 === ScreenText.SelectDropofflocation) {
                    Toast.show("Please choose 'Ride Now' from the provided options.", Toast.SHORT);
                } else {
                    navigation.navigate('BookingConfirmScreen', {
                        itemTypeConfrim: 'Taxi Booking',
                        itemServiceConfrim: "Ride Now",
                        itemPickLocationConfrim: PickPlace1,
                        itemDropLocationConfrim: PickPlace2,
                        itemPaymentTypeConfrim: toggleCheckBoxCash === true ? "Cash Payment" : "Card",
                        itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
                        itemLocationDurationConfrim: "30 Mins", // Google API 
                        itemLoyalPointsConfrim: toggleCheckBoxYes === true ? "Yes" : "No",
                        itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
                        itemLocationCurrentDateConfrim: formattedDateLL, //currentDate.format('DD-MM-YYYY')
                        itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
                        itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
                    })
                }
            } else {
                Toast.show("Please choose 'Ride Now' from the provided options.", Toast.SHORT);
            }
        } else {
            Toast.show("Please choose 'Ride Now' from the provided options.", Toast.SHORT);
        }

        // if (PickPlace1 === ScreenText.SelectPickuplocation
        //     || PickPlace2 === ScreenText.SelectDropofflocation ||
        //     toggleCheckBoxYes || toggleCheckBoxNo
        //     || toggleCheckBoxCash || toggleCheckBoxCard) {

        //     Toast.show("Please choose 'Ride Now' from the provided options.", Toast.SHORT);

        // } else {
        //     // Passing Data To Confirm Page
        //     navigation.navigate('BookingConfirmScreen', {
        //         itemTypeConfrim: 'Taxi Booking',
        //         itemServiceConfrim: "Ride Now",
        //         itemPickLocationConfrim: PickPlace1,
        //         itemDropLocationConfrim: PickPlace2,
        //         itemPaymentTypeConfrim: toggleCheckBoxCash === true ? "Cash Payment" : "Card",
        //         itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
        //         itemLocationDurationConfrim: "30 Mins", // Google API 
        //         itemLoyalPointsConfrim: toggleCheckBoxYes === true ? "Yes" : "No",
        //         itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
        //         itemLocationCurrentDateConfrim: formattedDateLL, //currentDate.format('DD-MM-YYYY')
        //         itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
        //         itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
        //     })
        // }


    }



    const onPressPoolRideRequest = async () => {
        // Alert.alert("test--1111")

        // Pick And Drop Passing ! // As Type Flow
        var dis = getDistance(
            { latitude: 2.7689, longitude: 1.1316 },
            { latitude: 1.7689, longitude: -0.3817 },
        );

        // distanceCal = dis / 1000;
        // console.log("Distance-KM==>", dis / 1000);

        // // Get Current Lat And Long
        // Geolocation.getCurrentPosition(
        //     position => {
        //         const { latitude, longitude } = position.coords;

        //         user_latitude = position.coords.latitude;
        //         user_longitude = position.coords.longitude;

        //         console.log("User-LatitudEEEE==>", user_latitude);
        //         console.log("User-LongitudEEE==>", user_longitude);

        //     },
        //     error => {
        //         console.log(`Error getting location: ${error.message}`);
        //     },
        //     { enableHighAccuracy: true, timeout: 18000, maximumAge: 12000 }
        // );


        try {
            // Get Latitude by stoarge
            GetUserLat_ = await AsyncStorage.getItem('user_lat');
            GetUserLong_ = await AsyncStorage.getItem('user_log');

            GetUserPickUpPin_ = await AsyncStorage.getItem('user_pick_pin');

            console.log("GetUser-----Lat_", JSON.parse(GetUserLat_));
            console.log("GetUser-----Long_", JSON.parse(GetUserLong_));
            console.log("GetUser-----Pin_", JSON.parse(GetUserPickUpPin_));

        } catch (error) {

        }


        // Get Longitude by stoarge
        // const storedDropPrev = await AsyncStorage.getItem('user_name_drop');


        // Get Current Date
        const currentDate = moment();
        let formattedDateLL = currentDate.format('LLL');

        if (toggleCheckBoxYesPool || toggleCheckBoxNoPool) {
            if (toggleCheckBoxCashPool ||
                toggleCheckBoxWalletPool || toggleCheckBoxCardPool) {
                if (PickPlace1 === ScreenText.SelectPickuplocation ||
                    PickPlace2 === ScreenText.SelectDropofflocation) {
                    Toast.show("Please choose 'Pool Ride' from the provided options.", Toast.SHORT);
                } else {
                    // Passing Data To Confirm Page
                    navigation.navigate('BookingConfirmScreen', {
                        itemTypeConfrim: 'Taxi Booking',
                        itemServiceConfrim: "Pool Ride",
                        itemPickLocationConfrim: PickPlace1,
                        itemDropLocationConfrim: PickPlace2,
                        itemSelectNoOfSeatsConfrim: selectedOption ? selectedOption.labelSeat : 1,
                        itemPaymentTypeConfrim: toggleCheckBoxCashPool === true
                            ? "Cash Payment"
                            : toggleCheckBoxWalletPool === true
                                ? "Wallet"
                                : toggleCheckBoxCardPool === true
                                    ? "Card"
                                    : "Cash Payment",
                        itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
                        itemLocationDurationConfrim: "30 Mins", // Google API 
                        itemLoyalPointsConfrim: toggleCheckBoxYesPool === true ? "Yes" : "No",
                        itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
                        itemLocationCurrentDateConfrim: formattedDateLL,
                        // itemGetCurrentLatitudeConfrim: JSON.parse(GetUserLat_), // Pick - Drop For Marker
                        // itemGetCurrentLongitudeConfrim: JSON.parse(GetUserLong_), // Pick - Drop For Marker
                        itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
                        itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
                    })
                }
            } else {
                Toast.show("Please choose 'Pool Ride' from the provided options.", Toast.SHORT);
            }
        } else {
            Toast.show("Please choose 'Pool Ride' from the provided options.", Toast.SHORT);
        }



        // if (PickPlace1 === ScreenText.SelectPickuplocation
        //     || PickPlace2 === ScreenText.SelectDropofflocation
        //     || selectedOption.labelSeat === "Select No of seats") {

        //     Toast.show("Please choose 'Pool Ride' from the provided options.", Toast.SHORT);

        // } else {
        //     // Passing Data To Confirm Page
        //     navigation.navigate('BookingConfirmScreen', {
        //         itemTypeConfrim: 'Taxi Booking',
        //         itemServiceConfrim: "Pool Ride",
        //         itemPickLocationConfrim: PickPlace1,
        //         itemDropLocationConfrim: PickPlace2,
        //         itemSelectNoOfSeatsConfrim: selectedOption ? selectedOption.labelSeat : 1,
        //         itemPaymentTypeConfrim: toggleCheckBoxCashPool === true
        //             ? "Cash Payment"
        //             : toggleCheckBoxWalletPool === true
        //                 ? "Wallet"
        //                 : toggleCheckBoxCardPool === true
        //                     ? "Card"
        //                     : "Cash Payment",
        //         itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
        //         itemLocationDurationConfrim: "30 Mins", // Google API 
        //         itemLoyalPointsConfrim: toggleCheckBoxYesPool === true ? "Yes" : "No",
        //         itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
        //         itemLocationCurrentDateConfrim: formattedDateLL,
        //         // itemGetCurrentLatitudeConfrim: JSON.parse(GetUserLat_), // Pick - Drop For Marker
        //         // itemGetCurrentLongitudeConfrim: JSON.parse(GetUserLong_), // Pick - Drop For Marker
        //         itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
        //         itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
        //     })
        // }


    }

    const handleOptionSelect = (option) => {

        console.log("option===>", option.labelSeat);

        setSelectedOption(option);
        closeModal();
        // Add any other logic you need when an option is selected
    };


    const onPressBiddingRequest = async () => {

        // Pick And Drop Passing ! // As Type Flow
        var dis = getDistance(
            { latitude: 2.7689, longitude: 1.1316 },
            { latitude: 1.7689, longitude: -0.3817 },
        );

        try {
            // Get Latitude by stoarge
            GetUserLat_ = await AsyncStorage.getItem('user_lat');
            GetUserLong_ = await AsyncStorage.getItem('user_log');

            GetUserPickUpPin_ = await AsyncStorage.getItem('user_pick_pin');

            console.log("GetUser-----Lat_", JSON.parse(GetUserLat_));
            console.log("GetUser-----Long_", JSON.parse(GetUserLong_));
            console.log("GetUser-----Pin_", JSON.parse(GetUserPickUpPin_));

        } catch (error) {

        }


        // Get Longitude by stoarge
        // const storedDropPrev = await AsyncStorage.getItem('user_name_drop');


        // Get Current Date
        const currentDate = moment();
        let formattedDateLL = currentDate.format('LLL');

        if (toggleCheckBoxYesBid || toggleCheckBoxNoBid) {
            if (toggleCheckBoxCashBid || toggleCheckBoxWalletBid || toggleCheckBoxCardBid) {
                if (PickPlace1 === ScreenText.SelectPickuplocation
                    || PickPlace2 === ScreenText.SelectDropofflocation) {
                    Toast.show("Please choose 'Bidding Ride' from the provided options.", Toast.SHORT);
                } else {
                    // Passing Data To Confirm Page
                    navigation.navigate('BiddingAmountBookNow', {
                        itemTypeConfrim: 'Taxi Booking',

                        itemEnterNoOfHourConfrim: name.toString(), // 28quick
                        itemEnterDistanceConfrim: distance.toString(), // 28quick

                        itemServiceConfrim: "Bidding Ride",
                        itemPickLocationConfrim: PickPlace1,
                        itemDropLocationConfrim: PickPlace2,
                        itemPaymentTypeConfrim: toggleCheckBoxCashBid === true
                            ? "Cash Payment"
                            : toggleCheckBoxWalletBid === true
                                ? "Wallet"
                                : toggleCheckBoxCardBid === true
                                    ? "Card"
                                    : "Cash Payment",

                        itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
                        itemLocationDurationConfrim: "30 Mins", // Google API 
                        itemLoyalPointsConfrim: toggleCheckBoxYesBid === true ? "Yes" : "No",
                        itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
                        itemLocationCurrentDateConfrim: formattedDateLL,
                        // itemGetCurrentLatitudeConfrim: JSON.parse(GetUserLat_), // Pick - Drop For Marker
                        // itemGetCurrentLongitudeConfrim: JSON.parse(GetUserLong_), // Pick - Drop For Marker
                        itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
                        itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
                    })

                }
            } else {
                Toast.show("Please choose 'Bidding Ride' from the provided options.", Toast.SHORT);
            }
        } else {
            Toast.show("Please choose 'Bidding Ride' from the provided options.", Toast.SHORT);
        }

        // if (PickPlace1 === ScreenText.SelectPickuplocation
        //     || PickPlace2 === ScreenText.SelectDropofflocation) {

        //     Toast.show("Please choose 'Bidding Ride' from the provided options.", Toast.SHORT);

        // } else {
        //     // Passing Data To Confirm Page
        //     navigation.navigate('BiddingAmountBookNow', {
        //         itemTypeConfrim: 'Taxi Booking',

        //         itemEnterNoOfHourConfrim: name.toString(), // 28quick
        //         itemEnterDistanceConfrim: distance.toString(), // 28quick

        //         itemServiceConfrim: "Bidding Ride",
        //         itemPickLocationConfrim: PickPlace1,
        //         itemDropLocationConfrim: PickPlace2,
        //         itemPaymentTypeConfrim: toggleCheckBoxCashBid === true
        //             ? "Cash Payment"
        //             : toggleCheckBoxWalletBid === true
        //                 ? "Wallet"
        //                 : toggleCheckBoxCardBid === true
        //                     ? "Card"
        //                     : "Cash Payment",

        //         itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
        //         itemLocationDurationConfrim: "30 Mins", // Google API 
        //         itemLoyalPointsConfrim: toggleCheckBoxYesBid === true ? "Yes" : "No",
        //         itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
        //         itemLocationCurrentDateConfrim: formattedDateLL,
        //         // itemGetCurrentLatitudeConfrim: JSON.parse(GetUserLat_), // Pick - Drop For Marker
        //         // itemGetCurrentLongitudeConfrim: JSON.parse(GetUserLong_), // Pick - Drop For Marker
        //         itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
        //         itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
        //     })
        // }

    }

    const onPressHourlyRideRequest = async () => {

        // Pick And Drop Passing ! // As Type Flow
        var dis = getDistance(
            { latitude: 2.7689, longitude: 1.1316 },
            { latitude: 1.7689, longitude: -0.3817 },
        );

        try {
            // Get Latitude by stoarge
            GetUserLat_ = await AsyncStorage.getItem('user_lat');
            GetUserLong_ = await AsyncStorage.getItem('user_log');

            GetUserPickUpPin_ = await AsyncStorage.getItem('user_pick_pin');

            console.log("GetUser-----Lat_", JSON.parse(GetUserLat_));
            console.log("GetUser-----Long_", JSON.parse(GetUserLong_));
            console.log("GetUser-----Pin_", JSON.parse(GetUserPickUpPin_));

        } catch (error) {

        }


        // Get Longitude by stoarge
        // const storedDropPrev = await AsyncStorage.getItem('user_name_drop');

        // Get Current Date
        const currentDate = moment();
        let formattedDateLL = currentDate.format('LLL');

        if (toggleCheckBoxYesHour || toggleCheckBoxNoHour) {
            if (toggleCheckBoxCashRide ||
                toggleCheckBoxWalletRide || toggleCheckBoxCardRide) {
                if (PickPlace1 === ScreenText.SelectPickuplocation ||
                    PickPlace2 === ScreenText.SelectDropofflocation
                    || name == '' || distance == '') {
                    Toast.show("Please choose 'Hourly Ride' from the provided options.", Toast.SHORT);
                } else {
                    // Passing Data To Confirm Page
                    navigation.navigate('BookingConfirmScreen', {
                        itemTypeConfrim: 'Taxi Booking',

                        itemEnterNoOfHourConfrim: name.toString(), // 28quick
                        itemEnterDistanceConfrim: distance.toString(), // 28quick

                        itemServiceConfrim: "Hourly Ride",
                        itemPickLocationConfrim: PickPlace1,
                        itemDropLocationConfrim: PickPlace2,
                        itemPaymentTypeConfrim: toggleCheckBoxCashRide === true
                            ? "Cash Payment"
                            : toggleCheckBoxWalletRide === true
                                ? "Wallet"
                                : toggleCheckBoxCardRide === true
                                    ? "Card"
                                    : "Cash Payment",
                        itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
                        itemLocationDurationConfrim: "30 Mins", // Google API 
                        itemLoyalPointsConfrim: toggleCheckBoxYesHour === true ? "Yes" : "No",
                        itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
                        itemLocationCurrentDateConfrim: formattedDateLL,
                        // itemGetCurrentLatitudeConfrim: JSON.parse(GetUserLat_), // Pick - Drop For Marker
                        // itemGetCurrentLongitudeConfrim: JSON.parse(GetUserLong_), // Pick - Drop For Marker
                        itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
                        itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
                    })
                }
            } else {
                Toast.show("Please choose 'Hourly Ride' from the provided options.", Toast.SHORT);
            }
        } else {
            Toast.show("Please choose 'Hourly Ride' from the provided options.", Toast.SHORT);
        }

        // if (toggleCheckBoxYesHour || toggleCheckBoxNoHour) {
        //     if (toggleCheckBoxCashRide ||
        //         toggleCheckBoxWalletRide || toggleCheckBoxCardRide) {
        //         if (PickPlace1 === ScreenText.SelectPickuplocation ||
        //             PickPlace2 === ScreenText.SelectDropofflocation
        //             || name == '' || distance == '') {
        //             Toast.show("Please choose 'Hourly Ride' from the provided options.", Toast.SHORT);
        //         } else {
        //             //     // Passing Data To Confirm Page
        //             navigation.navigate('BookingConfirmScreen', {
        //                 itemTypeConfrim: 'Taxi Booking',

        //                 itemEnterNoOfHourConfrim: name.toString(), // 28quick
        //                 itemEnterDistanceConfrim: distance.toString(), // 28quick

        //                 itemServiceConfrim: "Hourly Ride",
        //                 itemPickLocationConfrim: PickPlace1,
        //                 itemDropLocationConfrim: PickPlace2,
        //                 itemPaymentTypeConfrim: toggleCheckBoxCashRide === true
        //                     ? "Cash Payment"
        //                     : toggleCheckBoxWalletRide === true
        //                         ? "Wallet"
        //                         : toggleCheckBoxCardRide === true
        //                             ? "Card"
        //                             : "Cash Payment",
        //                 itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
        //                 itemLocationDurationConfrim: "30 Mins", // Google API 
        //                 itemLoyalPointsConfrim: toggleCheckBoxYesHour === true ? "Yes" : "No",
        //                 itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
        //                 itemLocationCurrentDateConfrim: formattedDateLL,
        //                 // itemGetCurrentLatitudeConfrim: JSON.parse(GetUserLat_), // Pick - Drop For Marker
        //                 // itemGetCurrentLongitudeConfrim: JSON.parse(GetUserLong_), // Pick - Drop For Marker
        //                 itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
        //                 itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
        //             })

        //         }
        //     } else {

        //     }
        // }

        // if (PickPlace1 === ScreenText.SelectPickuplocation
        //     || PickPlace2 === ScreenText.SelectDropofflocation
        //     || name === '' || distance === '') {

        //     Toast.show("Please choose 'Hourly Ride' from the provided options.", Toast.SHORT);

        // } else {
        //     // Passing Data To Confirm Page
        //     navigation.navigate('BookingConfirmScreen', {
        //         itemTypeConfrim: 'Taxi Booking',

        //         itemEnterNoOfHourConfrim: name.toString(), // 28quick
        //         itemEnterDistanceConfrim: distance.toString(), // 28quick

        //         itemServiceConfrim: "Hourly Ride",
        //         itemPickLocationConfrim: PickPlace1,
        //         itemDropLocationConfrim: PickPlace2,
        //         itemPaymentTypeConfrim: toggleCheckBoxCashRide === true
        //             ? "Cash Payment"
        //             : toggleCheckBoxWalletRide === true
        //                 ? "Wallet"
        //                 : toggleCheckBoxCardRide === true
        //                     ? "Card"
        //                     : "Cash Payment",
        //         itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
        //         itemLocationDurationConfrim: "30 Mins", // Google API 
        //         itemLoyalPointsConfrim: toggleCheckBoxYesHour === true ? "Yes" : "No",
        //         itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
        //         itemLocationCurrentDateConfrim: formattedDateLL,
        //         // itemGetCurrentLatitudeConfrim: JSON.parse(GetUserLat_), // Pick - Drop For Marker
        //         // itemGetCurrentLongitudeConfrim: JSON.parse(GetUserLong_), // Pick - Drop For Marker
        //         itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
        //         itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
        //     })

        // }


    }


    const onPressCouierRideNow = async () => {

        // if (toggleCheckBoxCardInfo === true ||
        //     PickPlace1 === ScreenText.SelectPickuplocation ||
        //     PickPlace2 === ScreenText.SelectDropofflocation) {

        // Pick And Drop Passing ! // As Type Flow
        var dis = getDistance(
            { latitude: 2.7689, longitude: 1.1316 },
            { latitude: 1.7689, longitude: -0.3817 },
        );

        try {
            // Get Latitude by stoarge
            GetUserLat_ = await AsyncStorage.getItem('user_lat');
            GetUserLong_ = await AsyncStorage.getItem('user_log');

            GetUserPickUpPin_ = await AsyncStorage.getItem('user_pick_pin');

            console.log("GetUser-----Lat_", JSON.parse(GetUserLat_));
            console.log("GetUser-----Long_", JSON.parse(GetUserLong_));
            console.log("GetUser-----Pin_", JSON.parse(GetUserPickUpPin_));

        } catch (error) {

        }

        // Get Current Date
        const currentDate = moment();
        let formattedDateLL = currentDate.format('LLL');

        // working !

        if (toggleCheckBoxCardInfo === false) {
            Toast.show("Please choose 'Book Now' from the provided options.", Toast.SHORT);
        } else {
            if (toggleCheckBoxYes1 || toggleCheckBoxNo1) {
                if (toggleCheckBoxCash2 || toggleCheckBoxCard2) {
                    if (PickPlace1 === ScreenText.SelectPickuplocation ||
                        PickPlace2 === ScreenText.SelectDropofflocation) {
                        Toast.show("Please choose 'Book Now' from the provided options.", Toast.SHORT);
                    } else {
                        // Passing Data To Confirm Page
                        navigation.navigate('CourierConfirmScreen', {
                            itemTypeConfrim: 'Courier Delivery',
                            itemServiceConfrim: "Book Now",
                            itemPickLocationConfrim: PickPlace1,
                            itemDropLocationConfrim: PickPlace2,
                            itemPaymentTypeConfrim: toggleCheckBoxCash2 === true ? "Cash Payment" : "Card",
                            itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
                            itemLocationDurationConfrim: "30 Mins", // Google API 
                            itemLoyalPointsConfrim: toggleCheckBoxYes1 === true ? "Yes" : "No",
                            itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
                            itemLocationCurrentDateConfrim: formattedDateLL,
                            itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
                            itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
                        })
                    }
                } else {
                    Toast.show("Please choose 'Book Now' from the provided options.", Toast.SHORT);
                }
            } else {
                Toast.show("Please choose 'Book Now' from the provided options.", Toast.SHORT);
            }
        }

        // working !


        // if (toggleCheckBoxCardInfo === false) {

        //     Toast.show("Please choose 'Book Now' from the provided options.", Toast.SHORT);

        // } else {
        //     // Passing Data To Confirm Page
        //     navigation.navigate('CourierConfirmScreen', {
        //         itemTypeConfrim: 'Courier Delivery',
        //         itemServiceConfrim: "Book Now",
        //         itemPickLocationConfrim: PickPlace1,
        //         itemDropLocationConfrim: PickPlace2,
        //         itemPaymentTypeConfrim: toggleCheckBoxCash2 === true ? "Cash Payment" : "Card",
        //         itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
        //         itemLocationDurationConfrim: "30 Mins", // Google API 
        //         itemLoyalPointsConfrim: toggleCheckBoxYes1 === true ? "Yes" : "No",
        //         itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
        //         itemLocationCurrentDateConfrim: formattedDateLL,
        //         itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
        //         itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
        //     })

        // }

    }

    const onPressNextSheduleBooking = async () => {

        // Pick And Drop Passing ! // As Type Flow
        var dis = getDistance(
            { latitude: 2.7689, longitude: 1.1316 },
            { latitude: 1.7689, longitude: -0.3817 },
        );

        try {
            // Get Latitude by stoarge
            GetUserLat_ = await AsyncStorage.getItem('user_lat');
            GetUserLong_ = await AsyncStorage.getItem('user_log');

            GetUserPickUpPin_ = await AsyncStorage.getItem('user_pick_pin');

            console.log("GetUser-----Lat_", JSON.parse(GetUserLat_));
            console.log("GetUser-----Long_", JSON.parse(GetUserLong_));
            console.log("GetUser-----Pin_", JSON.parse(GetUserPickUpPin_));

        } catch (error) {

        }

        // Get Current Date
        // currentDate.format('DD-MM-YYYY')
        const currentDate = moment();
        let formattedDateLL = currentDate.format('LLL');


        if (toggleCheckBoxCardInfo === true) {
            if (toggleCheckBoxYesPoolSB || toggleCheckBoxNoPoolSB) {
                if (toggleCheckBoxCashPoolSB || toggleCheckBoxWalletPoolSB ||
                    toggleCheckBoxCardPoolSB) {
                    if (PickPlace1 === ScreenText.SelectPickuplocation
                        || PickPlace2 === ScreenText.SelectDropofflocation
                        || isSchedule === "3:00PM" ||
                        isScheduleDate === "09/05/2023") {
                        Toast.show("no", Toast.SHORT);
                    } else {
                        // Passing Data To Confirm Page
                        navigation.navigate('CourierConfirmScreen', {
                            itemTypeConfrim: 'Courier Delivery',
                            itemServiceConfrim: "Schedule Booking",

                            // Added 
                            itemScheduleDateConfrim: isSchedule,
                            itemScheduleTimeConfrim: isScheduleDate,

                            itemPickLocationConfrim: PickPlace1,
                            itemDropLocationConfrim: PickPlace2,
                            itemPaymentTypeConfrim: toggleCheckBoxCashPoolSB === true
                                ? "Cash Payment"
                                : toggleCheckBoxWalletPoolSB === true
                                    ? "Wallet"
                                    : toggleCheckBoxCardPoolSB === true
                                        ? "Card"
                                        : "Cash Payment",
                            itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
                            itemLocationDurationConfrim: "30 Mins", // Google API 
                            itemLoyalPointsConfrim: toggleCheckBoxYesPoolSB === true ? "Yes" : "No",
                            itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
                            itemLocationCurrentDateConfrim: formattedDateLL,
                            itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
                            itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
                        });
                    }
                } else {
                    Toast.show("Please choose 'Schedule Booking' from the provided options.", Toast.SHORT);
                }
            } else {
                Toast.show("Please choose 'Schedule Booking' from the provided options.", Toast.SHORT);
            }
        } else {
            Toast.show("Please choose 'Schedule Booking' from the provided options.", Toast.SHORT);
        }

        // if (toggleCheckBoxCardInfo === true ||
        //     PickPlace1 === ScreenText.SelectPickuplocation
        //     || PickPlace2 === ScreenText.SelectDropofflocation
        //     || isSchedule === "3:00PM" ||
        //     isScheduleDate === "09/05/2023") {

        //     Toast.show("Please choose 'Schedule Booking' from the provided options.", Toast.SHORT);

        // } else {

        //     // Passing Data To Confirm Page
        //     navigation.navigate('CourierConfirmScreen', {
        //         itemTypeConfrim: 'Courier Delivery',
        //         itemServiceConfrim: "Schedule Booking",

        //         // Added 
        //         itemScheduleDateConfrim: isSchedule,
        //         itemScheduleTimeConfrim: isScheduleDate,

        //         itemPickLocationConfrim: PickPlace1,
        //         itemDropLocationConfrim: PickPlace2,
        //         itemPaymentTypeConfrim: toggleCheckBoxCashPoolSB === true
        //             ? "Cash Payment"
        //             : toggleCheckBoxWalletPoolSB === true
        //                 ? "Wallet"
        //                 : toggleCheckBoxCardPoolSB === true
        //                     ? "Card"
        //                     : "Cash Payment",
        //         itemLocationDistanceConfrim: dis / 1000, // Other Lib // Google API 
        //         itemLocationDurationConfrim: "30 Mins", // Google API 
        //         itemLoyalPointsConfrim: toggleCheckBoxYesPoolSB === true ? "Yes" : "No",
        //         itemLocationPinCodeConfrim: JSON.parse(GetUserPickUpPin_), // Pick
        //         itemLocationCurrentDateConfrim: formattedDateLL,
        //         itemGetCurrentLatitudeConfrim: GetUserLat_, // Pick - Drop For Marker
        //         itemGetCurrentLongitudeConfrim: GetUserLong_, // Pick - Drop For Marker
        //     }
        //     )

        // }


    }


    const onPressShowDateSchedulePicker = () => {
        setShedulePickerVisible(true);
    }

    const onPressShowPicker = () => {
        setDatePickerVisible(true);
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
                        paddingOpacity={wp(2)}
                        textAlign={"center"}
                        source={Images.arrowRight}
                        width={wp(7)}
                        height={wp(7)}
                        color={Colors.lightBlack}
                        fontFamily={Fonts.InterRegular}
                        fontWeight="500"
                        title={""}
                        fontSize={wp(4)}
                        isVisibleDropDown={false}
                        isVisibleDropDownBooking={true}
                        selectedValueBook={selectedValue}
                        handleSelectBook={handleSelect}
                        selectService={route.params.itemType}
                        borderColor={Colors.blue}
                        borderWidth={1}
                        dataBook={data}
                        sourceBook={route.params.itemType === "Taxi Booking" ? Images1.flagIcon : Images1.defaultIcon}
                        selectedDataText={selectedData?.label}
                        selectedDataImg={selectedData?.img}
                        borderRadius={wp(3)}
                        selectedImage={selectedImage || Images1.flagIcon}
                        selected={(!!selected && selected.label) || route.params.itemType}
                        toggleDropdown={toggleDropdown}
                        renderDropdown={renderDropdown}
                        isArrow={true}
                        isArrowLeft={false}
                        onPress={() => navigation.goBack()}
                    />

                </View>

                <ScrollView>
                    {isSelectedViewFirst === true ?

                        <View>
                            <View style={Styles.bookContainer}>
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
                                                    onPress={() =>
                                                        navigation.navigate("PickupScreen")
                                                    }
                                                >
                                                    <TextInputComponent
                                                        selectionColor={Colors.white}
                                                        isVisibleDropDown={false}
                                                        isVisibleLock={false}
                                                        isVisibleMail={false}
                                                        isVisibleCloseIcon={true} // As Text Available To Show !
                                                        isVisibleLockWhite={false}
                                                        marginVertical={hp(1)}
                                                        marginHorizontal={wp(2)}
                                                        width={wp(90)}
                                                        height={hp(7)}
                                                        // marginTop={hp(2)}
                                                        isUserHide={false}
                                                        textfontSize={ConstValue.value15}
                                                        textfontFamily={Fonts.PoppinsRegular}
                                                        textlineHeight={ConstValue.value0}
                                                        ref={refPickUp}
                                                        placeholder={PickPlace1}
                                                        editable={false}
                                                        multiline={false}
                                                        secureTextEntry={false}
                                                        isPadding={true}
                                                        keyboardType='default'
                                                        maxLength={null}
                                                        textAlign='left'
                                                        numberOfLines={null}
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
                                                        onPress={() =>
                                                            navigation.navigate("DropupScreen")}
                                                    >
                                                        <TextInputComponent
                                                            selectionColor={Colors.white}
                                                            isVisibleDropDown={false}
                                                            isVisibleLock={false}
                                                            isVisibleMail={false}
                                                            isVisibleCloseIcon={true} // As Text Available To Show !
                                                            isVisibleLockWhite={false}
                                                            // marginHorizontal={wp(10)}
                                                            width={wp(90)}
                                                            // marginTop={wp(2)}
                                                            height={hp(7)}
                                                            isUserHide={false}
                                                            textfontSize={ConstValue.value15}
                                                            textfontFamily={Fonts.PoppinsRegular}
                                                            textlineHeight={ConstValue.value0}
                                                            ref={refDropUp}
                                                            placeholder={PickPlace2}
                                                            editable={false}
                                                            multiline={false}
                                                            secureTextEntry={false}
                                                            isPadding={true}
                                                            keyboardType='default'
                                                            maxLength={null}
                                                            textAlign='left'
                                                            numberOfLines={null}
                                                            color={Colors.white}
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

                            <View style={Styles.viewSelectServices}>
                                <TextComponent
                                    color={Colors.white}
                                    title={ScreenText.SelectServices}
                                    textDecorationLine={'none'}
                                    fontWeight="500"
                                    fontSize={wp(4)}
                                    marginHorizontal={wp(8)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewRideNow}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(2)}
                                        heightBtn={hp(5)}
                                        widthBtn={wp(43)}
                                        isRightArrow={false}
                                        color={Colors.white}
                                        title={ScreenText.BookNow}
                                        onPress={onPressBookNow}
                                        marginHorizontal={wp(2)}
                                        fontWeight="600"
                                        fontSize={wp(3)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={isBackground11 ? Colors.blue : Colors.grayDrawerBg}
                                    />
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(2)}
                                        onPress={onPressSheduleBooking}
                                        heightBtn={hp(5)}
                                        widthBtn={wp(43)}
                                        isRightArrow={false}
                                        color={Colors.white}
                                        title={ScreenText.Schedulebooking}
                                        fontWeight="600"
                                        fontSize={wp(3)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={isBackground22 ? Colors.blue : Colors.grayDrawerBg}
                                    />

                                </ScrollView>


                            </View>

                            {isBackground11 === true ?
                                <View style={Styles.viewBackgroundMessage1}>

                                    <View>
                                        <View>
                                            <Text style={Styles.viewBackgroundMessage2}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'>
                                                Are you want to use Loyalty points ?
                                            </Text>
                                            <Text style={Styles.viewBackgroundMessage3}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'>
                                                ( 10% Of all Payment )
                                            </Text>
                                            <View>
                                                <View style={Styles.viewBackgroundMessage4}>
                                                    <CheckBox
                                                        onCheckColor={'white'}
                                                        onFillColor={'blue'}
                                                        boxType="square"
                                                        disabled={false}
                                                        tintColors={{ true: Colors.blue, false: Colors.white }}
                                                        value={toggleCheckBoxYes1} //1901
                                                        // onValueChange={(newValue) => setToggleCheckBoxYes1(newValue)}
                                                        onValueChange={(newValue) => {
                                                            setToggleCheckBoxYes1(newValue);
                                                            setToggleCheckBoxNo1(false);
                                                        }} />
                                                    <TextComponent
                                                        color={Colors.white}
                                                        title={ScreenText.Yes}
                                                        textDecorationLine={'none'}
                                                        fontWeight="400"
                                                        fontSize={wp(3.5)}
                                                        fontFamily={Fonts.PoppinsRegular}
                                                        alignSelf='center'
                                                        textAlign='center'
                                                    />

                                                </View>
                                                <View style={Styles.viewCheckbox1}>
                                                    <CheckBox
                                                        onCheckColor={'white'}
                                                        onFillColor={'blue'}
                                                        boxType="square"
                                                        disabled={false}
                                                        tintColors={{ true: Colors.blue, false: Colors.white }}
                                                        value={toggleCheckBoxNo1}
                                                        //  onValueChange={(newValue) => setToggleCheckBoxNo1(newValue)}
                                                        onValueChange={(newValue) => {
                                                            setToggleCheckBoxNo1(newValue);
                                                            setToggleCheckBoxYes1(false);
                                                        }} />
                                                    <TextComponent
                                                        color={Colors.white}
                                                        title={ScreenText.No}
                                                        textDecorationLine={'none'}
                                                        fontWeight="400"
                                                        fontSize={wp(3.5)}
                                                        fontFamily={Fonts.PoppinsRegular}
                                                        alignSelf='center'
                                                        textAlign='center'
                                                    />
                                                </View>
                                            </View>

                                        </View>

                                        <View>
                                            <Text style={Styles.viewSelectPayment}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'>
                                                Select Payment Method
                                            </Text>
                                        </View>
                                    </View>

                                    <View>
                                        <View style={Styles.viewCheckbox2}>
                                            <CheckBox
                                                onCheckColor={'white'}
                                                onFillColor={'blue'}
                                                boxType="square"
                                                disabled={false}
                                                tintColors={{ true: Colors.blue, false: Colors.white }}
                                                value={toggleCheckBoxCash2}
                                                // onValueChange={(newValue) => setToggleCheckBoxCash2(newValue)}
                                                onValueChange={(newValue) => {
                                                    setToggleCheckBoxCash2(newValue);
                                                    setToggleCheckBoxCard2(false);
                                                }} />
                                            <TextComponent
                                                color={Colors.white}
                                                title={ScreenText.CashPayment}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(3.5)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                alignSelf='center'
                                                textAlign='center'
                                            />

                                        </View>

                                        <View style={Styles.viewCheckbox3}>
                                            <CheckBox
                                                onCheckColor={'white'}
                                                onFillColor={'blue'}
                                                boxType="square"
                                                disabled={false}
                                                tintColors={{ true: Colors.blue, false: Colors.white }}
                                                value={toggleCheckBoxCard2}
                                                // onValueChange={(newValue) => setToggleCheckBoxCard2(newValue)}
                                                onValueChange={(newValue) => {
                                                    setToggleCheckBoxCard2(newValue);
                                                    setToggleCheckBoxCash2(false);
                                                }} />
                                            <TextComponent
                                                color={Colors.white}
                                                title={ScreenText.Card}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(3.5)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                alignSelf='center'
                                                textAlign='center'
                                            />
                                        </View>


                                    </View>

                                    <View style={Styles.viewBookNow}>

                                        <View style={CommonStyle.commonRow}>

                                            <View>
                                                <CheckBox
                                                    onCheckColor={'white'}
                                                    onFillColor={'blue'}
                                                    boxType="square"
                                                    disabled={false}
                                                    tintColors={{ true: Colors.blue, false: Colors.white }}
                                                    value={toggleCheckBoxCardInfo}
                                                    onValueChange={(newValue) => setToggleCheckBoxCardInfo(newValue)}
                                                />
                                            </View>

                                            <View style={CommonStyle.justifyContent}>
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={ScreenText.NoRestricteditems}
                                                    textDecorationLine={'none'}
                                                    fontWeight="400"
                                                    fontSize={wp(3)}
                                                    marginHorizontal={wp(1)}
                                                    numberOfLines={2}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    textAlign='center'
                                                />
                                            </View>

                                        </View>


                                        <View>

                                            <ButtonComponent
                                                isVisibleMobile={false}
                                                isVisibleFaceBook={false}
                                                heightBtn={hp(7)}
                                                widthBtn={wp(90)}
                                                marginVertical={wp(2)}
                                                isRightArrow={false}
                                                color={Colors.white}
                                                onPress={onPressCouierRideNow} title={ScreenText.Next}
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

                                    </View>

                                </View>
                                : isBackground22 === true ?
                                    <View style={Styles.viewBackground2}>
                                        <View>

                                            <View>

                                                <View style={{ marginVertical: wp(2) }}>
                                                    <Text style={Styles.viewSeatNo}
                                                        numberOfLines={2}
                                                        ellipsizeMode='tail'>
                                                        Select schedule date
                                                    </Text>
                                                </View>

                                                {isShedulePickerVisible && (
                                                    <DateTimePicker
                                                        value={selectedSheduleDate}
                                                        mode="date" // Set the mode to "date" for the date picker
                                                        display="default"
                                                        onChange={handleSheduleDateChange}
                                                    />
                                                )}

                                                <View style={{
                                                    flexDirection: "row",
                                                    backgroundColor: Colors.circleGray,
                                                    padding: wp(3),
                                                    marginHorizontal: wp(3),
                                                    borderRadius: wp(2)
                                                }}>
                                                    <View>
                                                        <TouchableOpacity
                                                            onPress={onPressShowDateSchedulePicker}>
                                                            <Image
                                                                style={{ width: wp(5), height: wp(5) }}
                                                                resizeMode="contain"
                                                                source={Images.grayCalenderIcon} />
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View>
                                                        <TextComponent
                                                            color={Colors.gray}
                                                            title={isScheduleDate}
                                                            textDecorationLine={'none'}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            marginHorizontal={wp(3)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            alignSelf='center'
                                                            textAlign='center'
                                                        />

                                                    </View>
                                                </View>

                                                <View style={{ marginVertical: wp(2) }}>
                                                    <Text style={Styles.viewSeatNo}
                                                        numberOfLines={2}
                                                        ellipsizeMode='tail'>
                                                        Select schedule time
                                                    </Text>
                                                </View>

                                                {isDatePickerVisible && (
                                                    <DateTimePicker
                                                        value={selectedDate}
                                                        mode={displayMode}
                                                        is24Hour={false}
                                                        display="default"
                                                        onChange={handleDateChange}
                                                    />
                                                )}

                                                <View style={{
                                                    flexDirection: "row",
                                                    backgroundColor: Colors.circleGray,
                                                    padding: wp(3),
                                                    marginHorizontal: wp(3),
                                                    borderRadius: wp(2)
                                                }}>
                                                    <View>
                                                        <TouchableOpacity
                                                            onPress={onPressShowPicker}
                                                        >
                                                            <Image
                                                                style={{ width: wp(5), height: wp(5) }}
                                                                resizeMode="contain"
                                                                source={Images.grayClockIcon} />
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View>
                                                        <TextComponent
                                                            color={Colors.gray}
                                                            title={isSchedule}
                                                            textDecorationLine={'none'}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            marginHorizontal={wp(3)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            alignSelf='center'
                                                            textAlign='center'
                                                        />

                                                    </View>
                                                </View>

                                            </View>

                                            <View style={{ marginVertical: wp(2) }}>
                                                <Text style={Styles.textAreYouWantTo}
                                                    numberOfLines={2}
                                                    ellipsizeMode='tail'>
                                                    Are you want to use Loyalty points ?
                                                </Text>
                                            </View>

                                            <Text style={Styles.textPercentageOff}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'>
                                                ( 10% Of all Payment )
                                            </Text>
                                            <View>
                                                <View style={Styles.textYesConatiner}>
                                                    <CheckBox
                                                        onCheckColor={'white'}
                                                        onFillColor={'blue'}
                                                        boxType="square"
                                                        disabled={false}
                                                        tintColors={{ true: Colors.blue, false: Colors.white }}
                                                        value={toggleCheckBoxYesPoolSB} //2024
                                                        // onValueChange={(newValue) => setToggleCheckBoxYesPoolSB(newValue)}
                                                        onValueChange={(newValue) => {
                                                            setToggleCheckBoxYesPoolSB(newValue);
                                                            setToggleCheckBoxNoPoolSB(false);
                                                        }} />
                                                    <TextComponent
                                                        color={Colors.white}
                                                        title={ScreenText.Yes}
                                                        textDecorationLine={'none'}
                                                        fontWeight="400"
                                                        fontSize={wp(3.5)}
                                                        fontFamily={Fonts.PoppinsRegular}
                                                        alignSelf='center'
                                                        textAlign='center'
                                                    />

                                                </View>
                                                <View style={Styles.viewBoxNoPool}>
                                                    <CheckBox
                                                        onCheckColor={'white'}
                                                        onFillColor={'blue'}
                                                        boxType="square"
                                                        disabled={false}
                                                        tintColors={{ true: Colors.blue, false: Colors.white }}
                                                        value={toggleCheckBoxNoPoolSB}
                                                        // onValueChange={(newValue) => setToggleCheckBoxNoPoolSB(newValue)}
                                                        onValueChange={(newValue) => {
                                                            setToggleCheckBoxNoPoolSB(newValue);
                                                            setToggleCheckBoxYesPoolSB(false);
                                                        }} />
                                                    <TextComponent
                                                        color={Colors.white}
                                                        title={ScreenText.No}
                                                        textDecorationLine={'none'}
                                                        fontWeight="400"
                                                        fontSize={wp(3.5)}
                                                        fontFamily={Fonts.PoppinsRegular}
                                                        alignSelf='center'
                                                        textAlign='center'
                                                    />
                                                </View>
                                            </View>

                                        </View>


                                        <View>
                                            <Text style={Styles.textSelectPaymentMethod}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'>
                                                Select Payment Method
                                            </Text>
                                        </View>

                                        <View>
                                            <View style={Styles.textCashPayment}>
                                                <CheckBox
                                                    onCheckColor={'white'}
                                                    onFillColor={'blue'}
                                                    boxType="square"
                                                    disabled={false}
                                                    tintColors={{ true: Colors.blue, false: Colors.white }}
                                                    value={toggleCheckBoxCashPoolSB}
                                                    // onValueChange={(newValue) => setToggleCheckBoxCashPoolSB(newValue)}
                                                    onValueChange={(newValue) => { //tsx...
                                                        setToggleCheckBoxCashPoolSB(newValue);
                                                        setToggleCheckBoxCardPoolSB(false);
                                                        setToggleCheckBoxWalletPoolSB(false);
                                                    }} />
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={ScreenText.CashPayment}
                                                    textDecorationLine={'none'}
                                                    fontWeight="400"
                                                    fontSize={wp(3.5)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    alignSelf='center'
                                                    textAlign='center'
                                                />

                                            </View>
                                            <View style={Styles.viewWalletConatiner}>
                                                <CheckBox
                                                    onCheckColor={'white'}
                                                    onFillColor={'blue'}
                                                    boxType="square"
                                                    disabled={false}
                                                    tintColors={{ true: Colors.blue, false: Colors.white }}
                                                    value={toggleCheckBoxWalletPoolSB}
                                                    // onValueChange={(newValue) => setToggleCheckBoxWalletPoolSB(newValue)}
                                                    onValueChange={(newValue) => {
                                                        setToggleCheckBoxWalletPoolSB(newValue);
                                                        setToggleCheckBoxCardPoolSB(false);
                                                        setToggleCheckBoxCashPoolSB(false);
                                                    }} />
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={ScreenText.Wallet}
                                                    textDecorationLine={'none'}
                                                    fontWeight="400"
                                                    fontSize={wp(3.5)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    alignSelf='center'
                                                    textAlign='center'
                                                />
                                            </View>
                                            <View style={Styles.viewWalletConatiner}>
                                                <CheckBox
                                                    onCheckColor={'white'}
                                                    onFillColor={'blue'}
                                                    boxType="square"
                                                    disabled={false}
                                                    tintColors={{ true: Colors.blue, false: Colors.white }}
                                                    value={toggleCheckBoxCardPoolSB}
                                                    // onValueChange={(newValue) => setToggleCheckBoxCardPoolSB(newValue)}
                                                    onValueChange={(newValue) => {
                                                        setToggleCheckBoxCardPoolSB(newValue);
                                                        setToggleCheckBoxWalletPoolSB(false);
                                                        setToggleCheckBoxCashPoolSB(false);
                                                    }} />
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={ScreenText.Card}
                                                    textDecorationLine={'none'}
                                                    fontWeight="400"
                                                    fontSize={wp(3.5)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    alignSelf='center'
                                                    textAlign='center'
                                                />
                                            </View>
                                            <View>

                                                <View>
                                                    <View style={{
                                                        flexDirection: "row",
                                                        marginTop: wp(15)
                                                    }}>

                                                        <View style={{
                                                            justifyContent: 'center',

                                                        }}>
                                                            <CheckBox
                                                                onCheckColor={'white'}
                                                                onFillColor={'blue'}
                                                                boxType="square"
                                                                disabled={false}
                                                                tintColors={{ true: Colors.blue, false: Colors.white }}
                                                                value={toggleCheckBoxCardInfo}
                                                                onValueChange={(newValue) => setToggleCheckBoxCardInfo(newValue)}
                                                            />
                                                        </View>

                                                        <View>
                                                            <TextComponent
                                                                color={Colors.white}
                                                                title={ScreenText.NoRestricteditems}
                                                                textDecorationLine={'none'}
                                                                fontWeight="400"
                                                                fontSize={wp(3.5)}
                                                                fontFamily={Fonts.PoppinsRegular}
                                                                textAlign='left'
                                                            />
                                                        </View>

                                                    </View>
                                                </View>

                                                <View>
                                                    <ButtonComponent
                                                        isVisibleMobile={false}
                                                        isVisibleFaceBook={false}
                                                        marginVertical={hp(2)}
                                                        heightBtn={hp(7)}
                                                        widthBtn={wp(90)}
                                                        isRightArrow={false}
                                                        color={Colors.white}
                                                        title={ScreenText.Next}
                                                        onPress={onPressNextSheduleBooking}
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


                                            </View>
                                        </View>
                                    </View>
                                    : null}
                        </View>

                        :

                        <View>
                            <View style={Styles.bookContainer}>

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
                                                    onPress={() => navigation.navigate("PickupScreen")}
                                                >
                                                    <TextInputComponent
                                                        selectionColor={Colors.white}
                                                        isVisibleDropDown={false}
                                                        isVisibleLock={false}
                                                        isVisibleMail={false}
                                                        isVisibleCloseIcon={true} // As Text Available To Show !
                                                        isVisibleLockWhite={false}
                                                        marginVertical={hp(1)}
                                                        marginHorizontal={wp(2)}
                                                        width={wp(90)}
                                                        height={hp(7)}
                                                        // marginTop={hp(2)}
                                                        isUserHide={false}
                                                        textfontSize={ConstValue.value15}
                                                        textfontFamily={Fonts.PoppinsRegular}
                                                        textlineHeight={ConstValue.value0}
                                                        ref={refPickUp}
                                                        placeholder={PickPlace1}
                                                        editable={false}
                                                        multiline={false}
                                                        secureTextEntry={false}
                                                        isPadding={true}
                                                        keyboardType='default'
                                                        maxLength={null}
                                                        textAlign='left'
                                                        numberOfLines={null}
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
                                                        onPress={() => navigation.navigate("DropupScreen")}
                                                    >
                                                        <TextInputComponent
                                                            isVisibleDropDown={false}
                                                            isVisibleLock={false}
                                                            isVisibleMail={false}
                                                            selectionColor={Colors.white}
                                                            isVisibleCloseIcon={true} // As Text Available To Show !
                                                            isVisibleLockWhite={false}
                                                            // marginHorizontal={wp(10)}
                                                            width={wp(90)}
                                                            // marginTop={wp(2)}
                                                            height={hp(7)}
                                                            isUserHide={false}
                                                            textfontSize={ConstValue.value15}
                                                            textfontFamily={Fonts.PoppinsRegular}
                                                            textlineHeight={ConstValue.value0}
                                                            ref={refDropUp}
                                                            placeholder={PickPlace2}
                                                            editable={false}
                                                            multiline={false}
                                                            secureTextEntry={false}
                                                            isPadding={true}
                                                            keyboardType='default'
                                                            maxLength={null}
                                                            textAlign='left'
                                                            numberOfLines={null}
                                                            color={Colors.white}
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

                            <View style={Styles.viewSelectServices}>
                                <TextComponent
                                    color={Colors.white}
                                    title={ScreenText.SelectServices}
                                    textDecorationLine={'none'}
                                    fontWeight="500"
                                    fontSize={wp(4)}
                                    marginHorizontal={wp(8)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                            <View style={Styles.viewRideNow}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(2)}
                                        heightBtn={hp(5)}
                                        widthBtn={wp(25)}
                                        isRightArrow={false}
                                        color={Colors.white}
                                        title={ScreenText.RideNow}
                                        onPress={onPressRideNow}
                                        marginHorizontal={wp(2)}
                                        fontWeight="600"
                                        fontSize={wp(3)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={isBackground1 ? Colors.blue : Colors.grayDrawerBg}
                                    />
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(2)}
                                        onPress={onPressPoolRide}
                                        heightBtn={hp(5)}
                                        widthBtn={wp(25)}
                                        isRightArrow={false}
                                        color={Colors.white}
                                        title={ScreenText.PoolRide}
                                        fontWeight="600"
                                        fontSize={wp(3)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={isBackground2 ? Colors.blue : Colors.grayDrawerBg}
                                    />
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(2)}
                                        heightBtn={hp(5)}
                                        widthBtn={wp(25)}
                                        onPress={onPressHourlyRide}
                                        isRightArrow={false}
                                        marginHorizontal={wp(2)}
                                        color={Colors.white}
                                        title={ScreenText.HourlyRide}
                                        fontWeight="600"
                                        fontSize={wp(3)}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={isBackground3 ? Colors.blue : Colors.grayDrawerBg}
                                    />
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(2)}
                                        heightBtn={hp(5)}
                                        widthBtn={wp(25)}
                                        isRightArrow={false}
                                        marginHorizontal={wp(2)}
                                        color={Colors.white}
                                        title={ScreenText.BiddingRide}
                                        fontWeight="600"
                                        fontSize={wp(3)}
                                        onPress={onPressBinddingRide}
                                        fontFamily={Fonts.PoppinsSemiBold}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={isBackground4 ? Colors.blue : Colors.grayDrawerBg} />
                                </ScrollView>


                            </View>

                            {isBackground1 === true ?
                                <View style={Styles.viewBackgroundMessage1}>

                                    <View>
                                        <Text style={Styles.viewBackgroundMessage2}
                                            numberOfLines={2}
                                            ellipsizeMode='tail'>
                                            Are you want to use Loyalty points ?
                                        </Text>
                                        <Text style={Styles.viewBackgroundMessage3}
                                            numberOfLines={2}
                                            ellipsizeMode='tail'>
                                            ( 10% Of all Payment )
                                        </Text>
                                        <View>
                                            <View style={Styles.viewBackgroundMessage4}>
                                                <CheckBox
                                                    onCheckColor='white'
                                                    onFillColor='blue'
                                                    boxType="square"
                                                    disabled={false}
                                                    tintColors={{ true: 'blue', false: 'white' }}
                                                    value={toggleCheckBoxYes}
                                                    onValueChange={(newValue) => {
                                                        setToggleCheckBoxYes(newValue);
                                                        setToggleCheckBoxNo(false);
                                                    }}
                                                />
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={ScreenText.Yes}
                                                    textDecorationLine={'none'}
                                                    fontWeight="400"
                                                    fontSize={wp(3.5)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    alignSelf='center'
                                                    textAlign='center'
                                                />

                                            </View>
                                            <View style={Styles.viewCheckbox1}>
                                                <CheckBox
                                                    onCheckColor={'white'}
                                                    onFillColor={'blue'}
                                                    boxType="square"
                                                    disabled={false}
                                                    tintColors={{ true: Colors.blue, false: Colors.white }}
                                                    value={toggleCheckBoxNo}
                                                    onValueChange={(newValue) => {
                                                        setToggleCheckBoxNo(newValue);
                                                        setToggleCheckBoxYes(false);
                                                    }} />
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={ScreenText.No}
                                                    textDecorationLine={'none'}
                                                    fontWeight="400"
                                                    fontSize={wp(3.5)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    alignSelf='center'
                                                    textAlign='center'
                                                />
                                            </View>
                                        </View>

                                    </View>

                                    <View>
                                        <Text style={Styles.viewSelectPayment}
                                            numberOfLines={2}
                                            ellipsizeMode='tail'>
                                            Select Payment Method
                                        </Text>
                                    </View>

                                    <View>
                                        <View style={Styles.viewCheckbox2}>
                                            <CheckBox
                                                onCheckColor={'white'}
                                                onFillColor={'blue'}
                                                boxType="square"
                                                disabled={false}
                                                tintColors={{ true: Colors.blue, false: Colors.white }}
                                                value={toggleCheckBoxCash}
                                                onValueChange={(newValue) => {
                                                    setToggleCheckBoxCash(newValue);
                                                    setToggleCheckBoxCard(false);
                                                }} />

                                            <TextComponent
                                                color={Colors.white}
                                                title={ScreenText.CashPayment}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(3.5)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                alignSelf='center'
                                                textAlign='center'
                                            />

                                        </View>

                                        <View style={Styles.viewCheckbox3}>
                                            <CheckBox
                                                onCheckColor={'white'}
                                                onFillColor={'blue'}
                                                boxType="square"
                                                disabled={false}
                                                tintColors={{ true: Colors.blue, false: Colors.white }}
                                                value={toggleCheckBoxCard}
                                                onValueChange={(newValue) => {
                                                    setToggleCheckBoxCard(newValue);
                                                    setToggleCheckBoxCash(false);
                                                }} />
                                            <TextComponent
                                                color={Colors.white}
                                                title={ScreenText.Card}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(3.5)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                alignSelf='center'
                                                textAlign='center'
                                            />
                                        </View>

                                        <View>
                                            <ButtonComponent
                                                isVisibleMobile={false}
                                                isVisibleFaceBook={false}
                                                marginVertical={hp(2)}
                                                heightBtn={hp(7)}
                                                widthBtn={wp(90)}
                                                isRightArrow={false}
                                                color={Colors.white}
                                                onPress={onPressBookingConfirmRideNow}
                                                // onPress={() => navigation.navigate('BookingConfirmScreen')}
                                                title={ScreenText.Next}
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
                                    </View>

                                </View>
                                : isBackground2 === true ?
                                    <View style={Styles.viewBackground2}>
                                        <View>

                                            <View>
                                                <Text style={Styles.viewSeatNo}
                                                    numberOfLines={2}
                                                    ellipsizeMode='tail'>
                                                    Select No. of Seats
                                                </Text>

                                                <CustomDropdownSelect
                                                    modalVisible={modalVisible}
                                                    openModal={openModal}
                                                    closeModal={closeModal}
                                                    selectedOption={selectedOption}
                                                    handleOptionSelect={handleOptionSelect}
                                                    // handleOptionSelect={(option) => console.log("item===>" + option)}
                                                    options={dataSeat} />

                                            </View>

                                            <Text style={Styles.textAreYouWantTo}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'>
                                                Are you want to use Loyalty points ?
                                            </Text>
                                            <Text style={Styles.textPercentageOff}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'>
                                                ( 10% Of all Payment )
                                            </Text>
                                            <View>
                                                <View style={Styles.textYesConatiner}>
                                                    <CheckBox
                                                        onCheckColor={'white'}
                                                        onFillColor={'blue'}
                                                        boxType="square"
                                                        disabled={false}
                                                        tintColors={{ true: Colors.blue, false: Colors.white }}
                                                        value={toggleCheckBoxYesPool}
                                                        onValueChange={(newValue) => {
                                                            setToggleCheckBoxYesPool(newValue);
                                                            setToggleCheckBoxNoPool(false);
                                                        }} />
                                                    <TextComponent
                                                        color={Colors.white}
                                                        title={ScreenText.Yes}
                                                        textDecorationLine={'none'}
                                                        fontWeight="400"
                                                        fontSize={wp(3.5)}
                                                        fontFamily={Fonts.PoppinsRegular}
                                                        alignSelf='center'
                                                        textAlign='center'
                                                    />

                                                </View>
                                                <View style={Styles.viewBoxNoPool}>
                                                    <CheckBox
                                                        onCheckColor={'white'}
                                                        onFillColor={'blue'}
                                                        boxType="square"
                                                        disabled={false}
                                                        tintColors={{ true: Colors.blue, false: Colors.white }}
                                                        value={toggleCheckBoxNoPool}
                                                        // onValueChange={(newValue) => setToggleCheckBoxNoPool(newValue)}
                                                        onValueChange={(newValue) => {
                                                            setToggleCheckBoxNoPool(newValue);
                                                            setToggleCheckBoxYesPool(false);
                                                        }} />
                                                    <TextComponent
                                                        color={Colors.white}
                                                        title={ScreenText.No}
                                                        textDecorationLine={'none'}
                                                        fontWeight="400"
                                                        fontSize={wp(3.5)}
                                                        fontFamily={Fonts.PoppinsRegular}
                                                        alignSelf='center'
                                                        textAlign='center'
                                                    />
                                                </View>
                                            </View>

                                        </View>


                                        <View>
                                            <Text style={Styles.textSelectPaymentMethod}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'>
                                                Select Payment Method
                                            </Text>
                                        </View>

                                        <View>
                                            <View style={Styles.textCashPayment}>
                                                <CheckBox
                                                    onCheckColor={'white'}
                                                    onFillColor={'blue'}
                                                    boxType="square"
                                                    disabled={false}
                                                    tintColors={{ true: Colors.blue, false: Colors.white }}
                                                    value={toggleCheckBoxCashPool}
                                                    onValueChange={(newValue) => {
                                                        setToggleCheckBoxCashPool(newValue);
                                                        setToggleCheckBoxWalletPool(false);
                                                        setToggleCheckBoxCardPool(false);
                                                    }} />
                                                {/* onValueChange={(newValue) => setToggleCheckBoxCashPool(newValue)} */}

                                                <TextComponent
                                                    color={Colors.white}
                                                    title={ScreenText.CashPayment}
                                                    textDecorationLine={'none'}
                                                    fontWeight="400"
                                                    fontSize={wp(3.5)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    alignSelf='center'
                                                    textAlign='center'
                                                />

                                            </View>
                                            <View style={Styles.viewWalletConatiner}>
                                                <CheckBox
                                                    onCheckColor={'white'}
                                                    onFillColor={'blue'}
                                                    boxType="square"
                                                    disabled={false}
                                                    tintColors={{ true: Colors.blue, false: Colors.white }}
                                                    value={toggleCheckBoxWalletPool}
                                                    onValueChange={(newValue) => {
                                                        setToggleCheckBoxWalletPool(newValue);
                                                        setToggleCheckBoxCardPool(false);
                                                        setToggleCheckBoxCashPool(false);
                                                    }} />
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={ScreenText.Wallet} // Wallet
                                                    textDecorationLine={'none'}
                                                    fontWeight="400"
                                                    fontSize={wp(3.5)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    alignSelf='center'
                                                    textAlign='center'
                                                />
                                            </View>
                                            <View style={Styles.viewWalletConatiner}>
                                                <CheckBox
                                                    onCheckColor={'white'}
                                                    onFillColor={'blue'}
                                                    boxType="square"
                                                    disabled={false}
                                                    tintColors={{ true: Colors.blue, false: Colors.white }}
                                                    value={toggleCheckBoxCardPool}
                                                    onValueChange={(newValue) => {
                                                        setToggleCheckBoxCardPool(newValue);
                                                        setToggleCheckBoxWalletPool(false);
                                                        setToggleCheckBoxCashPool(false);
                                                    }} />
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={ScreenText.Card}
                                                    textDecorationLine={'none'}
                                                    fontWeight="400"
                                                    fontSize={wp(3.5)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    alignSelf='center'
                                                    textAlign='center'
                                                />
                                            </View>
                                            <View>
                                                <ButtonComponent
                                                    isVisibleMobile={false}
                                                    isVisibleFaceBook={false}
                                                    marginVertical={hp(2)}
                                                    heightBtn={hp(7)}
                                                    widthBtn={wp(90)}
                                                    isRightArrow={false}
                                                    color={Colors.white}
                                                    title={ScreenText.Next}
                                                    onPress={onPressPoolRideRequest}
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
                                        </View>
                                    </View>
                                    : isBackground3 === true ?
                                        <View style={CommonStyle.commonFlex}>

                                            <Text style={Styles.textSelectHours}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'>
                                                Enter No. of Hours
                                            </Text>

                                            <View style={CommonStyle.commonContentAlign}>
                                                <TextInputComponent
                                                    selectionColor={Colors.white}
                                                    isVisibleDropDown={false}
                                                    isVisibleEye={false}
                                                    isVisibleEye_={false}
                                                    isVisibleMail={false}
                                                    isVisibleMailGray={false}
                                                    isVisibleLockWhite={false}
                                                    marginVertical={hp(0)}
                                                    marginHorizontal={wp(6)}
                                                    isVisibleUser={false}
                                                    isVisibleClock={true}
                                                    width={wp(90)}
                                                    borderWidth={isFocused ? ConstValue.value1 : ConstValue.value0}
                                                    borderColor={isFocused ? Colors.white : Colors.blue}
                                                    height={hp(7)}
                                                    marginTop={hp(2)}
                                                    isUserHide={false}
                                                    textfontSize={ConstValue.value15}
                                                    textfontFamily={Fonts.PoppinsRegular}
                                                    textlineHeight={ConstValue.value0}
                                                    ref={refPassword}
                                                    placeholder={ScreenText.EnterNoofHours}
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
                                                    placeholderTextColor={Colors.gray}
                                                />
                                                {!isValidName ?
                                                    <TextComponent
                                                        // marginLeft={wp(4)}
                                                        textDecorationLine={'none'}
                                                        color={Colors.red}
                                                        title={ScreenText.ValidUserNameDigit}
                                                        fontWeight="400"
                                                        fontSize={wp(4)}
                                                        marginHorizontal={wp(6)}
                                                        fontFamily={Fonts.PoppinsRegular}
                                                    />
                                                    : null}
                                            </View>

                                            <View style={Styles.viewDistance}>
                                                <Text style={Styles.textDistance}
                                                    numberOfLines={2}
                                                    ellipsizeMode='tail'>
                                                    Distance
                                                </Text>
                                            </View>

                                            <View style={CommonStyle.commonContentAlign}>
                                                <TextInputComponent
                                                    selectionColor={Colors.white}
                                                    isVisibleDropDown={false}
                                                    isVisibleEye={false}
                                                    isVisibleEye_={false}
                                                    isVisibleMail={false}
                                                    isVisibleMailGray={false}
                                                    isVisibleLockWhite={false}
                                                    marginVertical={hp(0)}
                                                    marginHorizontal={wp(6)}
                                                    isVisibleDistance={true}
                                                    isVisibleUser={false}
                                                    isVisibleClock={false}
                                                    width={wp(90)}
                                                    borderWidth={isFocusedDistance ? ConstValue.value1 : ConstValue.value0}
                                                    borderColor={isFocusedDistance ? Colors.white : Colors.blue}
                                                    height={hp(7)}
                                                    isUserHide={false}
                                                    textfontSize={ConstValue.value15}
                                                    textfontFamily={Fonts.PoppinsRegular}
                                                    textlineHeight={ConstValue.value0}
                                                    ref={refPasswordDistance}
                                                    placeholder={ScreenText.EnterDistance}
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
                                                    onFocus={handleFocusDistance}
                                                    onChangeText={handleAccountDistance}
                                                    onSubmitEditing={() => {

                                                    }}
                                                    placeholderTextColor={Colors.gray}
                                                />
                                                {!isValidDistance ?
                                                    <TextComponent
                                                        // marginLeft={wp(4)}
                                                        textDecorationLine={'none'}
                                                        color={Colors.red}
                                                        title={ScreenText.ValidUserNameDistance}
                                                        fontWeight="400"
                                                        fontSize={wp(4)}
                                                        marginHorizontal={wp(6)}
                                                        fontFamily={Fonts.PoppinsRegular}
                                                    />
                                                    : null}
                                            </View>

                                            <View style={Styles.textAreYouWantToLoyalty}>
                                                <Text style={Styles.textLoyaltyPoints}
                                                    numberOfLines={2}
                                                    ellipsizeMode='tail'>
                                                    Are you want to use Loyalty points ?
                                                </Text>
                                                <Text style={Styles.text10Off}
                                                    numberOfLines={2}
                                                    ellipsizeMode='tail'>
                                                    ( 10% Of all Payment )
                                                </Text>
                                                <View>
                                                    <View style={Styles.textYesHours}>
                                                        <CheckBox
                                                            onCheckColor={'white'}
                                                            onFillColor={'blue'}
                                                            boxType="square"
                                                            disabled={false}
                                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                                            value={toggleCheckBoxYesHour}//1801
                                                            // onValueChange={(newValue) => setToggleCheckBoxYesHour(newValue)}
                                                            onValueChange={(newValue) => {
                                                                setToggleCheckBoxYesHour(newValue);
                                                                setToggleCheckBoxNoHour(false);
                                                            }} />
                                                        <TextComponent
                                                            color={Colors.white}
                                                            title={ScreenText.Yes}
                                                            textDecorationLine={'none'}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            alignSelf='center'
                                                            textAlign='center'
                                                        />

                                                    </View>
                                                    <View style={Styles.textBoxNoHours}>
                                                        <CheckBox
                                                            onCheckColor={'white'}
                                                            onFillColor={'blue'}
                                                            boxType="square"
                                                            disabled={false}
                                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                                            value={toggleCheckBoxNoHour}
                                                            // onValueChange={(newValue) => setToggleCheckBoxNoHour(newValue)}
                                                            onValueChange={(newValue) => {
                                                                setToggleCheckBoxNoHour(newValue);
                                                                setToggleCheckBoxYesHour(false);
                                                            }} />
                                                        <TextComponent
                                                            color={Colors.white}
                                                            title={ScreenText.No}
                                                            textDecorationLine={'none'}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            alignSelf='center'
                                                            textAlign='center'
                                                        />
                                                    </View>
                                                </View>


                                                <View>
                                                    <Text style={Styles.textSelectPayment}
                                                        numberOfLines={2}
                                                        ellipsizeMode='tail'>
                                                        Select Payment Method
                                                    </Text>
                                                </View>

                                                <View>
                                                    <View style={Styles.viewCashConatiner}>
                                                        <CheckBox
                                                            onCheckColor={'white'}
                                                            onFillColor={'blue'}
                                                            boxType="square"
                                                            disabled={false}
                                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                                            value={toggleCheckBoxCashRide}
                                                            // onValueChange={(newValue) => setToggleCheckBoxCashRide(newValue)}
                                                            onValueChange={(newValue) => {
                                                                setToggleCheckBoxCashRide(newValue);
                                                                setToggleCheckBoxWalletRide(false);
                                                                setToggleCheckBoxCardRide(false);
                                                            }} />
                                                        <TextComponent
                                                            color={Colors.white}
                                                            title={ScreenText.CashPayment}
                                                            textDecorationLine={'none'}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            alignSelf='center'
                                                            textAlign='center'
                                                        />

                                                    </View>
                                                    <View style={Styles.textBoxNoHours}>
                                                        <CheckBox
                                                            onCheckColor={'white'}
                                                            onFillColor={'blue'}
                                                            boxType="square"
                                                            disabled={false}
                                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                                            value={toggleCheckBoxWalletRide}
                                                            // onValueChange={(newValue) => setToggleCheckBoxWalletRide(newValue)}
                                                            onValueChange={(newValue) => {
                                                                setToggleCheckBoxWalletRide(newValue);
                                                                setToggleCheckBoxCardRide(false);
                                                                setToggleCheckBoxCashRide(false);
                                                            }} />
                                                        <TextComponent
                                                            color={Colors.white}
                                                            title={ScreenText.Wallet}
                                                            textDecorationLine={'none'}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            alignSelf='center'
                                                            textAlign='center'
                                                        />
                                                    </View>
                                                    <View style={Styles.textBoxNoHours}>
                                                        <CheckBox
                                                            onCheckColor={'white'}
                                                            onFillColor={'blue'}
                                                            boxType="square"
                                                            disabled={false}
                                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                                            value={toggleCheckBoxCardRide}
                                                            onValueChange={(newValue) => {
                                                                setToggleCheckBoxCardRide(newValue);
                                                                setToggleCheckBoxWalletRide(false);
                                                                setToggleCheckBoxCashRide(false);
                                                            }} />
                                                        {/* onValueChange={(newValue) => setToggleCheckBoxCardRide(newValue)} */}
                                                        <TextComponent
                                                            color={Colors.white}
                                                            title={ScreenText.Card}
                                                            textDecorationLine={'none'}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            alignSelf='center'
                                                            textAlign='center'
                                                        />
                                                    </View>
                                                    <View>
                                                        <ButtonComponent
                                                            isVisibleMobile={false}
                                                            isVisibleFaceBook={false}
                                                            marginVertical={hp(2)}
                                                            heightBtn={hp(7)}
                                                            widthBtn={wp(90)}
                                                            isRightArrow={false}
                                                            color={Colors.white}
                                                            title={ScreenText.Next}
                                                            onPress={onPressHourlyRideRequest}
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
                                                </View>


                                            </View>
                                        </View>

                                        : isBackground4 === true ?

                                            <View style={Styles.viewPonits}>
                                                <View>
                                                    <Text style={Styles.textSelectPayment}
                                                        numberOfLines={2}
                                                        ellipsizeMode='tail'>
                                                        Are you want to use Loyalty points ?
                                                    </Text>
                                                    <Text style={Styles.textAllPayment}
                                                        numberOfLines={2}
                                                        ellipsizeMode='tail'>
                                                        ( 10% Of all Payment )
                                                    </Text>
                                                    <View>
                                                        <View style={Styles.viewYesBid}>
                                                            <CheckBox
                                                                onCheckColor={'white'}
                                                                onFillColor={'blue'}
                                                                boxType="square"
                                                                disabled={false}
                                                                tintColors={{ true: Colors.blue, false: Colors.white }}
                                                                value={toggleCheckBoxYesBid}
                                                                onValueChange={(newValue) => {
                                                                    setToggleCheckBoxYesBid(newValue);
                                                                    setToggleCheckBoxNoBid(false);
                                                                }} />
                                                            <TextComponent
                                                                color={Colors.white}
                                                                title={ScreenText.Yes}
                                                                textDecorationLine={'none'}
                                                                fontWeight="400"
                                                                fontSize={wp(3.5)}
                                                                fontFamily={Fonts.PoppinsRegular}
                                                                alignSelf='center'
                                                                textAlign='center'
                                                            />

                                                        </View>
                                                        <View style={Styles.viewNoBid}>
                                                            <CheckBox
                                                                onCheckColor={'white'}
                                                                onFillColor={'blue'}
                                                                boxType="square"
                                                                disabled={false}
                                                                tintColors={{ true: Colors.blue, false: Colors.white }}
                                                                value={toggleCheckBoxNoBid}
                                                                onValueChange={(newValue) => {
                                                                    setToggleCheckBoxNoBid(newValue);
                                                                    setToggleCheckBoxYesBid(false);
                                                                }} />
                                                            <TextComponent
                                                                color={Colors.white}
                                                                title={ScreenText.No}
                                                                textDecorationLine={'none'}
                                                                fontWeight="400"
                                                                fontSize={wp(3.5)}
                                                                fontFamily={Fonts.PoppinsRegular}
                                                                alignSelf='center'
                                                                textAlign='center'
                                                            />
                                                        </View>
                                                    </View>

                                                </View>


                                                <View>
                                                    <Text style={Styles.textSelectPayment}
                                                        numberOfLines={2}
                                                        ellipsizeMode='tail'>
                                                        Select Payment Method
                                                    </Text>
                                                </View>

                                                <View>
                                                    <View style={Styles.viewCashBid}>
                                                        <CheckBox
                                                            onCheckColor={'white'}
                                                            onFillColor={'blue'}
                                                            boxType="square"
                                                            disabled={false}
                                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                                            value={toggleCheckBoxCashBid}
                                                            onValueChange={(newValue) => {  //1802
                                                                setToggleCheckBoxCashBid(newValue);
                                                                setToggleCheckBoxCardBid(false);
                                                                setToggleCheckBoxWalletBid(false);
                                                            }} />
                                                        <TextComponent
                                                            color={Colors.white}
                                                            title={ScreenText.CashPayment}
                                                            textDecorationLine={'none'}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            alignSelf='center'
                                                            textAlign='center'
                                                        />

                                                    </View>
                                                    <View style={Styles.viewNoBid}>
                                                        <CheckBox
                                                            onCheckColor={'white'}
                                                            onFillColor={'blue'}
                                                            boxType="square"
                                                            disabled={false}
                                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                                            value={toggleCheckBoxWalletBid}
                                                            // onValueChange={(newValue) => setToggleCheckBoxWalletBid(newValue)}
                                                            onValueChange={(newValue) => {  //1802
                                                                setToggleCheckBoxWalletBid(newValue);
                                                                setToggleCheckBoxCardBid(false);
                                                                setToggleCheckBoxCashBid(false);
                                                            }} />
                                                        <TextComponent
                                                            color={Colors.white}
                                                            title={ScreenText.Wallet}
                                                            textDecorationLine={'none'}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            alignSelf='center'
                                                            textAlign='center'
                                                        />
                                                    </View>
                                                    <View style={Styles.viewNoBid}>
                                                        <CheckBox
                                                            onCheckColor={'white'}
                                                            onFillColor={'blue'}
                                                            boxType="square"
                                                            disabled={false}
                                                            tintColors={{ true: Colors.blue, false: Colors.white }}
                                                            value={toggleCheckBoxCardBid}
                                                            //  onValueChange={(newValue) => setToggleCheckBoxCardBid(newValue)}
                                                            onValueChange={(newValue) => {  //1802
                                                                setToggleCheckBoxCardBid(newValue);
                                                                setToggleCheckBoxWalletBid(false);
                                                                setToggleCheckBoxCashBid(false);
                                                            }} />
                                                        <TextComponent
                                                            color={Colors.white}
                                                            title={ScreenText.Card}
                                                            textDecorationLine={'none'}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            alignSelf='center'
                                                            textAlign='center'
                                                        />
                                                    </View>
                                                    <View>
                                                        <ButtonComponent
                                                            isVisibleMobile={false}
                                                            isVisibleFaceBook={false}
                                                            marginVertical={hp(2)} // BiddingAmount
                                                            heightBtn={hp(7)} // BiddingAmountBookNow
                                                            onPress={onPressBiddingRequest}
                                                            widthBtn={wp(90)}
                                                            isRightArrow={false}
                                                            color={Colors.white}
                                                            title={ScreenText.Next}
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
                                                </View>
                                            </View>

                                            : null}

                        </View>
                    }
                </ScrollView>

            </View >

        </SafeAreaView >
    )
}

export default BookingScreen;