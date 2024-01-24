import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    modalStyle: {
        marginTop: wp(15)
    },
    onItemPress: {
        flexDirection: 'row',
        marginLeft: wp(4)
    },
    dropdown: {
        backgroundColor: Colors.grayDark,
        width: wp(22),
        marginLeft: wp(5),
    },
    textLabel: {
        color: Colors.gray
    },
    item: {
        paddingVertical: wp(2),
        borderBottomWidth: 1,
        borderColor: Colors.white,
    },
    imageDefaultDownArrow: {
        width: wp(5),
        height: wp(5),
        marginRight: wp(2),
    },
    textCreateANewAccount: {
        margin: wp(3)
    },
    viewToggleCheckBoxContainer: {
        margin: wp(4),
        flexDirection: 'row'
    },
    viewRiseHeader: {
        marginBottom: wp(10)
    },
    viewFirstConatiner: {
        flex: 1,
        justifyContent: 'center',
    },
    viewSecondConatiner: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    viewModalMargin: {
        margin: 0,
        backgroundColor: 'black'
    },

});

export default Styles