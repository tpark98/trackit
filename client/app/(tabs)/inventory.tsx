import {View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert, ScrollView} from 'react-native'
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState, useCallback } from 'react'
import ProductCard from "@/components/ProductCard";
import ActiveTab from "@/components/ActiveTab";
import CategoryCard from "@/components/CategoryCard";
import { useFocusEffect } from '@react-navigation/native';
import { Product, Category } from "@/types/types";
import {fetchCategories, fetchProducts, addCategory, addProduct} from "@/services/api";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const Inventory = () => {
    const [search, setSearch] = React.useState("")
    const [products, setProducts] = React.useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [activeTab, setActiveTab] = React.useState("Inventory");
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    
    // states
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    const [productModalVisible, setProductModalVisible] = useState(false);
    const [isProductLoading, setIsProductLoading] = useState(false);
    const [newProduct, setNewProduct] = useState({
        product_name: "",
        cost: "",
        expire: new Date(),
        purchase_date: new Date(),
        purchased: "",
        leftover: "",
        category_id: 1,
    });
    const [showExpireDatePicker, setShowExpireDatePicker] = useState(false);
    const [showPurchaseDatePicker, setShowPurchaseDatePicker] = useState(false);
    
    useFocusEffect(
        useCallback(() => {
            loadProducts();
            loadCategories();
        }, [])
    );
    
    const loadProducts = useCallback(() => {
        fetchProducts().then(response => {
            if (Array.isArray(response)) {
                setProducts(response);
                setFilteredProducts(response);
            } else {
                console.error("Failed to load products");
                setProducts([]);
                setFilteredProducts([]);
            }
        }).catch(error => {
            console.error("Error loading products:", error);
            setProducts([]);
            setFilteredProducts([]);
        });
    }, []);
    
    const loadCategories = useCallback(() => {
        fetchCategories().then((response) => {
            if (Array.isArray(response) && response.length > 0) {
                setCategories(response);
                setNewProduct(prev => ({
                    ...prev, 
                    category_id: prev.category_id || response[0].id
                }));
            } else {
                console.error("Failed to load categories or empty categories list");
                setCategories([]);
            }
        }).catch(error => {
            console.error("Error loading categories:", error);
            setCategories([]);
        });
    }, []);
    
    useEffect(() => {
        loadCategories();
    }, [loadCategories]);
    
    const handleCategorySelect = (categoryId: number | null) => {
        setSelectedCategoryId(categoryId);
        const filtered = applyFilters(search, categoryId, products);
        setFilteredProducts(filtered);
    };
    
    const applyFilters = (searchText: string, categoryId: number | null, fullList: Product[]) => {
        return fullList.filter(product => {
            const matchesSearch = product.product_name.toLowerCase().includes(searchText.toLowerCase());
            const matchesCategory = categoryId === null || product.category_id === categoryId;
            return matchesSearch && matchesCategory;
        });
    };
    
    const handleSearch = (text: string) => {
        setSearch(text)
        const filtered = applyFilters(text, selectedCategoryId, products);
        setFilteredProducts(filtered)
    }
    
    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) {
            Alert.alert("Error", "Category name cannot be empty");
            return;
        }
        
        setIsCategoryLoading(true);
        try {
            const result = await addCategory(newCategoryName.trim());
            console.log("Category add result:", result);
            
            if (typeof result === 'string') {
                Alert.alert("Error", result);
            } else {
                loadCategories();
                setCategoryModalVisible(false);
                setNewCategoryName("");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to add category");
        } finally {
            setIsCategoryLoading(false);
        }
    };
    
    const handleAddProduct = async () => {
        setProductModalVisible(false);
        setNewProduct({
            product_name: "",
            cost: "",
            expire: new Date(),
            purchase_date: new Date(),
            purchased: "",
            leftover: "",
            category_id: categories.length > 0 ? categories[0].id : 1,
        });
    
        if (!newProduct.product_name.trim()) {
            Alert.alert("Error", "Product name cannot be empty");
            return;
        }
    
        if (isNaN(Number(newProduct.cost)) || Number(newProduct.cost) <= 0) {
            Alert.alert("Error", "Cost must be a positive number");
            return;
        }
    
        if (isNaN(Number(newProduct.purchased)) || Number(newProduct.purchased) <= 0) {
            Alert.alert("Error", "Purchased quantity must be a positive number");
            return;
        }
    
        if (isNaN(Number(newProduct.leftover)) || Number(newProduct.leftover) < 0) {
            Alert.alert("Error", "Leftover quantity must be a non-negative number");
            return;
        }
        if (Number(newProduct.leftover) > Number(newProduct.purchased)) {
            Alert.alert("Error", "Leftover quantity cannot exceed purchased quantity");
            return;
        }
    
        setIsProductLoading(true);
        try {
            const formattedExpireDate = newProduct.expire.toISOString().split('T')[0];
            const formattedPurchaseDate = newProduct.purchase_date.toISOString().split('T')[0];
    
            const result = await addProduct(
                newProduct.product_name,
                Number(newProduct.cost),
                formattedExpireDate,
                formattedPurchaseDate,
                Number(newProduct.purchased),
                Number(newProduct.leftover),
                newProduct.category_id,
            );
    
            if (typeof result === 'string') {
                Alert.alert("Error", result);
            } else {
                loadProducts();
                setProductModalVisible(false);
                setNewProduct({
                    product_name: "",
                    cost: "",
                    expire: new Date(),
                    purchase_date: new Date(),
                    purchased: "",
                    leftover: "",
                    category_id: categories.length > 0 ? categories[0].id : 1,
                });
            }
        } catch (error) {
            Alert.alert("Error", "Failed to add product");
        } finally {
            setIsProductLoading(false);
        }
    };
    
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    return (
        <View className="flex-1 px-5">
            <SearchBar placeholder="Search..." onChangeText={handleSearch} />
            {selectedCategoryId !== null && (
                <TouchableOpacity
                    className="flex-row items-center self-start bg-white border border-gray-300 px-3 py-1 rounded-full mt-1"
                    onPress={() => {
                        setSelectedCategoryId(null);
                        setFilteredProducts(products);
                    }}
                >
                    <Text className="text-sm font-semibold text-gray-700 mr-1 font-['Nexa-Heavy']">
                        #{categories.find(cat => cat.id === selectedCategoryId)?.category_name || 'Unknown'}
                    </Text>
                    <Text className="text-base text-gray-600 font-['Nexa-Heavy']">×</Text>
                </TouchableOpacity>
            )}
            <View className="flex-row border-b border-gray-300">
                <ActiveTab
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabName="Inventory"
                />
                <ActiveTab
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabName="Categories"
                />
            </View>
            {activeTab === "Inventory" && (
                <View className="flex-1">
                    <TouchableOpacity 
                        className="bg-purple-700 p-3 rounded-lg mb-4 mt-2 items-center"
                        onPress={() => setProductModalVisible(true)}
                    >
                        <Text className="text-white font-['Nexa-Heavy'] text-base">Add New Product</Text>
                    </TouchableOpacity>
                    
                    <FlatList
                        data={filteredProducts}
                        renderItem={({item}) => (
                            <ProductCard
                                product={{
                                    id: item.id,
                                    title: item.product_name,
                                    quantity: item.leftover,
                                    expiration: item.expire.split("T")[0],
                                }}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <Text className="text-center text-gray-500 mt-4">No products found</Text>
                        }
                    />
                </View>
            )}
            
            {activeTab === "Categories" && (
                <View className="flex-1">
                    <TouchableOpacity 
                        className="bg-purple-700 p-3 rounded-lg mb-4 mt-2 items-center"
                        onPress={() => setCategoryModalVisible(true)}
                    >
                        <Text className="text-white font-['Nexa-Heavy'] text-base">Add New Category</Text>
                    </TouchableOpacity>
                    
                    <FlatList
                        data={categories}
                        renderItem={({item}) => (
                            <CategoryCard 
                                id={item.id} 
                                title={item.category_name} 
                                handleCategorySelect={handleCategorySelect} 
                                setActiveTab={setActiveTab} 
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <Text className="text-center text-gray-500 mt-4">No categories found</Text>
                        }
                    />
                </View>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={categoryModalVisible}
                onRequestClose={() => setCategoryModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                    <View className="bg-white p-5 rounded-lg w-4/5">
                        <Text className="text-lg font-['Nexa-Heavy'] mb-4">Add New Category</Text>
                        
                        <TextInput
                            className="border border-gray-300 p-3 rounded-lg mb-4 font-['Nexa-ExtraLight']"
                            placeholder="Category Name"
                            value={newCategoryName}
                            onChangeText={setNewCategoryName}
                        />
                        
                        <View className="flex-row justify-end">
                            <TouchableOpacity 
                                className="bg-gray-300 p-2 rounded-lg mr-2"
                                onPress={() => {
                                    setCategoryModalVisible(false);
                                    setNewCategoryName("");
                                }}
                                disabled={isCategoryLoading}
                            >
                                <Text className="text-gray-700 font-['Nexa-Heavy']">Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                className={`${isCategoryLoading ? 'bg-purple-400' : 'bg-purple-700'} p-2 rounded-lg`}
                                onPress={handleAddCategory}
                                disabled={isCategoryLoading}
                            >
                                <Text className="text-white font-['Nexa-Heavy']">
                                    {isCategoryLoading ? 'Adding...' : 'Add'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={productModalVisible}
                onRequestClose={() => setProductModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                    <View className="bg-white p-5 rounded-lg w-4/5 max-h-5/6">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text className="text-lg font-['Nexa-Heavy'] mb-4">Add New Product</Text>
                            
                            <Text className="font-['Nexa-Heavy'] text-gray-700 mb-1">Product Name</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg mb-3 font-['Nexa-ExtraLight']"
                                placeholder="Enter product name"
                                value={newProduct.product_name}
                                onChangeText={(text) => setNewProduct(prev => ({...prev, product_name: text}))}
                            />
                            
                            <Text className="font-['Nexa-Heavy'] text-gray-700 mb-1">Cost</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg mb-3 font-['Nexa-ExtraLight']"
                                placeholder="Enter cost"
                                keyboardType="numeric"
                                value={newProduct.cost}
                                onChangeText={(text) => setNewProduct(prev => ({...prev, cost: text}))}
                            />
                            
                            <Text className="font-['Nexa-Heavy'] text-gray-700 mb-1">Expiration Date</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg mb-3 font-['Nexa-ExtraLight']"
                                placeholder="YYYY-MM-DD"
                                onChangeText={(text) => setNewProduct(prev => ({...prev, expire: text}))}
                            />
                                
                            <Text className="font-['Nexa-Heavy'] text-gray-700 mb-1">Purchase Date</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg mb-3 font-['Nexa-ExtraLight']"
                                placeholder="YYYY-MM-DD"
                                onChangeText={(text) => setNewProduct(prev => ({...prev, purchase_date: text}))}
                            />
                            {showPurchaseDatePicker && (
                                <DateTimePicker
                                    value={newProduct.purchase_date}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowPurchaseDatePicker(false);
                                        if (selectedDate) {
                                            setNewProduct(prev => ({...prev, purchase_date: selectedDate}));
                                        }
                                    }}
                                />
                            )}
                            
                            <Text className="font-['Nexa-Heavy'] text-gray-700 mb-1">Purchased Quantity</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg mb-3 font-['Nexa-ExtraLight']"
                                placeholder="Enter purchased quantity"
                                keyboardType="numeric"
                                value={newProduct.purchased}
                                onChangeText={(text) => setNewProduct(prev => ({...prev, purchased: text}))}
                            />
                            
                            <Text className="font-['Nexa-Heavy'] text-gray-700 mb-1">Leftover Quantity</Text>
                            <TextInput
                                className="border border-gray-300 p-3 rounded-lg mb-3 font-['Nexa-ExtraLight']"
                                placeholder="Enter leftover quantity"
                                keyboardType="numeric"
                                value={newProduct.leftover}
                                onChangeText={(text) => setNewProduct(prev => ({...prev, leftover: text}))}
                            />
                            
                            <Text className="font-['Nexa-Heavy'] text-gray-700 mb-1">Category</Text>
                            <View className="border border-gray-300 rounded-lg mb-4">
                                {categories.length > 0 ? (
                                    <Picker
                                        selectedValue={newProduct.category_id}
                                        onValueChange={(itemValue) => 
                                            setNewProduct(prev => ({...prev, category_id: itemValue}))
                                        }
                                    >
                                        {categories.map(category => (
                                            <Picker.Item 
                                                key={category.id} 
                                                label={category.category_name} 
                                                value={category.id}
                                                style={{fontFamily: 'Nexa-ExtraLight'}}
                                            />
                                        ))}
                                    </Picker>
                                ) : (
                                    <Text className="p-3 text-gray-500 font-['Nexa-ExtraLight']">No categories available</Text>
                                )}
                            </View>
                            
                            <View className="flex-row justify-end">
                                <TouchableOpacity 
                                    className="bg-gray-300 p-2 rounded-lg mr-2"
                                    onPress={() => {
                                        setProductModalVisible(false);
                                        // reset
                                        setNewProduct({
                                            product_name: "",
                                            cost: "",
                                            expire: new Date(),
                                            purchase_date: new Date(),
                                            purchased: "",
                                            leftover: "",
                                            category_id: categories.length > 0 ? categories[0].id : 1,
                                        });
                                    }}
                                    disabled={isProductLoading}
                                >
                                    <Text className="text-gray-700 font-['Nexa-Heavy']">Cancel</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    className={`${isProductLoading ? 'bg-purple-400' : 'bg-purple-700'} p-2 rounded-lg`}
                                    onPress={handleAddProduct}
                                    disabled={isProductLoading}
                                >
                                    <Text className="text-white font-['Nexa-Heavy']">
                                        {isProductLoading ? 'Adding...' : 'Add'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Inventory