import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors } from '../../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    tabBarIcon: {
        width: wp(6),
        height: wp(6)
    },
    tabBarStyle: {
        position: 'absolute',
        height: hp(9),
        backgroundColor: Colors.white,
        borderTopRightRadius: wp(7),
        borderTopLeftRadius: wp(7),
    },
    tabBarLabelStyle: {
        fontSize: wp(4),
        marginVertical: wp(1)
    }

});

export default Styles