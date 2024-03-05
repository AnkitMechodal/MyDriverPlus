import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import FAQListComponent from '../../components/FAQList/index';
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import { Colors, Fonts, Images } from '../../themes/index';
import { API } from '../../utils';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from '../../utils/commonfunction';
import Styles from './style';


type Props = {
    navigation: any
}

const FAQScreen = (props: Props) => {
    const navigation = useNavigation();

    const [FAQ, setFAQ] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const isConnected = await NetworkUtils.isNetworkAvailable();
                if (isConnected) {
                    axiosPostRequestFAQ();
                } else {
                    Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
                }
            } catch (error) {
                Toast.show("axios error", Toast.SHORT);
            }
        };

        fetchData();

        // Clear the interval when the component unmounts
        return () => { };
    }, []);



    const axiosPostRequestFAQ = async () => {
        const url = `${API.BASE_URL}/admin/show-faq`;

        const data = {
            type: "User"
        };

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {

                    console.log("ALL_DATA===>", JSON.stringify(response?.data?.data, null, 2));
                    setFAQ(response?.data?.data);

                } else {
                    // Toast.show('User Information Credentials Invalid', Toast.SHORT);
                }

            })
            .catch(error => {
                // Handle errors
                // Toast.show('User Information Credentials Invalid!', Toast.SHORT);
            });
    }

    const toggleAnswer = (index) => {
        const newFAQ = FAQ.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    selected: !item.selected
                };
            }
            return item;
        });
        setFAQ(newFAQ);
    }

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <ScrollView style={CommonStyle.commonFlex}>
                <View style={Styles.container}>
                    <View style={Styles.viewHeader}>
                        <HeaderComponent
                            transform={[{ rotate: '180deg' }]}
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
                            title={"FAQ"}
                            fontSize={wp(4)}
                            onPress={() => navigation.goBack()}
                        />
                    </View>

                    {/* <View style={Styles.viewQuestion}>
                        <TextComponent
                            color={Colors.white}
                            title={ScreenText.LoremIpsumissimplydummytext}
                            textDecorationLine={'none'}
                            fontWeight="600"
                            fontSize={wp(4)}
                            fontFamily={Fonts.PoppinsSemiBold}
                            marginHorizontal={wp(5)}
                            textAlign='left'
                            marginVertical={hp(2)}
                        />

                    </View>

                    <View style={Styles.viewDesc}>
                        <Text style={Styles.viewDescrition}>{ScreenText.Loreum}</Text>
                    </View> - FAQ */}

                    <FAQListComponent
                        changeLayout={(index) => toggleAnswer(index)}
                        data={FAQ}
                    />

                </View>
            </ScrollView>


        </SafeAreaView>
    );
};

export default FAQScreen;
