import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.splashBackground
    },
    imageArrowLeft: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        marginTop: wp(6),
    },
    imageSearchIcon: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        marginTop: wp(2)
    }

});

export default Styles