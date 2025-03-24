import {View, Text, Image, TouchableOpacity} from 'react-native'
import {Link} from "expo-router";
import React from 'react'

interface Props {
    title: string,
}

const CategoryCard = ({ title }: Props) => {
    return (
        <Link href="/(tabs)/inventory" className="mb-1 p-1" asChild>
            <TouchableOpacity className="bg-[#69286F] rounded-md  border-2 border-[#69286F] w-[100%] p-5">
                <Text className="text-center font-bold text-white text-3xl">{title}</Text>
            </TouchableOpacity>
        </Link>
    )
}
export default CategoryCard
