# Expo Starter Template

A feature-rich, opinionated starter template for Expo projects, designed to get you up and running quickly with a solid foundation.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Theming & UI](#theming--ui)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Glass UI**: Native iOS glass effect for a modern, visually appealing UI.
- **Themed Components**: A set of themed components (`ThemedView`, `ThemedText`, `ThemedCard`, `ThemedButton`) that respect the color constants.
- **Best Practices**:
  - Centralized color constants in `constants/colors.ts`.
  - Consistent spacing and typography system in `constants/config.ts`.
  - Well-organized directory structure (`hooks`, `contexts`, `components`, `types`, etc.).
- **Example Carousel**: A horizontal carousel component to showcase list-based UI patterns.
- **Jest Testing**: Pre-configured Jest setup for unit and integration tests.
- **Comprehensive README**: This guide to help you get started.

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm (or yarn/npm)
- Expo CLI
- iOS: Xcode + CocoaPods
- Android: Android Studio + JDK

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/expo-starter-template.git
    cd expo-starter-template
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Start the development server:**

    ```bash
    pnpm start
    ```

This will open the Expo Dev Tools in your browser. You can then run the app on an iOS Simulator, Android Emulator, or on your physical device using the Expo Go app.

### AI Setup

You will want to customize the following files to your project to get the best out of the AI.

- Update `.cursor/rules/app-description.mdc`
- Update `.cursor/rules/app-technologies.mdc`
- Update `AGENTS.md`

---

## Project Structure

The project follows a standard Expo project structure with some additional conventions:

- `app/`: Contains the app's screens and navigation, powered by Expo Router.
- `assets/`: Static assets like fonts and images.
- `components/`: Reusable UI components.
  - `ui/`: Low-level, generic UI primitives.
- `constants/`: Global constants like colors and configuration.
- `contexts/`: React contexts for state management.
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions and libraries.
- `types/`: TypeScript type definitions.

---

## Development

- **Linting**: Run `pnpm lint` to check for code style issues.
- **Type Checking**: Run `pnpm typecheck` to check for TypeScript errors.
- **Testing**: Run `pnpm test` to run the Jest test suite.

---

## Theming & UI

The template uses a custom theming system built on top of React Native's StyleSheet.

- **Colors**: All colors are defined in `constants/colors.ts`.
- **Configuration**: Spacing, typography, and other UI constants are in `constants/config.ts`.
- **Glass UI**: The `GlassSurface` component (`components/ui/glass-surface.tsx`) provides the native iOS glass effect and falls back to a solid color on other platforms.

---

## Available Scripts

- `pnpm start`: Starts the development server.
- `pnpm ios`: Runs the app on the iOS Simulator.
- `pnpm android`: Runs the app on the Android Emulator.
- `pnpm lint`: Lints the codebase.
- `pnpm typecheck`: Runs the TypeScript compiler.
- `pnpm test`: Runs the test suite.
- `pnpm fix`: Automatically fixes linting and formatting errors.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.
