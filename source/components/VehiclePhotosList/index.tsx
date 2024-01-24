import React, { useState } from "react";
import { FlatList, Image, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from "../../themes/index";
import { ScreenText } from "../../utils/index";
import ListEmptyComponent from "../ListEmptyComponent/index";
import Styles from "./style";


type VehiclePhotosListProps = {
    data: any
    // onPress: any
}

const VehiclePhotosListDetails = (props: VehiclePhotosListProps) => {

    const [data, setData] = useState(props.data);

    return (
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={Styles.viewContentContainerStyle}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
                return (
                    <View>
                        <Image
                            style={Styles.carImageIcon}
                            resizeMode="cover"
                            source={item.vehicleImage} />

                    </View>

                );
            }}
            ListEmptyComponent={() => (
                <ListEmptyComponent
                    color={Colors.black}
                    textDecorationLine={'none'}
                    fontWeight="600"
                    fontSize={wp(5)}
                    fontFamily={Fonts.PoppinsRegular}
                    alignSelf='center'
                    textAlign='center'
                    title={ScreenText.NoDataAvailable} />
            )}
        />
    );
}

export default VehiclePhotosListDetails;
