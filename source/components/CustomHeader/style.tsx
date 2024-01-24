import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';
import { ConstValue } from '../../utils/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white
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
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,

    },
    viewBlackBackground: {
        // backgroundColor: Colors.lightBlack
        backgroundColor: 'transparent'
    },
    imageDrawerIcon: {
        fontSize: wp(6),
        paddingRight: wp(3),
        color: Colors.white
    }
});

export default Styles