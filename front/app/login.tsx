import React, { useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { AuthContext } from "@/utils/context";
import { yupResolver } from '@hookform/resolvers/yup';

const inputSchema = yup
    .object()
    .shape({
        identifier : yup.string().required(),
        password : yup.string().required()
    })
    .required()

    const LoginPage = () => {
        const { control, handleSubmit } = useForm({ 
            resolver: yupResolver(inputSchema),
            defaultValues: { identifier: "", password: "" }
        });
        const { signIn } = useContext(AuthContext);
      
        return (
          <View style={styles.container}>
            <Text style={styles.label}>Identifier</Text>
            <Controller
              control={control}
              name="identifier"
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
      
            <Button title="Sign In" onPress={handleSubmit(signIn)} />
          </View>
        );
      };
      
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
      
      export default LoginPage;
