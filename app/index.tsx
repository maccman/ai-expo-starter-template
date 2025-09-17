/**
 * Main discovery screen with list/map modes for hotels and restaurants
 */
import React, { useCallback, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'

import BackToListButton from '@/components/back-to-list-button'
import type { HorizontalPlaceCarouselHandle } from '@/components/horizontal-place-carousel'
import HorizontalPlaceCarousel from '@/components/horizontal-place-carousel'
import PlaceCard from '@/components/place-card'
import { ThemedView } from '@/components/themed-view'
import TypeToggle from '@/components/type-toggle'
import { GlassSurface } from '@/components/ui/glass-surface'
import WhereButton from '@/components/where-button'
import { Colors } from '@/constants/colors'
import { Config } from '@/constants/config'
import { darkMapStyle } from '@/constants/map-styles'
import { useLocationContext } from '@/contexts'
import { usePlaces } from '@/hooks'
import { Place, PlaceType, ViewMode } from '@/types'

/**
 * Main screen for discovering nearby hotels and restaurants
 */
export default function DiscoverScreen() {
  const [selectedType, setSelectedType] = useState<PlaceType>('hotel')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null)
  const insets = useSafeAreaInsets()
  const carouselRef = useRef<HorizontalPlaceCarouselHandle>(null)
  const mapRef = useRef<MapView>(null)

  // Location and places data
  const {
    coordinates,
    label,
    viewport,
    loading: locationLoading,
  } = useLocationContext()
  const { places, loading } = usePlaces(
    coordinates,
    selectedType,
    viewport || undefined
  )

  const handleWherePress = () => {
    router.push('/search-location')
  }

  const handlePlacePress = (place: Place) => {
    router.push({
      pathname: '/place-detail',
      params: {
        placeId: place.id,
        name: place.name,
        rating: place.rating.toString(),
        type: place.type,
        latitude: place.coordinates.latitude.toString(),
        longitude: place.coordinates.longitude.toString(),
        address: place.address || '',
        description: place.description || '',
        images: place.images.join(','),
        // Include scoring fields
        userRatingCount: place.userRatingCount?.toString(),
        priceLevel: place.priceLevel,
        languageCode: place.languageCode,
        types: place.types?.join(','),
      },
    })
  }

  const handleMapPress = () => {
    if (viewMode === 'list') {
      setViewMode('map')
    }
  }

  const handleMarkerPress = (place: Place) => {
    setSelectedPlaceId(place.id)
    if (viewMode === 'list') {
      setViewMode('map')
      // Scroll after mode switch
      setTimeout(() => {
        carouselRef.current?.scrollToPlaceId(place.id, true)
      }, Config.map.animationDuration)
    } else {
      carouselRef.current?.scrollToPlaceId(place.id, true)
    }
  }

  const handleBackToList = () => {
    setViewMode('list')
  }

  // Recenter map on the selected place
  const recenterMap = useCallback(
    (placeId: string) => {
      const place = places.find(p => p.id === placeId)
      if (place && mapRef.current && viewMode === 'map') {
        mapRef.current.animateToRegion(
          {
            latitude: place.coordinates.latitude,
            longitude: place.coordinates.longitude,
            latitudeDelta: Config.map.defaultLatitudeDelta,
            longitudeDelta: Config.map.defaultLongitudeDelta,
          },
          Config.map.animationDuration
        )
      }
    },
    [places, viewMode]
  )

  // Handle visible place change in carousel
  const handleVisiblePlaceChange = useCallback(
    (placeId: string) => {
      setSelectedPlaceId(placeId)
      recenterMap(placeId)
    },
    [recenterMap]
  )

  const region = coordinates
    ? {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: Config.map.defaultLatitudeDelta,
        longitudeDelta: Config.map.defaultLongitudeDelta,
      }
    : null

  return (
    <ThemedView style={styles.container}>
      {/* Header - floats over everything */}
      <GlassSurface
        glassEffectStyle="regular"
        tintColor={Colors.glassBase}
        fallbackBackgroundColor={Colors.glassSurfaceBackground}
        fallbackBorderColor="transparent"
        cornerRadius={0}
        isInteractive
        style={[styles.header, { paddingTop: insets.top + Config.spacing.md }]}
      >
        <WhereButton
          label={label}
          loading={locationLoading}
          onPress={handleWherePress}
        />
        <TypeToggle
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />
      </GlassSurface>

      {viewMode === 'list' ? (
        /* LIST MODE - Hotel Tonight style with map peek */
        <View style={styles.listModeContainer}>
          {/* Map peek at top */}
          {region && (
            <View style={styles.mapPeekContainer}>
              <MapView
                style={styles.mapPeek}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                region={region}
                onPress={handleMapPress}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                customMapStyle={darkMapStyle}
              >
                {places.map(place => (
                  <Marker
                    key={place.id}
                    coordinate={place.coordinates}
                    title={place.name}
                    onPress={() => handleMarkerPress(place)}
                    pinColor={
                      selectedPlaceId === place.id
                        ? Colors.primary
                        : Colors.secondary
                    }
                  />
                ))}
              </MapView>

              {/* 1px black border fix */}
              <View style={styles.mapBorderFix} />
            </View>
          )}

          {/* List area - dominant space */}
          <View style={styles.listArea}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator />
              </View>
            ) : (
              <FlatList
                key={selectedType}
                data={places}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <PlaceCard place={item} onPress={handlePlacePress} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              />
            )}
          </View>
        </View>
      ) : (
        /* MAP MODE - Full screen with horizontal carousel */
        <View style={styles.mapModeContainer}>
          {/* Full screen map */}
          {region && (
            <MapView
              ref={mapRef}
              style={styles.mapFull}
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              region={region}
              customMapStyle={darkMapStyle}
            >
              {places.map(place => (
                <Marker
                  key={place.id}
                  coordinate={place.coordinates}
                  title={place.name}
                  onPress={() => handleMarkerPress(place)}
                  pinColor={
                    selectedPlaceId === place.id
                      ? Colors.primary
                      : Colors.secondary
                  }
                />
              ))}
            </MapView>
          )}

          {/* Bottom gradient fade */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
            style={styles.bottomGradient}
            pointerEvents="none"
          />

          {/* Bottom UI: Back button + Horizontal carousel */}
          <View
            style={[
              styles.carouselContainer,
              { paddingBottom: insets.bottom + 20 },
            ]}
          >
            {/* Back to list button - positioned above carousel */}
            <View style={styles.backButtonContainer}>
              <BackToListButton onPress={handleBackToList} />
            </View>

            {loading ? (
              <View style={styles.carouselLoadingContainer}>
                <ActivityIndicator />
              </View>
            ) : (
              <HorizontalPlaceCarousel
                ref={carouselRef}
                key={selectedType}
                places={places}
                onPlacePress={handlePlacePress}
                selectedPlaceId={selectedPlaceId || undefined}
                onVisiblePlaceChange={handleVisiblePlaceChange}
              />
            )}
          </View>
        </View>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Header - floats over everything
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    paddingHorizontal: Config.spacing.lg,
    paddingBottom: Config.spacing.md,
    gap: Config.spacing.sm,
    borderWidth: 0,
  },

  // LIST MODE styles - Hotel Tonight pattern
  listModeContainer: {
    flex: 1,
  },
  mapPeekContainer: {
    height: '40%',
  },
  mapPeek: {
    height: '100%',
  },
  listArea: {
    flex: 1, // Takes remaining 70%
    backgroundColor: 'transparent',
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },

  // MAP MODE styles - Full screen with carousel
  mapModeContainer: {
    flex: 1,
  },
  mapFull: {
    flex: 1,
  },
  mapBorderFix: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#000000',
    zIndex: 5,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200, // Adjust height of gradient
  },
  carouselContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40, // More space for back button
  },
  backButtonContainer: {
    alignItems: 'center',
    marginBottom: 16, // Space between button and carousel
  },
  carouselLoadingContainer: {
    height: 300, // Approximate height of the carousel
    alignItems: 'center',
    justifyContent: 'center',
  },
})
