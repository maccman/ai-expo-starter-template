/**
 * Component for displaying price level indicators
 */
import { StyleSheet, Text, View } from 'react-native'

import { formatPriceLevel } from '@/lib/utils/price-formatter'
import type { Place } from '@/types'

interface PriceIndicatorProps {
  priceLevel?: Place['priceLevel']
  size?: 'small' | 'medium' | 'large'
  showLabel?: boolean
}

/**
 * Displays a price level indicator with optional label
 */
export function PriceIndicator({
  priceLevel,
  size = 'medium',
  showLabel = false,
}: PriceIndicatorProps) {
  const priceDisplay = formatPriceLevel(priceLevel)

  if (!priceDisplay) {
    return null
  }

  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  }

  return (
    <View style={styles.container}>
      <View style={[styles.indicator, { backgroundColor: priceDisplay.color }]}>
        <Text style={[styles.symbol, sizeStyles[size]]}>
          {priceDisplay.symbol}
        </Text>
      </View>
      {showLabel && (
        <Text style={[styles.label, sizeStyles[size]]}>
          {priceDisplay.label}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  indicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  label: {
    color: '#666666',
    fontWeight: '500',
  },
  small: {
    fontSize: 10,
  },
  medium: {
    fontSize: 12,
  },
  large: {
    fontSize: 14,
  },
})
