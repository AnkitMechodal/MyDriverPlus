import { StyleSheet } from 'react-native';
import { ConstValue } from './constValue';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Styles = StyleSheet.create({
    commonFlex: {
        flex: 1
    },
    commonRow: {
        flexDirection: 'row'
    },
    commonJustifyContent: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    commonRowCenter: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    commonContent: {
        // justifyContent: 'center',
        // marginVertical: wp(3)
       
    },
    justifyContent: {
        justifyContent: 'center',
        // marginVertical: wp(3)
       
    },
    commonContentAlign: {
        alignSelf: 'center',
    },
    commonRowCenterSpace: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: ConstValue.value2
    },
    commonJustifyalignContent: {
        flex: 1,
        // justifyContent: 'center',
        // alignContent: 'center'
    }
});

export default Styles