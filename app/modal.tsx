import { Platform, StyleSheet } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'

import { ThemedButton } from '@/components/themed-button'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/colors'
import { registerBackgroundFetchAsync } from '@/lib/tasks'

export default function ModalScreen() {
  const handleScheduleTask = () => {
    registerBackgroundFetchAsync()
  }

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.primary, Colors.dark.brand]}
        style={styles.gradient}
      />
      <ThemedText type="title">Modal</ThemedText>
      <ThemedView
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <ThemedButton
        title="Schedule Background Task"
        onPress={handleScheduleTask}
      />

      {/* Use a light status bar on iOS to account for the black background. On Android, icons are on a light background. */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
