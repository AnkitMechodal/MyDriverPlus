import React, { useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextComponent from '../../components/Text/index';
import { Colors, Fonts, Images } from "../../themes/index";
import CommonStyle from "../../utils/commonStyle";
import { ScreenText } from "../../utils/index";
import ListEmptyComponent from "../ListEmptyComponent/index";
import Styles from "./style";


type PreferredListProps = {
    data: any,
    fetchlocations: any
    onPressLocationItemClick(item): any
}

const SavedListComponent = (props: PreferredListProps) => {

    const [data, setData] = useState(props.data);

    const handleFavouriteChange = ({ item, index }) => {

        props.fetchlocations(item);
        // console.log("handleFavouriteChange==>", item?._id);

        const newCategories = data.map((dataItem, dataIndex) => {
            if (dataIndex === index) {
                return {
                    ...dataItem,
                    selected: !dataItem.selected,
                };
            }
            return dataItem;
        });
        setData(newCategories);
    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.desc }}>
            <FlatList
                data={data}
                bounces={true}
                contentContainerStyle={Styles.viewContentContainerStyle}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={Styles.ItemSeparatorComponent}>
                        </View>
                    )
                }}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.2}
                                onPress={() => props.onPressLocationItemClick(item)}
                            >
                                <View style={Styles.viewMapConatiner}>
                                    <View style={Styles.viewUserLcoation}>
                                        <Image
                                            style={Styles.imageMap}
                                            resizeMode="contain" // item?.userLocation
                                            source={Images.mapIcon} />

                                    </View>

                                    <View style={CommonStyle.commonFlex}>
                                        <TextComponent
                                            color={Colors.white}
                                            title={item?.complete_location} // userStation
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.circleGray}
                                            title={item?.nearby_landmark} // userRoad
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>


                                    <View style={Styles.viewFavourite}>
                                        <TouchableOpacity
                                            activeOpacity={0.2}
                                            onPress={() => handleFavouriteChange({ item, index })}>
                                            {!item?.selected ?
                                                <Image
                                                    style={Styles.imageHeartFill} // imageHeart FOR API
                                                    resizeMode="contain"
                                                    source={Images.heartIcon} />
                                                :
                                                <Image
                                                    style={Styles.imageHeartFill}
                                                    resizeMode="contain"
                                                    source={Images.heartFillIcon} />
                                            }
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </TouchableOpacity>

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
        </View>

    );
}

export default SavedListComponent;
