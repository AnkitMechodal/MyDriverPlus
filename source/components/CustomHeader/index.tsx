import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts, Images } from '../../themes';
import { ConstValue, ScreenText } from '../../utils/index';
import ButtonComponent from '../Button/index';
import TextInputComponent from '../TextInput/index';
import Styles from './style';


const CustomHeaderComponent = ({ navigation,
    ref,
    handleUserLocation, onPress }) => {
    return (
        <View style={Styles.viewCustomHeader}>
            <TouchableOpacity onPress={
                () => navigation.toggleDrawer()}
                style={Styles.viewBlackBackground}>
                <Image
                    style={{
                        width: wp(5),
                        height: wp(5),
                        marginLeft: wp(2)
                    }}
                    resizeMode="contain"
                    source={Images.openIcon} />
                {/* <Text style={Styles.imageDrawerIcon}>☰</Text> */}
            </TouchableOpacity>
            <TextInputComponent
                selectionColor={Colors.white}
                isVisibleDropDown={false}
                marginVertical={hp(1)}
                width={wp(50)}
                height={hp(7)}
                marginTop={hp(2)}
                isUserHide={false}
                textfontSize={ConstValue.value15}
                textfontFamily={Fonts.PoppinsRegular}
                textlineHeight={ConstValue.value0}
                ref={ref}
                placeholder={"Your Current Location"}
                editable={true}
                multiline={false}
                secureTextEntry={false}
                isPadding={true}
                keyboardType='default'
                textAlign='left'
                numberOfLines={null}
                color={Colors.white}
                backgroundColor={'transparent'}
                borderRadius={wp(2)}
                onChangeText={handleUserLocation}
                placeholderTextColor={Colors.gray}
            />
            <View style={{ marginLeft: wp(4) }}>
                <ButtonComponent
                    isVisibleMobile={false}
                    isVisibleFaceBook={false}
                    heightBtn={hp(5)}
                    widthBtn={wp(25)}
                    isRightArrow={false}
                    color={Colors.white}
                    title={ScreenText.BookNow}
                    fontWeight="600"
                    fontSize={wp(3)}
                    onPress={onPress}
                    fontFamily={Fonts.PoppinsRegular}
                    alignSelf='center'
                    textAlign='center'
                    borderRadius={wp(2)}
                    backgroundColor={Colors.blue}
                />
            </View>
        </View>
    );
};

export default CustomHeaderComponent;
