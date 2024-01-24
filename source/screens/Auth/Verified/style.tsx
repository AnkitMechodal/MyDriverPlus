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
    viewVerfiedConatiner: {
        alignContent: 'flex-end',
        flex: 1,
        marginTop: hp(1)
    },
    viewAccountEmail: {
        flexDirection: 'row',
        marginTop: hp(3)
    },
    buttonSignUp: {
        flex: 1,
        justifyContent: 'flex-end'
    }

});

export default Styles