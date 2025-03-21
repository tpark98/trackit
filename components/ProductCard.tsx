import {Image, View, Text} from 'react-native'
import React from 'react'

interface Props {
    id: number,
    title: string,
    quantity: number,
    expiration: string,
}

const ProductCard = ({id, title, quantity, expiration}: Props) => {
    return (
        <View className="flex-row gap-5 mb-1 border-2 border-[#B48BCC] p-1">
            <Image source={{ uri: `https://via.placeholder.co/150x150/1a1a1a/ffffff.png`}} className="w-32 h-32 rounded-lg bg-primary"/>
            <View>
                <Text className="font-bold">{title}</Text>
                <Text>Quantity: {quantity} in batch</Text>
                <Text>Expiration: {expiration}</Text>
            </View>
        </View>
    )
}
export default ProductCard
