import React, { useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts } from "../../themes/index";
import { ScreenText } from "../../utils/index";
import ListEmptyComponent from "../ListEmptyComponent";
import TextComponent from "../Text";
import Styles from "./style";


type CategoryListProps = {
    data: any
    onPress: any
}

const CategoryListComponent = (props: CategoryListProps) => {

    const [data, setData] = useState(props.data);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0} onPress={props.onPress}>
                <View>
                    <View style={Styles.viewCategory}>
                        <Image
                            source={{ uri: item.image1_link }}
                            resizeMode="contain"
                            style={Styles.imageCategoryIcon} />

                    </View>
                    <TextComponent
                        color={Colors.textColor}
                        title={item.name}
                        textDecorationLine={'none'}
                        fontWeight="400"
                        fontSize={wp(3)}
                        fontFamily={Fonts.InterRegular}
                        alignSelf='center'
                        textAlign='left'
                        letterSpacing={wp(0)} />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <FlatList
            data={data}
            horizontal
            contentContainerStyle={Styles.viewContentContainerStyle}
            keyExtractor={(item) => item.id}
            renderItem={(item) => renderItem(item)}
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

export default CategoryListComponent;

