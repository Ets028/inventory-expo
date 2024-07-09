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
    </Stack>
  )
}

export default CsLayout