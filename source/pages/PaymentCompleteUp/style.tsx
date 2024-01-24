import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
    viewModalMargin: {
        margin: 0,
        backgroundColor: 'black'
    },
    viewSeprateLine: {
        height: wp(15),
        width: wp(0.2),
        backgroundColor: Colors.grayDark,
    },
    viewKMConatiner: {
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
    viewAbout: {
        height: wp(0.1),
        backgroundColor: Colors.circleGray,
        width: wp(80),
        alignSelf: 'center',
        marginVertical: wp(5)
    },
    imageCoin: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(50),
        alignSelf: 'center',
    },
    viewGrayBoxConatiner: {
        height: "auto",
        padding: wp(3),
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        flexDirection: "row",
        justifyContent: "space-between",
        margin: wp(3),
        marginTop: wp(5),
        width: wp(95)
    },
    viewHelpSupport: {
        justifyContent: 'center',
        flex: 1
    },
    ImageInfoIcon: {
        width: wp(4),
        height: wp(4),
        borderRadius: wp(50),
        alignSelf: 'center',
        tintColor: Colors.grayFull
    },
    viewVerticalLine: {
        height: wp(15),
        width: wp(0.3),
        backgroundColor: Colors.grayFull,
        marginHorizontal: wp(2)
    },
    viewInfoIcon1: {
        width: wp(4),
        height: wp(4),
        borderRadius: wp(50),
        alignSelf: 'center',
        tintColor: Colors.grayFull,
        marginLeft: wp(2)
    },
    viewAboutUs: {
        justifyContent: 'center',
        flex: 1
    },
    viewRightArrowIcon: {
        width: wp(7),
        height: wp(7),
        borderRadius: wp(50),
        tintColor: Colors.white,
    },
    viewBankIcon: {
        width: wp(7),
        height: wp(7),
        borderRadius: wp(50),
        tintColor: Colors.gray,
    },
    viewCenterConatin: {
        backgroundColor: Colors.grayBox,
        height: wp(15),
        padding: wp(3),
        borderRadius: wp(3),
        margin: wp(3),
        flexDirection: 'row',
    },
    viewHelpIcon: {
        width: wp(7),
        height: wp(7),
        borderRadius: wp(50),
        tintColor: Colors.gray,
    },
    viewEndConatiner: {
        backgroundColor: Colors.grayBox,
        height: "auto",
        padding: wp(3),
        borderRadius: wp(3),
        margin: wp(3),
    },
    viewPrivacyIcon: {
        flexDirection: 'row',
        marginVertical: wp(2)
    },
    viewPrivacyPolicy: {
        justifyContent: 'center',
        flex: 1
    },
    viewRightIcon: {
        width: wp(7),
        height: wp(7),
        borderRadius: wp(50),
        tintColor: Colors.grayFull,
    },
    viewOrangeDot: {
        width: wp(3.8),
        height: wp(3.8),
        justifyContent: 'center',
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
    viewSeprateLine2: {
        height: wp(0.1),
        marginVertical: wp(3),
        backgroundColor: 'gray',
        marginHorizontal: wp(3)
    },
    viewSeprateLine3: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: wp(2)
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
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(1),
        marginVertical: wp(3),
        marginHorizontal: wp(2)
    },
    starImageStyle: {
        width: wp(12),
        height: wp(12),
        resizeMode: 'cover',
        marginHorizontal: wp(1)
    },
});

export default Styles