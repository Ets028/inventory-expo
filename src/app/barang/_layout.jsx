import { Stack, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function DetailBarangScreen() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Detail Barang",
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back"
              size={24}
              color="black"
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="(edit)"
        options={{
          headerTitle: "Edit Barang",
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back"
              size={24}
              color="black"
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="tambah"
        options={{
          headerTitle: "Tambah Barang",
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back"
              size={24}
              color="black"
              onPress={() => router.back()}
            />
          ),
        }}
      />
      
    </Stack>
  );
}
