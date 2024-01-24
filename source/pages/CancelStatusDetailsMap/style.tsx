import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewHeader: {
        height: wp(20), // wp(30)
        backgroundColor: Colors.black,
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        justifyContent: 'center',
    },
    viewModalDriver: {
        height: wp(70),
        backgroundColor: Colors.grayBox,
        width: "100%",
        borderRadius: wp(5),
        padding: wp(3),
        justifyContent: 'center',
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
    imageArrow: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(50),
        alignSelf: 'center',
        marginHorizontal: wp(2)
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(1)
    },
    starImageStyle: {
        width: wp(4),
        height: wp(4),
        resizeMode: 'cover',
    },
    textTermsAndCondition: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white,
        marginLeft: wp(3),
    },
    imageHelpIcon: {
        width: wp(7),
        height: wp(7),
        tintColor: Colors.grayFull,
        marginLeft: wp(3)
    },
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
    viewItemFour: {
        flexDirection: 'row', marginVertical: wp(2)
    },
    imageRightArrow: {
        flex: 1, alignItems: 'flex-end', marginHorizontal: wp(2)
    },
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
    viewWhiteDot: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        tintColor: Colors.white
    },
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
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        padding: wp(3),
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
        marginHorizontal: wp(2)
    },
    viewHelpAndSupport: {
        height: wp(15),
        backgroundColor: '#282931',
        borderRadius: wp(3),
        flexDirection: "row",
        marginVertical: wp(5),
        borderColor: Colors.grayFull,
        borderWidth: wp(0.2),
    },
    viewRightArrow: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: wp(25)
    },
    viewWhiteConatiner: {
        height: "auto",
        backgroundColor: Colors.lightblue,
        borderTopRightRadius: wp(5),
        borderTopLeftRadius: wp(5),
        padding: wp(3),
        // marginVertical: wp(5),
        // justifyContent: 'center'
    }

});

export default Styles