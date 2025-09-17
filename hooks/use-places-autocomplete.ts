/**
 * Hook for Google Places Autocomplete functionality
 */
import { useCallback, useState } from 'react'

import { Config } from '@/constants/config'
import {
  getPlaceAutocomplete,
  getPlaceDetails,
} from '@/lib/google-places/client'
import { AutocompleteSuggestion, Place } from '@/lib/google-places/types'
import { Coordinates } from '@/types'

interface AutocompleteResult {
  placeId: string
  description: string
  mainText: string
  secondaryText?: string
  types: string[]
}

interface AutocompleteState {
  results: AutocompleteResult[]
  loading: boolean
  error: string | null
}

/**
 * Custom hook for Places Autocomplete with debouncing and session management
 */
export function usePlacesAutocomplete() {
  const [state, setState] = useState<AutocompleteState>({
    results: [],
    loading: false,
    error: null,
  })

  /**
   * Search for place predictions using Google Places Autocomplete
   */
  const searchPlaces = useCallback(async (input: string) => {
    if (input.length < 2) {
      setState({
        results: [],
        loading: false,
        error: null,
      })
      return
    }

    const apiKey = Config.googleMapsApiKey
    if (!apiKey) {
      setState({
        results: [],
        loading: false,
        error: 'Google Maps API key not configured',
      })
      return
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const response = await getPlaceAutocomplete({
        apiKey,
        input,
        includedPrimaryTypes: ['locality', 'administrative_area_level_1'], // Focus on cities and regions
        languageCode: 'en',
      })

      const results: AutocompleteResult[] = response.suggestions
        .filter(suggestion => suggestion.placePrediction)
        .map((suggestion: AutocompleteSuggestion) => {
          const prediction = suggestion.placePrediction!
          return {
            placeId: prediction.placeId,
            description: prediction.text.text,
            mainText: prediction.structuredFormat.mainText.text,
            secondaryText: prediction.structuredFormat.secondaryText?.text,
            types: prediction.types,
          }
        })

      setState({
        results,
        loading: false,
        error: null,
      })
    } catch (error) {
      console.error('Autocomplete search error:', error)
      setState({
        results: [],
        loading: false,
        error:
          error instanceof Error ? error.message : 'Failed to search places',
      })
    }
  }, [])

  /**
   * Get place details and coordinates from a place ID
   */
  const getPlaceCoordinates = useCallback(
    async (
      placeId: string
    ): Promise<{
      coordinates: Coordinates
      name: string
      viewport?: { low: Coordinates; high: Coordinates }
    } | null> => {
      const apiKey = Config.googleMapsApiKey
      if (!apiKey) {
        throw new Error('Google Maps API key not configured')
      }

      try {
        const place: Place = await getPlaceDetails({
          apiKey,
          placeId,
          fieldMask: 'id,displayName,location,formattedAddress,viewport',
        })

        if (!place.location) {
          throw new Error('Place location not found')
        }

        return {
          coordinates: {
            latitude: place.location.latitude,
            longitude: place.location.longitude,
          },
          name: place.displayName?.text || place.name || 'Unknown Place',
          viewport: place.viewport,
        }
      } catch (error) {
        console.error('Place details error:', error)
        throw error
      }
    },
    []
  )

  /**
   * Clear search results
   */
  const clearResults = useCallback(() => {
    setState({
      results: [],
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    searchPlaces,
    getPlaceCoordinates,
    clearResults,
  }
}
