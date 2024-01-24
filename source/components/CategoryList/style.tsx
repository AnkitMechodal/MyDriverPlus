import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.splashBackground
    },
    viewCategory: {
        backgroundColor: Colors.lightBlue,
        height: wp(15),
        width: wp(15),
        borderRadius: wp(4),
        justifyContent: 'center',
        marginHorizontal: wp(2)
    },
    imageCategoryIcon: {
        width: wp(10),
        height: wp(10),
        alignSelf: 'center'
    },
    viewContentContainerStyle: {
        marginVertical: wp(2)
    }


});

export default Styles