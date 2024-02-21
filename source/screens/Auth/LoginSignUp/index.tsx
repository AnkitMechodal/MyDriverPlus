// import {
//     GoogleSignin,
//     statusCodes
// } from '@react-native-community/google-signin';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Alert, Image, ImageBackground, SafeAreaView, View } from 'react-native';
// import { AccessToken, GraphRequest, GraphRequestManager, LoginButton } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { AccessToken } from 'react-native-fbsdk-next';
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

        // // Set interval to refresh every 10 seconds
        // const intervalId = setInterval(checkAutoLogin, 5 * 1000);

        // // Cleanup function
        // return () => {
        //     // Clear the interval when the component unmounts
        //     clearInterval(intervalId);
        // };

    }, []);


    // useEffect(() => {
    //     // Initialize GoogleSignin when the component mounts 
    //     GoogleSignin.configure({
    //         scopes: ['email', 'profile'],
    //         webClientId: 'YOUR_WEB_CLIENT_ID',
    //         // Replace with your web client ID
    //     });
    // }, []);


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

    async function fb_login() {
        let cred = await handleButtonClick();
        console.log("cred==>", cred);
    }

    const handleButtonClick = async () => {
        console.log("cred==>");

        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            console.log("DATA==>", data);
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    };

    // const SignInWithGoogle = async () => { // working !
    //     try {
    //         await GoogleSignin.revokeAccess();
    //         await GoogleSignin.signOut();
    //         // setUserInfo(null);
    //     } catch (error: any) {
    //         console.log("error===>", error);
    //     }
    // };

    // const SignInWithGoogle = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log(userInfo); // You can now use userInfo to authenticate the user in your app.
    //     } catch (error: any) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) { // The user canceled the sign-in process 
    //         } else if (error.code === statusCodes.IN_PROGRESS) { // A sign-in process is already in progress
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) { // Play services are not available } else { // Some other error occurred console.error(error); } }

    //         }
    //     }
    // }


    /// FB - 23

    const handleLogin = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            console.log("DATA==>", data);
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    // const handleLogin = async () => {
    //     try {
    //         // Attempt to log in with Facebook
    //         const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    //         if (result.isCancelled) {
    //             Alert.alert('Login Cancelled', 'Login with Facebook was cancelled.');
    //         } else {
    //             // Get the access token after successful login
    //             const data = await AccessToken.getCurrentAccessToken();
    //             if (data) {
    //                 const accessToken = data.accessToken.toString();
    //                 Alert.alert('Access Token', accessToken);

    //                 // Use the accessToken to make a request for user information
    //                 const responseInfoCallback = (error, result) => {
    //                     if (error) {
    //                         console.log(error);
    //                         Alert.alert('Error Fetching Data', 'Error fetching data: ' + error.toString());
    //                     } else {
    //                         console.log(result);
    //                         Alert.alert(
    //                             'Success Fetching Data',
    //                             'Success fetching data: ' + JSON.stringify(result)
    //                         );
    //                     }
    //                 };

    //                 const infoRequest = new GraphRequest(
    //                     '/me',
    //                     {
    //                         accessToken: accessToken,
    //                         parameters: {
    //                             fields: {
    //                                 string: 'email,name,first_name,middle_name,last_name',
    //                             },
    //                         },
    //                     },
    //                     responseInfoCallback
    //                 );

    //                 // Start the graph request.
    //                 new GraphRequestManager().addRequest(infoRequest).start();
    //             } else {
    //                 Alert.alert('Error', 'Failed to get access token.');
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error during Facebook login:', error);
    //         // const newUUID = uuidv4();
    //         // console.log('Generated UUID:', newUUID);
    //     }
    // };

    // const handleLogin = (error, result) => {
    //     if (error) {
    //         Alert.alert("Login Error", "Login has error: " + result.error);
    //     } else if (result.isCancelled) {
    //         Alert.alert("Login Cancelled", "Login is cancelled.");
    //     } else {
    //         AccessToken.getCurrentAccessToken().then((data) => {
    //             let accessToken = data.accessToken;
    //             Alert.alert("Access Token", accessToken.toString());

    //             const responseInfoCallback = (error, result) => {
    //                 if (error) {
    //                     console.log(error);
    //                     Alert.alert('Error Fetching Data', 'Error fetching data: ' + error.toString());
    //                 } else {
    //                     console.log(result);
    //                     Alert.alert('Success Fetching Data', 'Success fetching data: ' + JSON.stringify(result));
    //                 }
    //             };

    //             const infoRequest = new GraphRequest(
    //                 '/me',
    //                 {
    //                     accessToken: accessToken,
    //                     parameters: {
    //                         fields: {
    //                             string: 'email,name,first_name,middle_name,last_name'
    //                         }
    //                     }
    //                 },
    //                 responseInfoCallback
    //             );

    //             // Start the graph request.
    //             new GraphRequestManager().addRequest(infoRequest).start();
    //         });
    //     }
    // };


    // const handleLogin = async () => {
    //     try {
    //         // Perform Facebook login
    //         const loginResult = await LoginManager.logInWithPermissions(["public_profile", "email"]);

    //         if (loginResult.isCancelled) {
    //             Alert.alert("Login Cancelled " + JSON.stringify(loginResult));
    //         } else {
    //             // If login was successful, fetch user data including email
    //             const accessToken = loginResult.accessToken?.toString();

    //             if (accessToken) {
    //                 // Simulate fetching user data from an API
    //                 const response = await fetch(`https://api.example.com/user/${loginResult.userId}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${accessToken}`,
    //                     },
    //                 });
    //                 const userData = await response.json();

    //                 // Extract email from user data
    //                 const userEmail = userData.email;

    //                 // Display success alerts
    //                 Alert.alert("Login Success with permissions");
    //                 Alert.alert("Login Success " + JSON.stringify(loginResult));
    //                 Alert.alert("User Email: " + userEmail);
    //             } else {
    //                 Alert.alert("Error fetching access token");
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Login Error: ", error);
    //     }
    // };

    class LoginManager {
        static async logInWithPermissions(permissions: any) {
            // Simulate a delay to mimic the asynchronous nature of the login process
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate a random result
            const isCancelled = Math.random() < 0.5;

            if (isCancelled) {
                return { isCancelled: true, errorMessage: "Login was cancelled" };
            } else {
                // return { isCancelled: false, userId: "123456", accessToken: "abc123" };

                const userId = Math.floor(Math.random() * 1000000).toString();
                const accessToken = generateRandomToken();
                Alert.alert(accessToken)

                return { isCancelled: false, userId, accessToken };
            }
        }
    }

    function generateRandomToken() {
        // Implement your logic to generate a random or dynamic access token
        // For simplicity, you can use a library like uuid to generate a unique token
        // npm install uuid
        const uuid = require('uuid');
        return uuid.v4();
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
                                onPress={fb_login}
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
