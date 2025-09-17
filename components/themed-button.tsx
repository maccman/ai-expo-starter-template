import {
  Pressable,
  type PressableProps,
  StyleSheet,
  type ViewStyle,
} from 'react-native'

import { GlassSurface } from '@/components/ui/glass-surface'
import { Colors } from '@/constants/colors'
import { Config } from '@/constants/config'
import { useColorScheme } from '@/hooks/use-color-scheme'

import { ThemedText } from './themed-text'

export type ThemedButtonProps = PressableProps & {
  title: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}

const paddingBySize: Record<
  NonNullable<ThemedButtonProps['size']>,
  ViewStyle
> = {
  sm: {
    paddingVertical: Config.spacing.sm,
    paddingHorizontal: Config.spacing.md,
  },
  md: {
    paddingVertical: Config.spacing.md,
    paddingHorizontal: Config.spacing.lg,
  },
  lg: {
    paddingVertical: Config.spacing.lg,
    paddingHorizontal: Config.spacing.xl,
  },
}

const pressableBaseStyle = StyleSheet.create({
  wrapper: {
    borderRadius: Config.ui.buttonBorderRadius,
    overflow: 'hidden',
  },
})

const contentBaseStyle = StyleSheet.create({
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Config.spacing.xs,
  },
  outlined: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  ghost: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.95,
  },
})

const textStyles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
  },
})

const getFallbackBackground = (
  variant: NonNullable<ThemedButtonProps['variant']>,
  pressed: boolean,
  disabled: boolean,
  colorScheme: 'light' | 'dark'
) => {
  if (disabled) {
    return Colors[colorScheme].buttonDisabled
  }

  if (pressed) {
    return Colors[colorScheme].cardHover
  }

  switch (variant) {
    case 'primary':
      return Colors[colorScheme].buttonPrimary
    case 'secondary':
      return Colors[colorScheme].buttonSecondary
    case 'tertiary':
      return Colors[colorScheme].card
    case 'ghost':
      return 'transparent'
    default:
      return Colors[colorScheme].buttonPrimary
  }
}

const getGlassTint = (
  variant: NonNullable<ThemedButtonProps['variant']>,
  pressed: boolean,
  disabled: boolean
) => {
  if (disabled) {
    return Colors.dark.glassDisabled // Assuming glass is only for dark mode
  }

  const tint =
    variant === 'primary'
      ? {
          default: Colors.dark.glassPrimary,
          pressed: Colors.dark.glassPrimaryPressed,
        }
      : variant === 'secondary'
        ? {
            default: Colors.dark.glassSecondary,
            pressed: Colors.dark.glassSecondaryPressed,
          }
        : variant === 'tertiary'
          ? {
              default: Colors.dark.glassBase,
              pressed: Colors.dark.glassBasePressed,
            }
          : {
              default: Colors.dark.glassGhost,
              pressed: Colors.dark.glassGhostPressed,
            }
  return pressed ? tint.pressed : tint.default
}

const getTextVariant = (
  variant: NonNullable<ThemedButtonProps['variant']>,
  disabled: boolean
) => {
  if (disabled) {
    return 'tertiary'
  }

  return variant === 'ghost' ? 'secondary' : 'primary'
}

/**
 * Themed button component with native iOS glass support.
 */
export function ThemedButton({
  title,
  style,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  ...props
}: ThemedButtonProps) {
  const colorScheme = useColorScheme() ?? 'light'
  const pressableStyle: PressableProps['style'] =
    typeof style === 'function'
      ? state => [pressableBaseStyle.wrapper, style(state)]
      : [pressableBaseStyle.wrapper, style]

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      style={pressableStyle}
      {...props}
    >
      {pressState => {
        const fallbackBackgroundColor = getFallbackBackground(
          variant,
          pressState.pressed,
          disabled,
          colorScheme
        )
        const glassTint = getGlassTint(variant, pressState.pressed, disabled)
        const borderColor =
          variant === 'tertiary' ? Colors[colorScheme].border : 'transparent'
        const borderStyle =
          variant === 'tertiary'
            ? contentBaseStyle.outlined
            : variant === 'ghost'
              ? contentBaseStyle.ghost
              : undefined

        return (
          <GlassSurface
            cornerRadius={Config.ui.buttonBorderRadius}
            tintColor={glassTint}
            fallbackBackgroundColor={fallbackBackgroundColor}
            fallbackBorderColor={borderColor}
            style={[
              contentBaseStyle.inner,
              paddingBySize[size],
              borderStyle,
              pressState.pressed ? contentBaseStyle.pressed : undefined,
              disabled ? contentBaseStyle.disabled : undefined,
            ]}
          >
            <ThemedText
              type="button"
              variant={getTextVariant(variant, disabled)}
              style={textStyles.buttonText}
            >
              {loading ? 'Loading...' : title}
            </ThemedText>
          </GlassSurface>
        )
      }}
    </Pressable>
  )
}
