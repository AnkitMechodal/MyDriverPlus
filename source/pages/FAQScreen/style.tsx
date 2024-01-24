import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
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
    imageUser: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(50),
        alignSelf: 'center',
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
        width: wp(6), height: wp(6),
        marginHorizontal: wp(2), tintColor: Colors.deleteBoxIcon
    },
    viewItemImage1: {
        width: wp(5),
        alignSelf: 'center',
        color: Colors.white,
    },
    viewItemImage2: {
        width: wp(5),
        alignSelf: 'center',
        color: Colors.white,
        transform: [{ rotate: '180deg' }]
    },
    viewHeader: {
        height: wp(30),
        backgroundColor: Colors.header,
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        justifyContent: 'center'
    },
    viewQuestion: {
        height: wp(15),
        backgroundColor: Colors.header,
        borderTopRightRadius: wp(3),
        borderTopLeftRadius: wp(3),
        marginTop: wp(5),
        marginHorizontal: wp(4)
    },
    viewDesc: {
        height: "auto", // 30
        backgroundColor: Colors.desc,
        justifyContent: 'center',
        marginHorizontal: wp(4)
    },
    viewDescrition: {
        fontFamily: Fonts.PoppinsRegular,
        fontWeight: "600",
        fontSize: wp(3.5), // 3.5
        marginHorizontal: wp(2),
        padding: wp(1),
        color: Colors.white
    }
});

export default Styles