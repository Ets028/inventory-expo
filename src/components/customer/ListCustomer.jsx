import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteCustomer } from "@/hooks/useCustomer";
import { Theme } from "@/constants/Theme";
import DeleteDialog from "../DialogHapus";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/service/queryClient";
import { useAuth } from "@/context/authContext";

export default function ListCustomers({ item }) {

    const [dialogVisible, setDialogVisible] = useState(false);
    const { userInfo: { role } } = useAuth()

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: () => deleteCustomer(item.id),
        onSuccess: () => {
            setDialogVisible(false);
            Alert.alert("Success", "Customer Berhasil Dihapus");
            queryClient.invalidateQueries(['customer']);
            queryClient.refetchQueries(['customer']);
        }
    })

    const handleDelete = async () => {
        //jika bukan supervisor, error
        if (role !== "supervisor") {
            Alert.alert("Error", "Anda Tidak Memiliki Izin Akses Untuk Menghapus Customer");
            setDialogVisible(false);
            return;
        }
        try {
            await mutation.mutateAsync();
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Ionicons name="people-circle-outline" style={styles.icon} size={28} color={Theme.colors.primary} />
                <Text style={styles.text}>Nama Customer: {item.nama_customer}</Text>
            </View>
            <View style={styles.row}>
                <MaterialCommunityIcons name="map-marker-outline" style={styles.icon} size={24} color={Theme.colors.primary} />
                <Text style={styles.text}>Alamat: {item.alamat}</Text>
                <TouchableOpacity
                    style={styles.buttonEdit}
                    onPress={() => router.push("/customer/(edit)/" + item.id)}
                >
                    <Ionicons name="pencil" size={24} color={Theme.colors.surface} />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <MaterialCommunityIcons name="email-outline" style={styles.icon} size={24} color={Theme.colors.primary} />
                <Text style={styles.text}>Email: {item.email}</Text>
            </View>
            <View style={styles.row}>
                <MaterialCommunityIcons name="phone-outline" style={styles.icon} size={24} color={Theme.colors.primary} />
                <Text style={styles.text}>Telepon: {item.telepon}</Text>
                <TouchableOpacity
                    style={styles.buttonHapus}
                    onPress={() => setDialogVisible(true)}
                >
                    <Ionicons name="trash-outline" size={24} color={Theme.colors.surface} />
                </TouchableOpacity>
            </View>
            <DeleteDialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} onDelete={handleDelete} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 15,
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
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Theme.colors.text,
    },
    icon: {
        marginRight: 5,
    },
    buttonHapus: {
        position: 'absolute',
        right: 0,
        backgroundColor: Theme.colors.error,
        borderRadius: 5,
        padding: 5,
        margin: 5,
    },
    buttonEdit: {
        position: 'absolute',
        right: 0,
        backgroundColor: Theme.colors.primary,
        borderRadius: 5,
        padding: 5,
        margin: 5,
        top: 10
    }
});
