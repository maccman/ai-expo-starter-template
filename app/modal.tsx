import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, View } from 'react-native'

import { ThemedButton } from '@/components/themed-button'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/colors'
import { registerBackgroundFetchAsync } from '@/lib/tasks'

export default function ModalScreen() {
  const handleScheduleTask = () => {
    void registerBackgroundFetchAsync()
  }

  const handleClose = () => {
    router.back()
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

      <View style={styles.buttonContainer}>
        <ThemedButton
          title="Schedule Background Task"
          onPress={handleScheduleTask}
        />
        <ThemedButton title="Close" onPress={handleClose} variant="tertiary" />
      </View>

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
  buttonContainer: {
    gap: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
