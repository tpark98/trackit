import React, { useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Animated, ScrollView, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Product, Category } from "@/types/types";
import { users, purchases, emergencyContacts as initialEmergencyContacts, weeklyFinances } from "@/dummy/dummyData";

interface Props {
    products: Product[];
}

const Dashboard: React.FC<Props> = ({ products }) => {
    const screenWidth = Dimensions.get('window').width;
    const user = users.length > 0 ? users[0] : { firstName: "Guest" };

    console.log(products);

    // fade in values
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const productsOpacity = useRef(new Animated.Value(0)).current;
    const expiringOpacity = useRef(new Animated.Value(0)).current;
    const inventoryButtonOpacity = useRef(new Animated.Value(0)).current;
    const financialsButtonOpacity = useRef(new Animated.Value(0)).current;
    const emergencyButtonOpacity = useRef(new Animated.Value(0)).current;
    const financialsOpacity = useRef(new Animated.Value(0)).current;
    const emergencyContactsOpacity = useRef(new Animated.Value(0)).current;

    // states
    const [showInventory, setShowInventory] = useState(false);
    const [showFinancials, setShowFinancials] = useState(false);
    const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
    const [emergencyContacts, setEmergencyContacts] = useState(initialEmergencyContacts);
    const [newContactName, setNewContactName] = useState('');
    const [newContactPhone, setNewContactPhone] = useState('');
    const [newContactDesc, setNewContactDesc] = useState('');
    const [editingContact, setEditingContact] = useState(null);
    const [editContactName, setEditContactName] = useState('');
    const [editContactPhone, setEditContactPhone] = useState('');
    const [editContactDesc, setEditContactDesc] = useState('');

    const mostRecentWeek = weeklyFinances.length > 0 ? weeklyFinances[weeklyFinances.length - 1] : null;

    // sort stock
    const lowStockProducts = [...products].sort((a, b) => a.leftover - b.leftover).slice(0, 5);
    // sort expire
    const sortedByExpiration = [...products].sort((a, b) => new Date(a.expire).getTime() - new Date(b.expire).getTime());
    const expiringSoonProducts = sortedByExpiration.slice(0, 5);

    // fade ins
    const runFadeIn = () => {
        titleOpacity.setValue(0);
        subtitleOpacity.setValue(0);
        productsOpacity.setValue(0);
        expiringOpacity.setValue(0);
        inventoryButtonOpacity.setValue(0);
        financialsButtonOpacity.setValue(0);
        emergencyButtonOpacity.setValue(0);
        financialsOpacity.setValue(0);
        emergencyContactsOpacity.setValue(0);

        Animated.sequence([
            Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(subtitleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(inventoryButtonOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(financialsButtonOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(emergencyButtonOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        ]).start();
    };

    useEffect(() => {
        runFadeIn();
        return () => {
        };
    }, []);

    // format expiry date
    const formatExpirationDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    // format week
    const formatWeekStart = (weekRange: string) => {
        const startDateStr = weekRange.split(' to ')[0];
        const startDate = new Date(startDateStr);

        const options: Intl.DateTimeFormatOptions = {
            month: 'long',
            day: 'numeric'
        };

        return `${startDate.toLocaleDateString('en-US', options)}`;
    };

    const formatMonth = (weekRange: string) => {
        const startDateStr = weekRange.split(' to ')[0];
        const date = new Date(startDateStr);

        const options: Intl.DateTimeFormatOptions = {
            month: 'long'
        };

        return date.toLocaleDateString('en-US', options);
    };

    const validProducts = products.filter(product => {
        const used = product.purchased - product.leftover;
        const usagePercentage = (used / product.purchased) * 100;
        return usagePercentage >= 0;
    });

// purchased vs leftover graph
const renderInventoryComparisonGraph = () => {
    const sortedProducts = [...validProducts].sort((a, b) => a.product_name.localeCompare(b.product_name));
    const displayProducts = sortedProducts;

    const barWidth = 65;
    const chartWidth = Math.max(screenWidth, displayProducts.length * barWidth);

    const data = {
        labels: displayProducts.map(p => p.product_name.substring(0, 6)),
        datasets: [
            {
                data: displayProducts.map(p => p.purchased),
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                strokeWidth: 2.5,
            },
            {
                data: displayProducts.map(p => p.purchased - p.leftover),
                color: (opacity = 1) => `rgba(36, 197, 94, ${opacity})`,
                strokeWidth: 2.5,
            }
        ],
        legend: ["Purchased", "Sold"]
    };

    const chartConfig = {
        backgroundColor: '#f8fafd',
        backgroundGradientFrom: '#f8fafc',
        backgroundGradientTo: '#f1f5f9',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
        style: {
            borderRadius: 16,
            paddingRight: 16
        },
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#ffffff"
        },
        barPercentage: 0.7,
        propsForBackgroundLines: {
            strokeDasharray: '',
            strokeWidth: 0.5,
            stroke: 'rgba(203, 213, 225, 0.8)',
        },
        propsForLabels: {
            fontFamily: 'NexaHeavy',
            fontSize: 11,
        },
        paddingRight: 24,
        paddingTop: 16,
    };

    return (
        <View className="w-full">
            <Text className="text-m font-nexaHeavy mb-2 text-gray-600 text-center">
                Inventory Comparison: Purchased vs Sold
            </Text>
            <Text className="text-sm font-nexaHeavy mb-2 text-gray-600 text-center">
                Product Utilization Overview
            </Text>

            <View className="flex-row items-center justify-center mb-2">
                <View className="flex-row items-center mr-4">
                    <View className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
                    <Text className="text-xs font-nexaHeavy text-blue-600">Purchased</Text>
                </View>
                <View className="flex-row items-center">
                    <View className="w-3 h-3 rounded-full bg-green-500 mr-1" />
                    <Text className="text-xs font-nexaHeavy text-green-600">Sold</Text>
                </View>
            </View>

            <View className="bg-white p-4 rounded-xl shadow-sm">
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={{
                        paddingRight: 20,
                        height: 300,
                    }}
                >
                    <LineChart
                        data={data}
                        width={chartWidth > screenWidth ? chartWidth : screenWidth * 0.9}
                        height={250}
                        chartConfig={chartConfig}
                        bezier
                        style={{
                            borderRadius: 8,
                        }}
                        verticalLabelRotation={30}
                        fromZero={true}
                    />
                </ScrollView>
            </View>
        </View>
    );
};

// expense graph
const renderProductExpenseGraph = () => {
    const sortedProducts = [...validProducts].sort((a, b) => a.product_name.localeCompare(b.product_name));
    const displayProducts = sortedProducts.slice(0, 8);

    const barWidth = 65;
    const chartWidth = Math.max(screenWidth, displayProducts.length * barWidth);

    const data = {
        labels: displayProducts.map(p => p.product_name.substring(0, 6)),
        datasets: [
            {
                data: displayProducts.map(p => p.cost * p.purchased || 0),
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            }
        ],
    };

    const chartConfig = {
        backgroundColor: '#f8fafc',
        backgroundGradientFrom: '#f8fafc',
        backgroundGradientTo: '#f1f5f9',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
        style: {
            borderRadius: 16,
            paddingRight: 16
        },
        barPercentage: 0.7,
        propsForBackgroundLines: {
            strokeDasharray: '',
            strokeWidth: 0.5,
            stroke: 'rgba(203, 213, 225, 0.8)',
        },
        propsForLabels: {
            fontFamily: 'NexaHeavy',
            fontSize: 11,
        },
        paddingRight: 24,
        paddingTop: 16,
        formatYLabel: (value) => `${value}`,
        renderValuesOnTopOfBars: true,
        decorator: (data) => {
            return data.map(value => {
                return {
                    value: `${value.toFixed(2)}`,
                    position: 'top',
                    color: '#4B5563',
                    fontSize: 11,
                    fontFamily: 'NexaHeavy',
                }
            });
        },
    };

    return (
        <View className="w-full mt-6">
            <Text className="text-m font-nexaHeavy mb-2 text-gray-600 text-center">
                Product Expenses
            </Text>
            <Text className="text-sm font-nexaHeavy mb-2 text-gray-600 text-center">
                (Per Product)
            </Text>

            <View className="bg-white p-4 rounded-xl shadow-sm">
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    contentContainerStyle={{
                        paddingRight: 20,
                        height: 250,
                    }}
                >
                    <BarChart
                        data={data}
                        width={chartWidth > screenWidth ? chartWidth : screenWidth * 0.9}
                        height={250}
                        chartConfig={chartConfig}
                        style={{
                            borderRadius: 8,
                        }}
                        verticalLabelRotation={30}
                        fromZero={true}
                        showBarTops={true}
                        showValuesOnTopOfBars={true}
                        withInnerLines={true}
                        yAxisLabel="$"
                    />
                </ScrollView>
            </View>
        </View>
    );
};

// inventory stats
const renderInventoryStats = () => {
    const productStats = validProducts.map(product => {
        const used = product.purchased - product.leftover;
        const usagePercentage = (used / product.purchased) * 100;
        return {
            ...product,
            used,
            usagePercentage: isNaN(usagePercentage) ? 0 : usagePercentage
        };
    });
    const highestUsage = [...productStats].sort((a, b) => b.usagePercentage - a.usagePercentage).slice(0, 3);
    const lowestUsage = [...productStats].sort((a, b) => a.usagePercentage - b.usagePercentage).slice(0, 3);

    return (
        <>
            {/* highest usage */}
            <View className="bg-blue-50 rounded-xl p-4 mb-4 w-full">
                <Text className="text-base font-nexaHeavy mb-3 text-blue-700">
                    Highest Utilization Products
                </Text>

                {highestUsage.map((item) => (
                    <View
                        key={item.id}
                        className="flex-row justify-between items-center bg-white p-3 rounded-lg mb-2 shadow-sm w-full"
                    >
                        <Text className="text-gray-800 font-nexaExtraLight">{item.product_name}</Text>
                        <View className="bg-blue-100 px-3 py-1 rounded-full">
                            <Text className="text-blue-600 font-nexaHeavy text-sm">
                                {item.usagePercentage.toFixed(1)}% used
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* lowest usage */}
            <View className="bg-amber-50 rounded-xl p-4 mb-4 w-full">
                <Text className="text-base font-nexaHeavy mb-3 text-amber-700">
                    Lowest Utilization Products
                </Text>

                {lowestUsage.map((item) => (
                    <View
                        key={item.id}
                        className="flex-row justify-between items-center bg-white p-3 rounded-lg mb-2 shadow-sm w-full"
                    >
                        <Text className="text-gray-800 font-nexaExtraLight">{item.product_name}</Text>
                        <View className="bg-amber-100 px-3 py-1 rounded-full">
                            <Text className="text-amber-600 font-nexaHeavy text-sm">
                                {item.usagePercentage.toFixed(1)}% used
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Summary Stats */}
            <View className="bg-green-50 rounded-xl p-4 w-full">
                <Text className="text-base font-nexaHeavy mb-3 text-green-700">
                    Inventory Summary
                </Text>

                <View className="flex-row justify-between mb-4">
                    <View className="bg-white rounded-xl p-3 flex-1 mr-2 shadow-sm">
                        <Text className="text-s text-gray-500 font-nexaExtraLight">Total Items Purchased</Text>
                        <Text className="text-lg text-blue-600 font-nexaHeavy">
                            {validProducts.reduce((total, item) => total + item.purchased, 0).toLocaleString()}
                        </Text>
                    </View>
                    <View className="bg-white rounded-xl p-3 flex-1 ml-2 shadow-sm">
                        <Text className="text-s text-gray-500 font-nexaExtraLight">Total Items Sold</Text>
                        <Text className="text-lg text-green-600 font-nexaHeavy">
                            {validProducts.reduce((total, item) => total + item.purchased - item.leftover, 0).toLocaleString()}
                        </Text>
                    </View>
                </View>

                <View className="bg-white rounded-xl p-3 shadow-sm">
                    <Text className="text-s text-gray-500 font-nexaExtraLight">Overall Utilization Rate</Text>
                    <Text className="text-lg text-purple-600 font-nexaHeavy">
                        {(() => {
                            const totalPurchased = validProducts.reduce((total, item) => total + item.purchased, 0);
                            const totalLeftover = validProducts.reduce((total, item) => total + item.leftover, 0);
                            const used = totalPurchased - totalLeftover;
                            const rate = (used / totalPurchased) * 100;
                            return `${isNaN(rate) ? 0 : rate.toFixed(1)}%`;
                        })()}
                    </Text>
                </View>
            </View>
        </>
    );
};

    // drop downs
    const DropdownArrow = ({ isOpen, color }) => (
        <Text style={{ fontSize: 24, color: color || '#8B5CF6', fontWeight: '600' }}>
            {isOpen ? '▲' : '▼'}
        </Text>
    );

    // card toggling
    const toggleInventory = () => {
        setShowInventory(prev => {
            const newState = !prev;

            if (newState) {
                productsOpacity.setValue(0);
                expiringOpacity.setValue(0);
                Animated.sequence([
                    Animated.timing(productsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                    Animated.timing(expiringOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                ]).start();
            }

            return newState;
        });
    };

    const toggleFinancials = () => {
        setShowFinancials(prev => {
            const newState = !prev;

            if (newState) {
                financialsOpacity.setValue(0);
                Animated.timing(financialsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();
            }

            return newState;
        });
    };

    const toggleEmergencyContacts = () => {
        setShowEmergencyContacts(prev => {
            const newState = !prev;

            if (newState) {
                emergencyContactsOpacity.setValue(0);
                Animated.timing(emergencyContactsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();
            }

            return newState;
        });
    };

    // contact helpers
    const addEmergencyContact = () => {
        if (newContactName.trim() === '' || newContactPhone.trim() === '' || newContactDesc.trim() === '') {
            Alert.alert('Error', 'Please enter name, phone number, & description');
            return;
        }

        const newContact = {
            id: Date.now().toString(),
            name: newContactName,
            desc: newContactDesc,
            phone: newContactPhone
        };

        setEmergencyContacts([...emergencyContacts, newContact]);
        setNewContactName('');
        setNewContactDesc('');
        setNewContactPhone('');
    };

    const deleteEmergencyContact = (id: string) => {
        setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
    };

    const startEditing = (contact) => {
        setEditingContact(contact.id);
        setEditContactName(contact.name);
        setEditContactPhone(contact.phone);
    };

    const saveEditedContact = () => {
        if (editContactName.trim() === '' || editContactPhone.trim() === '') {
            Alert.alert('Error', 'Please enter both name & phone number');
            return;
        }

        setEmergencyContacts(emergencyContacts.map(contact =>
            contact.id === editingContact
                ? { ...contact, name: editContactName, phone: editContactPhone }
                : contact
        ));

        setEditingContact(null);
        setEditContactName('');
        setEditContactPhone('');
    };

    const cancelEditing = () => {
        setEditingContact(null);
        setEditContactName('');
        setEditContactPhone('');
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="px-4 min-h-screen w-full">
                    <View className="mt-8 mb-6 w-full">
                        <Animated.Text
                            style={{ opacity: titleOpacity }}
                            className="text-4xl font-nexaHeavy mb-2 text-gray-800 leading-snug"
                        >
                            Welcome, {user.firstName}!
                        </Animated.Text>

                        <Animated.Text
                            style={{ opacity: subtitleOpacity }}
                            className="text-xl font-nexaExtraLight ml-1 text-gray-500 mt-1"
                        >
                            Here's an overview of your inventory & financials
                        </Animated.Text>
                    </View>

                    {/* inventory card */}
                    <View className="bg-white rounded-3xl shadow-md p-5 mt-5 mb-10 w-full">
                        <Animated.View style={{ opacity: inventoryButtonOpacity }} className="w-full">
                            <TouchableOpacity
                                onPress={toggleInventory}
                                className="flex-row items-center justify-between py-3 mb-1 w-full"
                            >
                                <View className="flex-row items-center">
                                    <View className="w-1 h-6 bg-purple-500 rounded-full mr-3" />
                                    <Text className="text-gray-800 text-lg font-nexaHeavy">Inventory Status</Text>
                                </View>
                                <DropdownArrow isOpen={showInventory} color="#8B5CF6" />
                            </TouchableOpacity>
                        </Animated.View>

                        {showInventory && (
                            <View className="mt-2 mb-4 w-full">
                                <View className="bg-purple-50 rounded-xl p-4 mb-4 w-full">
                                    <Animated.Text
                                        style={{ opacity: productsOpacity }}
                                        className="text-base font-nexaHeavy mb-3 text-purple-700"
                                    >
                                        Low Stock Items
                                    </Animated.Text>

                                    {lowStockProducts.map((item) => (
                                        <Animated.View
                                            key={item.id}
                                            style={{ opacity: productsOpacity }}
                                            className="flex-row justify-between items-center bg-white p-3 rounded-lg mb-2 shadow-sm w-full"
                                        >
                                            <Text className="text-gray-800 font-nexaExtraLight">{item.product_name}</Text>
                                            <View className="bg-red-100 px-3 py-1 rounded-full">
                                                <Text className="text-red-600 font-nexaHeavy text-sm">{item.leftover} left</Text>
                                            </View>
                                        </Animated.View>
                                    ))}
                                </View>

                                <View className="bg-amber-50 rounded-xl p-4 w-full">
                                    <Animated.Text
                                        style={{ opacity: expiringOpacity }}
                                        className="text-base font-nexaHeavy mb-3 text-amber-700"
                                    >
                                        Expiring Soon
                                    </Animated.Text>

                                    {expiringSoonProducts.map((item) => (
                                        <Animated.View
                                            key={item.id}
                                            style={{ opacity: expiringOpacity }}
                                            className="flex-row justify-between items-center bg-white p-3 rounded-lg mb-2 shadow-sm w-full"
                                        >
                                            <Text className="text-gray-800 font-nexaExtraLight">{item.product_name}</Text>
                                            <View className="bg-amber-100 px-3 py-1 rounded-full">
                                                <Text className="text-amber-600 font-nexaHeavy text-sm">{formatExpirationDate(item.expire).split(',')[0]}</Text>
                                            </View>
                                        </Animated.View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>

                    {/* financials card - OVERHAULED */}
                    <View className="bg-white rounded-3xl shadow-md p-5 mb-10 w-full">
                        <Animated.View style={{ opacity: financialsButtonOpacity }} className="w-full">
                            <TouchableOpacity
                                onPress={toggleFinancials}
                                className="flex-row items-center justify-between py-3 mb-1 w-full"
                            >
                                <View className="flex-row items-center">
                                    <View className="w-1 h-6 bg-green-500 rounded-full mr-3" />
                                    <Text className="text-gray-800 text-lg font-nexaHeavy">Inventory Analysis</Text>
                                </View>
                                <DropdownArrow isOpen={showFinancials} color="#22c55e" />
                            </TouchableOpacity>
                        </Animated.View>

                        {showFinancials && (
                            <Animated.View style={{ opacity: financialsOpacity }} className="w-full">
                                <View className="mt-2 mb-2 w-full">
                                    <View className="flex-row justify-between mb-4 w-full">
                                        <View className="bg-blue-50 rounded-xl p-3 flex-1 mr-2">
                                            <Text className="text-s text-gray-500 font-nexaExtraLight">Total Purchased</Text>
                                            <Text className="text-lg text-blue-600 font-nexaHeavy">
                                                {products.reduce((total, item) => total + item.purchased, 0).toLocaleString()} units
                                            </Text>
                                        </View>
                                        <View className="bg-green-50 rounded-xl p-3 flex-1 ml-2">
                                            <Text className="text-s text-gray-500 font-nexaExtraLight">Total Leftover</Text>
                                            <Text className="text-lg text-green-600 font-nexaHeavy">
                                                {products.reduce((total, item) => total + item.leftover, 0).toLocaleString()} units
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="bg-white rounded-xl shadow-sm p-4 mb-6 w-full">
                                        {renderInventoryComparisonGraph()}
                                    </View>

                                    <View className="bg-white rounded-xl shadow-sm p-4 mb-6 w-full">
                                        {renderProductExpenseGraph()}
                                    </View>

                                    {renderInventoryStats()}
                                </View>
                            </Animated.View>
                        )}
                    </View>

                    {/* contacts card */}
<View className="bg-white rounded-3xl shadow-md p-5 mb-10 w-full">
    <Animated.View style={{ opacity: emergencyButtonOpacity }} className="w-full">
        <TouchableOpacity
            onPress={toggleEmergencyContacts}
            className="flex-row items-center justify-between py-3 mb-1 w-full"
        >
            <View className="flex-row items-center">
                <View className="w-1 h-6 bg-blue-500 rounded-full mr-3" />
                <Text className="text-gray-800 text-lg font-nexaHeavy">Emergency Contacts</Text>
            </View>
            <DropdownArrow isOpen={showEmergencyContacts} color="#3b82f6" />
        </TouchableOpacity>
    </Animated.View>

    {showEmergencyContacts && (
        <Animated.View style={{ opacity: emergencyContactsOpacity }} className="mt-2 mb-2 w-full">
            <View className="bg-blue-50 rounded-xl p-4 w-full">
                {emergencyContacts.map((contact) => (
                    <View
                        key={contact.id}
                        className="bg-white p-3 rounded-lg mb-2 shadow-sm w-full"
                    >
                        {editingContact === contact.id ? (
                            <View>
                                <TextInput
                                    className="bg-gray-100 p-2 rounded-lg mb-2"
                                    value={editContactName}
                                    onChangeText={setEditContactName}
                                    placeholder="Contact Name"
                                />
                                <TextInput
                                    className="bg-gray-100 p-2 rounded-lg mb-2"
                                    value={editContactDesc}
                                    onChangeText={setEditContactDesc}
                                    placeholder="Description (e.g., Plumber)"
                                />
                                <TextInput
                                    className="bg-gray-100 p-2 rounded-lg mb-2"
                                    value={editContactPhone}
                                    onChangeText={setEditContactPhone}
                                    placeholder="Phone Number"
                                    keyboardType="phone-pad"
                                />
                                <View className="flex-row justify-end">
                                    <TouchableOpacity
                                        onPress={cancelEditing}
                                        className="bg-gray-200 px-3 py-1 rounded-full mr-2"
                                    >
                                        <Text className="text-gray-700 text-sm">Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={saveEditedContact}
                                        className="bg-blue-500 px-3 py-1 rounded-full"
                                    >
                                        <Text className="text-white text-sm">Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View className="flex-row justify-between items-center">
                                <View className="flex-1">
                                    <Text className="text-gray-800 font-nexaHeavy">{contact.name}</Text>
                                    <Text className="text-gray-600 font-nexaExtraLight italic">{contact.desc}</Text>
                                    <Text className="text-gray-600 font-nexaExtraLight">{contact.phone}</Text>
                                </View>
                                <View className="flex-row">
                                    <TouchableOpacity
                                        onPress={() => startEditing(contact)}
                                        className="bg-blue-100 px-3 py-1 rounded-full mr-2"
                                    >
                                        <Text className="text-blue-600 text-sm">Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deleteEmergencyContact(contact.id)}
                                        className="bg-red-100 px-3 py-1 rounded-full"
                                    >
                                        <Text className="text-red-600 text-sm">Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                ))}

                <View className="mt-4 mb-2">
                    <Text className="text-base font-nexaHeavy mb-3 text-blue-700">Add New Contact</Text>

                    <View className="bg-white p-4 rounded-lg shadow-sm">
                        <TextInput
                            className="bg-gray-100 p-3 rounded-lg mb-3"
                            placeholder="Contact Name (e.g., Bobby)"
                            value={newContactName}
                            onChangeText={setNewContactName}
                            placeholderTextColor="#9CA3AF"
                        />
                        <TextInput
                            className="bg-gray-100 p-3 rounded-lg mb-3"
                            placeholder="Description (e.g., Plumber)"
                            value={newContactDesc}
                            onChangeText={setNewContactDesc}
                            placeholderTextColor="#9CA3AF"
                        />
                        <TextInput
                            className="bg-gray-100 p-3 rounded-lg mb-3"
                            placeholder="Phone Number"
                            value={newContactPhone}
                            onChangeText={setNewContactPhone}
                            keyboardType="phone-pad"
                            placeholderTextColor="#9CA3AF"
                        />

                        <TouchableOpacity
                            onPress={addEmergencyContact}
                            className="bg-blue-500 py-3 rounded-lg items-center"
                        >
                            <Text className="text-white font-nexaHeavy">Add Contact</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
    )}
</View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Dashboard;