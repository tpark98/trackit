import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Link } from "expo-router";
import React from 'react';

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

    // format expiry date
    const formatExpirationDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    return (
        <Link
            href={{ pathname: "/inventory/detail", params: { id: product.id }}} asChild>
            <TouchableOpacity
                className="flex-row gap-4 mt-2 mb-2 p-4 rounded-3xl bg-white"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 5, // For Android
                }}
            >
                <Image
                    source={{ uri: `https://via.placeholder.co/100x100/1a1a1a/ffffff.png` }}
                    className="w-16 h-16 rounded-lg bg-white"
                />
                <View className="flex justify-center">
                    <Text className="text-[#6B21A8] font-[Nexa-Heavy] text-lg">{product.title}</Text>
                    <Text className="text-[#6B21A8] font-[Nexa-ExtraLight] text-sm">Quantity: {product.quantity} in batch</Text>
                    <Text className="text-[#6B21A8] font-[Nexa-ExtraLight] text-sm">Expiration: {formatExpirationDate(product.expiration)}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default ProductCard;
