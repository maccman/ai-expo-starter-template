/**
 * This is the main screen of the app.
 * It's a great place to start building your app.
 */
import { StyleSheet, View } from 'react-native'

import { ThemedButton } from '@/components/themed-button'
import { ThemedCard } from '@/components/themed-card'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'

export default function IndexScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="heading1">Expo Starter Template</ThemedText>
        <ThemedText type="body" variant="secondary">
          This is a starter template for Expo projects, featuring a glass UI and
          best practices.
        </ThemedText>
      </View>

      <View style={styles.showcase}>
        <ThemedCard style={styles.card}>
          <ThemedText type="heading3">Themed Card</ThemedText>
          <ThemedText type="caption" variant="secondary">
            This is an example of a themed card component with glass effect.
          </ThemedText>
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
