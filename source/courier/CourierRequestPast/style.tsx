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
    customRatingBarStyle: {
        // justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(1),
        marginVertical: wp(3),
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