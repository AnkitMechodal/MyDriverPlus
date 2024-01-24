import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.splashBackground
    },
    viewContentContainerStyle: {
        marginVertical: wp(2)
        // flex: 1
    },
    viewMainConatiner: {
        height: "auto",
        backgroundColor: Colors.grayDrawerBg,
        marginVertical: wp(2),
        borderRadius: wp(3),
        marginHorizontal: wp(3),
        padding: wp(3),
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    imageHeart: {
        width: wp(7),
        height: wp(7),
        opacity: 0.7,
        tintColor: Colors.blue
    },
    imageMap: {
        width: wp(7),
        height: wp(7),

    },
    imageHeartFill: {
        width: wp(7),
        height: wp(7),
        tintColor: Colors.blue
    },
    viewMapConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: wp(2), // 5
    },
    viewUserLcoation: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: wp(10)
    },
    viewFavourite: {
        justifyContent: 'center',
        marginHorizontal: wp(10)
    },
    ItemSeparatorComponent: {
        width: '90%',
        height: wp(0.1),
        backgroundColor: Colors.grayDrawerBg,
        marginHorizontal: wp(5)
    }
});

export default Styles