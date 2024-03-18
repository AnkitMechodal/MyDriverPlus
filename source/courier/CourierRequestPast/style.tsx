import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewItemFour: {
        flexDirection: 'row',
        borderColor: Colors.grayDark,
        borderWidth: wp(0.5),
        borderRadius: wp(2),
        padding: wp(3),
        marginHorizontal: wp(4),
        marginVertical: wp(5)
    },
    // TODO :
    viewLoreumText: {
        height: "auto",
        backgroundColor: Colors.grayBox,
        marginVertical: wp(3),
        padding: wp(5)
    },
    viewSeprateLine3: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: wp(5)
    },
    viewSeprateLine3_: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: wp(2)
    },

    viewSeprateLine2: {
        height: wp(0.1),
        marginVertical: wp(5),
        backgroundColor: 'gray'
    },
    lineVerticalLine3: {
        width: wp(0.2),
        backgroundColor: 'white',
        height: wp(2),
        marginLeft: wp(2),
    },
    lineVerticalLine4: {
        width: wp(0.2),
        backgroundColor: 'white',
        height: wp(2),
        marginLeft: wp(2),
        marginVertical: wp(1)
    },
    lineVerticalLine1: {
        width: wp(0.2),
        backgroundColor: 'white',
        height: wp(2),
        marginLeft: wp(2),
    },
    viewOrangeDot: {
        width: wp(3.8),
        height: wp(3.8),
        justifyContent: 'center',
    },
    viewSeprateLine: {
        height: wp(15),
        width: wp(0.2),
        backgroundColor: Colors.grayDark,
    },
    rowSpace: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    viewRowContent: {
        margin: wp(3)
    },
    viewKMConatiner: {
        height: "auto",
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        padding: wp(3),
        marginVertical: wp(3),
    },
    customRatingBarStyle: {
        // justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(1),
        // marginVertical: wp(3),
    },
    timerValueContain: {
        backgroundColor: "white",
        width: wp(15),
        height: wp(15),
        borderRadius: wp(50),
        alignSelf: "center"
    },
    modalIOS: {
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        padding: wp(3),
        height: "auto",
        alignSelf: "center"
    },

    viewImage1: {
        width: wp(50),
    },
    blueDot1: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
        marginTop: wp(4),
    },
    viewImage: {
        width: wp(10)
    },
    riderConatin: {
        flexDirection: "row",
    },
    blueRide: {
        height: wp(22),
        padding: wp(2),
        backgroundColor: Colors.blue,
        borderTopRightRadius: wp(10),
        borderTopLeftRadius: wp(10),
        marginVertical: wp(1),
        flexDirection: "row",
    },
    customRatingBarStyle_: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(1),
        marginVertical: wp(3),
        marginHorizontal: wp(2)
    },
    bottamUserConatin: {
        height: wp(22),
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        // marginVertical: wp(1),
        marginHorizontal: wp(3),
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    marginVertical: {
        marginVertical: wp(115),
    },
    marginRight: {
        // alignSelf: "flex-end",
        // marginHorizontal: wp(10), // 3 //10 todooooo1
        marginRight: wp(10),
        justifyContent: 'center',
        alignSelf: "flex-end",
    },
    textKMConatiner: {
        backgroundColor: "white",
        width: wp(15),
        height: wp(15),
        borderRadius: wp(50),
        marginHorizontal: wp(9), // 3 //10
        justifyContent: 'center',
        alignSelf: "flex-end",
    },
    lineVerticalLine11: {
        width: wp(0.5),
        backgroundColor: 'white',
        // alignSelf: 'center',
        marginLeft: wp(6), // 6
        height: wp(1),
        marginVertical: wp(1)
    },
    blueDot: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
        // marginTop: wp(5)
    },
    requestHeaderConatin: {
        height: wp(45),
        backgroundColor: Colors.blue,
        borderBottomLeftRadius: wp(8),
        borderBottomRightRadius: wp(8),
        width: "100%",
        position: 'absolute'
    },
    viewRightArrow: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: wp(25)
    },
    viewHelpAndSupport: {
        height: wp(15),
        backgroundColor: '#282931',
        borderRadius: wp(3),
        flexDirection: "row",
        marginVertical: wp(10),
        borderColor: Colors.grayFull,
        borderWidth: wp(0.2),
    },
    imageHelp: {
        width: wp(7),
        height: wp(7),
        borderRadius: wp(50),
        alignSelf: 'center',
        marginHorizontal: wp(2)
    },
    textFareConatiner: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: wp(3)
    },
    starImageStyle: {
        width: wp(4),
        height: wp(4),
        resizeMode: 'cover',
    },

    viewRatting: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    imageUser: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(50),
        alignSelf: 'center',
        marginHorizontal: wp(2)
    },
    viewRowConatiner: {
        height: "auto",
        backgroundColor: Colors.desc,
        borderRadius: wp(3),
        padding: wp(3),
        flexDirection: "row"
    },
    viewLineHorizontal: {
        height: wp(0.1),
        marginVertical: wp(5),
        backgroundColor: 'gray'
    },
    textConatiner3: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: wp(3)
    },
    textConatiner2: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    textConatiner1: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: wp(3)
    },
    viewSecondConatiner: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    textLabel: {
        color: Colors.gray
    },
    imageDefaultDownArrow: {
        width: wp(5),
        height: wp(5),
        marginRight: wp(2),
    },
    onItemPress: {
        flexDirection: 'row',
        marginLeft: wp(4)
    },
    item: {
        paddingVertical: wp(2),
        borderBottomWidth: 1,
        borderColor: Colors.white,
    },
    dropdown: {
        backgroundColor: Colors.grayDark,
        width: wp(22),
        marginLeft: wp(5),
    },
    modalStyle: {
        marginTop: wp(15)
    },
    textCreateANewAccount: {
        margin: wp(3)
    },
    viewFirstConatiner: {
        flex: 1,
        justifyContent: 'center',
    },
    viewRiseHeader: {
        marginBottom: wp(10)
    },
    imageStop_: {
        width: wp(6),
        height: wp(6),
        borderRadius: wp(50),
        alignSelf: 'center',
    },
    ItemSeparatorComponent: {
        width: '90%',
        height: wp(0.1),
        backgroundColor: Colors.grayDrawerBg,
        marginHorizontal: wp(5)
    },
    imageArrow: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(50),
        alignSelf: 'center',
        // marginHorizontal: wp(2)
    },
    helpConatiner: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: wp(4)
    },
    starImageStyle_: {
        width: wp(12),
        height: wp(12),
        resizeMode: 'cover',
        marginHorizontal: wp(1)
    },
    viewGrayLineHorizontal: {
        height: wp(0.1),
        backgroundColor: Colors.grayFull,
        width: wp(95),
        marginVertical: wp(5),
        marginHorizontal: wp(3)
    },
    carImageIcon: {
        width: wp(25),
        height: wp(20),
        borderRadius: wp(3),
        marginHorizontal: wp(2)
    },
    starImageStyle1: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'cover',
        marginHorizontal: wp(0.5)
    },
    imageCall: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(3),
        marginHorizontal: wp(5),
    },
    // TODO
    imageStop: {
        width: wp(25),
        height: wp(25),
        borderRadius: wp(3),
        marginHorizontal: wp(3),
    },
    bottamClickContain: {
        flexDirection: 'row',
        padding: wp(2)
    },
    viewHeader: {
        height: wp(30),
        backgroundColor: Colors.header,
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        justifyContent: 'center',
        width: "100%"
    },
    viewModalDriverStripe: {
        height: wp(145),
        backgroundColor: Colors.white, // grayBox
        width: "100%",
        borderRadius: wp(5),
        padding: wp(3),
        justifyContent: 'center',
        marginTop: wp(25)
    },
    viewStationConatiner: {
        justifyContent: 'center',
        margin: wp(3)
    },
    viewModalDriver: {
        height: wp(70),
        backgroundColor: Colors.grayBox,
        width: "100%",
        borderRadius: wp(5),
        padding: wp(3),
        justifyContent: 'center',
    },
    viewKMConatinerGray: {
        height: "auto",
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        padding: wp(3),
        margin: wp(3),
        marginVertical: wp(3),
    },
    viewHeaderComplete: {
        height: wp(20), // wp(30)
        backgroundColor: Colors.black,
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        justifyContent: 'center',
    },
    viewModalDriverStripeCancel: {
        height: wp(145),
        backgroundColor: Colors.white, // grayBox
        width: "100%",
        borderRadius: wp(5),
        padding: wp(3),
        justifyContent: 'center',
        marginTop: wp(25)
    },
    viewPayImage: {
        width: wp(35),
        height: wp(35),
        alignSelf: "center"
    },
    viewCenterContain: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: "center",
        marginVertical: wp(30)
    },
    viewHeader_: {
        height: wp(20), // wp(30)
        backgroundColor: Colors.black,
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        justifyContent: 'center',
    },
    viewModalMargin: {
        margin: 0,
        backgroundColor: 'black'
    },
    imageHelpIcon: {
        width: wp(7),
        height: wp(7),
        marginLeft: wp(3)
    },
    imageRightArrow: {
        flex: 1, alignItems: 'flex-end', marginHorizontal: wp(2)
    },
    textTermsAndCondition: {
        width: wp(8),
        height: wp(8),
        tintColor: Colors.white,
        marginLeft: wp(3),
    },
    viewBlueBottamConatiner: {
        width: "100%",
        height: "auto",
        padding: wp(3),
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        backgroundColor: Colors.blue,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    viewWhiteDot: {
        width: wp(3),
        height: wp(3),
        backgroundColor: Colors.white,
        borderRadius: wp(5),
        marginTop: wp(2)
    },
    modalCancelConatiner: {
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        padding: wp(3),
        height: "auto",
        justifyContent: 'center'
    },
    ButtonYesNoConatiner: {
        flexDirection: "row",
        justifyContent: 'center'
    },
});

export default Styles