import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewItemFour: {
        flexDirection: 'row',
        borderColor: Colors.grayDark,
        borderWidth: wp(0.5),
        borderRadius: wp(2),
        padding: wp(3),
        marginHorizontal: wp(4),
        marginVertical: wp(5)
    },
    imageHelpIcon: {
        width: wp(7),
        height: wp(7),
        marginLeft: wp(3)
    },
    imageRightArrow: {
        flex: 1, alignItems: 'flex-end', marginHorizontal: wp(2)
    },
    textTermsAndCondition: {
        width: wp(8),
        height: wp(8),
        tintColor: Colors.white,
        marginLeft: wp(3),
    },
    viewBlueBottamConatiner: {
        width: "100%",
        height: "auto",
        padding: wp(3),
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        backgroundColor: Colors.blue,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    viewWhiteDot: {
        width: wp(3),
        height: wp(3),
        backgroundColor: Colors.white,
        borderRadius: wp(5),
        marginTop: wp(2)
    },
    modalCancelConatiner: {
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        padding: wp(3),
        height: "auto",
        justifyContent: 'center'
    },
    ButtonYesNoConatiner: {
        flexDirection: "row",
        justifyContent: 'center'
    },
});

export default Styles