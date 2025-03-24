import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { register } from '@/utils/call_backend';

const registerSchema = yup
    .object()
    .shape({
        email : yup.string().required(),
        username : yup.string().required(),
        password : yup.string().required(),
        repassword : yup.string().required()
    })
    .required()

const RegisterPage = () => {
        const { control, handleSubmit } = useForm({ 
            resolver: yupResolver( registerSchema ),
            defaultValues: { email:"", username:"", password:"", repassword:"" }
        });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        keyboardType="email-address"
                />
                )}
            />
            <Text style={styles.label}>Username</Text>
            <Controller
                control={control}
                name="username"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                )}
            />
            <Text style={styles.label}>Password</Text>
            <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
            />
            <Text style={styles.label}>Retype Password</Text>
            <Controller
                control={control}
                name="repassword"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
            />
          <Button title="Sign In" onPress={handleSubmit(register)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
});

export default RegisterPage;
