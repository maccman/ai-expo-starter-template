import { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Expo Starter Template',
  slug: 'expo-starter-template',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'expo-starter-template',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  platforms: ['ios'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.expo.starter.template',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
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
  },
})
