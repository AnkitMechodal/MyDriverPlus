import React, { useEffect } from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import { ScreenText } from '../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}

const CourierStatusScreen = ({ route, navigation }) => {

    useEffect(() => {
        // This function will run when the component mounts
        console.log("RIDE_ID_PROPS===>", route?.params?.itemRIDEID);

        // itemRider_ID
        console.log("ITEM_RIDER_ID===>", route?.params?.itemRider_ID);

        // itemRiderDuration
        console.log("ITEM_RIDER_DURATUION--===>", route?.params?.itemRiderDuration);

        // itemRiderDistance
        console.log("ITEM_RIDER_DISTANCE--===>", route?.params?.itemRiderDistance);

        //  itemPickStation: PickStation,
        //  itemDropStation: DropStation,

        console.log("ITEM_PICK_STATION---===>", route?.params?.itemRidePickStation);
        console.log("ITEM_DROP_STATION---===>", route?.params?.itemRideDropStation);


        // Payment
        console.log("ITEM_RIDE_CHARGE===>", route?.params?.itemPaymentRideCharge);
        console.log("ITEM_RIDE_FEES_CON===>", route?.params?.itemPaymentFeesConvenience);
        console.log("ITEM_RIDE_WAITING_CHARGES===>", route?.params?.itemPaymentWaitingCharge);
        console.log("ITEM_RIDE_DICOUNT===>", route?.params?.itemPaymentDiscount);
        console.log("ITEM_RIDE_TOTALAMOUNT===>", route?.params?.itemPaymentTotalAmount);

    }, []);

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <View style={CommonStyle.commonFlex}>
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

                <View style={Styles.viewManIcon}>
                    <Image
                        style={Styles.imageManIcon}
                        resizeMode="contain"
                        source={Images.manIcon} />

                    <TextComponent
                        color={Colors.white}
                        title={ScreenText.RequestSentSuccessfully}
                        textDecorationLine={'none'}
                        fontWeight="400"
                        fontSize={wp(4)}
                        marginVertical={wp(5)}
                        fontFamily={Fonts.PoppinsSemiBold}
                        textAlign='center'
                    />

                    <View style={Styles.textLoreumConfirm}>
                        <TextComponent
                            color={Colors.gray}
                            title={ScreenText.LoreumConfirm}
                            textDecorationLine={'none'}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            marginVertical={wp(2)}
                            fontFamily={Fonts.PoppinsRegular}
                            alignSelf='center'
                            textAlign='center'
                        />
                    </View>

                    <TextComponent
                        color={Colors.blue}
                        title={ScreenText.CheckStatus}
                        textDecorationLine={'none'}
                        onPress={() => navigation.navigate('CourierRequest', {
                            itemRIDEID_SENT: route?.params?.itemRIDEID,
                            itemRIDER_ID_SENT: route?.params?.itemRider_ID,
                            itemRIDER_DISTANCE_SENT: route?.params?.itemRiderDistance,
                            itemRIDER_DURATUION_SENT: route?.params?.itemRiderDuration,
                            itemRIDER_PICKSTATION: route?.params?.itemRidePickStation,
                            itemRIDER_DROPSTATION: route?.params?.itemRideDropStation,
                            itemRIDER_RIDE_CHARGE: route?.params?.itemPaymentRideCharge,//
                            itemRIDER_RIDE_FEES_CON: route?.params?.itemPaymentFeesConvenience,
                            itemRIDER_RIDE_WAITING_CHARGES: route?.params?.itemPaymentWaitingCharge,
                            itemRIDER_RIDE_DICOUNT: route?.params?.itemPaymentDiscount,
                            itemRIDER_RIDE_TOTALAMOUNT: route?.params?.itemPaymentTotalAmount,
                        })}
                        fontWeight="400"
                        fontSize={wp(3.5)}
                        marginVertical={wp(2)}
                        fontFamily={Fonts.PoppinsRegular}
                        alignSelf='center'
                        textAlign='center'
                    />

                </View>
            </View>



        </SafeAreaView>
    )
}

export default CourierStatusScreen;