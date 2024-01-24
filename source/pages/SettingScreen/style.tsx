import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

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
    }
});

export default Styles