import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    BackHandler,
    FlatList, Image,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity, View
} from 'react-native';
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ListEmptyComponent from '../../../components/ListEmptyComponent';
import StatusBarComponent from '../../../components/StatusBar';
import { Colors, Fonts, Images } from '../../../themes/index';
import CommonStyle from "../../../utils/commonStyle";
import NetworkUtils from '../../../utils/commonfunction';
import { ScreenText } from '../../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}

const SaveTab = (props: Props) => {
    const navigation = useNavigation();

    useEffect(() => {
        axiosPostRequestSaveBookList();
        AdShow();
    }, []);

    useEffect(() => {
        let StoreUser = AsyncStorage.getItem("email");
        if (StoreUser !== null) {
            const backAction = () => {
                navigation.dispatch(
                    CommonActions.navigate({
                        name: "Home",
                    })
                )
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove();
        } else {
            const backAction = () => {

                navigation.dispatch(
                    CommonActions.navigate({
                        name: "Home",
                    })
                )
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove();
        }

    }, []);

    const AdShow = async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable();
        if (isConnected) {
            setAdShow(false)
        } else {
            setAdShow(true)
        }
    }

    const [refreshing, setRefreshing] = React.useState(false);
    const [isAdShow, setAdShow] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            axiosPostRequestSaveBookList();
            setRefreshing(false);
        }, 2000);
    }, []);

    const [categories, updateCategories] = useState<any>([]);


    const handleOnPress = ({ item, index }) => {
        const newCategories = categories.map((item) => {
            item.category == false
            return item;
        });
        newCategories[index].category = !newCategories[index].category;
        updateCategories(newCategories);

        if (item?.category == true) {
            axiosPostRequestbookMarkAddListAPI(item);
        } else {
            axiosPostRequestbookMarkAddListAPI(item);
        }
    };


    const axiosPostRequestbookMarkAddListAPI = async (item) => {
        let StoreUser = await AsyncStorage.getItem("email");
        if (StoreUser !== null) {
            const url = 'https://mechodalgroup.xyz/readbooks/api/bookmark.php'

            const response =
                await axios.get(url, {
                    params: {
                        product_id: item.product_id.toString(),
                        email_id: JSON.parse(StoreUser),
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            if (response.status == 200) {

                Toast.show(response?.data?.message, Toast.SHORT);
            } else {
                // null;
            }

        } else {
            // UserNull();
        }
    }

    const UserNull = async () => {
        let StoreUser = await AsyncStorage.getItem("email");
        if (StoreUser == null) {
            const url = 'https://mechodalgroup.xyz/readbooks/api/show_bookmark.php'
            const response =
                await axios.get(url, {
                    params: {
                        email_id: '',
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            if (response.status == 200) {
                updateCategories(response?.data?.bookmark);
            } else {
                Toast.show(ScreenText.LoginAsRegisterUser, Toast.SHORT);
            }
        } else {

        }


    }


    const axiosPostRequestSaveBookList = async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable();
        if (isConnected) {
            let StoreUser = await AsyncStorage.getItem("email");
            if (StoreUser !== null) {
                const url = 'https://mechodalgroup.xyz/readbooks/api/show_bookmark.php'
                const response =
                    await axios.get(url, {
                        params: {
                            email_id: JSON.parse(StoreUser),
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                if (response.status == 200) {
                    updateCategories(response?.data?.bookmark);
                } else {
                    Toast.show(ScreenText.LoginAsRegisterUser, Toast.SHORT);
                }
            } else {

            }
        } else {
            Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
        }
    }

    const ListFooterComponent = () => {
        return (
            <>
                {!isAdShow ? <BannerAd
                    unitId={'ca-app-pub-4105644791348608/7859799136'}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: false,
                    }}
                    onAdLoaded={() => {
                    }}
                    onAdFailedToLoad={(error) => {
                    }}
                /> : null
                }
            </>
        );
    }

    return (
        <SafeAreaView style={Styles.container}>
            <StatusBarComponent
                backgroundColor={Colors.white} />

            <ScrollView style={CommonStyle.commonFlex}
                alwaysBounceVertical={true}>
                <View style={Styles.viewMarginMain}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginBottom: wp(20) }}
                        numColumns={2}
                        scrollEnabled={true}
                        ListHeaderComponent={ListFooterComponent}
                        data={categories}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh} />
                        }
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() =>
                                    props.navigation.navigate("Deatils", {
                                        itemBookPrice: item.price,
                                        itemBookName: item.book_name,
                                        itemBookDescription: item.book_description,
                                        itemBookCategory: item.category,
                                        itemImageLink1: item.image1_link,
                                        itemImageLink2: item.image2_link,
                                        itemImageLink3: item.image3_link,
                                        itemBookLink: item.book_link,
                                        itemSelected: item.selected,
                                        itemProductId: item.product_id,
                                    }
                                    )}
                                    activeOpacity={0.2}>
                                    <View style={Styles.viewShadow}>
                                        <View style={Styles.viewBookBox}>
                                            <View style={CommonStyle.commonContent}>
                                                <View style={Styles.viewBookRating}>
                                                    <Image source={Images.favouriteIcon}
                                                        style={Styles.imageRateIcon}
                                                        resizeMode="contain" />
                                                    <Text style={Styles.textRatePrice}>{item.rating}</Text>
                                                </View>
                                            </View>
                                            <View style={CommonStyle.commonContent}>

                                                <View style={Styles.viewBookMark}>
                                                    <TouchableOpacity
                                                        onPress={() => handleOnPress({ item, index })}
                                                    >
                                                        {item.category ?

                                                            < Image source={
                                                                Images.saveTabGray}
                                                                style={Styles.imageBookIconColor}
                                                                resizeMode="contain" />
                                                            :

                                                            < Image source={
                                                                Images.saveTabGreen}
                                                                style={Styles.imageBookIconColor}
                                                                resizeMode="contain" />

                                                        }


                                                    </TouchableOpacity>

                                                </View>
                                            </View>
                                        </View>

                                        <View style={Styles.viewMargin}>

                                            <Image source={{ uri: item.image1 }}
                                                style={Styles.imageBookIcon}
                                                resizeMode="contain" />

                                            <View style={Styles.viewBookContain}>
                                                <View>
                                                    <Text style={Styles.textBookTitle}>{item.book_name}</Text>
                                                    <Text style={Styles.textBookPrice}>{item.price}</Text>
                                                </View>


                                            </View>

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

            </ScrollView>



        </SafeAreaView>
    )

}
export default SaveTab;