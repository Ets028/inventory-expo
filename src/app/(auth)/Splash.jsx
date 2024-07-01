import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import { Theme } from "@/constants/Theme";
import PillButton from "@/components/Button";
import { useRouter } from "expo-router";

export default function SplashScreen() {
    const router = useRouter();
  return (
    <Layout>
      <View style={styles.container}>
        <Logo />
        <Text style={styles.header}>BG INVENTORY</Text>
        <PillButton
          style={styles.button}
          onPress={() => router.push("/SignIn")}
        >
          LOGIN
        </PillButton>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: Theme.colors.primary,
    marginBottom: 30,
  },
  button: {
    marginTop: 20, 
    backgroundColor: Theme.colors.primary 
  },
});
