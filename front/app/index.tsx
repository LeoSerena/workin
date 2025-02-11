import React, { useContext } from "react";
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "@/utils/context";

export default function App() {
  const { userToken, signIn, signOut, isLoading } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WorkIn!</Text>
      <View style={styles.buttonContainer}>
        <Link href="/register">New User?</Link>
      </View>
      <View style={styles.buttonContainer}>
      <Link href="/login">I have an account!</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
});
