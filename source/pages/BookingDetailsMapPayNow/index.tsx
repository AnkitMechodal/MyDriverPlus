import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button';
import CustomSelectOrder from '../../components/CustomSelectOrder';
import HeaderComponent from '../../components/Header/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import TextInputComponent from '../../components/TextInput';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils, { validateIsEmail, validateIsPhoneNumber } from "../../utils/commonfunction";
import { API, ConstValue, ScreenText } from '../../utils/index';
import Styles from './style';


type Props = {
    navigation: any // props: Props
}

const BookingDetailsMapPayNow = ({ route, navigation }) => {

    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);


    const [isFocused, setIsFocused] = useState(true);
    const [isValidName, setValidName] = useState(true);
    const [name, setName] = useState('');

    const [isFocusedName, setIsFocusedName] = useState(false);


    const [isFocusedPasswordDesc, setIsFocusedPasswordDesc] = useState(false);
    const [descRef, setDescRef] = useState('')

    const [selectedOption, setSelectedOption] = useState<any>('Select Order type');
    const [modalVisible, setmodalVisible] = useState(false);


    const refName = useRef<any>(null);
    const refMobile = useRef<any>(null);
    const refEmail = useRef<any>(null);
    const refDispute = useRef<any>(null);
    const refDesc = useRef<any>(null);
    const refPassword = useRef<any>(null);
    const refSubject = useRef<any>(null);


    const [isValidEmail, setValidEmail] = useState(true);

    const [isFocusedPasswordRef, setIsFocusedPasswordRef] = useState(false);
    const [email, setEmail] = useState('');
    const [passRef, setPassRef] = useState('');

    const [isValidRefCode, setValidRefCode] = useState(true);
    const [isValidDescCode, setValidDescCode] = useState(true);


    const [isGETPERCENTAGE, setGETPERCENTAGE] = useState("0");
    const [isCHARGE, setCHARGE] = useState("20");


    const [selectedImage, setSelectedImage] = useState(undefined);

    const [isFocusedMobile, setIsFocusedMobile] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);


    const [selected, setSelected] = useState('Select');
    const [visible, setVisible] = useState(false);
    const [num, setNumber] = useState('');
    const [isValidNumber, setValidNumber] = useState(true);


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

    let USER_DRIVEID;


    let USER_RIDE_CHARGE;
    let USER_CON_CHARGE;
    let USER_DISCOUNT;
    let USER_FARE_VALUE;

    let USER_TOTAL;
    let _DISCOUNT;


    let USER_BOOKINGSTATUS;
    let USER_CANCELLATION;   // cancellation 


    let PER;
    let CAN;


    const [isDRIVERIDECHARGE, setDRIVERRIDECHARGE] = useState("");
    const [isDRIVERCONCHARGE, setDRIVERCONCHARGE] = useState("");
    const [isDRIVERDISCOUNT, setDRIVERDISCOUNT] = useState("");


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

    const [isModalVisible, setModalVisible] = useState(true);


    const [isModalHELP, setModalHELP] = useState(false);

    const [isModalRISE, setModalRISE] = useState(false);
    const [isModalPAY, setModalPAY] = useState(false);
    const [isModalOTHER, setModalOTHER] = useState(false);


    const dataSeat = [
        { labelSeat: 'Type1', value: '1' },
        { labelSeat: 'Type2', value: '2' },
        { labelSeat: 'Type3', value: '3' },
        { labelSeat: 'Type4', value: '4' },
        { labelSeat: 'Type5', value: '5' },
        // Add more options as needed
    ];



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



    useEffect(() => {
        const fetchData = async () => {
            try {
                // RIDER_MAP_ID
                console.log("RIDER_MAP_ID-----===>", route.params.itemBokingDetailsMapId);

                // Duration & Distnace
                console.log("ITEM1----===>", route?.params?.itemBokingDetailsMapDistance);
                console.log("ITEM2----===>", route?.params?.itemBokingDetailsMapDuration);

                console.log("ITEM3---===>", route?.params?.itemMapPickStation);
                console.log("ITEM4----===>", route?.params?.itemMapDropStation);
                console.log("ITEM5---===>", route?.params?.itemMapRideCharge);
                console.log("ITEM6----===>", route?.params?.itemMapRideFeesCon);
                console.log("ITEM7-----===>", route?.params?.itemMapRideWattingCharges);
                console.log("ITEM8-----===>", route?.params?.itemMapRideDiscount);
                console.log("ITEM9----===>", route?.params?.itemMapRideTotalAmount);

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

        // Set interval to refresh every 10 seconds
        const intervalId = setInterval(fetchData, 10 * 1000);

        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, [
        route.params.itemBokingDetailsMapId,
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

    const toggleDropdown = () => {
        setVisible((prevVisible) => !prevVisible);
    };


    const handleFocusPassDesc = () => {
        setIsFocusedPasswordDesc(true)
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

    const handleFocusEmail = () => {
        setIsFocusedEmail(true)
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

    const handleFocusMobile = () => {
        setIsFocusedMobile(true)
    }

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



    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        // Perform any other actions with the selected option
    };

    const onRequestClose = () => {
        setmodalVisible(true);
        // console.log('Modal Closed');
        // Perform any other actions when the modal is closed
    };


    const onItemPress = (item) => {
        setSelected(item);
        setVisible(false);
        setSelectedImage(item.img || Images.downArrow);
        // Handle selection logic here
    };

    const handleFocus = () => {
        setIsFocused(true)
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

                        // _id99
                        Driver_id = response?.data?.matchingUsers[0]?._id;
                        // Store for star : todo
                        StoredDriverID(Driver_id);

                        console.log("Driver_id==>",
                            JSON.stringify(Driver_id, null, 2));

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
        // const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';
        const url = `${API.BASE_URL}/rideDetail/rideDetail`;

        // Prepare data in JSON format
        const data = {
            id: route.params.itemBokingDetailsMapId // route.params.itemBokingDetailsMapId
            // "id": "65a21bb96d2110528ff2966f" // test
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


                    // TODO :
                    USER_DRIVEID = response?.data?.matchingVehicle?.DriverID;
                    StoreDriverID(USER_DRIVEID);
                    // TODO :


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

                    // GET TOTAL :
                    USER_TOTAL = parseInt(USER_RIDE_CHARGE) + parseInt(USER_CON_CHARGE) +
                        parseInt(USER_WATTING_CHARGES);

                    console.log("USER_TOTAL1==>", parseInt(USER_RIDE_CHARGE));
                    console.log("USER_TOTAL2==>", parseInt(USER_CON_CHARGE));
                    console.log("USER_TOTAL3==>", parseInt(USER_WATTING_CHARGES));

                    console.log("USER_TOTAL==>", USER_TOTAL);

                    _DISCOUNT = USER_TOTAL_AMOUNT - USER_DISCOUNT;
                    setTOTAL_AMOUNT(_DISCOUNT);

                    // USER_DISCOUNT - NO USE
                    // setTOTAL_AMOUNT(USER_TOTAL); ///----

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

    const StoreDriverID = async (USER_DRIVER_ID: any) => {
        try {
            await AsyncStorage.setItem('store_driver_id', JSON.stringify(USER_DRIVER_ID));
            console.log('store_driver_id===>', JSON.parse(USER_DRIVER_ID));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_driver_id :', error);
        }
    }


    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <View style={Styles.container}>
                <Modal
                    isVisible={isModalVisible}
                    onBackButtonPress={() => navigation.goBack()}
                    onBackdropPress={() => navigation.goBack()}
                    swipeDirection={[]} // Disables swiping
                    style={Styles.viewModalMargin}>

                    <ScrollView
                        bounces={true}
                        overScrollMode="always">
                        <View style={CommonStyle.commonFlex}>
                            <View style={Styles.viewHeader}>
                                <HeaderComponent
                                    margin={wp(3)}
                                    transform={[{ rotate: '180deg' }]}
                                    backgroundColorOpacity={Colors.circleGray}
                                    borderRadiusOpacity={wp(10)}
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

                                <TouchableOpacity onPress={() =>
                                    // navigation.navigate("ModalHelp")
                                    setModalHELP(true)
                                }>

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
                                {/* <View>
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(1)}
                                        heightBtn={hp(7)}
                                        widthBtn={wp(90)}
                                        isRightArrow={false}
                                        onPress={() =>
                                            navigation.navigate('PaymentComplete', {
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
                                </View> */}

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

            </View>
        </SafeAreaView>
    )
}

export default BookingDetailsMapPayNow;
