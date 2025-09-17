/**
 * App configuration using expo-constants for better environment management
 */
import Constants from 'expo-constants'

export const Config = {
  // Google Maps API Key
  googleMapsApiKey:
    Constants.expoConfig?.extra?.googleMapsApiKey ||
    process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,

  // App configuration
  appName: Constants.expoConfig?.name || 'Magnifico',
  version: Constants.expoConfig?.version || '1.0.0',

  // Development flags
  isDev: __DEV__,
  isWeb: Constants.platform?.web !== undefined,
  isIOS: Constants.platform?.ios !== undefined,
  isAndroid: Constants.platform?.android !== undefined,

  // Feature flags
  features: {
    hapticFeedback: Constants.platform?.ios !== undefined, // Only on iOS for now
    blurEffects: true,
    imageOptimization: true,
  },

  // UI constants
  ui: {
    cardBorderRadius: 16,
    buttonBorderRadius: 24,
    shadowOpacity: 0.1,
    blurIntensity: 95,
  },

  // Spacing system
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },

  // Typography scale
  typography: {
    fontSize: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 20,
      xxxl: 24,
      heading: 32,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
  },

  // Map configuration
  map: {
    defaultLatitudeDelta: 0.05,
    defaultLongitudeDelta: 0.05,
    animationDuration: 300,
  },
} as const

export type ConfigType = typeof Config
