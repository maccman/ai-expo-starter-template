/**
 * Hook for managing user location with permissions and reverse geocoding
 */
import { useEffect, useState } from 'react'

import * as Location from 'expo-location'

import { Coordinates, LocationState, Viewport } from '../types'

/**
 * Custom hook for managing user location with permissions and reverse geocoding
 */
export function useUserLocation() {
  const [locationState, setLocationState] = useState<LocationState>({
    coordinates: null,
    label: null,
    viewport: null,
    loading: true,
    error: null,
  })

  /**
   * Request location permissions and get current position
   */
  const requestLocation = async (): Promise<void> => {
    try {
      setLocationState(prev => ({ ...prev, loading: true, error: null }))

      // Request foreground permissions
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        setLocationState(prev => ({
          ...prev,
          loading: false,
          error: 'Permission to access location was denied',
        }))
        return
      }

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      })

      const coordinates: Coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }

      // Reverse geocode to get friendly label
      const reverseGeocode = await Location.reverseGeocodeAsync(coordinates)
      const firstResult = reverseGeocode[0]

      let label = 'Current Location'
      if (firstResult) {
        // Create friendly label from reverse geocode result
        const parts: string[] = []
        if (firstResult.city) parts.push(firstResult.city)
        if (firstResult.region) parts.push(firstResult.region)
        if (firstResult.country) parts.push(firstResult.country)

        if (parts.length > 0) {
          label = parts.slice(0, 2).join(', ') // Take first 2 parts (e.g., "Paris, France")
        }
      }

      setLocationState({
        coordinates,
        label,
        viewport: null,
        loading: false,
        error: null,
      })
    } catch (error) {
      console.error('Error getting location:', error)
      setLocationState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to get location',
      }))
    }
  }

  /**
   * Update location with custom coordinates and label
   */
  const updateLocation = (
    coordinates: Coordinates,
    label: string,
    viewport?: Viewport | null
  ): void => {
    setLocationState({
      coordinates,
      label,
      viewport: viewport ?? null,
      loading: false,
      error: null,
    })
  }

  // Request location on mount
  useEffect(() => {
    requestLocation()
  }, [])

  return {
    ...locationState,
    requestLocation,
    updateLocation,
  }
}
