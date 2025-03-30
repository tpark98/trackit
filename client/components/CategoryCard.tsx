import {View, Text, Image, TouchableOpacity} from 'react-native'
import {Link} from "expo-router";
import React from 'react'
import {set} from "yaml/dist/schema/yaml-1.1/set";

interface Props {
    id: number,
    title: string,
    setActiveTab: (tab: string) => void,
    handleCategorySelect: (id: number | null) => void,
}

const CategoryCard = ({ id, title, setActiveTab, handleCategorySelect }: Props) => {
    return (
        <Link href="/(tabs)/inventory" className="mb-1 p-1" asChild>
            <TouchableOpacity
                className="bg-[#69286F] rounded-md  border-2 border-[#69286F] w-[100%] p-5"
                onPress={() => {
                    setActiveTab("Inventory")
                    handleCategorySelect(id)
                }}
            >
                <Text className="text-center font-bold text-white text-3xl">{title}</Text>
            </TouchableOpacity>
        </Link>
    )
}
export default CategoryCard
