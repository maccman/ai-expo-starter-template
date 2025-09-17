/**
 * Location pill button for the header
 */
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

import * as Haptics from 'expo-haptics'

import { Colors } from '@/constants/colors'

interface WhereButtonProps {
  label: string | null
  loading?: boolean
  onPress: () => void
}

/**
 * Pill-shaped button displaying current location with dark background
 */
export default function WhereButton({
  label,
  loading = false,
  onPress,
}: WhereButtonProps) {
  const displayText = loading ? 'Getting location...' : label || 'Where'

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: Colors.card },
        { opacity: pressed ? 0.8 : 1 },
      ]}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onPress()
      }}
    >
      <Text style={[styles.text, { color: Colors.text }]}>{displayText}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
})
