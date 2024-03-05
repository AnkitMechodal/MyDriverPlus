import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Linking, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button';
import HeaderComponent from '../../components/Header/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text';
import { Colors, Fonts, Images } from '../../themes/index';
import { API, ScreenText } from '../../utils';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from '../../utils/commonfunction';
import Styles from './style';



type Props = {
    navigation: any
}

const ViewRequestDetailsScreen = ({ route, navigation }) => {

    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

    const [defaultRating, setDefaultRating] = useState(0);

    const starImageFilled1 =
        Images.fillstarIcon; // fillStarIcon
    const starImageCorner1 =
        Images.unfillstarIcon; // unfillStarIcon

    const starImageFilled =
        Images.fillStarIcon;
    const starImageCorner =
        Images.unfillStarIcon;

    let DriverBookingName;
    let DriverBookingImage1;
    let DriverBookingImage2;
    let DriverBookingImage3;
    let DriverBookingImage4;
    let DriverVehicleNumber;
    let DriverVehicleType;
    let DriverVehicleName;
    let DriverProfileImage;
    let DriverVehicleDecription;
    let DriverVehiclePhone;
    let DriverVehicleColor;
    let DriverBooking_ID;
    let DriverNumberOfSeat;


    let averageRating;
    let numberOfRatings;


    let avg_username;
    let no_rate;


    // Driver Info :
    const [isDriverName, setDriverName] = useState(ScreenText.UserName);
    const [isDriverPlateNumber, setDriverPlateNumber] = useState("GJ 06 MA 2500");
    const [isDriverPlateName, setDriverPlateName] = useState("Crash Test Dummy");
    const [isDriverVehicleType, setDriverVehicleType] = useState("Car");

    const [isDriverVehicleColor, setDriverVehicleColor] = useState("yellow");

    const [isDriverVehicleDesc, setDriverVehicleDesc] = useState(ScreenText.Loreum);
    const [isPhoneNumber, setPhoneNumber] = useState("");

    const [isDriverVIN, setDriverVIN] = useState("583245");

    const [isRated, setRated] = useState("0");

    const [isSeats, setSeats] = useState("0");


    // TODO :
    const [AcceptUI, setAcceptUI] = useState('Accept');
    const [DeclineUI, setDeclineUI] = useState('Accept');
    const [PendingUI, setPendingUI] = useState('Accept');
    const [DefaultUI, setDefaultUI] = useState('Decline');


    // 4 Photos
    const [isURL1, setURL1] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL2, setURL2] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL3, setURL3] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL4, setURL4] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");

    // ProfileImage
    const [isURL5, setURL5] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");


    // ADDED
    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log("itemMapId==>", route.params.itemHours);
                console.log("itemMapPickStation**==>", route.params.itemAmount);
                console.log("itemMapDropStation**==>", route.params.itemDriverID);
                console.log("itemMapKmStation**", route?.params?.itemRideId);
                console.log("itemMapKmStation**", route?.params?.itemBinddStatus);

                console.log("itemMapKmStation99999**", route?.params?.item_ID);

                // Get User In User Info
                await axiosPostDriverInfoRequest();
                await axiosGetRideRattingRequest();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Set interval to refresh every 5 seconds
        const intervalId = setInterval(fetchData, 5 * 1000);

        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, [
        route.params?.itemHours,
        route.params?.itemAmount,
        route?.params?.itemDriverID,
        route?.params?.itemRideId,
    ]);


    const axiosGetRideRattingRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosCheckUserGetRideRattingRequest();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosCheckUserGetRideRattingRequest = async () => {
        try {
            const storedLinkedId = await AsyncStorage.getItem('store_star_id');

            if (storedLinkedId !== null) {
                const userId = JSON.parse(storedLinkedId);
                //const url = `https://rideshareandcourier.graphiglow.in/api/rattingCalculateDriver/calculateRating/${userId}`;
                const url = `${API.BASE_URL}/rattingCalculateDriver/calculateRating/${userId}`;

                console.log("URL_RATTING==>", JSON.stringify(url, null, 2));

                await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 200
                            && response?.data?.message === 'Ratings calculated successfully') {

                            averageRating = response?.data?.ratings?.averageRating;
                            no_rate = response?.data?.ratings?.numberOfRatings;

                            setRated(no_rate);
                            setDefaultRating(averageRating);

                            // Toast.show('Driver Ratings Get Success!', Toast.SHORT);

                        } else {
                            // Toast.show('Enabel To Get Ratings!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Handle errors
                        // Toast.show('Enabel To Get Ratings!', Toast.SHORT);
                    });

            } else {

            }
        } catch (error) {

        }
    }


    const axiosPostDriverInfoRequest = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosUserPostDriverInfoRequest();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosUserPostDriverInfoRequest = async () => {

        // const url = 'https://rideshareandcourier.graphiglow.in/api/driverInfo/driverInfo';
        const url = `${API.BASE_URL}/driverInfo/driverInfo`;

        // GET DRIVER ID 

        // Prepare data in JSON format
        const data = {
            id: route.params.itemDriverID // Booking - 
        };

        console.log("DriverInfoData==>", JSON.stringify(data, null, 2));

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    &&
                    response?.data?.message === 'User Information') {
                    // Handle API response here

                    console.log("DriverInfoData==>",
                        JSON.stringify(response?.data?.matchingUsers, null, 2));

                    DriverBooking_ID = response?.data?.matchingUsers[0]?._id;

                    DriverBookingName = response?.data?.matchingUsers[0]?.username;
                    DriverBookingImage1 = response?.data?.matchingUsers[0]?.vehicle_pictures1_Url;
                    DriverBookingImage2 = response?.data?.matchingUsers[0]?.vehicle_pictures2_Url;
                    DriverBookingImage3 = response?.data?.matchingUsers[0]?.vehicle_pictures3_Url;
                    DriverBookingImage4 = response?.data?.matchingUsers[0]?.vehicle_pictures4_Url;
                    DriverVehicleNumber = response?.data?.matchingUsers[0]?.Plate_number;
                    DriverVehicleType = response?.data?.matchingUsers[0]?.Vehicle_type;
                    DriverVehicleName = response?.data?.matchingUsers[0]?.Company_name;
                    DriverProfileImage = response?.data?.matchingUsers[0]?.ProfileImage;
                    DriverVehicleDecription = response?.data?.matchingUsers[0]?.Vehicle_Details;
                    DriverVehicleColor = response?.data?.matchingUsers[0]?.Vehicle_Color;
                    DriverVehiclePhone = response?.data?.matchingUsers[0]?.mobilenumber;

                    DriverNumberOfSeat = response?.data?.matchingUsers[0]?.NumberOfSeat;
                    setSeats(DriverNumberOfSeat);

                    // // DriverVehicleDecription = response?.data?.matchingUsers[0]?.Vehicle_Details;
                    // DriverVehiclePhone = response?.data?.matchingUsers[0]?.mobilenumber;

                    setDriverName(DriverBookingName);
                    setDriverPlateName(DriverVehicleName);
                    setDriverVehicleType(DriverVehicleType);
                    setDriverVehicleDesc(DriverVehicleDecription);
                    setPhoneNumber(DriverVehiclePhone);
                    setDriverPlateNumber(DriverVehicleNumber);
                    setDriverVehicleColor(DriverVehicleColor);

                    // Store for star : todo
                    StoredDriverID(DriverBooking_ID);

                    setURL1(DriverBookingImage1);
                    setURL2(DriverBookingImage2);
                    setURL3(DriverBookingImage3);
                    setURL4(DriverBookingImage4);
                    setURL5(DriverProfileImage);

                    // setPhoneNumber(DriverVehiclePhone);


                    // setDRIVERPROFILE(DriverProfileImage);

                    // Toast.show('Driver Details Retrieved Successfully!', Toast.SHORT);

                } else {
                    // Toast.show('Enabel To Retrieved Details!', Toast.SHORT);
                    //  Welcome! Signed in successfully.
                }
            })
            .catch(error => {
                // Handle errors
                // Toast.show('Enabel To Retrieved Details!', Toast.SHORT);
            });

    };

    const StoredDriverID = async (DriverBooking_ID: any) => {
        try {
            await AsyncStorage.setItem('store_star_id', JSON.stringify(DriverBooking_ID));
            console.log('store_star_id===>', JSON.parse(DriverBooking_ID));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_star_id :', error);
        }
    }

    const onPressCallUser = () => {
        const phoneNumberWithPrefix = `tel:${isPhoneNumber}`;
        Linking.openURL(phoneNumberWithPrefix);
    }

    const onPressDeclineed = async () => {
        if (route?.params?.itemBinddStatus == "Pendding") {
            try {
                const isConnected = await NetworkUtils.isNetworkAvailable()
                if (isConnected) {
                    axiosPostGetRequestDeclinedStatus();
                } else {
                    Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
                }
            } catch (error) {
                Toast.show("axios error", Toast.SHORT);
            }
        } else {

        }
    }

    const axiosPostGetRequestDeclinedStatus = async () => {
        try {
            // const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            // if (storedLinkedId !== null) {
            // const userId = JSON.parse(storedLinkedId);
            // const url = `https://rideshareandcourier.graphiglow.in/api/BinddingStatus/status`;
            const url = `${API.BASE_URL}/BinddingStatus/status`;

            // Prepare data in JSON format // J64PQ4F3QQKK
            const data = {

                id: route?.params?.item_ID,
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

                        Toast.show('Success! Bidding Request Declined!', Toast.SHORT);

                        // itemRIDEID_SENT
                        navigation.navigate("BookingBiddingRequest", {
                            itemRIDEID_SENT: route?.params?.itemRideId,
                            itemRIDER_ID_SENT: route?.params?.item_ID
                        });

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


    const onPressAccepted = async () => {
        if (route?.params?.itemBinddStatus == "Pendding") {
            try {
                const isConnected = await NetworkUtils.isNetworkAvailable()
                if (isConnected) {
                    axiosPostGetRequestPendingStatus();
                } else {
                    Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
                }
            } catch (error) {
                Toast.show("axios error", Toast.SHORT);
            }
        } else {

        }
    }

    const axiosPostGetRequestPendingStatus = async () => {
        try {
            // const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            // if (storedLinkedId !== null) {
            // const userId = JSON.parse(storedLinkedId);
            // const url = `https://rideshareandcourier.graphiglow.in/api/BinddingStatus/status`;
            const url = `${API.BASE_URL}/BinddingStatus/status`;

            // Prepare data in JSON format // J64PQ4F3QQKK
            const data = {

                id: route?.params?.item_ID,
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

                        Toast.show('Success! Bidding Request Accepted!', Toast.SHORT);
                        // itemRIDEID_SENT
                        navigation.navigate("BookingBiddingRequest", {
                            itemRIDEID_SENT: route?.params?.itemRideId,
                            itemRIDER_ID_SENT: route?.params?.item_ID
                        });

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
            <ScrollView style={Styles.container}
                showsVerticalScrollIndicator={false}>
                <View style={Styles.container}>

                    <View style={Styles.viewHeader}>
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
                            title={"Driver Details"}
                            fontSize={wp(4)}
                            onPress={() => navigation.goBack()}
                        />
                    </View>

                    <View>
                        <View
                            style={Styles.bottamClickContain}>

                            <View style={CommonStyle.justifyContent}>
                                <Image
                                    style={Styles.imageStop}
                                    resizeMode="contain"
                                    source={{ uri: isURL5 }} />
                            </View>

                            <View style={{
                                flex: 1
                            }}>
                                <TextComponent
                                    color={Colors.white}
                                    title={isDriverName}
                                    textDecorationLine={'none'}
                                    fontWeight="500"
                                    fontSize={wp(3.5)}
                                    marginVertical={wp(3)}
                                    fontFamily={Fonts.PoppinsSemiBold}
                                    textAlign='left'
                                />

                                <View>

                                    <View style={CommonStyle.justifyContent}>
                                        <TextComponent
                                            color={Colors.gray}
                                            title={ScreenText.TopRated2K + " (" + isRated + ")"}
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View>

                                    <View>
                                        <View style={Styles.customRatingBarStyle}>
                                            {maxRating.map((item, key) => {
                                                return (
                                                    <View style={CommonStyle.commonRow}>
                                                        <TouchableOpacity
                                                            activeOpacity={0.7}
                                                            disabled={true}
                                                            key={item}
                                                            onPress={() => setDefaultRating(item)}>
                                                            <Image
                                                                style={Styles.starImageStyle1}
                                                                source={
                                                                    item <= defaultRating
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

                            <View style={{
                                // flex: 1
                            }}>
                                <TouchableOpacity onPress={onPressCallUser}>
                                    <Image
                                        style={Styles.imageCall}
                                        resizeMode="contain"
                                        source={Images.callIcon} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                    <View>
                        <TextComponent
                            color={Colors.white}
                            title={ScreenText.VehiclePhotos}
                            textDecorationLine={'none'}
                            fontWeight="500"
                            fontSize={wp(3.5)}
                            marginHorizontal={wp(5)}
                            marginVertical={wp(3)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                        />
                    </View>

                    {/* <View>
                        <VehiclePhotosListDetails
                            data={CarData} />
                    </View> */}

                    <View style={{ flexDirection: 'row' }}>
                        <ScrollView horizontal
                            showsHorizontalScrollIndicator={false}>
                            <View>
                                <Image
                                    style={Styles.carImageIcon}
                                    resizeMode="cover"
                                    source={{ uri: isURL1 }} />
                            </View>
                            <View>
                                <Image
                                    style={Styles.carImageIcon}
                                    resizeMode="cover"
                                    source={{ uri: isURL2 }} />
                            </View>
                            <View>
                                <Image
                                    style={Styles.carImageIcon}
                                    resizeMode="cover"
                                    source={{ uri: isURL3 }} />
                            </View>
                            <View>
                                <Image
                                    style={Styles.carImageIcon}
                                    resizeMode="cover"
                                    source={{ uri: isURL4 }} />
                            </View>
                        </ScrollView>

                    </View>


                    <View style={Styles.viewGrayLineHorizontal}>
                    </View>

                    <View>
                        <TextComponent
                            color={Colors.white}
                            title={ScreenText.Details}
                            textDecorationLine={'none'}
                            fontWeight="500"
                            fontSize={wp(3.5)}
                            marginHorizontal={wp(5)}
                            fontFamily={Fonts.PoppinsSemiBold}
                            textAlign='left'
                        />
                    </View>

                    <View>

                        <View style={Styles.viewSeprateLine3}>
                            <TextComponent
                                color={Colors.white}
                                title={"Vehicle Name"}
                                marginVertical={wp(1)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.grayFull}
                                title={isDriverPlateName}
                                marginVertical={wp(1)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <View style={Styles.viewSeprateLine3}>
                            <TextComponent
                                color={Colors.white}
                                title={"Vehicle Color"}
                                textDecorationLine={'none'}
                                marginVertical={wp(1)}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.grayFull}
                                title={isDriverVehicleColor}
                                marginVertical={wp(1)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <View style={Styles.viewSeprateLine3}>
                            <TextComponent
                                color={Colors.white}
                                title={"Vehicle Type"}
                                marginVertical={wp(1)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.grayFull}
                                title={"Car"}
                                marginVertical={wp(1)}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <View style={Styles.viewSeprateLine3}>
                            <TextComponent
                                color={Colors.white}
                                title={"Vehicle No."}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.grayFull}
                                title={isDriverPlateNumber} // qqq
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                        <View style={Styles.viewSeprateLine3}>
                            <TextComponent
                                color={Colors.white}
                                title={"Seats"}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.grayFull}
                                title={isSeats}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                    </View>

                    <View style={Styles.viewLoreumText}>
                        <TextComponent
                            color={Colors.white}
                            title={isDriverVehicleDesc}
                            textDecorationLine={'none'}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }}>

                        <View style={CommonStyle.commonRow}>
                            <TextComponent
                                color={Colors.gray}
                                title={ScreenText.Amount}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />

                            <TextComponent
                                color={Colors.discount}
                                title={route?.params?.itemAmount}
                                textDecorationLine={'none'}
                                marginLeft={wp(2)}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

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
                                title={route?.params?.itemHours}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                marginLeft={wp(2)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                    </View>



                    {route?.params?.itemBinddStatus == "Declined" ?
                        <TextComponent
                            color={Colors.orange}
                            title={"Declined"}
                            textDecorationLine={'none'}
                            marginHorizontal={wp(2)}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            marginVertical={wp(2)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='center'
                        />

                        : <></>}

                    {route?.params?.itemBinddStatus == "Accepted" ?
                        <TextComponent
                            color={Colors.blue}
                            title={"Accepted"}
                            textDecorationLine={'none'}
                            marginHorizontal={wp(2)}
                            fontWeight="400"
                            fontSize={wp(3.5)}
                            marginVertical={wp(2)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='center'
                        />

                        : <></>}

                    {route?.params?.itemBinddStatus == "Pendding" ?
                        <View style={CommonStyle.commonJustifyContent}>
                            <ButtonComponent
                                isVisibleMobile={false}
                                isVisibleFaceBook={false}
                                marginVertical={hp(2)}
                                heightBtn={hp(6)}
                                widthBtn={wp(40)}
                                isRightArrow={false}
                                color={Colors.white}
                                title={route?.params?.itemBinddStatus == "Accept" ? AcceptUI :
                                    route?.params?.itemBinddStatus == "Pendding" ? PendingUI :
                                        route?.params?.itemBinddStatus == "Decline" ? DeclineUI : "Accept"}
                                marginHorizontal={wp(2)}
                                fontWeight="500"
                                fontSize={wp(4)}
                                onPress={onPressAccepted}
                                fontFamily={Fonts.PoppinsRegular}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                backgroundColor={Colors.blue}
                            />

                            <ButtonComponent
                                isVisibleMobile={false}
                                isVisibleFaceBook={false}
                                marginVertical={hp(2)}
                                heightBtn={hp(6)}
                                widthBtn={wp(40)}
                                isRightArrow={false}
                                color={Colors.white}
                                title={ScreenText.Decline}
                                marginHorizontal={wp(2)}
                                fontWeight="500"
                                fontSize={wp(4)}
                                // onPress={() => Alert.alert("Decline")}
                                onPress={onPressDeclineed}
                                fontFamily={Fonts.PoppinsRegular}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                backgroundColor={Colors.orange}
                            />
                        </View>
                        : <></>
                    }

                </View>

            </ScrollView>

        </SafeAreaView >
    )

}

export default ViewRequestDetailsScreen;