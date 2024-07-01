import { Tabs } from "expo-router";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Theme } from "../../../constants/Theme";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: Theme.colors.primary,
      }
    }}>
        <Tabs.Screen name="home" options={{ 
          headerShown: false,
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontSize: 12
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" style={{ marginBottom: -3}} size={24} color={color} />
          )
         }}
         />
        <Tabs.Screen name="search" options={{ 
          headerShown: false,
          tabBarLabel: "Search",
          tabBarLabelStyle: {
            fontSize: 12
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" style={{ marginBottom: -3}} size={24} color={color} />
          )
         }}
         />
        <Tabs.Screen name="inventory" options={{ 
          headerShown: false,
          tabBarLabel: "Inventory",
          tabBarLabelStyle: {
            fontSize: 12
          },
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="storage" style={{ marginBottom: -3}} size={24} color={color} />
          )
         }}
         />
         <Tabs.Screen name="setting" options={{ 
          headerShown: false,
          tabBarLabel: "Setting",
          tabBarLabelStyle: {
            fontSize: 12
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" style={{ marginBottom: -3}} size={24} color={color} />
          )
         }}
         />
    </Tabs>
  )
}