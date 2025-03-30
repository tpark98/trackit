import {TextInput, View, Text, Image, TouchableOpacity} from 'react-native'
import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from 'expo-router';

const Detail = () => {
    const { id } = useLocalSearchParams();
    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expiration, setExpiration] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`http://${process.env["EXPO_PUBLIC_BACKEND_URL"]}:3000/products/${id}`);
            const data = await res.json();
            setTitle(data.product_name);
            setQuantity(String(data.leftover));
            setExpiration(data.expire.split("T")[0]);
        };

        if (id) fetchProduct();
    }, [id]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://${process.env["EXPO_PUBLIC_BACKEND_URL"]}:3000/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_name: title,
                    leftover: Number(quantity),
                    expire: expiration,
                }),
            });

            router.back();
        } catch (error) {
            console.error("Submit error:", error);
        }
    }

    return (
    <View className="p-4">
        <View className="bg-white rounded-xl p-4 shadow-md space-y-4">
            {/*<Image source={{ uri: `https://via.placeholder.co/150x150/1a1a1a/ffffff.png`}} className="w-full aspect-square rounded-lg bg-primary"/>*/}

            {/* Title */}
            <View>
                <Text className="text-sm text-gray-500 mb-1">Title</Text>
                <TextInput
                    className="text-xl font-bold border border-gray-300 rounded-md px-3 py-2"
                    value={title}
                    onChangeText={setTitle}
                />
            </View>

            {/* Quantity */}
            <View>
                <Text className="text-sm text-gray-500 mb-1">Quantity</Text>
                <TextInput
                    className="text-lg border border-gray-300 rounded-md px-3 py-2"
                    value={quantity}
                    onChangeText={setQuantity}
                />
            </View>

            {/* Expiration */}
            <View>
                <Text className="text-sm text-gray-500 mb-1">Expiration</Text>
                <TextInput
                    className="text-lg border border-gray-300 rounded-md px-3 py-2"
                    value={expiration}
                    onChangeText={setExpiration}
                />
            </View>

            {/* Buttons */}
            <View className="flex-row justify-end space-x-3 pt-2 gap-1">
                <TouchableOpacity
                    className="bg-gray-300 px-4 py-2 rounded-lg"
                    onPress={() => router.back()}
                >
                    <Text className="text-gray-800 font-semibold">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-[#69286F] px-4 py-2 rounded-lg"
                    onPress={handleSubmit}
                >
                    <Text className="text-white font-semibold">Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
}
export default Detail

