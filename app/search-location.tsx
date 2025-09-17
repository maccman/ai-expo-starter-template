/**
 * Modal for searching and selecting locations using Google Places Autocomplete
 */
import React, { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { router } from 'expo-router'

import { useLocationContext } from '@/contexts'
import { usePlacesAutocomplete } from '@/hooks'

/**
 * Modal for searching locations with Google Places Autocomplete
 */
export default function SearchLocationModal() {
  const [searchQuery, setSearchQuery] = useState('')
  const { updateLocation } = useLocationContext()
  const { results, loading, error, searchPlaces, getPlaceCoordinates } =
    usePlacesAutocomplete()

  const handleClose = () => {
    router.back()
  }

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query)
      searchPlaces(query)
    },
    [searchPlaces]
  )

  const handleLocationSelect = async (placeId: string, description: string) => {
    try {
      const placeData = await getPlaceCoordinates(placeId)
      if (placeData) {
        // Update the location context with the selected location
        updateLocation(placeData.coordinates, description, placeData.viewport)
        // Navigate back to the main screen
        router.back()
      }
    } catch (error) {
      console.error('Failed to get place coordinates:', error)
      // Could show an error toast here
    }
  }

  const renderLocationItem = ({ item }: { item: (typeof results)[0] }) => (
    <Pressable
      style={({ pressed }) => [
        styles.locationItem,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={() => handleLocationSelect(item.placeId, item.description)}
    >
      <Text style={styles.locationName}>{item.mainText}</Text>
      {item.secondaryText && (
        <Text style={styles.locationSecondary}>{item.secondaryText}</Text>
      )}
    </Pressable>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={handleClose}
          style={({ pressed }) => [
            styles.closeButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={styles.closeButtonText}>Cancel</Text>
        </Pressable>
        <Text style={styles.title}>Search Location</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter city or location..."
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus
          returnKeyType="search"
        />

        {/* Loading indicator */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#666666" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        )}

        {/* Error state */}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
            <Text style={styles.errorSubtext}>
              Please check your internet connection and try again.
            </Text>
          </View>
        )}

        {/* Search results */}
        {results.length > 0 && !loading && !error && (
          <View style={styles.resultsContainer}>
            <FlatList
              data={results}
              renderItem={renderLocationItem}
              keyExtractor={item => item.placeId}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {/* Empty state */}
        {searchQuery.length > 2 &&
          results.length === 0 &&
          !loading &&
          !error && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No locations found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try searching for a different city, address, or landmark
              </Text>
            </View>
          )}

        {/* Instructions */}
        {searchQuery.length === 0 && !loading && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Search for a location</Text>
            <Text style={styles.instructionsText}>
              Type the name of a city, address, or landmark to find nearby
              hotels and restaurants.
            </Text>
            <Text style={styles.instructionsNote}>
              🌍 Powered by Google Places
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 60, // Match close button width for centering
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  resultsContainer: {
    flex: 1,
    marginTop: 16,
  },
  locationItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  locationSecondary: {
    fontSize: 14,
    color: '#666666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  instructionsNote: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
})
