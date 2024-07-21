import {SafeAreaView, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '../constants/defaultStyles'

const Layout = ({ children }) => {
  return (
    <SafeAreaView style={[defaultStyles.container]}>
      {children}
    </SafeAreaView>
  )
}

export default Layout