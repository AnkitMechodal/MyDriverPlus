import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { BackHandler, Image, SafeAreaView, ScrollView, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderComponent from '../../../components/Header';
import StatusBarComponent from '../../../components/StatusBar';
import TextComponent from '../../../components/Text';
import { Colors, Fonts, Images } from '../../../themes/index';
import { ScreenText } from '../../../utils/index';
import Styles from './style';


type Props = {
    navigation: any
}

const TermsAndCondition = (props: Props) => {
    const navigation = useNavigation();

    useEffect(() => {
        const backAction = () => {
            navigation.dispatch(
                CommonActions.navigate({
                    name: "Account",
                })
            )
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={Styles.container}>
            <StatusBarComponent
                backgroundColor={Colors.white} />

            <HeaderComponent
                margin={wp(5)}
                textAlign={"center"}
                backgroundColor={Colors.white}
                source={Images.arrowLeft}
                width={wp(5)}
                height={wp(5)}
                color={Colors.lightBlack}
                fontFamily={Fonts.InterRegular}
                fontWeight="500"
                title={ScreenText.TermsAndCondition}
                fontSize={wp(4)}
                onPress={() => props.navigation.goBack()}
            />

            <View style={Styles.viewCenetr}>
                <ScrollView alwaysBounceVertical={true}>
                    <TextComponent
                        color={Colors.accountText}
                        title={ScreenText.TermsAndConditionConatin}
                        textDecorationLine={'none'}
                        fontWeight="500"
                        fontSize={wp(4)}
                        fontFamily={Fonts.RobotoRegular}
                        textAlign='left'
                        letterSpacing={wp(0)} />
                    <Image source={Images.accountSign}
                        style={Styles.imageAccountSign}
                        resizeMode="contain" />
                </ScrollView>

            </View>

        </SafeAreaView>
    )
}

export default TermsAndCondition;