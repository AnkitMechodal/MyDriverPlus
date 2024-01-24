import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    BackHandler,
    FlatList, Image, SafeAreaView,
    ScrollView, Text,
    TouchableOpacity, View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../../components/Button';
import HeaderUserComponent from '../../../components/HeaderUser';
import ListEmptyComponent from '../../../components/ListEmptyComponent';
import StatusBarComponent from '../../../components/StatusBar';
import TextComponent from '../../../components/Text';
import { Colors, Fonts, Images } from '../../../themes/index';
import { ConstValue, ScreenText } from '../../../utils';
import CommonStyle from "../../../utils/commonStyle";
import NetworkUtils from '../../../utils/commonfunction';
import Styles from './style';

type Props = {
    navigation: any
}

const HomeTab = (props: Props) => {
    const [categories, updateCategories] = useState<any>([]);

    const [categoriesAll, updateCategoriesAll] = useState<any>([]);
    const [slider, setSlider] = useState([]);

    const [selectedIcon, setSelectedIcon] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        let StoreUser = AsyncStorage.getItem("email");
        if (StoreUser !== null) {
            const backAction = () => {
                BackHandler.exitApp();
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove();
        } else {
            const backAction = () => {
                BackHandler.exitApp();
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove();
        }

    }, []);

    useEffect(() => {
        axiosGetRequestbookList();
        axiosGetRequestInterest();
        axiosGetRequestInterestSlider();
    }, []);


    const axiosGetRequestInterestSlider = async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable();
        if (isConnected) {
            let config = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
            const url = 'https://mechodalgroup.xyz/readbooks/api/add-banner.php'
            await axios.get(url, config)
                .then((response) => {
                    if (response.status == 200) {
                        setSlider(response?.data?.banners);
                    }
                    else {
                    }
                });
        } else {
            Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
        }

    }

    const axiosGetRequestInterest = async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable();
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
                        product_id: item.product_id,
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

    const axiosGetRequestbookList = async () => {
        const isConnected = await NetworkUtils.isNetworkAvailable();
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

    const [images, setImages] = React.useState(
        [
            require("../../../images/ic_banner1.png"),
            require("../../../images/ic_banner1.png"),
            require("../../../images/ic_banner1.png"),
        ]
    );

    return (
        <ScrollView alwaysBounceVertical={true}>
            <SafeAreaView style={Styles.container}>
                <StatusBarComponent backgroundColor={Colors.white} />
                <View style={Styles.viewMargin}>
                    <HeaderUserComponent
                        isVisibleArrow={false}
                        isWidth={true}
                        editable={false}
                        onPress={() => props.navigation.navigate("Search")}
                        isArrowVisible={false}
                    />

                    <View style={CommonStyle.commonContent}>

                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={slider}
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item.image1_link }}
                                    resizeMode="contain"
                                    style={Styles.imageSlider} />
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

                        <TextComponent
                            color={Colors.lightBlack}
                            title={ScreenText.Category}
                            textDecorationLine={'none'}
                            marginVertical={wp(3)}
                            marginLeft={wp(1)}
                            fontWeight="500"
                            fontSize={wp(4)}
                            fontFamily={Fonts.InterSemiBold}
                            textAlign='left'
                            letterSpacing={wp(0)} />
                    </View>

                    <View style={CommonStyle.commonRow}>

                        <View style={Styles.viewTop}>
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


                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={categoriesAll}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    activeOpacity={0.2}
                                    onPress={() =>
                                        props.navigation.navigate("CategoryDetails", {
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

                    <View style={Styles.viewListContainer}>

                        <View style={CommonStyle.commonContent}>
                            <TextComponent
                                color={Colors.lightBlack}
                                title={ScreenText.RecentProduct}
                                marginLeft={wp(1)}
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(4)}
                                fontFamily={Fonts.InterSemiBold}
                                textAlign='left'
                                letterSpacing={wp(0)} />
                        </View>

                        <View style={CommonStyle.commonContent}>
                            <ButtonComponent
                                marginVertical={hp(0)}
                                borderWidth={ConstValue.value1}
                                borderColor={Colors.gray}
                                heightBtn={hp(4)}
                                widthBtn={wp(22)}
                                isRightArrow={false}
                                onPress={() => props.navigation.navigate("Search")}
                                color={Colors.lightBlack}
                                title={ScreenText.ViewMore}
                                fontWeight="400"
                                fontSize={wp(3)}
                                fontFamily={Fonts.InterRegular}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                backgroundColor={Colors.white}
                            />
                        </View>

                    </View>

                </View>

                <View style={Styles.viewMargin}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginBottom: wp(20), alignSelf: 'center' }}
                        numColumns={2}
                        data={categories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => {
                            // let selectedIndex = categories.findIndex((item) => item.id);
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

            </SafeAreaView >
        </ScrollView >
    )

}
export default HomeTab;