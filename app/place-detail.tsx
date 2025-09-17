/**
 * Place detail screen with image gallery
 */
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import { Image } from 'expo-image'
import { router } from 'expo-router'

import {
  AddressButton,
  HotelAmenitiesSection,
  PlaceShareButton,
  PriceIndicator,
  ThemedCard,
  ThemedSection,
  ThemedText,
} from '@/components'
import { Config } from '@/constants/config'
import { usePlaceDetailParams } from '@/hooks'
import type { Place as GooglePlace } from '@/lib/google-places/types'
import { scoreHotel, scoreRestaurant } from '@/lib/places-scoring'
import type { PlaceScore, ScoringBreakdown } from '@/lib/places-scoring/types'
import {
  hotelScoringWeights,
  restaurantScoringWeights,
} from '@/lib/places-scoring/types'

const { width: screenWidth } = Dimensions.get('window')

/**
 * Displays a single scoring component with icon and detailed explanation
 */
function ScoreItem({
  label,
  score,
  reason,
  icon,
}: {
  label: string
  score: number
  reason: string
  icon: string
}) {
  if (score === 0) return null

  const isNegative = score < 0

  return (
    <ThemedCard variant="primary" padding="md" style={styles.scoreItem}>
      <ThemedText type="body" style={styles.scoreIcon}>
        {icon}
      </ThemedText>
      <View style={styles.scoreContent}>
        <View style={styles.scoreLabelRow}>
          <ThemedText type="bodyBold">{label}</ThemedText>
          <ThemedCard
            variant="tertiary"
            padding="sm"
            style={[
              styles.scoreBadge,
              {
                backgroundColor: isNegative
                  ? '#FF6B6B'
                  : score >= 1.0
                    ? '#4ECDC4'
                    : '#FFA726',
              },
            ]}
          >
            <ThemedText type="label" variant="primary">
              {isNegative ? '' : '+'}
              {score.toFixed(1)}
            </ThemedText>
          </ThemedCard>
        </View>
        <ThemedText type="caption" variant="secondary">
          {reason}
        </ThemedText>
      </View>
    </ThemedCard>
  )
}

/**
 * Displays the complete scoring breakdown
 */
function ScoringBreakdownSection({
  breakdown,
  totalScore,
}: {
  breakdown: ScoringBreakdown
  totalScore: number
}) {
  const significantScores = [
    { component: breakdown.brand, label: 'Brand Recognition', icon: '🏆' },
    { component: breakdown.price, label: 'Price Level', icon: '💰' },
    { component: breakdown.keywords, label: 'Style & Keywords', icon: '✨' },
    { component: breakdown.location, label: 'Location Quality', icon: '📍' },
    { component: breakdown.category, label: 'Cuisine Type', icon: '🍽️' },
    { component: breakdown.reviews, label: 'Review Popularity', icon: '👥' },
  ].filter(item => item.component.score !== 0)

  if (significantScores.length === 0) return null

  return (
    <ThemedCard variant="secondary" style={styles.scoringSection}>
      <View style={styles.scoringHeader}>
        <ThemedText type="heading3">Why This Place Ranks High</ThemedText>
        <ThemedCard
          variant="tertiary"
          padding="sm"
          style={styles.totalScoreBadge}
        >
          <ThemedText type="bodyBold">{totalScore.toFixed(1)}</ThemedText>
        </ThemedCard>
      </View>
      <ThemedText
        type="caption"
        variant="secondary"
        style={styles.scoringSubtitle}
      >
        Here&apos;s how our algorithm scored this{' '}
        {breakdown.brand.reason.includes('N/A') ? 'restaurant' : 'hotel'}:
      </ThemedText>
      <View style={styles.scoresContainer}>
        {significantScores.map((item, index) => (
          <ScoreItem
            key={index}
            label={item.label}
            score={item.component.score}
            reason={item.component.reason}
            icon={item.icon}
          />
        ))}
      </View>
    </ThemedCard>
  )
}

/**
 * Detail screen showing expanded place information with image gallery and scoring breakdown
 */
