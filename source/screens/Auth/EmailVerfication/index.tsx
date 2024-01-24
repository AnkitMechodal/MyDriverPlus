import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { Linking, SafeAreaView, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
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

const EmailVerficationScreen = ({ route, navigation }) => {
    // const navigation = useNavigation();


    const { isDarkMode, toggleTheme } = useTheme();


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



    let user__id;

    const [isFocusedPassword, setIsFocusedPassword] = useState(false);

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

    useEffect(() => {
        // Get User Id Here & Store
        storeAccountEmail(route?.params?.itemSentEmail);

        // Get User In User Info
        axiosPostRequestEmailGetInfo();

    });

    const storeAccountEmail = async (storeemaillink: any) => {
        try {
            await AsyncStorage.setItem('user_email_link', JSON.stringify(storeemaillink));
            console.log('user_email_link===>', JSON.stringify(storeemaillink));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_id :', error);
        }
    }


    const storeEmailId = async (userid: any) => {
        try {
            await AsyncStorage.setItem('user_send_id', JSON.stringify(userid));
            console.log('user_send_id===>', JSON.stringify(userid));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_id :', error);
        }
    }

    const axiosPostRequestEmailGetInfo = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostSetEmailData();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostSetEmailData = async () => {

        const storedLinkedId = await AsyncStorage.getItem('user_email_link');
        if (storedLinkedId !== null) {
            const url = 'https://rideshareandcourier.graphiglow.in/api/email_detail/details';

            // Prepare data in JSON format
            const data = {
                email: JSON.parse(storedLinkedId),
            };

            console.log("axiosPostSetEmailData==>", data);

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    //  response?.data?.message === 'User details found'
                    if (response.status === 200 &&
                        response?.data?.message === 'User details found') {

                        user__id = response?.data?.user?._id;
                        storeEmailId(user__id);

                        // Handle API response here
                        Toast.show("Email Information Get Successfully!", Toast.SHORT);
                    } else {
                        Toast.show('Email Information Credentials Invalid', Toast.SHORT);
                    }
                })
                .catch(error => {
                    console.log("user__id==>", error);
                    // Handle errors
                    Toast.show('Email Information Credentials Invalid!', Toast.SHORT);
                });
        } else {

        }
    }


    const onPressGoToMail = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostRequestSendOTPEmail();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostRequestSendOTPEmail = async () => {

        const storedSendLinkedId = await AsyncStorage.getItem('user_send_id');

        if (storedSendLinkedId !== null) {
            const url = 'https://rideshareandcourier.graphiglow.in/api/usersEmailLink/sendLink';

            // Prepare data in JSON format
            const data = {
                email: route?.params?.itemSentEmail,
                link: JSON.parse(storedSendLinkedId) // get store send link - quick
            };

            console.log("axiosPostRequestOTPSMS==>", JSON.stringify(data, null, 2));

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

                //  response?.data?.message === 'Email sent successfully.'
                .then(response => {
                    if (response.status === 200 &&
                        response?.data?.data.message === 'Email sent successfully.') {

                        // console.log("Response==>", JSON.stringify(response, null, 2));

                        Linking.openURL(`mailto:${route?.params?.itemSentEmail}`)

                        // Handle API response here
                        Toast.show("Email Verification Successfully!", Toast.SHORT);
                        //navigation.goBack();
                    } else {
                        Toast.show('Email Verification Failed!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Email Verification Failed!', Toast.SHORT);
                });
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
                    borderRadiusOpacity={wp(10)}
                    paddingOpacity={wp(2)}
                    textAlign={"center"}
                    transform={isDarkMode === 'dark' ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }]}
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
                <View style={Styles.verficationContainer}>
                    <View>
                        <TextComponent
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            title={ScreenText.Verification}
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
                            colorEnd={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            endtext={route?.params?.itemSentEmail}
                            title={ScreenText.GoToMail}
                            textDecorationLine={'none'}
                            fontWeight="500"
                            fontSize={wp(3.5)}
                            marginHorizontal={wp(3)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='center'
                        />
                    </View>

                    <View>
                        <TextComponent
                            color={Colors.white}
                            isTextEnd={true}
                            sizeEnd={wp(3.5)}
                            colorEnd={Colors.blue}
                            endtext={ScreenText.GoToMailbox}
                            onPress={onPressGoToMail}
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



            </View>
        </SafeAreaView>
    )
}

export default EmailVerficationScreen;