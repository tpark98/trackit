import {Image, View, Text, TouchableOpacity} from 'react-native'
import {Link} from "expo-router";
import React from 'react'


interface Product {
    id: number,
    title: string,
    quantity: number,
    expiration: string,
}

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    return (
        <Link
            href={{ pathname:"/inventory/detail", params: { id: product.id }}} asChild>
            <TouchableOpacity className="flex-row gap-5 mb-1 border-2 border-[#B48BCC] p-1">
                <Image source={{ uri: `https://via.placeholder.co/150x150/1a1a1a/ffffff.png`}} className="w-32 h-32 rounded-lg bg-primary"/>
                <View>
                    <Text className="font-bold">{product.title}</Text>
                    <Text>Quantity: {product.quantity} in batch</Text>
                    <Text>Expiration: {product.expiration}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}
export default ProductCard
