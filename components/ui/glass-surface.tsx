import type { PropsWithChildren } from 'react'
import {
  Platform,
  type StyleProp,
  StyleSheet,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native'

import {
  type GlassStyle,
  GlassView,
  isLiquidGlassAvailable,
} from 'expo-glass-effect'

import { Colors } from '@/constants/colors'
import { Config } from '@/constants/config'

const glassEffectSupported = Platform.OS === 'ios' && isLiquidGlassAvailable()

/**
 * Props for the {@link GlassSurface} component.
 */
export interface GlassSurfaceProps extends ViewProps {
  glassEffectStyle?: GlassStyle
  tintColor?: string
  isInteractive?: boolean
  cornerRadius?: number
  fallbackBackgroundColor?: string
  fallbackBorderColor?: string
  style?: StyleProp<ViewStyle>
}

/**
 * Returns whether the native liquid glass effect is available on this device.
 */
export function isGlassEffectSupported(): boolean {
  return glassEffectSupported
}

/**
 * Cross-platform surface that renders the native iOS liquid glass effect when available
 * and falls back to an opaque background elsewhere.
 */
export function GlassSurface({
  children,
  style,
  glassEffectStyle = 'regular',
  tintColor,
  isInteractive = false,
  cornerRadius = Config.ui.cardBorderRadius,
  fallbackBackgroundColor,
  fallbackBorderColor,
  ...viewProps
}: PropsWithChildren<GlassSurfaceProps>) {
  const baseStyle: ViewStyle = {
    borderRadius: cornerRadius,
  }

  if (glassEffectSupported) {
    const composedGlassStyle = [styles.glassBase, baseStyle, style]

    return (
      <GlassView
        {...viewProps}
        glassEffectStyle={glassEffectStyle}
        tintColor={tintColor || Colors.dark.glassBase}
        isInteractive={isInteractive}
        style={composedGlassStyle}
      >
        {children}
      </GlassView>
    )
  }

  const fallbackStyle: ViewStyle = {
    ...baseStyle,
    backgroundColor:
      fallbackBackgroundColor || Colors.dark.glassSurfaceBackground,
    borderColor: fallbackBorderColor || Colors.dark.glassBorder,
  }
  const composedFallbackStyle = [styles.fallbackBase, fallbackStyle, style]

  return (
    <View {...viewProps} style={composedFallbackStyle}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  glassBase: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark.glassBorder,
    backgroundColor: 'transparent',
  },
  fallbackBase: {
    borderWidth: StyleSheet.hairlineWidth,
  },
})
