import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewContentContainerStyle: {
        // marginVertical: wp(2)
        marginHorizontal: wp(2)
    },
    carImageIcon: {
        width: wp(25),
        height: wp(20),
        borderRadius: wp(3),
        marginHorizontal: wp(2)
    },
});

export default Styles