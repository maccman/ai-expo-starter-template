/**
 * Hook for parsing and validating place detail URL parameters
 */
import { useLocalSearchParams } from 'expo-router'

import { z } from 'zod'

import { Place, PlaceType } from '@/types'

/**
 * Schema for validating place detail URL parameters
 */
const PlaceDetailParamsSchema = z.object({
  placeId: z.string().min(1),
  name: z.string().min(1),
  rating: z.string().transform((val, ctx) => {
    const parsed = parseFloat(val)
    if (isNaN(parsed) || parsed < 0 || parsed > 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Rating must be a valid number between 0 and 5',
      })
      return z.NEVER
    }
    return parsed
  }),
  type: z.enum(['hotel', 'restaurant']),
  latitude: z.string().transform((val, ctx) => {
    const parsed = parseFloat(val)
    if (isNaN(parsed) || parsed < -90 || parsed > 90) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Latitude must be a valid number between -90 and 90',
      })
      return z.NEVER
    }
    return parsed
  }),
  longitude: z.string().transform((val, ctx) => {
    const parsed = parseFloat(val)
    if (isNaN(parsed) || parsed < -180 || parsed > 180) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Longitude must be a valid number between -180 and 180',
      })
      return z.NEVER
    }
    return parsed
  }),
  address: z.string().optional(),
  description: z.string().optional(),
  images: z.string().optional(),
  // Scoring-critical fields
  userRatingCount: z
    .string()
    .transform(val => (val ? parseInt(val) : undefined))
    .optional(),
  priceLevel: z
    .enum([
      'PRICE_LEVEL_FREE',
      'PRICE_LEVEL_INEXPENSIVE',
      'PRICE_LEVEL_MODERATE',
      'PRICE_LEVEL_EXPENSIVE',
      'PRICE_LEVEL_VERY_EXPENSIVE',
    ])
    .optional(),
  languageCode: z.string().optional(),
  types: z.string().optional(),
})

export type PlaceDetailParams = z.infer<typeof PlaceDetailParamsSchema>

/**
 * Custom hook for parsing place detail URL parameters into a Place object
 */
export function usePlaceDetailParams(): {
  place: Place | null
  isLoading: boolean
  error: string | null
} {
  const rawParams = useLocalSearchParams()

  try {
    // Validate and parse the parameters
    const validatedParams = PlaceDetailParamsSchema.parse(rawParams)

    const place: Place = {
      id: validatedParams.placeId,
      name: validatedParams.name,
      rating: validatedParams.rating,
      type: validatedParams.type as PlaceType,
      coordinates: {
        latitude: validatedParams.latitude,
        longitude: validatedParams.longitude,
      },
      address: validatedParams.address || undefined,
      description: validatedParams.description || undefined,
      images: validatedParams.images ? validatedParams.images.split(',') : [],
      photoRefs: [], // Will be populated when we implement real images
      // Include scoring fields from URL params
      userRatingCount: validatedParams.userRatingCount,
      priceLevel: validatedParams.priceLevel,
      languageCode: validatedParams.languageCode,
      types: validatedParams.types
        ? validatedParams.types.split(',')
        : undefined,
    }

    return {
      place,
      isLoading: false,
      error: null,
    }
  } catch (error) {
    return {
      place: null,
      isLoading: false,
      error:
        error instanceof z.ZodError
          ? 'Invalid place parameters'
          : 'Failed to parse place data',
    }
  }
}
