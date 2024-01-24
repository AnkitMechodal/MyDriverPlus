import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    dropdownContainer: {
        flex: 1,
        backgroundColor: Colors.black,
        width: '28%'
    },
    imageStrokeIcon: {
        width: wp(18),
        height: wp(18),
        alignSelf: 'center',
        // marginTop: wp(15)
    },
    imageAppIcon: {
        width: wp(5),
        height: wp(5),
        alignSelf: 'center'
    },
    label: {
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color: 'white'
    },
    dropdown: {
        backgroundColor: Colors.grayDark,
        width: wp(22),
        marginLeft: wp(5),
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
    button: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        marginLeft: 20,
    },
    item: {
        paddingVertical: wp(2),
        borderBottomWidth: 1,
        borderColor: Colors.white,
    },
    onItemPress: {
        flexDirection: 'row',
        marginLeft: wp(4)
    },
    imageDefaultDownArrow: {
        width: wp(5),
        height: wp(5),
        marginRight: wp(2),
    },
    textLabel: {
        color: Colors.gray
    },
    modalStyle: {
        marginTop: wp(25)
    },
    viewRememberForgotContainer: {
        backgroundColor: Colors.black,
        flexDirection: 'row',
        marginHorizontal: wp(2),
        justifyContent: 'center'
    },
    viewLoginWithMobile: {
        justifyContent: 'flex-end',
        flex: 1,
        marginVertical: hp(3)
    },


});

export default Styles