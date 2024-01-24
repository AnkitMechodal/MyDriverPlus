import React, { useState } from "react";
import { Alert, FlatList, Image, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts, Images } from "../../themes/index";
import CommonStyle from '../../utils/commonStyle';
import { ScreenText } from "../../utils/index";
import ButtonComponent from "../Button/index";
import ListEmptyComponent from "../ListEmptyComponent/index";
import TextComponent from "../Text/index";
import Styles from "./style";


type DriverRequestListProps = {
    data: any
    onPress: any
    onPressAccept: any
}

const DriverRequestListCustom = (props: DriverRequestListProps) => {

    const [data, setData] = useState(props.data);

    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);


    const starImageFilled =
        Images.fillStarIcon;
    const starImageCorner =
        Images.unfillStarIcon;

    const handleRatingChange = (user, newRating) => {
        const updatedData = data.map((item) => {
            if (item.id === user.id) {
                return { ...item, userRattingNo: newRating };
            }
            return item;
        });

        setData(updatedData);
    };

    return (
        <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={Styles.viewContentContainerStyle}
            keyExtractor={(item) => item.id.toString()}

            renderItem={({ item, index }) => {
                return (

                    <View>
                        <View style={Styles.requestConatiner}>
                            <View style={CommonStyle.commonRow}>

                                <View style={CommonStyle.justifyContent}>
                                    <Image
                                        style={Styles.imageUser}
                                        resizeMode="contain"
                                        source={Images.edUserIcon} />
                                </View>

                                <View>
                                    <TextComponent
                                        color={Colors.white}
                                        title={item?.RequestName}
                                        marginHorizontal={wp(5)}
                                        textDecorationLine={'none'}
                                        fontWeight="700"
                                        marginVertical={wp(2)}
                                        fontSize={wp(3.5)}
                                        fontFamily={Fonts.PoppinsBold}
                                        textAlign='left'
                                    />
                                    <View style={CommonStyle.commonRow}>
                                        <View>
                                            <TextComponent
                                                color={Colors.gray}
                                                title={item?.RequestYouRated}
                                                marginHorizontal={wp(5)}
                                                textDecorationLine={'none'}
                                                marginVertical={wp(2)}
                                                fontWeight="400"
                                                fontSize={wp(3.5)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                textAlign='left'
                                            />
                                        </View>

                                        <View>

                                            <View style={Styles.customRatingBarStyle}>
                                                {maxRating.map((rating, key) => {
                                                    return (
                                                        <View style={CommonStyle.commonRow}>
                                                            <TouchableOpacity
                                                                activeOpacity={0.2}
                                                                key={item}
                                                                onPress={() => handleRatingChange(item, rating)}
                                                            // Pass the item and rating to handleRatingChange

                                                            >
                                                                <Image
                                                                    style={Styles.starImageStyle}
                                                                    source={
                                                                        rating <= item.userRattingNo
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

                            </View>

                            <View style={Styles.viewGrayLineHorizontal}>
                            </View>

                            <View style={Styles.rowContent}>

                                <View>
                                    <View style={CommonStyle.commonRow}>
                                        <TextComponent
                                            color={Colors.gray}
                                            title={ScreenText.Amount}
                                            marginHorizontal={wp(2)}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.discount}
                                            title={item?.RequestAmount}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            textAlign='right'
                                        />
                                    </View>



                                </View>

                                <View>
                                    <View style={CommonStyle.commonRow}>
                                        <TextComponent
                                            color={Colors.gray}
                                            title={ScreenText.HoursDot}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.discount}
                                            title={item?.RequestHours}
                                            textDecorationLine={'none'}
                                            marginHorizontal={wp(3.5)}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            textAlign='right'
                                        />
                                    </View>


                                </View>

                            </View>

                            <View style={Styles.rowCenter}>
                                <View>
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(1)}
                                        heightBtn={hp(6)}
                                        widthBtn={wp(40)}
                                        isRightArrow={false}
                                        color={Colors.white}
                                        title={ScreenText.Accept}
                                        marginHorizontal={wp(2)}
                                        fontWeight="500"
                                        fontSize={wp(4)}
                                        onPress={props.onPressAccept}
                                        fontFamily={Fonts.PoppinsRegular}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={Colors.blue}
                                    />
                                </View>

                                <View>
                                    <ButtonComponent
                                        isVisibleMobile={false}
                                        isVisibleFaceBook={false}
                                        marginVertical={hp(1)}
                                        heightBtn={hp(6)}
                                        widthBtn={wp(44)}
                                        isRightArrow={false}
                                        color={Colors.white}
                                        onPress={() => Alert.alert("testd")}
                                        title={ScreenText.Decline}
                                        marginHorizontal={wp(2)}
                                        fontWeight="500"
                                        fontSize={wp(4)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        alignSelf='center'
                                        textAlign='center'
                                        borderRadius={wp(2)}
                                        backgroundColor={Colors.orange}
                                    />
                                </View>

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

export default DriverRequestListCustom;
