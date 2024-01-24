import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    whiteDot: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
        marginTop: wp(2)
    },
    lineVerticalLine1: {
        width: wp(0.5),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginLeft: wp(5),
        height: wp(1),
        marginVertical: wp(1)
    },
    lineVerticalLine3: {
        width: wp(0.5),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginLeft: wp(5),

        height: wp(1),
    },
    orangeDot: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
    },
    viewContentContainerStyle: {
        marginVertical: wp(2)
    },
});

export default Styles