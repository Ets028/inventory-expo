// components/ListItem.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ListItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: item.image_url }} />
            <View style={{ flexDirection: 'column' }}>
            <Text style={styles.text}>{item.kode_barang}</Text>
            <Text style={styles.text}>{item.nama_barang}</Text>
                <Text style={styles.text}>Stok: {item.stok}</Text>
                <Text style={styles.text}>Satuan: {item.satuan}</Text>
            </View>
        </View>
    );
};

export default ListItem;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10,
    },
});