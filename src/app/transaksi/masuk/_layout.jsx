import { Stack, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TrxLayout() {
    const router = useRouter();
    return (
        <Stack>
            <Stack.Screen
                name="tambah"
                options={{
                    title: "Tambah Transaksi Masuk",
                    presentation: "modal",
                    headerLeft: () => (
                        <MaterialIcons
                            name="arrow-back"
                            size={24}
                            color="black"
                            onPress={() => router.push('/transaksiMasuk')}
                        />
                    ),
                }}
            />
        </Stack>
    )
}