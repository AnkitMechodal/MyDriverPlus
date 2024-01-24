import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors, Fonts } from '../../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    tabIconStyle: {
        width: wp(8), height: wp(8)
    },
    viewMargin: {
        margin: wp(3)
    },
    imageCategoryIcon: {
        width: wp(10),
        height: wp(10),
        alignSelf: 'center'
    },
    imageSlider: {
        width: wp(90),
        height: hp(25),
        marginHorizontal: wp(2)
    },
    viewDot: {
        height: 0
    },
    viewInterests: {
        margin: wp(2),
    },
    viewTop: {
        marginTop: wp(2)
    },
    viewCategory: {
        backgroundColor: '#E9FFF8',
        height: wp(15),
        width: wp(15),
        borderRadius: wp(4),
        justifyContent: 'center',
        marginHorizontal: wp(1),
    },
    imageCategory: {
        width: wp(10),
        height: wp(10),
        alignSelf: 'center'
    },
    viewListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listMargin:{
        marginBottom: wp(20)
    },
    viewShadow: {
        width: wp(43),
        height: hp(38),
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: wp(3),
        margin: wp(2),
    },
    viewBookBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: wp(3),
    },
    viewBookRating: {
        borderRadius: wp(2),
        backgroundColor: Colors.buttonBackgroundColor,
        width: wp(18),
        height: wp(8),
        justifyContent: 'center',
        flexDirection: 'row',
        padding: wp(1),
    },
    imageRateIcon: {
        width: wp(5),
        height: wp(5),
    },
    textRatePrice: {
        color: Colors.white,
        fontWeight: "600",
        fontSize: wp(4),
        marginLeft: wp(2),
        fontFamily: Fonts.InterSemiBold,
    },
    viewBookMark: {
        width: wp(10),
        height: wp(10),
        backgroundColor: Colors.bookBackground,
        borderRadius: wp(50),
        justifyContent: 'center'
    },
    imageBookIconColor: {
        width: wp(4),
        height: wp(4),
        alignSelf: 'center',
    },
    imageBookIcon: {
        width: wp(30),
        height: wp(30),
        alignSelf: 'center',
        marginBottom: wp(2),
    },
    viewBookContain: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textBookTitle: {
        color: Colors.lightBlack,
        fontWeight: "600",
        fontSize: wp(3),
        marginTop: wp(2),
        fontFamily: Fonts.InterSemiBold,
    },
    textBookPrice: {
        color: Colors.buttonBackgroundColor,
        fontWeight: "500",
        fontSize: wp(3),
        fontFamily: Fonts.InterSemiBold,
        marginTop: wp(2)
    },
    viewBookLock: {
        width: wp(8),
        height: wp(8),
        backgroundColor: Colors.bookBackground,
        borderRadius: wp(50),
        justifyContent: 'center',
        marginTop: wp(4)
    },
    imageBookLock: {
        width: wp(4),
        height: wp(4),
        alignSelf: 'center'
    },
    viewContentContainerStyle: {
        margin: wp(3),
        marginBottom: wp(25)
    }
});

export default Styles