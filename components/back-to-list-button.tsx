/**
 * Floating button for returning to list mode from map mode
 */
import React from 'react'
import { StyleSheet } from 'react-native'

import { Colors } from '@/constants/colors'

import { ThemedButton } from './themed-button'

interface BackToListButtonProps {
  onPress: () => void
}

/**
 * Floating glass button to return from map mode to list mode
 */
export default function BackToListButton({ onPress }: BackToListButtonProps) {
  return (
    <ThemedButton
      title="Back to list"
      variant="secondary"
      size="md"
      onPress={onPress}
      style={styles.button}
      accessibilityHint="Returns to the list of places"
    />
  )
}

const styles = StyleSheet.create({
  button: {
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignSelf: 'center',
  },
})
