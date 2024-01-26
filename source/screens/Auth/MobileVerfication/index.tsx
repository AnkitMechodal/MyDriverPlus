import auth, { PhoneAuthState } from '@react-native-firebase/auth';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
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
import NetworkUtils from '../../../utils/commonfunction';
import { ConstValue, ScreenText } from '../../../utils/index';
import Styles from './style';


type Props = {
    navigation: any
}

const MobileVerficationScreen = ({ route, navigation }) => {
    // const navigation = useNavigation();

    const refPassword = useRef<any>(null);
    const refnumber2 = useRef<any>(null);
    const refnumber3 = useRef<any>(null);
    const refnumber4 = useRef<any>(null);
    const refnumber5 = useRef<any>(null);
    const refnumber6 = useRef<any>(null);

    const [email, setEmail] = useState('')
    const [isValidEmail, setValidEmail] = useState(true);
    const [isValidPassword, setValidPassword] = useState(true);


    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [isFocused4, setIsFocused4] = useState(false);
    const [isFocused5, setIsFocused5] = useState(false);
    const [isFocused6, setIsFocused6] = useState(false);


    const [one, setOne] = useState('');
    const [two, setTwo] = useState('');
    const [three, setThree] = useState('');
    const [four, setFour] = useState('');
    const [five, setFive] = useState('');
    const [six, setSix] = useState('');


    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [confirm, setConfirm] = useState<PhoneAuthState | null>(null);

    const { isDarkMode, toggleTheme } = useTheme();


    useEffect(() => {
        // Send OTP 
        sendOTPFromFirebase();
    }, []);

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

    const sendOTPFromFirebase = async () => {
        try {
            // Send a verification code to the provided phone number
            const confirmation = await auth().signInWithPhoneNumber
                (route?.params?.itemOTPNumber);
            setConfirm(confirmation);
            Toast.show("'Verification Code Sent", Toast.SHORT);
        } catch (error) {
            Toast.show("Failed To Send Verification Code", Toast.SHORT);
        }
    }

    const onPressResend = () => {
        // Resend OTP From Firebase :
        // Get Or Not :
        sendOTPFromFirebase();
    }

    const onPressOTPSMS = async () => {
        // mobilenumber & mobilenumberOTP success
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                // Check OTP Coorect Or Not 
                if (confirm) {
                    await confirm.confirm(one + two + three + four + five + six);
                } else {
                    Toast.show("Invalid Verification Code.", Toast.SHORT);
                    axiosPostRequestOTPSMS();
                }
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostRequestOTPSMS = async () => {

        const url = 'https://rideshareandcourier.graphiglow.in/api/usersMobileVerify/numberVerify';

        // Prepare data in JSON format
        const data = {
            mobilenumber: route?.params?.itemOTPNumber, // itemOTPNumber
            mobilenumberOTP: one + two + three + four + five + six
        };

        console.log("axiosPostRequestOTPSMS==>", data);

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200 &&
                    response?.data?.message === 'Mobile Number Verify') {
                    // Handle API response here
                    Toast.show("OTP Verification Successfully!", Toast.SHORT);
                    // navigation.goBack();
                } else {
                    Toast.show('OTP Verification Failed!', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('OTP Verification Failed!', Toast.SHORT);
            });

    }

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={isDarkMode === 'dark' ? Colors.black : Colors.white} />
            <View style={{
                flex: 1,
                backgroundColor: isDarkMode === 'dark' ? Colors.black : Colors.white
            }}>
                <HeaderComponent
                    margin={wp(3)}
                    backgroundColorOpacity={isDarkMode === 'dark' ? Colors.circleGray :
                        Colors.whiteGray}
                    borderRadiusOpacity={wp(10)}
                    transform={[{ rotate: '180deg' }]}
                    paddingOpacity={wp(2)}
                    textAlign={"center"}
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
                <View style={Styles.viewMobileVerfictaion}>
                    <View>
                        <TextComponent
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            title={ScreenText.OTPVerification}
                            textDecorationLine={'none'}
                            fontWeight="700"
                            fontSize={wp(6)}
                            marginHorizontal={wp(4)}
                            fontFamily={Fonts.PoppinsSemiBold}
                            textAlign='center'
                            marginVertical={hp(3)}
                            marginTop={hp(5)}
                        />
                        <TextComponent
                            color={isDarkMode === 'dark' ? Colors.gray : Colors.black}
                            isTextEnd={true}
                            sizeEnd={wp(3.5)}
                            colorEnd={isDarkMode === 'dark' ? Colors.white : Colors.grayDark}
                            title={ScreenText.OTPSend}
                            endtext={route?.params?.itemOTPNumber}
                            textDecorationLine={'none'}
                            fontWeight="500"
                            fontSize={wp(3.5)}
                            marginHorizontal={wp(3)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='center'
                        />
                    </View>
                    <View style={CommonStyle.commonRow}>
                        <TextInputComponent
                            selectionColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            isVisibleDropDown={false}
                            isVisibleEye={false}
                            isVisibleEye_={false}
                            isVisibleMail={false}
                            isVisibleMailGray={false}
                            isVisibleLockWhite={false}
                            marginVertical={hp(0)}
                            marginHorizontal={wp(1.5)}
                            width={wp(12)}
                            borderWidth={isDarkMode === 'dark' ? isFocused ? ConstValue.value1 : ConstValue.value0 :
                                isFocused ? ConstValue.value1 : ConstValue.value0
                            }
                            borderColor={isDarkMode === 'dark' ? isFocused ? Colors.white : Colors.blue :
                                isFocused ? Colors.blue : Colors.white}
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
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark :
                                Colors.whiteGray}
                            borderRadius={wp(2)}
                            onFocus={handleFocus}
                            onChangeText={handleAccountOne}
                            onSubmitEditing={() => {
                                refnumber2?.current?.focus();
                            }}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.gray : Colors.grayDark}
                        />
                        <TextInputComponent
                            selectionColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            isVisibleDropDown={false}
                            isVisibleEye={false}
                            isVisibleEye_={false}
                            isVisibleMail={false}
                            isVisibleMailGray={false}
                            isVisibleLockWhite={false}
                            marginVertical={hp(0)}
                            marginHorizontal={wp(1.5)}
                            width={wp(12)}
                            borderWidth={isDarkMode === 'dark' ? isFocused2 ? ConstValue.value1 : ConstValue.value0 :
                                isFocused2 ? ConstValue.value1 : ConstValue.value0
                            }
                            borderColor={isDarkMode === 'dark' ? isFocused2 ? Colors.white : Colors.blue :
                                isFocused2 ? Colors.blue : Colors.white}
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
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark :
                                Colors.whiteGray}
                            borderRadius={wp(2)}
                            onFocus={handleFocus2}
                            onChangeText={handleAccountTwo}
                            onSubmitEditing={() => {
                                refnumber3?.current?.focus();
                            }}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.gray : Colors.grayDark}
                        />

                        <TextInputComponent
                            selectionColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            isVisibleDropDown={false}
                            isVisibleEye={false}
                            isVisibleEye_={false}
                            isVisibleMail={false}
                            isVisibleMailGray={false}
                            isVisibleLockWhite={false}
                            marginVertical={hp(0)}
                            marginHorizontal={wp(1.5)}
                            width={wp(12)}
                            borderWidth={isDarkMode === 'dark' ? isFocused3 ? ConstValue.value1 :
                                ConstValue.value0 :
                                isFocused3 ? ConstValue.value1 : ConstValue.value0
                            }
                            borderColor={isDarkMode === 'dark' ? isFocused3 ? Colors.white : Colors.blue :
                                isFocused3 ? Colors.blue : Colors.white}
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
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark :
                                Colors.whiteGray}
                            borderRadius={wp(2)}
                            onFocus={handleFocus3}
                            onChangeText={handleAccountThree}
                            onSubmitEditing={() => {
                                refnumber4?.current?.focus();
                            }}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.gray : Colors.grayDark}
                        />


                        <TextInputComponent
                            selectionColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            isVisibleDropDown={false}
                            isVisibleEye={false}
                            isVisibleEye_={false}
                            isVisibleMail={false}
                            isVisibleMailGray={false}
                            isVisibleLockWhite={false}
                            marginVertical={hp(0)}
                            marginHorizontal={wp(1.5)}
                            width={wp(12)}
                            borderWidth={isDarkMode === 'dark' ? isFocused4 ? ConstValue.value1 :
                                ConstValue.value0 :
                                isFocused4 ? ConstValue.value1 : ConstValue.value0
                            }
                            borderColor={isDarkMode === 'dark' ? isFocused4 ? Colors.white : Colors.blue :
                                isFocused4 ? Colors.blue : Colors.white}
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
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark :
                                Colors.whiteGray}
                            borderRadius={wp(2)}
                            onFocus={handleFocus4}
                            onChangeText={handleAccountFour}
                            onSubmitEditing={() => {
                                refnumber5?.current?.focus();
                            }}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.gray : Colors.grayDark}
                        />

                        <TextInputComponent
                            selectionColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            isVisibleDropDown={false}
                            isVisibleEye={false}
                            isVisibleEye_={false}
                            isVisibleMail={false}
                            isVisibleMailGray={false}
                            isVisibleLockWhite={false}
                            marginVertical={hp(0)}
                            marginHorizontal={wp(1.5)}
                            width={wp(12)}
                            borderWidth={isDarkMode === 'dark' ? isFocused5 ? ConstValue.value1 :
                                ConstValue.value0 :
                                isFocused5 ? ConstValue.value1 : ConstValue.value0
                            }
                            borderColor={isDarkMode === 'dark' ? isFocused5 ? Colors.white : Colors.blue :
                                isFocused5 ? Colors.blue : Colors.white}
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
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark :
                                Colors.whiteGray}
                            borderRadius={wp(2)}
                            onFocus={handleFocus5}
                            onChangeText={handleAccountFive}
                            onSubmitEditing={() => {
                                refnumber6?.current?.focus();
                            }}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.gray : Colors.grayDark}
                        />

                        <TextInputComponent
                            selectionColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            isVisibleDropDown={false}
                            isVisibleEye={false}
                            isVisibleEye_={false}
                            isVisibleMail={false}
                            isVisibleMailGray={false}
                            isVisibleLockWhite={false}
                            marginVertical={hp(0)}
                            marginHorizontal={wp(1.5)}
                            width={wp(12)}
                            borderWidth={isDarkMode === 'dark' ? isFocused6 ? ConstValue.value1 :
                                ConstValue.value0 :
                                isFocused6 ? ConstValue.value1 : ConstValue.value0
                            }
                            borderColor={isDarkMode === 'dark' ? isFocused6 ? Colors.white : Colors.blue :
                                isFocused6 ? Colors.blue : Colors.white}
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
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark :
                                Colors.whiteGray}
                            borderRadius={wp(2)}
                            onFocus={handleFocus6}
                            onChangeText={handleAccountSix}
                            onSubmitEditing={() => {
                            }}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.gray : Colors.grayDark}
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
                    <View>
                        <TextComponent
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            isTextEnd={true}
                            sizeEnd={wp(3.5)}
                            colorEnd={Colors.blue}
                            endtext={ScreenText.Resend}
                            onPress={onPressResend}
                            title={ScreenText.ReceiveNot}
                            textDecorationLine={'none'}
                            fontWeight="500"
                            fontSize={wp(3.5)}
                            marginVertical={wp(5)}
                            marginHorizontal={wp(3)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='center'
                        />
                    </View>

                </View>

                <View style={Styles.viewMobileVerfication}>
                    <ButtonComponent
                        isVisibleMobile={false}
                        isVisibleFaceBook={false}
                        marginVertical={hp(5)}
                        heightBtn={hp(7)}
                        widthBtn={wp(90)}
                        isRightArrow={false}
                        color={Colors.white}
                        title={ScreenText.Verify}
                        onPress={onPressOTPSMS}
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
        </SafeAreaView>
    )
}

export default MobileVerficationScreen;