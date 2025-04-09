import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from "expo-router";
import React from 'react';

interface Props {
    id: number,
    title: string,
    setActiveTab: (tab: string) => void,
    handleCategorySelect: (id: number | null) => void,
}

const CategoryCard = ({ id, title, setActiveTab, handleCategorySelect }: Props) => {
    return (
        <Link href="/(tabs)/inventory" className="w-full" asChild>
            <TouchableOpacity
                className="bg-white rounded-3xl p-5 mt-5 mb-5 w-full"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 5, // For Android
                }}
                onPress={() => {
                    setActiveTab("Inventory");
                    handleCategorySelect(id);
                }}
            >
                <View className="flex-row items-center justify-center">
                    <Text className="text-[#6B21A8] text-center text-2xl font-[Nexa-Heavy]">{title}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default CategoryCard;
