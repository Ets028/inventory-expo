import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { defaultStyles } from '../../../constants/defaultStyles'
import Button from '../../../components/Button'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'



export default function Page() {
  const router = useRouter()
  const {logoutUser} = useAuth()

  const handleLogout = () => {
    logoutUser()
    router.replace('/(auth)/SignIn')
  }

  return (
    <View style={[defaultStyles.container]}>
      <View style={styles.container}>
      <Button mode='contained' onPress={handleLogout}>Logout</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})