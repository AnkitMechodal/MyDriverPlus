import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    modalStyle: {
        marginTop: wp(-140),
        alignSelf: 'flex-end',
    },
    modalSeatStyle: {
        marginTop: wp(58),  //
    },
    dropdown: {
        backgroundColor: Colors.grayDrawerBg, // grayDark
        width: wp(45), // 22 // 25 // 40
        marginLeft: wp(5),
        borderBottomLeftRadius: wp(2),
        borderBottomRightRadius: wp(2),

    },
    dropdownSeat: {
        backgroundColor: Colors.grayDark,
        width: wp(25), // 22
        marginLeft: wp(5),
    },
    item: {
        paddingVertical: wp(2), //2
        borderBottomWidth: 1,
        borderColor: Colors.white,
    },
    onItemPress: {
        flexDirection: 'row',
        // marginLeft: wp(4),
        // justifyContent: 'center',
        // width: wp(15), // "auto"
        justifyContent: "space-evenly",
        // alignContent: 'center'
    },
    onItemSeatPress: {
        flexDirection: 'row',
        marginLeft: wp(4),
        justifyContent: 'center'
    },
    imageDefaultDownArrow: {
        width: wp(6),
        height: wp(4.5),
        // marginRight: wp(2),
        // alignSelf: 'center'
        justifyContent: 'center'
    },
    textLabel: {
        color: Colors.gray,
        fontFamily: Fonts.PoppinsRegular,
    },
    bookContainer: {
        backgroundColor: Colors.grayDrawerBg,
        width: wp(90),
        borderRadius: wp(3),
        marginVertical: wp(2),
        marginHorizontal: wp(5),
        height: wp(30)
    },
    blueDot: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
        marginTop: wp(5)
    },
    lineVerticalLine1: {
        width: wp(0.2),
        backgroundColor: 'white',
        // alignSelf: 'center',
        marginLeft: wp(6), // 6
        height: wp(1),
        marginVertical: wp(1)
    },
    lineVerticalLine2: {
        width: wp(0.2),
        backgroundColor: 'white',
        // alignSelf: 'center',
        // marginLeft: wp(5),
        // marginLeft: wp(6), // 6
        height: wp(5),
        // marginVertical: wp(6),
        marginTop: wp(12),
        marginLeft: wp(-2)
    },
    lineHorizontalLine3: {
        width: wp(85),
        height: wp(0.2),
        // marginVertical: wp(2), // 4
        marginLeft: wp(2),
        marginTop: wp(-2),
        backgroundColor: Colors.grayFull
    },
    lineVerticalLine4: {
        width: wp(0.2),
        backgroundColor: 'white',
        // alignSelf: 'center',
        // marginLeft: wp(5),
        marginLeft: wp(6), // 6
        height: wp(3),
        marginVertical: wp(2)
    },
    viewOrangeDot: {
        width: wp(3.8),
        height: wp(3.8),
        // justifyContent: 'center',
        marginLeft: wp(-2),
        marginTop: wp(6),
    },
    viewSelectServices: {
        marginVertical: wp(2)
    },
    viewRideNow: {
        flexDirection: 'row',
        marginHorizontal: wp(4),
    },
    viewBackgroundMessage1: {
        flex: 1,
        margin: wp(4)
    },
    viewBackgroundMessage2: {
        color: 'white',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: wp(3.5),
    },
    viewBackgroundMessage3: {
        color: 'gray',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        fontSize: wp(3.5),
    },
    viewBackgroundMessage4: {
        flexDirection: 'row',
        margin: wp(1),
        marginTop: wp(4)
    },
    viewCheckbox1: {
        flexDirection: 'row',
        margin: wp(1)
    },
    viewSelectPayment: {
        color: 'white',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: wp(3.5),
    },
    viewCheckbox2: {
        flexDirection: 'row',
        margin: wp(1),
        marginTop: wp(4)
    },
    viewCheckbox3: {
        flexDirection: 'row',
        margin: wp(1)
    },
    viewBackground2: {
        flex: 1,
        margin: wp(4)
    },
    viewSeatNo: {
        color: 'white',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: wp(3.5),
    },
    textAreYouWantTo: {
        color: 'white',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: wp(3.5),
    },
    textPercentageOff: {
        color: 'gray',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        fontSize: wp(3.5),
    },
    textYesConatiner: {
        flexDirection: 'row',
        margin: wp(1),
        marginTop: wp(4)
    },
    viewBoxNoPool: {
        flexDirection: 'row',
        margin: wp(1)
    },
    textSelectPaymentMethod: {
        color: 'white',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: wp(3.5),
    },
    textCashPayment: {
        flexDirection: 'row',
        margin: wp(1),
        marginTop: wp(4)
    },
    viewWalletConatiner: {
        flexDirection: 'row',
        margin: wp(1)
    },
    viewDistance: {
        margin: wp(4)
    },
    textDistance: {
        color: 'white',
        justifyContent: 'center',
        marginHorizontal: wp(2),
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: wp(3.5),
    },
    textSelectHours: {
        color: 'white',
        justifyContent: 'center',
        marginHorizontal: wp(6),
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: wp(3.5),
    },
    textAreYouWantToLoyalty: {
        marginTop: wp(5),
        flex: 1
    },
    textLoyaltyPoints: {
        color: 'white',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: wp(3.5),
    },
    text10Off: {
        color: 'gray',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        fontSize: wp(3.5),
    },
    textYesHours: {
        flexDirection: 'row',
        margin: wp(1),
        marginTop: wp(4)
    },
    textBoxNoHours: {
        flexDirection: 'row',
        margin: wp(1)
    },
    viewCashConatiner: {
        flexDirection: 'row',
        margin: wp(1),
        marginTop: wp(4)
    },
    viewPonits: {
        flex: 1,
        margin: wp(4)
    },
    textSelectPayment: {
        color: 'white',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: wp(3.5),
    },
    textAllPayment: {
        color: 'gray',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        fontSize: wp(3.5),
    },
    viewYesBid: {
        flexDirection: 'row',
        margin: wp(1),
        marginTop: wp(4)
    },
    viewNoBid: {
        flexDirection: 'row',
        margin: wp(1)
    },
    viewCashBid: {
        flexDirection: 'row',
        margin: wp(1),
        marginTop: wp(4)
    },
    viewBookNow: {
        marginTop: wp(20)
    }
});

export default Styles