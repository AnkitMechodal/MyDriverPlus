import React, { useState } from "react";
import { FlatList, Image, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextComponent from '../../components/Text/index';
import { Colors, Fonts, Images } from "../../themes/index";
import { ScreenText } from "../../utils/index";
import ListEmptyComponent from "../ListEmptyComponent/index";
import Styles from "./style";


type CarCourierListProps = {
    data: any
}

const CarCourierListComponent = (props: CarCourierListProps) => {

    const [data, setData] = useState(props.data);

    return (
        <FlatList
            data={data}
            contentContainerStyle={Styles.viewContentContainerStyle}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
                return (
                    <View>
                        <View style={{ flex: 1, backgroundColor: 'black' }}>
                            <View style={{
                                height: "auto",
                                backgroundColor: '#282931',
                                borderRadius: wp(3),
                                padding: wp(3),
                                margin: wp(3)
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={item?.carTitle}
                                            textDecorationLine={'none'}
                                            fontWeight="500"
                                            fontSize={wp(3.5)}
                                            marginVertical={wp(2)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        {item?.carStatus == "Pending" ?
                                            <TextComponent
                                                color={Colors.blue}
                                                title={item?.carStatus}
                                                textDecorationLine={'none'}
                                                fontWeight="500"
                                                fontSize={wp(3.5)}
                                                marginVertical={wp(2)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                textAlign='right' />
                                            : item?.carStatus == "Cancel" ?
                                                <TextComponent
                                                    color={Colors.orange}
                                                    title={item?.carStatus}
                                                    textDecorationLine={'none'}
                                                    fontWeight="500"
                                                    fontSize={wp(3.5)}
                                                    marginVertical={wp(2)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    textAlign='right' /> :
                                                <TextComponent
                                                    color={Colors.darkGreen}
                                                    title={item?.carStatus}
                                                    textDecorationLine={'none'}
                                                    fontWeight="500"
                                                    fontSize={wp(3.5)}
                                                    marginVertical={wp(2)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    textAlign='right' />}

                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row' }}>

                                    <View>
                                        <View style={{
                                            height: wp(15),
                                            backgroundColor: 'white',
                                            width: wp(15),
                                            borderRadius: wp(50),
                                            justifyContent: 'center'
                                        }}>
                                            <TextComponent
                                                color={Colors.km}
                                                title={item?.carKm}
                                                textDecorationLine={'none'}
                                                fontWeight="700"
                                                fontSize={wp(3.5)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                textAlign='center'
                                            />
                                        </View>
                                        <View>
                                            <TextComponent
                                                color={Colors.white}
                                                title={item?.carMin}
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                marginVertical={wp(1)}
                                                fontSize={wp(3)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                textAlign='left'
                                            />
                                        </View>

                                    </View>

                                    <View>
                                        <Image
                                            style={Styles.whiteDot}
                                            resizeMode="contain"
                                            source={Images.whiteDot} />

                                        <View style={Styles.lineVerticalLine1} />
                                        <View style={Styles.lineVerticalLine1} />
                                        <View style={Styles.lineVerticalLine1} />

                                        <Image
                                            style={Styles.orangeDot}
                                            resizeMode="contain"
                                            source={Images.orangeDot} />
                                    </View>

                                    <View>
                                        <TextComponent
                                            color={Colors.white}
                                            title={"Surat Railway Station"}
                                            textDecorationLine={'none'}
                                            fontWeight="500"
                                            fontSize={wp(3.5)}
                                            marginVertical={wp(1)}
                                            marginHorizontal={wp(3)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                        <TextComponent
                                            color={Colors.white}
                                            title={"Surat Bus station"}
                                            textDecorationLine={'none'}
                                            fontWeight="500"
                                            fontSize={wp(3.5)}
                                            marginHorizontal={wp(3)}
                                            marginVertical={wp(3)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View style={{ justifyContent: 'center' }}>
                                        <TextComponent
                                            color={Colors.white}
                                            title={item?.carRent} // Symbol As Text Use it !
                                            textDecorationLine={'none'}
                                            fontWeight="700"
                                            fontSize={wp(4)}
                                            marginVertical={wp(3)}
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            textAlign='left'
                                        />
                                    </View>

                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <TextComponent
                                        color={Colors.grayFull}
                                        title={item?.carDate}
                                        textDecorationLine={'none'}
                                        fontWeight="500"
                                        fontSize={wp(3.5)}
                                        marginVertical={wp(1)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='left'
                                    />
                                    <TextComponent
                                        color={Colors.grayFull}
                                        title={item?.carTimeFormat}
                                        textDecorationLine={'none'}
                                        fontWeight="500"
                                        fontSize={wp(3.5)}
                                        marginVertical={wp(1)}
                                        marginHorizontal={wp(3)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='left'
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

export default CarCourierListComponent;
