import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderComponent from '../../components/Header/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import { ScreenText } from '../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}

const HelpScreen = (props: Props) => {
    const navigation = useNavigation();

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
                    textAlign={"left"}
                    source={Images.arrowRight}
                    marginTop={wp(2)}
                    width={wp(7)}
                    marginHorizontal={wp(5)}
                    height={wp(7)}
                    color={Colors.white}
                    fontFamily={Fonts.InterSemiBold}
                    fontWeight="500"
                    title={"Help & Support"}
                    fontSize={wp(4)}
                    onPress={() => props.navigation.goBack()}
                />

                <View>
                    <TouchableOpacity
                        activeOpacity={0.2}
                        style={Styles.helpConatiner}
                        onPress={() => props.navigation.navigate("RiseHelpScreen")}>

                        <View>
                            <Image
                                style={Styles.imageStop}
                                resizeMode="contain"
                                source={Images.stopIcon} />
                        </View>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={ScreenText.RaiseDispute}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                marginHorizontal={wp(5)}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.gray}
                                title={ScreenText.Help1}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3)}
                                fontFamily={Fonts.PoppinsRegular}
                                marginHorizontal={wp(5)}
                                textAlign='left'
                            />
                        </View>

                        <View style={CommonStyle.commonContent}>
                            <Image
                                style={Styles.imageArrow}
                                resizeMode="contain"
                                source={Images.rightArrowIcon} />
                        </View>

                    </TouchableOpacity>
                </View>

                <View style={Styles.ItemSeparatorComponent}>
                </View>

                <View>
                    <TouchableOpacity
                        activeOpacity={0.2}
                        style={Styles.helpConatiner}
                        onPress={() => props.navigation.navigate("PaymentSupportScreen")}>
                        <View>
                            <Image
                                style={Styles.imageStop}
                                resizeMode="contain"
                                source={Images.headPhoneIcon} />
                        </View>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={ScreenText.PaymentSupport}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                marginHorizontal={wp(5)}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.gray}
                                title={ScreenText.Help2}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3)}
                                fontFamily={Fonts.PoppinsRegular}
                                marginHorizontal={wp(5)}
                                textAlign='left'
                            />
                        </View>

                        <View style={CommonStyle.commonContent}>
                            <Image
                                style={Styles.imageArrow}
                                resizeMode="contain"
                                source={Images.rightArrowIcon} />
                        </View>

                    </TouchableOpacity>
                </View>

                <View style={Styles.ItemSeparatorComponent}>
                </View>

                <View>
                    <TouchableOpacity
                        activeOpacity={0.2}
                        style={Styles.helpConatiner}
                        onPress={() => props.navigation.navigate("ContactUsScreen")}>
                        <View>
                            <Image
                                style={Styles.imageStop}
                                resizeMode="contain"
                                source={Images.questionIcon} />
                        </View>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={ScreenText.OtherSupport}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                marginHorizontal={wp(5)}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.gray}
                                title={ScreenText.Help3}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3)}
                                fontFamily={Fonts.PoppinsRegular}
                                marginHorizontal={wp(5)}
                                textAlign='left'
                            />
                        </View>

                        <View style={CommonStyle.commonContent}>
                            <Image
                                style={Styles.imageArrow}
                                resizeMode="contain"
                                source={Images.rightArrowIcon} />
                        </View>

                    </TouchableOpacity>
                </View>

            </View>


        </SafeAreaView>
    );
};

export default HelpScreen;
