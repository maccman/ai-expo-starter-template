/**
 * DIY segmented control for Hotels/Restaurants toggle
 */
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

import * as Haptics from 'expo-haptics'

import { GlassSurface } from '@/components/ui/glass-surface'
import { Colors } from '@/constants/colors'
import { Config } from '@/constants/config'

import { PlaceType } from '../types'

interface TypeToggleProps {
  selectedType: PlaceType
  onTypeChange: (type: PlaceType) => void
}

/**
 * Custom segmented control for switching between Hotels and Restaurants
 */
export default function TypeToggle({
  selectedType,
  onTypeChange,
}: TypeToggleProps) {
  return (
    <GlassSurface
      cornerRadius={Config.ui.buttonBorderRadius}
      tintColor={Colors.glassBase}
      fallbackBackgroundColor={Colors.glassSurfaceBackground}
      fallbackBorderColor={Colors.glassBorder}
      isInteractive
      style={styles.container}
    >
      <Pressable
        style={({ pressed }) => [
          styles.segment,
          selectedType === 'hotel'
            ? pressed
              ? styles.segmentActivePressed
              : styles.segmentActive
            : pressed
              ? styles.segmentInactivePressed
              : styles.segmentInactive,
        ]}
        onPress={() => {
          if (selectedType !== 'hotel') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            onTypeChange('hotel')
          }
        }}
        accessibilityRole="button"
        accessibilityState={{ selected: selectedType === 'hotel' }}
      >
        <Text
          style={[
            styles.label,
            selectedType === 'hotel'
              ? styles.labelActive
              : styles.labelInactive,
          ]}
        >
          Hotels
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.segment,
          selectedType === 'restaurant'
            ? pressed
              ? styles.segmentActivePressed
              : styles.segmentActive
            : pressed
              ? styles.segmentInactivePressed
              : styles.segmentInactive,
        ]}
        onPress={() => {
          if (selectedType !== 'restaurant') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            onTypeChange('restaurant')
          }
        }}
        accessibilityRole="button"
        accessibilityState={{ selected: selectedType === 'restaurant' }}
      >
        <Text
          style={[
            styles.label,
            selectedType === 'restaurant'
              ? styles.labelActive
              : styles.labelInactive,
          ]}
        >
          Restaurants
        </Text>
      </Pressable>
    </GlassSurface>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Config.spacing.xs,
    padding: Config.spacing.xs,
    alignSelf: 'flex-start',
  },
  segment: {
    flex: 1,
    borderRadius: Config.ui.buttonBorderRadius,
    paddingVertical: Config.spacing.sm,
    paddingHorizontal: Config.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: Colors.glassPrimary,
  },
  segmentActivePressed: {
    backgroundColor: Colors.glassPrimaryPressed,
  },
  segmentInactive: {
    backgroundColor: 'transparent',
  },
  segmentInactivePressed: {
    backgroundColor: Colors.glassGhostPressed,
  },
  label: {
    fontSize: Config.typography.fontSize.md,
    fontWeight: Config.typography.fontWeight.semiBold,
    textTransform: 'none',
  },
  labelActive: {
    color: Colors.text,
  },
  labelInactive: {
    color: Colors.textSecondary,
  },
})
