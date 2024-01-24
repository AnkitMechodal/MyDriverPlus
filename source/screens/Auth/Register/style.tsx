import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../themes/index';
import { ConstValue } from '../../../utils/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    viewLogin: {
        justifyContent: 'center',
        flex: ConstValue.value1,
    },
    imageAppIcon: {
        width: wp(50),
        height: wp(50),
        alignSelf: 'center'
    },
    viewMargin: {
        margin: wp(8),
    },
    viewSub1: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'flex-end',
    },
    viewSub2: {
        backgroundColor: Colors.white,
        alignSelf: 'center',
        marginVertical: wp(10),
        margin: wp(8),
    },
    viewSub3: {
        flex: 1,
        backgroundColor: Colors.white
    }
});

export default Styles