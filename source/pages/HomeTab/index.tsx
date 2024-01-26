import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ButtonComponent from '../../components/Button/index';
import StatusBarComponent from '../../components/StatusBar';
import TextInputComponent from '../../components/TextInput';
import { Colors, Fonts, Images } from '../../themes';
import { ConstValue, ScreenText } from '../../utils';
import { useTheme } from '../../utils/ThemeContext';
import CommonStyle from '../../utils/commonStyle';
import Styles from './style';

type Props = {
    navigation: any
}

const HomeTabScreen = (props: Props) => {

    const [isModalVisible, setModalVisible] = useState(true);

    const [markerCoordinate, setMarkerCoordinate] =
        useState({ latitude: 37.78825, longitude: -122.4324 });

    const [radius, setRadius] = useState(800); // Define the radius in meters


    const [email, setEmail] = useState('');


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const ref = useRef<any>(null); // Ref for the TextInput
    const handleUserLocation = (useremail: any) => {
        setEmail(useremail);
    }

    const images = [
        Images.sliderIcon,
        Images.sliderIcon,
        Images.sliderIcon,
        Images.sliderIcon,
        // Add more image URLs as needed
    ];

    let user_latitude;
    let user_longitude;

    const mapViewRef = useRef<any>(null);

    useEffect(() => {
        const backAction = async () => {
            // Handle the back button press
            // Return true to prevent default behavior (e.g., closing the app)
            // Return false to allow default behavior
            // You can add your custom logic here
            // For example, navigate to a different screen or show an alert
            console.log('Back button pressed!');

            // // Add your custom logic for clearing AsyncStorage data
            // try {
            //     await AsyncStorage.clear();
            //     console.log('AsyncStorage data cleared!');
            // } catch (error) {
            //     console.error('Error clearing AsyncStorage data:', error);
            // }


            BackHandler.exitApp();

            return true; // Prevent default behavior
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); // Remove the event listener on component unmount

    }, []);

    // Auto Zoom Added
    useEffect(() => {
        // Zoom to the marker using animateToRegion when markerCoordinate changes
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion({
                latitude: markerCoordinate.latitude,
                longitude: markerCoordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000); // Adjust duration as needed
        }
    }, [markerCoordinate]);


    useEffect(() => {

        const fetchData = () => {
            // Get Current Lat And Long
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;

                    user_latitude = position.coords.latitude;
                    user_longitude = position.coords.longitude;

                    console.log("User-fetchData1==>", user_latitude);
                    console.log("User-fetchData2==>", user_longitude);

                    let newCoordinate = { latitude: user_latitude, longitude: user_longitude };
                    setMarkerCoordinate(newCoordinate);

                },
                error => {
                    console.log(`Error getting location: ${error.message}`);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }

        fetchData();

        // Set interval to refresh every 10 seconds
        const intervalId = setInterval(fetchData, 10 * 1000);
        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, []);

    const { isDarkMode, toggleTheme } = useTheme();


    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <View style={Styles.container}>
                <MapView
                    ref={mapViewRef}
                    style={Styles.viewMapview}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Circle
                        center={markerCoordinate}
                        radius={radius}
                        fillColor="rgba(0, 0, 255, 0.2)" // Transparent blue fill color
                        strokeWidth={0} // No border
                    />
                    <Marker
                        coordinate={markerCoordinate}
                        title="Your Current Location"
                        description="You are here"
                    />
                </MapView>

                <View style={{
                    position: 'absolute',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: wp(2),
                    backgroundColor: isDarkMode === 'dark' ? "rgba(0, 0, 0, 0.6)" : "#FFFFFF", //QUICK
                    height: wp(14),
                    padding: wp(2),
                    marginTop: wp(10),
                    alignSelf: 'center',
                }}>
                    <TouchableOpacity onPress={
                        () => props.navigation.toggleDrawer()}
                        style={Styles.viewBlackBackground}>

                        {isDarkMode === 'dark' ?
                            <Image
                                style={Styles.imageOpenIcon}
                                resizeMode="contain"
                                source={Images.openIcon} /> :
                            <Image
                                style={Styles.imageOpenIcon}
                                resizeMode="contain"
                                source={Images.openIconWhite} />}

                    </TouchableOpacity>

                    <TextInputComponent
                        selectionColor={Colors.white}
                        isVisibleDropDown={false}
                        marginVertical={hp(1)}
                        width={wp(50)}
                        height={hp(7)}
                        marginTop={hp(2)}
                        isUserHide={false}
                        textfontSize={ConstValue.value15}
                        textfontFamily={Fonts.PoppinsRegular}
                        textlineHeight={ConstValue.value0}
                        ref={ref}
                        placeholder={"Your Current Location"}
                        editable={true}
                        multiline={false}
                        secureTextEntry={false}
                        isPadding={true}
                        keyboardType='default'
                        textAlign='left'
                        numberOfLines={null}
                        maxLength={null}
                        color={Colors.white}
                        backgroundColor={'transparent'}
                        borderRadius={wp(2)}
                        onChangeText={handleUserLocation}
                        placeholderTextColor={isDarkMode === 'dark' ? Colors.white : Colors.black}
                    />

                    <View style={Styles.viewMargin}>
                        <ButtonComponent
                            isVisibleMobile={false}
                            isVisibleFaceBook={false}
                            heightBtn={hp(5)}
                            widthBtn={wp(25)}
                            isRightArrow={false}
                            color={Colors.white}
                            title={ScreenText.BookNow}
                            fontWeight="600"
                            fontSize={wp(3)}
                            onPress={() =>
                                props.navigation.navigate('BookingScreen', {
                                    itemType: 'Select Service'
                                })
                            }
                            // onPress={() => props.navigation.navigate("BookingScreen")}
                            fontFamily={Fonts.PoppinsRegular}
                            alignSelf='center'
                            textAlign='center'
                            borderRadius={wp(2)}
                            backgroundColor={Colors.blue}
                        />
                    </View>
                </View>


                <View style={Styles.overlayFixedView}>

                    <View style={Styles.modalConainer}>

                        <View style={Styles.viewModalFixed}>
                            <View>
                                <TouchableOpacity
                                    onPress={() =>
                                        props.navigation.navigate('BookingScreen', {
                                            itemType: 'Taxi Booking'
                                        })
                                    }
                                >
                                    <View style={Styles.viewItem1}>
                                        <Image
                                            source={Images.whiteCardIcon}
                                            resizeMode="contain"
                                            style={Styles.viewItemImage1}
                                        />
                                    </View>
                                    <Text style={Styles.textTexiBooking}>Taxi Booking</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() =>
                                    props.navigation.navigate('CourierBooking', {
                                        itemType: 'Courier Delivery'
                                    })
                                }>

                                <View>
                                    <View style={Styles.viewItem1}>
                                        <Image
                                            source={Images.whiteCourierIcon}
                                            resizeMode="contain"
                                            style={Styles.imageCouierIcon}
                                        />
                                    </View>
                                    <Text style={Styles.textTexiBooking}>Courier Delivery</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                                activeOpacity={0.2}
                                onPress={() => props.navigation.navigate("HelpScreen")}>
                                <View>
                                    <View style={Styles.viewItem1}>
                                        <Image
                                            source={Images.whiteSupportIcon}
                                            resizeMode="contain"
                                            style={Styles.imageCouierIcon}
                                        />
                                    </View>
                                    <Text style={Styles.textTexiBooking}>Support</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={Styles.sliderBox}>
                            <SliderBox
                                images={images}
                                sliderBoxHeight={wp(50)}
                                parentWidth={wp(90)}
                                autoPlay={true}
                                dotColor={Colors.blue}
                                inactiveDotColor={Colors.white}
                                dotStyle={Styles.dotStyle}
                                resizeMethod={'resize'}
                                resizeMode={'contain'}
                                autoplayInterval={1000}
                            />
                        </View>
                    </View>


                </View>




            </View >
        </SafeAreaView >
    )

}

export default HomeTabScreen;