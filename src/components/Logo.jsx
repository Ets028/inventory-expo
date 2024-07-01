import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
    return <Image style={styles.image}
        source={require("../../assets/logobg.png")}/>
}

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 150,
        marginBottom: 10,
    },
})