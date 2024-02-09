import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Image, SafeAreaView, ScrollView,
  TouchableOpacity, View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import NetworkUtils from '../../utils/commonfunction';
import { ScreenText } from '../../utils/index';
import Styles from './style';

type Props = {
  navigation: any
}

const SettingScreen = (props: Props) => {
  // const navigation = useNavigation();

  const [RatedPerson, setRatedPerson] = useState('');


  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5, 6]);

  const [isProfileName, setProfileName] = useState(ScreenText.GuyHawkins);
  const [isProfileEmail, setProfileEmail] = useState(ScreenText.emailDummy);
  const [isProfileNumber, setProfileNumber] = useState(ScreenText.OTPNumber);

  const [isProfileImage, setProfileImage] = useState("https://fastly.picsum.photos/id/26/536/354.jpg?hmac=mH-83ynI3fGS9Ok782H46YSrWd9SV8D5v-77RfTdI0I");

  const starImageFilled =
    Images.fillStarIcon;
  const starImageCorner =
    Images.unfillStarIcon;

  let user_mobilenumber;
  let user_email;
  let user_name;
  let user_img;

  let user_total;

  let user_averageRating;

  // {defaultRating} / {Math.max.apply(null, maxRating)}


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Profile Data
        await axiosPostProfilDataGetInfo();

        // Get Profile Ratting 
        await axiosPostProfilDataGetRatting();

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
  }, []);

  const axiosPostProfilDataGetInfo = async () => {
    try {
      const isConnected = await NetworkUtils.isNetworkAvailable()
      if (isConnected) {
        axiosPostSetProfileData();
      } else {
        Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
      }
    } catch (error) {
      Toast.show("axios error", Toast.SHORT);
    }
  }

  const axiosPostProfilDataGetRatting = async () => {
    try {
      const isConnected = await NetworkUtils.isNetworkAvailable()
      if (isConnected) {
        axiosPostSetProfileRattingData();
      } else {
        Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
      }
    } catch (error) {
      Toast.show("axios error", Toast.SHORT);
    }
  }


  const axiosPostSetProfileData = async () => {

    const storedLinkedId = await AsyncStorage.getItem('user_register_id');
    if (storedLinkedId !== null) {
      const url = 'https://rideshareandcourier.graphiglow.in/api/userInfo/userInfo';

      // Prepare data in JSON format
      const data = {
        id: JSON.parse(storedLinkedId),
      };

      // console.log("axiosPostSetDataGetInfo==>", data);

      await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200 &&
            response?.data?.message === 'User Information') {

            user_mobilenumber = response?.data?.matchingUsers[0]?.mobilenumber;
            user_email = response?.data?.matchingUsers[0]?.email;
            user_name = response?.data?.matchingUsers[0]?.username;
            user_img = response?.data?.matchingUsers[0]?.profile_image;

            // Example 
            // user_total = response?.data?.matchingUsers[0]?.username;

            setProfileName(user_name);
            setProfileEmail(user_email);
            setProfileNumber(user_mobilenumber);
            setProfileImage(user_img);

            // setRatedPerson("(" + user_name + ")");

            // Handle API response here
            // Toast.show("User Information Get Successfully!", Toast.SHORT);
          } else {
            // Toast.show('User Information Credentials Invalid', Toast.SHORT);
          }
        })
        .catch(error => {
          // Handle errors
          // Toast.show('User Information Credentials Invalid!', Toast.SHORT);
        });
    } else {

    }
  }

  const axiosPostSetProfileRattingData = async () => {

    const storedLinkedId = await AsyncStorage.getItem('user_register_id');

    console.log('storedLinkedId----->', storedLinkedId);

    if (storedLinkedId !== null) {


      const url = `https://rideshareandcourier.graphiglow.in/api/rattingCalculate/calculateRating/${JSON.parse(storedLinkedId)}`;

      await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200 &&
            response?.data?.message === 'Ratings calculated successfully') {

            user_averageRating = response?.data?.ratings?.averageRating;
            user_total = response?.data?.ratings?.numberOfRatings;


            setDefaultRating(user_averageRating);
            setRatedPerson("(" + user_total + ")");


            // user_mobilenumber = response?.data?.matchingUsers[0]?.mobilenumber;
            // user_email = response?.data?.matchingUsers[0]?.email;
            // user_name = response?.data?.matchingUsers[0]?.username;

            // setProfileName(user_name);
            // setProfileEmail(user_email);
            // setProfileNumber(user_mobilenumber);

            // Handle API response here
            // Toast.show("Rating Information Get Successfully!", Toast.SHORT);
          } else {
            // Toast.show('Rating Information Credentials Invalid', Toast.SHORT);
          }
        })
        .catch(error => {
          // Handle errors
          // Toast.show('Rating Information Credentials Invalid!', Toast.SHORT);
        });
    } else {

    }
  }

  const onPressAccountDelete = async () => {
    try {
      const isConnected = await NetworkUtils.isNetworkAvailable()
      if (isConnected) {
        axiosPostProfileAccountDelete();
      } else {
        Toast.show("Oops, something went wrong. Please check your internet connection and try again.", Toast.SHORT);
      }
    } catch (error) {
      Toast.show("axios error", Toast.SHORT);
    }
  }


  const axiosPostProfileAccountDelete = async () => {
    try {
      const storedLinkedId = await AsyncStorage.getItem('user_register_id');

      if (storedLinkedId !== null) {
        const userId = JSON.parse(storedLinkedId);

        const url = `https://rideshareandcourier.graphiglow.in/api/userAccountDelete/user/${userId}`

        await axios.delete(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.status === 200
              && response?.data?.message === 'User deleted successfully') {
              Toast.show('Account Successfully Deleted!', Toast.SHORT);
              BackHandler.exitApp();
            } else {
              Toast.show('Unable to Delete Account!', Toast.SHORT);
            }
          })
          .catch(error => {
            Toast.show('Unable to Delete Account!', Toast.SHORT);
          });
      } else {
        // Handle the case where storedLinkedId is null
      }
    } catch (error) {
      // Handle any errors that occur during AsyncStorage operations
    }
  };


  return (
    <SafeAreaView style={CommonStyle.commonFlex}>
      <StatusBarComponent
        backgroundColor={Colors.black} />
      <ScrollView style={CommonStyle.commonFlex}>
        <View style={Styles.container}>
          <View>
            <HeaderComponent
              margin={wp(3)}
              backgroundColorOpacity={Colors.circleGray}
              transform={[{ rotate: '180deg' }]}
              textAlign={"left"}
              color={Colors.white}
              fontFamily={Fonts.PoppinsRegular}
              fontWeight="500"
              title={"My Profile"}
              fontSize={wp(4)}
              colorRight={"white"}
              fontWeightRight="500"
              onPressEdit={() => Alert.alert('test')}
              isVisibleEditProfile={true}
              titleWithRightContent={"Edit Profile"}
              textAlignRight={"right"}
              fontFamilyRight={Fonts.PoppinsRegular}
              fontSizeRight={wp(4)}
              onPressRightEnd={() =>
                props.navigation.navigate('ProfileUpdateScreen', {
                  itemProfileName: isProfileName,
                  itemProfileEmail: isProfileEmail,
                  itemProfileNumber: isProfileNumber,
                  itemProfileImage: isProfileImage,
                })
              }
              onPress={() => props.navigation.goBack()}
            />
          </View>
          <View>
            <Image
              style={Styles.imageUser}
              resizeMode="contain"
              source={{ uri: isProfileImage }} />
            <TextComponent
              color={Colors.white}
              title={isProfileName}
              textDecorationLine={'none'}
              fontWeight="700"
              fontSize={wp(4)}
              fontFamily={Fonts.PoppinsRegular}
              textAlign='center'
              marginVertical={hp(2)}
            />
          </View>
          <View style={Styles.viewRatting}>

            <View style={Styles.customRatingBarStyle}>
              {maxRating.map((item, key) => {
                return (
                  <View style={CommonStyle.commonRow}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={item}
                      disabled={true}
                      onPress={() => setDefaultRating(item)}>
                      <Image
                        style={Styles.starImageStyle}
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

            <View>
              <TextComponent
                color={Colors.gray}
                title={RatedPerson}
                textDecorationLine={'none'}
                fontWeight="400"
                fontSize={wp(4)}
                fontFamily={Fonts.PoppinsRegular}
                textAlign='center'
                marginLeft={wp(2)}
              />
            </View>
          </View>

          <View style={Styles.viewBoxOne}>
            <TextComponent
              color={Colors.gray}
              title={ScreenText.Email}
              textDecorationLine={'none'}
              fontWeight="500"
              fontSize={wp(4)}
              fontFamily={Fonts.PoppinsRegular}
              textAlign='left'
              marginHorizontal={wp(4)}
              marginTop={wp(1)}
            />
            <TextComponent
              color={Colors.white}
              title={isProfileEmail}
              textDecorationLine={'none'}
              fontWeight="500"
              fontSize={wp(4)}
              fontFamily={Fonts.PoppinsRegular}
              textAlign='left'
              marginHorizontal={wp(4)}
            />
            <View style={Styles.viewBoxTwo}>
            </View>

            <TextComponent
              color={Colors.gray}
              title={ScreenText.Number}
              textDecorationLine={'none'}
              fontWeight="500"
              fontSize={wp(4)}
              fontFamily={Fonts.PoppinsRegular}
              textAlign='left'
              marginHorizontal={wp(4)}
              marginTop={wp(1)}
            />
            <TextComponent
              color={Colors.white}
              title={isProfileNumber}
              textDecorationLine={'none'}
              fontWeight="500"
              fontSize={wp(4)}
              fontFamily={Fonts.PoppinsRegular}
              textAlign='left'
              marginHorizontal={wp(4)}
            />
          </View>

          <View style={Styles.viewBoxThree}>
            <TouchableOpacity style={CommonStyle.commonRow}
              onPress={() =>
                props.navigation.navigate('NewPasswordScreen', {
                  itemEmailToChangePassword: isProfileEmail
                })
              }
            >
              <Image
                source={Images.lockIcon}
                resizeMode="contain"
                style={Styles.imageLoack}
              />
              <TextComponent
                color={Colors.white}
                title={ScreenText.ChangePassword}
                textDecorationLine={'none'}
                fontWeight="400"
                fontSize={wp(4)}
                fontFamily={Fonts.PoppinsRegular}
                textAlign='left'
                marginHorizontal={wp(2)}
              />
            </TouchableOpacity>

          </View>

          <View style={Styles.viewBoxFour}>

            <TouchableOpacity style={Styles.viewItemFour}
              onPress={() => props.navigation.navigate("HelpScreen")}>
              <Image
                style={Styles.imageHelpIcon}
                resizeMode="contain"
                source={Images.helpAndSupportIcon} />
              <TextComponent
                color={Colors.white}
                title={ScreenText.HelpAndSupport}
                textDecorationLine={'none'}
                fontWeight="400"
                fontSize={wp(4)}
                fontFamily={Fonts.PoppinsRegular}
                textAlign='left'
                marginHorizontal={wp(2)}
              />
              <View style={Styles.imageRightArrow}>
                <Image
                  style={Styles.textTermsAndCondition}
                  resizeMode="contain"
                  source={Images.rightArrowIcon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("EditPrivacyStack")}
              style={Styles.viewItemFour}>
              <Image
                style={Styles.imageHelpIcon}
                resizeMode="contain"
                source={Images.privacyIcon} />
              <TextComponent
                color={Colors.white}
                title={ScreenText.PrivacyPolicy}

                textDecorationLine={'none'}
                fontWeight="400"
                fontSize={wp(4)}
                fontFamily={Fonts.PoppinsRegular}
                textAlign='left'
                marginHorizontal={wp(2)}
              />
              <View style={Styles.imageRightArrow}>
                <Image
                  style={Styles.textTermsAndCondition}
                  resizeMode="contain"
                  source={Images.rightArrowIcon} />
              </View>

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("EditTermsStack")}
              style={Styles.viewItemFour}>
              <Image
                style={Styles.imageHelpIcon}
                resizeMode="contain"
                source={Images.rightIcon} />
              <TextComponent
                color={Colors.white}
                title={ScreenText.TermsAndCondition}

                textDecorationLine={'none'}
                fontWeight="400"
                fontSize={wp(4)}
                fontFamily={Fonts.PoppinsRegular}
                textAlign='left'
                marginHorizontal={wp(2)}
              />
              <View style={Styles.imageRightArrow}>
                <Image
                  style={Styles.textTermsAndCondition}
                  resizeMode="contain"
                  source={Images.rightArrowIcon} />
              </View>

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("EditAboutStack")}
              style={Styles.viewItemFour}>
              <Image
                style={Styles.imageHelpIcon}
                resizeMode="contain"
                source={Images.aboutIcon} />
              <TextComponent
                color={Colors.white}
                title={ScreenText.AboutUs}
                textDecorationLine={'none'}
                fontWeight="400"
                fontSize={wp(4)}
                fontFamily={Fonts.PoppinsRegular}
                textAlign='left'
                marginHorizontal={wp(2)}
              />
              <View style={Styles.imageRightArrow}>
                <Image
                  style={Styles.textTermsAndCondition}
                  resizeMode="contain"
                  source={Images.rightArrowIcon} />
              </View>

            </TouchableOpacity>
          </View>

          <View style={Styles.deleteAccount}>

            <TouchableOpacity
              style={CommonStyle.commonRow}
              onPress={onPressAccountDelete}>
              <Image
                source={Images.deleteIcon}
                resizeMode="contain"
                style={Styles.imageDeleteIcon}
              />
              <TextComponent
                color={Colors.red}
                title={ScreenText.DeleteAccount}
                textDecorationLine={'none'}
                fontWeight="400"
                fontSize={wp(4)}
                fontFamily={Fonts.PoppinsRegular}
                textAlign='left'
                marginHorizontal={wp(2)}
              />
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>


    </SafeAreaView>
  );
};

export default SettingScreen;
