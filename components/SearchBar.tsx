import {Image, View, Text, TextInput} from 'react-native'
import React from 'react'
import {icons} from "@/constants/icons";

interface Props {
    placeholder: string,
    onChangeText: (text: string) => void,
}

const SearchBar = ({placeholder, onChangeText}: Props) => {
    return (
        <View  className="flex-row items-center bg-dark-200 rounded-md m-3 px-8 py-3" style={{backgroundColor: '#B48BCC'}}>
            <Image source={icons.search} className="size-7" resizeMode="contain" tintColor="black"/>
            <TextInput
                onChangeText={onChangeText}
                placeholder={placeholder}
                // value=""
                className="flex-1 ml-2 text-white text-lg"
            />
        </View>
    )
}
export default SearchBar
