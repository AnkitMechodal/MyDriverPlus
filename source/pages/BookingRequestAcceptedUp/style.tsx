import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    blueDot: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
        // marginTop: wp(5)
    },
    viewModalMargin: {
        margin: 0,
        backgroundColor: 'black'
    },
    blueDot1: {
        width: wp(3),
        height: wp(3),
        justifyContent: 'center',
        marginLeft: wp(5),
        marginTop: wp(4),
    },
    lineVerticalLine1: {
        width: wp(0.5),
        backgroundColor: 'white',
        // alignSelf: 'center',
        marginLeft: wp(6), // 6
        height: wp(1),
        marginVertical: wp(1)
    },
    viewMapview: {
        flex: 1,
        width: "100%",
        height: '100%'
    },
    imageStop: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(50),
        marginHorizontal: wp(4),
    },
    viewRatting: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(1),
        marginVertical: wp(3),
        marginHorizontal: wp(2)
    },
    starImageStyle: {
        width: wp(12),
        height: wp(12),
        resizeMode: 'cover',
        marginHorizontal: wp(1)
    },
    starImageStyle1: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'cover',
        marginHorizontal: wp(0.5)
    },
    requestHeaderConatin: {
        height: wp(45),
        backgroundColor: Colors.blue,
        borderBottomLeftRadius: wp(8),
        borderBottomRightRadius: wp(8),
        width: "100%",
        position: 'absolute'
    },
    // textKMConatiner: {
    //     backgroundColor: "white",
    //     width: wp(15),
    //     height: wp(15),
    //     borderRadius: wp(50),
    //     marginHorizontal: wp(10), // 3 //10
    //     alignSelf: "flex-end"
    // },
    // marginRight: {
    //     marginRight: wp(12),
    //     // marginVertical: wp(2),
    //     // marginHorizontal: wp(10), // 3 //10
    //     alignSelf: "flex-end"
    // },

    textKMConatiner: {
        backgroundColor: "white",
        width: wp(15),
        height: wp(15),
        borderRadius: wp(50),
        marginHorizontal: wp(9), // 3 //10
        justifyContent: 'center',
        alignSelf: "flex-end",
    },
    marginRight: {
        // alignSelf: "flex-end",
        // marginHorizontal: wp(10), // 3 //10 todooooo1
        marginRight: wp(10),
        justifyContent: 'center',
        alignSelf: "flex-end",
    },
    marginVertical: {
        marginVertical: wp(115),
    },
    bottamUserConatin: {
        height: wp(22),
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        // marginVertical: wp(1),
        marginHorizontal: wp(3),
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    blueRide: {
        height: wp(22),
        padding: wp(2),
        backgroundColor: Colors.blue,
        borderTopRightRadius: wp(10),
        borderTopLeftRadius: wp(10),
        marginVertical: wp(1),
        flexDirection: "row",
    },
    riderConatin: {
        flexDirection: "row",
    },
    modalIOS: {
        backgroundColor: Colors.grayBox,
        borderRadius: wp(3),
        padding: wp(3),
        height: "auto",
        alignSelf: "center"
    },
    timerValueContain: {
        backgroundColor: "white",
        width: wp(15),
        height: wp(15),
        borderRadius: wp(50),
        alignSelf: "center"
    },
    bottamClickContain: {
        justifyContent: "center",
        flexDirection: 'row'
    },
    viewModalDriver: {
        height: wp(70),
        backgroundColor: Colors.grayBox,
        width: "100%",
        borderRadius: wp(5),
        padding: wp(3),
        justifyContent: 'center',
    },
    modalStyle: {
        margin: 0
    },
    modalConatiner: {
        height: "auto",
        borderRadius: wp(5),
        margin: wp(4),
        padding: wp(5),
        backgroundColor: Colors.grayBox,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewInput1: {
        flexDirection: "row",
        marginVertical: wp(5)
    },
    viewImage: {
        width: wp(10),
        justifyContent: 'center',
    },
    viewImage1: {
        width: wp(50),
        justifyContent: 'center',
    }
});

export default Styles