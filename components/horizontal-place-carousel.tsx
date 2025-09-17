/**
 * Horizontal carousel of place cards for map mode, similar to Hotel Tonight
 */
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'

import { Place } from '@/types'

import PlaceCard from './place-card'

export interface HorizontalPlaceCarouselHandle {
  scrollToPlaceId: (placeId: string, animated?: boolean) => void
}

interface HorizontalPlaceCarouselProps {
  places: Place[]
  onPlacePress: (place: Place) => void
  selectedPlaceId?: string
  onVisiblePlaceChange?: (placeId: string) => void
}

const { width: screenWidth } = Dimensions.get('window')
const cardWidth = screenWidth * 0.85 // 85% of screen width

/**
 * Horizontal scrolling carousel of place cards for map mode
 */
const HorizontalPlaceCarousel = forwardRef<
  HorizontalPlaceCarouselHandle,
  HorizontalPlaceCarouselProps
>(function HorizontalPlaceCarousel(
  { places, onPlacePress, selectedPlaceId, onVisiblePlaceChange },
  ref
) {
  const carouselRef = useRef<ICarouselInstance>(null)

  useImperativeHandle(ref, () => ({
    scrollToPlaceId: (placeId: string, animated: boolean = true) => {
      const index = places.findIndex(p => p.id === placeId)
      if (index >= 0) {
        carouselRef.current?.scrollTo({ index, animated })
      }
    },
  }))

  const handleSnapToItem = (index: number) => {
    if (!onVisiblePlaceChange || places.length === 0) return
    const place = places[index]
    if (place) {
      onVisiblePlaceChange(place.id)
    }
  }

  const renderPlaceCard = ({ item }: { item: Place }) => (
    <View style={styles.cardContainer}>
      <PlaceCard
        place={item}
        onPress={onPlacePress}
        width={cardWidth}
        transparent
      />
    </View>
  )

  if (places.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        width={screenWidth}
        height={300} // Approximate height for the carousel
        data={places}
        renderItem={renderPlaceCard}
        onSnapToItem={handleSnapToItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 80,
        }}
        style={styles.carousel}
      />
    </View>
  )
})

export default HorizontalPlaceCarousel

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  carousel: {
    backgroundColor: 'transparent',
  },
  cardContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
