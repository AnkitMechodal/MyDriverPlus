import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ButtonComponent from '../../../components/Button/index';
import HeaderComponent from '../../../components/Header';
import StatusBarComponent from '../../../components/StatusBar';
import TextComponent from '../../../components/Text';
import { Colors, Fonts, Images } from '../../../themes/index';
import CommonStyle from '../../../utils/commonStyle';
import { ScreenText } from '../../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}

const VerifiedScreen = (props: Props) => {

    const navigation = useNavigation();

    const [isClick, setIsClick] = useState(true);

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />

            <View style={Styles.container}>
                <HeaderComponent
                    margin={wp(3)}
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
                <View>

                </View>
                <View style={Styles.viewFirstConatiner}>

                    <TextComponent
                        color={Colors.white}
                        title={ScreenText.VerifyYourAccount}
                        textDecorationLine={'none'}
                        fontWeight="700"
                        fontSize={wp(6)}
                        marginTop={(hp(10))}
                        fontFamily={Fonts.PoppinsRegular}
                        textAlign='left'
                    />
                    <TextComponent
                        color={Colors.white}
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
                            onPress={() => Alert.alert('test')}
                            activeOpacity={0}>
                            <Image
                                source={Images.accountMobile}
                                style={Styles.imageSearchIcon}
                                resizeMode="contain" />
                        </TouchableOpacity>
                        <View>
                            <TextComponent
                                color={Colors.white}
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
                                color={Colors.white}
                                isTextEnd={true}
                                sizeEnd={wp(3.5)}
                                colorEnd={Colors.white}
                                endtext={ScreenText.NumberFetch}
                                title={ScreenText.MobileVerificationNumber}
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(3.5)}
                                marginVertical={wp(1)}
                                marginHorizontal={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>
                        <View style={Styles.viewVerfiedConatiner}>
                            <TextComponent
                                color={Colors.greenDark}
                                title={ScreenText.Verified}
                                onPress={() => props.navigation.navigate("MobileVerfication")}
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(3.5)}
                                marginTop={wp(2.5)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='center'
                            />
                        </View>

                    </View>
                    <View style={Styles.viewAccountEmail}>
                        <TouchableOpacity
                            onPress={() => Alert.alert('test')}
                            activeOpacity={0}>
                            <Image
                                source={Images.accountEmail}
                                style={Styles.imageSearchIcon}
                                resizeMode="contain" />
                        </TouchableOpacity>
                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={ScreenText.EmailVerification}
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(3.5)}
                                marginHorizontal={wp(5)}
                                marginTop={wp(2.5)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.white}
                                isTextEnd={true}
                                sizeEnd={wp(3.5)}
                                colorEnd={Colors.white}
                                title={ScreenText.AccountDummyEmail}
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(3.5)}
                                marginVertical={wp(1)}
                                marginHorizontal={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>
                        <View style={Styles.viewVerfiedConatiner}>
                            <TextComponent
                                color={Colors.greenDark}
                                title={ScreenText.Verified}
                                onPress={() => props.navigation.navigate("EmailVerfication")}
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(3.5)}
                                marginTop={wp(2.5)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='center'
                            />
                        </View>

                    </View>

                    <View style={Styles.buttonSignUp}>
                        <ButtonComponent
                            isVisibleMobile={false}
                            isVisibleFaceBook={false}
                            heightBtn={hp(7)}
                            widthBtn={wp(90)}
                            isRightArrow={false}
                            opacity={!isClick ? 0.5 : 1}
                            disabled={false}
                            color={Colors.white}
                            title={ScreenText.SingUp}
                            // marginHorizontal={wp(4)}
                            onPress={() => props.navigation.navigate("Home1")}
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

export default VerifiedScreen;
