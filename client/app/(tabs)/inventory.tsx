import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState, useCallback } from 'react'
import ProductCard from "@/components/ProductCard";
import ActiveTab from "@/components/ActiveTab";
import CategoryCard from "@/components/CategoryCard";
import { useFocusEffect } from '@react-navigation/native';
import { Product, Category } from "@/types/types";
import {fetchCategories, fetchProducts} from "@/services/api";

const Inventory = () => {
    const [search, setSearch] = React.useState("")
    const [products, setProducts] = React.useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = React.useState<Product[]>();
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [activeTab, setActiveTab] = React.useState("Inventory");
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    useFocusEffect(
        useCallback(() => {
            fetchProducts().then(response => {
                setProducts(response);
                setFilteredProducts(response)
            });
        }, [])
    );

    useEffect(() => {
        fetchCategories().then((response) => {
            setCategories(response);
        });
    }, [])

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


    return (
        <View className="flex-1 px-5">
            <SearchBar placeholder="Search..." onChangeText={handleSearch} />

            {selectedCategoryId !== null && (
                <TouchableOpacity
                    className="flex-row items-center self-start bg-white border border-gray-300 px-3 py-1 rounded-full mt-1"
                    onPress={() => {
                        setSelectedCategoryId(null);
                        setFilteredProducts(products); // reset filter
                    }}
                >
                    <Text className="text-sm font-semibold text-gray-700 mr-1">
                        #{categories.find(cat => cat.id === selectedCategoryId)?.category_name}
                    </Text>
                    <Text className="text-base text-gray-600">×</Text>
                </TouchableOpacity>
            )}

            <View className="flex-row border-b border-gray-300">
                <ActiveTab
                    activeTab = {activeTab}
                    setActiveTab = {setActiveTab}
                    tabName = "Inventory"
                />
                <ActiveTab
                    activeTab = {activeTab}
                    setActiveTab = {setActiveTab}
                    tabName = "Categories"
                />
            </View>

            {activeTab === "Inventory" &&
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
            />}
            {activeTab === "Categories" &&
                <FlatList
                    data={categories}
                    renderItem={({item}) => (
                        <CategoryCard id={item.id} title={item.category_name} handleCategorySelect={handleCategorySelect} setActiveTab={setActiveTab} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />}
        </View>
    )
}
export default Inventory
