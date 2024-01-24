import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewSelectTypeConatiner: {
        flexDirection: 'row',
        height: 'auto',
        borderRadius: wp(2),
        padding: wp(3.5),
        width: wp(90),
        backgroundColor: Colors.grayDark,
    },
    viewOpenModal: {
        flexDirection: 'row',
        flex: 1
    },
    viewDownArrow: {
        width: wp(4),
        height: wp(4),
        marginTop: wp(1),
        alignSelf: 'flex-end'
    },
    viewModal: {
        marginTop: wp(85),
    },
    textHint: {
        color: "gray",
        fontSize: wp(4)
    }
});

export default Styles