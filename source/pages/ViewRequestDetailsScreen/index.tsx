import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ButtonComponent from '../../components/Button';
import HeaderComponent from '../../components/Header/index';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text';
import VehiclePhotosListDetails from '../../components/VehiclePhotosList';
import { Colors, Fonts, Images } from '../../themes/index';
import { ScreenText } from '../../utils';
import CommonStyle from '../../utils/commonStyle';
import { CarData } from '../../utils/dummyArray';
import Styles from './style';


type Props = {
    navigation: any
}

const ViewRequestDetailsScreen = (props: Props) => {

    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [defaultRating, setDefaultRating] = useState(4);

    const starImageFilled1 =
        Images.fillstarIcon; // fillStarIcon
    const starImageCorner1 =
        Images.unfillstarIcon; // unfillStarIcon

    const starImageFilled =
        Images.fillStarIcon;
    const starImageCorner =
        Images.unfillStarIcon;

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
                            onPress={() => props.navigation.goBack()}
                        />
                    </View>

                    <View>
                        <View
                            style={Styles.bottamClickContain}>

                            <View style={CommonStyle.justifyContent}>
                                <Image
                                    style={Styles.imageStop}
                                    resizeMode="contain"
                                    source={Images.driverDeatilsIcon} />
                            </View>

                            <View style={{
                                flex: 1
                            }}>
                                <TextComponent
                                    color={Colors.white}
                                    title={ScreenText.UserName}
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
                                            title={ScreenText.TopRated2K}
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
                                <Image
                                    style={Styles.imageCall}
                                    resizeMode="contain"
                                    source={Images.callIcon} />
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

                    <View>
                        <VehiclePhotosListDetails
                            data={CarData} />
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
                                title={"Crash Test Dummy"}
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
                                title={"yellow"}
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
                                title={"GJ 03 5245"}
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
                                title={"4"}
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
                            title={ScreenText.Loreum}
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
                                title={ScreenText.RS100}
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
                                title={ScreenText.Mins30}
                                textDecorationLine={'none'}
                                fontWeight="400"
                                fontSize={wp(3.5)}
                                marginLeft={wp(2)}
                                fontFamily={Fonts.PoppinsRegular}
                                textAlign='left'
                            />
                        </View>

                    </View>

                    <View style={CommonStyle.commonJustifyContent}>
                        <ButtonComponent
                            isVisibleMobile={false}
                            isVisibleFaceBook={false}
                            marginVertical={hp(2)}
                            heightBtn={hp(6)}
                            widthBtn={wp(40)}
                            isRightArrow={false}
                            color={Colors.white}
                            title={ScreenText.Accept}
                            marginHorizontal={wp(2)}
                            fontWeight="500"
                            fontSize={wp(4)}
                            onPress={() => Alert.alert("Accept")}
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
                            onPress={() => props.navigation.goBack()}
                            fontFamily={Fonts.PoppinsRegular}
                            alignSelf='center'
                            textAlign='center'
                            borderRadius={wp(2)}
                            backgroundColor={Colors.orange}
                        />
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView >
    )

}

export default ViewRequestDetailsScreen;