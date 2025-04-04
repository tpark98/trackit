import { Text, View } from "react-native";
import Dashboard from "../../components/Dashboard";
import React, {useEffect} from "react";
import {fetchCategories, fetchProducts } from "@/services/api";
import {Category, Product} from "@/types/types";

export default function Index() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [categories, setCategories] = React.useState<Category[]>([]);

    useEffect(() => {
        fetchProducts().then((response) => {
            setProducts(response);
        });
        fetchCategories().then((response) => {
            setCategories(response);
        });
    }, [])


    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Dashboard</Text>
        <Dashboard products={products} />
    </View>
  );
}
