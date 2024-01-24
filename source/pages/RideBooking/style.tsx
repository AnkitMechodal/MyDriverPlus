import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewHeader: {
        height: wp(30),
        backgroundColor: Colors.header,
        justifyContent: 'center'
    },
    tabBarLabelStyle: {
        fontFamily: Fonts.PoppinsBold,
        fontSize: wp(3.5),
        color: 'white',
        textTransform: "none",
    },
    tabBarItemStyle: {
        width: wp(50),
    },
    tabBarStyle: {
        backgroundColor: Colors.header,
    },
    tabBarIndicatorStyle: {
        backgroundColor: Colors.black,
        marginVertical: wp(2),
        width: wp(45),
        height: wp(1),
        marginHorizontal: wp(3)
    },
    viewTextLabel: {
        padding: wp(1),
        borderRadius: wp(3),
        textAlign: 'center',
        width: wp(48),
        fontFamily: Fonts.PoppinsRegular,
        fontWeight: "600",
        fontSize: wp(4),
        height: "auto"
    },
    viewMyTabBar: {
        flexDirection: 'row',
        backgroundColor: Colors.grayDrawerBg,
        margin: wp(3),
        borderRadius: wp(3)
    }
});

export default Styles