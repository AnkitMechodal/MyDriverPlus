import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Images } from "../../themes/index";
import { useTheme } from '../../utils/ThemeContext';
import Styles from "./style";

const CustomDropdown = ({
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
    // const isDarkMode = useisDarkMode();

    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <View style={{
            borderColor:
                borderColor, borderWidth: borderWidth,
            borderRadius: borderRadius,
        }}>
            <TouchableOpacity style={Styles.button} onPress={toggleDropdown}>

                {isArrowLeft ?
                    <View style={{
                        // marginLeft: wp(2), // Styles.imageDownArrow
                        justifyContent: 'center',
                        marginTop: wp(2)
                    }}>
                        <Image
                            source={Images.downArrow}
                            resizeMode="contain"
                            style={{
                                width: wp(4),
                                height: wp(4),
                                alignSelf: 'center',
                                marginRight: wp(2),
                                tintColor: isDarkMode === 'dark' ? Colors.white : Colors.grayDark,
                            }}
                        />
                    </View>
                    : null
                }
                <Image
                    source={selectedImage || Images.downArrow}
                    resizeMode="contain"
                    style={Styles.imageSelected} //
                />
                <Text style={{
                    color: isDarkMode === 'dark' ? Colors.gray : Colors.grayDark,
                    marginTop: wp(1.5)
                }}>
                    {selected || 'Select'}
                </Text>

                {renderDropdown()}

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

export default CustomDropdown;
