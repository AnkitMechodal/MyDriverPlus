import React, { useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextComponent from '../../components/Text/index';
import { Colors, Fonts, Images } from "../../themes/index";
import CommonStyle from '../../utils/commonStyle';
import { ScreenText } from "../../utils/index";
import ListEmptyComponent from "../ListEmptyComponent/index";
import Styles from "./style";


type PreferredListProps = {
    data: any
    onPressPreferred: any
}

const PreferredListComponent = (props: PreferredListProps) => {

    const [data, setData] = useState(props.data);

    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5, 6]);

    const starImageFilled =
        Images.fillStarIcon;
    const starImageCorner =
        Images.unfillStarIcon;


    // const handleFavouriteChange = ({ item, index }) => {
    //     const newCategories = data.map((dataItem, dataIndex) => {
    //         if (dataIndex === index) {
    //             return {
    //                 ...dataItem,
    //                 selected: !dataItem.selected,
    //             };
    //         }
    //         return dataItem;
    //     });
    //     setData(newCategories);
    // };

    // const handleRatingChange = (user, newRating) => {
    //     const updatedData = data.map((item) => {
    //         if (item.id === user.id) {
    //             return { ...item, userRattingNo: newRating };
    //         }
    //         return item;
    //     });

    //     setData(updatedData);
    // };

    // const onPressPreferred = () => {
    //     Alert.alert("8888")
    // }

    return (
        <FlatList
            data={data}
            contentContainerStyle={Styles.viewContentContainerStyle}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => {
                return (
                    <View>
                        <View style={Styles.viewMainConatiner}>
                            <View style={CommonStyle.commonContent}>
                                <Image
                                    style={Styles.imageUser}
                                    resizeMode="contain"
                                    source={{ uri: item?.ProfileImage }} />
                            </View>
                            <View >
                                <TextComponent
                                    color={Colors.white}
                                    title={item?.username}
                                    textDecorationLine={'none'}
                                    fontWeight="700"
                                    fontSize={wp(4)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    marginHorizontal={wp(2)}
                                    marginVertical={wp(1.5)}
                                    textAlign='left'
                                />
                                <View style={CommonStyle.commonRow}>
                                    <TextComponent
                                        color={Colors.gray}
                                        title={ScreenText.YouRated}
                                        textDecorationLine={'none'}
                                        fontWeight="400"
                                        fontSize={wp(4)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        marginHorizontal={wp(2)}
                                        textAlign='left'
                                        marginVertical={wp(1.5)}
                                    />
                                    <View style={Styles.viewRatting}>

                                        <View style={Styles.customRatingBarStyle}>
                                            {maxRating.map((rating, key) => {
                                                return (
                                                    <View style={CommonStyle.commonRow}>
                                                        <TouchableOpacity
                                                            activeOpacity={0.2}
                                                            key={item}
                                                        // onPress={() => handleRatingChange(item, rating)
                                                        // } // Pass the item and rating to handleRatingChange
                                                        >
                                                            <Image
                                                                style={Styles.starImageStyle}
                                                                source={
                                                                    rating <= item.averageRating
                                                                        ? starImageFilled
                                                                        : starImageCorner
                                                                }
                                                            />
                                                        </TouchableOpacity>
                                                    </View>

                                                );
                                            })}

                                        </View>

                                    </View>
                                </View>

                            </View>
                            <View>
                                <TouchableOpacity
                                    activeOpacity={0.2}
                                    onPress={() => props.onPressPreferred(item)}
                                // onPress={() => handleFavouriteChange({ item, index })}
                                >
                                    {!item?.selected ?
                                        <Image
                                            style={Styles.imageHeart}
                                            resizeMode="contain"
                                            source={Images.heartIcon} />
                                        :
                                        <Image
                                            style={Styles.imageHeartFill}
                                            resizeMode="contain"
                                            source={Images.heartIcon} />
                                    }
                                </TouchableOpacity>


                            </View>
                        </View>
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

export default PreferredListComponent;
