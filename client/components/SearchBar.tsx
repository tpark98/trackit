import { Image, View, Text, TextInput } from 'react-native';
import React from 'react';
import { icons } from "@/constants/icons";

interface Props {
    placeholder: string,
    onChangeText: (text: string) => void,
}

const SearchBar = ({ placeholder, onChangeText }: Props) => {
    return (
        <View className="flex-row items-center bg-[#B48BCC] rounded-lg m-4 mt-16 px-6 py-3" style={{ backgroundColor: '#6B21A8' }}>
            <Image
                source={icons.search}
                className="w-6 h-6"
                resizeMode="contain"
                tintColor="white"
            />
            <TextInput
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#E6E6E6" // Lighter placeholder color for a softer look
                className="flex-1 ml-4 text-white text-m font-[Nexa-ExtraLight]"
            />
        </View>
    );
}

export default SearchBar;
