import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import ButtonComponent from '../../components/Button/index';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text/index';
import TextInputComponent from '../../components/TextInput/index';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from '../../utils/commonfunction';
import { API, ConstValue, ScreenText } from '../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}


const CourierDropupScreen = (props: Props) => {

    const refDispute = useRef<any>(null);
    const refDesc = useRef<any>(null);
    // refMobileCode


    let mark3;
    let mark4;


    const refLocation = useRef<any>(null);

    const [pin, setLocationPin] = useState('')

    const refPinCode = useRef<any>(null);

    const [isFocusedPasswordRef, setIsFocusedPasswordRef] = useState(false);

    const [isFocusedLocationRef, setIsFocusedLocationRef] = useState(false);

    const [isFocusedNearByRef, setIsFocusedNearByRef] = useState(false);


    const [isFocusedPinRef, setIsFocusedPinRef] = useState(false);


    const [isValidRefCode, setValidRefCode] = useState(true);

    const [isValidLocation, setIsValidLocation] = useState(true);

    const [isValidNearBy, setIsValidNearBy] = useState(true);

    const [isSaveFullLocation, setSaveFullLocation] = useState(false);

    const [isValidPinCode, setIsValidPinCode] = useState(true);

    const [DeafultAdd, setDeafultAdd] = useState(ScreenText.LocationAddress);

    const handleFocusPassRefCode = () => {
        setIsFocusedPasswordRef(true)
    }

    const handleFocusLocationRef = () => {
        setIsFocusedLocationRef(true)
    }

    const handleFocusNearByRef = () => {
        setIsFocusedNearByRef(true)
    }

    const handleFocusPinRef = () => {
        setIsFocusedPinRef(true)
    }

    const [SavedLocationdModal_, SetSavedLocationdModal_] = useState<any>([]);


    // TODO :
    const [isShowView, setShowView] = useState(true);
    const [isShowViewBlank, setShowViewBlank] = useState(true);


    let user_latitude;
    let user_longitude;
    let fullAddress;

    const mapViewRef = useRef<any>(null);

    const [passRef, setPassRef] = useState('')
    const [locationRef, setLocationRef] = useState('')

    const [locationNearByRef, setLocationNearByRef] = useState('')
    const [radius, setRadius] = useState(1200); // Define the radius in meters


    // USER
    let secondPartOfAddress;
    let remainingAddress;
    let postalCode;


    let secondPartOfAddress_;
    let remainingAddress_;
    let postalCode_;

    // TODO :
    let PassongLat;
    let PassingLong;

    let user_latitude_map;
    let user_longitude_map;

    const [markerCoordinate, setMarkerCoordinate] =
        useState({ latitude: 37.78825, longitude: -122.4324 });

    const [markerCoordinates, setMarkerCoordinates] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });


    // Auto Zoom Added
    useEffect(() => {
        // Zoom to the marker using animateToRegion when markerCoordinate changes
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion({
                latitude: markerCoordinates.latitude,
                longitude: markerCoordinates.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000); // Adjust duration as needed
        }
    }, [markerCoordinates]);

    // TODO : COUIER - CUSTOMER CURRENT LOCATION SHOW
    useEffect(() => {

        const fetchDataMap = () => {
            // Get Current Lat And Long
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;

                    user_latitude_map = position.coords.latitude;
                    user_longitude_map = position.coords.longitude;

                    console.log("User-fetchData_PICK==>", user_latitude_map);
                    console.log("User-fetchData_PICK==>", user_longitude_map);

                    let newCoordinate = {
                        latitude: user_latitude_map,
                        longitude: user_longitude_map
                    };
                    setMarkerCoordinates(newCoordinate);

                },
                error => {
                    console.log(`Error getting location: ${error.message}`);
                },
                { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
            );
        }

        fetchDataMap();

        // // Set interval to refresh every 10 seconds
        // const intervalId = setInterval(fetchDataMap, 10 * 1000);
        // // Cleanup function
        // return () => {
        //     // Clear the interval when the component unmounts
        //     clearInterval(intervalId);
        // };
    }, []);


    useEffect(() => {

        const fetchData = async () => {
            try {
                await axiosPostGetListLocation();

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        // Set interval to refresh every 10 seconds
        const intervalId = setInterval(fetchData, 10 * 1000);
        // Cleanup function
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, []);


    const handleAccountRefCode = (userpass: any) => {
        setPassRef(userpass);
    }


    const handleAccountLocationCode = (userLocation: any) => {
        setLocationRef(userLocation);
        if (userLocation.length < 5) {
            setIsFocusedLocationRef(true);
            setIsValidLocation(false)
        } else {
            setIsValidLocation(true);
            setIsFocusedLocationRef(false)
        }
    }

    const handleAccountNearBy = (userLocationBy: any) => {
        setLocationNearByRef(userLocationBy);
        if (userLocationBy.length < 5) {
            setIsFocusedNearByRef(true);
            setIsValidNearBy(false)
        } else {
            setIsValidNearBy(true);
            setIsFocusedNearByRef(false)
        }
    }

    const handlePinCode = (userPinCode: any) => {
        setLocationPin(userPinCode);
        if (userPinCode.length < 6) {
            setIsFocusedPinRef(true);
            setIsValidPinCode(false)
        } else {
            setIsValidPinCode(true);
            setIsFocusedPinRef(false)
        }
    }

    const [isModalVisible, setModalVisible] = useState(false);
    const [isPickVisible, setPickVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleMarkerPress = () => {
        setPickVisible(true)
    };



    const handleMapPress = (event) => {
        setShowView(false);
        setShowViewBlank(false);

        // Update the marker's coordinates when the map is pressed
        setMarkerCoordinates(event.nativeEvent.coordinate);

        user_latitude = event.nativeEvent.coordinate.latitude;
        user_longitude = event.nativeEvent.coordinate.longitude;

        getCurrentLocationAddress(user_latitude, user_longitude);

    };

    const handleMarkerDrag = (event) => {

        setShowView(false);
        setShowViewBlank(false);


        // Handle marker drag event, e.g., update coordinates
        setMarkerCoordinates(event.nativeEvent.coordinate);
    };

    const handleMarkerDragEnd = (event) => {
        // Handle marker drag end event, e.g., save new coordinates to state or server
        setMarkerCoordinates(event.nativeEvent.coordinate);

        user_latitude = event.nativeEvent.coordinate.latitude;
        user_longitude = event.nativeEvent.coordinate.longitude;

        // Perform reverse geocoding
        // Geocoding.from(userLatitude, userLongitude)
        //     .then(json => {
        //         const addressComponent = json.results[0].formatted_address;
        //         console.log('Address:', addressComponent);
        //     })
        //     .catch(error => console.warn(error));

        // TODO :
        getCurrentLocationAddress(user_latitude, user_longitude);

        console.log("latitude==>", event.nativeEvent.coordinate.latitude);
        console.log("longitude==>", event.nativeEvent.coordinate.longitude);

    };



    const getCurrentLocationAddress = async (user_latitude, user_longitude) => {
        console.log("getCurrentLocationAddress111----==>", user_latitude);
        console.log("getCurrentLocationAddress222----==>", user_longitude);

        storeUserLat(user_latitude);
        storeUserLong(user_longitude);

        // setMarkerCoordinates({ latitude: user_latitude, longitude: user_longitude })
        setMarkerCoordinate({ latitude: user_latitude, longitude: user_longitude })
        // Diff" To Store []

        try {

            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + user_latitude + ',' + user_longitude + '&key=' + 'AIzaSyDMZwBszNuk7X4MTvW4K3D8_zyBqAy0slE')
                .then((response) => response.json())
                .then((responseJson) => {

                    // TODO :
                    // GET ADDRESS IN 3 PART
                    const result = responseJson.results[0];
                    const formattedAddress = result.formatted_address;

                    secondPartOfAddress = formattedAddress.split(',')[1];
                    remainingAddress = formattedAddress.split(',').slice(1).join(',').trim();
                    postalCode = result.address_components.find(component =>
                        component.types.includes('postal_code')
                    );

                    // ? postalCode.long_name : 'N/A'

                    console.log('GET ADDRESS 1', remainingAddress);
                    console.log('GET ADDRESS 2', secondPartOfAddress);
                    console.log('GET ADDRESS 3', postalCode.long_name);

                    console.log('GET ADDRESS 4', markerCoordinates);

                    // Set As Deafult : 1
                    setDeafultAdd(remainingAddress);

                    // Store Data : 2
                    storeFullAddress(remainingAddress);
                    storeLandMark(secondPartOfAddress);
                    storePin(postalCode.long_name);

                    // console.log('GET ADDRESS 0', remainingAddress);

                    // console.log('ADDRESS GEOCODE is BACK!! => '
                    //     + JSON.stringify(responseJson, null, 2));
                })

        } catch (error) {
            console.error('Error in getCurrentLocationAddress:', error);
            throw error;
        }
    };


    const storeFullAddress = async (remainingAddress: any) => {
        try {
            await AsyncStorage.setItem('full_address', JSON.stringify(remainingAddress));
            console.log('full_address===>', JSON.stringify(remainingAddress));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error full_address :', error);
        }
    }

    const storeLandMark = async (secondPartOfAddress: any) => {
        try {
            await AsyncStorage.setItem('landmark_address', JSON.stringify(secondPartOfAddress));
            console.log('landmark_address===>', JSON.stringify(secondPartOfAddress));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error landmark_address :', error);
        }
    }

    const storePin = async (postalCode: any) => {
        try {
            await AsyncStorage.setItem('pin_address', JSON.stringify(postalCode));
            console.log('pin_address===>', JSON.stringify(postalCode));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error pin_address :', error);
        }
    }


    // USER LAT && LONG 
    const storeUserLat = async (user_latitude: any) => {
        try {
            await AsyncStorage.setItem('lat_address', JSON.stringify(user_latitude));
            console.log('lat_address===>', JSON.stringify(user_latitude));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error lat_address :', error);
        }
    }

    const storeUserLong = async (user_longitude: any) => {
        try {
            await AsyncStorage.setItem('long_address', JSON.stringify(user_longitude));
            console.log('long_address===>', JSON.stringify(user_longitude));
        } catch (error) {
            // Handle any errors that might occur during the storage operation
            console.log('Error long_address :', error);
        }
    }
    // USER LAT && LONG 
    const onPressUpdateAddress = async () => {
        setSaveFullLocation(true)

        // GET COMPLETE - NEARBY - PIN CODE 
        remainingAddress_ = await AsyncStorage.getItem('full_address');
        secondPartOfAddress_ = await AsyncStorage.getItem('landmark_address');
        postalCode_ = await AsyncStorage.getItem('pin_address');

        // SET DATA TO UPDATE CHNAGE LOCATION 
        setLocationRef(JSON.parse(remainingAddress_));
        setLocationNearByRef(JSON.parse(secondPartOfAddress_));
        setLocationPin(JSON.parse(postalCode_));

    }

    const axiosPostGetListLocation = async () => {
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostSetDataGetListLocation();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }


    const axiosPostSetDataGetListLocation = async () => {
        try {
            const storedLinkedId = await AsyncStorage.getItem('user_register_id');

            if (storedLinkedId !== null) {
                const userId = JSON.parse(storedLinkedId);
                // const url = `https://rideshareandcourier.graphiglow.in/api/saveLocations/fetchlocations`;
                const url = `${API.BASE_URL}/saveLocations/fetchlocations`;

                // Prepare data in JSON format //
                const data = {
                    UserID: userId,
                    service_type: "courier", // as flow
                    type: "Drop" // as flow
                };

                console.log("axiosPostProfileUpdateSubmit==>", JSON.stringify(data, null, 2));

                await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => {
                        if (response.status === 200 &&
                            response?.data?.message === 'Saved Locations') {

                            console.log("AllResponseData==>",
                                JSON.stringify(
                                    response?.data?.matchingLocations[0]?.complete_location, null, 2));

                            SetSavedLocationdModal_(response?.data?.matchingLocations);

                            // Toast.show('Success! Locations Retrieved Successfully!', Toast.SHORT);
                            // props.navigation.goBack();
                        } else {
                            // Toast.show('Saved Credentials Invalid!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Toast.show('Saved Credentials Invalid!', Toast.SHORT);
                    });
            } else {
                // Handle the case where storedLinkedId is null
            }
        } catch (error) {
            // Handle any errors that occur during AsyncStorage operations
        }
    };

    const onPressSavedLocation = async () => {
        console.log("onPressSavedLocation==>", DeafultAdd);
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostSaveFullLocationUpdate();
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostSaveFullLocationUpdate = async () => {
        const storedLinkedId = await AsyncStorage.getItem('user_register_id');

        // const url = 'https://rideshareandcourier.graphiglow.in/api/locations/locations';
        const url = `${API.BASE_URL}/locations/locations`;

        try {
            if (storedLinkedId !== null) {

                try {
                    // Get 3 Data As Local & Set !
                    //  const storedPickPrev = await AsyncStorage.getItem('user_name_pick');
                    remainingAddress_ = await AsyncStorage.getItem('full_address');
                    secondPartOfAddress_ = await AsyncStorage.getItem('landmark_address');
                    postalCode_ = await AsyncStorage.getItem('pin_address');

                    console.log("02-02==>==>", remainingAddress_);
                    console.log("02-03==>==>", secondPartOfAddress_);
                    console.log("02-04==>==>", postalCode_);

                } catch (error) {

                }

                const data = {
                    UserID: JSON.parse(storedLinkedId),
                    type: "Drop",  // as flow
                    service_type: "courier", // as flow
                    complete_location: locationRef !== '' ? locationRef : JSON.parse(remainingAddress_),
                    nearby_landmark: locationNearByRef !== '' ? locationNearByRef : JSON.parse(secondPartOfAddress_),
                    pin_code: pin !== '' ? pin : JSON.parse(postalCode_),

                    // "Person_Name": "Gosai",
                    // "mobilenumber_picku": "6356526597"

                    // USER TEST
                    // Latitude: markerCoordinate.latitude,
                    // Longitude: markerCoordinate.longitude,

                    // test lat - long as api
                    Latitude: markerCoordinates.latitude == markerCoordinate.latitude ?
                        markerCoordinates.latitude : markerCoordinate.latitude,
                    Longitude: markerCoordinates.longitude == markerCoordinate.longitude ?
                        markerCoordinates.longitude : markerCoordinate.longitude,

                    // "Person_Name": "Gosai",
                    // "mobilenumber_picku": "6356526597"
                };

                console.log("axiosPostSaveFullLocationUpdate...==>",
                    JSON.stringify(data, null, 2));

                await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.status === 201
                            && response?.data?.message === 'Booking Add Successfully') {

                            Toast.show('Save Location Successfully!', Toast.SHORT);
                            setSaveFullLocation(false)

                        } else {
                            Toast.show('Credentials Invalid!', Toast.SHORT);
                        }
                    })
                    .catch(error => {
                        // Handle errors
                        Toast.show('Credentials Invalid!', Toast.SHORT);
                    });

            }
        } catch (error) {

        }

    };

    const onPressSaveFullLocation = async () => {
        if (locationRef === '') {
            Toast.show('Complete Location  Required!', Toast.SHORT);
        } else if (locationNearByRef === '') {
            Toast.show('Nearby Landmark Required!', Toast.SHORT);
        } else if (pin === '') {
            Toast.show('Pin Code Required!', Toast.SHORT);
        } else {
            // Concat The Full Address 
            fullAddress = locationRef + ", " + locationNearByRef + ", " + pin;
            setDeafultAdd(fullAddress);
            setSaveFullLocation(false);
        }
    }


    // TODO : 
    const handleFavouriteChange = async ({ item, index }) => {

        // fetchlocations(item);
        console.log("handleFavouriteChange==>", item?._id);
        console.log("handleFavouriteChange==>", item?._id);
        console.log("handleFavouriteChange==>", item?._id);
        console.log("handleFavouriteChange==>", item?._id);

        try {
            const isConnected = await NetworkUtils.isNetworkAvailable();
            if (isConnected) {
                axiosPostRemovedSelected(item);
            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }

    };



    const onPressLocationToPickUp = async () => {
        // Check Validation : locationNearByRef
        if (
            locationNearByRef === null ||
            locationNearByRef === '' ||
            locationNearByRef === undefined ||
            pin === null ||
            pin === '' ||
            pin === undefined
        ) {

            //  Manual  - LanMark - Pin Passing 
            try {

                // Get 3 Data As Local & Set !
                //  const storedPickPrev = await AsyncStorage.getItem('user_name_pick');
                remainingAddress_ = await AsyncStorage.getItem('full_address');
                secondPartOfAddress_ = await AsyncStorage.getItem('landmark_address');
                postalCode_ = await AsyncStorage.getItem('pin_address');

                // TODO : USER
                PassongLat = await AsyncStorage.getItem('lat_address');
                PassingLong = await AsyncStorage.getItem('long_address');

                // PassingLatSelected = await AsyncStorage.getItem('lat_list');
                // PassingLongSelected = await AsyncStorage.getItem('long_list');

                // console.log("02-00002==>==>", remainingAddress_);
                // console.log("02-00003==>==>", secondPartOfAddress_);
                // console.log("02-00004==>==>", postalCode_);

            } catch (error) {

            }

            // STORE PICK ADDRESS IN LOCAL 
            mark3 = JSON.parse(secondPartOfAddress_);
            STOARE_LOCAL_LANDMARK3(mark3);

            props.navigation.navigate('CourierBooking', {
                itemDropName: JSON.parse(secondPartOfAddress_),
                itemType: 'Courier Delivery',
                itemDropPin: JSON.parse(postalCode_),
                itemDroplat: JSON.parse(PassongLat) !== '' ? JSON.parse(PassongLat) :
                    markerCoordinates.latitude,
                itemDroplong: JSON.parse(PassingLong) !== '' ? JSON.parse(PassingLong) :
                    markerCoordinates.longitude,
            });

        } else {

            // Passing lat long As list OR Selected
            try {

                // TODO : USER
                PassongLat = await AsyncStorage.getItem('lat_address');
                PassingLong = await AsyncStorage.getItem('long_address');

                // PassingLatSelected = await AsyncStorage.getItem('lat_list');
                // PassingLongSelected = await AsyncStorage.getItem('long_list');


            } catch (error) {

            }


            // STORE PICK ADDRESS IN LOCAL 
            mark4 = JSON.parse(secondPartOfAddress_);
            STOARE_LOCAL_LANDMARK4(mark4);

            props.navigation.navigate('CourierBooking', {
                itemDropName: locationNearByRef,
                itemType: 'Courier Delivery',
                itemDropPin: pin,
                itemDroplat: JSON.parse(PassongLat) !== '' ? JSON.parse(PassongLat) :
                    markerCoordinates.latitude,
                itemDroplong: JSON.parse(PassingLong) !== '' ? JSON.parse(PassingLong) :
                    markerCoordinates.longitude,
            });
        }
    }


    const STOARE_LOCAL_LANDMARK3 = async (mark3: any) => {
        try {
            await AsyncStorage.setItem('mark4_drop', JSON.stringify(mark3));
        } catch (error) {
            console.error('Error mark4_drop:', error);
        }
    }

    const STOARE_LOCAL_LANDMARK4 = async (mark4: any) => {
        try {
            await AsyncStorage.setItem('mark4_drop', JSON.stringify(mark4));
        } catch (error) {
            console.error('Error mark4_drop:', error);
        }
    }


    const SelectedLocation = (item) => {
        try {

            console.log("Latitude and Longitude===>", item?.Latitude, item?.Longitude);

            fullAddress = item?.complete_location + ", " + item?.nearby_landmark + ", " + item?.pin_code;
            setDeafultAdd(fullAddress);

            setLocationNearByRef(item?.nearby_landmark);

            if (!item) {
                throw new Error("Invalid item");
            }

            // Set Lat And Long
            const latitude = parseFloat(item.Latitude); // Ensure it's a number
            const longitude = parseFloat(item.Longitude); // Ensure it's a number

            if (isNaN(latitude) || isNaN(longitude)) {
                throw new Error("Invalid latitude or longitude");
            }

            setMarkerCoordinates({ latitude, longitude });

            setModalVisible(false);

            // console.log("SelectedLocation===>" + locationNearByRef);
        } catch (error) {

        }

    }

    const RemoveSelectedLocation = async (item) => {
        console.log("item_ID", item?._id)
        // CALL REMOVE API :
        try {
            const isConnected = await NetworkUtils.isNetworkAvailable()
            if (isConnected) {
                axiosPostRemovedSelected(item);

            } else {
                Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
            }
        } catch (error) {
            Toast.show("axios error", Toast.SHORT);
        }
    }

    const axiosPostRemovedSelected = async (item) => {

        try {
            //const url = `https://rideshareandcourier.graphiglow.in/api/saveLocationsRemove/locations/${item?._id}`;
            const url = `${API.BASE_URL}/saveLocationsRemove/locations/${item?._id}`;

            await axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 200
                        && response?.data?.message === 'Save Locations Remove successfully') {

                        SetSavedLocationdModal_(SavedLocationdModal_.filter(location => location._id !== item._id));

                        Toast.show('Remove Save Location Successfully!', Toast.SHORT);

                    } else {
                        Toast.show('Unable To Save Location!', Toast.SHORT);
                    }
                })
                .catch(error => {
                    // Handle errors
                    Toast.show('Unable To Save Location!', Toast.SHORT);
                });

        } catch (error) {

        }

    };

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
                    onPress={handleMapPress}
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
                        title="Draggable Marker"
                        description="Drag me!"
                        draggable
                        onDrag={handleMarkerDrag}
                        onDragEnd={handleMarkerDragEnd}
                        onPress={handleMarkerPress}
                    />
                    {/* <Marker
                        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                        title="Marker Title"
                        description="Marker Description"
                        onPress={handleMarkerPress} // Add this onPress handler
                    /> */}
                </MapView>

                <TouchableOpacity
                    style={Styles.viewPick1}
                    onPress={() => props.navigation.goBack()}>
                    <View style={Styles.overlay}>

                        <Image
                            style={Styles.imageOpenIcon}
                            resizeMode="contain"
                            source={Images.arrowLeft} />
                    </View>
                </TouchableOpacity>

                <View
                    style={Styles.viewPick1}>
                    <TextInputComponent
                        selectionColor={Colors.white}
                        isVisibleDropDown={false}
                        isVisibleLock={false}
                        isVisibleRef={false}
                        isFavouite={true}
                        isVisibleWhiteIcon={true}
                        onPressFav={toggleModal}
                        marginVertical={hp(1)}
                        marginHorizontal={wp(15)}
                        width={wp(100)}
                        borderWidth={isFocusedPasswordRef ? ConstValue.value1 : ConstValue.value0}
                        borderColor={isFocusedPasswordRef ? Colors.white : Colors.blue}
                        height={hp(6)}
                        marginTop={hp(3)} // 1
                        isUserHide={false}
                        textfontSize={ConstValue.value15}
                        textfontFamily={Fonts.PoppinsRegular}
                        textlineHeight={ConstValue.value0}
                        ref={refDispute}
                        placeholder={ScreenText.DropOffLocation}
                        editable={false}
                        multiline={false}
                        isPadding={true}
                        keyboardType='default'
                        textAlign='left'
                        numberOfLines={null}
                        color={Colors.white}
                        backgroundColor={Colors.black}
                        borderRadius={wp(2)}
                        // onFocus={handleFocusPassRefCode}
                        onChangeText={handleAccountRefCode}
                        onSubmitEditing={() => {
                            refDesc?.current?.focus();
                        }}
                        placeholderTextColor={Colors.gray}
                    />
                    {/* {!isValidRefCode ?
                        <TextComponent
                            marginLeft={wp(4)}
                            textDecorationLine={'none'}
                            color={Colors.red}
                            title={ScreenText.ValidRef}
                            fontWeight="400"
                            fontSize={wp(4)}
                            fontFamily={Fonts.PoppinsRegular}
                        />
                        : null} */}

                </View>

                {isSaveFullLocation ?

                    <View style={{
                        justifyContent: 'center',
                        paddingHorizontal: wp(5),
                        height: "auto",
                        backgroundColor: Colors.desc
                    }}>

                        <View>
                            <TextComponent
                                color={Colors.white}
                                title={ScreenText.SaveFullLocation} // As HTML Contain
                                textDecorationLine={'none'}
                                fontWeight="500"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign="left"
                                marginVertical={hp(2)} // modalIcon
                            />
                        </View>

                        <View>
                            <TextInputComponent
                                selectionColor={Colors.white}
                                isVisibleDropDown={false}
                                isVisibleLock={false}
                                isVisibleRef={false}
                                isVisibleMap={true}
                                // marginVertical={hp(1)}
                                // marginHorizontal={wp(4)}
                                width={wp(90)}
                                borderWidth={isFocusedLocationRef ? ConstValue.value1 : ConstValue.value0}
                                borderColor={isFocusedLocationRef ? Colors.white : Colors.blue}
                                height={hp(7)}
                                // marginTop={hp(2)}
                                isUserHide={false}
                                textfontSize={ConstValue.value15}
                                textfontFamily={Fonts.PoppinsRegular}
                                textlineHeight={ConstValue.value0}
                                ref={refLocation}
                                placeholder={ScreenText.CompleteLocation}
                                maxLength={500}
                                ellipsizeMode={"tail"}
                                numberOfLines={1}
                                editable={true}
                                multiline={false}
                                isPadding={true}
                                keyboardType='default'
                                textAlign='left'
                                color={Colors.white}
                                backgroundColor={Colors.grayDark}
                                borderRadius={wp(2)}
                                onFocus={handleFocusLocationRef}
                                value={locationRef}
                                onChangeText={handleAccountLocationCode}
                                onSubmitEditing={() => {
                                }}
                                placeholderTextColor={Colors.gray}
                            />
                            {!isValidLocation ?
                                <TextComponent
                                    // marginLeft={wp(4)}
                                    textDecorationLine={'none'}
                                    color={Colors.red}
                                    title={ScreenText.ValidLocationRef}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    marginVertical={wp(2)}
                                    fontFamily={Fonts.PoppinsRegular}
                                />
                                : null}

                        </View>

                        <View>
                            <TextInputComponent
                                selectionColor={Colors.white}
                                isVisibleDropDown={false}
                                isVisibleLock={false}
                                isVisibleRef={false}
                                isVisibleMap={false}
                                isVisibleNearBy={true}
                                marginVertical={hp(2)}
                                // marginHorizontal={wp(4)}
                                maxLength={500}
                                ellipsizeMode={"tail"}
                                numberOfLines={1}
                                width={wp(90)}
                                borderWidth={isFocusedNearByRef ? ConstValue.value1 : ConstValue.value0}
                                borderColor={isFocusedNearByRef ? Colors.white : Colors.blue}
                                height={hp(7)}
                                // marginTop={hp(2)}
                                isUserHide={false}
                                textfontSize={ConstValue.value15}
                                textfontFamily={Fonts.PoppinsRegular}
                                textlineHeight={ConstValue.value0}
                                ref={refLocation}
                                placeholder={ScreenText.NearbyLandmark}
                                editable={true}
                                multiline={false}
                                isPadding={true}
                                keyboardType='default'
                                textAlign='left'
                                color={Colors.white}
                                backgroundColor={Colors.grayDark}
                                borderRadius={wp(2)}
                                onFocus={handleFocusNearByRef}
                                onChangeText={handleAccountNearBy}
                                value={locationNearByRef}
                                onSubmitEditing={() => {
                                }}
                                placeholderTextColor={Colors.gray}
                            />
                            {!isValidNearBy ?
                                <TextComponent
                                    // marginLeft={wp(4)}
                                    textDecorationLine={'none'}
                                    color={Colors.red}
                                    title={ScreenText.ValidNearByRef}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    // marginVertical={wp(2)}
                                    fontFamily={Fonts.PoppinsRegular}
                                />
                                : null}

                        </View>

                        <View>
                            <TextInputComponent
                                selectionColor={Colors.white}
                                isVisibleDropDown={false}
                                isVisibleNearBy={false}
                                isVisiblePinCode={true}
                                // marginVertical={hp(1)}
                                // marginHorizontal={wp(4)}
                                width={wp(90)}
                                borderWidth={isFocusedPinRef ? ConstValue.value1 : ConstValue.value0}
                                borderColor={isFocusedPinRef ? Colors.white : Colors.blue}
                                height={hp(7)}
                                // marginTop={hp(2)}
                                isUserHide={false}
                                textfontSize={ConstValue.value15}
                                textfontFamily={Fonts.PoppinsRegular}
                                textlineHeight={ConstValue.value0}
                                ref={refPinCode}
                                placeholder={ScreenText.PinCode}
                                editable={true}
                                multiline={false}
                                isPadding={true}
                                keyboardType='numeric'
                                maxLength={6}
                                textAlign='left'
                                numberOfLines={null}
                                color={Colors.white}
                                backgroundColor={Colors.grayDark}
                                borderRadius={wp(2)}
                                onFocus={handleFocusPinRef}
                                onChangeText={handlePinCode}
                                value={pin}
                                onSubmitEditing={() => {
                                }}
                                placeholderTextColor={Colors.gray}
                            />
                            {!isValidPinCode ?
                                <TextComponent
                                    // marginLeft={wp(4)}
                                    textDecorationLine={'none'}
                                    color={Colors.red}
                                    title={ScreenText.ValidPinCode}
                                    fontWeight="400"
                                    fontSize={wp(4)}
                                    // marginVertical={wp(2)}
                                    fontFamily={Fonts.PoppinsRegular}
                                />
                                : null}

                        </View>


                        <View>
                            <ButtonComponent
                                isVisibleMobile={false}
                                isVisibleFaceBook={false}
                                marginVertical={hp(3)}
                                heightBtn={hp(7)}
                                widthBtn={wp(90)}
                                isRightArrow={false}
                                onPress={onPressSaveFullLocation}
                                color={Colors.white}
                                title={ScreenText.SaveLocation}
                                // marginHorizontal={wp(4)}
                                fontWeight="600"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsSemiBold}
                                alignSelf='center'
                                textAlign='center'
                                borderRadius={wp(2)}
                                backgroundColor={Colors.blue}
                            />
                        </View>



                    </View>
                    :
                    <View>
                        <View
                            style={Styles.viewPick2}>
                            <View style={Styles.viewPickConatiner}>
                                <View style={CommonStyle.commonContent}>
                                    <TextComponent
                                        color={Colors.white}
                                        title={ScreenText.SelectYourDropOffLocationnMap} // As HTML Contain
                                        textDecorationLine={'none'}
                                        fontWeight="600"
                                        fontSize={wp(4)}
                                        fontFamily={Fonts.PoppinsRegular}
                                        textAlign="center"
                                        marginVertical={hp(2)} // modalIcon
                                    />

                                </View>

                                <View style={Styles.viewHorizontalLine}>
                                </View>

                                {!isShowViewBlank ?
                                    <></> :
                                    <View style={{ height: wp(30) }}>
                                    </View>
                                }

                                {!isShowView ?
                                    <View style={Styles.viewAddressConatiner}>
                                        <View style={Styles.viewLocationAddress}>
                                            <TextComponent
                                                color={Colors.grayFull}
                                                title={DeafultAdd} // As HTML Contain
                                                textDecorationLine={'none'}
                                                fontWeight="400"
                                                fontSize={wp(3.5)}
                                                fontFamily={Fonts.PoppinsRegular}
                                                textAlign='left'
                                            />
                                        </View>

                                        <View>
                                            <TouchableOpacity
                                                onPress={onPressSavedLocation}>
                                                <Image
                                                    style={Styles.imageFavIcon}
                                                    resizeMode="contain"
                                                    source={Images.loveIcon} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    : <></>}

                                {!isShowView ?
                                    <View style={Styles.viewChangeLocation}>
                                        <TextComponent
                                            color={Colors.blue}
                                            title={ScreenText.ChangeLocation} // As HTML Contain
                                            textDecorationLine={'none'}
                                            fontWeight="400"
                                            fontSize={wp(3.5)}
                                            // onPress={() => setSaveFullLocation(true)}
                                            onPress={onPressUpdateAddress}
                                            fontFamily={Fonts.PoppinsRegular}
                                            textAlign='left'
                                        />
                                    </View> : <></>
                                }


                                {!isShowView ?
                                    <View>
                                        <ButtonComponent
                                            isVisibleMobile={false}
                                            isVisibleFaceBook={false}
                                            marginVertical={hp(1)}
                                            heightBtn={hp(7)}
                                            widthBtn={wp(90)}
                                            isRightArrow={false}
                                            onPress={onPressLocationToPickUp}
                                            color={Colors.white}
                                            title={ScreenText.ConfirmLocation_}
                                            marginHorizontal={wp(4)}
                                            fontWeight="600"
                                            fontSize={wp(4)}
                                            fontFamily={Fonts.PoppinsSemiBold}
                                            alignSelf='center'
                                            textAlign='center'
                                            borderRadius={wp(2)}
                                            backgroundColor={Colors.blue}
                                        />
                                    </View>
                                    : <></>}



                            </View>

                        </View>

                    </View>
                }



                <Modal
                    isVisible={isModalVisible}
                    style={Styles.viewModalVisibleConatiner}
                >

                    <View style={Styles.textConatiner}>
                        <View style={CommonStyle.commonContent}>
                            <TextComponent
                                color={Colors.white}
                                title={ScreenText.SavedLocation} // As HTML Contain
                                textDecorationLine={'none'}
                                fontWeight="600"
                                fontSize={wp(4)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                                marginHorizontal={wp(5)}
                                marginVertical={hp(2)} // modalIcon
                            />

                        </View>

                        <View style={Styles.imageModalCloseIcon}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Image
                                    style={Styles.imageCloseIcon}
                                    resizeMode="contain"
                                    source={Images.modalIcon} />
                            </TouchableOpacity>



                        </View>

                    </View>

                    <View style={{
                        backgroundColor: Colors.desc,
                    }}>
                        <FlatList
                            data={SavedLocationdModal_}
                            bounces={true}
                            contentContainerStyle={Styles.viewContentContainerStyle}
                            keyExtractor={(item) => item._id}

                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={Styles.ItemSeparatorComponent}>
                                    </View>
                                )
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View>
                                        <TouchableOpacity
                                            activeOpacity={0.2}
                                            onPress={() => SelectedLocation(item)}
                                        >
                                            <View style={Styles.viewMapConatiner}>
                                                <View style={Styles.viewUserLcoation}>
                                                    <Image
                                                        style={Styles.imageMap}
                                                        resizeMode="contain" // item?.userLocation
                                                        source={Images.mapIcon} />

                                                </View>

                                                <View style={CommonStyle.commonFlex}>
                                                    <TextComponent
                                                        color={Colors.white}
                                                        title={item?.complete_location} // userStation
                                                        textDecorationLine={'none'}
                                                        fontWeight="400"
                                                        fontSize={wp(4)}
                                                        fontFamily={Fonts.PoppinsRegular}
                                                        textAlign='left'
                                                    />
                                                    <TextComponent
                                                        color={Colors.circleGray}
                                                        title={item?.nearby_landmark} // userRoad
                                                        textDecorationLine={'none'}
                                                        fontWeight="400"
                                                        fontSize={wp(4)}
                                                        fontFamily={Fonts.PoppinsRegular}
                                                        textAlign='left'
                                                    />
                                                </View>


                                                <View style={Styles.viewFavourite}>
                                                    <TouchableOpacity
                                                        activeOpacity={0.2}
                                                        onPress={() => handleFavouriteChange({ item, index })}>
                                                        {!item?.selected ?
                                                            <Image
                                                                style={Styles.imageHeartFill} // imageHeart FOR API
                                                                resizeMode="contain"
                                                                source={Images.heartIcon} />
                                                            :
                                                            <Image
                                                                style={Styles.imageHeartFill}
                                                                resizeMode="contain"
                                                                source={Images.heartFillIcon} />
                                                        }
                                                    </TouchableOpacity>
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


                </Modal>


            </View>


        </SafeAreaView >

    )
}

export default CourierDropupScreen;