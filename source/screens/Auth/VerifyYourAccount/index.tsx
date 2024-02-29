import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../../components/Button/index';
import HeaderComponent from '../../../components/Header';
import StatusBarComponent from '../../../components/StatusBar';
import TextComponent from '../../../components/Text';
import { Colors, Fonts, Images } from '../../../themes/index';
import { useTheme } from '../../../utils/ThemeContext';
import CommonStyle from '../../../utils/commonStyle';
import NetworkUtils from '../../../utils/commonfunction';
import { ScreenText } from '../../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}

const VerifyYourScreen = ({ route, navigation }) => {

    // const navigation = useNavigation();

    const { isDarkMode, toggleTheme } = useTheme();


    const [isClick, setIsClick] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);

    const [isMobileColorText, setMobileColorText] = useState(true);
    const [isEmailColorText, setEmailColorText] = useState(true);

    const [isMobileType, setMobileType] = useState(true);
    const [isEmailType, setEmailType] = useState(true);

    const [isGetMobile, setMobile] = useState('');
    const [isGetEmail, setEmail] = useState('');

    let user_mobilenumber;
    let user_email;
    let user_mobilenumberStatus;
    let user_emailStatus;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get User Id Here & Store
                const userId = route?.params?.itemAccountUserId;
                if (userId) {
                    await storeAccountId(userId);
                }
                // Get User In User Info
                await axiosPostRequestUserGetInfo();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Set interval to refresh every 1 seconds
        const intervalId = setInterval(fetchData, 1 * 1000);

        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, [route?.params?.itemAccountUserId]);


    const storeAccountId = async (storeid: any) => {
        try {
            await AsyncStorage.setItem('user_id', JSON.stringify(storeid));
            console.log('user_id===>', JSON.stringify(storeid));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_id :', error);
        }
    }

    const axiosPostRequestUserGetInfo = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostSetDataGetInfo();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostSetDataGetInfo = async () => {

        const storedLinkedId = await AsyncStorage.getItem('user_id');
        if (storedLinkedId !== null) {
            const url = 'https://rideshareandcourier.graphiglow.in/api/userInfo/userInfo';

            // Prepare data in JSON format
            const data = {
                id: JSON.parse(storedLinkedId),
            };

            console.log("axiosPostSetDataGetInfo==>", data);

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200 &&
                        response?.data?.message === 'User Information') {

                        user_mobilenumber = response?.data?.matchingUsers[0]?.mobilenumber;
                        user_email = response?.data?.matchingUsers[0]?.email;

                        // Set Status 
                        user_mobilenumberStatus =
                            response?.data?.matchingUsers[0]?.mobilenumberStatus;
                        console.log("user_mobilenumberStatus", user_mobilenumberStatus);

                        user_emailStatus =
                            response?.data?.matchingUsers[0]?.emailStatus;
                        console.log("user_emailStatus", user_emailStatus);

                        if (user_mobilenumberStatus === "Deactive") {
                            setMobileColorText(true);
                            setMobileType(true);
                        } else {
                            setMobileColorText(false);
                            setMobileType(false);
                        }

                        if (user_emailStatus === "Deactive") {
                            setEmailColorText(true);
                            setEmailType(true);
                        } else {
                            setEmailColorText(false);
                            setEmailType(false);
                        }

                        if (user_mobilenumberStatus === "Verify"
                            && user_emailStatus === "Verify") {
                            setIsClick(!isClick)
                            setIsDisabled(!isDisabled)
                        } else {
                            setIsClick(isClick)
                            setIsDisabled(isDisabled)
                        }

                        // Set Data 
                        setMobile(user_mobilenumber);
                        setEmail(user_email);

                        // Handle API response here
                        // Toast.show("User Information Get Successfully!", Toast.SHORT);
                    } else {
                        // Toast.show('User Information Credentials Invalid', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Handle errors
                    // Toast.show('User Information Credentials Invalid!', Toast.SHORT);
                });
        } else {

        }
    }


    const onPressRegisterUser = () => {

        // Toast.show("Register Successfully!", Toast.SHORT);
        navigation.navigate("Home1");

        // if (isMobileColorText === true && isEmailColorText === true) {
        //     Toast.show("Kindly Verify Your Account Details For Continued Access.", Toast.SHORT);
        // } else {
        //     setIsClick(false);
        //     setIsDisabled(false);
        //     Toast.show("Register Successfully!", Toast.SHORT);
        // }
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
                    borderRadiusOpacity={wp(10)} // arrowRightWhite
                    paddingOpacity={wp(2)}
                    textAlign={"center"}
                    transform={[{ rotate: '180deg' }]}
                    // transform={isDarkMode === 'dark' ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }]}
                    source={isDarkMode === 'dark' ? Images.arrowRight : Images.arrowRightWhite}
                    width={wp(7)}
                    height={wp(7)}
                    color={Colors.lightBlack} // lightBlack
                    fontFamily={Fonts.InterRegular}
                    fontWeight="500"
                    title={""}
                    fontSize={wp(4)}
                    onPress={() => navigation.goBack()} //09
                />
                <View>

                </View>
                <View style={Styles.viewFirstConatiner}>

                    <TextComponent
                        color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                        title={ScreenText.VerifyYourAccount}
                        textDecorationLine={'none'}
                        fontWeight="700"
                        fontSize={wp(6)}
                        marginTop={(hp(10))}
                        fontFamily={Fonts.PoppinsRegular}
                        textAlign='left'
                    />
                    <TextComponent
                        color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                        title={ScreenText.WelcomeInfo}
                        textDecorationLine={'none'}
                        fontWeight="400"
                        fontSize={wp(3.5)}
                        marginVertical={wp(5)}
                        fontFamily={Fonts.PoppinsRegular}
                        textAlign='left'
                    />

                    <View style={CommonStyle.commonRow}>
                        <TouchableOpacity
                            activeOpacity={0}>
                            {isDarkMode === 'dark' ?
                                <Image
                                    source={Images.accountMobile}
                                    style={Styles.imageSearchIcon}
                                    resizeMode="contain" /> : <Image
                                    source={Images.accountMobileWhite}
                                    style={Styles.imageSearchIcon}
                                    resizeMode="contain" />}
                        </TouchableOpacity>
                        <View>
                            <TextComponent
                                color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                title={ScreenText.MobileVerification}
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(3.5)}
                                marginHorizontal={wp(5)}
                                marginTop={wp(2.5)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='left'
                            />
                            <TextComponent
                                color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                isTextEnd={true}
                                sizeEnd={wp(3.5)}
                                colorEnd={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                // endtext={route?.params?.itemAccountMobile}
                                // title={route?.params?.itemAccountMobile}
                                title={isGetMobile}
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(3)}
                                marginVertical={wp(1)}
                                marginHorizontal={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>
                        <View style={Styles.viewSecondConatiner}>
                            <TextComponent
                                color={isMobileColorText ? Colors.red : Colors.greenDark}
                                title={isMobileType ? ScreenText.Verify : ScreenText.Verified}
                                // onPress={() => navigation.navigate('MobileVerfication', {
                                //     itemOTPNumber: isGetMobile,
                                // })} //09
                                onPress={() => {
                                    if (isMobileType) {
                                        navigation.navigate('MobileVerfication', {
                                            itemOTPNumber: isGetMobile,
                                        });
                                    }
                                }}
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(3)}
                                marginTop={wp(2.5)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='right'
                            />
                        </View>

                    </View>
                    <View style={Styles.accountEmail}>
                        <TouchableOpacity
                            activeOpacity={0}>
                            {isDarkMode === 'dark' ? <Image
                                source={Images.accountEmail}
                                style={Styles.imageSearchIcon}
                                resizeMode="contain" /> : <Image
                                source={Images.accountEmailWhite}
                                style={Styles.imageSearchIcon}
                                resizeMode="contain" />}
                        </TouchableOpacity>
                        <View>
                            <TextComponent
                                color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                title={ScreenText.EmailVerification}
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(3.5)}
                                marginHorizontal={wp(5)}
                                marginTop={wp(3.5)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='left'
                            />
                            <TextComponent
                                color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                isTextEnd={true}
                                sizeEnd={wp(2)}
                                colorEnd={isDarkMode === 'dark' ? Colors.white : Colors.black}
                                // title={route?.params?.itemAccountEmail}
                                title={isGetEmail}
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(3)}
                                marginVertical={wp(1)}
                                marginHorizontal={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>
                        <View style={Styles.viewVerfiyAccount}>
                            <TextComponent
                                color={isEmailColorText ? Colors.red : Colors.greenDark}
                                title={isEmailType ? ScreenText.Verify : ScreenText.Verified}
                                // onPress={() => navigation.navigate('EmailVerfication', {
                                //     itemSentEmail: isGetEmail,
                                // })} //09
                                onPress={() => {
                                    if (isEmailType) {
                                        navigation.navigate('EmailVerfication', {
                                            itemSentEmail: isGetEmail,
                                        });
                                    }
                                }}
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(3)}
                                marginTop={wp(2.5)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='right'
                            />
                        </View>

                    </View>

                    <View style={Styles.buttonContinue}>
                        <ButtonComponent
                            isVisibleMobile={false}
                            isVisibleFaceBook={false}
                            heightBtn={hp(7)}
                            widthBtn={wp(90)}
                            isRightArrow={false}
                            opacity={isClick ? 0.5 : 1}
                            disabled={isDisabled}
                            color={Colors.white}
                            title={ScreenText.Continue}
                            // marginHorizontal={wp(4)}
                            onPress={onPressRegisterUser}
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
        </SafeAreaView>
    )

}

export default VerifyYourScreen;
