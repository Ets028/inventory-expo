import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@/constants/Theme';
import { deleteSupplier } from '@/hooks/useSupplier';
import { useRouter } from 'expo-router';
import DeleteDialog from '../DialogHapus';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/service/queryClient';
import { useAuth } from '@/context/authContext';

export default function ListSupplier({ item }) {

    const router = useRouter()
    const { userInfo: { role } } = useAuth()
    const [dialogVisible, setDialogVisible] = useState(false);

    const mutation = useMutation({
        mutationFn: () => deleteSupplier(item.id),
        onSuccess: () => {
            setDialogVisible(false);
            queryClient.invalidateQueries(['supplier']);
            queryClient.refetchQueries(['supplier']);
        }
    })

    const handleDelete = async () => {
        if(role !== "supervisor") {
            Alert.alert("Error", "Anda Tidak Memiliki Izin Akses Untuk Menghapus Supplier");
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
                <Text style={styles.text}>Nama: {item.nama_supplier}</Text>
            </View>
            <Text style={styles.text}>Email: {item.email}</Text>
            <View style={styles.header}>
            <Text style={styles.text}>No. Telepon: {item.telepon}</Text>
            <TouchableOpacity
                    style={styles.editbutton} onPress={() => router.push("/supplier/(edit)/" + item.id)}>
                    <Ionicons name="pencil" size={24} color={Theme.colors.surface} />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.text}>Alamat: {item.alamat}</Text>
                <TouchableOpacity style={styles.hapusbutton} onPress={() => setDialogVisible(true)}  >
                    <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <DeleteDialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} onDelete={handleDelete} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
   hapusbutton: {
        backgroundColor: Theme.colors.error,
        borderRadius: 5,
        padding: 4,
    },
    editbutton: {
        backgroundColor: Theme.colors.primary,
        borderRadius: 5,
        padding: 4,
        marginBottom: 5
    }
})