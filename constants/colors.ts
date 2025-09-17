/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'
const tintColorDark = '#fff'

export const Colors = {
  light: {
    // Base colors
    background: '#F5F5F5',
    text: '#101010',
    card: '#FFFFFF',
    primary: '#BF40BF',
    brand: '#5A2C7B',
    secondary: '#20B2AA',
    tint: tintColorLight,
    icon: '#666666',
    tabIconDefault: '#8A8A8E',
    tabIconSelected: tintColorLight,
    border: '#E5E5E5',

    // Extended color system
    textSecondary: '#666666',
    textTertiary: '#8A8A8E',
    textError: '#FF3B30',
    textSuccess: '#34C759',
    textWarning: '#FF9500',

    // Card variations
    cardSecondary: '#F5F5F5',
    cardHover: '#E5E5E5',

    // Backgrounds
    backgroundSecondary: '#E5E5E5',
    backgroundTertiary: '#F5F5F5',

    // Borders
    borderSecondary: '#D1D1D1',
    borderLight: '#E5E5E5',

    // Interactive states
    buttonPrimary: '#BF40BF',
    buttonSecondary: '#20B2AA',
    buttonDisabled: '#D1D1D1',
    overlayBackground: 'rgba(0, 0, 0, 0.4)',
  },
  dark: {
    // Base colors
    background: '#101010',
    text: '#F5F5F5',
    card: '#1C1C1E',
    primary: '#BF40BF',
    brand: '#5A2C7B',
    secondary: '#20B2AA',
    tint: tintColorDark,
    icon: '#8A8A8E',
    tabIconDefault: '#8A8A8E',
    tabIconSelected: tintColorDark,
    border: '#333333',

    // Extended color system
    textSecondary: '#8A8A8E',
    textTertiary: '#666666',
    textError: '#FF6B6B',
    textSuccess: '#4ECDC4',
    textWarning: '#FFA726',

    // Card variations
    cardSecondary: '#2C2C2E',
    cardHover: '#3A3A3C',

    // Backgrounds
    backgroundSecondary: '#1C1C1E',
    backgroundTertiary: '#2C2C2E',

    // Borders
    borderSecondary: '#484848',
    borderLight: '#5A5A5C',

    // Interactive states
    buttonPrimary: '#BF40BF',
    buttonSecondary: '#20B2AA',
    buttonDisabled: '#3A3A3C',

    // Glass surfaces (dark only for now)
    glassBase: 'rgba(44, 44, 46, 0.55)',
    glassBasePressed: 'rgba(58, 58, 60, 0.65)',
    glassPrimary: 'rgba(191, 64, 191, 0.52)',
    glassPrimaryPressed: 'rgba(191, 64, 191, 0.62)',
    glassSecondary: 'rgba(32, 178, 170, 0.48)',
    glassSecondaryPressed: 'rgba(32, 178, 170, 0.58)',
    glassGhost: 'rgba(255, 255, 255, 0.16)',
    glassGhostPressed: 'rgba(255, 255, 255, 0.26)',
    glassDisabled: 'rgba(44, 44, 46, 0.28)',
    glassBorder: 'rgba(255, 255, 255, 0.16)',
    glassSurfaceBackground: 'rgba(28, 28, 30, 0.85)',

    // Badge and accent colors
    badgeBackground: '#20B2AA',
    badgeText: '#F5F5F5',

    // Shadows
    shadowColor: '#000000',
    overlayBackground: 'rgba(0, 0, 0, 0.5)',
  },
}
