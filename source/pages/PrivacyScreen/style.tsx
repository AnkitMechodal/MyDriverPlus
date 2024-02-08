import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Assuming you have imported Colors from somewhere else
    },
    viewHeader: {
        height: wp(30),
        backgroundColor: Colors.header,
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        justifyContent: 'center'
    },
    viewAbout: {
        height: wp(0.1),
        backgroundColor: Colors.circleGray,
        width: wp(80),
        alignSelf: 'center',
        marginVertical: wp(5)
    }
});

export default Styles