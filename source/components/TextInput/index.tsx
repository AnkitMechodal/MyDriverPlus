import React from "react";
import { GestureResponderEvent, Image, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors, Fonts, Images } from "../../themes/index";
import CommonStyle from '../../utils/commonStyle';
import { ConstValue, ScreenText } from "../../utils/index";
import ButtonComponent from "../Button";
import CustomDropdown from "../CustomDropdown/index";
import TextComponent from "../Text";
import Styles from "./style";

type TextInputsProps = {
    secureTextEntry: boolean
    editable: boolean
    defaultValue: any
    maxLength: any
    multiline: any
    numberOfLines: any
    placeholder: any
    placeholderTextColor: any
    onChangeText: (text: string) => void // text: string) => void
    onFocus: any
    onSubmitEditing: any
    value: any
    keyboardType: any
    ref: any
    color: any
    backgroundColor: any
    borderRadius: any
    isPhoneHide: boolean
    isUserHide: boolean
    textfontSize: any
    textfontFamily: any
    textlineHeight: any
    marginTop: any
    isMessageHide: any
    isLockHide: any
    height: any
    borderColor: any
    borderWidth: any
    marginHorizontal: any
    marginVertical: any
    width: any
    textAlign: any
    paddingLeft: any
    marginHorizontalInput: any
    flexTextInput: boolean
    isPadding: boolean
    isVisibleDropDown: boolean
    isVisibleLockWhite: boolean
    isVisibleRef: boolean
    isVisibleLock: boolean
    isVisibleUser: boolean
    isVisibleDistance: boolean
    selectedImage: any
    selected: any
    toggleDropdown: any
    renderDropdown: any
    isVisibleEye: boolean
    isVisibleEye_: boolean
    isVisibleMail: boolean
    isVisibleClock: boolean
    isVisibleCurrentPsw: boolean
    isVisibleEyeClose: boolean
    isVisibleMailGray: boolean
    onPressHide: (event: GestureResponderEvent) => void
    onPressShow: (event: GestureResponderEvent) => void
    onPressClose: (event: GestureResponderEvent) => void

    onPressApplyNow: (event: GestureResponderEvent) => void
    onPressCross: (event: GestureResponderEvent) => void
    onPressCrossPoints: (event: GestureResponderEvent) => void
    onPressApplyNowRedeem: (event: GestureResponderEvent) => void

    isArrow: boolean
    isArrowLeft: boolean
    textAlignVertical: any
    isFavouite: boolean
    onPressFav: any
    isVisibleMap: boolean
    isVisibleNearBy: boolean
    isVisiblePinCode: boolean
    isVisibleCloseIcon: boolean
    isVisibleWhiteIcon: boolean
    isVisibleApplyNowPoints: boolean
    isVisibleCoins: boolean
    selectionColor: any
    isApplyNow: boolean
    isApplyNowPoints: boolean
    isVisibleApplyNow: boolean
    isVisiblePayBookNow: boolean

}
const TextInputComponent = React.forwardRef((props: TextInputsProps, ref) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: props.backgroundColor,
                borderRadius: props.borderRadius,
                height: props.height,
                width: props.width,
                marginTop: props.marginTop,
                borderColor: props.borderColor,
                borderWidth: props.borderWidth,
                marginVertical: props.marginVertical,
                marginHorizontal: props.marginHorizontal,
            }}>

            {props.isVisibleDropDown ?
                <CustomDropdown
                    isArrow={props.isArrow}
                    isArrowLeft={props.isArrowLeft}
                    selectedImage={props.selectedImage}
                    selected={props.selected}
                    toggleDropdown={props.toggleDropdown}
                    renderDropdown={props.renderDropdown}
                />
                : null}

            {props.isVisibleCurrentPsw ?
                <Image
                    source={Images.pswIcon}
                    style={Styles.imageCurrentPsw}
                    resizeMode="contain" />
                : null}

            {props.isVisibleMap ?
                <Image
                    source={Images.mapIcon}
                    style={Styles.imageCurrentPsw}
                    resizeMode="contain" />
                : null}


            {props.isVisibleWhiteIcon ?
                <Image
                    source={Images.whiteLocationIcon}
                    style={Styles.imageWhiteIcon}
                    resizeMode="contain" />
                : null}

            {props.isVisibleNearBy ?
                <Image
                    source={Images.nearByIcon}
                    style={Styles.imageCurrentPsw}
                    resizeMode="contain" />
                : null}

            {props.isVisibleLock ?
                <Image
                    source={Images.lockIcon}
                    style={Styles.imageSearchIcon}
                    resizeMode="contain" />
                : null}

            {props.isVisiblePinCode ?
                <Image
                    source={Images.pinCodeIcon}
                    style={Styles.imagePinIcon}
                    resizeMode="contain" />
                : null}

            {props.isVisibleClock ?
                <Image
                    source={Images.clockIcon}
                    style={Styles.imageClockIcon}
                    resizeMode="contain" />
                : null}

            {props.isVisibleDistance ?
                <Image
                    source={Images.distanceIcon}
                    style={Styles.imageDistnaceIcon}
                    resizeMode="contain" />
                : null}

            {props.isVisibleUser ?
                <Image
                    source={Images.userIcon}
                    style={Styles.imageSearchIcon}
                    resizeMode="contain" />
                : null}

            {props.isVisibleMail ?
                <Image
                    source={Images.smallMailIcon}
                    style={Styles.imageMailIconWhite}
                    resizeMode="contain" />
                : null}

            {props.isVisibleMailGray ?
                <Image
                    source={Images.smallMailIcon}
                    style={Styles.imageMailGrayIcon}
                    resizeMode="contain" />
                : null}

            {props.isVisibleLockWhite ?
                <Image
                    source={Images.smallLockIcon}
                    style={Styles.imageMailIconWhite}
                    resizeMode="contain" />
                : null}



            {props.isVisibleRef ?
                <Image
                    source={Images.codeIcon}
                    style={Styles.imageMailIcon}
                    resizeMode="contain" />
                : null}

            {props.isVisiblePayBookNow ?
                <Image
                    source={Images.payBid}
                    style={Styles.imageBinddingIcon}
                    resizeMode="contain" />
                : null}

            <TextInput
                ref={ref}
                editable={props.editable}
                maxLength={props.maxLength}
                blurOnSubmit={false}
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor}
                returnKeyType="next"
                onChangeText={props.onChangeText}
                onFocus={props.onFocus}
                onSubmitEditing={props.onSubmitEditing}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.keyboardType}
                defaultValue={props.defaultValue}
                value={props.value}
                selectionColor={props.selectionColor} // set as default
                cursorColor={Colors.buttonBackgroundColor}
                textAlignVertical={props.textAlignVertical}
                style={{
                    color: props.color,
                    fontSize: props.textfontSize,
                    fontFamily: props.textfontFamily,
                    // lineHeight: props.textlineHeight,
                    flex: !props.flexTextInput ? ConstValue.value1 : 0,
                    marginHorizontal: props.marginHorizontalInput,
                    textAlign: props.textAlign,
                    padding: props.isPadding ? wp(2) : wp(0),
                    justifyContent: 'center',
                    paddingLeft: props.paddingLeft
                }} />

            {props.isVisibleEye ?
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={props.onPressHide}>
                    <Image
                        source={Images.eyeCloseIcon}
                        style={Styles.imageEyeIcon}
                        resizeMode="contain" />
                </TouchableOpacity>
                : null}

            {props.isVisibleCloseIcon ?
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={props.onPressClose}>
                    <Image
                        source={Images.modalIcon}
                        style={Styles.imageCloseIcon}
                        resizeMode="contain" />
                </TouchableOpacity>
                : null}

            {props.isFavouite ?
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={props.onPressFav}>
                    <Image
                        source={Images.loveIcon}
                        style={Styles.imageFavouriteIcon}
                        resizeMode="contain" />
                </TouchableOpacity>
                : null}
            {props.isVisibleEye_ ?
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={props.onPressShow}>
                    <Image
                        source={Images.eyeOpenIcon}
                        style={Styles.imageEyeIcon}
                        resizeMode="contain" />
                </TouchableOpacity>
                : null}

            {
                props.isApplyNow ? (
                    props.isVisibleApplyNow ? (
                        <View style={CommonStyle.justifyContent}>
                            <ButtonComponent
                                isVisibleMobile={false}
                                isVisibleFaceBook={false}
                                heightBtn={hp(5)}
                                widthBtn={wp(30)}
                                isRightArrow={false}
                                color={Colors.white}
                                title={ScreenText.ApplyNow}
                                onPress={props.onPressApplyNow}
                                marginHorizontal={wp(5)}
                                fontWeight="600"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                alignSelf="center"
                                textAlign="center"
                                borderRadius={wp(2)}
                                backgroundColor={Colors.blue}
                            />
                        </View>
                    ) : (
                        <View
                            style={CommonStyle.commonRow}>

                            <View
                                style={CommonStyle.justifyContent}>
                                <TextComponent
                                    color={Colors.discount}
                                    title={"Applied"}
                                    textDecorationLine="none"
                                    marginHorizontal={wp(1)}
                                    fontWeight="300"
                                    fontSize={wp(4)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign="left"
                                />
                            </View>

                            <View
                                style={CommonStyle.justifyContent}>

                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={props.onPressCross}>
                                    <Image
                                        source={Images.clearIcon}
                                        style={Styles.imageCrossIcon}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>


                            </View>

                        </View>
                    )
                ) : null
            }

            {
                props.isApplyNowPoints ? (
                    props.isVisibleApplyNowPoints ? (
                        <View style={CommonStyle.justifyContent}>
                            <ButtonComponent
                                isVisibleMobile={false}
                                isVisibleFaceBook={false}
                                heightBtn={hp(5)}
                                widthBtn={wp(30)}
                                isRightArrow={false}
                                color={Colors.white}
                                title={ScreenText.Redeem}
                                onPress={props.onPressApplyNowRedeem}
                                marginHorizontal={wp(5)}
                                fontWeight="600"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                alignSelf="center"
                                textAlign="center"
                                borderRadius={wp(2)}
                                backgroundColor={Colors.blue}
                            />
                        </View>
                    ) : (
                        <View
                            style={CommonStyle.commonRow}>

                            <View
                                style={CommonStyle.justifyContent}>
                                <TextComponent
                                    color={Colors.discount}
                                    title={"Redeemed"}
                                    textDecorationLine="none"
                                    marginHorizontal={wp(1)}
                                    fontWeight="300"
                                    fontSize={wp(4)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign="left"
                                />
                            </View>

                            <View
                                style={CommonStyle.justifyContent}>

                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={props.onPressCrossPoints}>
                                    <Image
                                        source={Images.clearIcon}
                                        style={Styles.imageCrossIcon}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>


                            </View>

                        </View>
                    )
                ) : null
            }

        </View >
    )

})

export default TextInputComponent;