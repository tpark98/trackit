import {View, Text, Button, TextInput, Image, TouchableOpacity} from 'react-native'
import { useRouter } from "expo-router";
import { styles } from "../styles/login.styles";
import {handleLogin} from "@/services/api";

const Index = () => {
    const router = useRouter();

    const handleGoToHome = async () => {
        const id = "user01";
        const password = "test";
        // goes to the backend to determine if it correctly login
        console.log(await handleLogin(id, password));
        router.push("/(tabs)");
    }


    return (
        <View style={styles.container}>
            <Image style={styles.icon}/>
            <Text style={styles.title}>TrackIt</Text>
            <TextInput
                placeholder="username"
                autoCapitalize="none"
                style={styles.input}
            />
            <TextInput
                placeholder="password"
                autoCapitalize="none"
                style={styles.input}
            />
            <TouchableOpacity onPress={handleGoToHome} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Index
