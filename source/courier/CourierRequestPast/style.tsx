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
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(1),
        // marginVertical: wp(3),
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