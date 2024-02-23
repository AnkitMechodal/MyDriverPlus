import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../../themes/index';
import { ConstValue } from '../../utils';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewDot: {
        height: 0,
    },
    modalContainer: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    viewCustomHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: wp(5),
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderColor: Colors.white,
        borderWidth: ConstValue.value0,
        borderRadius: wp(2),
        padding: wp(1),
        height: wp(14),

    },
    viewModal: {
        // backgroundColor: 'rgba(0, 0, 0, 0.25)',
        backgroundColor: Colors.black,
        justifyContent: 'center',
        height: hp(45),
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        borderColor: 'white',
        borderWidth: 0,
        alignSelf: 'center',
        width: '100%',
    },
    dotStyle: {
        width: wp(3),
        height: wp(3),
        borderRadius: 15,
        padding: 0,
        margin: 0,
    },
    modalConainer: {
        justifyContent: 'space-evenly',
        // flexDirection: 'row',
        marginTop: wp(4),
        alignSelf: 'center',
        flex: 1
    },
    viewItem1: {
        alignSelf: 'center',
        height: wp(20),
        width: wp(20),
        backgroundColor: 'rgba(0, 64, 255, 0.9)',
        borderRadius: wp(3),
        justifyContent: 'center'
    },
    viewItemImage1: {
        width: wp(12),
        alignSelf: 'center'
    },
    textTexiBooking: {
        color: 'white',
        marginTop: wp(4),
        alignSelf: 'center',
        fontFamily: Fonts.PoppinsBold
    },
    imageCouierIcon: {
        width: wp(10),
        alignSelf: 'center'
    },
    sliderBox: {
        marginHorizontal: wp(5),
        marginTop: wp(18)
    },

    overlay: {
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: wp(2),
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        height: wp(14),
        padding: wp(2),
        marginTop: wp(10),
        alignSelf: 'center',
    },
    overlayFixedView: {
        position: "absolute",
        alignItems: 'center',
        borderTopLeftRadius: wp(8),
        borderTopRightRadius: wp(8),
        backgroundColor: Colors.header,
        height: '100%', //  height: "auto",
        // padding: wp(2),
        alignSelf: 'center',
        marginVertical: wp(83),
        width: '100%',
    },
    overlayFixedView_Bottam: {
        position: "absolute",
        alignItems: 'center',
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        backgroundColor: Colors.black,
        marginTop: wp(18), //15
        height: "auto",
        padding: wp(2),
        alignSelf: 'center',
        width: '100%',
    },
    viewBlackBackground: {
        backgroundColor: 'transparent'
    },
    imageOpenIcon: {
        width: wp(5),
        height: wp(5),
        marginLeft: wp(2)
    },
    viewMapview: {
        flex: 1, width: "100%", height: '100%'
    },
    viewMargin: {
        marginLeft: wp(4)
    },
    viewModalFixed: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: wp(15)
    },
    viewWhiteDot: {
        width: wp(3),
        height: wp(3),
        backgroundColor: Colors.white,
        borderRadius: wp(5),
        marginTop: wp(2)
    },
    viewBookingStatus: {
        flexDirection: 'row',
        padding: wp(4.5),
    }
});

export default Styles