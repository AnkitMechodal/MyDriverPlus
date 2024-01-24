import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DriverRequestListCustom from '../../components/DriverRequestList';
import HeaderComponent from '../../components/Header/index';
import StatusBarComponent from '../../components/StatusBar';
import { Colors, Fonts, Images } from '../../themes/index';
import CommonStyle from '../../utils/commonStyle';
import { RequestData } from '../../utils/dummyArray';
import Styles from './style';


type Props = {
    navigation: any
}

const ViewRequestScreen = (props: Props) => {
    return (
        <SafeAreaView style={CommonStyle.commonFlex}>
            <StatusBarComponent
                backgroundColor={Colors.black} />
            <ScrollView style={Styles.container}>
                <View style={Styles.container}>
                    <View>
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
                            title={"View Request"}
                            fontSize={wp(4)}
                            onPress={() => props.navigation.goBack()}
                        />
                    </View>

                    <View>
                        <DriverRequestListCustom
                            onPressAccept={() => props.navigation.navigate("ViewRequestDetails")}
                            data={RequestData} />
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    )

}

export default ViewRequestScreen;