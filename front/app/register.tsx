import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

console.log(process.env)

const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const navigation = useNavigation();

    const handleRegister = async () => {
        if(!name || !email || !password){
            Alert.alert("Error", "All fields are required");
            return;
        }

        if(password !== retypePassword){
          Alert.alert("Error", "Both passwords must be equal")
        }

        const userData = { name, email, password };
        try {
            const register_route = "http://localhost:" + process.env.EXPO_PUBLIC_PORT + process.env.EXPO_PUBLIC_USER_ROUTE
            const response = await axios.post(register_route, userData);
            navigation.navigate('authenticated')
          } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>
    
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
    
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
    
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Retype password"
            value={retypePassword}
            onChangeText={setRetypePassword}
            secureTextEntry
          />
    
          <Button title="Register" onPress={handleRegister} />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
      },
    });
    
    export default RegistrationPage;
    