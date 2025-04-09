import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

const ActiveTab = ({activeTab, setActiveTab, tabName}: any) => {
    return (
        <TouchableOpacity
            onPress={()=> setActiveTab(tabName)}
            className="flex-1 items-center pb-2"
        >
            <Text
                className={`text-lg font-bold ${activeTab === tabName ? "text-black" : "text-gray-400"}`}
                style={{ fontFamily: 'Nexa-Heavy' }}
            >
                {tabName}
            </Text>

            {activeTab === tabName && <View className="h-[3px] w-28 bg-black mt-1"/>}
        </TouchableOpacity>
    )
}
export default ActiveTab
