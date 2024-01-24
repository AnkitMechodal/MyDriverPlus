import { StyleSheet } from 'react-native';
import { Colors } from '../../../themes/index';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    forgorConatiner: {
        flex: 1,
        justifyContent: 'center',
        margin: wp(4)
    },
    buttonSubmit:{
        flex: 1, 
        justifyContent: 'flex-end'
    }
});

export default Styles