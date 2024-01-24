import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    navigation: any
}

const ChangeLocationScreen = (props: Props) => {

    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <Text style={{ color: 'white', fontSize: 30 }}>Welcome</Text>
        </View>
    )

}

export default ChangeLocationScreen;
