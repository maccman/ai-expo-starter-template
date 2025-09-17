/**
 * Themed card component with consistent styling
 */
import { StyleSheet, type ViewProps, type ViewStyle } from 'react-native'

import { GlassSurface } from '@/components/ui/glass-surface'
import { Colors } from '@/constants/colors'
import { Config } from '@/constants/config'
import { useColorScheme } from '@/hooks/use-color-scheme'

export type ThemedCardProps = ViewProps & {
  variant?: 'primary' | 'secondary' | 'tertiary'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  shadow?: boolean
}

const paddingBySize: Record<NonNullable<ThemedCardProps['padding']>, number> = {
  sm: Config.spacing.sm,
  md: Config.spacing.md,
  lg: Config.spacing.lg,
  xl: Config.spacing.xl,
}

export function ThemedCard({
  children,
  style,
  variant = 'primary',
  padding = 'md',
  shadow = true,
  ...props
}: ThemedCardProps) {
  const colorScheme = useColorScheme() ?? 'light'

  const cardStyle: ViewStyle = {
    padding: paddingBySize[padding],
  }

  const getGlassTint = () => {
    // Glass is dark mode only for now
    switch (variant) {
      case 'primary':
        return Colors.dark.glassBase
      case 'secondary':
        return Colors.dark.glassSecondary
      case 'tertiary':
        return Colors.dark.glassGhost
      default:
        return Colors.dark.glassBase
    }
  }

  const getFallbackBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return Colors[colorScheme].card
      case 'secondary':
        return Colors[colorScheme].cardSecondary
      case 'tertiary':
        return Colors[colorScheme].backgroundTertiary
      default:
        return Colors[colorScheme].card
    }
  }

  const getFallbackBorderColor = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return Colors.dark.glassBorder // Glass has a specific border
      case 'tertiary':
        return Colors[colorScheme].borderSecondary
      default:
        return Colors.dark.glassBorder
    }
  }

  return (
    <GlassSurface
      cornerRadius={Config.ui.cardBorderRadius}
      tintColor={getGlassTint()}
      fallbackBackgroundColor={getFallbackBackgroundColor()}
      fallbackBorderColor={getFallbackBorderColor()}
      style={[
        styles.card,
        cardStyle,
        shadow ? styles.shadow : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </GlassSurface>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Config.ui.shadowOpacity,
    shadowRadius: 8,
    elevation: 4,
  },
})
