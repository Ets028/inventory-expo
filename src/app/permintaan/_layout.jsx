import { Stack, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function PermintaanLayout() {
    const router = useRouter();
  return (
    <Stack>
        <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "Detail Permintaan",
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
          headerTitle: "Tambah Permintaan",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
