import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import React, { useRef, useState } from 'react';
import {
    SafeAreaView, View
} from 'react-native';
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

const ForgotPasswordScreen = (props: Props) => {
    const navigation = useNavigation();

    // const isDarkMode = useisDarkMode();

    const { isDarkMode, toggleTheme } = useTheme();




    const refPassword = useRef<any>(null);

    const [email, setEmail] = useState('')
    const [isValidEmail, setValidEmail] = useState(true);
    const [isValidPassword, setValidPassword] = useState(true);


    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);

    const handleFocus = () => {
        setIsFocused(true)
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


    const axiosPostRequestEmailOTPSent = async (email: any) => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/usersEmailOTP/sendOTP';

        // Prepare data in JSON format
        const data = {
            email: email,
        };

        console.log("axiosPostRequestEmailOTPSent", data);
        console.log("axiosPostRequestEmailOTPSent", data);

        console.log("axiosPostRequestEmailOTPSent", data);
        console.log("axiosPostRequestEmailOTPSent", data);


        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }) //   && response?.data?.data?.message === 'OTP sent successfully.'
            .then(response => {
                if (response.status === 200 &&
                    response?.data?.message === 'OTP sent successfully.') {

                    // Handle API response here

                    Toast.show('We`ve successfully sent your One-Time Password (OTP)', Toast.SHORT);

                    props.navigation.navigate('OTPFromEmail', {
                        itemEmail: email
                    });

                } else {
                    Toast.show('Email Credentials Invalid', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Account is Not Registered!', Toast.SHORT);
            });
    };


    const onPressNext = async () => {
        if (email == '') {
            Toast.show("Email Field Is Required", Toast.SHORT);
        } else if (email !== '' && validateIsEmail(email) === false) {
            Toast.show("Please Enter Valid Email Address", Toast.SHORT);
        } else {
            try {
                const isConnected = await NetworkUtils.isNetworkAvailable()
                if (isConnected) {

                    // CHECK EMAIL REG OR NOT
                    // YES - OTP SEND
                    // NO - OTP NO SEND 

                    axiosPostRequestEmailRegCheck();

                    // axiosPostRequestEmailOTPSent();
                } else {
                    Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
                }
            } catch (error) {
                Toast.show("axios error", Toast.SHORT);
            }
        }
    }

    const axiosPostRequestEmailRegCheck = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/userInfo/userInfo';

        // Prepare data in JSON format
        const data = {
            email: email,
        };

        console.log("Google11===>", data);

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async response => {
                if (response.status == 200
                    &&
                    response?.data?.message === "User Information") {

                    //  Welcome! Signed in successfully.
                    // Toast.show('Google Account is Already Registered!', Toast.SHORT);
                    // props.navigation.navigate('Home1');

                    axiosPostRequestEmailOTPSent(email);

                } else {
                    Toast.show('Account is Not Registered!', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Account is Not Registered!', Toast.SHORT);
            });

    };

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
                    transform={[{ rotate: '180deg' }]}
                    borderRadiusOpacity={wp(10)} // arrowRightWhite
                    paddingOpacity={wp(2)}
                    textAlign={"center"}
                    // transform={isDarkMode === 'dark' ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }]}
                    source={isDarkMode === 'dark' ? Images.arrowRight : Images.arrowRightWhite}
                    width={wp(7)}
                    height={wp(7)}
                    color={Colors.lightBlack} // lightBlack
                    fontFamily={Fonts.InterRegular}
                    fontWeight="500"
                    title={""}
                    fontSize={wp(4)}
                    onPress={() => navigation.goBack()}
                />
                <View style={Styles.viewForgotPasswordConatiner}>
                    <View>
                        <TextComponent
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            title={ScreenText.ForgotPasswordText}
                            textDecorationLine={'none'}
                            fontWeight="700"
                            fontSize={wp(5)}
                            // marginHorizontal={wp(4)}
                            fontFamily={Fonts.PoppinsRegular}
                            marginHorizontal={wp(2)}
                            textAlign='left'
                            marginVertical={hp(3)}
                            marginTop={hp(5)}
                        />
                        <TextComponent
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            title={ScreenText.EnterYourRegisterEmailId}
                            textDecorationLine={'none'}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            // marginHorizontal={wp(4)}
                            marginHorizontal={wp(2)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                        />
                    </View>
                    <View>
                        <TextInputComponent
                            selectionColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            isVisibleDropDown={false}
                            isVisibleEye={false}
                            isVisibleEye_={false}
                            isVisibleLockWhite={false}
                            isVisibleMail={isDarkMode === 'dark' ? true : false}
                            isVisibleMailGray={isDarkMode === 'dark' ? false : true}
                            marginVertical={hp(0)}
                            marginHorizontal={wp(1)}
                            width={wp(88)}
                            borderWidth={isFocused ? ConstValue.value1 : ConstValue.value0}
                            borderColor={isFocused ? Colors.white : Colors.blue}
                            height={hp(7)}
                            marginTop={hp(2)}
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
                            maxLength={null}
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark :
                                Colors.whiteGray}
                            borderRadius={wp(2)}
                            onFocus={handleFocus}
                            onChangeText={handleAccountEmail}
                            onSubmitEditing={() => {
                            }}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.gray : Colors.grayDark} />
                        {!isValidEmail ?
                            <TextComponent
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

                </View>

                <View style={Styles.viewOtpConatiner}>
                    <ButtonComponent
                        isVisibleMobile={false}
                        isVisibleFaceBook={false}
                        marginVertical={hp(5)}
                        heightBtn={hp(7)}
                        widthBtn={wp(88)}
                        isRightArrow={false}
                        color={Colors.white}
                        onPress={onPressNext}
                        title={ScreenText.Next}
                        marginHorizontal={wp(5)}
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

export default ForgotPasswordScreen;