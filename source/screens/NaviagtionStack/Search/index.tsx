import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BackHandler, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import HeaderUserComponent from '../../../components/HeaderUser';
import ListEmptyComponent from '../../../components/ListEmptyComponent';
import TextComponent from '../../../components/Text';
import { Colors, Fonts, Images } from '../../../themes/index';
import CommonStyle from "../../../utils/commonStyle";
import NetworkUtils from '../../../utils/commonfunction';
import { ScreenText } from '../../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}

const SearchScreen = (props: Props) => {

    const [userName, setUserName] = useState('');
    const [categories, updateCategories] = useState<any>([]);
    const [categoriesAll, updateCategoriesAll] = useState<any>([]);

    const navigation = useNavigation();

    useEffect(() => {
        axiosGetRequestInterest();
        axiosGetRequestbookList();
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

    const filterData = (text) => {
        return categories.filter(item => {
            return item.book_name.toLowerCase().includes(text.toLowerCase());
        });
    };


    const handleOnPress = ({ item, index }) => {
        const newCategories = categories.map((item) => {
            item.selected == false
            return item;
        });
        newCategories[index].selected = !newCategories[index].selected;
        updateCategories(newCategories);

        if (item?.selected) {
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

        }
    }

    const axiosGetRequestInterest = async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable()
        if (isConnected) {
            let config = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
            const url = 'https://mechodalgroup.xyz/readbooks/api/show_interest.php'
            await axios.get(url, config)
                .then((response) => {
                    if (response.status == 200) {
                        updateCategoriesAll(response?.data?.categories);
                    }
                    else {

                    }
                });
        } else {
            Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
        }

    }


    const fetchData = async (userName) => {
        const response =
            await axios.get(`https://mechodalgroup.xyz/readbooks/api/search.php?search=${userName}`, {
                params: {
                    search: userName,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        if (response.status == 200) {
            updateCategories(response?.data?.books);
            return response?.data?.books;
        } else {
            if (userName == '') {
                axiosGetRequestbookList();
            } else {
                axiosGetRequestbookList();
            }
        }
    };

    const axiosGetRequestbookList = async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable()
        if (isConnected) {
            let config = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
            const url = 'https://mechodalgroup.xyz/readbooks/api/add-book.php'
            await axios.get(url, config)
                .then((response) => {
                    if (response.status == 200) {
                        updateCategories(response?.data?.interests);
                    }
                    else {
                        // nul;;
                    }
                });
        } else {
            Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
        }

    }

    const onChangeText = (searchText) => {
        setUserName(searchText);
        fetchData(userName);
    };

    const onPressAll = () => {
        axiosGetRequestbookList();
    }

    return (
        <ScrollView alwaysBounceVertical={true}>
            <SafeAreaView style={Styles.container}>

                <HeaderUserComponent
                    onPressArrow={() => props.navigation.goBack()}
                    isWidth={false}
                    isVisibleArrow={true}
                    onPress={() => props.navigation.navigate("Search")}
                    isArrowVisible={false}
                    editable={true}
                    onChangeText={(text) => setUserName(text)}
                />

                <View style={Styles.viewMargin}>
                    <View style={CommonStyle.commonContent}>
                        <TextComponent
                            color={Colors.lightBlack}
                            title={ScreenText.Category}
                            textDecorationLine={'none'}
                            marginLeft={wp(1)}
                            fontWeight="500"
                            fontSize={wp(4)}
                            marginVertical={wp(2)}
                            fontFamily={Fonts.InterSemiBold}
                            textAlign='left'
                            letterSpacing={wp(0)} />
                    </View>

                    <View style={CommonStyle.commonRow}>

                        <TouchableOpacity onPress={onPressAll}>
                            <View style={Styles.viewMarginTop}>
                                <View style={Styles.viewCategory}>
                                    <Image
                                        source={Images.allCategory}
                                        resizeMode="contain"
                                        style={Styles.imageCategory} />

                                </View>
                                <TextComponent
                                    color={Colors.textColor}
                                    title={ScreenText.All}
                                    textDecorationLine={'none'}
                                    fontWeight="400"
                                    fontSize={wp(3)}
                                    fontFamily={Fonts.InterRegular}
                                    alignSelf='center'
                                    textAlign='left'
                                    letterSpacing={wp(0)} />
                            </View>
                        </TouchableOpacity>



                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={categoriesAll}
                            renderItem={({ item }) => (
                                <TouchableOpacity activeOpacity={0}
                                    onPress={() =>
                                        props.navigation.navigate("CategoryDetailsPre", {
                                            itemBookPrice: item.price,
                                            itemBookName: item.book_name,
                                            itemBookDescription: item.book_description,
                                            itemBookCategory: item.category_name,
                                            itemImageLink1: item.image1_link,
                                            itemImageLink2: item.image2_link,
                                            itemImageLink3: item.image3_link,
                                            itemBookLink: item.book_link,
                                            itemSelected: item.selected,
                                            itemProductId: item.product_id,
                                            itemRating: item.rating
                                        })}>

                                    <View>
                                        <View style={Styles.viewCategory}>
                                            <Image
                                                source={{ uri: item.image1_link }}
                                                resizeMode="contain"
                                                style={Styles.imageCategoryIcon} />

                                        </View>
                                        <TextComponent
                                            color={Colors.textColor}
                                            title={item.category_name}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3)}
                                            fontFamily={Fonts.InterRegular}
                                            alignSelf='center'
                                            textAlign='left'
                                            letterSpacing={wp(0)} />
                                    </View>
                                </TouchableOpacity>
                            )}
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

                    <TextComponent
                        color={Colors.lightBlack}
                        title={ScreenText.SearchResult}
                        textDecorationLine={'none'}
                        marginLeft={wp(1)}
                        fontWeight="400"
                        fontSize={wp(4)}
                        marginVertical={wp(2)}
                        fontFamily={Fonts.InterRegular}
                        textAlign='left'
                        letterSpacing={wp(0)} />
                </View>

                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            marginBottom: wp(5),
                            alignSelf: 'center'
                        }}
                        numColumns={2}
                        data={filterData(userName)}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() =>
                                    props.navigation.navigate("CategorySearch", {
                                        itemBookPrice: item.price,
                                        itemBookName: item.book_name,
                                        itemBookDescription: item.book_description,
                                        itemBookCategory: item.category,
                                        itemImageLink1: item.image1_link,
                                        itemImageLink2: item.image2_link,
                                        itemImageLink3: item.image3_link,
                                        itemBookLink: item.book_link,
                                        itemSelected: item.selected,
                                    }
                                    )} activeOpacity={0.2}>
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
                                                        {!item.selected ?

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

                                            <Image source={{ uri: item.image1_link }}
                                                style={Styles.imageBookIcon}
                                                resizeMode="contain" />

                                            <View style={Styles.viewBookContain}>
                                                <View>
                                                    <Text style={Styles.textBookTitle}>{item.book_name}</Text>
                                                    <Text style={Styles.textBookPrice}>{ScreenText.RsSymbol}{item.price}</Text>
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

            </SafeAreaView>
        </ScrollView>
    )
}

export default SearchScreen;