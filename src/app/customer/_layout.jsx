import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';

const CsLayout = () => {
    const router = useRouter()
  return (
    <Stack>
        <Stack.Screen
            name="tambah"
            options={{
                headerTitle: "Tambah Customer",
                presentation: "modal",
                headerLeft: () => (
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="black"
                        onPress={() => router.push('/customer')}
                    />
                ),
            }}
        />
        <Stack.Screen
            name="(edit)"
            options={{
                headerTitle: "Edit Customer",
                presentation: "modal",
                headerLeft: () => (
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color="black"
                        onPress={() => router.push('/customer')}
                    />
                ),
                headerTitleStyle: {
                    fontWeight: "bold",
                    marginLeft: -10,
                    justifyContent: "center",
                }
            }}
        />
    </Stack>
  )
}

export default CsLayout