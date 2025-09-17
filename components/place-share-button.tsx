/**
 * Button component for sharing a place using the native share sheet
 */
import { useCallback, useMemo } from 'react'
import { Pressable, Share, StyleProp, ViewStyle } from 'react-native'

import { Place } from '@/types'

import { ThemedText } from './themed-text'

export interface PlaceShareButtonProps {
  /**
   * The place whose details will be shared
   */
  place: Place
  /**
   * Optional label to render inside the button
   */
  label?: string
  /**
   * Optional style override for the pressable container
   */
  style?: StyleProp<ViewStyle>
  /**
   * Opacity applied while the button is pressed
   */
  pressedOpacity?: number
}

function buildMapsUrl(place: Place): string {
  const coordinatesQuery = encodeURIComponent(
    `${place.coordinates.latitude},${place.coordinates.longitude}`
  )

  return `https://www.google.com/maps/search/?api=1&query=${coordinatesQuery}&query_place_id=${encodeURIComponent(
    place.id
  )}`
}

function buildShareMessage(place: Place, mapsUrl: string): string {
  const messageParts = [place.name]

  if (place.address) {
    messageParts.push(place.address)
  }

  messageParts.push(mapsUrl)

  return messageParts.join('\n')
}

/**
 * Native share button specialized for sharing Google Maps links to a place
 */
export function PlaceShareButton({
  place,
  label = 'Share',
  style,
  pressedOpacity = 0.7,
}: PlaceShareButtonProps) {
  const mapsUrl = useMemo(() => buildMapsUrl(place), [place])
  const shareMessage = useMemo(
    () => buildShareMessage(place, mapsUrl),
    [place, mapsUrl]
  )

  const handlePress = useCallback(async () => {
    await Share.share({
      message: shareMessage,
      url: mapsUrl,
    })
  }, [mapsUrl, shareMessage])

  return (
    <Pressable
      accessibilityHint={`Share ${place.name} via the native share sheet`}
      accessibilityRole="button"
      onPress={handlePress}
      style={({ pressed }) => [
        style,
        pressed ? { opacity: pressedOpacity } : null,
      ]}
    >
      <ThemedText type="button">{label}</ThemedText>
    </Pressable>
  )
}
