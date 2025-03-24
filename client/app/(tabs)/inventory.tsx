import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import SearchBar from "@/components/SearchBar";
import React from 'react'
import ProductCard from "@/components/ProductCard";
import ActiveTab from "@/components/ActiveTab";
import CategoryCard from "@/components/CategoryCard";

const products = [
    {id: 1, title:"Tomate", quantity: 10, expiration: "2021-01-01"},
    {id: 2, title:"Banana", quantity: 10, expiration: "2021-01-01"},
    {id: 3, title:"Mango", quantity: 10, expiration: "2021-01-01"},
    {id: 4, title:"Mango", quantity: 10, expiration: "2021-01-01"},
    {id: 5, title:"Mango", quantity: 10, expiration: "2021-01-01"},
    {id: 6, title:"Mango", quantity: 10, expiration: "2021-01-01"},
    {id: 7, title:"Mango", quantity: 10, expiration: "2021-01-01"},
    {id: 8, title:"Mango", quantity: 10, expiration: "2021-01-01"},
]
const categories = [
    {id: 1, title:"Dairy"},
    {id: 2, title:"Vegetables"},
    {id: 3, title:"Fruits"},
    {id: 4, title:"Meat"},
    {id: 5, title:"Seafood"},
]

const Inventory = () => {
    const [search, setSearch] = React.useState("")
    const [filteredProducts, setFilteredProducts] = React.useState(products);
    const [activeTab, setActiveTab] = React.useState("Inventory");

    const handleSearch = (text: string) => {
        setSearch(text)
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(text.toLowerCase()))
        setFilteredProducts(filtered)
    }


    return (
        <View className="flex-1 px-5">
            <SearchBar placeholder="Search..." onChangeText={handleSearch} />
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
                    <ProductCard id={item.id} title={item.title} quantity={item.quantity} expiration={item.expiration} />
                )}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />}
            {activeTab === "Categories" &&
                <FlatList
                    data={categories}
                    renderItem={({item}) => (
                        <CategoryCard title={item.title} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />}
        </View>
    )
}
export default Inventory
