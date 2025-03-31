import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    Button
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

const Setting = () => {
    const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
    const [name, setName] = useState('John Doe');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [newName, setNewName] = useState(name);
    const [storeLocation, setStoreLocation] = useState('Store 1');

    const handleEditProfilePic = () => {
        const options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                setProfilePic(uri);
            }
        });
    };

    const handleEditName = () => {
        setNewName(name);
        setEditModalVisible(true);
    };

    const handleSaveName = () => {
        setName(newName);
        setEditModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity
                    onPress={handleEditProfilePic}
                    style={styles.profilePicContainer}
                >
                    <Image style={styles.profilePic} source={{ uri: profilePic }} />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    <View style={styles.nameRow}>
                        <Text style={styles.nameText}>{name}</Text>
                        <TouchableOpacity onPress={handleEditName} style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Dropdown for store location */}
                    <View style={styles.dropdownContainer}>
                        <Picker
                            selectedValue={storeLocation}
                            onValueChange={(itemValue) => setStoreLocation(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Store 1" value="Store 1" />
                            <Picker.Item label="Store 2" value="Store 2" />
                            <Picker.Item label="Store 3" value="Store 3" />
                        </Picker>
                    </View>
                </View>
            </View>
            <Text style={styles.title}>Setting</Text>

            {/* Modal for editing name */}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50, // Adjust for status bar if needed
        paddingLeft: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePicContainer: {
        width: 150,          // Larger circle for the profile picture
        height: 150,
        borderRadius: 75,    // Creates a circle
        backgroundColor: '#ddd', // Fallback color
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
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    editButton: {
        marginLeft: 10,
        backgroundColor: '#007AFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    editButtonText: {
        color: 'white',
    },
    dropdownContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    picker: {
        height: 40,
        width: '100%',
    },
    title: {
        marginTop: 20,
        fontSize: 24,
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Setting;