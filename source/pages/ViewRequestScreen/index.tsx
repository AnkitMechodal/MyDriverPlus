import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button';
import HeaderComponent from '../../components/Header/index';
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

//ViewRequestScreen

const ViewRequestScreen = ({ route, navigation }) => {

    const [RequestDataREQ, setRequestDataREQ] = useState([]);

    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [defaultRating, setDefaultRating] = useState(0);

    // TODO :
    const [AcceptUI, setAcceptUI] = useState('Accept');
    const [DeclineUI, setDeclineUI] = useState('Accept');
    const [PendingUI, setPendingUI] = useState('Accept');
    const [DefaultUI, setDefaultUI] = useState('Decline');

    let username_;
    let ProfileImage_;
    let averageRating_;

    const [isDriverName, setDriverName] = useState(ScreenText.UserName);


    const starImageFilled =
        Images.fillStarIcon;
    const starImageCorner =
        Images.unfillStarIcon;


    useEffect(() => {
        console.log("route.params.itemRIDEEEEEE===>", route.params.itemRIDE);

        const fetchData = async () => {
            try {
                await axiosPostViewReuestDriverList();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        // Set interval to refresh every 1 seconds
        const intervalId = setInterval(fetchData, 1 * 1000);
        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, []);

    // ViewRequestDetails :

    const axiosPostViewReuestDriverList = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostGetRequestDriverList();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }


    const axiosPostGetRequestDriverList = async () => {
        try {
            // const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            // if (storedLinkedId !== null) {
            // const userId = JSON.parse(storedLinkedId);
            const url = `https://rideshareandcourier.graphiglow.in/api/BiddingRide/bidding`;

            // Prepare data in JSON format
            const data = {
                rideId: route.params.itemRIDE

                // "rideId": "J64PQ4F3QQKK" //test !
                // "rideId": "ZXQ2AI466FJP"
            };

            console.log("MatchingList==>", JSON.stringify(data, null, 2));

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (response.status === 200 &&
                        response?.data?.message === 'Matching records found') {

                        console.log("Matching----==>",
                            JSON.stringify(response?.data?.data, null, 2));

                        // username_ == response?.data?.data?.username;
                        // console.log("username_====>" + username_);

                        // ProfileImage_ = "";
                        // averageRating_ = "";

                        // setDriverName(username_);

                        setRequestDataREQ(response?.data?.data);

                        // Toast.show('Success! Preferred Retrieved Successfully!', Toast.SHORT);
                        // props.navigation.goBack();
                    } else {
                        // Toast.show('Unable To Retrieved!-2', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Toast.show('Unable To Retrieved!-1', Toast.SHORT);
                });
            // } else {
            //     // Handle the case where storedLinkedId is null
            // }
        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    };

    const onPressDecline = async (item) => {

        if (item?.BinddStatus == "Pendding") {
            try {
                const isConnected = await NetworkUtils.isNetworkAvailable()
                if (isConnected) {
                    axiosPostGetRequestDeclineStatus(item);
                } else {
                    Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
                }
            } catch (error) {
                Toast.show("axios error", Toast.SHORT);
            }
        } else {

        }

    }

    const onPressAccept = async (item) => {

        console.log("AcceptStatus====>===>", item?._id);


        if (item?.BinddStatus == "Pendding") {
            // Call AcceptStatus 
            try {
                const isConnected = await NetworkUtils.isNetworkAvailable()
                if (isConnected) {
                    axiosPostGetRequestPendingStatus(item);
                } else {
                    Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
                }
            } catch (error) {
                Toast.show("axios error", Toast.SHORT);
            }
        } else {

        }

        // // Check BidndStatus :
        // if (item?.BinddStatus == "Accept") {
        //     // Call AcceptStatus 
        //     try {
        //         const isConnected = await NetworkUtils.isNetworkAvailable()
        //         if (isConnected) {
        //             axiosPostGetRequestAcceptStatus(item);
        //         } else {
        //             Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
        //         }
        //     } catch (error) {
        //         Toast.show("axios error", Toast.SHORT);
        //     }
        // } else if (item?.BinddStatus == "Pendding") {
        //     console.log("Pending==>", "Pendding");
        //     // Call AcceptStatus 
        //     try {
        //         const isConnected = await NetworkUtils.isNetworkAvailable()
        //         if (isConnected) {
        //             axiosPostGetRequestPendingStatus(item);
        //         } else {
        //             Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
        //         }
        //     } catch (error) {
        //         Toast.show("axios error", Toast.SHORT);
        //     }
        // } else {
        //     // console.log("Decline==>", "Decline");
        //     // // Call AcceptStatus 
        //     // try {
        //     //     const isConnected = await NetworkUtils.isNetworkAvailable()
        //     //     if (isConnected) {
        //     //         axiosPostGetRequestDeclineStatus(item);
        //     //     } else {
        //     //         Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
        //     //     }
        //     // } catch (error) {
        //     //     Toast.show("axios error", Toast.SHORT);
        //     // }
        // }


    }


    const axiosPostGetRequestDeclineStatus = async (item) => {
        try {
            // const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            // if (storedLinkedId !== null) {
            // const userId = JSON.parse(storedLinkedId);
            const url = `https://rideshareandcourier.graphiglow.in/api/BinddingStatus/status`;

            // Prepare data in JSON format // J64PQ4F3QQKK
            const data = {
                // id: item?._id,
                // // id: "65b87cdfff5893ae763e4b8f",
                // BinddStatus: "Accepted" // Accept

                // id: "65b87cdfff5893ae763e4b8f",
                // BinddStatus: "Declined"

                id: item?._id,
                BinddStatus: "Declined" // Accepted

                // id: "65b87ce0ff5893ae763e4b91",
                // BinddStatus: "Accepted" // test!
            };

            console.log("MatchingList==>", JSON.stringify(data, null, 2));

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (response.status === 200 &&
                        response?.data?.message === 'Bidding ride BinddStatus updated successfully') {

                        // Get Status & Set To button:

                        // let BinddStatus = response?.data?.data?.BinddStatus;
                        // setDefaultUI(BinddStatus);


                        // // Check BidndStatus :
                        // if (BinddStatus === "Pending") {
                        //     setPendingUI(BinddStatus);
                        // } else if (BinddStatus === "Accepted") {
                        //     setAcceptUI(BinddStatus);
                        // } else {
                        //     setDeclineUI(BinddStatus);
                        // }

                        // console.log("BinddStatus====>", BinddStatus);
                        // console.log("BinddStatus====>", BinddStatus);

                        // Toast.show('Success! Bidding Request Decline!', Toast.SHORT);
                        // navigation.goBack();
                        // setAcceptUI("Accepted");

                    } else {
                        // Toast.show('Unable To Retrieved!-2', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Toast.show('Unable To Retrieved!-1', Toast.SHORT);
                });
            // } else {
            //     // Handle the case where storedLinkedId is null
            // }
        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    }

    const axiosPostGetRequestAcceptStatus = async (item) => {
        try {
            // const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            // if (storedLinkedId !== null) {
            // const userId = JSON.parse(storedLinkedId);
            const url = `https://rideshareandcourier.graphiglow.in/api/BinddingStatus/status`;

            // Prepare data in JSON format // J64PQ4F3QQKK
            const data = {

                id: item?._id,
                BinddStatus: "Accepted" // test!

                // id: "65b87cdfff5893ae763e4b8f",
                // BinddStatus: "Accepted" // test!
            };

            console.log("MatchingList==>", JSON.stringify(data, null, 2));

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (response.status === 200 &&
                        response?.data?.message === 'Bidding ride BinddStatus updated successfully') {

                        // Get Status & Set To button:

                        let BinddStatus = response?.data?.data?.BinddStatus;
                        setAcceptUI(BinddStatus);


                        // // Check BidndStatus :
                        // if (BinddStatus === "Pending") {
                        //     setPendingUI(BinddStatus);
                        // } else if (BinddStatus === "Accepted") {
                        //     setAcceptUI(BinddStatus);
                        // } else {
                        //     setDeclineUI(BinddStatus);
                        // }

                        // console.log("BinddStatus====>", BinddStatus);
                        // console.log("BinddStatus====>", BinddStatus);

                        // Toast.show('Success! Bidding Request Accepted!', Toast.SHORT);
                        // navigation.goBack();
                        // setAcceptUI("Accepted");

                    } else {
                        // Toast.show('Unable To Retrieved!-2', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Toast.show('Unable To Retrieved!-1', Toast.SHORT);
                });
            // } else {
            //     // Handle the case where storedLinkedId is null
            // }
        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    };

    const axiosPostGetRequestPendingStatus = async (item) => {
        try {
            // const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            // if (storedLinkedId !== null) {
            // const userId = JSON.parse(storedLinkedId);
            const url = `https://rideshareandcourier.graphiglow.in/api/BinddingStatus/status`;

            // Prepare data in JSON format // J64PQ4F3QQKK
            const data = {

                id: item?._id,
                BinddStatus: "Accepted" // Accepted

                // id: "65b87ce0ff5893ae763e4b91",
                // BinddStatus: "Accepted" // test!
            };

            console.log("MatchingList==>", JSON.stringify(data, null, 2));

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (response.status === 200 &&
                        response?.data?.message === 'Bidding ride BinddStatus updated successfully') {

                        // Get Status & Set To button:

                        // let BinddStatus = response?.data?.data?.BinddStatus;
                        // setPendingUI(BinddStatus);


                        // // Check BidndStatus :
                        // if (BinddStatus === "Pending") {
                        //     setPendingUI(BinddStatus);
                        // } else if (BinddStatus === "Accepted") {
                        //     setAcceptUI(BinddStatus);
                        // } else {
                        //     setDeclineUI(BinddStatus);
                        // }

                        // console.log("BinddStatus====>", BinddStatus);
                        // console.log("BinddStatus====>", BinddStatus);

                        // Toast.show('Success! Bidding Request Pending!', Toast.SHORT);

                        // navigation.goBack();
                        // setAcceptUI("Accepted");

                    } else {
                        // Toast.show('Unable To Retrieved!-2', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Toast.show('Unable To Retrieved!-1', Toast.SHORT);
                });
            // } else {
            //     // Handle the case where storedLinkedId is null
            // }
        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    }

    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <ScrollView style={Styles.container}>
                <View style={Styles.container}>
                    <View>
                        <HeaderComponent
                            margin={wp(3)}
                            backgroundColorOpacity={Colors.circleGray}
                            borderRadiusOpacity={wp(10)}
                            transform={[{ rotate: '180deg' }]}
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
                            title={"View Request"}
                            fontSize={wp(4)}
                            onPress={() => navigation.goBack()}
                        />
                    </View>

                    {/* <View>
                        <DriverRequestListCustom
                            onPressAccept={() => props.navigation.navigate("ViewRequestDetails")}
                            data={RequestData} />
                    </View> */}

                    <View>
                        <FlatList
                            data={RequestDataREQ}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={Styles.viewContentContainerStyle}
                            keyExtractor={(item: any) => item._id.toString()}

                            renderItem={({ item, index }) => {
                                return (

                                    <View>
                                        <TouchableOpacity onPress={() =>
                                            navigation.navigate("ViewRequestDetails", {
                                                itemHours: item?.hourse,
                                                itemAmount: item?.Amount,
                                                itemDriverID: item?.driverId,
                                                itemRideId: item?.rideId,
                                                itemBinddStatus: item?.BinddStatus,
                                                item_ID: item?._id
                                            })
                                        }>

                                            <View style={Styles.requestConatiner}>
                                                <View style={CommonStyle.commonRow}>

                                                    <View style={CommonStyle.justifyContent}>
                                                        <Image
                                                            style={Styles.imageUser}
                                                            resizeMode="contain"
                                                            source={{ uri: item?.ProfileImage }} />
                                                    </View>

                                                    <View>
                                                        <TextComponent
                                                            color={Colors.white}
                                                            title={item?.username}
                                                            marginHorizontal={wp(5)}
                                                            textDecorationLine={'none'}
                                                            fontWeight="700"
                                                            marginVertical={wp(2)}
                                                            fontSize={wp(3.5)}
                                                            fontFamily={Fonts.PoppinsBold}
                                                            textAlign='left'
                                                        />
                                                        <View style={CommonStyle.commonRow}>
                                                            <View>
                                                                <TextComponent
                                                                    color={Colors.gray}
                                                                    title={"You Rated"}
                                                                    marginHorizontal={wp(5)}
                                                                    textDecorationLine={'none'}
                                                                    marginVertical={wp(2)}
                                                                    fontWeight="400"
                                                                    fontSize={wp(3.5)}
                                                                    fontFamily={Fonts.PoppinsRegular}
                                                                    textAlign='left'
                                                                />
                                                            </View>

                                                            <View>

                                                                <View style={Styles.customRatingBarStyle}>
                                                                    {maxRating.map((rating, key) => {
                                                                        return (
                                                                            <View style={CommonStyle.commonRow}>
                                                                                <TouchableOpacity
                                                                                    activeOpacity={0.2}
                                                                                    key={item}
                                                                                //onPress={() => setDefaultRating(item)}
                                                                                >

                                                                                    {/* // onPress={() => handleRatingChange(item, rating)}
                                                                                // Pass the item and rating to handleRatingChange */}

                                                                                    {/* > */}

                                                                                    <Image
                                                                                        style={Styles.starImageStyle}
                                                                                        source={
                                                                                            rating <= item?.averageRating
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

                                                </View>

                                                <View style={Styles.viewGrayLineHorizontal}>
                                                </View>

                                                <View style={Styles.rowContent}>

                                                    <View>
                                                        <View style={CommonStyle.commonRow}>
                                                            <TextComponent
                                                                color={Colors.gray}
                                                                title={ScreenText.Amount}
                                                                marginHorizontal={wp(2)}
                                                                textDecorationLine={'none'}
                                                                fontWeight="400"
                                                                fontSize={wp(3.5)}
                                                                fontFamily={Fonts.PoppinsRegular}
                                                                textAlign='left'
                                                            />
                                                            <TextComponent
                                                                color={Colors.discount}
                                                                title={item?.Amount}
                                                                textDecorationLine={'none'}
                                                                fontWeight="400"
                                                                fontSize={wp(3.5)}
                                                                fontFamily={Fonts.PoppinsSemiBold}
                                                                textAlign='right'
                                                            />
                                                        </View>



                                                    </View>

                                                    <View>
                                                        <View style={CommonStyle.commonRow}>
                                                            <TextComponent
                                                                color={Colors.gray}
                                                                title={ScreenText.HoursDot}
                                                                textDecorationLine={'none'}
                                                                fontWeight="400"
                                                                fontSize={wp(3.5)}
                                                                fontFamily={Fonts.PoppinsRegular}
                                                                textAlign='left'
                                                            />
                                                            <TextComponent
                                                                color={Colors.discount}
                                                                title={item?.hourse + " min"}
                                                                textDecorationLine={'none'}
                                                                marginHorizontal={wp(3.5)}
                                                                fontWeight="400"
                                                                fontSize={wp(3.5)}
                                                                fontFamily={Fonts.PoppinsSemiBold}
                                                                textAlign='right'
                                                            />
                                                        </View>


                                                    </View>

                                                </View>

                                                <View style={Styles.rowCenter}>

                                                    {item?.BinddStatus == "Accepted" ?
                                                        <TextComponent
                                                            color={Colors.blue}
                                                            title={"Accepted"}
                                                            textDecorationLine={'none'}
                                                            marginHorizontal={wp(2)}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            marginVertical={wp(2)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            textAlign='left'
                                                        />
                                                        :
                                                        <>
                                                        </>
                                                    }


                                                    {item?.BinddStatus == "Decline" ?
                                                        <TextComponent
                                                            color={Colors.orange}
                                                            title={"Declined"}
                                                            textDecorationLine={'none'}
                                                            marginHorizontal={wp(2)}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            marginVertical={wp(2)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            textAlign='left'
                                                        />
                                                        :
                                                        <>
                                                        </>
                                                    }

                                                    {item?.BinddStatus == "Pendding" ?
                                                        <View>
                                                            <ButtonComponent
                                                                isVisibleMobile={false}
                                                                isVisibleFaceBook={false}
                                                                marginVertical={hp(1)}
                                                                heightBtn={hp(6)}
                                                                widthBtn={wp(40)}
                                                                isRightArrow={false}
                                                                color={Colors.white}
                                                                title={item?.BinddStatus == "Accept" ? AcceptUI :
                                                                    item?.BinddStatus == "Pendding" ? PendingUI :
                                                                        item?.BinddStatus == "Decline" ? DeclineUI : "Accept"}
                                                                marginHorizontal={wp(2)}
                                                                fontWeight="500"
                                                                fontSize={wp(4)}
                                                                onPress={() => onPressAccept(item)}
                                                                fontFamily={Fonts.PoppinsRegular}
                                                                alignSelf='center'
                                                                textAlign='center'
                                                                borderRadius={wp(2)}
                                                                backgroundColor={Colors.blue}
                                                            />
                                                        </View>
                                                        :
                                                        <>
                                                        </>
                                                    }




                                                    {item?.BinddStatus == "Accepted" ?
                                                        <>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                    }

                                                    {/* {item?.BinddStatus == "Declined" ?
                                                        <>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                    } */}

                                                    {item?.BinddStatus == "Declined" ?
                                                        <TextComponent
                                                            color={Colors.orange}
                                                            title={"Declined"}
                                                            textDecorationLine={'none'}
                                                            marginHorizontal={wp(2)}
                                                            fontWeight="400"
                                                            fontSize={wp(3.5)}
                                                            marginVertical={wp(2)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            textAlign='left'
                                                        />
                                                        :
                                                        <>
                                                        </>
                                                    }


                                                    {item?.BinddStatus == "Pendding" ?
                                                        <View>
                                                            <ButtonComponent
                                                                isVisibleMobile={false}
                                                                isVisibleFaceBook={false}
                                                                marginVertical={hp(1)}
                                                                heightBtn={hp(6)}
                                                                widthBtn={wp(40)}
                                                                isRightArrow={false}
                                                                color={Colors.white}
                                                                // onPress={() => navigation.goBack()}
                                                                onPress={() => onPressDecline(item)}
                                                                title={DefaultUI}
                                                                marginHorizontal={wp(2)}
                                                                fontWeight="500"
                                                                fontSize={wp(4)}
                                                                fontFamily={Fonts.PoppinsRegular}
                                                                alignSelf='center'
                                                                textAlign='center'
                                                                borderRadius={wp(2)}
                                                                backgroundColor={Colors.orange}
                                                            />
                                                        </View>
                                                        :
                                                        <>
                                                        </>
                                                    }

                                                    {/* <View>
                                                        <ButtonComponent
                                                            isVisibleMobile={false}
                                                            isVisibleFaceBook={false}
                                                            marginVertical={hp(1)}
                                                            heightBtn={hp(6)}
                                                            widthBtn={wp(44)}
                                                            isRightArrow={false}
                                                            color={Colors.white}
                                                            onPress={() => navigation.goBack()}
                                                            title={item?.BinddStatus == "Accept" ? AcceptUI :
                                                                item?.BinddStatus == "Pending" ? PendingUI :
                                                                    item?.BinddStatus == "Decline" ? DeclineUI : "Accepted"}
                                                            marginHorizontal={wp(2)}
                                                            fontWeight="500"
                                                            fontSize={wp(4)}
                                                            fontFamily={Fonts.PoppinsRegular}
                                                            alignSelf='center'
                                                            textAlign='center'
                                                            borderRadius={wp(2)}
                                                            backgroundColor={Colors.orange}
                                                        />
                                                    </View> */}

                                                </View>

                                            </View>

                                        </TouchableOpacity>
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

                </View>
            </ScrollView>

        </SafeAreaView>
    )

}

export default ViewRequestScreen;