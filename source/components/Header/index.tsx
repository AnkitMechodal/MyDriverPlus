import React from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts, Images } from '../../themes/index';
import { ConstValue, ScreenText } from "../../utils";
import CustomDropdownBooking from "../DropdownBooking/index";
import DropdownModal from "../DropdownModal";
import TextComponent from "../Text";


type HeaderProps = {
    source: ImageSourcePropType
    sourceBell: ImageSourcePropType
    width: any
    height: any
    title: any
    backgroundColor: any
    onPress: any
    onPressRightEnd: any
    color: any
    fontSize: any
    fontFamily: any
    fontWeight: any
    margin: any
    textAlign: any
    backgroundColorOpacity: any
    isVisibleDropDown: boolean
    borderRadiusOpacity: any
    paddingOpacity: any
    titleWithRightContent: any
    colorRight: any
    fontSizeRight: any
    fontFamilyRight: any
    fontWeightRight: any
    textAlignRight: any
    isVisibleEditProfile: boolean
    onPressEdit: any
    marginHorizontal: any
    marginTop: any
    selectedImage: any
    selected: any
    toggleDropdown: any
    renderDropdown: any
    borderColor: any
    borderWidth: any
    borderRadius: any
    isArrow: boolean
    isArrowLeft: boolean
    marginTopRight: any
    marginRight: any

    isVisiblePayout: boolean

    isVisibleDropDownBooking: boolean
    selectedValueBook: any
    handleSelectBook: any
    selectService: any
    dataBook: any
    sourceBook: any
    selectedDataText: any
    selectedDataImg: any
    transform: any

    LoyalPonits: any

}

const HeaderComponent = (props: HeaderProps) => {

    const {
        width,
        height,
        backgroundColor,
        source,
        title,
        onPress,
        color,
        fontSize,
        transform,
        fontFamily,
        fontWeight,
        margin,
        textAlign,
        backgroundColorOpacity,
        borderRadiusOpacity,
        paddingOpacity,
        titleWithRightContent,
        colorRight,
        fontSizeRight,
        fontFamilyRight,
        fontWeightRight,
        textAlignRight,
        marginTopRight,
        onPressEdit,
        onPressRightEnd,
        marginHorizontal,
        marginRight,
        marginTop,
        LoyalPonits
    } = props;

    return (
        <View style={{
            backgroundColor: backgroundColor,
            flexDirection: 'row',
            margin: margin,
        }}>
            <TouchableOpacity onPress={onPress}
                activeOpacity={0.1}
                style={{
                    backgroundColor: backgroundColorOpacity,
                    borderRadius: borderRadiusOpacity,
                    padding: paddingOpacity,
                }}>
                <Image
                    source={source}
                    style={{
                        width: width,
                        height: height,
                        transform: transform, // [{ rotate: '180deg' }],
                    }} />
            </TouchableOpacity>
            <View>
                <Text style={{
                    color: color,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    fontWeight: fontWeight,
                    textAlign: textAlign,
                    flex: ConstValue.value1,
                    marginHorizontal: marginHorizontal,
                    marginTop: marginTop,
                }}>{title}</Text>
            </View>

            {props.isVisibleEditProfile ?
                <TouchableOpacity
                    onPress={onPressEdit}
                    activeOpacity={0.1}>
                    <Image
                        style={{
                            width: wp(6), // 6
                            height: wp(6),
                            alignContent: 'flex-end',
                            marginLeft: wp(40)
                        }}
                        resizeMode="contain"
                        source={Images.editPencilIcon} />
                </TouchableOpacity>
                : null}


            <Text style={{
                color: colorRight,
                fontSize: fontSizeRight,
                fontFamily: fontFamilyRight,
                fontWeight: fontWeightRight,
                textAlign: textAlignRight,
                flex: ConstValue.value1,
                marginTop: marginTopRight,
                marginRight: marginRight,
            }} onPress={onPressRightEnd}>{titleWithRightContent}</Text>

            {props.isVisibleDropDownBooking ?
                <DropdownModal
                    selectedDataText={props.selectedDataText}
                    selectedDataImg={props.selectedDataImg}
                    sourceBook={props.sourceBook}
                    dataBook={props.dataBook}
                    SelectService={props.selectService}
                    selectedValue={props.selectedValueBook}
                    onSelect={props.handleSelectBook} /> : null}


            {props.isVisibleDropDown ?
                <CustomDropdownBooking
                    isArrowLeft={props.isArrowLeft}
                    isArrow={props.isArrow}
                    borderColor={props.borderColor}
                    borderWidth={props.borderWidth}
                    borderRadius={props.borderRadius}
                    selectedImage={props.selectedImage}
                    selected={props.selected}
                    toggleDropdown={props.toggleDropdown}
                    renderDropdown={props.renderDropdown}
                />
                : null}

            {props.isVisiblePayout ?

                <View style={{ flexDirection: "row" }}>

                    <View style={{ justifyContent: 'center' }}>
                        <Image
                            style={{
                                width: wp(8), // 8
                                height: wp(8),
                                borderRadius: wp(50),
                                alignSelf: 'center'
                            }}
                            resizeMode="contain"
                            source={Images.payoutCoinIcon} />
                    </View>

                    <View>
                        <TextComponent
                            color={Colors.white}
                            // title={ScreenText.RS1000} // As HTML Contain
                            title={props.LoyalPonits}
                            textDecorationLine={'none'}
                            fontWeight="600"
                            fontSize={wp(3.5)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                            marginHorizontal={wp(4)}
                        />
                        <TextComponent
                            color={Colors.grayFull}
                            title={ScreenText.LoyaltyPoints} // As HTML Contain
                            textDecorationLine={'none'}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                            marginHorizontal={wp(4)}
                        />
                    </View>
                </View>

                : null}
        </View>
    );

}

export default HeaderComponent;