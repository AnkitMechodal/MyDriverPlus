import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Image, Linking, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import HeaderComponent from '../../../components/Header/index';
import StatusBarComponent from '../../../components/StatusBar';
import TextComponent from '../../../components/Text';
import { Colors, Fonts, Images } from '../../../themes/index';
import { ScreenText } from '../../../utils';
import CommonStyle from '../../../utils/commonStyle';
import NetworkUtils from '../../../utils/commonfunction';
import Styles from './style';

type Props = {
    navigation: any
}

const PreferredDriverDrawer = ({ route, navigation }) => {

    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [defaultRating, setDefaultRating] = useState(0);


    const [isSeats, setSeats] = useState("0");

    const starImageFilled1 =
        Images.fillstarIcon; // fillStarIcon
    const starImageCorner1 =
        Images.unfillstarIcon; // unfillStarIcon

    const starImageFilled =
        Images.fillStarIcon;
    const starImageCorner =
        Images.unfillStarIcon;


    // Driver Get Booking 
    let DriverBookingName;

    let DriverBookingImage1;
    let DriverBookingImage2;
    let DriverBookingImage3;
    let DriverBookingImage4;

    let DriverVehicleNumber;
    let DriverVehicleType;
    let DriverVehicleName;
    let DriverModalName;

    let DriverVehicleDecription;

    let DriverVehiclePhone;

    let averageRating;
    let numberOfRatings;


    let avg_username;
    let no_rate;


    let DriverProfileImage;

    let DriverVehicleColor;
    let DriverUserVIN;
    let DriverNumberOfSeat;


    let Driver_id;


    const [isURL1, setURL1] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL2, setURL2] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL3, setURL3] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");
    const [isURL4, setURL4] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");


    // ProfileImage
    const [isURL5, setURL5] = useState("https://fastly.picsum.photos/id/944/536/354.jpg?hmac=ydpVTMyvaJudI2SZOegqdZoCBv0MzjMiFqR1Bc6ZXIo");


    const [isDriverName, setDriverName] = useState(ScreenText.UserName);
    const [isDriverPlateNumber, setDriverPlateNumber] = useState("GJ 06 MA 2500");
    const [isDriverPlateName, setDriverPlateName] = useState("Crash Test Dummy");
    const [isDriverVehicleType, setDriverVehicleType] = useState("Car");

    const [isDriverVehicleColor, setDriverVehicleColor] = useState("yellow");

    const [isDriverVehicleDesc, setDriverVehicleDesc] = useState(ScreenText.Loreum);
    const [isPhoneNumber, setPhoneNumber] = useState("");

    const [isDriverVIN, setDriverVIN] = useState("583245");

    const [isRated, setRated] = useState("0");


    let USER_RIDEID;

    useEffect(() => {

        const fetchData = async () => {
            try {
                // Get User In User Info

                console.error('DRAWER_ID===>', route?.params?.itemRider_ID_);

                // axios
                await axiosPostRideDetailsRequest();

                // axios
                await axiosPostDriverInfoRequest();
                await axiosGetRideRattingRequest();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // // Set interval to refresh every 10 seconds
        // const intervalId = setInterval(fetchData, 10 * 1000);

        // // Clean up the interval when the component is unmounted


        // return () => clearInterval(intervalId);
    }, []);


    const axiosPostRideDetailsRequest = async () => {
        const url = 'https://rideshareandcourier.graphiglow.in/api/rideDetail/rideDetail';

        // Prepare data in JSON format
        const data = {
            id: route?.params?.itemRider_ID_
            // id: "65a61aa38217c550d01b4f27"
        };

        console.log("RideDetails===>", data);

        await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200
                    && response?.data?.message === 'Ride Details') {
                    // Handle API response here
                    Toast.show('Ride Details Get Successfully!', Toast.SHORT);

                    console.log("**RideDetailsAllData16**===>", JSON.stringify(response?.data, null, 2));

                    USER_RIDEID = response?.data?.matchingVehicle?.DriverID;
                    console.log("USER_RIDEID===>", USER_RIDEID);


                    // stored id : todo
                    StoredRideID(USER_RIDEID);

                    console.log("RIDE_16===>",
                        JSON.stringify(response?.data?.matchingVehicle?.DriverID, null, 2));

                } else {
                    // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
                }
            })
            .catch(error => {
                // Handle errors
                // Toast.show('Enable To Get Ride Details!', Toast.SHORT);
            });
    };

    const StoredRideID = async (USER_RIDEID: any) => {
        try {
            await AsyncStorage.setItem('store_ride_id', JSON.stringify(USER_RIDEID));
            console.log('store_ride_id===>', JSON.parse(USER_RIDEID));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_ride_id :', error);
        }
    }



    // useEffect(() => {
    //     axiosPostDriverInfoRequest();
    //     axiosGetRideRattingRequest();
    // }, []);


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
                const url = `https://rideshareandcourier.graphiglow.in/api/rattingCalculateDriver/calculateRating/${userId}`;

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
                            avg_username = response?.data?.ratings?.username;

                            no_rate = response?.data?.ratings?.numberOfRatings;
                            setRated(no_rate);

                            console.log("AVG_username*****===>", response?.data);

                            setDefaultRating(averageRating);

                            //  PHOTO // ADDED 

                            console.log("RESDATA===>",
                                JSON.stringify(averageRating, null, 2));
                            Toast.show('Driver Ratings Get Success!', Toast.SHORT);

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

        const storedLinkedId = await AsyncStorage.getItem('store_ride_id');
        if (storedLinkedId !== null) {
            const url = 'https://rideshareandcourier.graphiglow.in/api/driverInfo/driverInfo';

            // Prepare data in JSON format
            const data = {
                id: JSON.parse(storedLinkedId)
                // id: "659bba1f03910785e692df60"
            };

            console.log("INFO_DATA==>", JSON.stringify(data, null, 2));

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

                        DriverBookingName = response?.data?.matchingUsers[0]?.username;

                        DriverBookingImage1 = response?.data?.matchingUsers[0]?.vehicle_pictures1_Url;
                        DriverBookingImage2 = response?.data?.matchingUsers[0]?.vehicle_pictures2_Url;
                        DriverBookingImage3 = response?.data?.matchingUsers[0]?.vehicle_pictures3_Url;
                        DriverBookingImage4 = response?.data?.matchingUsers[0]?.vehicle_pictures4_Url;

                        DriverVehicleNumber = response?.data?.matchingUsers[0]?.Plate_number;
                        DriverVehicleType = response?.data?.matchingUsers[0]?.Vehicle_type;
                        DriverVehicleName = response?.data?.matchingUsers[0]?.Company_name;

                        DriverVehicleDecription = response?.data?.matchingUsers[0]?.Vehicle_Details;

                        DriverVehiclePhone = response?.data?.matchingUsers[0]?.mobilenumber;

                        DriverProfileImage = response?.data?.matchingUsers[0]?.ProfileImage;

                        DriverVehicleColor = response?.data?.matchingUsers[0]?.Vehicle_Color;


                        DriverUserVIN = response?.data?.matchingUsers[0]?.VINumber;


                        DriverNumberOfSeat = response?.data?.matchingUsers[0]?.NumberOfSeat;
                        setSeats(DriverNumberOfSeat);


                        // _id99
                        Driver_id = response?.data?.matchingUsers[0]?._id;
                        // Store for star : todo
                        StoredDriverID(Driver_id);

                        setDriverVIN(DriverUserVIN);

                        setURL1(DriverBookingImage1);
                        setURL2(DriverBookingImage2);
                        setURL3(DriverBookingImage3);
                        setURL4(DriverBookingImage4);
                        setURL5(DriverProfileImage);

                        setDriverName(DriverBookingName);
                        setDriverPlateNumber(DriverVehicleNumber);
                        setDriverPlateName(DriverVehicleName);
                        setDriverVehicleType(DriverVehicleType);
                        setDriverVehicleDesc(DriverVehicleDecription);
                        setPhoneNumber(DriverVehiclePhone);

                        setDriverVehicleColor(DriverVehicleColor);


                        console.log("Driver Name==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.username, null, 2));

                        console.log("Vehicle Image1==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.vehicle_pictures1_Url, null, 2));
                        console.log("Vehicle Image2==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.vehicle_pictures2_Url, null, 2));
                        console.log("Vehicle Image3==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.vehicle_pictures3_Url, null, 2));
                        console.log("Vehicle Image4==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.vehicle_pictures4_Url, null, 2));

                        console.log("Vehicle No==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.Plate_number, null, 2));
                        console.log("Vehicle Type==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.Company_name, null, 2));
                        console.log("Vehicle Name==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.Model_name, null, 2));

                        console.log("Vehicle Decription==>",
                            JSON.stringify(response?.data?.matchingUsers[0]?.Vehicle_Details, null, 2));

                        Toast.show('Driver Details Retrieved Successfully!', Toast.SHORT);

                    } else {
                        // Toast.show('Enabel To Retrieved Details!', Toast.SHORT);
                        //  Welcome! Signed in successfully.
                    }
                })
                .catch(error => {
                    // Handle errors
                    // Toast.show('Enabel To Retrieved Details!', Toast.SHORT);
                });
        } else {

        }

    };


    const StoredDriverID = async (Driver_id: any) => {
        try {
            await AsyncStorage.setItem('store_star_id', JSON.stringify(Driver_id));
            console.log('store_star_id===>', JSON.parse(Driver_id));

        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error store_star_id :', error);
        }
    }

    const onPressCallUser = () => {
        const phoneNumberWithPrefix = `tel:${isPhoneNumber}`;
        Linking.openURL(phoneNumberWithPrefix);
    }

    const onPressAddPreferred = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostDataAddPreferredDriver();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }


    const axiosPostDataAddPreferredDriver = async () => {

        const storedLinkedId = await AsyncStorage.getItem('user_register_id');

        const storedDriverLinkedId = await AsyncStorage.getItem('store_ride_id');

        if (storedLinkedId !== null && storedDriverLinkedId != null) {
            const url = 'https://rideshareandcourier.graphiglow.in/api/preferredDriverAdd/add';

            // Prepare data in JSON format
            const data = {
                UserID: JSON.parse(storedLinkedId),
                DriverID: JSON.parse(storedDriverLinkedId),
            };

            console.log("AddPreferredData==>", data);

            await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 201
                        &&
                        response?.data?.message === 'Preferred driver added successfully') {
                        // Handle API response here
                        // Vehicles Are

                        console.log("AddPreferredDataResponse==>",
                            JSON.stringify(response?.data, null, 2));

                        Toast.show('Preferred Driver Successfully Added!', Toast.SHORT);
                        navigation.goBack();

                    } else {
                        Toast.show('Already Preferred Driver Added!', Toast.SHORT);
                        //  Welcome! Signed in successfully.
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Already Preferred Driver Added!', Toast.SHORT);
                });
        } else {

        }
    };



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
                            title={"Driver Details"} // Booking Flow
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
                                            title={"Top Rated " + "(" + isRated + ")"}
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
                                title={isDriverVehicleType} // Car
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

                        <View style={Styles.viewSeprateLine3}>
                            <TextComponent
                                color={Colors.white}
                                title={"VIN number"}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                            <TextComponent
                                color={Colors.grayFull}
                                title={isDriverVIN}
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

                    {/* <View style={CommonStyle.commonJustifyContent}>
                        <ButtonComponent
                            isVisibleMobile={false}
                            isVisibleFaceBook={false}
                            marginVertical={hp(1)}
                            heightBtn={hp(7)}
                            isVisibleAddHeart={true}
                            widthBtn={wp(90)}
                            isRightArrow={false}
                            color={Colors.white}
                            title={ScreenText.AddDriverList}
                            marginHorizontal={wp(2)}
                            fontWeight="600"
                            fontSize={wp(4)}
                            onPress={onPressAddPreferred}
                            fontFamily={Fonts.PoppinsSemiBold}
                            alignSelf='center'
                            textAlign='center'
                            borderRadius={wp(2)}
                            backgroundColor={Colors.blue}
                        />

                    </View> */}

                </View>
            </ScrollView>

        </SafeAreaView >
    )

}

export default PreferredDriverDrawer;