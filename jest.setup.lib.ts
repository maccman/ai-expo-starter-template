import { config } from 'dotenv'

// Load test environment variables for lib tests
config({ path: '.env.test' })

// Stable globals for lib tests
// @ts-ignore
global.__DEV__ = true

// Don't mock fetch for lib tests - integration tests need real network calls
// Individual lib tests can mock fetch if needed

// Don't mock expo-constants for lib tests - let them use real env vars
// This allows integration tests to access real API keys from .env.test
