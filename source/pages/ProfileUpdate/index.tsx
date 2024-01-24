import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button/index';
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import TextInputComponent from '../../components/TextInput/index';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils, { validateIsEmail, validateIsPhoneNumber } from '../../utils/commonfunction';
import { ConstValue, ScreenText } from '../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}

const ProfileUpdateScreen = (props: Props) => {

    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedNumber, setIsFocusedNumber] = useState(false);

    const [isFocusedMail, setIsFocusedMail] = useState(false);

    // TODO :
    const refUserName = useRef<any>(null);
    const refUserMobile = useRef<any>(null);
    const refUserEmail = useRef<any>(null);


    const refMail = useRef<any>(null);

    const [name, setName] = useState('');

    const [nameMail, setNameMail] = useState('');

    const [isFocusedName, setIsFocusedName] = useState(false);

    const [isFocusedNameMail, setIsFocusedNameMail] = useState(false);

    const [isValidName, setValidName] = useState(true);
    const [isValidNameMail, setValidNameMail] = useState(true);

    const [selectedImage, setSelectedImage] = useState(undefined);

    const [selectedImagePick, setSelectedImagePick] = useState(false);
    const [selectedIMG, setSelectedSetIMG] = useState<any>(null);

    const [isValidEmail, setValidEmail] = useState(true);

    const [isValidNumber, setValidNumber] = useState(true);

    const [selected, setSelected] = useState('Select');
    const [visible, setVisible] = useState(false);

    // const Images1 = {
    //     flagIcon: Images.flagIcon,
    //     appIcon: Images.appIcon,
    //     downArrow: Images.flagIcon,
    //     // Add more options as needed
    // };

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [number, setNumber] = useState('')

    useEffect(() => {
        setName("aaa88888");
        console.log("setName====>", name);
    }, []);

    let imagePATH;

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
        { label: '+91', value: '1', img: Images1.flagIcon },
        // { label: '+92', value: '2', img: Images1.appIcon },
        { label: '+93', value: '3', img: Images1.flag19 },

        // Add more options as needed
        { label: '+1', value: '4', img: Images1.flag1 },
        { label: '+20', value: '5', img: Images1.flag2 },
        { label: '+30', value: '6', img: Images1.flag3 },
        { label: '+32', value: '7', img: Images1.flag4 },
        { label: '+33', value: '8', img: Images1.flag5 },
        { label: '+36', value: '9', img: Images1.flag6 },
        { label: '+39', value: '10', img: Images1.flag7 },
        { label: '+43', value: '11', img: Images1.flag8 },
        { label: '+44', value: '12', img: Images1.flag9 },
        { label: '+45', value: '13', img: Images1.flag10 },
        { label: '+49', value: '14', img: Images1.flag11 },
        { label: '+53', value: '15', img: Images1.flag12 },
        { label: '+54', value: '16', img: Images1.flag13 },
        { label: '+56', value: '17', img: Images1.flag14 },
        { label: '+57', value: '18', img: Images1.flag15 },
        { label: '+61', value: '19', img: Images1.flag16 },
        { label: '+62', value: '20', img: Images1.flag17 },
        { label: '+86', value: '21', img: Images1.flag18 },
        { label: '+95', value: '22', img: Images1.flag20 },
        { label: '+98', value: '23', img: Images1.flag21 },
        { label: '+213', value: '24', img: Images1.flag22 },
        { label: '+220', value: '25', img: Images1.flag23 },
        { label: '+224', value: '26', img: Images1.flag24 },
        { label: '+225', value: '27', img: Images1.flag25 },
        { label: '+226', value: '28', img: Images1.flag26 },
        { label: '+233', value: '29', img: Images1.flag27 },
        { label: '+235', value: '30', img: Images1.flag28 },
        { label: '+236', value: '31', img: Images1.flag29 },
        { label: '+237', value: '32', img: Images1.flag30 },
        { label: '+238', value: '33', img: Images1.flag31 },
        { label: '+240', value: '34', img: Images1.flag32 },
        { label: '+241', value: '35', img: Images1.flag33 },
        { label: '+243', value: '36', img: Images1.flag34 },
        { label: '+244', value: '37', img: Images1.flag35 },
        { label: '+245', value: '38', img: Images1.flag36 },
        { label: '+246', value: '39', img: Images1.flag37 },
        { label: '+247', value: '40', img: Images1.flag38 },
        { label: '+251', value: '41', img: Images1.flag39 },
        { label: '+253', value: '42', img: Images1.flag40 },
        { label: '+257', value: '43', img: Images1.flag41 },
        { label: '+267', value: '44', img: Images1.flag42 },
        { label: '+269', value: '45', img: Images1.flag43 },
        { label: '+291', value: '46', img: Images1.flag44 },
        { label: '+297', value: '47', img: Images1.flag45 },
        { label: '+298', value: '48', img: Images1.flag46 },
        { label: '+299', value: '49', img: Images1.flag47 },
        { label: '+350', value: '50', img: Images1.flag48 },
        { label: '+353', value: '51', img: Images1.flag49 },
        { label: '+354', value: '52', img: Images1.flag50 },
        { label: '+355', value: '53', img: Images1.flag50 },
        { label: '+357', value: '54', img: Images1.flag52 },
        { label: '+358', value: '55', img: Images1.flag53 },
        { label: '+359', value: '56', img: Images1.flag54 },
        { label: '+372', value: '57', img: Images1.flag55 },
        { label: '+374', value: '58', img: Images1.flag56 },
        { label: '+375', value: '59', img: Images1.flag57 },
        { label: '+376', value: '60', img: Images1.flag58 },
        { label: '+385', value: '61', img: Images1.flag59 },
        { label: '+387', value: '62', img: Images1.flag60 },
        { label: '+420', value: '63', img: Images1.flag61 },
        { label: '+500', value: '64', img: Images1.flag62 },
        { label: '+501', value: '65', img: Images1.flag63 },
        { label: '+502', value: '66', img: Images1.flag64 },
        { label: '+503', value: '67', img: Images1.flag65 },
        { label: '+504', value: '68', img: Images1.flag66 },
        { label: '+509', value: '69', img: Images1.flag67 },
        { label: '+590', value: '70', img: Images1.flag68 },
        { label: '+591', value: '71', img: Images1.flag69 },
        { label: '+592', value: '72', img: Images1.flag70 },
        { label: '+593', value: '73', img: Images1.flag71 },
        { label: '+594', value: '74', img: Images1.flag72 },
        { label: '+673', value: '75', img: Images1.flag73 },
        { label: '+679', value: '76', img: Images1.flag74 },
        { label: '+682', value: '77', img: Images1.flag75 },
        { label: '+689', value: '78', img: Images1.flag76 },
        { label: '+852', value: '79', img: Images1.flag77 },
        { label: '+855', value: '80', img: Images1.flag78 },
        { label: '+880', value: '81', img: Images1.flag79 },
        { label: '+964', value: '82', img: Images1.flag80 },
        { label: '+972', value: '83', img: Images1.flag81 },
        { label: '+973', value: '84', img: Images1.flag82 },
        { label: '+975', value: '85', img: Images1.flag83 },
        { label: '+994', value: '86', img: Images1.flag84 },
        { label: '+995', value: '87', img: Images1.flag85 },
        { label: '+1246', value: '88', img: Images1.flag86 },
        { label: '+1264', value: '89', img: Images1.flag87 },
        { label: '+1268', value: '90', img: Images1.flag88 },
        { label: '+1284', value: '91', img: Images1.flag89 },
        { label: '+1345', value: '92', img: Images1.flag90 },
        { label: '+1441', value: '93', img: Images1.flag91 },
        { label: '+1473', value: '94', img: Images1.flag92 },
        { label: '+1671', value: '95', img: Images1.flag93 },
        { label: '+1684', value: '96', img: Images1.flag94 },
        { label: '+1767', value: '97', img: Images1.flag95 },
        { label: '+1849', value: '98', img: Images1.flag96 },
        { label: '+67264', value: '99', img: Images1.flag97 },
        { label: '+506', value: '100', img: Images1.flag98 }
        // Add more options as needed

    ];

    const toggleDropdown = () => {
        setVisible((prevVisible) => !prevVisible);
    };

    const onItemPress = (item) => {
        setSelected(item);
        setVisible(false);
        setSelectedImage(item.img || Images.downArrow);
        // Handle selection logic here
    };

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

    const handleAccountNumber = (useremail: any) => {
        setNumber(useremail);
        if (validateIsPhoneNumber(useremail) === false) {
            setIsFocusedNumber(true)
            setValidNumber(false)
        } else {
            setValidNumber(true)
            setIsFocusedNumber(false)
        }
    }

    // const handleAccountEmail = (useremail: any) => {
    //     setEmail(useremail);
    //     if (validateIsPhoneNumber(useremail) === false) {
    //         setIsFocused(true)
    //         setValidEmail(false)
    //     } else {
    //         setValidEmail(true)
    //         setIsFocused(false)
    //     }
    // }

    const renderDropdown = () => (
        <Modal
            style={Styles.modalStyle}
            visible={visible}
            transparent animationType="none">
            {/* Your dropdown content goes here */}
            <View style={[Styles.dropdown]}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </Modal>
    );

    const handleFocusMail = () => { // email
        setIsFocusedMail(true)
    }

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleFocusNumber = () => {
        setIsFocusedNumber(true)
    }


    const handleFocusCode = () => {
        setIsFocused(true)
    }

    const handleAccountNameMail = (useremail: any) => {
        setNameMail(useremail);
        if (validateIsEmail(useremail) === false) {
            setIsFocusedMail(true)
            setValidNameMail(false)
        } else {
            setValidNameMail(true)
            setIsFocusedMail(false)
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

    const onPressUpdate = () => {
        axiosPostProfileUpdate();

        // if (name === '') {
        //     Toast.show("Name Field Is Required", Toast.SHORT);
        // } else if (name.length < 3) {
        //     Toast.show("Please Enter Must 3 Character Name", Toast.SHORT);
        // } else if (number === '') {
        //     Toast.show("Mobile Number Field Is Required", Toast.SHORT);
        // } else if (number.length < 10) {
        //     Toast.show("Please Enter Must 10 Digit Mobile Number", Toast.SHORT);
        // } else if (selected === 'Select') {
        //     Toast.show("Please Select A Valid Country Code", Toast.SHORT);
        // } else if (nameMail === '') {
        //     Toast.show("Email Field Is Required", Toast.SHORT);
        // } else if (nameMail !== '' && validateIsEmail(nameMail) === false) {
        //     Toast.show("Please Enter Valid Email Address", Toast.SHORT);
        // } else {
        //     // Toast.show("Done", Toast.SHORT);
        //     // props.navigation.goBack();
        //     axiosPostProfileUpdate();
        // }
    }

    const axiosPostProfileUpdate = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostProfileUpdateSubmit();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostProfileUpdateSubmit = async () => {
        try {
            const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            if (storedLinkedId !== null) {
                const userId = JSON.parse(storedLinkedId);
                const url = `https://rideshareandcourier.graphiglow.in/api/updateProfile/updateProfile/${userId}`;

                const data = new FormData();
                data.append('username', name || '');
                data.append('email', nameMail || '');
                data.append('mobilenumber', selected.label + number || '');

                // Append the image file to the FormData
                if (selectedIMG.uri) {
                    data.append('profile_image', {
                        uri: selectedIMG.uri,
                        type: 'image/jpeg', // Adjust the content type based on your image type
                        name: 'profile_image.jpg', // Adjust the file name as needed
                    });
                }

                console.log("axiosPostProfileUpdateSubmit==>", JSON.stringify(data, null, 2));

                await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                    },
                })
                    .then(response => {
                        console.log("response==>", JSON.stringify(response, null, 2));
                        if (response.status === 200 && response?.data?.message === 'Profile updated successfully') {
                            Toast.show('Success! Your profile has been updated successfully', Toast.SHORT);
                            props.navigation.goBack();
                        } else {
                            Toast.show('Profile Credentials Invalid!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        Toast.show('Profile Credentials Invalid!', Toast.SHORT);
                    });
            } else {
                // Handle the case where storedLinkedId is null
            }
        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    };



    const onPressOpenStorage = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: wp(25),
                height: wp(25),
                cropping: true,
            });
            // imagePATH = image.path;
            console.log("imagePATH===>", image.path);

            // Store As Local Stoarge
            // storeLastImagePath(imagePATH);

            // Update state variables with selected image information
            setSelectedImagePick(true);
            setSelectedSetIMG({ uri: image.path });
        } catch (error) {
            console.log('Image picker error:', error);
        }
    };

    const storeLastImagePath = async (imagePATH: any) => {
        try {
            await AsyncStorage.setItem('img_path', JSON.stringify(imagePATH));
            console.log('img_path===>', JSON.stringify(imagePATH));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error img_path :', error);
        }
    }

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <View style={Styles.container}>
                <HeaderComponent
                    margin={wp(3)}
                    backgroundColorOpacity={Colors.circleGray}
                    borderRadiusOpacity={wp(10)}
                    paddingOpacity={wp(2)}
                    textAlign={"left"}
                    source={Images.arrowRight}
                    width={wp(7)}
                    height={wp(7)}
                    color={Colors.white}
                    fontFamily={Fonts.InterRegular}
                    fontWeight="700"
                    marginHorizontal={wp(5)}
                    title={"Edit Profile"}
                    marginTop={wp(2)}
                    fontSize={wp(4)}
                    onPress={() => props.navigation.goBack()}
                />
                <View style={CommonStyle.commonFlex}>
                    <View>
                        <TouchableOpacity activeOpacity={0.1} onPress={onPressOpenStorage}>
                            {selectedImagePick ? (
                                <Image style={Styles.imageUser}
                                    resizeMode="contain" source={selectedIMG} />
                            ) : (
                                <Image style={Styles.imageUser}
                                    resizeMode="contain" source={Images.userTabIcon} />
                            )}
                        </TouchableOpacity>

                        <TextComponent
                            color={Colors.grayFull}
                            title={ScreenText.UploadProfilePhoto}
                            textDecorationLine={'none'}
                            fontWeight="400"
                            fontSize={wp(3)}
                            marginLeft={wp(5)}
                            fontFamily={Fonts.PoppinsRegular}
                            marginTop={wp(1)}
                            textAlign='center'
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <TextComponent
                            color={Colors.gray}
                            title={ScreenText.UploadProfilePhoto}
                            textDecorationLine={'none'}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            marginVertical={wp(3)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='center'
                        />
                        <TextInputComponent
                            selectionColor={Colors.white}
                            isVisibleDropDown={false}
                            isVisibleEye={false}
                            isVisibleEye_={false}
                            isVisibleMail={false}
                            isVisibleMailGray={false}
                            isVisibleLockWhite={false}
                            isVisibleUser={true}
                            width={wp(90)}
                            borderWidth={isFocused ? ConstValue.value1 : ConstValue.value0}
                            borderColor={isFocused ? Colors.white : Colors.blue}
                            height={hp(7)}
                            marginHorizontal={wp(5)}
                            marginVertical={wp(1)}
                            isUserHide={false}
                            textfontSize={ConstValue.value15}
                            textfontFamily={Fonts.PoppinsRegular}
                            textlineHeight={ConstValue.value0}
                            ref={refUserName}
                            placeholder={ScreenText.EnterUserName}
                            editable={true}
                            multiline={false}
                            secureTextEntry={false}
                            isPadding={true}
                            keyboardType='default'
                            textAlign='left'
                            numberOfLines={null}
                            maxLength={null}
                            color={Colors.white}
                            backgroundColor={Colors.grayDark}
                            borderRadius={wp(2)}
                            onFocus={handleFocus}
                            onChangeText={handleAccountName}
                            onSubmitEditing={() => {
                                refUserMobile?.current?.focus();
                            }}
                            placeholderTextColor={Colors.white}
                        />
                        {!isValidName ?
                            <TextComponent
                                textDecorationLine={'none'}
                                color={Colors.red}
                                title={ScreenText.ValidUserName}
                                fontWeight="400"
                                fontSize={wp(4)}
                                marginLeft={wp(5)}
                                fontFamily={Fonts.PoppinsRegular}
                            />
                            : null}

                        <TextInputComponent
                            selectionColor={Colors.white}
                            isVisibleDropDown={true}
                            isVisibleEye={false}
                            isArrow={false}
                            isArrowLeft={true}
                            isVisibleEye_={false}
                            selectedImage={selectedImage || Images1.downArrow}
                            selected={(!!selected && selected.label) || 'Select'}
                            toggleDropdown={toggleDropdown}
                            renderDropdown={renderDropdown}
                            marginVertical={hp(2)}
                            marginHorizontal={wp(4)}
                            width={wp(90)}
                            borderWidth={isFocusedNumber ? ConstValue.value1 : ConstValue.value0}
                            borderColor={isFocusedNumber ? Colors.white : Colors.blue}
                            height={hp(7)}
                            isUserHide={false}
                            textfontSize={ConstValue.value15}
                            textfontFamily={Fonts.PoppinsRegular}
                            textlineHeight={ConstValue.value0}
                            ref={refUserMobile}
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
                            onFocus={handleFocusNumber}
                            onChangeText={handleAccountNumber}
                            onSubmitEditing={() => {
                                refUserEmail?.current?.focus();
                            }}
                            placeholderTextColor={Colors.white}
                        />
                        {!isValidNumber ?
                            <TextComponent
                                textDecorationLine={'none'}
                                color={Colors.red}
                                title={ScreenText.ValidMobileNumber}
                                fontWeight="400"
                                marginLeft={wp(5)}
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                            />
                            : null}


                        <TextInputComponent
                            selectionColor={Colors.white}
                            isVisibleDropDown={false}
                            isVisibleEye={false}
                            isVisibleEye_={false}
                            isVisibleMail={false}
                            isVisibleMailGray={true}
                            isVisibleLockWhite={false} // 00
                            isVisibleUser={false}
                            width={wp(90)}
                            borderWidth={isFocusedMail ? ConstValue.value1 : ConstValue.value0}
                            borderColor={isFocusedMail ? Colors.white : Colors.blue}
                            height={hp(7)}
                            marginHorizontal={wp(5)}
                            marginVertical={wp(2)}
                            isUserHide={false}
                            textfontSize={ConstValue.value15}
                            textfontFamily={Fonts.PoppinsRegular}
                            textlineHeight={ConstValue.value0}
                            ref={refUserEmail}
                            placeholder={ScreenText.EnterEmail}
                            editable={true}
                            multiline={false}
                            secureTextEntry={false}
                            isPadding={true}
                            keyboardType='default'
                            textAlign='left'
                            numberOfLines={null}
                            maxLength={null}
                            color={Colors.white}
                            backgroundColor={Colors.grayDark}
                            borderRadius={wp(2)}
                            onFocus={handleFocusMail}
                            onChangeText={handleAccountNameMail}
                            onSubmitEditing={() => {

                            }}
                            placeholderTextColor={Colors.white}
                        />
                        {!isValidNameMail ?
                            <TextComponent
                                textDecorationLine={'none'}
                                color={Colors.red}
                                title={ScreenText.ValidEmail}
                                fontWeight="400"
                                fontSize={wp(4)}
                                marginLeft={wp(5)}
                                fontFamily={Fonts.PoppinsRegular}
                            />
                            : null}
                    </View>
                    <View style={{ flex: 1, marginTop: wp(80) }}>
                        <ButtonComponent
                            isVisibleMobile={false}
                            isVisibleFaceBook={false}
                            marginVertical={hp(2)}
                            heightBtn={hp(7)}
                            widthBtn={wp(90)}
                            isRightArrow={false}
                            color={Colors.white}
                            title={ScreenText.Update}
                            onPress={onPressUpdate}
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

                </View>
                <View style={Styles.viewButtonUpdate}>

                </View>

            </View>
        </SafeAreaView >
    )
}

export default ProfileUpdateScreen;