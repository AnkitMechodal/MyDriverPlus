import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    imageHomeIcon: {
        width: wp(7),
        height: wp(7),
        marginTop: wp(2),
    },
    imageHomeGrayIcon: {
        width: wp(7),
        height: wp(7),
        marginTop: wp(2),
        tintColor: Colors.grayDark
    },
    imageHomeGrayIcon1: {
        width: wp(7),
        height: wp(7),
        marginTop: wp(2),
        tintColor: Colors.grayDark
    },
    imageStrokeIcon: {
        width: wp(5),
        height: wp(5),
        alignSelf: 'center',
        marginHorizontal: wp(8)
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    viewDrawerScrollView: {
        backgroundColor: Colors.darkBlue,
        height: hp(18),
    },
    viewStoke: {
        marginTop: hp(3.5),
    },
    viewProfile: {
        marginHorizontal: wp(5),
        flexDirection: 'row'
    },
    imageProfieIcon: {
        width: wp(10),
        height: wp(10),
        marginTop: wp(3)
    },
    viewEditProfile: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textEditProfile: {
        color: 'white',
        fontSize: wp(3.5),
        fontFamily: Fonts.PoppinsRegular
    },
    imageRightArrowProfileIcon: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white,
        marginLeft: wp(22)
    },
    imageRightArrowProfileIcon1: {
        width: wp(6),
        height: wp(6), // 6
        tintColor: Colors.white,
        marginLeft: wp(30)
    },
    headerTitleStyle: {
        color: Colors.black,
        fontSize: wp(4),
    },
    drawerLabelStyle: {
        color: Colors.black,
        fontSize: wp(4)
    },
    imageUserEditIcon: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white
    },
    imageUserEditIconDeafult: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.grayFull
    },
    imageUserEditHome: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white,
    },
    drawerStyle: {
        backgroundColor: Colors.black,
        width: wp(80)
    },
    viewUpcoming: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textUpcoming: {
        color: 'white',
        fontSize: wp(3.5),
        fontFamily: Fonts.PoppinsRegular
    },
    imageRightArrowUpcoming: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white,
        marginLeft: wp(8) // 5
    },
    imageUpcomingIcon: {
        width: wp(8),
        height: wp(8),
        tintColor: Colors.white
    },
    viewPreferredDriver: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textPreferedDriver: {
        color: 'white',
        fontSize: wp(3.5),
        fontFamily: Fonts.PoppinsRegular
    },
    imageRightArrowDriver: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white,
        marginLeft: wp(12)
    },
    imageDriver: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.grayDark
    },
    textSavedLocation: {
        color: 'white',
        fontSize: wp(3.5),
        fontFamily: Fonts.PoppinsRegular
    },
    textSavedLocationMode: {
        color: 'white',
        fontSize: wp(3.5),
        fontFamily: Fonts.PoppinsSemiBold,
        marginTop: wp(3),
        marginLeft: wp(5)
    },
    imageRightArrowPrivacyIcon: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white,
        marginLeft: wp(15)
    },
    imageLove: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.grayDark,
    },
    imagePrivacy: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.grayDark,
    },
    textTermsAndCondition: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white,
        alignSelf: "center",
        marginLeft: wp(20)
    },
    imageTerms: {
        width: wp(7),
        height: wp(7),
        tintColor: Colors.grayDark,
        // marginLeft: wp(1)
    },
    imageRightArrowAbout: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white,
        marginLeft: wp(24) // 24
    },
    imageAboutIcon: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.grayFull,
        // marginLeft: wp(2) // 24
    },
    imageArrowRightFaq: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white,
        marginLeft: wp(35) // 35
    },
    imageArrowRightMode: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.white,
        marginLeft: wp(20) // 35
    },
    imageFqaIcon: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.grayDark,
    },
    textLogout: {
        color: 'white',
        fontSize: wp(4),
        marginTop: wp(4),
        fontFamily: Fonts.PoppinsRegular
    },
    imageExitIcon: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.gray,
        marginTop: wp(4),
    },
    imageHelpIcon: {
        width: wp(6),
        height: wp(6),
        tintColor: Colors.gray,
    },
    tabBarLabelStyle: {
        fontSize: wp(3),
    },
    headerStyle: {
        backgroundColor: Colors.white,
    },
    drawerLabelUpcomingStyle: {
        color: Colors.white,
        fontSize: wp(4) // 4
    },
    drawerLabelLogout: {
        color: Colors.white,
        fontSize: wp(3.5),
        marginTop: wp(2),
    },
    helpLabel: {
        color: Colors.white,
        fontSize: wp(3.5),
    },
    textHelp: {
        color: 'white',
        fontSize: wp(4),
        fontFamily: Fonts.PoppinsRegular
    },
    viewModalConatiner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewModal: {
        width: wp(75),
        padding: wp(2),
        backgroundColor: Colors.white, // grayFull
        borderRadius: wp(2),
        alignItems: 'center',
    },
    textAreYouSure: {
        color: Colors.black,
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: wp(3.5),
        textAlign: "center"
    },
    viewModalCenterConatiner: {
        flexDirection: "row",
        marginVertical: wp(2)
    },
    textCancel: {
        color: Colors.red,
        fontFamily: Fonts.PoppinsMedium,
        fontSize: wp(3.5),
        width: wp(25)
    },
    textOk: {
        color: Colors.black,
        fontFamily: Fonts.PoppinsMedium,
        fontSize: wp(3.5),
    }
});

export default Styles