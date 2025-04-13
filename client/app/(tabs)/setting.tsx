import React, { useState } from 'react';
import { icons } from "@/constants/icons";
import { users } from "@/dummy/dummyData"

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    Button,
    ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const DropdownArrow = ({ isOpen, color }) => (
    <Text style={{ fontSize: 24, color: color || '#8B5CF6', fontWeight: '600' }}>
        {isOpen ? '▲' : '▼'}
    </Text>
);

const Setting = () => {
    const [profilePic, setProfilePic] = useState('https://gatech.edu');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const user = users.length > 0 ? users[0] : { firstName: "Guest" };
    const [name, setName] = useState(user.firstName);
    const [newName, setNewName] = useState(name);
    
    // Dropdown states
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState('Roswell');
    const storeOptions = ['Roswell', 'Midtown', 'Duluth'];

    const handleEditProfilePic = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            setProfilePic(result.assets[0].uri);
        }
    };

    const handleEditName = () => {
        setNewName(name);
        setEditModalVisible(true);
    };

    const handleSaveName = () => {
        setName(newName);
        setEditModalVisible(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectOption = (option) => {
        setSelectedStore(option);
        setIsDropdownOpen(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={handleEditProfilePic} style={styles.profilePicContainer}>
                    <Image style={styles.profilePic} source={icons.manager} />
                </TouchableOpacity>

                <View style={styles.infoContainer}>
                    <View style={styles.nameRow}>
                        <Text style={styles.nameText}>{name}</Text>
                        <TouchableOpacity onPress={handleEditName} style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.dropdownLabel}>Select Store:</Text>
                        <View style={styles.customDropdownContainer}>
                            <TouchableOpacity 
                                style={styles.dropdownHeader} 
                                onPress={toggleDropdown}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.selectedOptionText}>{selectedStore}</Text>
                                <DropdownArrow isOpen={isDropdownOpen} color={PURPLE} />
                            </TouchableOpacity>
                            
                            {isDropdownOpen && (
                                <View style={styles.dropdownOptionsList}>
                                    {storeOptions.map((option, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.dropdownOption,
                                                selectedStore === option && styles.selectedOption
                                            ]}
                                            onPress={() => selectOption(option)}
                                        >
                                            <Text 
                                                style={[
                                                    styles.dropdownOptionText,
                                                    selectedStore === option && styles.selectedOptionText
                                                ]}
                                            >
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Edit Name</Text>
                        <TextInput
                            style={styles.input}
                            value={newName}
                            onChangeText={setNewName}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
                            <Button title="Save" onPress={handleSaveName} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const PURPLE = '#6B21A8';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontFamily: 'nexa-heavy',
        fontSize: 28,
        marginBottom: 30,
        color: 'black',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePicContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#eee',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePic: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        marginLeft: 20,
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    nameText: {
        fontFamily: 'nexa-heavy',
        fontSize: 20,
    },
    editButton: {
        marginLeft: 10,
        backgroundColor: PURPLE,
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    editButtonText: {
        color: 'white',
        fontFamily: 'nexa-extralight',
        fontSize: 14,
    },
    dropdownContainer: {
        marginTop: 5,
    },
    dropdownLabel: {
        fontFamily: 'nexa-heavy',
        fontSize: 16,
        marginBottom: 5,
    },
    customDropdownContainer: {
        position: 'relative',
        zIndex: 1000,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        height: 45,
    },
    dropdownOptionsList: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#ccc',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 1001,
    },
    dropdownOption: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedOption: {
        backgroundColor: '#f0f0ff',
    },
    dropdownOptionText: {
        fontFamily: 'nexa-extralight',
        fontSize: 16,
        color: '#333',
    },
    selectedOptionText: {
        fontFamily: 'nexa-heavy',
        fontSize: 16,
        color: PURPLE,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontFamily: 'nexa-heavy',
        fontSize: 20,
        marginBottom: 10,
        color: PURPLE,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 20,
        fontFamily: 'nexa-extralight',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Setting;