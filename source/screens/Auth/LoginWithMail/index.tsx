import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import React, { useRef, useState } from 'react';
import {
    FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity,
    View
} from 'react-native';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../../components/Button';
import HeaderComponent from '../../../components/Header';
import StatusBarComponent from '../../../components/StatusBar';
import TextComponent from '../../../components/Text';
import TextInputComponent from '../../../components/TextInput';
import { Colors, Fonts, Images } from '../../../themes/index';
import { useTheme } from '../../../utils/ThemeContext';
import CommonStyle from '../../../utils/commonStyle';
import NetworkUtils, { validateIsEmail } from '../../../utils/commonfunction';
import { ConstValue, ScreenText } from '../../../utils/index';
import Styles from './style';


type Props = {
    navigation: any
}


const LoginWithMailScreen = (props: Props) => {

    const navigation = useNavigation();

    // const isDarkMode = useisDarkMode();

    const { isDarkMode, toggleTheme } = useTheme();


    let user_register_id;

    const Images1 = {
        flagIcon: Images.flagIcon,
        appIcon: Images.appIcon,
        downArrow: Images.flagIcon,
        // Add More Images
    };
    const data = [
        { label: '+91', value: '1', img: Images1.flagIcon },
        { label: '+92', value: '2', img: Images1.appIcon },
        { label: '+93', value: '3', img: Images1.flagIcon },
        // Add more options as needed
    ];

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);
    const [selectedImage, setSelectedImage] = useState(undefined);

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const refMobile = useRef<any>(null);
    const refPassword = useRef<any>(null);

    const [toggleCheckBox, setToggleCheckBox] = useState(true)

    const [isValidEmail, setValidEmail] = useState(true);
    const [isValidPassword, setValidPassword] = useState(true);

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')


    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);


    const [isSecure, setSecure] = useState(true);

    const [isShow, setShow] = useState(false);
    const [isHide, setHide] = useState(false);


    const toggleDropdown = () => {
        setVisible((prevVisible) => !prevVisible);
    };

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleFocusPass = () => {
        setIsFocusedPassword(true)
    }

    const handleHideShow1 = () => {
        setSecure(false)
        setHide(true)
        setShow(true)
    }

    const handleHideShow2 = () => {
        setSecure(true)
        setHide(false)
        setShow(false)
    }

    const handleAccountPassword = (userpass: any) => {
        setPass(userpass);
        if (userpass.length < 6) {
            setIsFocusedPassword(true);
            setValidPassword(false)
        } else {
            setValidPassword(true);
            setIsFocusedPassword(false)
        }
    }

    const handleAccountEmail = (useremail: any) => {
        setEmail(useremail);
        if (validateIsEmail(useremail) === false) {
            setIsFocused(true)
            setValidEmail(false)
        } else {
            setValidEmail(true)
            setIsFocused(false)
        }
    }

    const onItemPress = (item) => {
        setSelected(item);
        setVisible(false);
        setSelectedImage(item.img || Images.downArrow);
        // Handle selection logic here
        // To Handle Data Here...
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


    const axiosPostRequestLoginMailOff = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/login/login';

        // Prepare data in JSON format
        const data = {
            email: email,
            password: pass
        };

        console.log("data", data);

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    &&
                    response?.data?.message === 'Login successful') {
                    // Handle API response here

                    // Get User ID :
                    user_register_id = response?.data?.user?._id;
                    // storeLoginMobileId(user_register_id);

                    // not auto login with these process and step

                    Toast.show('Login Successfully!', Toast.SHORT);
                    props.navigation.navigate("Home1");
                } else if (response?.data?.error === 'Please verify email and mobile number before logging in') {
                    Toast.show('Login Failed!', Toast.SHORT);

                    // Reg Id For verify account
                    storeLoginMobileId(user_register_id);

                    // email passing 
                    props.navigation.navigate('VerifyYourAccountMail', {
                        itemEmailMail: email.toString()
                    });

                } else {
                    Toast.show('Login Credentials Invalid!', Toast.SHORT);
                    //  Welcome! Signed in successfully.
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Login Credentials Invalid!', Toast.SHORT);
            });
    };


    const axiosPostRequestLoginMail = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/login/login';

        // Prepare data in JSON format
        const data = {
            email: email,
            password: pass
        };

        console.log("data====>", data);

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    &&
                    response?.data?.message === 'Login successful') {
                    // Handle API response here

                    // Get User ID :
                    user_register_id = response?.data?.user?._id;
                    storeLoginMobileId(user_register_id);

                    Toast.show('Login Successfully!', Toast.SHORT);
                    props.navigation.navigate("Home1");
                } else if (response?.data?.error === 'Please verify email and mobile number before logging in') {
                    Toast.show('Login Failed!', Toast.SHORT);


                    // Reg Id For verify account
                    storeLoginMobileId(user_register_id);

                    // email passing 
                    props.navigation.navigate('VerifyYourAccountMail', {
                        itemEmailMail: email.toString()
                    });

                } else {
                    Toast.show('Login Credentials Invalid!', Toast.SHORT);
                    //  Welcome! Signed in successfully.
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Login Credentials Invalid!', Toast.SHORT);
            });
    };


    const storeLoginMobileId = async (user_register_id: any) => {
        try {
            await AsyncStorage.setItem('user_register_id', JSON.stringify(user_register_id));
            console.log('user_register_id===>', JSON.stringify(user_register_id));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_register_id :', error);
        }
    }

    const onPressSignIn = async () => {
        if (email === '') {
            Toast.show("Email Field Is Required", Toast.SHORT);
        } else if (email !== '' && validateIsEmail(email) === false) {
            Toast.show("Please Enter Valid Email Address", Toast.SHORT);
        } else if (pass === '') {
            Toast.show("Password Field Is Required", Toast.SHORT);
        } else if (pass.length < 6) {
            Toast.show("Please Enter Minimum 6 Digit Password", Toast.SHORT);
        } else {
            // Toast.show("Done", Toast.SHORT);
            // props.navigation.navigate("Home1");
            try {
                const isConnected = await NetworkUtils.isNetworkAvailable()
                if (isConnected) {

                    // Reminder Me -  ON
                    if (toggleCheckBox) {
                        axiosPostRequestLoginMail();


                    } else {


                        axiosPostRequestLoginMailOff();
                    }

                } else {
                    Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
                }
            } catch (error) {
                Toast.show("axios error", Toast.SHORT);
            }
        }
    }


    const storeEmailStorage = async (storeemail: any) => {
        try {
            await AsyncStorage.setItem('storeemail', JSON.stringify(storeemail));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error storing email:', error);
        }
    };


    const storePasswordStorage = async (storepass: any) => {
        try {
            await AsyncStorage.setItem('storepass', JSON.stringify(storepass));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.error('Error storing pass:', error);
        }
    }

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={isDarkMode === 'dark' ? Colors.black : Colors.white} />
            <ScrollView style={{
                flex: 1,
                backgroundColor: isDarkMode === 'dark' ? Colors.black : Colors.white
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: isDarkMode === 'dark' ? Colors.black : Colors.white
                }}>
                    <HeaderComponent
                        margin={wp(3)}
                        backgroundColorOpacity={isDarkMode === 'dark' ? Colors.circleGray :
                            Colors.whiteGray}
                        borderRadiusOpacity={wp(10)}
                        paddingOpacity={wp(2)}
                        textAlign={"center"}
                        transform={[{ rotate: '180deg' }]}
                        // transform={isDarkMode === 'dark' ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }]}
                        source={isDarkMode === 'dark' ? Images.arrowRight : Images.arrowRightWhite}
                        width={wp(7)}
                        height={wp(7)}
                        color={Colors.lightBlack}
                        fontFamily={Fonts.InterRegular}
                        fontWeight="500"
                        title={""}
                        fontSize={wp(4)}
                        onPress={() => navigation.goBack()}
                    />

                    <View style={CommonStyle.commonFlex}>

                        <View style={Styles.viewLoginWithMail}>

                            {isDarkMode === 'dark' ? <Image
                                style={Styles.imageStrokeIcon}
                                resizeMode="contain"
                                source={Images.strokeIcon} /> : <Image
                                style={Styles.imageStrokeIcon}
                                resizeMode="contain"
                                source={Images.strokeIconWhite} />}

                            <TextComponent
                                color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                title={ScreenText.MyDriverPlus}
                                textDecorationLine={'none'}
                                fontWeight="700"
                                fontSize={wp(5)}
                                fontFamily={Fonts.PoppinsBlack}
                                alignSelf='center'
                                textAlign='center'
                                marginVertical={hp(3)}
                            />

                            <View style={CommonStyle.commonContent}>
                                <TextComponent
                                    color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                    title={ScreenText.LoginWithMail}
                                    textDecorationLine={'none'}
                                    fontWeight="700"
                                    fontSize={wp(4)}
                                    marginHorizontal={wp(5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                    marginVertical={hp(2)}
                                />
                                <TextComponent
                                    color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                    title={ScreenText.WelcomeInfo}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3.5)}
                                    marginHorizontal={wp(5)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                        </View>

                    </View>

                    <View>
                        <TextInputComponent
                            selectionColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            isVisibleDropDown={false}
                            isVisibleEye={false}
                            isVisibleEye_={false}
                            isVisibleMail={isDarkMode === 'dark' ? true : false}
                            isVisibleMailGray={isDarkMode === 'dark' ? false : true}
                            isVisibleLockWhite={isDarkMode === 'dark' ? false : false}
                            selectedImage={selectedImage || Images1.downArrow}
                            selected={(!!selected && selected.label) || 'Select'}
                            toggleDropdown={toggleDropdown}
                            renderDropdown={renderDropdown}
                            marginVertical={hp(0)}
                            marginHorizontal={wp(5)} // 3
                            width={wp(88)}
                            borderWidth={isDarkMode === 'dark' ? isFocused ? ConstValue.value1 : ConstValue.value0 :
                                isFocused ? ConstValue.value1 : ConstValue.value0
                            }
                            borderColor={isDarkMode === 'dark' ? isFocused ? Colors.white : Colors.blue :
                                isFocused ? Colors.blue : Colors.white}
                            height={hp(7)}
                            isUserHide={false}
                            textfontSize={ConstValue.value15}
                            textfontFamily={Fonts.PoppinsRegular}
                            textlineHeight={ConstValue.value0}
                            ref={refPassword}
                            placeholder={ScreenText.EnterEmail}
                            editable={true}
                            multiline={false}
                            secureTextEntry={false}
                            isPadding={true}
                            keyboardType='default'
                            textAlign='left'
                            numberOfLines={null}
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark :
                                Colors.whiteGray}
                            borderRadius={wp(2)}
                            onFocus={handleFocus}
                            onChangeText={handleAccountEmail}
                            onSubmitEditing={() => {
                                refMobile?.current?.focus();
                            }}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.gray : Colors.grayDark}
                        />
                        {!isValidEmail ?
                            <TextComponent
                                marginLeft={wp(4)}
                                textDecorationLine={'none'}
                                color={Colors.red}
                                marginTop={wp(1)}
                                title={ScreenText.ValidEmail}
                                fontWeight="400"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                            />
                            : null}

                    </View>

                    <View>
                        <TextInputComponent
                            selectionColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            isVisibleDropDown={false}
                            onPressHide={handleHideShow1}
                            onPressShow={handleHideShow2}
                            isVisibleEye={!isHide}
                            isVisibleEye_={isShow}
                            isVisibleMail={false}
                            isVisibleLockWhite={isDarkMode === 'dark' ? true : false}
                            isVisibleLock={isDarkMode === 'dark' ? false : true}
                            marginVertical={hp(1)}
                            marginHorizontal={wp(5)}
                            width={wp(88)}
                            borderWidth={isDarkMode === 'dark' ? isFocusedPassword ? ConstValue.value1 : ConstValue.value0 :
                                isFocusedPassword ? ConstValue.value1 : ConstValue.value0
                            }
                            borderColor={isDarkMode === 'dark' ? isFocusedPassword ? Colors.white : Colors.blue :
                                isFocusedPassword ? Colors.blue : Colors.white}
                            height={hp(7)}
                            marginTop={hp(2)}
                            isUserHide={false}
                            textfontSize={ConstValue.value15}
                            textfontFamily={Fonts.PoppinsRegular}
                            textlineHeight={ConstValue.value0}
                            ref={refMobile}
                            placeholder={ScreenText.EnterYourPassword}
                            editable={true}
                            multiline={false}
                            secureTextEntry={isSecure}
                            isPadding={true}
                            keyboardType='default'
                            textAlign='left'
                            numberOfLines={null}
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark :
                                Colors.whiteGray}
                            borderRadius={wp(2)}
                            onFocus={handleFocusPass}
                            onChangeText={handleAccountPassword}
                            onSubmitEditing={() => {
                            }}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.gray : Colors.grayDark}
                        />
                        {!isValidPassword ?
                            <TextComponent
                                marginLeft={wp(4)}
                                textDecorationLine={'none'}
                                color={Colors.red}
                                title={ScreenText.ValidPassword}
                                fontWeight="400"
                                marginTop={wp(1)}
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                            />
                            : null}
                    </View>

                    <View style={CommonStyle.commonFlex}>
                        <View style={{
                            backgroundColor: isDarkMode === 'dark' ?
                                Colors.black : Colors.white,
                            flexDirection: 'row',
                            marginHorizontal: wp(2),
                            justifyContent: 'center'
                        }}>
                            <View>
                                <CheckBox
                                    onCheckColor={'white'}
                                    onFillColor={'blue'}
                                    boxType="square"
                                    disabled={false}
                                    tintColors={{
                                        true: isDarkMode === 'dark' ? Colors.blue : Colors.blue,
                                        false: isDarkMode === 'dark' ? Colors.white : Colors.black
                                    }}
                                    value={toggleCheckBox}
                                    onValueChange={(newValue) => {
                                        setToggleCheckBox(newValue);
                                        storeEmailStorage(email);
                                        storePasswordStorage(pass);
                                    }}
                                />
                            </View>

                            <View style={CommonStyle.justifyContent}>
                                <TextComponent
                                    color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                    title={ScreenText.Rememberme}
                                    marginTop={wp(1)}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='right'
                                />
                            </View>

                            <View style={CommonStyle.justifyContent}>
                                <TextComponent
                                    color={isDarkMode === 'dark' ? Colors.forgotTextColor : Colors.blueDark}
                                    title={ScreenText.ForgotPassword}
                                    marginLeft={wp(25)}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3)}
                                    marginRight={wp(5)}
                                    marginTop={wp(1.5)}
                                    onPress={() => props.navigation.navigate("ForgotPassword")}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='left'
                                />
                            </View>

                        </View>
                        <View>
                            <ButtonComponent
                                isVisibleMobile={false}
                                isVisibleFaceBook={false}
                                marginVertical={hp(2)}
                                heightBtn={hp(7)}
                                widthBtn={wp(88)}
                                isRightArrow={false}
                                color={Colors.white}
                                title={ScreenText.Singin}
                                onPress={onPressSignIn}
                                marginHorizontal={wp(5)} // 4
                                fontWeight="600"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                backgroundColor={Colors.blue}
                            />

                        </View>
                        <View style={CommonStyle.commonJustifyContent}>
                            <TextComponent
                                color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                title={ScreenText.DontHaveAnAccount}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                            <TextComponent
                                color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                title={ScreenText.CreateNewAccount}
                                onPress={() => props.navigation.navigate("SignUp")}
                                textDecorationLine={'none'}
                                marginLeft={wp(1)}
                                fontWeight="400"
                                fontSize={wp(3)}
                                fontFamily={Fonts.PoppinsBold}
                                textAlign='left'
                            />
                        </View>

                    </View>



                </View>
            </ScrollView>


        </SafeAreaView>
    )
}

export default LoginWithMailScreen;

