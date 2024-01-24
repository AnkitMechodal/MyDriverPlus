import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewButtonUpdate: {
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        paddingVertical: wp(2),
        borderBottomWidth: 1,
        borderColor: Colors.white,
    },
    textLabel: {
        color: Colors.gray
    },
    imageDefaultDownArrow: {
        width: wp(5),
        height: wp(5),
        marginRight: wp(2),
    },
    imageUser: {
        width: wp(25),
        height: wp(25),
        borderRadius: wp(50),
        alignSelf: 'center',
    },
    onItemPress: {
        flexDirection: 'row',
        marginLeft: wp(4)
    },
    modalStyle: {
        marginTop: wp(15)
    },
    imageOpenIcon: {
        width: wp(5),
        height: wp(5),
        marginLeft: wp(2),
        alignSelf: 'center',
    },
    dropdown: {
        backgroundColor: Colors.grayDark,
        width: wp(22),
        marginLeft: wp(5),
    },
});

export default Styles