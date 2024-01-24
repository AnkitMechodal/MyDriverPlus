import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { BackHandler, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Toast from "react-native-simple-toast";
import HeaderComponent from "../../../components/Header";
import StatusBarComponent from "../../../components/StatusBar";
import { Colors, Fonts, Images } from "../../../themes/index";
import CommonStyle from "../../../utils/commonStyle";
import NetworkUtils from '../../../utils/commonfunction';
import Styles from "./style";
import { ScreenText } from '../../../utils';
import ListEmptyComponent from '../../../components/ListEmptyComponent';

type Props = {
    navigation: any
}

const CategoryDetailsPre = ({ route }) => {

    useEffect(() => {
        getAllData({ route })
    }, [])

    useEffect(() => {
        let StoreUser = AsyncStorage.getItem("email");
        if (StoreUser !== null) {
            const backAction = () => {
                navigation.dispatch(
                    CommonActions.navigate({
                        name: "Search", // error
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
                        name: "Search",
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

    const [BookPrice, setBookPrice] = useState('');
    const [BookName, setBookName] = useState('');
    const [BookDescription, setBookDescription] = useState('');
    const [BookCategory, setBookCategory] = useState('');
    const [itemImageLink1, setItemImageLink1] = useState("");
    const [itemImageLink2, setItemImageLink2] = useState("");
    const [itemImageLink3, setItemImageLink3] = useState("");
    const [itemBookLinkURL, setItemBookLinkURL] = useState("");

    const [itemSelected, setItemSelected] = useState(false);
    const [itemRating, setItemRating] = useState('');
    const [itemProductId, setItemProductId] = useState('');

    const [categories, updateCategories] = useState<any>([]);

    const getAllData = async ({ route }) => {
        let {
            itemBookPrice,
            itemBookName,
            itemBookDescription,
            itemBookCategory,
            itemImageLink1,
            itemImageLink2,
            itemImageLink3,
            itemBookLink,
            itemSelected,
            itemRating,
            itemProductId

        } = route.params;

        setBookPrice(itemBookPrice);
        setBookName(itemBookName);
        setBookDescription(itemBookDescription);
        setBookCategory(itemBookCategory);
        setItemImageLink1(itemImageLink1);
        setItemImageLink2(itemImageLink2);
        setItemImageLink3(itemImageLink3);
        setItemBookLinkURL(itemBookLink);

        let tempObj = [
            itemImageLink1,
            itemImageLink2,
            itemImageLink3,
        ]
        setImages(tempObj);

        const isConnected = await NetworkUtils.isNetworkAvailable();
        if (isConnected) {
            axiosGetRequestbookList(itemBookCategory);
        } else {
            Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
        }

    }

    const navigation = useNavigation();


    const [images, setImages] = React.useState(
        [
            itemImageLink1,
            itemImageLink2,
            itemImageLink3,
        ]
    );

    const axiosGetRequestbookList = async (itemBookCategory) => {

        const response =
            await axios.get('https://mechodalgroup.xyz/readbooks/api/add-book.php', {
                params: {
                    category: itemBookCategory,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

        if (response.status == 200) {
            updateCategories(response?.data?.interests);
        } else {

        }

    }

    const handleOnPress = ({ item, index }) => {
        const newCategories = categories.map((item) => {
            item.selected == false
            return item;
        });
        newCategories[index].selected = !newCategories[index].selected;
        updateCategories(newCategories);

        if (item?.selected == true) {
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
            }

        } else {

        }
    }
    return (
        <SafeAreaView style={Styles.container}>

            <StatusBarComponent
                backgroundColor={Colors.white} />

            <HeaderComponent
                margin={wp(5)}
                textAlign={"center"}
                backgroundColor={Colors.white}
                source={Images.arrowLeft}
                width={wp(5)}
                height={wp(5)}
                color={Colors.lightBlack}
                fontFamily={Fonts.InterRegular}
                fontWeight="500"
                title={BookCategory}
                fontSize={wp(4)}
                onPress={() => navigation.goBack()}
            />

            <View style={Styles.viewMargin}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={Styles.listMargin}
                    numColumns={2}
                    data={categories}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        // let selectedIndex = categories.findIndex((item) => item.id);
                        return (
                            <TouchableOpacity onPress={() =>
                                navigation.navigate("SearchDeatils", {
                                    itemBookPrice: item.price,
                                    itemBookName: item.book_name,
                                    itemBookDescription: item.book_description,
                                    itemBookCategory: item.category,
                                    itemImageLink1: item.image1_link,
                                    itemImageLink2: item.image2_link,
                                    itemImageLink3: item.image3_link,
                                    itemBookLink: item.book_link,
                                    itemProductId: item.product_id,
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
                                            resizeMode="cover" />

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

        </SafeAreaView>
    );

}

export default CategoryDetailsPre;
