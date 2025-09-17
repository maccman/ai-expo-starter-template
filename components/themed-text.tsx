import { StyleSheet, Text, type TextProps } from 'react-native'

import { Colors } from '@/constants/colors'
import { Config } from '@/constants/config'
import { useColorScheme } from '@/hooks/use-color-scheme'

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?:
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'body'
    | 'bodyBold'
    | 'caption'
    | 'label'
    | 'button'
    | 'link'
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle' // Legacy support
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'error'
    | 'success'
    | 'warning'
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'body',
  variant = 'primary',
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme() ?? 'light'

  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return Colors[colorScheme].textSecondary
      case 'tertiary':
        return Colors[colorScheme].textTertiary
      case 'error':
        return Colors[colorScheme].textError
      case 'success':
        return Colors[colorScheme].textSuccess
      case 'warning':
        return Colors[colorScheme].textWarning
      default:
        return Colors[colorScheme].text
    }
  }

  return (
    <Text
      style={[
        { color: getTextColor() },
        // New typography system
        type === 'heading1' ? styles.heading1 : undefined,
        type === 'heading2' ? styles.heading2 : undefined,
        type === 'heading3' ? styles.heading3 : undefined,
        type === 'body' ? styles.body : undefined,
        type === 'bodyBold' ? styles.bodyBold : undefined,
        type === 'caption' ? styles.caption : undefined,
        type === 'label' ? styles.label : undefined,
        type === 'button' ? styles.button : undefined,
        type === 'link' ? styles.link : undefined,
        // Legacy support
        type === 'default' ? styles.body : undefined,
        type === 'title' ? styles.heading1 : undefined,
        type === 'defaultSemiBold' ? styles.bodyBold : undefined,
        type === 'subtitle' ? styles.heading3 : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  // New typography system
  heading1: {
    fontSize: Config.typography.fontSize.heading,
    fontWeight: Config.typography.fontWeight.bold,
    lineHeight:
      Config.typography.fontSize.heading * Config.typography.lineHeight.tight,
  },
  heading2: {
    fontSize: Config.typography.fontSize.xxxl,
    fontWeight: Config.typography.fontWeight.bold,
    lineHeight:
      Config.typography.fontSize.xxxl * Config.typography.lineHeight.tight,
  },
  heading3: {
    fontSize: Config.typography.fontSize.xxl,
    fontWeight: Config.typography.fontWeight.semiBold,
    lineHeight:
      Config.typography.fontSize.xxl * Config.typography.lineHeight.normal,
  },
  body: {
    fontSize: Config.typography.fontSize.lg,
    fontWeight: Config.typography.fontWeight.normal,
    lineHeight:
      Config.typography.fontSize.lg * Config.typography.lineHeight.normal,
  },
  bodyBold: {
    fontSize: Config.typography.fontSize.lg,
    fontWeight: Config.typography.fontWeight.semiBold,
    lineHeight:
      Config.typography.fontSize.lg * Config.typography.lineHeight.normal,
  },
  caption: {
    fontSize: Config.typography.fontSize.md,
    fontWeight: Config.typography.fontWeight.normal,
    lineHeight:
      Config.typography.fontSize.md * Config.typography.lineHeight.normal,
  },
  label: {
    fontSize: Config.typography.fontSize.sm,
    fontWeight: Config.typography.fontWeight.medium,
    lineHeight:
      Config.typography.fontSize.sm * Config.typography.lineHeight.normal,
  },
  button: {
    fontSize: Config.typography.fontSize.lg,
    fontWeight: Config.typography.fontWeight.semiBold,
    lineHeight:
      Config.typography.fontSize.lg * Config.typography.lineHeight.tight,
  },
  link: {
    fontSize: Config.typography.fontSize.lg,
    fontWeight: Config.typography.fontWeight.medium,
    lineHeight:
      Config.typography.fontSize.lg * Config.typography.lineHeight.relaxed,
    color: Colors.dark.buttonSecondary, // Keep this dark for links
  },
})
