import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewMapview: {
        flex: 1, width: "100%", height: '100%'
    },
    overlay: {
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: wp(50),
        backgroundColor: Colors.black,
        width: wp(10),
        height: wp(10),
        marginHorizontal: wp(3),
        marginTop: wp(7), // 6 // 3
    },
    viewBlackBackground: {
        backgroundColor: 'transparent'
    },
    imageOpenIcon: {
        width: wp(5),
        height: wp(5),
        marginLeft: wp(2),
        tintColor: Colors.white
    },
    imageFavIcon: {
        width: wp(7),
        height: wp(7),
        marginLeft: wp(2),
        tintColor: Colors.white
    },
    imageCloseIcon: {
        width: wp(4),
        height: wp(4),
        marginLeft: wp(2),
        tintColor: Colors.white
    },
    viewMargin: {
        marginLeft: wp(4)
    },
    viewPick1: {
        flex: 1,
        position: 'absolute',
    },
    viewPick2: {
        // flex: 1,
        // position: 'absolute',
        justifyContent: 'flex-end'
    },
    viewModalPick: {
        justifyContent: 'flex-end',
        margin: 0,
        height: 'auto',
    },
    viewPickConatiner: {
        backgroundColor: Colors.desc,
        justifyContent: "center",
        padding: wp(2),
    },
    viewHorizontalLine: {
        height: wp(0.1),
        marginHorizontal: wp(5),
        backgroundColor: 'gray'
    },
    viewAddressConatiner: {
        flexDirection: 'row',
        padding: wp(4)
    },
    viewLocationAddress: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: wp(80)
    },
    viewChangeLocation: {
        justifyContent: 'center',
        padding: wp(4)
    },
    viewModalVisibleConatiner: {
        justifyContent: 'flex-end',
        margin: 0,
        height: 'auto',
        marginTop: hp(50),
    },
    textConatiner: {
        backgroundColor: Colors.desc,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp(2),
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5)
    },
    imageModalCloseIcon: {
        justifyContent: 'center',
        marginHorizontal: wp(5)
    }
});

export default Styles

