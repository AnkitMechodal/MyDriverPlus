import React, { useRef, useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from "react-native-modal";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ButtonComponent from '../../components/Button/index';
import StatusBarComponent from '../../components/StatusBar';
import TextInputComponent from '../../components/TextInput';
import { Colors, Fonts, Images } from '../../themes';
import { ConstValue, ScreenText } from '../../utils';
import CommonStyle from '../../utils/commonStyle';
import Styles from './style';


const HomeScreen = ({ navigation }) => {

  const [isModalVisible, setModalVisible] = useState(true);

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


  return (
    <SafeAreaView style={CommonStyle.commonFlex}>
      <StatusBarComponent
        backgroundColor={Colors.black} />
      <View style={Styles.container}>
        <MapView
          style={Styles.viewMapview}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title="Marker Title"
            description="Marker Description"
          />
        </MapView>

        <View style={Styles.overlay}>
          <TouchableOpacity onPress={
            () => navigation.toggleDrawer()}
            style={Styles.viewBlackBackground}>
            <Image
              style={Styles.imageOpenIcon}
              resizeMode="contain"
              source={Images.openIcon} />
          </TouchableOpacity>

          <TextInputComponent
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
            color={Colors.white}
            backgroundColor={'transparent'}
            borderRadius={wp(2)}
            onChangeText={handleUserLocation}
            placeholderTextColor={Colors.white}
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
              onPress={() => Alert.alert('test')}
              fontFamily={Fonts.PoppinsRegular}
              alignSelf='center'
              textAlign='center'
              borderRadius={wp(2)}
              backgroundColor={Colors.blue}
            />
          </View>

        </View>

        <Modal
          isVisible={isModalVisible}
          style={Styles.modalContainer}
          onSwipeComplete={toggleModal}
          swipeDirection={['down']}>
          <View style={Styles.viewModal}>

            <View style={Styles.modalConainer}>
              <View>
                <View style={Styles.viewItem1}>
                  <Image
                    source={Images.whiteCardIcon}
                    resizeMode="contain"
                    style={Styles.viewItemImage1}
                  />
                </View>
                <Text style={Styles.textTexiBooking}>Taxi Booking</Text>
              </View>

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
        </Modal>

      </View >
    </SafeAreaView >
  );
};

export default HomeScreen;
