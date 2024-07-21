import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';

const SupplierLayout = () => {
    const router = useRouter()
  return (
    <Stack>
        <Stack.Screen
            name="tambah"
            options={{
                headerTitle: "Tambah Supplier",
                presentation: "modal",
                headerLeft: () => (
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="black"
                        onPress={() => router.push('/supplier')}
                    />
                ),
            }}
        />
        <Stack.Screen
            name="(edit)"
            options={{
                headerTitle: "Edit Supplier",
                presentation: "modal",
                headerLeft: () => (
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="black"
                        onPress={() => router.push('/supplier')}
                    />
                ),
            }}
        />
    </Stack>
  )
}

export default SupplierLayout