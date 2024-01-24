import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewContentContainerStyle: {
        marginHorizontal: wp(2)
    },
    carImageIcon: {
        width: wp(30),
        height: wp(25),
        borderRadius: wp(3),
        marginHorizontal: wp(2)
    },
    imageUser: {
        width: wp(15),
        height: wp(15),
        borderRadius: wp(50),
        marginHorizontal: wp(2)
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
    requestConatiner: {
        height: "auto",
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        padding: wp(3),
        marginVertical: wp(2),
        margin: wp(2)
    },
    viewGrayLineHorizontal: {
        height: wp(0.1),
        backgroundColor: Colors.grayFull,
        width: wp(80),
        marginVertical: wp(5),
        marginHorizontal: wp(3)
    },
    rowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowCenter:{
        flexDirection: "row",
        justifyContent: "center"
    }

});

export default Styles