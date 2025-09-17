/**
 * Address button component that opens the location in Maps when tapped
 */
import { Alert, Pressable, StyleSheet, View } from 'react-native'

import * as Linking from 'expo-linking'

import { Colors } from '@/constants/colors'
import { Config } from '@/constants/config'

import { ThemedSection } from './themed-section'
import { ThemedText } from './themed-text'

export interface AddressButtonProps {
  address: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  placeName?: string
}

function buildGoogleMapsAppUrl({
  address,
  coordinates,
  placeName,
}: AddressButtonProps) {
  if (coordinates) {
    const query = placeName ? `&q=${encodeURIComponent(placeName)}` : ''
    return `comgooglemaps://?ll=${coordinates.latitude},${coordinates.longitude}${query}`
  }

  return `comgooglemaps://?q=${encodeURIComponent(address)}`
}

function buildAppleMapsUrl({
  address,
  coordinates,
  placeName,
}: AddressButtonProps) {
  if (coordinates) {
    const query = placeName ? `&q=${encodeURIComponent(placeName)}` : ''
    return `maps://?ll=${coordinates.latitude},${coordinates.longitude}${query}`
  }

  return `maps://?q=${encodeURIComponent(address)}`
}

function buildGoogleMapsWebUrl({ address, coordinates }: AddressButtonProps) {
  if (coordinates) {
    return `https://maps.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}`
}

async function tryOpenUrl(url: string) {
  try {
    const canOpen = await Linking.canOpenURL(url)

    if (!canOpen) {
      return false
    }

    await Linking.openURL(url)
    return true
  } catch (error) {
    console.warn('Failed to open URL:', error)
    return false
  }
}

/**
 * Opens the address in Google Maps app if available, falls back to Apple Maps, then Google Maps web
 */
async function openInMaps({
  address,
  coordinates,
  placeName,
}: AddressButtonProps) {
  try {
    const googleMapsAppUrl = buildGoogleMapsAppUrl({
      address,
      coordinates,
      placeName,
    })
    const appleMapsUrl = buildAppleMapsUrl({ address, coordinates, placeName })
    const googleMapsWebUrl = buildGoogleMapsWebUrl({ address, coordinates })

    const openedGoogleMaps = await tryOpenUrl(googleMapsAppUrl)

    if (openedGoogleMaps) {
      return
    }

    const openedAppleMaps = await tryOpenUrl(appleMapsUrl)

    if (openedAppleMaps) {
      return
    }

    await Linking.openURL(googleMapsWebUrl)
  } catch (error) {
    console.error('Failed to open maps:', error)
    Alert.alert(
      'Cannot Open Maps',
      'Unable to open the Maps app. Please check the address manually.',
      [{ text: 'OK' }]
    )
  }
}

/**
 * Button component for displaying an address that opens Maps when tapped
 */
export function AddressButton({
  address,
  coordinates,
  placeName,
}: AddressButtonProps) {
  const handlePress = () => {
    openInMaps({ address, coordinates, placeName })
  }

  return (
    <ThemedSection title="Address" spacing="sm">
      <Pressable
        style={({ pressed }) => [
          styles.addressButton,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={handlePress}
      >
        <ThemedText type="body" style={styles.mapIcon}>
          📍
        </ThemedText>
        <View style={styles.addressContent}>
          <ThemedText type="body">{address}</ThemedText>
        </View>
      </Pressable>
    </ThemedSection>
  )
}

const styles = StyleSheet.create({
  addressButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.card,
    borderRadius: Config.ui.cardBorderRadius,
    padding: Config.spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mapIcon: {
    fontSize: 18,
    marginRight: Config.spacing.md,
    marginTop: 2,
  },
  addressContent: {
    flex: 1,
  },
})
