import { View, type ViewProps } from 'react-native'

import { Colors } from '@/constants/colors'
import { useColorScheme } from '@/hooks/use-color-scheme'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? 'light'
  const backgroundColor = Colors[colorScheme].background

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}
