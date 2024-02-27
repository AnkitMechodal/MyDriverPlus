import React, { useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts, Images } from "../../themes/index";
import CommonStyle from "../../utils/commonStyle";
import { ConstValue, ScreenText } from "../../utils/index";
import ListEmptyComponent from "../ListEmptyComponent/index";
import TextComponent from "../Text/index";
import Styles from "./style";

type ConfirmBookingListProps = {
    data: any;
    handleGetItemDetails: (item: any) => void;
};

const ConfirmBookingListComponent = ({ data, handleGetItemDetails }: ConfirmBookingListProps) => {

    const [selectedItem, setSelectedItem] = useState(null);

    // const [data, setData] = useState(props.data);
    // const [stateData, setData] = useState(data);

    const [modalVisibilities, setModalVisibilities] = useState(false);


    // const handleItemClickInfo = (index) => {
    //     setModalVisibilities(true);
    // };


    // useEffect(() => {
    //     setModalVisibilities(!modalVisibilities);
    // }, [modalVisibilities]);


    // const handleItemClickInfo = (index) => {
    //     setModalVisibilities((prevVisibilities) => prevVisibilities.map((vis, i) => i === index));
    // };

    const handleItemClick = ({ item, index }) => {
        const updatedData = [...data];
        if (selectedItem !== null) {

            // Deselect the previously selected item
            updatedData[selectedItem].border = item.border;
            updatedData[selectedItem].width = item.width;
        }

        // Select the new item
        updatedData[index].border = !item.border; // true
        updatedData[index].width = !item.width; // true

        setSelectedItem(index);
        // setData(updatedData);
        // Open the modal when the item is clicked
        // setModalVisibilities((prevVisibilities) => prevVisibilities.map((vis, i) => i === index));

    };

    const renderItem = ({ item, index }: { item: any; index: number }) => (
        <View>

            <TouchableOpacity
                style={{
                    backgroundColor: Colors.circleGray,
                    borderRadius: wp(3),
                    borderColor: !item.border ? Colors.transparent : Colors.blue,
                    // marginHorizontal: wp(5),
                    marginVertical: wp(2),
                    height: "auto",
                    borderWidth: !item.width ? ConstValue.value0 : ConstValue.value1,
                    flexDirection: "row",
                }}
                onPress={() => {
                    handleItemClick({ item, index });
                    handleGetItemDetails(item)
                }}
            >
                <View style={CommonStyle.commonFlex}>
                    <Image
                        style={Styles.carImageIcon}
                        resizeMode="cover" // item?.vehicleImage - Images.carIcon
                        source={{ uri: item?.image }} />
                </View>

                <View style={Styles.viewSecond}>
                    <View style={CommonStyle.justifyContent}>
                        <TextComponent
                            color={Colors.white}
                            title={item?.vehicle_name} // vehicleName
                            textDecorationLine={'none'}
                            fontWeight="600"
                            fontSize={wp(4)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign="left"
                        // marginHorizontal={wp(5)}
                        />
                        <TextComponent
                            color={Colors.gray}
                            title={item?.number_of_sheet} // vehicleSeatNo
                            textDecorationLine={'none'}
                            fontWeight="600"
                            fontSize={wp(3)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign="left"
                        // marginHorizontal={wp(5)} - item?.vehicleInfoImage
                        />
                    </View>

                    <View style={Styles.infoImageConatiner}>
                        <TouchableOpacity
                        // onPress={() => handleItemClickInfo(index)} //2277
                        >
                            <View>
                                <Image
                                    style={Styles.infoImageIcon}
                                    resizeMode="contain"
                                    source={Images.infoIcon} />

                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={Styles.viewInfoConatiner}>
                    <View style={CommonStyle.commonRow}>

                        {/* <TouchableOpacity
                                        onPress={() => handleItemClickInfo(index)}>
                                        <View>

                                            <Image
                                                style={Styles.infoImageIcon}
                                                resizeMode="contain"
                                                source={item.vehicleInfoImage} />

                                        </View>
                                    </TouchableOpacity> */}


                        <View style={Styles.textDollar}>
                            <TextComponent
                                color={Colors.white}
                                title={"$ " + item?.charge} // As HTML Contain - vehicleDollor
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign="right"
                            // marginHorizontal={wp(4)}
                            />
                        </View>

                    </View>
                </View>




            </TouchableOpacity>



        </View >
    );

    return (
        <FlatList
            data={data}
            windowSize={1}
            showsVerticalScrollIndicator={true}
            bounces={true}
            renderItem={renderItem}
            keyExtractor={(item: any) => item?._id?.toString()}
            ListEmptyComponent={() => (
                <ListEmptyComponent
                    color={Colors.black}
                    textDecorationLine={'none'}
                    fontWeight="600"
                    fontSize={wp(5)}
                    fontFamily={Fonts.PoppinsRegular}
                    alignSelf='center'
                    textAlign='center'
                    title={ScreenText.NoDataAvailable}
                />
            )}
        />
    );
};

export default ConfirmBookingListComponent;
