import {View, Text, Button, TextInput, Image, TouchableOpacity} from 'react-native'
import { useRouter } from "expo-router";
import { styles } from "../styles/login.styles";

const Index = () => {
    const router = useRouter();

    const handleGoToHome = () => {
        router.push("/(tabs)");
    }

    return (
        <View style={styles.container}>
            <Image style={styles.icon}/>
            <Text style={styles.title}>TrackIt</Text>
            <TextInput
                placeholder="email"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />
            <TextInput
                placeholder="password"
                autoCapitalize="none"
                style={styles.input}
            />
            <TouchableOpacity onPress={handleGoToHome} style={styles.button}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Index
