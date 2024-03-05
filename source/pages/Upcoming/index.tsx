import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import TextComponent from '../../components/Text';
import { Colors, Fonts, Images } from '../../themes/index';
import { API, ScreenText } from '../../utils';
import Styles from './style';

type Props = {
    navigation: any
}


const Tab3Screen = (props: Props) => {


    const [RIDEUPDATA, setRIDUPDATA] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {

                const storedLinkedId = await AsyncStorage.getItem('user_register_id');

                if (storedLinkedId !== null) {

                    const requestData = {
                        UserID: JSON.parse(storedLinkedId),
                        type: "Taxi Booking",
                        RideStatusType: "upcoming" //01

                        // type: "Taxi Booking",
                        // // "service_stype": "Ride Now",
                        // UserID: "65214aec906807c5544fb29b",
                        // // "schedule_date": "04-10-2023"
                        // RideStatusType: "upcoming" // test
                    };

                    console.log("requestData16===>", JSON.stringify(requestData, null, 2));

                    const url = `${API.BASE_URL}/CourierDriverHistory/courierdriverhistory`;

                    const response = await axios.post(
                        url,
                        requestData
                    );

                    console.log('UPComing_DATA16==>',
                        JSON.stringify(response.data?.matchingVehicles, null, 2));

                    // Set the response data to the state
                    setRIDUPDATA(response.data?.matchingVehicles);

                } else {

                }

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors here
            }
        };

        fetchData();
    }, []);  // Add an empty dependency array to run the effect only once


    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>

            <FlatList
                data={RIDEUPDATA}
                contentContainerStyle={Styles.viewContentContainerStyle}
                keyExtractor={(item: any) => item._id} //1201
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <View style={{ flex: 1, backgroundColor: 'black' }}>

                                <TouchableOpacity
                                    onPress={() =>
                                        props.navigation.navigate("BookingDetailsNoFeed", {
                                            itemRIDER_ID_SENT: item._id, // _id
                                            itemRIDEID_SENT: item.RideId, // RIDE_ID
                                            itemRIDER_DISTANCE_SENT: item.distance,
                                            itemRIDER_DURATUION_SENT: item.time,
                                            itemRIDER_PICKSTATION: item.pickup_locations,
                                            itemRIDER_DROPSTATION: item.drop_locations,
                                            itemRIDER_RIDE_CHARGE: item.RideCharge,
                                            itemRIDER_RIDE_FEES_CON: item.BookingFeesConvenience,
                                            itemRIDER_RIDE_WAITING_CHARGES: item.Waiting_Charge,
                                            itemRIDER_RIDE_DICOUNT: item.Discount,
                                            itemRIDER_RIDE_TOTALAMOUNT: item.TotalAmount,
                                        })}>
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

                                            <View>
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={" , " + item?.service_stype}
                                                    textDecorationLine={'none'}
                                                    fontWeight="500"
                                                    fontSize={wp(3.5)}
                                                    marginVertical={wp(2)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    textAlign='left'
                                                />
                                            </View>

                                            <View style={{ flex: 1, justifyContent: 'center' }}>
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
                                                    : <TextComponent
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

                                            <View>
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={item?.pickup_locations}
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
                                                    title={item?.drop_locations}
                                                    textDecorationLine={'none'}
                                                    fontWeight="500"
                                                    fontSize={wp(3.5)}
                                                    marginHorizontal={wp(3)}
                                                    marginVertical={wp(3)}
                                                    fontFamily={Fonts.PoppinsRegular}
                                                    textAlign='left'
                                                />
                                            </View>

                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <TextComponent
                                                    color={Colors.white}
                                                    title={"$ " + item?.Price} // Symbol As Text Use it !
                                                    textDecorationLine={'none'}
                                                    fontWeight="700"
                                                    fontSize={wp(4)}
                                                    // marginRight={wp(3)}
                                                    // marginVertical={wp(3)}
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
                        </View >

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

        </View >
    )

}

export default Tab3Screen;