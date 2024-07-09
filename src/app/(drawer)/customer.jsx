import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCustomer } from '@/hooks/useCustomer'
import Layout from '@/components/Layout'
import { FlatList } from 'react-native-gesture-handler'
import { ActivityIndicator, FAB } from 'react-native-paper'
import { Theme } from '@/constants/Theme'
import ListCustomer from '@/components/customer/ListCustomer'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const CustomerScreen = () => {
    const router = useRouter()
    const { data: customer, isLoading, isError } = useQuery({
        queryKey: ['customer'],
        queryFn: getCustomer,
    })

    useEffect(() => {
        if (!customer) {
            router.push('/home')
        }
    }, [customer])

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
                <Button mode='contained' onPress={() => router.push('/home')}>Kembali</Button>
            </View>
        )
    }

    return (
        <Layout>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={customer?.data}
                    renderItem={({ item }) => <ListCustomer item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <FAB style={styles.fab} icon="plus" color={Theme.colors.surface} onPress={() => router.push('/customer/tambah')} />
        </Layout>
    )
}

export default CustomerScreen

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 10,
        backgroundColor: Theme.colors.primary,
    },
})