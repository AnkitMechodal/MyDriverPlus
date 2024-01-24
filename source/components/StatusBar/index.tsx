import React from "react";
import { StatusBar } from "react-native";

type StatusBarProps = {
    backgroundColor: any
}

const StatusBarComponent = (props: StatusBarProps) => {
    const {
        backgroundColor,
    } = props

    return (
        <StatusBar
            backgroundColor={backgroundColor}
            barStyle="default"
            hidden={false}
        />
    );
}

export default StatusBarComponent;