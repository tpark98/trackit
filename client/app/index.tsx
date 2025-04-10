import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { styles } from "../styles/login.styles";
import { handleLogin } from "@/services/api";
import React, { useState } from 'react';

const Index = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleGoToHome = async () => {
        // Call the API with the user-provided credentials
        const result = await handleLogin(username, password);
        // If result is an object, assume a successful login (result has an "id")
        if (result && result.id) {
          setError('');
          router.push('/(tabs)');
        } else if (typeof result == 'string') {
          // When the API returns a string, then it is an error message
          setError(result);
        } else {
          // In case of unexpected response
          setError('An unexpected error occurred. Please try again.');
        }
      };

    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={require('../assets/icons/logoT.png')} />
            <Text style={[styles.title, { fontFamily: 'nexa-ExtraLight' }]}>TrackIt</Text>
            <TextInput
              placeholder="username"
              autoCapitalize="none"
              style={[styles.input, { fontFamily: 'nexa-ExtraLight' }]}
              placeholderTextColor="#aaa"  // Ensure the placeholder text color is visible
              onChangeText={setUsername}
          />

          <TextInput
              placeholder="password"
              autoCapitalize="none"
              style={[styles.input, { fontFamily: 'nexa-ExtraLight' }]}
              placeholderTextColor="#aaa"  // Ensure the placeholder text color is visible
              onChangeText={setPassword}
              secureTextEntry
          />

            {error ? <Text style={[styles.errorText, { fontFamily: 'nexa-ExtraLight' }]}>{error}</Text> : null}
            <TouchableOpacity onPress={handleGoToHome} style={styles.button}>
                <Text style={[styles.buttonText, { fontFamily: 'nexa-ExtraLight' }]}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/signup')} style={styles.link}>
              <Text style={[styles.buttonText, { fontFamily: 'nexa-ExtraLight' }]}>Sign Up</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Index;
