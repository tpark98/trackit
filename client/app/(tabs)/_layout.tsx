import {View, Image, StyleSheet, Text, ImageBackground} from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

const TabIcon = ({ focused, icon, title}: any) => {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                {/* Overlay */}
                <View className="absolute inset-0 bg-[#69286F]"/>
                <Image source={icon} className="size-5" style={{tintColor: "white"}}/>
                <Text className="text-boundary text-base font-semibold ml-2" style={{color: "white"}}>
                    {title}
                </Text>
            </ImageBackground>

        )
    }

    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor="black" className="size-5"/>
        </View>
    )
}

// 69286F
const _Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            },
            tabBarStyle: {
                backgroundColor: '#B48BCC',
                borderRadius: 50,
                marginHorizontal: 20,
                marginVertical: 10,
                height: 52,
                borderWidth: 1,
                borderColor: '#B48BCC',
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home" />
                    )
                }}
            />
            <Tabs.Screen
                name="inventory"
                options={{
                    title: 'Inventory',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.save} title="Inventory" />
                    )
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: 'Setting',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.person} title="Setting" />
                    )
                }}
            />
        </Tabs>
    )
}
export default _Layout
