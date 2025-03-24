import { Text, View } from "react-native";
import Dashboard from "../../components/Dashboard";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Dashboard</Text>
        <Dashboard/>
    </View>
  );
}
