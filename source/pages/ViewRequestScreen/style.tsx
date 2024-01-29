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
    viewGrayLineHorizontal: {
        height: wp(0.1),
        backgroundColor: Colors.grayFull,
        width: wp(80),
        marginVertical: wp(5),
        marginHorizontal: wp(3)
    },
    viewContentContainerStyle: {
        marginHorizontal: wp(2)
    },
    requestConatiner: {
        height: "auto",
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        padding: wp(3),
        marginVertical: wp(2),
        margin: wp(2)
    },
    rowCenter: {
        flexDirection: "row",
        justifyContent: "center"
    },
    rowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(1),
        marginVertical: wp(5)
    },
    starImageStyle: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'cover',
        marginHorizontal: wp(0.5)
    },
    imageUser: {
        width: wp(15),
        height: wp(15),
        borderRadius: wp(50),
        marginHorizontal: wp(2)
    },

});

export default Styles