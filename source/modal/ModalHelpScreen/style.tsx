import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    imageStop: {
        width: wp(6),
        height: wp(6),
        borderRadius: wp(50),
        alignSelf: 'center',
    },
    imageArrow: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(50),
        alignSelf: 'center',
    },
    helpConatiner: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: wp(4)
    },
    ItemSeparatorComponent: {
        width: '90%',
        height: wp(0.1),
        backgroundColor: Colors.grayDrawerBg,
        marginHorizontal: wp(5)
    },
    viewModalMargin: {
        margin: 0,
        backgroundColor: 'black'
    },
});

export default Styles