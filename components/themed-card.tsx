/**
 * Themed card component with consistent styling
 */
import { StyleSheet, type ViewProps, type ViewStyle } from 'react-native'

import { GlassSurface } from '@/components/ui/glass-surface'
import { Colors } from '@/constants/colors'
import { Config } from '@/constants/config'

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

const glassTintByVariant: Record<
  NonNullable<ThemedCardProps['variant']>,
  string
> = {
  primary: Colors.glassBase,
  secondary: Colors.glassSecondary,
  tertiary: Colors.glassGhost,
}

const fallbackBackgroundByVariant: Record<
  NonNullable<ThemedCardProps['variant']>,
  string
> = {
  primary: Colors.card,
  secondary: Colors.cardSecondary,
  tertiary: Colors.backgroundTertiary,
}

const fallbackBorderByVariant: Record<
  NonNullable<ThemedCardProps['variant']>,
  string
> = {
  primary: Colors.glassBorder,
  secondary: Colors.glassBorder,
  tertiary: Colors.borderSecondary,
}

export function ThemedCard({
  children,
  style,
  variant = 'primary',
  padding = 'md',
  shadow = true,
  ...props
}: ThemedCardProps) {
  const cardStyle: ViewStyle = {
    padding: paddingBySize[padding],
  }

  return (
    <GlassSurface
      cornerRadius={Config.ui.cardBorderRadius}
      tintColor={glassTintByVariant[variant]}
      fallbackBackgroundColor={fallbackBackgroundByVariant[variant]}
      fallbackBorderColor={fallbackBorderByVariant[variant]}
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
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Config.ui.shadowOpacity,
    shadowRadius: 8,
    elevation: 4,
  },
})
