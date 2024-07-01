import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton  } from 'react-native-paper'
import { Theme } from '@/constants/Theme'

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined',
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    marginVertical: 15,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary,
  },
  text: {
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 24,
    color: Theme.colors.surface,
  },
})