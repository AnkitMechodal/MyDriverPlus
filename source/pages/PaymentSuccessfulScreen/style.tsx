import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewCenterContain: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: "center"
    },
    viewModalMargin: {
        margin: 0,
        backgroundColor: 'black'
    },
    viewPayImage: {
        width: wp(35),
        height: wp(35),
        alignSelf: "center"
    },
    viewHorizonatlLine: {
        height: wp(0.1),
        backgroundColor: Colors.grayDrawerBg,
        width: wp(85),
        marginVertical: wp(5)
    },
    viewSeprateLine2: {
        height: wp(0.1),
        marginVertical: wp(3),
        backgroundColor: 'gray',
        marginHorizontal: wp(3)
    },
});

export default Styles