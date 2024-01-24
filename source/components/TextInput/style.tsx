import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.splashBackground
    },
    imageArrowLeft: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        marginTop: wp(6),
    },
    imageSearchIcon: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        alignSelf: 'center',
        tintColor: Colors.grayDark
    },
    imagePinIcon: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        alignSelf: 'center',
        tintColor: Colors.gray
    },
    imageClockIcon: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        alignSelf: 'center',
        tintColor: Colors.grayFull
    },
    imageDistnaceIcon: {
        width: wp(6),
        height: wp(6),
        marginHorizontal: wp(3),
        alignSelf: 'center',
        tintColor: Colors.gray
    },
    imageCurrentPsw: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        alignSelf: 'center',
        tintColor: Colors.gray
    },
    imageWhiteIcon: {
        width: wp(6),
        height: wp(6),
        marginLeft: wp(2),
        alignSelf: 'center',
        tintColor: Colors.gray
    },
    imageEyeIcon: {
        width: wp(6),
        height: wp(6),
        marginHorizontal: wp(3),
        alignSelf: 'center',
        tintColor: Colors.grayDark,
        marginTop: wp(3.5),
    },
    imageCloseIcon: {
        width: wp(3.5),
        height: wp(3.5),
        marginHorizontal: wp(17),
        tintColor: Colors.white,
        marginTop: wp(3.5),
    },
    imageFavouriteIcon: {
        width: wp(6),
        height: wp(6),
        // marginHorizontal: wp(3),
        marginRight: wp(25),
        // alignSelf: 'center',
        marginTop: wp(3.5),
    },
    imageMailIcon: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        alignSelf: 'center',
        tintColor: Colors.grayDark,
    },
    imageBinddingIcon: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        alignSelf: 'center',
        tintColor: Colors.gray
    },
    imageMailIconWhite: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        alignSelf: 'center',

    },
    imageMailGrayIcon: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        alignSelf: 'center',
        tintColor: Colors.grayDark,
    },
    imageCrossIcon: {
        width: wp(3.5),
        height: wp(3.5),
        marginHorizontal: wp(3),
    },

});

export default Styles