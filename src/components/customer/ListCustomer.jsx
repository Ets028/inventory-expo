import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { Theme } from "@/constants/Theme";

export default function ListCustomers({ item }) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
            <Text style={styles.text}>Nama Customer: {item.nama_customer}</Text>
                <Ionicons name="people-circle-outline" size={28} color={Theme.colors.secondary} />
            </View>
            <Text style={styles.text}>Alamat: {item.alamat}</Text>
            <Text style={styles.text}>Telepon: {item.telepon}</Text>
            <Text style={styles.text}>Email: {item.email}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 5,
        padding: 15,
        margin: 5,
        backgroundColor: Theme.colors.surface,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: 5,
    },
})