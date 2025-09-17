/**
 * Hotel amenities display component for place detail screen
 * Shows amenities grouped by category with confidence indicators
 */
import { StyleSheet, View } from 'react-native'

import { Colors } from '@/constants/colors'
import { Config } from '@/constants/config'
import type { HotelAmenity } from '@/lib/amenities/hotel-amenities'
import {
  getAllHotelAmenities,
  groupAmenitiesByCategory,
} from '@/lib/amenities/hotel-amenities'
import type { Place as GooglePlace } from '@/lib/google-places/types'

import { ThemedCard } from './themed-card'
import { ThemedSection } from './themed-section'
import { ThemedText } from './themed-text'

export interface HotelAmenitiesSectionProps {
  place: GooglePlace
}

/**
 * Individual amenity item component
 */
function AmenityItem({ amenity }: { amenity: HotelAmenity }) {
  const isConfirmed = amenity.confidence === 'high'

  return (
    <ThemedCard variant="primary" padding="sm" style={styles.amenityItem}>
      <ThemedText type="body" style={styles.amenityIcon}>
        {amenity.icon}
      </ThemedText>
      <ThemedText
        type="caption"
        variant={isConfirmed ? 'primary' : 'secondary'}
        style={styles.amenityText}
      >
        {amenity.name}
      </ThemedText>
      {!isConfirmed && (
        <ThemedCard
          variant="tertiary"
          padding="sm"
          style={styles.inferredBadge}
        >
          <ThemedText type="label" variant="primary">
            likely
          </ThemedText>
        </ThemedCard>
      )}
    </ThemedCard>
  )
}

/**
 * Category group component
 */
function CategoryGroup({
  title,
  amenities,
}: {
  title: string
  amenities: HotelAmenity[]
}) {
  if (amenities.length === 0) return null

  return (
    <ThemedSection title={title} titleType="heading3" spacing="md">
      <View style={styles.amenitiesGrid}>
        {amenities.map(amenity => (
          <AmenityItem key={amenity.id} amenity={amenity} />
        ))}
      </View>
    </ThemedSection>
  )
}

/**
 * Main hotel amenities section component
 */
export function HotelAmenitiesSection({ place }: HotelAmenitiesSectionProps) {
  const amenities = getAllHotelAmenities(place)

  if (amenities.length === 0) {
    return null
  }

  const groupedAmenities = groupAmenitiesByCategory(amenities)

  // Category display order and labels
  const categoryOrder = [
    { key: 'fitness', label: 'Fitness & Recreation' },
    { key: 'services', label: 'Services' },
    { key: 'dining', label: 'Dining' },
    { key: 'family', label: 'Family & Pets' },
    { key: 'accessibility', label: 'Accessibility' },
  ]

  return (
    <ThemedSection title="Hotel Amenities" titleType="heading2" spacing="xl">
      {categoryOrder.map(({ key, label }) => (
        <CategoryGroup
          key={key}
          title={label}
          amenities={groupedAmenities[key] || []}
        />
      ))}
    </ThemedSection>
  )
}

const styles = StyleSheet.create({
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Config.spacing.md,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Config.spacing.sm,
    minWidth: '45%',
    maxWidth: '48%',
  },
  amenityIcon: {
    fontSize: 16,
    marginRight: Config.spacing.sm,
  },
  amenityText: {
    flex: 1,
  },
  inferredBadge: {
    backgroundColor: Colors.badgeBackground,
    marginLeft: Config.spacing.xs,
  },
})
