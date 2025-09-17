/**
 * Place card component with shared element support for images and names
 */
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'

import { BlurView } from 'expo-blur'
import * as Haptics from 'expo-haptics'
// import Animated from 'react-native-reanimated' // Will be re-added when shared transitions are stable
import { Image } from 'expo-image'

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/colors'
import { Config } from '@/constants/config'

import { Place } from '../types'

interface PlaceCardProps {
  place: Place
  onPress: (place: Place) => void
  width?: number
  transparent?: boolean
}

const { width: screenWidth } = Dimensions.get('window')
const cardWidth = screenWidth - 40 // 20px margin on each side

/**
 * Card displaying place information with shared element transitions
 */
export default function PlaceCard({
  place,
  onPress,
  width,
  transparent,
}: PlaceCardProps) {
  const handlePress = () => {
    if (Config.features.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    onPress(place)
  }

  const cardContent = (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        width ? { width } : undefined,
        { opacity: pressed ? 0.9 : 1 },
      ]}
      onPress={handlePress}
    >
      {/* Image container - shared transitions will be added when stable */}
      <View style={styles.imageContainer}>
        <Image
          source={
            place.images?.[0] ||
            'https://via.placeholder.com/400x225/F5F5F5/666666?text=📸'
          }
          style={styles.image}
          contentFit="cover"
          transition={200}
          placeholder="📸"
        />
      </View>

      {/* Name container - shared transitions will be added when stable */}
      <View style={styles.nameContainer}>
        <ThemedText
          type="defaultSemiBold"
          style={styles.placeName}
          numberOfLines={2}
        >
          {place.name}
        </ThemedText>
        {place.rating && (
          <View style={styles.ratingContainer}>
            <ThemedText style={[styles.starIcon, { color: Colors.text }]}>
              ⭐
            </ThemedText>
            <ThemedText style={[styles.ratingText, { color: Colors.icon }]}>
              {place.rating.toFixed(1)}
            </ThemedText>
          </View>
        )}
      </View>
    </Pressable>
  )

  if (transparent) {
    return (
      <BlurView
        intensity={Config.ui.blurIntensity}
        tint="dark"
        style={[
          styles.container,
          styles.transparentContainer,
          width ? { width } : undefined,
        ]}
      >
        {cardContent}
      </BlurView>
    )
  }

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: Colors.card },
        width ? { width } : undefined,
      ]}
    >
      {cardContent}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: Config.ui.cardBorderRadius,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Config.ui.shadowOpacity,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  transparentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pressable: {
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: Config.ui.cardBorderRadius,
    borderTopRightRadius: Config.ui.cardBorderRadius,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  nameContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  placeName: {
    fontSize: 18,
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
})
