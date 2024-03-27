import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.splashBackground
    },
    viewContentContainerStyle: {
        marginVertical: wp(2)
    },
    viewItemImage1: {
        width: wp(5),
        flex: 1,
        // color: Colors.white,
        // tintColor: Colors.white,
    },
    viewItemImage2: {
        width: wp(5),
        alignSelf: 'center',
        color: Colors.white,
        transform: [{ rotate: '180deg' }]
    },
    viewMainConatiner: {
        height: "auto", // wp(15)
        backgroundColor: "#00008b",
        borderTopRightRadius: wp(3),
        borderTopLeftRadius: wp(3),
        marginTop: wp(5),
        marginHorizontal: wp(4),
        opacity: 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    descExapnd: {
        height: "auto",
        backgroundColor: "#282931",
        justifyContent: 'center',
        marginHorizontal: wp(4),
        padding: wp(1),
    },
    descText: {
        fontFamily: Fonts.PoppinsRegular,
        fontWeight: "600",
        fontSize: wp(3.5),
        marginHorizontal: wp(3),
        color: Colors.white
    }
});

export default Styles