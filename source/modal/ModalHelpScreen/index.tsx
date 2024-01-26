import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text';
import { Colors, Fonts, Images } from '../../themes/index';
import { ScreenText } from '../../utils';
import CommonStyle from '../../utils/commonStyle';
import Styles from './style';


type Props = {
    navigation: any
}

const ModalHelpScreen = (props: Props) => {


    const [isModalVisible, setModalVisible] = useState(true);

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <View style={Styles.container}>
                <Modal
                    isVisible={isModalVisible}
                    swipeDirection={[]} // Disables swiping
                    style={Styles.viewModalMargin}>
                    <ScrollView
                        bounces={true}
                        overScrollMode="always">
                        <View style={Styles.container}>
                            <HeaderComponent
                                margin={wp(3)}
                                backgroundColorOpacity={Colors.circleGray}
                                borderRadiusOpacity={wp(10)}
                                transform={[{ rotate: '180deg' }]}
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
                                    onPress={() => props.navigation.navigate("ModalRise")}>

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
                                    onPress={() => props.navigation.navigate("ModalPaymentSupport")}>
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
                                    onPress={() => props.navigation.navigate("ModalContactUs")}>
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

                    </ScrollView>

                </Modal>
            </View>
        </SafeAreaView >
    )
}

export default ModalHelpScreen;
