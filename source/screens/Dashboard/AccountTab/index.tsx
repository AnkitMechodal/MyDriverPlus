import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, Image, Linking, SafeAreaView, TouchableOpacity, View } from 'react-native';
import {
    RewardedAdEventType,
    RewardedInterstitialAd
} from 'react-native-google-mobile-ads';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import ButtonComponent from '../../../components/Button';
import StatusBarComponent from '../../../components/StatusBar';
import TextComponent from '../../../components/Text';
import { Colors, Fonts, Images } from '../../../themes/index';
import { ConstValue, ScreenText } from '../../../utils';
import CommomStyle from "../../../utils/commonStyle";
import NetworkUtils from '../../../utils/commonfunction';
import Styles from './style';

type Props = {
    navigation: any
}
const adUnitId = __DEV__
    ? 'ca-app-pub-4105644791348608/6058319224'
    : 'ca-app-pub-4105644791348608/6058319224';

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});
const AccountTab = (props: Props) => {

    const [loaded, setLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [UserEmail, setUserEmail] = useState('');
    const [User, setUser] = useState('');

    const [isAdShow, setAdShow] = useState(false);
    const [isConatin, setIsConatin] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        getData();
        AdShow();
    }, [loaded]);

    useEffect(() => {
        let StoreUser = AsyncStorage.getItem("email");
        if (StoreUser !== null) {
            const backAction = () => {
                navigation.dispatch(
                    CommonActions.navigate({
                        name: "Save",
                    })
                )
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove();
        } else {
            const backAction = () => {

                navigation.dispatch(
                    CommonActions.navigate({
                        name: "Save",
                    })
                )
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove();
        }

    }, []);

    const AdShow = async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable();
        if (isConnected) {
            setAdShow(false)
            const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
                RewardedAdEventType.LOADED,
                () => {
                    setLoaded(true);
                },
            );
            const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
                RewardedAdEventType.EARNED_REWARD,
                reward => {
                    console.log('User earned reward of ', reward);
                },
            );

            // Start loading the rewarded interstitial ad straight away
            rewardedInterstitial.load();

            // Unsubscribe from events on unmount
            return () => {
                unsubscribeLoaded();
                unsubscribeEarned();
            };
        } else {
            if (loaded) {
                return null;
            }
            setAdShow(false);
        }

    }
    const getData = async () => {
        try {
            let emailStored = await AsyncStorage.getItem("email");
            let emailUser = await AsyncStorage.getItem("username");
            setUserEmail(JSON.parse(emailStored));
            setUser(JSON.parse(emailUser));
        } catch (e) {
            setUserEmail('user@gmail.com');
            setUser('user');
        }
    }

    try {
        if (!loaded) {
            return null;
        } else {
            { !isAdShow ? rewardedInterstitial.show() : setLoaded(false) }

        }
    } catch (error) {

    }


    const onPress = async () => {
        try {
            await AsyncStorage.removeItem('email');
            props.navigation.navigate("Login");
        } catch (error) {
        }
    }

    const ModalPopup = () => {
        try {
            setLoaded(false);
            if (!loaded) {
                return null;
            }
            setModalVisible(true);
        } catch (error) {

        }

    }
    const ModalPopupCancle = () => {
        try {
            setLoaded(false);
            if (!loaded) {
                return null;
            }
            setModalVisible(false);
        } catch (error) {

        }

    }

    return (
        <SafeAreaView style={Styles.container}>
            <StatusBarComponent
                backgroundColor={Colors.white} />

            <View style={CommomStyle.commonFlex}>
                <TouchableOpacity onPress={ModalPopup}>
                    <View style={Styles.viewMain}>
                        <View style={Styles.viewCircle}>
                            <Image
                                source={Images.userIcon}
                                style={Styles.imageUserIcon}
                                resizeMode="contain" />
                        </View>

                        <View>
                            <TextComponent
                                color={Colors.black}
                                title={User}
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(6)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                alignSelf='center'
                                textAlign='center'
                                letterSpacing={wp(0.1)} />

                            <TextComponent
                                color={Colors.textColor}
                                title={UserEmail}
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(3)}
                                fontFamily={Fonts.PoppinsRegular}
                                letterSpacing={wp(0)} />

                        </View>


                    </View>
                </TouchableOpacity>
            </View>

            <View style={CommomStyle.commonFlex}>
                <View style={Styles.viewCommon}>
                    <View>
                        <Image source={Images.starIcon}
                            style={Styles.imageIcon}
                            resizeMode="contain" />
                    </View>
                    <View style={Styles.textHorizontal}>
                        <TextComponent
                            onPress={() => Linking.openURL("market://details?id=com.mechodal.bestreads")}
                            color={Colors.accountText}
                            title={ScreenText.RateApp}
                            textDecorationLine={'none'}
                            fontWeight="500"
                            fontSize={wp(4)}
                            fontFamily={Fonts.RobotoRegular}
                            textAlign='left'
                            letterSpacing={wp(0)} />

                    </View>

                </View>

                <View style={Styles.viewCenter}>

                    <Image source={Images.notesIcon}
                        style={Styles.imageIcon}
                        resizeMode="contain" />
                    <View style={Styles.textHorizontal}>
                        <TextComponent
                            onPress={() => props.navigation.navigate("TermsAndCondition")}
                            color={Colors.accountText}
                            title={ScreenText.TermsAndCondition}
                            textDecorationLine={'none'}
                            fontWeight="500"
                            fontSize={wp(4)}
                            fontFamily={Fonts.RobotoRegular}
                            textAlign='left'
                            letterSpacing={wp(0)} />
                    </View>

                </View>

                <View style={Styles.viewCommon}>
                    <Image source={Images.lockIcon}
                        style={Styles.imageIcon}
                        resizeMode="contain" />
                    <View style={Styles.textHorizontal}>

                        <TextComponent
                            onPress={() => props.navigation.navigate("PrivacyPolicy")}
                            color={Colors.accountText}
                            title={ScreenText.PrivacyPolicy}
                            textDecorationLine={'none'}
                            fontWeight="500"
                            fontSize={wp(4)}
                            fontFamily={Fonts.RobotoRegular}
                            textAlign='left'
                            letterSpacing={wp(0)} />
                    </View>
                </View>

                <Modal
                    isVisible={modalVisible}
                    animationInTiming={300}
                    style={Styles.ViewModal}
                >
                    <View style={CommomStyle.commonContent}>
                        <TextComponent
                            color={Colors.black}
                            title={ScreenText.LogoutMessage}
                            textDecorationLine={'none'}
                            fontWeight="600"
                            fontSize={wp(4)}
                            fontFamily={Fonts.PoppinsSemiBold}
                            alignSelf='center'
                            textAlign='center'
                            letterSpacing={wp(0.1)} />
                        <View style={CommomStyle.commonRowCenterSpace}>
                            <ButtonComponent
                                marginVertical={hp(2)}
                                borderWidth={ConstValue.value1}
                                borderColor={Colors.gray}
                                heightBtn={hp(5)}
                                widthBtn={wp(22)}
                                isRightArrow={false}
                                onPress={ModalPopupCancle}
                                color={Colors.lightBlack}
                                title={ScreenText.Cancel}
                                fontWeight="400"
                                fontSize={wp(3)}
                                fontFamily={Fonts.InterBold}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                backgroundColor={Colors.white}
                            />
                            <ButtonComponent
                                marginVertical={hp(2)}
                                borderWidth={ConstValue.value1}
                                borderColor={Colors.gray}
                                heightBtn={hp(5)}
                                widthBtn={wp(22)}
                                isRightArrow={false}
                                onPress={onPress}
                                color={Colors.lightBlack}
                                title={ScreenText.Logout}
                                fontWeight="400"
                                fontSize={wp(3)}
                                fontFamily={Fonts.InterBold}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                backgroundColor={Colors.white}
                            />
                        </View>

                    </View>
                </Modal>
            </View>

            <View style={CommomStyle.commonFlex}>
                <Image source={Images.accountSign}
                    style={Styles.imageAccountSign}
                    resizeMode="contain" />
            </View>

        </SafeAreaView >
    )

}
export default AccountTab;