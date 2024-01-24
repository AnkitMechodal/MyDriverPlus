import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderComponent from '../../components/Header/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import Styles from './style';


type Props = {
    navigation: any
}

const PaymentSuccessfulScreen = ({ route, navigation }) => {


    // const [isModalDriver, setModalDriver] = useState(false);


    const [isModalVisible, setModalVisible] = useState(true);


    // SUBMIT BOX !


    useEffect(() => {
        // This function will run when the component mounts
        console.log("ITEM_RIDE_TOTALAMOUNT===>", route?.params?.itemSuccessfulAmount);

    }, []);


    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />

            <Modal
                isVisible={isModalVisible}
                swipeDirection={[]} // Disables swiping
                style={Styles.viewModalMargin}>

                <View style={Styles.container}>

                    <View>
                        <HeaderComponent
                            margin={wp(3)}
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
                            title={""}
                            fontSize={wp(4)}
                            onPress={() => navigation.goBack()}
                        />
                    </View>

                    <View style={Styles.viewCenterContain}>


                        <View>
                            <Image
                                style={Styles.viewPayImage}
                                resizeMode="contain"
                                source={Images.payIcon} />
                        </View>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={"Payment Successful"}
                                textDecorationLine={'none'}
                                marginTop={wp(10)}
                                fontWeight="400"
                                fontSize={wp(4)}
                                marginHorizontal={wp(2)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='center'
                            />
                        </View>


                        <View>
                            <TextComponent
                                color={Colors.gray}
                                title={"Your payment has been successfully done."}
                                textDecorationLine={'none'}
                                marginVertical={wp(3)}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                marginHorizontal={wp(5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='center'
                            />


                        </View>

                        <View style={Styles.viewSeprateLine2}>
                        </View>

                        <View>

                            <TextComponent
                                color={Colors.gray}
                                title={"Total Payment"}
                                textDecorationLine={'none'}
                                marginTop={wp(3)}
                                fontWeight="400"
                                fontSize={wp(4)}
                                marginHorizontal={wp(2)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='center'
                            />
                            <TextComponent
                                color={Colors.white}
                                title={"$ " + route?.params?.itemSuccessfulAmount}
                                textDecorationLine={'none'}
                                marginTop={wp(5)}
                                fontWeight="400"
                                fontSize={wp(4)}
                                marginHorizontal={wp(2)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='center'
                            />

                            <TextComponent
                                color={Colors.blue}
                                title={"Go To Home"}
                                textDecorationLine={'none'}
                                marginTop={wp(10)}
                                onPress={() => navigation.navigate('BookingScreen', {
                                    itemType: 'Taxi Booking'
                                })}
                                fontWeight="400"
                                fontSize={wp(4)}
                                marginHorizontal={wp(2)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='center'
                            />

                        </View>

                    </View>



                </View>
            </Modal>

        </SafeAreaView>
    )

}

export default PaymentSuccessfulScreen;