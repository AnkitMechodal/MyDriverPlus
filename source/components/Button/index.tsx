import React from "react";
import { GestureResponderEvent, Image, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Images } from '../../themes/index';
import { ConstValue } from "../../utils";

type ButtonProps = {
    onPress: (event: GestureResponderEvent) => void
    backgroundColor: string
    color: any
    fontFamily: any
    fontSize: any
    fontWeight: any
    alignSelf: any
    textAlign: any
    title: string
    borderRadius: any
    isRightArrow: boolean
    heightBtn: any
    widthBtn: any
    marginVertical: any
    borderWidth: any
    borderColor: any
    isVisibleMobile: boolean
    isVisibleFaceBook: boolean
    marginHorizontal: any
    isVisibleMail: boolean
    isVisibleMailWhite: boolean
    justifyContentProps: string
    isVisibleGoogle: boolean
    marginLeft: any
    opacity: any
    disabled: boolean
    marginTop: any
    isVisibleAddHeart: boolean
}

const ButtonComponent = (props: ButtonProps) => {

    const { onPress, backgroundColor,
        color,
        fontFamily,
        fontSize,
        fontWeight,
        alignSelf,
        textAlign,
        title,
        borderRadius,
        justifyContentProps,
        heightBtn,
        widthBtn,
        marginVertical,
        borderWidth,
        borderColor,
        marginHorizontal,
        marginLeft,
        opacity,
        disabled,
        marginTop
    } = props

    return (
        <TouchableOpacity
            activeOpacity={ConstValue.value0}
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: backgroundColor,
                height: heightBtn,
                borderRadius: borderRadius,
                justifyContent: "center",
                width: widthBtn,
                marginVertical: marginVertical,
                marginHorizontal: marginHorizontal,
                borderWidth: borderWidth,
                borderColor: borderColor,
                flexDirection: 'row',
                opacity: opacity,
                marginTop: marginTop
            }}>
            {props.isVisibleMobile ?
                <Image
                    style={{
                        width: wp(6),
                        height: wp(6),
                        marginTop: wp(4),
                        marginHorizontal: wp(2)
                    }}
                    resizeMode="contain"
                    source={Images.mobileIcon} /> : null}
            {props.isVisibleFaceBook ?
                <Image
                    style={{
                        width: wp(6),
                        height: wp(6),
                        marginTop: wp(4),
                        marginHorizontal: wp(2)
                    }}
                    resizeMode="contain"
                    source={Images.facebookIcon} /> : null}
            {props.isVisibleGoogle ?
                <Image
                    style={{
                        width: wp(6),
                        height: wp(6),
                        marginTop: wp(4),
                        marginHorizontal: wp(2)
                    }}
                    resizeMode="contain"
                    source={Images.googleIcon} /> : null}

            {props.isVisibleMail ?
                <Image
                    style={{
                        width: wp(10),
                        height: wp(10),
                        marginTop: wp(1.5)
                    }}
                    resizeMode="contain"
                    source={Images.mailIcon} /> : null}

            {props.isVisibleMailWhite ?
                <Image
                    style={{
                        width: wp(10),
                        height: wp(10),
                        marginTop: wp(1.5)
                    }}
                    resizeMode="contain"
                    source={Images.mailIconWhite} /> : null}

            {props.isVisibleAddHeart ?
                <Image
                    style={{
                        width: wp(8),
                        height: wp(8),
                        marginTop: wp(3),
                        marginHorizontal: wp(2)
                    }}
                    resizeMode="contain"
                    source={Images.loveIcon} /> : null}

            <Text style={{
                color: color,
                fontFamily: fontFamily || null,
                fontSize: fontSize,
                fontWeight: fontWeight,
                alignSelf: alignSelf,
                textAlign: textAlign,
                marginLeft: marginLeft
            }}>{title}</Text>

        </TouchableOpacity>
    )
}

export default ButtonComponent;



