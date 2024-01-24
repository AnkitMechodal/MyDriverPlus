import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FAQListComponent from '../../components/FAQList/index';
import HeaderComponent from '../../components/Header';
import StatusBarComponent from '../../components/StatusBar';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import { FAQData } from '../../utils/dummyArray';
import Styles from './style';

type Props = {
    navigation: any
}

const FAQScreen = (props: Props) => {
    const navigation = useNavigation();

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
                            title={"FAQ"}
                            fontSize={wp(4)}
                            onPress={() => navigation.goBack()}
                        />
                    </View>

                    {/* <View style={Styles.viewQuestion}>
                        <TextComponent
                            color={Colors.white}
                            title={ScreenText.LoremIpsumissimplydummytext}
                            textDecorationLine={'none'}
                            fontWeight="600"
                            fontSize={wp(4)}
                            fontFamily={Fonts.PoppinsSemiBold}
                            marginHorizontal={wp(5)}
                            textAlign='left'
                            marginVertical={hp(2)}
                        />

                    </View>

                    <View style={Styles.viewDesc}>
                        <Text style={Styles.viewDescrition}>{ScreenText.Loreum}</Text>
                    </View> */}

                    <FAQListComponent
                        data={FAQData}
                    />

                </View>
            </ScrollView>


        </SafeAreaView>
    );
};

export default FAQScreen;
