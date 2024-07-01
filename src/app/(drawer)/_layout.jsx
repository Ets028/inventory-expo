import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { FontAwesome, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer>
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerTitle: " ",
            drawerLabel: "Home",
            drawerLabelStyle: { marginLeft: -25, fontWeight: "bold", fontSize: 16 },
            headerTitleStyle: {
              fontWeight: "bold",
              marginLeft: -20,
              justifyContent: "center",
              textAlign: "center",
            },
            drawerIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color} />
            ),
            initialRouteName: "home",
          }}
        />
        <Drawer.Screen
          name="permintaan"
          options={{
            title: "Permintaan",
            drawerLabelStyle: { marginLeft: -25, fontWeight: "bold", fontSize: 16 },
            headerTitleStyle: {
              fontWeight: "bold",
              marginLeft: -20,
              justifyContent: "center",
              textAlign: "center",
            },
            drawerIcon: ({ color }) => (
              <MaterialIcons name="request-quote" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="transaksiKeluar"
          options={{
            title: "Transaksi Keluar",
            drawerLabelStyle: { marginLeft: -25, fontWeight: "bold", fontSize: 16 },
            headerTitleStyle: {
              fontWeight: "bold",
              marginLeft: -20,
              justifyContent: "center",
              textAlign: "center",
            },
            drawerIcon: ({ color }) => (
              <MaterialIcons name="request-quote" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="transaksiMasuk"
          options={{
            title: "Transaksi Masuk",
            drawerLabelStyle: { marginLeft: -24, fontWeight: "bold", fontSize: 16 },
            headerTitleStyle: {
              fontWeight: "bold",
              marginLeft: -20,
              justifyContent: "center",
              textAlign: "center",
            },
            drawerIcon: ({ color }) => (
              <FontAwesome5 name="file-invoice" style={{ marginLeft: 5}} size={20} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
