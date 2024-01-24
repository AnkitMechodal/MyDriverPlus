import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Images } from "../../themes/index";
import Styles from "./style";

const CustomDropdownSeatNo = ({
    selectedImage,
    selectedLabel,
    toggleDropdownLabel,
    renderDropdownLabel,
    borderColor,
    borderWidth,
    borderRadius,
    isArrow,
    isArrowLeft
}) => {
    return (
        <View style={{
            borderColor:
                borderColor, borderWidth: borderWidth,
            borderRadius: borderRadius,
        }}>
            <TouchableOpacity style={Styles.button} onPress={toggleDropdownLabel}>
                <Text style={Styles.textLabel}>
                    {selectedLabel || 'Select No of seats'}
                </Text>

                {renderDropdownLabel()}

                {isArrow ?
                    <View style={{
                        marginLeft: wp(2),
                        justifyContent: 'center',
                        marginTop: wp(2)
                    }}>
                        <Image
                            source={Images.bookingBackIcon}
                            resizeMode="contain"
                            style={Styles.imageBookingDownArrow}
                        />
                    </View>
                    : null
                }
            </TouchableOpacity>
        </View>

    );
};

export default CustomDropdownSeatNo;
