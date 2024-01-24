import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
        marginTop: wp(3),
    },
    overlay1: {
        backgroundColor: Colors.grayDrawerBg,
        width: "100%",
        height: wp(50),
        marginHorizontal: wp(8),
        borderRadius: wp(3),
        marginTop: wp(20),
        flex: 1
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
    carImageIcon: {
        width: wp(25),
        height: wp(25),
        borderRadius: wp(3),
        // alignSelf: "center",
        // marginTop: wp(-15)
    },
    modalCarImage: {
        width: wp(25),
        height: wp(25),
        borderRadius: wp(3),
        alignSelf: "center",
        marginTop: wp(-15)
    },
    infoImageIcon: {
        width: wp(5),
        height: wp(5),
        borderRadius: wp(3),
        tintColor: Colors.gray,
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
        // position: 'absolute',
        // marginTop: wp(5),
        flexDirection: "row",
    },
    viewPick_: {
        position: 'absolute',
        marginTop: wp(5),
        flexDirection: "row",
    },
    viewPick2: {
        justifyContent: 'flex-end',
        // position: 'absolute'
    },
    viewModalPick: {
        justifyContent: 'flex-end',
        margin: 0,
        height: 'auto',
    },
    viewPickConatiner: {
        backgroundColor: Colors.black, // desc // black
        // justifyContent: "center",
        borderRadius: wp(5),
        // flex: 1
        // width: wp(100),
        // position: 'absolute'
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
        height: 'auto'
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
    },
    viewSelectedConatiner: {
        backgroundColor: Colors.circleGray,
        borderRadius: wp(3),
        marginHorizontal: wp(5),
        marginVertical: wp(2),
        flexDirection: "row",
    },
    textDollar: {
        marginHorizontal: wp(5)
    },
    viewInfoConatiner: {
        flex: 1,
        marginVertical: wp(5)
    },
    blueDot: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
        marginTop: wp(5)
    },
    whiteDot: {
        width: wp(6),
        height: wp(6),
        justifyContent: 'center',
        marginLeft: wp(4),
        // marginTop: wp(4)
    },
    lineVerticalLine1: {
        width: wp(0.2),
        backgroundColor: 'white',
        // alignSelf: 'center',
        marginLeft: wp(6), // 6
        height: wp(1),
        marginVertical: wp(1)
    },
    lineVerticalLine2: {
        width: wp(0.2),
        backgroundColor: 'white',
        // alignSelf: 'center',
        // marginLeft: wp(5),
        // marginLeft: wp(6), // 6
        height: wp(5),
        // marginVertical: wp(6),
        marginTop: wp(12),
        marginLeft: wp(-2)
    },
    lineHorizontalLine3: {
        width: wp(85),
        height: wp(0.2),
        // marginVertical: wp(2), // 4
        marginLeft: wp(2),
        marginTop: wp(-2),
        backgroundColor: Colors.grayFull
    },
    lineVerticalLine4: {
        width: wp(0.2),
        backgroundColor: 'white',
        // alignSelf: 'center',
        // marginLeft: wp(5),
        marginLeft: wp(6), // 6
        height: wp(3),
        marginVertical: wp(2)
    },
    viewOrangeDot: {
        width: wp(3.8),
        height: wp(3.8),
        // justifyContent: 'center',
        marginLeft: wp(-2),
        marginTop: wp(6),
    },
    textLeftCorner: {
        marginTop: wp(-5)
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

