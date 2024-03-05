import axios from "axios";
import React, { useRef, useState } from 'react';
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
import NetworkUtils, { validateIsEmail } from '../../../utils/commonfunction';
import { API, ConstValue, ScreenText } from '../../../utils/index';
import Styles from './style';


type Props = {
    navigation: any
}

const CreateNewPasswordScreen = ({ route, navigation }) => {

    const { isDarkMode, toggleTheme } = useTheme(); //TEST

    const refPassword = useRef<any>(null);

    const [email, setEmail] = useState('')
    const [isValidEmail, setValidEmail] = useState(true);


    const [isValidPassword, setValidPassword] = useState(true);
    const [isValidPasswordConfirm, setValidPasswordConfirm] = useState(true);


    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] = useState(false);

    const refMobile = useRef<any>(null);
    const refMobileConfirm = useRef<any>(null);

    const [pass, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')




    const [isSecure, setSecure] = useState(true);
    const [isShow, setShow] = useState(false);
    const [isHide, setHide] = useState(false);



    const [isSecureConfirm, setSecureConfirm] = useState(true);
    const [isShowConfirm, setShowConfirm] = useState(false);
    const [isHideConfirm, setHideConfirm] = useState(false);

    const handleFocus = () => {
        setIsFocused(true)
    }


    const handleFocusPassConfirm = () => {
        setIsFocusedPasswordConfirm(true)
    }

    const handleFocusPass = () => {
        setIsFocusedPassword(true)
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



    const axiosPostRequestSubmitConfirm = async () => {
        // const url = 'https://rideshareandcourier.graphiglow.in/api/forgetPassword/resetPassword';
        const url = `${API.BASE_URL}/forgetPassword/resetPassword`;

        // Prepare data in JSON format
        const data = {
            email: route?.params?.itemEmailReset,
            password: pass,
            newPassword: passConfirm
        };

        console.log("axiosPostRequestSubmitConfirm", data);

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    && response?.data?.message === 'Password reset successfully') {
                    Toast.show('Success! Your Password Has Been Reset Successfully!', Toast.SHORT);
                    navigation.navigate("LoginSignUp")
                } else {
                    Toast.show('Password Credentials Invalid', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                Toast.show('Password Credentials Invalid!', Toast.SHORT);
            });
    };

    const onPressSubmit = async () => {
        if (pass === '') {
            Toast.show("New Password Field Is Required", Toast.SHORT);
        } else if (pass.length < 6) {
            Toast.show("Please Enter Minimum 6 Digit Password", Toast.SHORT);
        } else if (passConfirm === '') {
            Toast.show("Confirm New Password Field Is Required", Toast.SHORT);
        } else if (passConfirm.length < 6) {
            Toast.show("Please Enter Minimum 6 Digit Confirm Password", Toast.SHORT);
        } else if (pass !== passConfirm) {
            Toast.show("Passwords Do Not Match. Please try again.", Toast.SHORT);
        } else {
            // Toast.show("Done", Toast.SHORT);
            // props.navigation.navigate("LoginSignUp")
            try {
                const isConnected = await NetworkUtils.isNetworkAvailable()
                if (isConnected) {
                    axiosPostRequestSubmitConfirm();
                } else {
                    Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
                }
            } catch (error) {
                Toast.show("axios error", Toast.SHORT);
            }
        }
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
                    transform={[{ rotate: '180deg' }]}
                    borderRadiusOpacity={wp(10)}
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

                <View style={Styles.forgorConatiner}>
                    <View>
                        <TextComponent
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            title={ScreenText.ForgotPassword}
                            textDecorationLine={'none'}
                            fontWeight="700"
                            fontSize={wp(5)}
                            // marginHorizontal={wp(4)}
                            fontFamily={Fonts.PoppinsRegular}
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
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                        />
                    </View>
                    <View>
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
                            color={Colors.white}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark :
                                Colors.whiteGray}
                            borderRadius={wp(2)}
                            onFocus={handleFocusPass}
                            onChangeText={handleAccountPassword}
                            onSubmitEditing={() => {
                                refMobileConfirm?.current?.focus();
                            }}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.gray : Colors.grayDark}
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

                    <View>
                        <TextInputComponent
                            selectionColor={Colors.white}
                            isVisibleDropDown={false}
                            onPressHide={handleHideShow1Confirm}
                            onPressShow={handleHideShow2Confirm}
                            isVisibleEye={!isHideConfirm}
                            isVisibleEye_={isShowConfirm}
                            isVisibleLock={true}
                            marginVertical={hp(1)}
                            // marginHorizontal={wp(3)}
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
                            textAlign='left'
                            numberOfLines={null}
                            color={Colors.white}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark :
                                Colors.whiteGray}
                            borderRadius={wp(2)}
                            onFocus={handleFocusPassConfirm}
                            onChangeText={handleAccountPasswordConfirm}
                            onSubmitEditing={() => {
                            }}
                            placeholderTextColor={isDarkMode === 'dark' ? Colors.gray : Colors.grayDark}
                        />
                        {!isValidPasswordConfirm ?
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
                </View>

                <View style={Styles.buttonSubmit}>
                    <ButtonComponent
                        isVisibleMobile={false}
                        isVisibleFaceBook={false}
                        marginVertical={hp(5)}
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
        </SafeAreaView>
    )
}

export default CreateNewPasswordScreen;