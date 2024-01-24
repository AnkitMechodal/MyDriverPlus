import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    whiteDot: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
        marginTop: wp(2)
    },
    textDollar: {
        marginHorizontal: wp(5),
        flex: 1,
        justifyContent: 'center',
    },
    infoImageIcon: {
        width: wp(4),
        height: wp(4),
        borderRadius: wp(3),
        tintColor: Colors.gray,
        marginHorizontal: wp(2),
    },
    viewInfoConatiner: {
        flex: 1,
        // marginVertical: wp(6)
        justifyContent: 'center',
    },
    carImageIcon: {
        width: wp(25),
        height: wp(25),
        borderRadius: wp(3),
    },
    lineVerticalLine1: {
        width: wp(0.5),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginLeft: wp(5),
        height: wp(1),
        marginVertical: wp(1)
    },
    lineVerticalLine3: {
        width: wp(0.5),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginLeft: wp(5),
        height: wp(1),
    },
    orangeDot: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
    },
    viewContentContainerStyle: {
        // marginVertical: wp(2)
        // flex: 1
    },
    textLeftCorner: {
        marginTop: wp(-5)
    },
    modalCarImage: {
        width: wp(25),
        height: wp(25),
        borderRadius: wp(3),
        alignSelf: "center",
        marginTop: wp(-15)
    },
    viewSecond: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: "row"
    },
    infoImageConatiner: {
        marginTop: hp(3.5)
    },
    modalConatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:Colors.blackLight,
        // borderRadius:wp(5)
    },
    modalUserImage: {
        borderRadius: 10,
    },
    modalUserConatiner: {
        backgroundColor: Colors.grayDrawerBg,
        height: "auto",
        width: wp(80),
        padding: wp(3),
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        borderRadius: wp(3),
    },
    modalUserName: {
        flexDirection: "row",
        justifyContent: 'space-between'
    }
});

export default Styles