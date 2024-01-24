import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    viewHeader: {
        height: wp(30),
        backgroundColor: Colors.header,
        borderBottomLeftRadius: wp(5),
        borderBottomRightRadius: wp(5),
        justifyContent: 'center'
    },
    viewAbout: {
        height: wp(0.1),
        backgroundColor: Colors.circleGray,
        width: wp(80),
        alignSelf: 'center',
        marginVertical: wp(5)
    },
    // imageUser: {
    //     width: wp(15),
    //     height: wp(15),
    //     borderRadius: wp(50),
    // },
    // imageHeart: {
    //     width: wp(8),
    //     height: wp(8),
    // },
    // viewRatting: {
    //     flexDirection: 'row',
    //     justifyContent: 'center'
    // },
    // customRatingBarStyle: {
    //     justifyContent: 'center',
    //     flexDirection: 'row',
    //     marginTop: wp(2)
    // },
    // starImageStyle: {
    //     width: wp(4),
    //     height: wp(4),
    //     resizeMode: 'cover',
    // },
    viewContentContainerStyle: {
        marginVertical: wp(2)
    },
    imageUser: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(50),
        alignSelf: 'center',
    },
    viewRatting: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(2)
    },
    starImageStyle: {
        width: wp(4),
        height: wp(4),
        resizeMode: 'cover',
    },
    imageHeart: {
        width: wp(7),
        height: wp(7),
        opacity: 0.7,
        tintColor: Colors.blue
    },
    imageHeartFill: {
        width: wp(7),
        height: wp(7),
        tintColor: Colors.blue
    },
    viewMainConatiner: {
        height: "auto",
        backgroundColor: Colors.grayDrawerBg,
        marginVertical: wp(2),
        borderRadius: wp(3),
        marginHorizontal: wp(3),
        padding: wp(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

});

export default Styles