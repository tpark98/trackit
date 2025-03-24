import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
        },
    ],
};

const Dashboard = () => {
    return (
        <View>
        {/*<BarChart*/}
        {/*    data={barData}*/}
        {/*    width={screenWidth}*/}
        {/*    height={220}*/}
        {/*    yAxisLabel={'$'}*/}
        {/*    chartConfig={{*/}
        {/*        backgroundGradientFrom: '#f6f6f6',*/}
        {/*        backgroundGradientTo: '#f6f6f6',*/}
        {/*        decimalPlaces: 2, // optional, defaults to 2dp*/}
        {/*        color: (opacity = 1) => `rgba(97, 44, 115, ${opacity})`,*/}
        {/*    }}*/}
        {/*/>*/}
        </View>
    )
}
export default Dashboard
