import {View, Text} from 'react-native'
import React from 'react'
import {Stack} from "expo-router";

const _Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="detail"
                options={{ headerShown: false }}
            />
        </Stack>
    )
}
export default _Layout
