import 'react-native-reanimated'

import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { LocationProvider } from '@/contexts'

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <LocationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="place-detail"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="search-location"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </LocationProvider>
  )
}
