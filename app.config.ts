import { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Magnifico',
  slug: 'magnifico',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'magnifico',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  platforms: ['ios'],
  owner: 'alexprocesspilotdev',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.processpilot.magnifico',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSLocationWhenInUseUsageDescription:
        'Magnifico needs access to your location to show nearby premium hotels and restaurants on the map.',
      NSLocationAlwaysAndWhenInUseUsageDescription:
        'Magnifico needs access to your location to show nearby premium hotels and restaurants on the map.',
      LSApplicationQueriesSchemes: ['comgooglemaps'],
      UIBackgroundModes: [
        'fetch',
        'background-fetch',
        'remote-notification',
        'location',
      ],
      EXPO_PUBLIC_GOOGLE_MAPS_API_KEY: '$(EXPO_PUBLIC_GOOGLE_MAPS_API_KEY)',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '16.0',
        },
      },
    ],
    'expo-background-fetch',
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: '91f59fb2-ec28-40cb-a38d-3ba7520e6de0',
    },
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
})
