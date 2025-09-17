/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'react-native-reanimated'

import { useFonts } from 'expo-font'
import { SplashScreen, Tabs } from 'expo-router'
import React, { useEffect } from 'react'

import { TabBarIcon } from '@/components/navigation/tab-bar-icon'
import { Colors } from '@/constants/colors'
import { useColorScheme } from '@/hooks/use-color-scheme'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const SpaceMono = require('../../assets/fonts/SpaceMono-Regular.ttf')

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync()

export default function TabLayout() {
  const colorScheme = useColorScheme()

  const [loaded] = useFonts({
    SpaceMono,
  })

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'code-slash' : 'code-slash-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
