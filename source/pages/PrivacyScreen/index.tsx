// import React from 'react';
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import WebView from "react-native-webview";
import HeaderComponent from '../../components/Header';
import StatusBarComponent from "../../components/StatusBar";
import TextComponent from '../../components/Text';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import { ScreenText } from '../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}

const PrivacyScreen = (props: Props) => {

    const [loadingError, setLoadingError] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <SafeAreaView style={CommonStyle.commonFlex}>
                    <StatusBarComponent
                        backgroundColor={Colors.black} />

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
                            title={"Privacy Policy"}
                            fontSize={wp(4)}
                            onPress={() => props.navigation.goBack()}
                        />
                    </View>

                    <View>
                        <TextComponent
                            color={Colors.white}
                            title={ScreenText.PrivacyPolicy}
                            textDecorationLine={'none'}
                            fontWeight="700"
                            fontSize={wp(5)}
                            fontFamily={Fonts.PoppinsRegular}
                            marginHorizontal={wp(5)}
                            textAlign='center'
                            marginVertical={hp(2)}
                        />
                    </View>


                    {loadingError ? (
                        <Text style={{
                            color: 'white',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            fontSize: wp(5),
                            marginVertical: wp(50),
                            fontFamily: Fonts.MontserratMedium,
                            flex: 1
                        }}>Unable To Load Content</Text>
                    ) : (
                        <WebView
                            source={{ uri: 'https://rideshareandcourier.graphiglow.in/public/Policy' }}
                            style={{ flex: 1 }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            onError={() => setLoadingError(true)}
                        />
                    )}

                </SafeAreaView>
            </View>
        </View>
    )
}

export default PrivacyScreen;

