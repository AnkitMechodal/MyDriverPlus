import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app'; // todo
import auth from '@react-native-firebase/auth'; // todo
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Image, ImageBackground, SafeAreaView, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'; // todo
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../../components/Button';
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

const LoginSignUpScreen = (props: Props) => {
    // const isDarkMode = useisDarkMode();

    let user_register_id;

    const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp({
                // Your Firebase configuration
                apiKey: "AIzaSyCyvLIfzdGJy7CgBFt59OPwXpleRT_yhsk",
                authDomain: "ride-share-bca91.firebaseapp.com",
                projectId: "ride-share-bca91",
                storageBucket: "ride-share-bca91.appspot.com",
                messagingSenderId: "751449154638",
                appId: "1:751449154638:android:aca811b53e237297120f1f"
            });
        }

    }, []);


    useEffect(() => {
        const checkAutoLogin = async () => {
            // Initialize GoogleSignin when the component mounts

            // Check Autologin
            const storedLinkedId = await AsyncStorage.getItem('user_register_id');
            console.log('storedLinkedId' + storedLinkedId);

            // Check if storedLinkedId is null, empty, or undefined
            if (storedLinkedId === null || storedLinkedId === '' || storedLinkedId === undefined) {
                // Auto-login is not possible, handle the logic accordingly
                console.log('Auto-login is not possible');
                // props.navigation.navigate('Home1');
            } else {
                // Auto-login is possible, you can proceed with the login logic
                console.log('Auto-login is possible');
                props.navigation.navigate('Home1');
            }
        };
        checkAutoLogin();

    }, []);



    let GoogleEmail;
    let GoogleName;

    const SignInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.configure({
                webClientId: '794495424305-lp5pu88oltmglilm5sv31qhi869jocr6.apps.googleusercontent.com',
            });
            const user = await GoogleSignin.signIn();

            GoogleEmail = user?.user?.email;
            GoogleName = user?.user?.name;

            console.log("GoogleEmail===>", GoogleEmail);
            console.log("GoogleEmail===>", GoogleEmail);

            console.log("GoogleName===>", GoogleName);
            console.log("GoogleName===>", GoogleName);

            try {
                const isConnected = await NetworkUtils.isNetworkAvailable()
                if (isConnected) {

                    const storedLinkedId = await AsyncStorage.getItem('user_register_id');
                    if (storedLinkedId === null || storedLinkedId === '' || storedLinkedId === undefined) {

                        await AsyncStorage.clear();
                        await GoogleSignin.revokeAccess();
                        await GoogleSignin.signOut();
                        await auth().signOut(); // FACEBOOK

                        // TODO : REG EMAIL IS ALREADY OR NOT API
                        // YES - GoogleSignUp
                        // NO - API CALL MESSAGE - IS ALREADY REGISTER PLEASE USE OTHER

                        axiosPostRequestGoogleEmail(GoogleEmail);

                    } else {
                        props.navigation.navigate('Home1');
                    }


                } else {
                    Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
                }
            } catch (error) {
                Toast.show("axios error", Toast.SHORT);
            }

        } catch (error: any) {
            console.log("error===>", error);
        }
    };


   
    const axiosPostRequestGoogleEmail = async (GoogleEmail) => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/userInfo/userInfo';

        // Prepare data in JSON format
        const data = {
            email: GoogleEmail,
        };

        console.log("Google===>", data);

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

                    // LOGIN  API CALL FOR REG USER
                    axiosPostRequestEmail(GoogleEmail);

                } else {
                    props.navigation.navigate('GoogleSignUp', {
                        itemGoogleEmail: GoogleEmail,
                        itemGoogleName: GoogleName
                    });

                }
            })
            .catch(error => {
                // Handle errors
                props.navigation.navigate('GoogleSignUp', {
                    itemGoogleEmail: GoogleEmail,
                    itemGoogleName: GoogleName
                });
            });

    };

    const axiosPostRequestEmail = async (GoogleEmail) => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/login/login';

        // Prepare data in JSON format
        const data = {
            email: GoogleEmail,
        };

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async response => {
                if (response.status == 200
                    &&
                    response?.data?.message === "Login successful") {

                    // Get User ID :
                    user_register_id = response?.data?.user?._id;
                    storeLoginMobileId(user_register_id);

                    props.navigation.navigate("Home1");

                } else if (response?.data?.error === 'Please verify email and mobile number before logging in') {
                    Toast.show('Google Login Failed!', Toast.SHORT);

                    // email passing 
                    props.navigation.navigate('VerifyYourAccountMail', {
                        itemEmailMail: GoogleEmail
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

    }


    const storeLoginMobileId = async (user_register_id: any) => {
        try {
            await AsyncStorage.setItem('user_register_id', JSON.stringify(user_register_id));
            console.log('user_register_id===>', JSON.stringify(user_register_id));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error user_register_id :', error);
        }
    }

    // working - fb - 01-03-2024
    const onFacebookButtonPress = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                throw new Error('User cancelled the login process');
            }

            // Once signed in, get the user's AccessToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw new Error('Something went wrong obtaining access token');
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);


            // Sign-in the user with the credential
            const userCredential = await auth().signInWithCredential(facebookCredential);
            console.log(JSON.stringify(userCredential, null, 2));


            console.log("userCredential-NAME", userCredential.additionalUserInfo?.profile?.name);
            console.log("userCredential-EMAIL", userCredential.user?.email);
            console.log("userCredential-NUMBER", userCredential.user?.phoneNumber);

            Toast.show("Logged In Via Facebook!", Toast.SHORT);

            // try {
            //     const isConnected = await NetworkUtils.isNetworkAvailable()
            //     if (isConnected) {

            //         const storedLinkedId = await AsyncStorage.getItem('user_register_id');
            //         if (storedLinkedId === null || storedLinkedId === '' || storedLinkedId === undefined) {

            //             await AsyncStorage.clear();
            //             await GoogleSignin.revokeAccess();
            //             await GoogleSignin.signOut();
            //             await auth().signOut(); // FACEBOOK

            //             // TODO : REG EMAIL IS ALREADY OR NOT API
            //             // YES - GoogleSignUp
            //             // NO - API CALL MESSAGE - IS ALREADY REGISTER PLEASE USE OTHER

            //             // axiosPostRequestGoogleEmail(GoogleEmail);
            //             // axiosPostRequestFacebookEmail(userCredential.user?.email);

            //         } else {
            //             props.navigation.navigate('Home1');
            //         }


            //     } else {
            //         Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            //     }
            // } catch (error) {
            //     Toast.show("axios error", Toast.SHORT);
            // }


            props.navigation.navigate('FacebookSignUp', {
                itemGoogleEmail: userCredential.user?.email,
                itemGoogleName: userCredential.additionalUserInfo?.profile?.name
            });


        } catch (error: any) {
            console.error(error.message);
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
                <ImageBackground source={Images.mapLoginBackground}
                    style={CommonStyle.commonFlex}>
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

                    {isDarkMode === 'dark' ? <Image
                        style={Styles.imageStrokeIcon}
                        resizeMode="contain"
                        source={Images.strokeIcon} /> : <Image
                        style={Styles.imageStrokeIcon}
                        resizeMode="contain"
                        source={Images.strokeIconWhite} />}

                    <Image
                        style={Styles.imageLocationIcon}
                        resizeMode="contain"
                        source={Images.locationIcon} />

                </ImageBackground>
                {/* Styles.bottamContainer */}
                <View style={{
                    flex: 1,
                    backgroundColor: isDarkMode === 'dark' ? Colors.black : Colors.white,
                    margin: hp(2)
                }}>
                    <View>
                        <TextComponent
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            title={ScreenText.Welcome} //24...
                            textDecorationLine={'none'}
                            fontWeight="700"
                            fontSize={wp(4)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                            marginVertical={hp(2)}
                        />
                        <TextComponent
                            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            title={ScreenText.WelcomeInfo}
                            // onPress={toggleTheme} //apptest
                            textDecorationLine={'none'}
                            fontWeight="700"
                            fontSize={wp(4)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                        />
                    </View>

                    <View style={CommonStyle.commonRow}>
                        <ButtonComponent
                            isVisibleMobile={true}
                            marginVertical={hp(5)}
                            heightBtn={hp(7)}
                            widthBtn={wp(65)}
                            isRightArrow={false}
                            onPress={() => props.navigation.navigate("LoginWithMobile")}
                            color={Colors.white}
                            title={ScreenText.LoginWithMobile}
                            fontWeight="600"
                            fontSize={wp(4)}
                            fontFamily={Fonts.PoppinsRegular}
                            alignSelf='center'
                            textAlign='center'
                            borderRadius={wp(2)}
                            backgroundColor={Colors.blue}
                        />

                        {isDarkMode === 'dark' ?
                            <ButtonComponent
                                isVisibleMobile={false}
                                borderColor={Colors.white}
                                onPress={() => props.navigation.navigate("LoginWithMail")}
                                isVisibleMail={true}
                                marginHorizontal={wp(4)}
                                borderWidth={1}
                                marginVertical={hp(5)}
                                heightBtn={hp(7)}
                                widthBtn={wp(20)}
                                isRightArrow={false}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                backgroundColor={Colors.grayDark}
                            /> :
                            <ButtonComponent
                                isVisibleMobile={false}
                                borderColor={Colors.blue}
                                onPress={() => props.navigation.navigate("LoginWithMail")}
                                isVisibleMailWhite={true}
                                marginHorizontal={wp(4)}
                                borderWidth={1}
                                marginVertical={hp(5)}
                                heightBtn={hp(7)}
                                widthBtn={wp(20)}
                                isRightArrow={false}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                backgroundColor={Colors.whiteMail}
                            />}

                        {/* <ButtonComponent
                            isVisibleMobile={false}
                            borderColor={Colors.white}
                            onPress={() => props.navigation.navigate("LoginWithMail")}
                            isVisibleMail={false}
                            marginHorizontal={wp(4)}
                            borderWidth={1}
                            marginVertical={hp(5)}
                            heightBtn={hp(7)}
                            widthBtn={wp(20)}
                            isRightArrow={false}
                            alignSelf='center'
                            textAlign='center'
                            borderRadius={wp(2)}
                            backgroundColor={isDarkMode === 'dark' ? Colors.grayDark : Colors.whiteMail}
                        /> */}
                    </View>

                    <View style={CommonStyle.commonRow}>
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

                    <View>

                        {isDarkMode === 'dark' ? (
                            <Image
                                style={Styles.imageBreakIcon}
                                resizeMode="contain"
                                source={Images.breakLineIcon} />) :

                            <Image
                                style={Styles.imageBreakIcon}
                                resizeMode="contain"
                                source={Images.breakLineIconWhite} />
                        }

                    </View>

                    <View style={CommonStyle.commonRow}>
                        <ButtonComponent
                            isVisibleMobile={false}
                            isVisibleMail={false}
                            heightBtn={hp(7)}
                            widthBtn={wp(45)}
                            isRightArrow={false}
                            isVisibleGoogle={true}
                            borderColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                            alignSelf='center'
                            textAlign='center'
                            borderRadius={wp(2)}
                            color={Colors.black}
                            borderWidth={1}
                            fontSize={wp(5)}
                            title={ScreenText.Google}
                            backgroundColor={Colors.white}
                            marginLeft={wp(2)}
                            onPress={SignInWithGoogle}
                            fontFamily={Fonts.PoppinsSemiBold}
                        />
                        <View>
                            {/* <LoginButton
                                style={{
                                    width: wp(45),
                                    height: hp(7),
                                    alignSelf: 'center',
                                    marginHorizontal: wp(2),
                                    backgroundColor: Colors.facebookBackground,
                                    borderRadius: wp(2)
                                }}
                                onLoginFinished={handleLogin}
                            /> */}
                            <ButtonComponent
                                isVisibleMobile={false}
                                isVisibleMail={false}
                                isVisibleFaceBook={true}
                                heightBtn={hp(7)}
                                widthBtn={wp(45)}
                                marginHorizontal={wp(2)}
                                isRightArrow={false}
                                isVisibleGoogle={false}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                fontWeight={"700"}
                                color={Colors.white}
                                fontSize={wp(5)}
                                title={ScreenText.Facebook}
                                backgroundColor={Colors.facebookBackground}
                                marginLeft={wp(2)}
                                onPress={onFacebookButtonPress}
                                fontFamily={Fonts.InterRegular}
                            />
                        </View>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
}
export default LoginSignUpScreen;
