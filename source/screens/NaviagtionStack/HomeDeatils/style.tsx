import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    bookIcon: {
        margin: wp(5)
    },
    imageBookIcon: {
        width: wp(100),
        height: wp(60),
        alignSelf: 'center'
    },
    viewSection1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: wp(2)
    },
    textBookName: {
        color: Colors.lightBlack,
        fontWeight: "600",
        fontSize: wp(4),
        fontFamily: Fonts.InterSemiBold,
    },
    textBookRs: {
        color: Colors.buttonBackgroundColor,
        fontWeight: "500",
        fontSize: wp(4),
        fontFamily: Fonts.InterSemiBold,
    },
    viewBookMark: {
        width: wp(12),
        height: wp(12),
        backgroundColor: Colors.bookBackground,
        borderRadius: wp(50),
        justifyContent: 'center'
    },
    imageSaveBookMark: {
        width: wp(5),
        height: wp(5),
        alignSelf: 'center',
    },
    textBookTitle: {
        color: Colors.lightBlack,
        fontWeight: "600",
        fontSize: wp(4),
        fontFamily: Fonts.InterSemiBold,
    },
    textBookDescription: {
        color: Colors.lightBlack,
        fontWeight: "400",
        fontSize: wp(4),
        fontFamily: Fonts.InterRegular
    },
    viewBookInfo: {
        backgroundColor: Colors.white,
        borderRadius: wp(7),
        borderColor: Colors.borderColor,
        borderWidth: wp(1),
        flexDirection: 'row',
        height: wp(30),
        justifyContent: 'space-around'
    },
    textRsLabel: {
        color: Colors.black,
        fontWeight: "500",
        fontFamily: Fonts.InterSemiBold,
        justifyContent: 'center',
    },
    viewDot: {
        height: 0,
    },
});

export default Styles