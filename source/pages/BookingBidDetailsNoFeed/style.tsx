import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewHeader: {
        height: wp(30),
        backgroundColor: Colors.header,
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        justifyContent: 'center',
        width: "100%"
    },
    rowCenter: {
        flexDirection: "row",
        // justifyContent: "center"
    },
    rowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    requestConatiner: {
        height: "auto",
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        padding: wp(3),
        marginVertical: wp(2),
        margin: wp(2)
    },
    viewContentContainerStyle: {
        marginHorizontal: wp(2)
    },
    imageArrow: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(50),
        alignSelf: 'center',
        // marginHorizontal: wp(2)
    },
    imageUser: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(50),
        alignSelf: 'center',
        marginHorizontal: wp(2)
    },
    imageHelp: {
        width: wp(7),
        height: wp(7),
        borderRadius: wp(50),
        alignSelf: 'center',
        marginHorizontal: wp(2)
    },
    customRatingBarStyle: {
        // justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(1)
    },
    customRatingBarStyleRate: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(2)
    },
    starImageStyle: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'cover',
        marginHorizontal: wp(0.5)
    },

    starImageStyle_: {
        width: wp(12),
        height: wp(12),
        resizeMode: 'cover',
        marginHorizontal: wp(1)
    },

    // textTermsAndCondition: {
    //     width: wp(6),
    //     height: wp(6),
    //     tintColor: Colors.white,
    //     marginLeft: wp(3),
    // },
    // imageHelpIcon: {
    //     width: wp(7),
    //     height: wp(7),
    //     tintColor: Colors.grayFull,
    //     marginLeft: wp(3)
    // },
    viewRatting: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    viewBoxOne: {
        height: wp(35),
        backgroundColor: Colors.grayBox,
        borderRadius: wp(2),
        margin: wp(4),
    },
    viewBoxTwo: {
        width: "90%",
        height: hp(0.1),
        backgroundColor: Colors.gray,
        opacity: 0.3,
        marginHorizontal: wp(2),
        marginVertical: wp(2)
    },
    viewBoxThree: {
        height: wp(15),
        backgroundColor: Colors.profileBox,
        borderRadius: wp(2),
        marginHorizontal: wp(4),
        justifyContent: 'center',
    },
    imageLoack: {
        width: wp(6),
        height: wp(6),
        marginHorizontal: wp(2)
    },
    viewBoxFour: {
        height: wp(45),
        backgroundColor: Colors.profileBox,
        borderRadius: wp(2),
        margin: wp(4),
        justifyContent: 'center',
    },
    // viewItemFour: {
    //     flexDirection: 'row', marginVertical: wp(2)
    // },
    // imageRightArrow: {
    //     flex: 1, alignItems: 'flex-end', marginHorizontal: wp(2)
    // },
    deleteAccount: {
        height: wp(15),
        backgroundColor: Colors.deleteBox,
        borderRadius: wp(2),
        marginHorizontal: wp(4),
        justifyContent: 'center',
    },
    imageDeleteIcon: {
        width: wp(6),
        height: wp(6),
        marginHorizontal: wp(2),
        tintColor: Colors.deleteBoxIcon
    },
    viewOrangeDot: {
        width: wp(3.8),
        height: wp(3.8),
        justifyContent: 'center',
    },
    // viewWhiteDot: {
    //     width: wp(3.8),
    //     height: wp(3.8),
    //     justifyContent: 'center',
    //     tintColor: Colors.white
    // },
    viewSelectServices: {
        marginVertical: wp(2)
    },
    lineVerticalLine4: {
        width: wp(0.2),
        backgroundColor: 'white',
        height: wp(2),
        marginLeft: wp(2),
        marginVertical: wp(1)
    },
    lineVerticalLine3: {
        width: wp(0.2),
        backgroundColor: 'white',
        height: wp(2),
        marginLeft: wp(2),
    },
    lineVerticalLine1: {
        width: wp(0.2),
        backgroundColor: 'white',
        height: wp(2),
        marginLeft: wp(2),
    },
    viewModalMargin: {
        margin: 0,
        backgroundColor: 'black'
    },
    viewRowContent: {
        margin: wp(3)
    },
    textConatiner1: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: wp(3)
    },
    textConatiner2: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    textConatiner3: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: wp(3)
    },
    viewLineHorizontal: {
        height: wp(0.1),
        marginVertical: wp(5),
        backgroundColor: 'gray'
    },
    viewRowConatiner: {
        height: "auto",
        backgroundColor: Colors.desc,
        borderRadius: wp(3),
        padding: wp(3),
        flexDirection: "row"
    },
    textFareConatiner: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: wp(3)
    },
    viewKMConatiner: {
        height: "auto",
        backgroundColor: Colors.lightblue,
        borderRadius: wp(3),
        padding: wp(3),
        marginVertical: wp(3),
    },
    viewKMConatinerGray: {
        height: "auto",
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        padding: wp(3),
        margin: wp(3),
        marginVertical: wp(3),
    },
    rowSpace: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    viewSeprateLine: {
        height: wp(15),
        width: wp(0.2),
        backgroundColor: Colors.grayDark,
    },
    viewSeprateLine2: {
        height: wp(0.1),
        marginVertical: wp(5),
        backgroundColor: 'gray'
    },
    viewSeprateLine3: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: wp(2) // 2
    },
    viewSeprateLine3_: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: wp(5) // 2
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
    viewRightArrow: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: wp(25)
    },
    viewWhiteConatiner: {
        height: wp(25),
        backgroundColor: Colors.lightblue,
        borderTopRightRadius: wp(7),
        borderTopLeftRadius: wp(7),
        padding: wp(3),
        marginVertical: wp(5),
        justifyContent: 'center'
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
        justifyContent: 'flex-end',
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

    // VIEW

    bottamClickContain: {
        flexDirection: 'row',
        padding: wp(2)
    },
    viewGrayLineHorizontal: {
        height: wp(0.1),
        backgroundColor: Colors.grayFull,
        width: wp(95),
        marginVertical: wp(5),
        marginHorizontal: wp(3)
    },
    viewLoreumText: {
        height: "auto",
        backgroundColor: Colors.grayBox,
        marginVertical: wp(3),
        padding: wp(5)
    },
    carImageIcon: {
        width: wp(25),
        height: wp(20),
        borderRadius: wp(3),
        marginHorizontal: wp(2)
    },

    imageCall: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(3),
        marginHorizontal: wp(5),
    },

    // MODAL
    starImageStyle1: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'cover',
        marginHorizontal: wp(0.5)
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
    helpConatiner: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: wp(4)
    },
    ItemSeparatorComponent: {
        width: '90%',
        height: wp(0.1),
        backgroundColor: Colors.grayDrawerBg,
        marginHorizontal: wp(5)
    },
    imageStop: {
        width: wp(6),
        height: wp(6),
        borderRadius: wp(50),
        alignSelf: 'center',
    },

    imageDriver: {
        width: wp(25),
        height: wp(25),
        borderRadius: wp(3),
        marginHorizontal: wp(3),
    },
    viewRiseHeader: {
        marginBottom: wp(10)
    },
    viewFirstConatiner: {
        flex: 1,
        justifyContent: 'center',
    },
    textCreateANewAccount: {
        margin: wp(3)
    },

    modalStyle: {
        marginTop: wp(15)
    },
    dropdown: {
        backgroundColor: Colors.grayDark,
        width: wp(22),
        marginLeft: wp(5),
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
    imageDefaultDownArrow: {
        width: wp(5),
        height: wp(5),
        marginRight: wp(2),
    },
    textLabel: {
        color: Colors.gray
    },
    viewSecondConatiner: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    viewStationConatiner: {
        justifyContent: 'center',
        margin: wp(3)
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
    viewModalDriverStripeCancel: {
        height: wp(145),
        backgroundColor: Colors.white, // grayBox
        width: "100%",
        borderRadius: wp(5),
        padding: wp(3),
        justifyContent: 'center',
        marginTop: wp(25)
    },
    viewModalDriver: {
        height: wp(70),
        backgroundColor: Colors.grayBox,
        width: "100%",
        borderRadius: wp(5),
        padding: wp(3),
        justifyContent: 'center',
    },
    viewMapview: {
        flex: 1,
        width: "100%",
        height: '100%'
    },
    viewHeaderComplete: {
        height: wp(20), // wp(30)
        backgroundColor: Colors.black,
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        justifyContent: 'center',
    },
    requestHeaderConatin: {
        height: wp(45),
        backgroundColor: Colors.blue,
        borderBottomLeftRadius: wp(8),
        borderBottomRightRadius: wp(8),
        width: "100%",
        position: 'absolute'
    },
    modalConatiner: {
        height: "auto",
        borderRadius: wp(5),
        margin: wp(4),
        padding: wp(5),
        backgroundColor: Colors.grayBox,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blueDot: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
        // marginTop: wp(5)
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
    marginVertical: {
        marginVertical: wp(115),
    },
    imageStop_: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(50),
        marginHorizontal: wp(4),
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
    viewImage: {
        width: wp(10),
        justifyContent: 'center',
    },
    viewImage1: {
        width: wp(50),
        justifyContent: 'center',
    },
    blueDot1: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
        marginTop: wp(4),
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
    bottamUserConatin: {
        height: wp(22),
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        // marginVertical: wp(1),
        marginHorizontal: wp(3),
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    marginRight: {
        // alignSelf: "flex-end",
        // marginHorizontal: wp(10), // 3 //10 todooooo1
        marginRight: wp(10),
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
    customRatingBarStyle_: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(1),
        marginVertical: wp(3),
        marginHorizontal: wp(2)
    },

});

export default Styles