import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Images } from '../../themes';

const CustomDropdownSelect = ({ options, handleOptionSelect,
    selectedOption, modalVisible, openModal, closeModal }) => {

    // 00
    // const [modalVisible, setModalVisible] = useState(false);
    // // const [selectedOption, setSelectedOption] = useState(null);

    // const openModal = () => {
    //     setModalVisible(true);
    // };

    // const closeModal = () => {
    //     setModalVisible(false);
    // };
    // 00

    // const handleOptionSelect = (option) => {
    //     setSelectedOption(option);
    //     closeModal();
    // };

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                height: 'auto',
                borderRadius: wp(3),
                padding: wp(4),
                width: wp(89),
                backgroundColor: Colors.grayDrawerBg
            }}>

                <TouchableOpacity onPress={openModal}
                    style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                        source={Images.seatUser} // Replace with your down arrow image
                        resizeMode="contain"
                        style={{
                            width: wp(5), height: wp(5), marginTop: wp(1),
                            tintColor: Colors.grayDark
                        }}
                    />
                    <TouchableOpacity style={styles.dropdownButton}>

                        <Text style={{ color: "gray", fontSize: wp(4) }}>
                            {selectedOption ? selectedOption.labelSeat : "Select No of seats"}
                            {/* {selectedOption ? selectedOption.labelSeat : hint} */}
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}>
                        <Image
                            source={Images.downArrow} // Replace with your down arrow image
                            resizeMode="contain"
                            style={{ width: wp(4), height: wp(4), marginTop: wp(1), alignSelf: 'flex-end' }}
                        />
                    </View>

                </TouchableOpacity>

            </View>

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
                swipeDirection={"down"}
                style={{ marginTop: wp(90) }}
            >
                <View style={styles.modal}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            onPress={() => handleOptionSelect(option)}
                            style={styles.optionItem}
                        >
                            <Text style={{
                                color: "gray",
                                fontSize: wp(4)
                            }}>{option.labelSeat || "Select No of seats"}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        marginHorizontal: wp(2),
        marginVertical: wp(2)
    },
    dropdownButton: {
        borderColor: 'black',
        marginHorizontal: wp(2)
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    optionItem: {
        padding: wp(4),
        backgroundColor: Colors.grayDrawerBg,
        width: wp(70),
    },
});

export default CustomDropdownSelect;
