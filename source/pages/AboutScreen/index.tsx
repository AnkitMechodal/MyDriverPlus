import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import TextComponent from '../../components/Text';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import { ScreenText } from '../../utils/index';
import Styles from './style';

type Props = {
    navigation: any
}

const Aboutcreen = (props: Props) => {
    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <ScrollView style={CommonStyle.commonFlex}>
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
                            title={"About Us"}
                            fontSize={wp(4)}
                            onPress={() => props.navigation.goBack()}
                        />
                    </View>

                    <View>
                        <TextComponent
                            color={Colors.white}
                            title={ScreenText.AboutUs}
                            textDecorationLine={'none'}
                            fontWeight="700"
                            fontSize={wp(5)}
                            fontFamily={Fonts.PoppinsRegular}
                            marginHorizontal={wp(5)}
                            textAlign='center'
                            marginVertical={hp(2)}
                        />
                    </View>

                    <View style={Styles.viewAbout}>
                    </View>

                    <View>
                        <TextComponent
                            color={Colors.white}
                            title={ScreenText.Loreum} // As HTML Contain
                            textDecorationLine={'none'}
                            fontWeight="600"
                            fontSize={wp(4)}
                            fontFamily={Fonts.PoppinsRegular}
                            textAlign='left'
                            marginHorizontal={wp(4)}
                            marginVertical={hp(2)}
                        />
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Aboutcreen;
