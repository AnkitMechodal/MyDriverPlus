import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewCenterContain: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: "center"
    },
    viewPayImage: {
        width: wp(35),
        height: wp(35),
        alignSelf: "center"
    },
    viewHorizonatlLine: {
        height: wp(0.1),
        backgroundColor: Colors.grayDrawerBg,
        width: wp(85),
        marginVertical: wp(5)
    },
    viewSeprateLine2: {
        height: wp(0.1),
        marginVertical: wp(3),
        backgroundColor: 'gray',
        marginHorizontal: wp(3)
    },
    viewHeader: {
        height: wp(30),
        backgroundColor: Colors.header,
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        justifyContent: 'center',
        width: "100%"
    },
    bottamClickContain: {
        flexDirection: 'row',
        padding: wp(2)
    },
    imageStop: {
        width: wp(25),
        height: wp(25),
        borderRadius: wp(3),
        marginHorizontal: wp(3),
    },
    imageCall: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(3),
        marginHorizontal: wp(5),
    },
    customRatingBarStyle: {
        // justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(1),
        marginVertical: wp(3),
    },
    starImageStyle1: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'cover',
        marginHorizontal: wp(0.5)
    },
    viewGrayLineHorizontal: {
        height: wp(0.1),
        backgroundColor: Colors.grayFull,
        width: wp(95),
        marginVertical: wp(5),
        marginHorizontal: wp(3)
    },
    viewSeprateLine3: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginHorizontal: wp(5)
    },
    viewLoreumText: {
        height: "auto",
        backgroundColor: Colors.grayBox,
        marginVertical: wp(3),
        padding: wp(5)
    },
    carImageIcon: {
        width: wp(25),
        height: wp(20),
        borderRadius: wp(3),
        marginHorizontal: wp(2)
    },
    viewModalMargin: {
        margin: 0,
        backgroundColor: 'black'
    },
});

export default Styles