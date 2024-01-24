import React from "react";
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts, Images } from "../../themes/index";
import CommonStyle from "../../utils/commonStyle";
import { ConstValue, ScreenText } from "../../utils/index";
import TextInputComponent from "../TextInput";
import Styles from "./style";


type HeaderProps = {
    source: ImageSourcePropType
    sourceSearch: ImageSourcePropType
    refSearch: any
    onChangeText: any
    isArrowVisible: boolean
    onPress: any
    isWidth: boolean
    isVisibleArrow: boolean
    onPressArrow: any
    editable: boolean
    value: any
}

const HeaderUserComponent = (props: HeaderProps) => {
    return (
        <View style={CommonStyle.commonRow}>
            {props.isVisibleArrow ?
                <TouchableOpacity onPress={props.onPressArrow} activeOpacity={0}>
                    <Image
                        source={Images.arrowLeft}
                        style={Styles.imageArrowLeft}
                        resizeMode="contain" />
                </TouchableOpacity> : null}

            <TouchableOpacity onPress={props.onPress} activeOpacity={0}>
                <View style={{
                    height: hp(6),
                    backgroundColor: Colors.white,
                    borderColor: Colors.gray,
                    width: props.isWidth ? wp(90) : wp(85),
                    marginVertical: wp(4),
                    borderRadius: wp(4),
                    borderWidth: ConstValue.value1,
                    flexDirection: "row",
                }
                }>
                    {
                        props.isArrowVisible ?
                            null :

                            <TouchableOpacity onPress={props.onPress} activeOpacity={0}>
                                <Image
                                    source={Images.searchIcon}
                                    style={Styles.imageSearchIcon}
                                    resizeMode="contain" />
                            </TouchableOpacity>
                    }

                    <TextInputComponent
                        selectionColor={Colors.white}
                        marginVertical={hp(0)}
                        marginHorizontal={wp(0)}
                        borderWidth={ConstValue.value0}
                        borderColor={Colors.gray}
                        height={'auto'}
                        marginTop={hp(0)}
                        isUserHide={false}
                        textfontSize={wp(4)}
                        value={props.value}
                        textfontFamily={Fonts.PoppinsRegular}
                        textlineHeight={ConstValue.value0}
                        ref={props.refSearch}
                        placeholder={ScreenText.SearchHere}
                        editable={props.editable}
                        multiline={false}
                        secureTextEntry={false}
                        keyboardType='default'
                        numberOfLines={1}
                        maxLength={25}
                        flexTextInput={true}
                        color={Colors.black}
                        backgroundColor={Colors.white}
                        borderRadius={wp(0)}
                        onFocus={() => {
                        }}
                        onChangeText={props.onChangeText}
                        onSubmitEditing={() => {
                        }}
                        placeholderTextColor={Colors.textColor}
                    />
                </View >
            </TouchableOpacity>
        </View>
    );
}

export default HeaderUserComponent