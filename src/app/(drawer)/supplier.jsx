import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'expo-router'
import { getSupplier } from '@/hooks/useSupplier'
import { useQuery } from '@tanstack/react-query'
import Button from '@/components/Button'
import { FAB } from 'react-native-paper'
import { Theme } from '@/constants/Theme'
import ListSupplier from '@/components/supplier/ListSupplier'
import { useAuth } from '@/context/authContext'

export default function SupplierScreen() {
    const router = useRouter()
    const { userInfo: { role } } = useAuth()

    const { data: supplier, isLoading, isError } = useQuery({
        queryKey: ['supplier'],
        queryFn: getSupplier,
    })

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    if (isError) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>Error: {isError.message}</Text>
                <Button style={styles.button} mode='contained' onPress={() => router.push('/home')}>Kembali</Button>
            </View>
        )
    }

    if (role === 'petugas') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red', }}>Anda tidak memiliki akses ke halaman ini</Text>
                <Button style={styles.button} mode='contained' onPress={() => router.push('/home')}>Kembali</Button>
            </View>
        )
    }

    return (
        <Layout>
            <View style={{ flex: 1, padding: 20 }}>
                <FlatList
                    data={supplier?.data}
                    renderItem={({ item }) => <ListSupplier item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                    ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
                />
            </View>
            <FAB
                style={styles.fab}
                icon="plus"
                color={Theme.colors.surface}
                onPress={() => router.push('/supplier/tambah')}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "90%",
        marginTop: 20
    },
    list: {
        margin: -5,
        padding: 5
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 5,
        bottom: 25,
        backgroundColor: Theme.colors.primary,
    }
})