import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import ButtonComponent from '../../../components/Button';
import StatusBarComponent from '../../../components/StatusBar';
import TextComponent from '../../../components/Text';
import TextInputComponent from '../../../components/TextInput';
import { Colors, Fonts, Images } from '../../../themes/index';
import CommonStyle from '../../../utils/commonStyle';
import NetworkUtils, { validateIsEmail, validateIsPhoneNumber } from '../../../utils/commonfunction';
import { ConstValue, ScreenText } from '../../../utils/index';
import Styles from './style';


type Props = {
    navigation: any
}

const RegisterScreen = (props: Props) => {

    const [mobile, setMobile] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')

    const refUsername = useRef<any>(null);
    const refUsermobile = useRef<any>(null);
    const refUseremail = useRef<any>(null);

    const [isValid, setValid] = useState(true);
    const [isValidNumber, setValidNumber] = useState(true);
    const [isValidEmail, setValidEmail] = useState(true);

    const [isAdShow, setAdShow] = useState(false);

    useEffect(() => {
        AdShow();
    }, [])

    const AdShow = async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable();
        if (isConnected) {
            setAdShow(false)
        } else {
            setAdShow(true)
        }
    }

    const storeCreateName = async (username: any) => {
        try {
            await AsyncStorage.setItem("username", JSON.stringify(username));
        } catch (error) {
        }
    };
    const storeCreateEmail = async (email: any) => {
        try {
            await AsyncStorage.setItem("email", JSON.stringify(email));
        } catch (error) {
        }
    };

    const axiosPostRequestRegister = async () => {
        let data = {
            user_name: userName.toString(),
            phone_number: mobile.toString(),
            email_id: email.toString(),
        }
        let config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
        const url = 'https://mechodalgroup.xyz/readbooks/api/register.php'
        await axios.post(url, data, config)
            .then((response) => {
                if (response.status == 200
                    && response?.data?.message == "User registered successfully") {
                    // Toast.show(response?.data?.message, Toast.SHORT);
                    storeCreateName(userName);
                    storeCreateEmail(email);
                    props.navigation.navigate("Interests")
                } else if (response?.data?.error == "Email ID already registered") {
                    Toast.show(response?.data?.error, Toast.SHORT);
                    props.navigation.navigate("Login")
                }
                else {
                    if (userName.length < 3) {
                        setValid(false)
                        Toast.show(response?.data?.error, Toast.SHORT);
                    } else if (mobile.length < 10 || mobile == '') {
                        setValidNumber(false);
                        Toast.show(response?.data?.error, Toast.SHORT);
                    } else if (email == '' && validateIsEmail(email) === false) {
                        setValidEmail(false)
                        Toast.show(response?.data?.error, Toast.SHORT);
                    }
                }
            });
    }

    const handleAccountEmail = (useremail: any) => {
        setEmail(useremail);
        if (validateIsEmail(useremail) === false) {
            setValidEmail(false)
        } else {
            setValidEmail(true)
        }
    }

    const handleAccountMobileNumber = (number: any) => {
        setMobile(number);
        if (number.length < 10) {
            setValidNumber(false);
        } else if (number.length === 10 && validateIsPhoneNumber(mobile) === false) {
            setValidNumber(true);
        } else {
            // nu;;
        }
    }

    const handleAccountUserName = (username: any) => {
        setUserName(username);
        if (username.length < 3 || username.length === '') {
            setValid(false)
        } else {
            setValid(true)
        }
    }

    const handleCreateAccountValidation = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostRequestRegister();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    return (
        <SafeAreaView style={Styles.container}>
            <StatusBarComponent
                backgroundColor={Colors.white} />

            <View style={Styles.viewSub1}>
                <Image source={Images.appIcon}
                    resizeMode="contain"
                    style={Styles.imageAppIcon}
                />
                <TextComponent
                    color={Colors.black}
                    title={ScreenText.Register}
                    textDecorationLine={'none'}
                    fontWeight="700"
                    fontSize={wp(8)}
                    fontFamily={Fonts.RobotoRegular}
                    alignSelf='center'
                    textAlign='center'
                    letterSpacing={wp(0)} />
                <TextComponent
                    color={Colors.black}
                    title={ScreenText.LoginToYourAccount}
                    textDecorationLine={'none'}
                    fontWeight="400"
                    fontSize={wp(4)}
                    fontFamily={Fonts.PoppinsRegular}
                    alignSelf='center'
                    textAlign='center'
                    letterSpacing={wp(0)} />
            </View>

            <View style={Styles.viewSub2}>
                <TextInputComponent
                    selectionColor={Colors.white}
                    marginVertical={hp(0)}
                    marginHorizontal={wp(0)}
                    width={wp(85)}
                    borderWidth={ConstValue.value1}
                    borderColor={Colors.gray}
                    isPadding={true}
                    height={hp(6)}
                    marginTop={hp(2)}
                    isUserHide={false}
                    textfontSize={ConstValue.value15}
                    textfontFamily={Fonts.PoppinsRegular}
                    textlineHeight={ConstValue.value0}
                    ref={refUsername}
                    placeholder={ScreenText.EnterUserName}
                    editable={true}
                    multiline={false}
                    marginHorizontalInput={wp(3)}
                    secureTextEntry={false}
                    keyboardType='default'
                    numberOfLines={null}
                    color={Colors.black}
                    backgroundColor={Colors.white}
                    borderRadius={wp(4)}
                    onFocus={() => {
                    }}
                    onChangeText={handleAccountUserName}
                    onSubmitEditing={() => {
                        refUseremail?.current?.focus();
                    }}
                    placeholderTextColor={Colors.textColor}
                />
                {!isValid ?
                    <TextComponent
                        textDecorationLine={'none'}
                        color={Colors.red}
                        marginLeft={wp(4)}
                        title={ScreenText.ValidUserName}
                        fontWeight="400"
                        fontSize={wp(4)}
                        fontFamily={Fonts.PoppinsRegular}
                    />
                    : null
                }
                <TextInputComponent
                    selectionColor={Colors.white}
                    marginVertical={hp(0)}
                    marginHorizontal={wp(0)}
                    width={wp(85)}
                    borderWidth={ConstValue.value1}
                    borderColor={Colors.gray}
                    height={hp(6)}
                    marginTop={hp(2)}
                    isPadding={true}
                    isUserHide={false}
                    textfontSize={ConstValue.value15}
                    textfontFamily={Fonts.PoppinsRegular}
                    textlineHeight={ConstValue.value0}
                    ref={refUseremail}
                    placeholder={ScreenText.EnterEmail}
                    editable={true}
                    multiline={false}
                    marginHorizontalInput={wp(3)}
                    secureTextEntry={false}
                    keyboardType='default'
                    numberOfLines={null}
                    color={Colors.black}
                    backgroundColor={Colors.white}
                    borderRadius={wp(4)}
                    onFocus={() => {
                    }}
                    onChangeText={handleAccountEmail}
                    onSubmitEditing={() => {
                        refUsermobile?.current?.focus();
                    }}
                    placeholderTextColor={Colors.textColor}
                />
                {!isValidEmail ?
                    <TextComponent
                        textDecorationLine={'none'}
                        color={Colors.red}
                        title={ScreenText.ValidEmail}
                        fontWeight="400"
                        fontSize={wp(4)}
                        marginLeft={wp(4)}
                        fontFamily={Fonts.PoppinsRegular}
                    />
                    : null
                }
                <TextInputComponent
                    selectionColor={Colors.white}
                    marginVertical={hp(0)}
                    marginHorizontal={wp(0)}
                    marginHorizontalInput={wp(3)}
                    width={wp(85)}
                    borderWidth={ConstValue.value1}
                    borderColor={Colors.gray}
                    height={hp(6)}
                    marginTop={hp(2)}
                    isPadding={true}
                    isUserHide={false}
                    textfontSize={ConstValue.value15}
                    textfontFamily={Fonts.PoppinsRegular}
                    textlineHeight={ConstValue.value0}
                    ref={refUsermobile}
                    placeholder={ScreenText.EnterMobile}
                    editable={true}
                    multiline={false}
                    secureTextEntry={false}
                    keyboardType='numeric'
                    numberOfLines={null}
                    maxLength={10}
                    color={Colors.black}
                    backgroundColor={Colors.white}
                    borderRadius={wp(4)}
                    onFocus={() => {
                    }}
                    onChangeText={handleAccountMobileNumber}
                    onSubmitEditing={() => {

                    }}
                    placeholderTextColor={Colors.textColor}
                />
                {!isValidNumber ?
                    <TextComponent
                        marginLeft={wp(4)}
                        textDecorationLine={'none'}
                        color={Colors.red}
                        title={ScreenText.ValidEmail}
                        fontWeight="400"
                        fontSize={wp(4)}
                        fontFamily={Fonts.PoppinsRegular}
                    />
                    : null
                }
                <ButtonComponent
                    marginVertical={hp(3)}
                    heightBtn={hp(7)}
                    widthBtn={wp(85)}
                    isRightArrow={false}
                    onPress={handleCreateAccountValidation}
                    color={Colors.white}
                    title={ScreenText.Next}
                    fontWeight="700"
                    fontSize={wp(5)}
                    fontFamily={Fonts.PoppinsSemiBold}
                    alignSelf='center'
                    textAlign='center'
                    borderRadius={wp(4)}
                    backgroundColor={Colors.buttonBackgroundColor}
                />
                <View style={CommonStyle.commonRowCenter}>
                    <TextComponent
                        color={Colors.black}
                        title={ScreenText.AlreadyhaveanAccount}
                        textDecorationLine={'none'}
                        fontWeight="400"
                        fontSize={wp(4)}
                        fontFamily={Fonts.PoppinsRegular}
                        alignSelf='center'
                        textAlign='center'
                        letterSpacing={wp(0)} />
                    <TextComponent
                        onPress={() => props.navigation.navigate("Login")}
                        color={Colors.buttonBackgroundColor}
                        title={ScreenText.Login}
                        textDecorationLine={'none'}
                        fontWeight="400"
                        fontSize={wp(4)}
                        fontFamily={Fonts.PoppinsRegular}
                        alignSelf='center'
                        textAlign='center'
                        letterSpacing={wp(0)} />
                </View>
            </View>

            {!isAdShow ? <BannerAd
                unitId={'ca-app-pub-4105644791348608/7859799136'}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: false,
                }}
                onAdLoaded={() => {
                }}
                onAdFailedToLoad={(error) => {
                }}
            /> : null
            }

        </SafeAreaView>
    )
}

export default RegisterScreen;