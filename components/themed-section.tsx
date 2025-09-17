/**
 * Themed section component for consistent section styling
 */
import { StyleSheet, View, type ViewProps } from 'react-native'

import { Config } from '@/constants/config'

import { ThemedText } from './themed-text'

export type ThemedSectionProps = ViewProps & {
  title?: string
  subtitle?: string
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  titleType?: 'heading1' | 'heading2' | 'heading3'
}

export function ThemedSection({
  title,
  subtitle,
  children,
  style,
  spacing = 'lg',
  titleType = 'heading3',
  ...props
}: ThemedSectionProps) {
  const getSpacing = () => {
    switch (spacing) {
      case 'sm':
        return Config.spacing.sm
      case 'md':
        return Config.spacing.md
      case 'lg':
        return Config.spacing.lg
      case 'xl':
        return Config.spacing.xl
      default:
        return Config.spacing.lg
    }
  }

  return (
    <View style={[{ gap: getSpacing() }, style]} {...props}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && (
            <ThemedText type={titleType} style={styles.title}>
              {title}
            </ThemedText>
          )}
          {subtitle && (
            <ThemedText
              type="caption"
              variant="secondary"
              style={styles.subtitle}
            >
              {subtitle}
            </ThemedText>
          )}
        </View>
      )}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    gap: Config.spacing.xs,
  },
  title: {
    // Additional title styling can go here
  },
  subtitle: {
    // Additional subtitle styling can go here
  },
})
