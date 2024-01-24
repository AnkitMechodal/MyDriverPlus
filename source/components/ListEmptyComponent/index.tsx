import React from "react";
import { Text } from "react-native";


type ListEmptyProps = {
    title: string
    color: string
    fontFamily: any
    fontSize: any
    fontWeight: any
    alignSelf: any
    textAlign: any
    textDecorationLine: any
    onPress: any
}
const ListEmptyComponent = (props: ListEmptyProps) => {

    const {
        title,
        color,
        fontFamily,
        fontSize,
        alignSelf,
        fontWeight,
        textAlign,
        textDecorationLine,
        onPress
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
        }}
            onPress={onPress}>{title}</Text>

    )
}

export default ListEmptyComponent;