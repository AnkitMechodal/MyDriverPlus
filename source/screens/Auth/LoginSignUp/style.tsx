import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../themes/index';


const Styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    imageLocationIcon: {
        width: wp(8),
        height: wp(8),
        alignSelf: 'center',
        marginTop: wp(35),
        marginLeft: wp(10),
    },
    imageStrokeIcon: {
        width: wp(18),
        height: wp(18),
        alignSelf: 'center',
    },
    bottamContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        margin: hp(2)
    },
    imageBreakIcon: {
        width: "auto",
    },
});

export default Styles