import React, { useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Animated, ScrollView, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Product, Category } from "@/types/types";
import { users, purchases, emergencyContacts as initialEmergencyContacts, weeklyFinances } from "@/dummy/dummyData";

interface Props {
    products: Product[];
}

const Dashboard: React.FC<Props> = ({ products }) => {
    const screenWidth = Dimensions.get('window').width;
    const user = users.length > 0 ? users[0] : { firstName: "Guest" };

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
    const [editingContact, setEditingContact] = useState(null);
    const [editContactName, setEditContactName] = useState('');
    const [editContactPhone, setEditContactPhone] = useState('');

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

    // line chart
    const barWidth = 60;
    const chartWidth = Math.max(screenWidth, purchases.length * barWidth);
    const sortedPurchases = [...purchases].sort((a, b) => a.name.localeCompare(b.name));

    const data = {
        labels: sortedPurchases.map(p => p.name.substring(0, 6)),
        datasets: [
            {
                data: sortedPurchases.map(p => p.revenue),
                color: (opacity = 1) => `rgba(35, 197, 94, ${opacity})`,
                strokeWidth: 2.5,
            },
            {
                data: sortedPurchases.map(p => p.cost),
                color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
                strokeWidth: 2.5,
            }
        ],
        legend: ["Revenue", "Cost"]
    };

    const chartConfig = {
        backgroundColor: '#f8fafc',
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
        formatYLabel: (value) => `$${value}`,
    };

    const renderFinancialGraph = () => {
        const mostRecentWeek = weeklyFinances[weeklyFinances.length - 1];
        const data = {
            labels: mostRecentWeek.productSales.map(p => p.productName),
            datasets: [
                {
                    data: mostRecentWeek.productSales.map(p => p.revenue),
                    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
                    strokeWidth: 2.5,
                },
                {
                    data: mostRecentWeek.productSales.map(p => p.cost),
                    color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
                    strokeWidth: 2.5,
                }
            ],
            legend: ["Revenue", "Cost"]
        };

        const barWidth = 60;
        const chartWidth = Math.max(screenWidth, mostRecentWeek.productSales.length * barWidth);

        return (
            <View className="w-full">
                <Text className="text-m font-nexaHeavy mb-2 text-gray-600 text-center">
                    Revenue vs. Cost (Products)
                </Text>
                <Text className="text-sm font-nexaHeavy mb-2 text-gray-600 text-center">
                    For: The Week of {formatWeekStart(mostRecentWeek.week)}
                </Text>

                <View className="flex-row items-center justify-center mb-2">
                    <View className="flex-row items-center mr-4">
                        <View className="w-3 h-3 rounded-full bg-green-500 mr-1" />
                        <Text className="text-xs font-nexaHeavy text-green-600">Revenue</Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className="w-3 h-3 rounded-full bg-red-500 mr-1" />
                        <Text className="text-xs font-nexaHeavy text-red-600">Cost</Text>
                    </View>
                </View>

                <View className="bg-white p-4 rounded-xl shadow-sm">
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        contentContainerStyle={{
                            paddingRight: 20,
                            height: 300, // Match chart height
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
                            yAxisLabel="$"
                            verticalLabelRotation={30}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    };

    // weekly line chart
    const renderWeeklyFinancialGraph = () => {
        const barWidth = 60;
        const chartWidth = Math.max(screenWidth, weeklyFinances.length * barWidth);

        const shortWeekLabels = weeklyFinances.map(w => {
            const parts = w.week.split(" to ");
            return parts[0].slice(-5);
        });

        const weeklyData = {
            labels: shortWeekLabels,
            datasets: [
                {
                    data: weeklyFinances.map(w => w.revenue),
                    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
                    strokeWidth: 2.5,
                },
                {
                    data: weeklyFinances.map(w => w.cost),
                    color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
                    strokeWidth: 2.5,
                },
                {
                    data: weeklyFinances.map(w => w.profit),
                    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                    strokeWidth: 2.5,
                }
            ],
            legend: ["Revenue", "Cost", "Profit"]
        };

        return (
            <View className="w-full mt-6">
                <Text className="text-m font-nexaHeavy mb-2 text-gray-600 text-center">
                    Performance: Revenue, Cost, & Profit
                </Text>
                <Text className="text-sm font-nexaHeavy mb-2 text-gray-600 text-center">
                    For: {formatMonth(mostRecentWeek.week)}
                </Text>

                <View className="flex-row items-center justify-center mb-2">
                    <View className="flex-row items-center mr-4">
                        <View className="w-3 h-3 rounded-full bg-green-500 mr-1" />
                        <Text className="text-xs font-nexaHeavy text-green-600">Revenue</Text>
                    </View>
                    <View className="flex-row items-center mr-4">
                        <View className="w-3 h-3 rounded-full bg-red-500 mr-1" />
                        <Text className="text-xs font-nexaHeavy text-red-600">Cost</Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
                        <Text className="text-xs font-nexaHeavy text-blue-600">Profit</Text>
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
                            data={weeklyData}
                            width={chartWidth > screenWidth ? chartWidth : screenWidth * 0.9}
                            height={250}
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                borderRadius: 8,
                            }}
                            yAxisLabel="$"
                            verticalLabelRotation={30}
                        />
                    </ScrollView>
                </View>
            </View>
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
        if (newContactName.trim() === '' || newContactPhone.trim() === '') {
            Alert.alert('Error', 'Please enter both name & phone number');
            return;
        }

        const newContact = {
            id: Date.now().toString(),
            name: newContactName,
            phone: newContactPhone
        };

        setEmergencyContacts([...emergencyContacts, newContact]);
        setNewContactName('');
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
                                            <Text className="text-gray-800 font-nexaExtraLight">{item.productName}</Text>
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
                                            <Text className="text-gray-800 font-nexaExtraLight">{item.productName}</Text>
                                            <View className="bg-amber-100 px-3 py-1 rounded-full">
                                                <Text className="text-amber-600 font-nexaHeavy text-sm">{formatExpirationDate(item.expire).split(',')[0]}</Text>
                                            </View>
                                        </Animated.View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>

                    {/* financials card */}
                    <View className="bg-white rounded-3xl shadow-md p-5 mb-10 w-full">
                        <Animated.View style={{ opacity: financialsButtonOpacity }} className="w-full">
                            <TouchableOpacity
                                onPress={toggleFinancials}
                                className="flex-row items-center justify-between py-3 mb-1 w-full"
                            >
                                <View className="flex-row items-center">
                                    <View className="w-1 h-6 bg-green-500 rounded-full mr-3" />
                                    <Text className="text-gray-800 text-lg font-nexaHeavy">Financial Overview</Text>
                                </View>
                                <DropdownArrow isOpen={showFinancials} color="#22c55e" />
                            </TouchableOpacity>
                        </Animated.View>

                        {showFinancials && (
                            <Animated.View style={{ opacity: financialsOpacity }} className="w-full">
                                <View className="mt-2 mb-2 w-full">
                                    <View className="flex-row justify-between mb-4 w-full">
                                        <View className="bg-green-50 rounded-xl p-3 flex-1 mr-2">
                                            <Text className="text-s text-gray-500 font-nexaExtraLight">This Month's Revenue</Text>
                                            <Text className="text-lg text-green-600 font-nexaHeavy">
                                                ${weeklyFinances
                                                .slice(-4)
                                                .reduce((total, item) => total + item.revenue, 0)
                                                .toLocaleString()}
                                            </Text>
                                        </View>
                                        <View className="bg-red-50 rounded-xl p-3 flex-1 ml-2">
                                            <Text className="text-s text-gray-500 font-nexaExtraLight">This Month's Costs</Text>
                                            <Text className="text-lg text-red-600 font-nexaHeavy">
                                                ${weeklyFinances
                                                .slice(-4)
                                                .reduce((total, item) => total + item.cost, 0)
                                                .toLocaleString()}
                                            </Text>
                                        </View>

                                    </View>
                                    <View className="bg-white rounded-xl shadow-sm p-4 mb-4 w-full">
                                        {renderFinancialGraph()}
                                    </View>

                                    <View className="bg-white rounded-xl shadow-sm p-4 mb-4 w-full">
                                        {renderWeeklyFinancialGraph()}
                                    </View>

                                    {/* top revenue */}
                                    <View className="bg-green-50 rounded-xl p-4 mb-4 w-full">
                                        <Text className="text-base font-nexaHeavy mb-3 text-green-700">
                                            Top Revenue Generators - Week Of {formatWeekStart(mostRecentWeek.week)}
                                        </Text>

                                        {mostRecentWeek.productSales
                                            .sort((a, b) => b.revenue - a.revenue)
                                            .slice(0, 3)
                                            .map((item) => (
                                                <View
                                                    key={item.productId}
                                                    className="flex-row justify-between items-center bg-white p-3 rounded-lg mb-2 shadow-sm w-full"
                                                >
                                                    <Text className="text-gray-800 font-nexaExtraLight">{item.productName}</Text>
                                                    <View className="bg-green-100 px-3 py-1 rounded-full">
                                                        <Text className="text-green-600 font-nexaHeavy text-sm">${item.revenue.toLocaleString()}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                    </View>

                                    {/* lowest revenue */}
                                    <View className="bg-red-50 rounded-xl p-4 mb-4 w-full">
                                        <Text className="text-base font-nexaHeavy mb-3 text-red-700">
                                            Lowest Revenue Generators - Week Of {formatWeekStart(mostRecentWeek.week)}
                                        </Text>

                                        {mostRecentWeek.productSales
                                            .sort((a, b) => a.revenue - b.revenue)
                                            .slice(0, 3)
                                            .map((item) => (
                                                <View
                                                    key={item.productId}
                                                    className="flex-row justify-between items-center bg-white p-3 rounded-lg mb-2 shadow-sm w-full"
                                                >
                                                    <Text className="text-gray-800 font-nexaExtraLight">{item.productName}</Text>
                                                    <View className="bg-red-100 px-3 py-1 rounded-full">
                                                        <Text className="text-red-600 font-nexaHeavy text-sm">${item.revenue.toLocaleString()}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                    </View>

                                    {/* top cost */}
                                    <View className="bg-orange-50 rounded-xl p-4 mb-4 w-full">
                                        <Text className="text-base font-nexaHeavy mb-3 text-orange-700">
                                            Highest Cost Products - Week Of {formatWeekStart(mostRecentWeek.week)}
                                        </Text>

                                        {mostRecentWeek.productSales
                                            .sort((a, b) => b.cost - a.cost)
                                            .slice(0, 3)
                                            .map((item) => (
                                                <View
                                                    key={item.productId}
                                                    className="flex-row justify-between items-center bg-white p-3 rounded-lg mb-2 shadow-sm w-full"
                                                >
                                                    <Text className="text-gray-800 font-nexaExtraLight">{item.productName}</Text>
                                                    <View className="bg-orange-100 px-3 py-1 rounded-full">
                                                        <Text className="text-orange-600 font-nexaHeavy text-sm">${item.cost.toLocaleString()}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                    </View>

                                    {/* lowest cost */}
                                    <View className="bg-blue-50 rounded-xl p-4 w-full">
                                        <Text className="text-base font-nexaHeavy mb-3 text-blue-700">
                                            Lowest Cost Products - Week Of {formatWeekStart(mostRecentWeek.week)}
                                        </Text>

                                        {mostRecentWeek.productSales
                                            .sort((a, b) => a.cost - b.cost)
                                            .slice(0, 3)
                                            .map((item) => (
                                                <View
                                                    key={item.productId}
                                                    className="flex-row justify-between items-center bg-white p-3 rounded-lg mb-2 shadow-sm w-full"
                                                >
                                                    <Text className="text-gray-800 font-nexaExtraLight">{item.productName}</Text>
                                                    <View className="bg-blue-100 px-3 py-1 rounded-full">
                                                        <Text className="text-blue-600 font-nexaHeavy text-sm">${item.cost.toLocaleString()}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                    </View>
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
                                                // Display mode
                                                <View className="flex-row justify-between items-center">
                                                    <View className="flex-1">
                                                        <Text className="text-gray-800 font-nexaHeavy">{contact.name}</Text>
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
                                                placeholder="Contact Name (e.g., Plumber)"
                                                value={newContactName}
                                                onChangeText={setNewContactName}
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