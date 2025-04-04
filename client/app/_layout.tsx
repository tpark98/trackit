import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Nexa-ExtraLight": require("../assets/fonts/Nexa-ExtraLight.ttf"),
    "Nexa-Heavy": require("../assets/fonts/Nexa-Heavy.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (<Stack>
    <Stack.Screen
        name="index"
        options={{ headerShown: false }}
    />
    <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
    />
  </Stack>);
}
