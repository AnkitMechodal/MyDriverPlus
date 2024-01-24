import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextComponent from '../../components/Text/index';
import { Colors, Fonts, Images } from "../../themes/index";
import CommonStyle from "../../utils/commonStyle";
import { ScreenText } from "../../utils/index";
import ListEmptyComponent from "../ListEmptyComponent/index";
import Styles from "./style";


type FAQListProps = {
    data: any
}

const FAQListComponent = (props: FAQListProps) => {

    const [data, setData] = useState(props.data);

    const changeLayout = ({ item, index }) => {
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
        <FlatList
            data={data}
            contentContainerStyle={Styles.viewContentContainerStyle}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
                return (
                    <View>
                        <View style={Styles.viewMainConatiner}>
                            <TextComponent
                                color={Colors.white}
                                title={item.question}
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                marginHorizontal={wp(5)}
                                textAlign='left'
                                marginVertical={hp(2)}
                            />

                            <TouchableOpacity
                                style={CommonStyle.justifyContent}
                                onPress={() => changeLayout({ item, index })}
                            >
                                {item?.selected ? <Image
                                    source={Images.downArrow}
                                    resizeMode="contain"
                                    style={Styles.viewItemImage1}
                                /> : <Image
                                    source={Images.downArrow}
                                    resizeMode="contain"
                                    style={Styles.viewItemImage1}
                                />}

                            </TouchableOpacity>

                        </View>
                        <View style={{ height: item?.selected ? null : 0, overflow: 'hidden' }}>
                            <View style={Styles.descExapnd}>
                                <Text style={Styles.descText}>{item.desc}</Text>
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

export default FAQListComponent;
