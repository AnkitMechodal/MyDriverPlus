import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    imageAccountSign: {
        width: wp(50),
        height: wp(50),
        alignSelf: 'center'
    },
    viewCenter: {
        flex: 1, justifyContent: 'center', alignSelf: 'center',
        margin: wp(5)
    }

});

export default Styles