import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import HeaderComponent from '../../components/Header';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text';
import { Colors, Fonts, Images } from '../../themes/index';
import { ScreenText } from '../../utils';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from '../../utils/commonfunction';
import Styles from './style';

type Props = {
    navigation: any
}

const SavedLocationScreen = (props: Props) => {

    const [SavedLocationdModalREQ, SetSavedLocationdModalREQ] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                await axiosPostGetListLocation();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        // Set interval to refresh every 10 seconds
        const intervalId = setInterval(fetchData, 10 * 1000);
        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, []);


    const axiosPostGetListLocation = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostSetDataGetListLocation();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostSetDataGetListLocation = async () => {
        try {
            const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            if (storedLinkedId !== null) {
                const userId = JSON.parse(storedLinkedId);
                const url = `https://rideshareandcourier.graphiglow.in/api/saveLocations/fetchlocations`;

                // Prepare data in JSON format //
                const data = {
                    UserID: userId,
                    // service_type: "booking", // as flow
                    // type: "Pick" // as flow

                    // UserID: "651d572da4f5277d161c1173",
                    // service_type: "courier",
                    // type: "Drop"
                };

                console.log("SAVEDLIST==>", JSON.stringify(data, null, 2));

                await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => {
                        if (response.status === 200 &&
                            response?.data?.message === "Saved Locations") {

                            // console.log("AllResponseData***PICK==>",
                            //     JSON.stringify(
                            //         response?.data?.matchingLocations, null, 2));

                            SetSavedLocationdModalREQ(response?.data?.matchingLocations);

                            // Toast.show('Success! Locations Retrieved Successfully!', Toast.SHORT);
                            // props.navigation.goBack();
                        } else {
                            // Toast.show('Saved Credentials Invalid!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Toast.show('Saved Credentials Invalid!', Toast.SHORT);
                    });
            } else {
                // Handle the case where storedLinkedId is null
            }
        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    };

    const RemoveSelectedLocation = async (item) => {
        console.log("item_ID_=====>", item?._id)
        // CALL REMOVE API :
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostRemovedSelected(item);

            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostRemovedSelected = async (item) => {

        try {
            const url = `https://rideshareandcourier.graphiglow.in/api/saveLocationsRemove/locations/${item?._id}`;

            await axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200
                        && response?.data?.message === 'Save Locations Remove successfully') {

                        Toast.show('Remove Save Location Successfully!', Toast.SHORT);

                    } else {
                        Toast.show('Unable To Save Location!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Unable To Save Location!', Toast.SHORT);
                });

        } catch (error) {

        }

    };

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <View style={Styles.container}>

                <View style={Styles.viewHeader}>
                    <HeaderComponent
                        margin={wp(3)}
                        backgroundColorOpacity={Colors.circleGray}
                        borderRadiusOpacity={wp(10)}
                        paddingOpacity={wp(2)}
                        textAlign={"left"}
                        source={Images.arrowRight}
                        marginTop={wp(2)}
                        width={wp(7)}
                        marginHorizontal={wp(5)}
                        height={wp(7)}
                        color={Colors.white}
                        fontFamily={Fonts.InterSemiBold}
                        fontWeight="500"
                        title={"Saved Location"}
                        titleWithRightContent={"+ Add Location"}
                        textAlignRight={"right"}
                        fontFamilyRight={Fonts.PoppinsRegular}
                        fontSizeRight={wp(3)}
                        onPressRightEnd={() => props.navigation.navigate("LocationScreen")}
                        fontSize={wp(4)}
                        marginTopRight={wp(3)}
                        marginRight={wp(2)}
                        colorRight={Colors.white}
                        onPress={() => props.navigation.goBack()}
                    />


                </View>

                <FlatList
                    data={SavedLocationdModalREQ}
                    bounces={true}
                    contentContainerStyle={Styles.viewContentContainerStyle}
                    keyExtractor={(item: any) => item._id.toString()}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={Styles.ItemSeparatorComponent}>
                            </View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
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
                                            activeOpacity={0.1}
                                            onPress={() => RemoveSelectedLocation(item)}>
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
        </SafeAreaView >
    )
}

export default SavedLocationScreen;