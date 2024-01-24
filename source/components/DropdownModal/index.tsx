import React, { useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, Images } from '../../themes';

const DropdownModal = ({ selectedValue,
    onSelect,
    SelectService,
    dataBook,
    sourceBook,
    selectedDataText,
    selectedDataImg }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const Images1 = {
        flagIcon: Images.whiteCardIcon,
        appIcon: Images.whiteCourierIcon,
        defaultIcon: Images.selectTypeIcon, // Replace 'defaultIcon' with your actual default icon
        // Add more options as needed
    };

    // const data = [
    //     { label: 'Taxi Booking', value: '1', img: Images1.flagIcon },
    //     { label: 'Courier Delivery', value: '2', img: Images1.appIcon },
    //     // Add more options as needed
    // ];

    const selectedData = dataBook.find(item => item.value === selectedValue);

    return (
        <View style={{
            alignSelf: 'center',
            borderColor: Colors.blue,
            borderWidth: wp(0.2),
            borderRadius: wp(2),
            width: wp(45),
        }}>
            <TouchableOpacity
                style={{
                    alignSelf: 'center',
                }}
                onPress={() => setModalVisible(true)}>
                {selectedValue ? (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: wp(2),// 10
                    }}>
                        <Image source={selectedData?.img}
                            resizeMode="contain"
                            style={{
                                width: wp(5),
                                height: wp(5), marginRight: 10
                            }} />
                        <Text style={{ color: 'white' }}>{selectedData?.label}</Text>
                        {/* selectedData?.label */}
                        {/* selectedData?.img */}
                    </View>
                ) : (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: wp(2),
                    }}>
                        <Image source={sourceBook}
                            resizeMode="contain"
                            style={{
                                width: wp(5),
                                height: wp(5),
                                marginRight: wp(2),
                            }} />
                        <Text style={{ color: 'white' }}>{SelectService}</Text>
                        <Image
                            resizeMode="contain"
                            source={Images.rightArrowIcon}
                            style={{
                                width: wp(7), // 25
                                height: wp(7),
                                // marginLeft: 10,
                                transform: [{ rotate: '90deg' }]
                            }} />
                    </View>
                )}
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{
                    alignSelf: 'flex-end',
                    marginHorizontal: wp(5),  // 35
                }}>
                    <View style={{
                        backgroundColor: 'gray',
                        height: "auto",
                        marginTop: wp(15), //52
                        padding: wp(1),
                        width: wp(40),
                    }}>
                        <FlatList
                            data={dataBook}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => { onSelect(item.value); setModalVisible(false); }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingVertical: wp(2),
                                    }}>
                                        <Image source={item.img}
                                            resizeMode="contain"
                                            style={{
                                                width: wp(5), // 20
                                                height: wp(5),
                                                marginRight: wp(3),
                                                alignSelf: 'center'
                                            }} />
                                        <Text style={{ color: Colors.white }}>{item.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DropdownModal;
