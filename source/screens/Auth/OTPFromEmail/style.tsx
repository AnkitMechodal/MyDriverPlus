import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../themes/index';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
       
    },
    viewOtpFromMailContainer:{
        flex: 1,
        justifyContent: 'center',
        margin: wp(4)
    },
    buttonVerfiy:{
        flex: 1, 
        justifyContent: 'flex-end'
    }
});

export default Styles