import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors } from '../../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    viewCommon: {
        flexDirection: 'row', marginHorizontal: wp(15),
    },
    ViewModal: {
        width: wp(80),
        height: hp(5),
        backgroundColor: Colors.white,
        borderRadius: wp(4),
        marginHorizontal: wp(10),
        marginVertical: hp(40),
    },
    imageIcon: {
        width: wp(8),
        height: wp(8)
    },
    imageAccountSign: {
        width: wp(50),
        height: wp(50),
        alignSelf: 'center'
    },
    viewMain: {
        flexDirection: 'row',
        marginVertical: hp(15)
    },
    viewCenter: {
        flexDirection: 'row', 
        marginHorizontal: wp(15),
        marginVertical: hp(4)
    },
    textHorizontal: {
        marginHorizontal: wp(5)
    },
    imageUserIcon: {
        width: wp(10),
        height: wp(10),
        alignSelf: 'center'
    },
    viewCircle: {
        width: wp(20),
        height: wp(20),
        backgroundColor: Colors.buttonBackgroundColor,
        borderRadius: wp(50),
        justifyContent: 'center',
        marginHorizontal: wp(8)
    }
});

export default Styles