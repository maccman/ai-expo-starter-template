/**
 * Hook for fetching and managing places data using Google Places API
 */
import { useCallback, useEffect, useState } from 'react'

import { Config } from '@/constants/config'
import { getCachedPlaces, setCachedPlaces } from '@/lib/cache/places-cache'
import { fetchPlaces } from '@/lib/places-search'
import { Coordinates, PlaceType, PlacesState } from '@/types'

/**
 * Custom hook for managing places data with caching and filtering (HTTP API only)
 */
export function usePlaces(
  coordinates: Coordinates | null,
  type: PlaceType,
  viewport?: { low: Coordinates; high: Coordinates }
) {
  const [placesState, setPlacesState] = useState<PlacesState>({
    places: [],
    loading: false,
    error: null,
  })

  /**
   * Fetch places with caching using the places service
   */
  const fetchPlacesData = useCallback(async () => {
    if (!coordinates) return

    const apiKey = Config.googleMapsApiKey
    if (!apiKey) {
      setPlacesState({
        places: [],
        loading: false,
        error: 'Google Maps API key not configured',
      })
      return
    }

    // Check cache first
    const cachedPlaces = getCachedPlaces(coordinates, type)
    if (cachedPlaces) {
      setPlacesState({
        places: cachedPlaces,
        loading: false,
        error: null,
      })
      return
    }

    try {
      setPlacesState(prev => ({ ...prev, loading: true, error: null }))

      const result = await fetchPlaces({
        apiKey,
        coordinates,
        type,
        viewport,
      })

      if (result.error) {
        setPlacesState({
          places: [],
          loading: false,
          error: result.error,
        })
        return
      }

      // Cache the results
      setCachedPlaces(coordinates, type, result.places)

      setPlacesState({
        places: result.places,
        loading: false,
        error: null,
      })
    } catch (error) {
      console.error('Error fetching places:', error)
      setPlacesState({
        places: [],
        loading: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch places',
      })
    }
  }, [coordinates, type, viewport])

  // Fetch places when coordinates or type changes
  useEffect(() => {
    fetchPlacesData()
  }, [fetchPlacesData])

  return {
    ...placesState,
    refetch: fetchPlacesData,
  }
}
