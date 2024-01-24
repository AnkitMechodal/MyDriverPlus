import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BackHandler, Image, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { SliderBox } from "react-native-image-slider-box";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../../components/Button';
import HeaderComponent from '../../../components/Header';
import StatusBarComponent from '../../../components/StatusBar';
import { Colors, Fonts, Images } from '../../../themes/index';
import CommonStyle from "../../../utils/commonStyle";
import NetworkUtils from '../../../utils/commonfunction';
import { ScreenText } from '../../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}
const DeatilScreen = ({ route }) => {
    const [isAdShow, setAdShow] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        AdShow();
        getAllData({ route })
    }, [])

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

    const [BookPrice, setBookPrice] = useState('');
    const [BookName, setBookName] = useState('');
    const [BookDescription, setBookDescription] = useState('');
    const [BookCategory, setBookCategory] = useState(false);
    const [itemImageLink1, setItemImageLink1] = useState("");
    const [itemImageLink2, setItemImageLink2] = useState("");
    const [itemImageLink3, setItemImageLink3] = useState("");
    const [itemBookLinkURL, setItemBookLinkURL] = useState("");
    const [itemBookSelected, setBookSelected] = useState(false);

    const [BookProductId, setBookProductId] = useState('');

    const getAllData = ({ route }) => {
        let { itemBookPrice,
            itemBookName, itemBookDescription,
            itemBookCategory,
            itemImageLink1,
            itemImageLink2,
            itemImageLink3,
            itemProductId,
            itemBookLink, itemSelected } = route.params;

        setBookPrice(itemBookPrice);
        setBookName(itemBookName);
        setBookDescription(itemBookDescription);
        setBookCategory(itemBookCategory);
        setItemImageLink1(itemImageLink1);
        setItemImageLink2(itemImageLink2);
        setItemImageLink3(itemImageLink3);
        setItemBookLinkURL(itemBookLink);
        setBookSelected(itemSelected);
        setBookProductId(itemProductId);

        let tempObj = [
            itemImageLink1,
            itemImageLink2,
            itemImageLink3,
        ]
        setImages(tempObj);
    }


    const [images, setImages] = React.useState(
        [
            itemImageLink1,
            itemImageLink2,
            itemImageLink3,
        ]
    );

    const handleOnPress = ({ item }) => {
        if (itemBookSelected == true) {
            axiosPostRequestbookMarkAddListAPI(BookProductId);
        } else {
            axiosPostRequestbookMarkAddListAPI(BookProductId);
        }
    };

    const axiosPostRequestbookMarkAddListAPI = async (BookProductId) => {
        let StoreUser = await AsyncStorage.getItem("email");
        if (StoreUser !== null) {
            const url = 'https://mechodalgroup.xyz/readbooks/api/bookmark.php'
            const response =
                await axios.get(url, {
                    params: {
                        product_id: BookProductId,
                        email_id: JSON.parse(StoreUser),
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            if (response.status == 200) {
                if (response?.data?.message == "Bookmark successful") {
                    // item.selected = !item.selected
                    Toast.show(response?.data?.message, Toast.SHORT);
                } else {
                    // item.selected = !item.selected
                    Toast.show(response?.data?.message, Toast.SHORT);
                }

            } else {
                // null;
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
                title={ScreenText.Details}
                fontSize={wp(4)}
                onPress={() => navigation.goBack()}
            />
            <ScrollView style={CommonStyle.commonFlex}
                alwaysBounceVertical={true}>
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
                <View style={Styles.bookIcon}>

                    <SliderBox
                        images={images}
                        sliderBoxHeight={hp(25)}
                        parentWidth={wp(90)}
                        autoPlay={true}
                        dotStyle={Styles.viewDot}
                        resizeMethod={'resize'}
                        resizeMode={'contain'}
                        autoplayInterval={1000}
                    />

                    <View style={Styles.viewSection1}>
                        <View>
                            <Text style={Styles.textBookName}>{BookName}
                            </Text>
                            <Text style={Styles.textBookRs}>{ScreenText.RsSymbol}{BookPrice}</Text>
                        </View>

                        <View style={Styles.viewBookMark}>
                            <TouchableOpacity
                                onPress={(item) => handleOnPress({ item })}
                            >
                                {!itemBookSelected ? <Image source={Images.saveTabGray}
                                    style={Styles.imageSaveBookMark}
                                    resizeMode="contain" /> :
                                    <Image source={Images.saveTabGreen}
                                        style={Styles.imageSaveBookMark}
                                        resizeMode="contain" />
                                }
                            </TouchableOpacity>


                        </View>
                    </View>

                    <Text style={Styles.textBookTitle}>
                        {ScreenText.DescriptionOfProduct}</Text>

                    <Text style={Styles.textBookDescription}>
                        {BookDescription}
                    </Text>
                </View>

            </ScrollView>

            <View style={Styles.viewBookInfo}>
                <View style={CommonStyle.commonContent}>
                    <Text style={Styles.textRsLabel}>{ScreenText.RsSymbol}{BookPrice}</Text>
                </View>

                <View style={CommonStyle.commonContent}>
                    <ButtonComponent
                        marginVertical={hp(0)}
                        heightBtn={hp(7)}
                        widthBtn={wp(50)}
                        isRightArrow={false}
                        onPress={() => Linking.openURL(itemBookLinkURL)}
                        color={Colors.white}
                        title={ScreenText.BuyNow}
                        fontWeight="500"
                        fontSize={wp(4)}
                        fontFamily={Fonts.InterRegular}
                        alignSelf='center'
                        textAlign='center'
                        borderRadius={wp(2)}
                        backgroundColor={Colors.buttonBackgroundColor}
                    />
                </View>

            </View>

        </SafeAreaView >
    );
}

export default DeatilScreen;