import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextComponent from '../../components/Text/index';
import { Colors, Fonts, Images } from "../../themes/index";
import { ScreenText } from "../../utils/index";
import ListEmptyComponent from "../ListEmptyComponent/index";
import Styles from "./style";


type FAQListProps = {
    data: any
    changeLayout: any
}

const FAQListComponent = (props: FAQListProps) => {

    const {
        data,
        changeLayout,
    } = props;


    return (
        <FlatList
            data={data}
            contentContainerStyle={Styles.viewContentContainerStyle}
            keyExtractor={(item: any) => item._id}
            renderItem={({ item, index }) => {
                return (
                    <View>
                        <View style={Styles.viewMainConatiner}>

                            <View>
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
                            </View>

                            <View>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        marginHorizontal: wp(5)
                                    }}
                                    onPress={() => changeLayout(index)}
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



                        </View>
                        <View style={{ height: item?.selected ? null : 0, overflow: 'hidden' }}>
                            <View style={Styles.descExapnd}>
                                <Text style={Styles.descText}>{item.answer}</Text>
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
