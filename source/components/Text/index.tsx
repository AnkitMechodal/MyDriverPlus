import React from "react";
import { Text } from "react-native";

type TextProps = {
    title: string
    endtext: string
    color: string
    fontFamily: any
    fontSize: any
    fontWeight: any
    alignSelf: any
    textAlign: any
    textDecorationLine: any
    onPress: any
    letterSpacing: any
    marginLeft: any
    marginVertical: any
    marginHorizontal: any
    marginTop: any
    isTextEnd: boolean
    colorEnd: any,
    sizeEnd: any,
    numberOfLines: any
    marginRight: any

}
const TextComponent = (props: TextProps) => {

    const {
        title,
        endtext,
        color,
        colorEnd,
        sizeEnd,
        fontFamily,
        fontSize,
        alignSelf,
        fontWeight,
        textAlign,
        textDecorationLine,
        onPress,
        letterSpacing,
        marginLeft,
        marginVertical,
        marginHorizontal,
        marginTop,
        marginRight,
        numberOfLines
    } = props

    return (
        <Text style={{
            color: color,
            fontFamily: fontFamily || null,
            fontSize: fontSize,
            fontWeight: fontWeight,
            alignSelf: alignSelf,
            textAlign: textAlign,
            textDecorationLine: textDecorationLine,
            letterSpacing: letterSpacing,
            marginLeft: marginLeft,
            marginVertical: marginVertical,
            marginHorizontal: marginHorizontal,
            marginTop: marginTop,
            marginRight: marginRight

        }}
            // numberOfLines={numberOfLines || 2}
            // ellipsizeMode='tail' // other use in screen
            onPress={onPress}>{title}

            {props.isTextEnd ?
                <Text style={{
                    color: colorEnd,
                    fontSize: sizeEnd,
                }}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                >
                    {" "}{endtext}</Text>
                : null}

        </Text>

    )
}

export default TextComponent;