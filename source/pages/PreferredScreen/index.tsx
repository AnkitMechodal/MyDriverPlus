import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
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

const PreferredScreen = (props: Props) => {

    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5, 6]);

    const starImageFilled =
        Images.fillStarIcon;
    const starImageCorner =
        Images.unfillStarIcon;



    const [isFocusedPasswordRef, setIsFocusedPasswordRef] = useState(false);


    const [PreferredDataREQ, setPreferredDataREQ] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                await axiosPostGetListPreferred();

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



    const axiosPostGetListPreferred = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostSetDataGetListPreferred();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }


    const axiosPostSetDataGetListPreferred = async () => {
        try {
            const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            if (storedLinkedId !== null) {
                const userId = JSON.parse(storedLinkedId);
                const url = `https://rideshareandcourier.graphiglow.in/api/preferredDriverShow/show`;

                // Prepare data in JSON format //
                const data = {
                    UserID: userId,
                    // UserID: "65866182ebf0f0e8716fc4ea" //test16
                };

                console.log("PreferredList==>", JSON.stringify(data, null, 2));

                await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => {
                        if (response.status === 200 &&
                            response?.data?.message === 'Preferred Drivers Are') {

                            console.log("PreferredList----==>", JSON.stringify(response?.data, null, 2));


                            setPreferredDataREQ(response?.data?.combinedResults);

                            // Toast.show('Success! Preferred Retrieved Successfully!', Toast.SHORT);
                            // props.navigation.goBack();
                        } else {
                            // Toast.show('Unable To Retrieved!-2', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Toast.show('Unable To Retrieved!-1', Toast.SHORT);
                    });
            } else {
                // Handle the case where storedLinkedId is null
            }
        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    };

    const RemoveSelectedLocation = async (item) => {
        console.log("ITEM_ID_DRIVER====>", item?.ObjectId)
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
            const url
                = `https://rideshareandcourier.graphiglow.in/api/preferredDriverRemove/remove/${item?.ObjectId}`;

            await axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200
                        && response?.data?.message === 'Preferred Driver Remove successfully') {

                        Toast.show('Remove Preferred Driver Successfully!', Toast.SHORT);

                    } else {
                        Toast.show('Unable To Remove!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Unable To Remove!', Toast.SHORT);
                });

        } catch (error) {

        }

    };

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <ScrollView style={CommonStyle.commonFlex}>
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
                            title={"Preferred Driver"}
                            fontSize={wp(4)}
                            onPress={() => props.navigation.goBack()}
                        />
                    </View>

                    <View>
                        <FlatList
                            data={PreferredDataREQ}
                            contentContainerStyle={Styles.viewContentContainerStyle}
                            keyExtractor={(item: any) => item._id}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.1}

                                        onPress={() =>
                                            props.navigation.navigate('PreferredDriverDrawer', {
                                                itemRider_ID_: item?._id,
                                            })}>
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
                                                                            disabled={true}
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
                                                    onPress={() => RemoveSelectedLocation(item)}
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
                                    </TouchableOpacity>

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

                </View>
            </ScrollView >

        </SafeAreaView >
    )
}

export default PreferredScreen;
