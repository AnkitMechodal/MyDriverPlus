import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Images } from "../../themes/index";
import Styles from "./style";

const CustomDropdownBooking = ({
    selectedImage,
    selected,
    toggleDropdown,
    renderDropdown,
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
            <TouchableOpacity
                style={Styles.button}
                onPress={toggleDropdown}>

                {isArrowLeft ?
                    <View style={{
                        // marginLeft: wp(2),
                        justifyContent: 'center',
                        marginTop: wp(2)
                    }}>
                        <Image
                            source={Images.downArrow}
                            resizeMode="contain"
                            style={Styles.imageDownArrow}
                        />
                    </View>
                    : null
                }
                <Image
                    source={selectedImage || Images.downArrow}
                    resizeMode="contain" // contain
                    style={Styles.imageSelected} //
                />
                <Text style={Styles.textLabel}>
                    {selected || 'Select Option'}
                </Text>

                {renderDropdown()}

                {isArrow ?
                    <View style={{
                        marginLeft: wp(5), // 2
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

export default CustomDropdownBooking;
