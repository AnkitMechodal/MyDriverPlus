import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Fonts, Images } from "../../themes";
import { API } from '../../utils';
import TextComponent from '../Text';
import Styles from "./style";

type Props = {
    navigation: any
}

const TabBook2UpScreen = ({ route, navigation }) => {

    const [COURIERUPDATA, setCOURIERUPDATA] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const storedLinkedId = await AsyncStorage.getItem('user_register_id');

                if (storedLinkedId !== null) {

                    const requestData = {
                        UserID: JSON.parse(storedLinkedId),
                        type: "Courier Delivery"

                        // UserID: "6586c61da9d63c785081be66", // test 
                        // type: "Courier Delivery"
                    };

                    console.log("requestData===>", JSON.stringify(requestData, null, 2));

                    const url = `${API.BASE_URL}/CourierDriverHistory/courierdriverhistory`;

                    const response = await axios.post(
                        url,
                        requestData
                    );

                    // console.log('Response:', JSON.stringify(response.data?.matchingVehicles, null, 2));

                    // Set the response data to the state
                    setCOURIERUPDATA(response.data?.matchingVehicles);

                } else {

                }

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors here
            }
        };

        fetchData();

        // Set interval to refresh every 5 seconds
        const intervalId = setInterval(fetchData, 5 * 1000);

        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };

    }, []);  // Add an empty dependency array to run the effect only once


    const renderItem = ({ item }) => (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("CourierDetailsDrawerUpcoming", {
                        itemRideID: item._id,
                    }
                    )}
            >
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
                                title={item?.type}
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(3.5)}
                                marginVertical={wp(2)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            {item?.status == "Pending" ?
                                <TextComponent
                                    color={Colors.blue}
                                    title={item?.status}
                                    textDecorationLine={'none'}
                                    fontWeight="500"
                                    fontSize={wp(3.5)}
                                    marginVertical={wp(2)}
                                    fontFamily={Fonts.PoppinsRegular}
                                    textAlign='right' />
                                : item?.status == "Cancel" ?
                                    <TextComponent
                                        color={Colors.orange}
                                        title={item?.status}
                                        textDecorationLine={'none'}
                                        fontWeight="500"
                                        fontSize={wp(3.5)}
                                        marginVertical={wp(2)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign='right' /> :
                                    <TextComponent
                                        color={Colors.darkGreen}
                                        title={item?.status}
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
                                    title={item?.distance}
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
                                    title={item?.time}
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

                        <View style={{ flex: 1 }}>
                            <TextComponent
                                color={Colors.white}
                                title={item.pickup_locations}
                                textDecorationLine={'none'}
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                                fontWeight="500"
                                fontSize={wp(3.5)}
                                marginVertical={wp(1)}
                                marginHorizontal={wp(3)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.white}
                                title={item.drop_locations}
                                numberOfLines={1}
                                ellipsizeMode={"tail"}
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(3.5)}
                                marginHorizontal={wp(3)}
                                marginVertical={wp(3)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <TextComponent
                                color={Colors.white}
                                title={"$ " + item?.Price} // Symbol As Text Use it !
                                textDecorationLine={'none'}
                                fontWeight="700"
                                fontSize={wp(4)}
                                marginVertical={wp(3)}
                                marginRight={wp(4)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                textAlign='right'
                            />
                        </View>

                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <TextComponent
                            color={Colors.grayFull}
                            title={item?.date}
                            textDecorationLine={'none'}
                            fontWeight="500"
                            fontSize={wp(3.5)}
                            marginVertical={wp(1)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                        />

                        {/* <TextComponent
                        color={Colors.grayFull}
                        title={item?.carTimeFormat}
                        textDecorationLine={'none'}
                        fontWeight="500"
                        fontSize={wp(3.5)}
                        marginVertical={wp(1)}
                        marginHorizontal={wp(3)}
                        fontFamily={Fonts.PoppinsRegular}
                        textAlign='left'
                    /> */}

                    </View>



                </View>
            </TouchableOpacity>


        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {/* <CarRideListComponent
                onPress={() => props.navigation.navigate("CourierDetailsDrawerUpcoming")}
                data={UpcomingCdata} - courier
            /> */}

            <FlatList
                data={COURIERUPDATA}
                bounces={true}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
            />
        </View>

    )
}

export default TabBook2UpScreen;
