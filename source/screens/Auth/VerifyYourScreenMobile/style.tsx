import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    imageSearchIcon: {
        width: wp(16),
        height: wp(16),
        marginTop: wp(2)
    },
    viewFirstConatiner: {
        margin: wp(6),
        flex: 1,

    },
    viewSecondConatiner: {
        alignContent: 'flex-end',
        flex: 1,
        marginTop: hp(1)
    },
    accountEmail: {
        flexDirection: 'row',
        marginTop: hp(3)
    },
    buttonContinue: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    viewVerfiyAccount: {
        alignContent: 'flex-end',
        flex: 1,
        marginTop: hp(1)
    }


});

export default Styles