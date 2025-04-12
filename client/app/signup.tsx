import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { styles } from "../styles/login.styles";
import { handleSignUp } from "@/services/api";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleGoToTabs = async () => {
    const result = await handleSignUp(username, password, fname, lname, role);

    if (result['message'] === "Success") {
      setError('');
      router.push('/(tabs)');
    } else if (typeof result === 'string') {
      setError(result);
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: 'nexa-ExtraLight' }]}>Sign Up</Text>

      <TextInput
        placeholder="username"
        autoCapitalize="none"
        style={[styles.input, { fontFamily: 'nexa-ExtraLight' }]}
        placeholderTextColor="#aaa"
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="password"
        autoCapitalize="none"
        style={[styles.input, { fontFamily: 'nexa-ExtraLight' }]}
        placeholderTextColor="#aaa"
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
              placeholder="first name"
              autoCapitalize="none"
              style={[styles.input, { fontFamily: 'nexa-ExtraLight' }]}
              placeholderTextColor="#aaa"
              onChangeText={setFname}
      />
      <TextInput
        placeholder="last name"
        autoCapitalize="none"
        style={[styles.input, { fontFamily: 'nexa-ExtraLight' }]}
        placeholderTextColor="#aaa"
        onChangeText={setLname}
      />

      <TextInput
        placeholder="role"
        autoCapitalize="none"
        style={[styles.input, { fontFamily: 'nexa-ExtraLight' }]}
        placeholderTextColor="#aaa"
        onChangeText={setRole}
      />

      {error ? <Text style={[styles.errorText, { fontFamily: 'nexa-ExtraLight' }]}>{error}</Text> : null}

      <TouchableOpacity onPress={handleGoToTabs} style={styles.button}>
        <Text style={[styles.buttonText, { fontFamily: 'nexa-ExtraLight' }]}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/')} style={styles.link}>
        <Text style={[styles.buttonText, { fontFamily: 'nexa-ExtraLight' }]}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
