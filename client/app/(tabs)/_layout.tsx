import {View, Image, StyleSheet, Text, ImageBackground} from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import { useFonts } from 'expo-font';

const TabIcon = ({ focused, icon, title}: any) => {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row flex-1 min-h-12 justify-center items-center rounded-full overflow-hidden"
                style={[{ minWidth: 96 }, styles.glassyTab]}
            >
                <View className="absolute inset-0" style={styles.gradientOverlay} />
                <Image source={icon} className="size-4" style={{ tintColor: "white" }} />
                <Text className="text-white text-sm ml-2" style={styles.nexaHeavy}>
                    {title}
                </Text>
            </ImageBackground>
        )
    }

    return (
        <View className="size-full justify-center items-center rounded-full">
            <Image source={icon} className="size-4" style={{ tintColor: '#6B21A8' }} />
            <Text className="text-xs mt-1" style={[styles.nexaExtraLight, styles.tabText, { color: '#6B21A8' }]}>
                {title}
            </Text>
        </View>
    )

}

const _Layout = () => {
    const [fontsLoaded] = useFonts({
        'NexaHeavy': require('@/assets/fonts/Nexa-Heavy.ttf'),
        'NexaExtraLight': require('@/assets/fonts/Nexa-ExtraLight.ttf'),
    });

    if (!fontsLoaded) {
        return <View />;
    }

    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 15,
            },
            tabBarStyle: {
                backgroundColor: '#fff',
                borderRadius: 30,
                marginHorizontal: 24,
                marginVertical: 12,
                height: 60,
                elevation: 8,
                shadowColor: '#6B21A8',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                borderWidth: 0,
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
                        <TabIcon focused={focused} icon={icons.save} title="Items" />
                    )
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: 'Setting',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.person} title="Profile" />
                    )
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    nexaHeavy: {
        fontFamily: 'NexaHeavy',
    },
    nexaExtraLight: {
        fontFamily: 'NexaExtraLight',
    },
    gradientOverlay: {
        backgroundColor: '#6B21A8', // Purple color for the background (make sure to add the '#' for proper hex)
        borderRadius: 30,
        borderWidth: 0,  // Remove the border for no outlines
        borderColor: 'transparent', // Ensure there's no border color
        // Remove shadow properties to make the background plain
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        opacity: 1,
    },
    tabText: {
        width: '100%',
        textAlign: 'center',
    },
});


export default _Layout
