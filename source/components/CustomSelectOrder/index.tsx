// CustomSelectOrder.js

import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Images } from '../../themes';
import Styles from './style';

const CustomSelectOrder = ({
    options,
    selectedLabel,
    modalVisibleProp,
    handleOptionSelectProp,
    onRequestCloseProp,
}) => {
    const [modalVisible, setModalVisible] = useState(modalVisibleProp || false);
    const [selectedOption, setSelectedOption] = useState(null);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        onRequestCloseProp && onRequestCloseProp(); // Call the parent's onRequestClose function if provided
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        handleOptionSelectProp(option);
        closeModal();
    };

    return (
        <View style={styles.container}>
            <View style={Styles.viewSelectTypeConatiner}>
                <TouchableOpacity onPress={openModal} style={Styles.viewOpenModal}>
                    <TouchableOpacity style={styles.dropdownButton}>
                        <Text style={{ color: Colors.gray, fontSize: wp(4) }}>
                            {selectedOption ? selectedOption.labelSeat : selectedLabel || "Select Order type"}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Image
                            source={Images.downArrow}
                            resizeMode="contain"
                            style={Styles.viewDownArrow}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
                swipeDirection={'down'}
                style={Styles.viewModal}
            >
                <View style={styles.modal}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            onPress={() => handleOptionSelect(option)}
                            style={styles.optionItem}
                        >
                            <Text style={Styles.textHint}>{option.labelSeat || 'Select No of seats'}</Text>
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
        marginVertical: wp(2),
    },
    dropdownButton: {
        borderColor: 'black',
        marginHorizontal: wp(2),
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: wp(80),
    },
    optionItem: {
        padding: wp(4),
        backgroundColor: Colors.grayDrawerBg,
        width: wp(80),
        justifyContent: 'center'
    },
});

export default CustomSelectOrder;
