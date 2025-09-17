# Magnifico (Expo) — List-First Hotels & Restaurants

A premium, list-first iOS app (Expo/React Native) that ranks nearby **hotels** and **restaurants** using taste heuristics, Google Places data, awards (e.g., Michelin), and your friends’ visits/recommendations.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Env & Secrets](#env--secrets)
- [Development](#development)
- [Google Maps/Platform Compliance](#google-mapsplatform-compliance)
- [Scoring Model (v1)](#scoring-model-v1)
- [Social & Data Import](#social--data-import)
- [Testing & Quality](#testing--quality)
- [Release & OTA](#release--ota)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **List-first UI** with a peekable **map overlay** (tap to expand to full map)
- **Opinionated ranking**:
  - Hotels: only 5★, rating ≥ 4.7
  - Restaurants: rating ≥ 4.7, price sanity, first-star preference
- **Big, fast photos** (Places Photos with attribution)
- **Friend layer**: “I’ve been” / “I recommend”, avatars on cards
- **Imports**: bring saved places from Google Takeout
- **Privacy-first**: store only what we create; respect Places caching/attribution rules

---

## Architecture

- **Client**: Expo (React Native, TypeScript), React Navigation, react-native-maps (Google provider)
- **Native modules (via dev build)**: Google Maps SDK, Google Places SDK, fast image caching
- **Backend (BFF)**: Edge proxy for Places (hides keys, enforces TTL & field masks), scoring service, auth/session
- **DB**: Postgres (users, friendships, user_places, scores, imports). We store **Place IDs** and our own metadata, never long-term cached Google content beyond policy.

---

## Getting Started

Requirements:

- Node ≥ 18, pnpm or yarn
- Expo CLI
- iOS: Xcode + CocoaPods
- Google Cloud project with **Maps SDK for iOS** + **Places API** enabled

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