export default function PlaceDetailScreen() {
  const { place, error } = usePlaceDetailParams()
  const insets = useSafeAreaInsets()

  // Convert local Place to GooglePlace for scoring using real data
  const googlePlace: GooglePlace | null = place
    ? {
        id: place.id,
        displayName: {
          text: place.name,
          languageCode: place.languageCode || 'en',
        },
        formattedAddress: place.address || '',
        rating: place.rating,
        userRatingCount: place.userRatingCount,
        priceLevel: place.priceLevel,
        types:
          place.types ||
          (place.type === 'hotel'
            ? ['lodging', 'establishment']
            : ['restaurant', 'establishment']),
      }
    : null

  // Calculate scoring breakdown
  const scoringResult: PlaceScore<GooglePlace> | null =
    googlePlace && place
      ? place.type === 'hotel'
        ? scoreHotel(googlePlace, hotelScoringWeights)
        : scoreRestaurant(googlePlace, restaurantScoringWeights)
      : null

  if (!place || error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ThemedText type="heading2" variant="error">
            {error || 'Place not found'}
          </ThemedText>
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => router.back()}
          >
            <ThemedText type="button">Go Back</ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  }

  const handleBackPress = () => {
    router.back()
  }

  // Render individual image in top gallery
  const renderImage = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.topGalleryImageContainer}>
      <Image
        source={
          item ||
          `https://via.placeholder.com/400x300/E5E5E5/666666?text=📸+${index + 1}`
        }
        style={styles.topGalleryImage}
        contentFit="cover"
        transition={200}
        placeholder={`📸 ${index + 1}`}
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation and share controls */}
      <View style={[styles.headerButtonsContainer, { top: insets.top + 10 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={handleBackPress}
        >
          <ThemedText type="button">← Back</ThemedText>
        </Pressable>
        <PlaceShareButton place={place} style={styles.backButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo gallery at top */}
        {place.images && place.images.length > 0 ? (
          <View style={styles.topGalleryContainer}>
            <FlatList
              data={place.images}
              renderItem={renderImage}
              keyExtractor={(item, index) => `image-${index}`}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={screenWidth}
              decelerationRate="fast"
              contentContainerStyle={styles.topGalleryContent}
            />
          </View>
        ) : (
          <View style={styles.placeholderImageContainer}>
            <Image
              source="https://via.placeholder.com/400x300/F5F5F5/666666?text=📸"
              style={styles.placeholderImage}
              contentFit="cover"
              transition={300}
              placeholder="📸"
            />
          </View>
        )}

        {/* Content sections with consistent spacing */}
        <ThemedSection
          spacing="lg"
          style={{ paddingHorizontal: Config.spacing.lg }}
        >
          {/* Name container */}
          <Animated.View style={styles.nameContainer}>
            <ThemedText type="heading1">{place.name}</ThemedText>
            <View style={styles.placeMetadata}>
              <ThemedText type="body" variant="secondary">
                ⭐ {place.rating} - Google Rating
              </ThemedText>
              <PriceIndicator priceLevel={place.priceLevel} size="medium" />
            </View>
          </Animated.View>

          {/* Description */}
          {place.description && (
            <ThemedSection title="About" spacing="md">
              <ThemedText type="body">{place.description}</ThemedText>
            </ThemedSection>
          )}

          {/* Address */}
          {place.address && (
            <AddressButton
              address={place.address}
              coordinates={place.coordinates}
              placeName={place.name}
            />
          )}

          {/* Hotel Amenities - only show for hotels */}
          {place.type === 'hotel' && googlePlace && (
            <HotelAmenitiesSection place={googlePlace} />
          )}

          {/* Scoring breakdown - moved to bottom */}
          {scoringResult && (
            <ScoringBreakdownSection
              breakdown={scoringResult.breakdown}
              totalScore={scoringResult.totalScore}
            />
          )}
        </ThemedSection>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  content: {
    flex: 1,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: Config.spacing.md,
    paddingVertical: Config.spacing.sm,
    borderRadius: Config.spacing.lg,
  },
  headerButtonsContainer: {
    position: 'absolute',
    left: Config.spacing.lg,
    right: Config.spacing.lg,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Top gallery styles
  topGalleryContainer: {
    height: 300,
    backgroundColor: '#F5F5F5',
  },
  topGalleryContent: {
    alignItems: 'center',
  },
  topGalleryImageContainer: {
    width: screenWidth,
    height: 300,
  },
  topGalleryImage: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  placeholderImageContainer: {
    height: 300,
    backgroundColor: '#F5F5F5',
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  nameContainer: {
    paddingVertical: Config.spacing.md,
  },
  placeMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Config.spacing.md,
  },
  // Removed unused description styles - using ThemedSection now
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F5F5F5',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#8A8A8E',
    marginBottom: 8,
  },

  // Simplified scoring section styles using themed components
  scoringSection: {
    marginHorizontal: 0,
  },
  scoringHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Config.spacing.sm,
  },
  totalScoreBadge: {
    backgroundColor: '#4ECDC4',
  },
  scoringSubtitle: {
    marginBottom: Config.spacing.md,
  },
  scoresContainer: {
    gap: Config.spacing.md,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  scoreIcon: {
    fontSize: 20,
    marginRight: Config.spacing.md,
    marginTop: 2,
  },
  scoreContent: {
    flex: 1,
  },
  scoreLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Config.spacing.xs,
  },
  scoreBadge: {
    marginLeft: Config.spacing.md,
  },
})
