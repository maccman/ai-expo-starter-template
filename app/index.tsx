/**
 * This is the main screen of the app.
 * It's a great place to start building your app.
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'

import * as BackgroundFetch from 'expo-background-fetch'
import { Link } from 'expo-router'
import * as TaskManager from 'expo-task-manager'

import { ThemedButton } from '@/components/themed-button'
import { ThemedCard } from '@/components/themed-card'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import {
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync,
} from '@/lib/tasks'

export default function IndexScreen() {
  const [isRegistered, setIsRegistered] = React.useState(false)
  const [status, setStatus] = React.useState<
    BackgroundFetch.BackgroundFetchStatus | undefined
  >()

  React.useEffect(() => {
    checkStatusAsync()
  }, [])

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync()
    const isRegistered =
      await TaskManager.isTaskRegisteredAsync('background-fetch')
    setStatus(status)
    setIsRegistered(isRegistered)
  }

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync()
    } else {
      await registerBackgroundFetchAsync()
    }

    checkStatusAsync()
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="heading1">Expo Starter Template</ThemedText>
        <ThemedText type="body" variant="secondary">
          This is a starter template for Expo projects, featuring a glass UI and
          best practices.
        </ThemedText>
        <ThemedText type="caption">
          Background fetch status:{' '}
          <ThemedText type="caption" variant="secondary">
            {status && BackgroundFetch.BackgroundFetchStatus[status]}
          </ThemedText>
        </ThemedText>
        <Link href="/modal" asChild>
          <ThemedButton title="Show Modal" style={styles.button} />
        </Link>
      </View>

      <View style={styles.showcase}>
        <ThemedCard style={styles.card}>
          <ThemedText type="heading3">Themed Card</ThemedText>
          <ThemedText type="caption" variant="secondary">
            This is an example of a themed card component with glass effect.
          </ThemedText>
          <ThemedButton
            onPress={toggleFetchTask}
            title={
              isRegistered
                ? 'Unregister Background Fetch'
                : 'Register Background Fetch'
            }
            style={styles.button}
          />
          <ThemedButton title="Example Button" style={styles.button} />
        </ThemedCard>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 32,
  },
  content: {
    gap: 16,
    alignItems: 'center',
  },
  showcase: {
    gap: 16,
  },
  card: {
    alignItems: 'center',
    gap: 16,
  },
  button: {
    marginTop: 16,
  },
})
