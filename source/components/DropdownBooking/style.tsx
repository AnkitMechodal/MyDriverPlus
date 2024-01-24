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
    button: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        padding: wp(2), // 10
        width: wp(45), // 'auto',
        marginLeft: 5,
    },
    imageSearchIcon: {
        width: wp(5),
        height: wp(5),
        marginHorizontal: wp(3),
        marginTop: wp(2)
    },
    dropdown: {
        width: '60%',
        zIndex: 1
    },
    placeholderStyle: {
        color: 'white', // Set placeholder text color to white
    },
    selectedTextStyle: {
        color: 'white', // Set selected item text color to white
    },
    iconStyle: {
        color: 'white', // Set icon color to white
    },
    imageDownArrow: {
        width: wp(4), //4
        height: wp(4), //4
        alignSelf: 'center',
        marginRight: wp(2),
        tintColor: Colors.white,
    },
    imageSelected: {
        width: wp(4),
        height: wp(4),
        alignSelf: 'center',
        marginRight: wp(2),
        marginTop: wp(2) //
    },
    textLabel: {
        color: Colors.gray,
        marginTop: wp(1.5),
    },
    imageBookingDownArrow: {
        width: wp(3),
        height: wp(3),
        alignSelf: 'center',
        marginRight: wp(2),
        tintColor: Colors.white,
    },

});

export default Styles