import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts, Images } from "../../themes/index";
import { ScreenText } from "../../utils";
import CommonStyle from "../../utils/commonStyle";
import ListEmptyComponent from "../ListEmptyComponent";
import Styles from "./style";


type SaveListProps = {
    data: any
    onPress: any
}

const SaveListComponent = (props: SaveListProps) => {

    const {
        data,
    } = props;

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={props.onPress} activeOpacity={0}>
                <View style={Styles.viewShadow}>
                    <View style={Styles.viewBookBox}>
                        <View style={CommonStyle.commonContent}>
                            <View style={Styles.viewBookRating}>
                                <Image source={Images.favouriteIcon}
                                    style={Styles.imageRateIcon}
                                    resizeMode="contain" />
                                <Text style={Styles.textRatePrice}>{item.rating}</Text>
                            </View>
                        </View>
                        <View style={CommonStyle.commonContent}>

                            <View style={Styles.viewBookMark}>
                                {/* <TouchableOpacity
                                    onPress={() => handleItemClick(item.id)}
                                > */}
                                <Image source={!item.selected ? item.bookMarkIcon1 : item.bookMarkIcon2}
                                    style={Styles.imageBookIconColor}
                                    resizeMode="contain" />
                                {/* </TouchableOpacity> */}

                            </View>
                        </View>
                    </View>

                    <View style={Styles.viewMargin}>

                        <Image source={{ uri: item.image1_link }}
                            style={Styles.imageBookIcon}
                            resizeMode="cover" />

                        <View style={Styles.viewBookContain}>
                            <View>
                                <Text style={Styles.textBookTitle}>{item.book_name}</Text>
                                <Text style={Styles.textBookPrice}>{item.price}</Text>
                            </View>



                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        );
    }

    return (
        <FlatList
            data={data}
            numColumns={2}
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

export default SaveListComponent;