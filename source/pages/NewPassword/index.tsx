import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button';
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text';
import TextInputComponent from '../../components/TextInput';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils, { validateIsEmail } from '../../utils/commonfunction';
import { ConstValue, ScreenText } from '../../utils/index';
import Styles from './style';


type Props = {
    navigation: any
}

const NewPasswordScreen = ({ route, navigation }) => {
    // const navigation = useNavigation();

    const refPassword = useRef<any>(null);

    const [email, setEmail] = useState('')
    const [isValidEmail, setValidEmail] = useState(true);


    const [isValidPassword, setValidPassword] = useState(true);
    const [isValidPasswordConfirm, setValidPasswordConfirm] = useState(true);

    const [isValidPasswordCurrent, setValidPasswordCurrent] = useState(true);


    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] = useState(false);

    const [isFocusedPasswordCurrent, setIsFocusedPasswordCurrent] = useState(false);

    const refMobile = useRef<any>(null);
    const refMobileCurrent = useRef<any>(null);
    const refMobileConfirm = useRef<any>(null);

    const [pass, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [passCurrent, setPassCurrent] = useState('')

    const [isSecure, setSecure] = useState(true);
    const [isShow, setShow] = useState(false);
    const [isHide, setHide] = useState(false);

    const [isSecureCurrent, setSecureCurrent] = useState(true);
    const [isShowCurrent, setShowCurrent] = useState(false);
    const [isHideCurrent, setHideCurrent] = useState(false);


    const [isSecureConfirm, setSecureConfirm] = useState(true);
    const [isShowConfirm, setShowConfirm] = useState(false);
    const [isHideConfirm, setHideConfirm] = useState(false);


    useEffect(() => {
        console.log("itemEmailToChangePassword==>", route?.params?.itemEmailToChangePassword);
    }, []);

    const handleFocus = () => {
        setIsFocused(true)
    }


    const handleFocusPassConfirm = () => {
        setIsFocusedPasswordConfirm(true)
    }

    const handleFocusPass = () => {
        setIsFocusedPassword(true)
    }

    const handleFocusPassCurrent = () => {
        setIsFocusedPasswordCurrent(true)
    }



    const handleHideShow1Confirm = () => {
        setSecureConfirm(false)
        setHideConfirm(true)
        setShowConfirm(true)
    }

    const handleHideShow2Confirm = () => {
        setSecureConfirm(true)
        setHideConfirm(false)
        setShowConfirm(false)
    }


    const handleHideShow1Current = () => {
        setSecureCurrent(false)
        setHideCurrent(true)
        setShowCurrent(true)
    }

    const handleHideShow2Current = () => {
        setSecureCurrent(true)
        setHideCurrent(false)
        setShowCurrent(false)
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


    const handleAccountPasswordConfirm = (userpass: any) => {
        setPassConfirm(userpass);
        if (userpass.length < 6) {
            setIsFocusedPasswordConfirm(true);
            setValidPasswordConfirm(false)
        } else {
            setValidPasswordConfirm(true);
            setIsFocusedPasswordConfirm(false)
        }
    }

    const handleAccountPasswordCurrent = (userpass: any) => {
        setPassCurrent(userpass);
        if (userpass.length < 6) {
            setIsFocusedPasswordCurrent(true);
            setValidPasswordCurrent(false)
        } else {
            setValidPasswordCurrent(true);
            setIsFocusedPasswordCurrent(false)
        }
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

    const onPressSubmit = () => {
        if (passCurrent === '') {
            Toast.show("Current Password Field Is Required", Toast.SHORT);
        } else if (passCurrent.length < 6) {
            Toast.show("Please Enter Minimum 6 Digit Current Password", Toast.SHORT);
        } else if (pass === '') {
            Toast.show("Password Field Is Required", Toast.SHORT);
        } else if (pass.length < 6) {
            Toast.show("Please Enter Minimum 6 Digit Password", Toast.SHORT);
        } else if (passConfirm === '') {
            Toast.show("Confirm Password Field Is Required", Toast.SHORT);
        } else if (passConfirm.length < 6) {
            Toast.show("Please Enter Minimum 6 Digit Confirm Password", Toast.SHORT);
        } else if (pass !== passConfirm) {
            Toast.show("Passwords Do Not Match. Please try again.", Toast.SHORT);
        } else {
            // Toast.show("Done", Toast.SHORT);
            axiosPostProfileChangePassword();
        }
    }

    const axiosPostProfileChangePassword = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostRequestProfileSubmit();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostRequestProfileSubmit = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/forgetPassword/resetPassword';

        // Prepare data in JSON format
        const data = {
            email: route?.params?.itemEmailToChangePassword,
            password: pass,
            newPassword: passConfirm
        };

        console.log("axiosPostRequestProfileSubmit==>", data);

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    && response?.data?.message === 'Password reset successfully') {
                    // Handle API response here
                    Toast.show('Congratulations! Your password has been reset successfully', Toast.SHORT);
                    navigation.goBack();
                } else {
                    Toast.show('Credentials Invalid!', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Credentials Invalid!', Toast.SHORT);
            });
    };

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <View style={Styles.container}>
                <HeaderComponent
                    margin={wp(3)}
                    transform={[{ rotate: '180deg' }]}
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
                    onPress={() => navigation.goBack()}
                />

                <ScrollView style={Styles.container}>
                    <View style={Styles.container}>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={ScreenText.ChangePassword}
                                textDecorationLine={'none'}
                                fontWeight="700"
                                fontSize={wp(5)}
                                marginLeft={wp(5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                                marginTop={hp(15)}
                            />
                        </View>

                        <View style={CommonStyle.commonContentAlign}>
                            <TextInputComponent
                                selectionColor={Colors.white}
                                isVisibleDropDown={false}
                                onPressHide={handleHideShow1Current}
                                onPressShow={handleHideShow2Current}
                                isVisibleEye={!isHideCurrent}
                                isVisibleEye_={isShowCurrent}
                                isVisibleLock={false}
                                isVisibleCurrentPsw={true}
                                marginVertical={hp(1)}
                                width={wp(90)}
                                borderWidth={isFocusedPasswordCurrent ? ConstValue.value1 : ConstValue.value0}
                                borderColor={isFocusedPasswordCurrent ? Colors.white : Colors.blue}
                                height={hp(7)}
                                marginTop={hp(2)}
                                isUserHide={false}
                                textfontSize={ConstValue.value15}
                                textfontFamily={Fonts.PoppinsRegular}
                                textlineHeight={ConstValue.value0}
                                ref={refMobileCurrent}
                                placeholder={ScreenText.EnterCurrentPassword}
                                editable={true}
                                multiline={false}
                                secureTextEntry={isSecureCurrent}
                                isPadding={true}
                                keyboardType='default'
                                textAlign='left'
                                numberOfLines={null}
                                maxLength={null}
                                color={Colors.white}
                                backgroundColor={Colors.grayDark}
                                borderRadius={wp(2)}
                                onFocus={handleFocusPassCurrent}
                                onChangeText={handleAccountPasswordCurrent}
                                onSubmitEditing={() => {
                                    refMobile?.current?.focus();
                                }}
                                placeholderTextColor={Colors.gray}
                            />
                            {!isValidPasswordCurrent ?
                                <TextComponent
                                    // marginLeft={wp(4)}
                                    textDecorationLine={'none'}
                                    color={Colors.red}
                                    title={ScreenText.ValidPassword}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    fontFamily={Fonts.PoppinsRegular}
                                />
                                : null}
                        </View>


                        <View style={CommonStyle.commonContentAlign}>

                            <TextInputComponent
                                selectionColor={Colors.white}
                                isVisibleDropDown={false}
                                onPressHide={handleHideShow1}
                                onPressShow={handleHideShow2}
                                isVisibleEye={!isHide}
                                isVisibleEye_={isShow}
                                isVisibleLock={true}
                                marginVertical={hp(1)}
                                width={wp(90)}
                                borderWidth={isFocusedPassword ? ConstValue.value1 : ConstValue.value0}
                                borderColor={isFocusedPassword ? Colors.white : Colors.blue}
                                height={hp(7)}
                                marginTop={hp(2)}
                                isUserHide={false}
                                textfontSize={ConstValue.value15}
                                textfontFamily={Fonts.PoppinsRegular}
                                textlineHeight={ConstValue.value0}
                                ref={refMobile}
                                placeholder={ScreenText.EnterNewYourPassword}
                                editable={true}
                                multiline={false}
                                secureTextEntry={isSecure}
                                isPadding={true}
                                keyboardType='default'
                                textAlign='left'
                                numberOfLines={null}
                                maxLength={null}
                                color={Colors.white}
                                backgroundColor={Colors.grayDark}
                                borderRadius={wp(2)}
                                onFocus={handleFocusPass}
                                onChangeText={handleAccountPassword}
                                onSubmitEditing={() => {
                                    refMobileConfirm?.current?.focus();
                                }}
                                placeholderTextColor={Colors.gray}
                            />

                            {!isValidPassword ?
                                <TextComponent
                                    // marginLeft={wp(4)}
                                    textDecorationLine={'none'}
                                    color={Colors.red}
                                    title={ScreenText.ValidPassword}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    fontFamily={Fonts.PoppinsRegular}
                                />
                                : null}
                        </View>

                        <View style={CommonStyle.commonContentAlign}>
                            <TextInputComponent
                                selectionColor={Colors.white}
                                isVisibleDropDown={false}
                                onPressHide={handleHideShow1Confirm}
                                onPressShow={handleHideShow2Confirm}
                                isVisibleEye={!isHideConfirm}
                                isVisibleEye_={isShowConfirm}
                                isVisibleLock={true}
                                marginVertical={hp(1)}
                                marginHorizontal={wp(5)}
                                width={wp(90)}
                                borderWidth={isFocusedPasswordConfirm ? ConstValue.value1 : ConstValue.value0}
                                borderColor={isFocusedPasswordConfirm ? Colors.white : Colors.blue}
                                height={hp(7)}
                                marginTop={hp(2)}
                                isUserHide={false}
                                textfontSize={ConstValue.value15}
                                textfontFamily={Fonts.PoppinsRegular}
                                textlineHeight={ConstValue.value0}
                                ref={refMobileConfirm}
                                placeholder={ScreenText.EnterConfirmYourPassword}
                                editable={true}
                                multiline={false}
                                secureTextEntry={isSecureConfirm}
                                isPadding={true}
                                keyboardType='default'
                                maxLength={null}
                                textAlign='left'
                                numberOfLines={null}
                                color={Colors.white}
                                backgroundColor={Colors.grayDark}
                                borderRadius={wp(2)}
                                onFocus={handleFocusPassConfirm}
                                onChangeText={handleAccountPasswordConfirm}
                                onSubmitEditing={() => {
                                }}
                                placeholderTextColor={Colors.gray}
                            />
                            {!isValidPasswordConfirm ?
                                <TextComponent
                                    marginLeft={wp(4)}
                                    textDecorationLine={'none'}
                                    color={Colors.red}
                                    title={ScreenText.ValidPassword}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    fontFamily={Fonts.PoppinsRegular}
                                />
                                : null}


                            <View style={{
                                flex: 1,
                                alignSelf: 'center'
                            }}>
                                <ButtonComponent
                                    isVisibleMobile={false}
                                    isVisibleFaceBook={false}
                                    marginVertical={hp(10)}
                                    heightBtn={hp(7)}
                                    widthBtn={wp(90)}
                                    isRightArrow={false}
                                    color={Colors.white}
                                    title={ScreenText.Submit}
                                    onPress={onPressSubmit}
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


                    </View>
                </ScrollView>


            </View>
        </SafeAreaView>
    )
}

export default NewPasswordScreen;