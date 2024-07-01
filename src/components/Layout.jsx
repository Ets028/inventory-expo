import {View } from 'react-native'
import React from 'react'
import { defaultStyles } from '../constants/defaultStyles'

const Layout = ({ children }) => {
  return (
    <View style={[defaultStyles.container]}>
      {children}
    </View>
  )
}

export default Layout