import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ButtonComponent from '../../../components/Button';
import StatusBarComponent from '../../../components/StatusBar';
import TextComponent from '../../../components/Text';
import { Colors, Fonts, Images } from '../../../themes/index';
import { useTheme } from '../../../utils/ThemeContext';
import CommonStyle from '../../../utils/commonStyle';
import { Slides, SlidesWhite } from '../../../utils/dummyArray';
import { ConstValue, ScreenText } from '../../../utils/index';

type Props = {
  navigation: any
}

const LoginScreen = (props: Props) => {

  // const isDarkMode = useisDarkMode();
  // const isDarkMode: 'light' | 'dark' = useisDarkMode();


  useEffect(() => {
    const checkAutoLogin = async () => {
      // Initialize GoogleSignin when the component mounts

      // Check Autologin
      const storedLinkedId = await AsyncStorage.getItem('user_register_id');
      console.log('storedLinkedId' + storedLinkedId);

      // Check if storedLinkedId is null, empty, or undefined
      if (storedLinkedId === null || storedLinkedId === '' || storedLinkedId === undefined) {
        // Auto-login is not possible, handle the logic accordingly
        console.log('Auto-login is not possible');
        // props.navigation.navigate('Home1');
      } else {
        // Auto-login is possible, you can proceed with the login logic
        console.log('Auto-login is possible');
        props.navigation.navigate('Home1');
      }
    };
    checkAutoLogin();

    // // Set interval to refresh every 10 seconds
    // const intervalId = setInterval(checkAutoLogin, 5 * 1000);

    // // Cleanup function
    // return () => {
    //   // Clear the interval when the component unmounts
    //   clearInterval(intervalId);
    // };

  }, []);



  const { isDarkMode, toggleTheme } = useTheme();



  const [showRealApp, setShowRealApp] = useState(false);
  const [visible, setVisible] = useState(true);

  const RenderSkipButton = ({ index, skipLabel }) => {
    return (
      <View style={CommonStyle.commonJustifyContent}>
        <View style={CommonStyle.commonContent}>
          <Text style={{
            fontSize: wp(4),
            color: isDarkMode === 'dark' ? Colors.white : Colors.black,
            justifyContent: 'center',
            marginHorizontal: wp(4),
            marginTop: wp(3)
          }}>
            {index === 0 ? '' : (skipLabel || ScreenText.Skip)}
          </Text>
        </View>
      </View>
    );
  };


  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Image
          style={styles.introImageStyle}
          resizeMode="contain"
          source={item.image} />
        <Text style={styles.introTitleStyle}
          numberOfLines={2}
          ellipsizeMode='tail'>
          {item.title}
        </Text>
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
      </View>
    );
  };


  const RenderItemWhite = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Image
          style={styles.introImageStyle}
          resizeMode="contain"
          source={item.image} />
        <Text style={styles.introTitleStylewhite}
          numberOfLines={2}
          ellipsizeMode='tail'>
          {item.title}
        </Text>
        <Text style={styles.introTextStyleWhite}>
          {item.text}
        </Text>
      </View>
    );
  };

  const RenderDoneButton = () => {
    return (
      <ButtonComponent
        heightBtn={hp(7)}
        widthBtn={wp(90)}
        isRightArrow={false}
        onPress={() => props.navigation.navigate("LoginSignUp")}
        color={isDarkMode === 'dark' ? Colors.white : Colors.black}
        title={ScreenText.GetStated}
        fontWeight="600"
        fontSize={wp(5)}
        fontFamily={Fonts.PoppinsSemiBold}
        alignSelf='center'
        textAlign='center'
        borderRadius={wp(2)}
        backgroundColor={Colors.blue}
      />
    )
  }

  const RenderNextButton = () => {
    return (
      <View style={styles.nextButtonContainer}>
        <View style={CommonStyle.justifyContent}>
          <TextComponent
            color={isDarkMode === 'dark' ? Colors.white : Colors.black}
            title={ScreenText.Next}
            textDecorationLine={'none'}
            fontWeight="400"
            fontSize={wp(4)}
            fontFamily={Fonts.PoppinsRegular}
            alignSelf='center'
            textAlign='center'
            marginHorizontal={wp(4)}
          />
        </View>
        <View style={styles.buttonNextContainer}>
          <Image
            style={styles.imageNext}
            resizeMode="contain"
            source={Images.arrowRight} />
        </View>
      </View>
    );
  };

  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
    props.navigation.navigate("LoginSignUp");
  };

  setTimeout(() => {
    HideSplashScreen();
  }, 3000);

  const HideSplashScreen = () => {
    setVisible(false)
  }


  let Splash_Screen = (

    <View style={styles.splashRootView}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDarkMode === 'dark' ? Colors.black : Colors.white,
        flex: ConstValue.value1,
      }}>
        <StatusBarComponent
          backgroundColor={isDarkMode === 'dark' ? Colors.black : Colors.white} />
        <View>
          {isDarkMode === 'dark' ? (
            <Image
              source={Images.appIcon}
              resizeMode="contain"
              style={styles.imageAppIcon}
            />
          ) : (
            <Image
              source={Images.appIconWhite}
              resizeMode="contain"
              style={styles.imageAppIcon}
            />
          )}
        </View>

        {/* <View>
          <Image source={Images.appIcon}
            resizeMode="contain"
            style={styles.imageAppIcon}
          />
        </View> */}
      </View>
    </View>

  )


  return (
    <SafeAreaView style={CommonStyle.commonFlex}>
      <StatusBarComponent
        backgroundColor={isDarkMode === 'dark' ? Colors.black : Colors.white} />

      <View style={{
        flex: 1,
        backgroundColor: isDarkMode === 'dark' ? Colors.black : Colors.white
      }}>
        <AppIntroSlider
          data={isDarkMode === 'dark' ? Slides : SlidesWhite}
          renderItem={isDarkMode === 'dark' ? RenderItem : RenderItemWhite}
          onDone={onDone}
          showSkipButton={true}
          skipLabel={ScreenText.Skip}  // Make sure you have this line // styles.viewLoginSub1
          onSkip={onSkip}
          renderDoneButton={RenderDoneButton}
          renderNextButton={RenderNextButton}
          renderSkipButton={(props: any) => <RenderSkipButton {...props} />}
          dotStyle={isDarkMode === 'dark' ? styles.dotStyleView : styles.dotStyleViewWhite}
          activeDotStyle={isDarkMode === 'dark' ? styles.activeDotStyle : styles.activeDotStyleWhite}
        />
      </View>
      {visible === true && Platform.OS === 'android' ? Splash_Screen : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashRootView:
  {
    justifyContent: 'center',
    flex: ConstValue.value1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.black,
  },
  dotStyleView:
  {
    backgroundColor: Colors.white,
    width: wp(2),
    height: wp(2),
    marginBottom: hp(30),
  },
  activeDotStyle: {
    marginBottom: hp(30),
    backgroundColor: Colors.blue,
    width: wp(2),
    height: wp(2),
  },

  dotStyleViewWhite:
  {
    backgroundColor: Colors.black,
    width: wp(2),
    height: wp(2),
    marginBottom: hp(30),
  },
  activeDotStyleWhite: {
    marginBottom: hp(30),
    backgroundColor: Colors.blue,
    width: wp(2),
    height: wp(2),
  },
  // splashChildView: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: isDarkMode === 'dark' ? Colors.black : Colors.white,
  //   flex: ConstValue.value1, // Replace with an actual numeric value if ConstValue.value1 is not a number
  // },

  mainContainer:
  {
    flex: ConstValue.value1,
    backgroundColor: Colors.black,
  },
  imageAppIcon: {
    width: wp(50),
    height: wp(50),
    alignSelf: 'center',
  },
  viewLogin: {
    justifyContent: 'center',
    flex: ConstValue.value1,
  },
  viewMargin: {
    margin: wp(5),
    marginVertical: wp(30),
  },
  viewLoginSub1: {
    flex: 1,
    backgroundColor: Colors.white
  },
  viewLoginSub2: {
    flex: 1,
    backgroundColor: Colors.black,
    alignSelf: 'center'
  },
  viewLoginSub3: {
    backgroundColor: Colors.black,
    alignSelf: 'center'
  },
  introImageStyle: {
    width: wp(75),
    height: wp(50),
  },
  imageNext: {
    width: wp(7),
    height: wp(7),
  },
  textSkip: {
    fontSize: wp(4),
    color: Colors.white,
    justifyContent: 'center',
    marginHorizontal: wp(4),
    marginTop: wp(3)
  },
  introTextStyle: {
    fontSize: wp(3.5),
    color: Colors.white,
    textAlign: 'center',
    marginVertical: wp(8),
    marginHorizontal: wp(8),
    fontFamily: Fonts.PoppinsRegular,
    fontWeight: '400',
  },
  introTextStyleWhite: {
    fontSize: wp(3.5),
    color: Colors.black,
    textAlign: 'center',
    marginVertical: wp(8),
    marginHorizontal: wp(8),
    fontFamily: Fonts.PoppinsRegular,
    fontWeight: '400',
  },
  nextButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonNextContainer: {
    backgroundColor: Colors.blue,
    borderRadius: wp(10),
    padding: wp(2),
  },
  textNext: {
    fontSize: wp(4),
    color: Colors.white,
    justifyContent: 'center',
    marginHorizontal: wp(4)
  },
  introTitleStyle: {
    fontSize: wp(4),
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.white,
    marginTop: hp(4)
  },
  introTitleStylewhite: {
    fontSize: wp(4),
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: Fonts.PoppinsRegular,
    color: Colors.black,
    marginTop: hp(4)
  },

})
export default LoginScreen;

